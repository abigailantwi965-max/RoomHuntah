/**
 * RoomHuntah Database Layer
 * Uses Node.js 26 built-in SQLite engine (node:sqlite)
 */

const { DatabaseSync } = require('node:sqlite');
const path = require('path');
const fs = require('fs');

const DB_PATH = path.join(__dirname, 'roomhuntah.db');
const db = new DatabaseSync(DB_PATH);

// Initialize schema
db.exec(`
  CREATE TABLE IF NOT EXISTS rooms (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    type TEXT NOT NULL,
    roomCategory TEXT NOT NULL,
    furnishing TEXT DEFAULT '100% Unfurnished / Empty Room',
    bedrooms INTEGER DEFAULT 1,
    bathrooms INTEGER DEFAULT 1,
    rent REAL NOT NULL,
    advancePeriod TEXT NOT NULL,
    advanceMonths INTEGER DEFAULT 12,
    securityDeposit REAL DEFAULT 0,
    region TEXT NOT NULL,
    city TEXT NOT NULL,
    neighborhood TEXT NOT NULL,
    description TEXT,
    facilities TEXT,
    isVerified INTEGER DEFAULT 1,
    hasVideo INTEGER DEFAULT 0,
    images TEXT,
    videoUrl TEXT,
    videoThumbnail TEXT,
    landlordName TEXT,
    landlordPhone TEXT,
    landlordRole TEXT DEFAULT 'Landlord',
    landlordIsVerified INTEGER DEFAULT 1,
    landlordMemberSince TEXT DEFAULT '2026',
    datePosted TEXT,
    isAvailable INTEGER DEFAULT 1,
    createdAt TEXT
  );

  CREATE TABLE IF NOT EXISTS enquiries (
    id TEXT PRIMARY KEY,
    roomId TEXT NOT NULL,
    roomTitle TEXT,
    name TEXT NOT NULL,
    phone TEXT NOT NULL,
    email TEXT,
    moveInDate TEXT NOT NULL,
    message TEXT,
    submittedAt TEXT,
    status TEXT DEFAULT 'pending'
  );
`);

// Format database row to clean RoomHuntah object
function formatRoom(row) {
  if (!row) return null;

  let facilities = [];
  try {
    facilities = typeof row.facilities === 'string' ? JSON.parse(row.facilities) : (row.facilities || []);
  } catch (e) {
    facilities = [];
  }

  let images = [];
  try {
    images = typeof row.images === 'string' ? JSON.parse(row.images) : (row.images || []);
  } catch (e) {
    images = [];
  }

  return {
    id: row.id,
    title: row.title,
    type: row.type,
    roomCategory: row.roomCategory,
    furnishing: row.furnishing || '100% Unfurnished / Empty Room',
    bedrooms: Number(row.bedrooms) || 1,
    bathrooms: Number(row.bathrooms) || 1,
    rent: Number(row.rent),
    advancePeriod: row.advancePeriod,
    advanceMonths: Number(row.advanceMonths) || 12,
    securityDeposit: Number(row.securityDeposit) || 0,
    region: row.region,
    city: row.city,
    neighborhood: row.neighborhood,
    description: row.description || '',
    facilities: facilities,
    isVerified: Boolean(row.isVerified),
    hasVideo: Boolean(row.hasVideo),
    images: images,
    videoUrl: row.videoUrl || '',
    videoThumbnail: row.videoThumbnail || (images[0] || ''),
    landlord: {
      name: row.landlordName || 'Landlord',
      phone: row.landlordPhone || '',
      role: row.landlordRole || 'Landlord',
      isVerified: Boolean(row.landlordIsVerified),
      memberSince: row.landlordMemberSince || '2026'
    },
    datePosted: row.datePosted || new Date().toISOString().split('T')[0],
    isAvailable: Boolean(row.isAvailable),
    createdAt: row.createdAt
  };
}

// Seed initial rooms if database is empty
function seedRoomsIfEmpty() {
  const countStmt = db.prepare('SELECT COUNT(*) as count FROM rooms');
  const countRow = countStmt.get();
  if (countRow && countRow.count > 0) {
    return;
  }

  const seedFile = path.join(__dirname, 'seed-rooms.json');
  if (!fs.existsSync(seedFile)) {
    return;
  }

  try {
    const seedRooms = JSON.parse(fs.readFileSync(seedFile, 'utf8'));
    console.log(`Seeding database with ${seedRooms.length} initial Kumasi rooms...`);

    const insertStmt = db.prepare(`
      INSERT INTO rooms (
        id, title, type, roomCategory, furnishing, bedrooms, bathrooms, rent,
        advancePeriod, advanceMonths, securityDeposit, region, city, neighborhood,
        description, facilities, isVerified, hasVideo, images, videoUrl, videoThumbnail,
        landlordName, landlordPhone, landlordRole, landlordIsVerified, landlordMemberSince,
        datePosted, isAvailable, createdAt
      ) VALUES (
        ?, ?, ?, ?, ?, ?, ?, ?,
        ?, ?, ?, ?, ?, ?,
        ?, ?, ?, ?, ?, ?, ?,
        ?, ?, ?, ?, ?,
        ?, ?, ?
      )
    `);

    for (const r of seedRooms) {
      insertStmt.run(
        r.id,
        r.title,
        r.type,
        r.roomCategory,
        r.furnishing || '100% Unfurnished / Empty Room',
        r.bedrooms || 1,
        r.bathrooms || 1,
        r.rent,
        r.advancePeriod || '1 Year Advance',
        r.advanceMonths || 12,
        r.securityDeposit || 0,
        r.region || 'Ashanti',
        r.city || 'Kumasi',
        r.neighborhood || 'Kumasi',
        r.description || '',
        JSON.stringify(r.facilities || []),
        r.isVerified ? 1 : 0,
        r.hasVideo ? 1 : 0,
        JSON.stringify(r.images || []),
        r.videoUrl || '',
        r.videoThumbnail || '',
        r.landlord?.name || 'Landlord',
        r.landlord?.phone || '',
        r.landlord?.role || 'Landlord',
        r.landlord?.isVerified ? 1 : 0,
        r.landlord?.memberSince || '2024',
        r.datePosted || '2026-09-18',
        r.isAvailable !== false ? 1 : 0,
        new Date().toISOString()
      );
    }
    console.log('Database seeded successfully.');
  } catch (err) {
    console.error('Failed to seed database:', err);
  }
}

seedRoomsIfEmpty();

// Database Query APIs
function getAllRooms(filters = {}) {
  let query = 'SELECT * FROM rooms WHERE isAvailable = 1';
  const params = [];

  if (filters.search) {
    query += ' AND (LOWER(title) LIKE ? OR LOWER(city) LIKE ? OR LOWER(neighborhood) LIKE ? OR LOWER(region) LIKE ?)';
    const term = `%${filters.search.toLowerCase().trim()}%`;
    params.push(term, term, term, term);
  }

  if (filters.region) {
    query += ' AND region = ?';
    params.push(filters.region);
  }

  if (filters.category) {
    query += ' AND roomCategory = ?';
    params.push(filters.category);
  }

  if (filters.maxPrice) {
    const price = Number(filters.maxPrice);
    if (!isNaN(price) && price > 0 && price < 2500) {
      query += ' AND rent <= ?';
      params.push(price);
    }
  }

  // Sorting
  if (filters.sort === 'price-low') {
    query += ' ORDER BY rent ASC';
  } else if (filters.sort === 'price-high') {
    query += ' ORDER BY rent DESC';
  } else {
    query += ' ORDER BY datePosted DESC, rowid DESC';
  }

  const stmt = db.prepare(query);
  const rows = stmt.all(...params);

  let formatted = rows.map(formatRoom);

  // Filter facilities if specified
  if (filters.facilities) {
    const requiredFacilities = (Array.isArray(filters.facilities) 
      ? filters.facilities 
      : String(filters.facilities).split(',')
    ).map(f => f.trim().toLowerCase()).filter(Boolean);

    if (requiredFacilities.length > 0) {
      formatted = formatted.filter(room => {
        const roomFacs = (room.facilities || []).map(f => f.toLowerCase());
        return requiredFacilities.every(reqFac => {
          if (reqFac === 'video') return room.hasVideo === true;
          return roomFacs.some(f => f.includes(reqFac));
        });
      });
    }
  }

  return formatted;
}

function getRoomById(id) {
  const stmt = db.prepare('SELECT * FROM rooms WHERE id = ?');
  const row = stmt.get(id);
  return formatRoom(row);
}

function createRoom(roomData) {
  const id = roomData.id || `room-${Date.now()}`;
  const now = new Date();
  const datePosted = roomData.datePosted || now.toISOString().split('T')[0];
  const createdAt = now.toISOString();

  const facilitiesJson = JSON.stringify(Array.isArray(roomData.facilities) ? roomData.facilities : []);
  const imagesJson = JSON.stringify(Array.isArray(roomData.images) ? roomData.images : []);

  const stmt = db.prepare(`
    INSERT INTO rooms (
      id, title, type, roomCategory, furnishing, bedrooms, bathrooms, rent,
      advancePeriod, advanceMonths, securityDeposit, region, city, neighborhood,
      description, facilities, isVerified, hasVideo, images, videoUrl, videoThumbnail,
      landlordName, landlordPhone, landlordRole, landlordIsVerified, landlordMemberSince,
      datePosted, isAvailable, createdAt
    ) VALUES (
      ?, ?, ?, ?, ?, ?, ?, ?,
      ?, ?, ?, ?, ?, ?,
      ?, ?, ?, ?, ?, ?, ?,
      ?, ?, ?, ?, ?,
      ?, ?, ?
    )
  `);

  stmt.run(
    id,
    roomData.title,
    roomData.type,
    roomData.roomCategory,
    roomData.furnishing || '100% Unfurnished / Empty Room',
    Number(roomData.bedrooms) || 1,
    Number(roomData.bathrooms) || 1,
    Number(roomData.rent),
    roomData.advancePeriod,
    Number(roomData.advanceMonths) || 12,
    Number(roomData.securityDeposit) || 0,
    roomData.region || 'Ashanti',
    roomData.city || 'Kumasi',
    roomData.neighborhood || '',
    roomData.description || '',
    facilitiesJson,
    roomData.isVerified ? 1 : 0,
    roomData.hasVideo ? 1 : 0,
    imagesJson,
    roomData.videoUrl || '',
    roomData.videoThumbnail || '',
    roomData.landlord?.name || 'Landlord',
    roomData.landlord?.phone || '',
    roomData.landlord?.role || 'Landlord',
    roomData.landlord?.isVerified ? 1 : 0,
    roomData.landlord?.memberSince || String(now.getFullYear()),
    datePosted,
    1,
    createdAt
  );

  return getRoomById(id);
}

function createEnquiry(enquiryData) {
  const id = enquiryData.id || `enq-${Date.now()}`;
  const submittedAt = new Date().toISOString();

  const stmt = db.prepare(`
    INSERT INTO enquiries (
      id, roomId, roomTitle, name, phone, email, moveInDate, message, submittedAt, status
    ) VALUES (
      ?, ?, ?, ?, ?, ?, ?, ?, ?, ?
    )
  `);

  stmt.run(
    id,
    enquiryData.roomId,
    enquiryData.roomTitle || '',
    enquiryData.name,
    enquiryData.phone,
    enquiryData.email || '',
    enquiryData.moveInDate,
    enquiryData.message || '',
    submittedAt,
    'pending'
  );

  return {
    id,
    roomId: enquiryData.roomId,
    roomTitle: enquiryData.roomTitle,
    name: enquiryData.name,
    phone: enquiryData.phone,
    email: enquiryData.email,
    moveInDate: enquiryData.moveInDate,
    message: enquiryData.message,
    submittedAt,
    status: 'pending'
  };
}

function getAllEnquiries() {
  const stmt = db.prepare('SELECT * FROM enquiries ORDER BY submittedAt DESC');
  return stmt.all();
}

module.exports = {
  db,
  getAllRooms,
  getRoomById,
  createRoom,
  createEnquiry,
  getAllEnquiries
};
