/**
 * RoomHuntah Full-Stack Server
 * Express + Multer + SQLite (Node 26 built-in node:sqlite)
 */

const express = require('express');
const path = require('path');
const fs = require('fs');
const multer = require('multer');
const db = require('./db');

const app = express();
const PORT = process.env.PORT || 8000;

// Ensure upload directories exist
const uploadDirs = [
  path.join(__dirname, 'uploads'),
  path.join(__dirname, 'uploads', 'photos'),
  path.join(__dirname, 'uploads', 'videos')
];
uploadDirs.forEach(dir => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
});

// Configure Multer storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    if (file.fieldname === 'video') {
      cb(null, path.join(__dirname, 'uploads', 'videos'));
    } else {
      cb(null, path.join(__dirname, 'uploads', 'photos'));
    }
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname).toLowerCase();
    const prefix = file.fieldname === 'video' ? 'video' : 'photo';
    cb(null, `${prefix}-${uniqueSuffix}${ext}`);
  }
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 100 * 1024 * 1024 // 100 MB max for videos
  },
  fileFilter: (req, file, cb) => {
    if (file.fieldname === 'video') {
      if (file.mimetype.startsWith('video/')) {
        cb(null, true);
      } else {
        cb(new Error('Only video files are allowed for the walkthrough video!'), false);
      }
    } else {
      if (file.mimetype.startsWith('image/')) {
        cb(null, true);
      } else {
        cb(new Error('Only image files are allowed for photos!'), false);
      }
    }
  }
});

// Parsers
app.use(express.json({ limit: '20mb' }));
app.use(express.urlencoded({ extended: true, limit: '20mb' }));

// Disable browser caching during active development
app.use((req, res, next) => {
  res.set('Cache-Control', 'no-cache, no-store, must-revalidate');
  res.set('Pragma', 'no-cache');
  res.set('Expires', '0');
  next();
});

// Static file serving
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(express.static(__dirname));

// ==========================================
// API ROUTES
// ==========================================

// Health Check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    app: 'RoomHuntah',
    version: '2.0.0',
    timestamp: new Date().toISOString()
  });
});

// GET /api/rooms - List and filter rooms
app.get('/api/rooms', (req, res) => {
  try {
    const filters = {
      search: req.query.search || req.query.location || req.query.q || '',
      region: req.query.region || '',
      category: req.query.type || req.query.category || req.query.roomCategory || '',
      maxPrice: req.query.maxPrice || '',
      facilities: req.query.facilities || req.query.facility || '',
      sort: req.query.sort || 'newest'
    };

    const rooms = db.getAllRooms(filters);
    res.json({
      success: true,
      count: rooms.length,
      data: rooms,
      rooms: rooms // For flexible frontend access
    });
  } catch (err) {
    console.error('Error fetching rooms:', err);
    res.status(500).json({ success: false, message: 'Failed to fetch rooms', error: err.message });
  }
});

// GET /api/rooms/:id - Get details of a single room
app.get('/api/rooms/:id', (req, res) => {
  try {
    const roomId = req.params.id;
    const room = db.getRoomById(roomId);

    if (!room) {
      return res.status(404).json({
        success: false,
        message: `Room with ID "${roomId}" was not found.`
      });
    }

    res.json({
      success: true,
      data: room,
      room: room
    });
  } catch (err) {
    console.error('Error fetching room details:', err);
    res.status(500).json({ success: false, message: 'Failed to load room details', error: err.message });
  }
});

// POST /api/rooms - Create a new room listing (with photo and video upload)
app.post('/api/rooms', upload.fields([
  { name: 'photos', maxCount: 10 },
  { name: 'video', maxCount: 1 }
]), (req, res) => {
  try {
    const body = req.body;

    // Validate required fields
    const title = (body.title || '').trim();
    const rent = parseFloat(body.rent);
    const neighborhood = (body.neighborhood || body.area || '').trim();
    const landlordName = (body.landlordName || '').trim();
    const landlordPhone = (body.landlordPhone || '').trim();

    if (!title) {
      return res.status(400).json({ success: false, message: 'Room title is required' });
    }
    if (isNaN(rent) || rent <= 0) {
      return res.status(400).json({ success: false, message: 'Valid monthly rent is required' });
    }
    if (!neighborhood) {
      return res.status(400).json({ success: false, message: 'Neighbourhood / Landmark is required' });
    }
    if (!landlordName || !landlordPhone) {
      return res.status(400).json({ success: false, message: 'Landlord name and phone are required' });
    }

    // Process uploaded photos
    let images = [];
    if (req.files && req.files.photos && req.files.photos.length > 0) {
      images = req.files.photos.map(file => `/uploads/photos/${file.filename}`);
    } else if (body.images) {
      try {
        images = typeof body.images === 'string' ? JSON.parse(body.images) : body.images;
      } catch (e) {
        images = [body.images];
      }
    }

    if (!images || images.length === 0) {
      // Default clean Ghanaian empty room photos if none uploaded
      images = ['images/empty-single-room.jpg', 'images/empty-bathroom.jpg'];
    }

    // Process uploaded video
    let videoUrl = '';
    let hasVideo = false;
    if (req.files && req.files.video && req.files.video.length > 0) {
      videoUrl = `/uploads/videos/${req.files.video[0].filename}`;
      hasVideo = true;
    } else if (body.videoUrl) {
      videoUrl = body.videoUrl;
      hasVideo = true;
    }

    // Process facilities
    let facilities = [];
    if (body.facilities) {
      if (Array.isArray(body.facilities)) {
        facilities = body.facilities;
      } else if (typeof body.facilities === 'string') {
        try {
          facilities = JSON.parse(body.facilities);
        } catch (e) {
          facilities = body.facilities.split(',').map(s => s.trim()).filter(Boolean);
        }
      }
    }
    if (facilities.length === 0) {
      facilities = ['Self Prepaid Meter', 'Gated Compound', 'Poly Tank / Constant Water'];
    }

    const roomCategory = body.roomCategory || body.typeCategory || 'chamber-and-hall';
    const type = body.type || (roomCategory === 'chamber-and-hall' ? 'Chamber & Hall Self-Contained' : 'Single Room Self-Contained');
    const advanceMonths = parseInt(body.advanceMonths, 10) || 12;
    const advancePeriod = body.advancePeriod || (advanceMonths === 24 ? '2 Years Advance' : (advanceMonths === 6 ? '6 Months Advance' : '1 Year Advance'));

    const roomData = {
      title,
      type,
      roomCategory,
      furnishing: '100% Unfurnished / Empty Room',
      bedrooms: parseInt(body.bedrooms, 10) || (roomCategory === 'two-bedroom' ? 2 : 1),
      bathrooms: parseInt(body.bathrooms, 10) || 1,
      rent,
      advancePeriod,
      advanceMonths,
      securityDeposit: parseFloat(body.securityDeposit) || Math.round(rent * 0.5),
      region: body.region || 'Ashanti',
      city: body.city || 'Kumasi',
      neighborhood,
      description: (body.description || '').trim() || 'Neat and vacant empty room ready for immediate occupancy.',
      facilities,
      isVerified: true,
      hasVideo,
      images,
      videoUrl,
      videoThumbnail: images[0] || '',
      landlord: {
        name: landlordName,
        phone: landlordPhone,
        role: body.landlordRole || 'Landlord',
        isVerified: true,
        memberSince: '2026'
      }
    };

    const newRoom = db.createRoom(roomData);

    res.status(201).json({
      success: true,
      message: 'Room listing published successfully!',
      data: newRoom,
      room: newRoom
    });
  } catch (err) {
    console.error('Error creating room listing:', err);
    res.status(500).json({ success: false, message: 'Failed to create room listing', error: err.message });
  }
});

// POST /api/enquiries - Submit an enquiry for a room
app.post('/api/enquiries', (req, res) => {
  try {
    const { roomId, name, phone, email, moveInDate, message } = req.body;

    if (!roomId || !name || !phone || !moveInDate) {
      return res.status(400).json({
        success: false,
        message: 'Room ID, full name, phone number, and move-in date are required'
      });
    }

    const room = db.getRoomById(roomId);
    const roomTitle = room ? room.title : '';

    const enquiry = db.createEnquiry({
      roomId,
      roomTitle,
      name: name.trim(),
      phone: phone.trim(),
      email: (email || '').trim(),
      moveInDate,
      message: (message || '').trim()
    });

    res.status(201).json({
      success: true,
      message: 'Your enquiry has been submitted directly to the landlord!',
      data: enquiry
    });
  } catch (err) {
    console.error('Error submitting enquiry:', err);
    res.status(500).json({ success: false, message: 'Failed to submit enquiry', error: err.message });
  }
});

// GET /api/enquiries - Retrieve all enquiries
app.get('/api/enquiries', (req, res) => {
  try {
    const enquiries = db.getAllEnquiries();
    res.json({ success: true, count: enquiries.length, data: enquiries });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to fetch enquiries' });
  }
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error('Unhandled express route error:', err);
  res.status(500).json({
    success: false,
    message: err.message || 'Internal Server Error'
  });
});

process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception caught:', err);
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
});

const server = app.listen(PORT, () => {
  console.log(`🏠 RoomHuntah server running at http://localhost:${PORT}/`);
  console.log(`API available at http://localhost:${PORT}/api/rooms`);
});

server.on('error', (err) => {
  console.error('Server listen error:', err);
});

