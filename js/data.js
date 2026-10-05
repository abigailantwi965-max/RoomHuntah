/**
 * RoomHuntah — Client Data Layer & Realistic Kumasi Empty-Room Listings
 * 
 * 100% Kumasi-based, unfurnished/empty room rentals with authentic
 * photography and working video walkthrough tours.
 */

const INITIAL_ROOMS = [
  {
    id: "room-k01",
    title: "Unfurnished Chamber and Hall Self-Contained at Ayeduase",
    type: "Chamber & Hall Self-Contained",
    roomCategory: "chamber-and-hall",
    furnishing: "100% Unfurnished / Empty Room",
    bedrooms: 1,
    bathrooms: 1,
    rent: 750,
    advancePeriod: "1 Year Advance",
    advanceMonths: 12,
    securityDeposit: 500,
    region: "Ashanti",
    city: "Kumasi",
    neighborhood: "Ayeduase (Near KNUST Gate)",
    description: "Completely empty and unfurnished chamber and hall self-contained apartment located 5 minutes walk from KNUST Ayeduase gate. Features pristine bare beige ceramic floor tiles, clean walls, POP ceiling with recessed lighting, an open archway connecting the empty hall to the chamber, personal ECG prepaid meter on the wall, private modern tiled bathroom with shower and W/C, and an empty kitchenette with stainless steel sink ready for your cooking setup. Overhead poly tank ensures steady running water.",
    facilities: [
      "Self Prepaid Meter",
      "Gated Compound",
      "Poly Tank / Constant Water",
      "W/C Inside",
      "Personal Kitchen",
      "Tiled Floor",
      "100% Unfurnished / Empty",
      "Paved Compound"
    ],
    isVerified: true,
    hasVideo: true,
    images: [
      "images/empty-chamber-hall.jpg",
      "images/empty-bedroom-clean.jpg",
      "images/empty-bathroom.jpg",
      "images/empty-kitchenette.jpg",
      "images/kumasi-compound.jpg"
    ],
    videoUrl: "videos/tour-ayeduase.mp4",
    videoThumbnail: "images/empty-chamber-hall.jpg",
    landlord: {
      name: "Mr. Kwabena Owusu",
      phone: "+233 24 412 8901",
      role: "Landlord",
      isVerified: true,
      memberSince: "2024"
    },
    datePosted: "2026-09-18",
    isAvailable: true
  },
  {
    id: "room-k02",
    title: "Empty Single Room Self-Contained at Kotei",
    type: "Single Room Self-Contained",
    roomCategory: "single-room",
    furnishing: "100% Unfurnished / Empty Room",
    bedrooms: 1,
    bathrooms: 1,
    rent: 550,
    advancePeriod: "1 Year Advance",
    advanceMonths: 12,
    securityDeposit: 400,
    region: "Ashanti",
    city: "Kumasi",
    neighborhood: "Kotei (Behind Shell Station)",
    description: "Vacant and unfurnished single room self-contained apartment in Kotei, ideal for students and young professionals. Features spotless porcelain floor tiles, burglar-proof sliding windows, your own dedicated wall-mounted ECG prepaid meter, private clean washroom with modern toilet seat and shower, and an empty kitchenette corner. No furniture provided—bring your own furnishings and make it home.",
    facilities: [
      "Self Prepaid Meter",
      "Gated Compound",
      "Poly Tank / Constant Water",
      "W/C Inside",
      "Kitchenette",
      "Tiled Floor",
      "100% Unfurnished / Empty"
    ],
    isVerified: true,
    hasVideo: true,
    images: [
      "images/empty-single-room.jpg",
      "images/empty-bathroom.jpg",
      "images/empty-kitchenette.jpg",
      "images/kumasi-compound.jpg"
    ],
    videoUrl: "videos/tour-kotei.mp4",
    videoThumbnail: "images/empty-single-room.jpg",
    landlord: {
      name: "Dr. Osei Bonsu",
      phone: "+233 50 120 7741",
      role: "Landlord",
      isVerified: true,
      memberSince: "2024"
    },
    datePosted: "2026-09-19",
    isAvailable: true
  },
  {
    id: "room-k03",
    title: "Vacant 2-Bedroom Apartment Flat at Ahodwo",
    type: "2-Bedroom Self-Contained",
    roomCategory: "two-bedroom",
    furnishing: "100% Unfurnished / Empty Room",
    bedrooms: 2,
    bathrooms: 2,
    rent: 1400,
    advancePeriod: "1 Year Advance",
    advanceMonths: 12,
    securityDeposit: 1000,
    region: "Ashanti",
    city: "Kumasi",
    neighborhood: "Ahodwo (Vienna City / Golden Tulip Area)",
    description: "Expansive, completely unfurnished 2-bedroom flat in high-demand Ahodwo residential area. Large empty living hall with polished floor tiles and patio sliding doors, master bedroom en-suite plus separate guest washroom, empty fitted kitchen with granite worktop and sink, private balcony, automated borehole plus poly tank, and dedicated ECG prepaid meter in a secure walled compound.",
    facilities: [
      "Self Prepaid Meter",
      "Gated Compound",
      "Car Parking",
      "Poly Tank / Constant Water",
      "W/C Inside",
      "Personal Kitchen",
      "Tiled Floor",
      "100% Unfurnished / Empty",
      "Security / Caretaker"
    ],
    isVerified: true,
    hasVideo: true,
    images: [
      "images/empty-bedroom-clean.jpg",
      "images/empty-chamber-hall.jpg",
      "images/empty-bathroom.jpg",
      "images/empty-kitchenette.jpg",
      "images/kumasi-compound.jpg"
    ],
    videoUrl: "videos/tour-ahodwo.mp4",
    videoThumbnail: "images/empty-bedroom-clean.jpg",
    landlord: {
      name: "Nana Yaw Poku",
      phone: "+233 24 551 8820",
      role: "Landlord",
      isVerified: true,
      memberSince: "2023"
    },
    datePosted: "2026-09-20",
    isAvailable: true
  },
  {
    id: "room-k04",
    title: "Unfurnished Chamber and Hall Self-Contained at Kentinkrono",
    type: "Chamber & Hall Self-Contained",
    roomCategory: "chamber-and-hall",
    furnishing: "100% Unfurnished / Empty Room",
    bedrooms: 1,
    bathrooms: 1,
    rent: 800,
    advancePeriod: "1 Year Advance",
    advanceMonths: 12,
    securityDeposit: 600,
    region: "Ashanti",
    city: "Kumasi",
    neighborhood: "Kentinkrono (Tech Junction Corridor)",
    description: "Brand new unfurnished chamber and hall apartment near Tech junction. Clean bare tiled floors throughout, modern POP ceiling design, private bathroom with brand new ceramic sanitary ware, private cooking porch/kitchenette with sink, personal prepaid meter, and 24/7 water backed by overhead poly tank. Quiet gated compound of 6 units.",
    facilities: [
      "Self Prepaid Meter",
      "Gated Compound",
      "Poly Tank / Constant Water",
      "W/C Inside",
      "Personal Kitchen",
      "Tiled Floor",
      "100% Unfurnished / Empty",
      "Car Parking"
    ],
    isVerified: true,
    hasVideo: true,
    images: [
      "images/empty-chamber-hall.jpg",
      "images/empty-single-room.jpg",
      "images/empty-bathroom.jpg",
      "images/empty-kitchenette.jpg"
    ],
    videoUrl: "videos/tour-kentinkrono.mp4",
    videoThumbnail: "images/empty-chamber-hall.jpg",
    landlord: {
      name: "Madam Akosua Frimpong",
      phone: "+233 20 782 1190",
      role: "Landlord",
      isVerified: true,
      memberSince: "2024"
    },
    datePosted: "2026-09-17",
    isAvailable: true
  },
  {
    id: "room-k05",
    title: "Empty Modern Single Room Self-Contained at Asokwa",
    type: "Single Room Self-Contained",
    roomCategory: "single-room",
    furnishing: "100% Unfurnished / Empty Room",
    bedrooms: 1,
    bathrooms: 1,
    rent: 600,
    advancePeriod: "1 Year Advance",
    advanceMonths: 12,
    securityDeposit: 400,
    region: "Ashanti",
    city: "Kumasi",
    neighborhood: "Asokwa (Near Kumasi City Mall)",
    description: "Clean, empty single room self-contained located 3 minutes drive from Kumasi City Mall. Features an empty tiled interior, ceiling fan hook, sliding glass windows with burglar bars, an en-suite clean bathroom with shower and flush toilet, separate ECG meter, and secure walled compound with security gate.",
    facilities: [
      "Self Prepaid Meter",
      "Gated Compound",
      "Poly Tank / Constant Water",
      "W/C Inside",
      "Tiled Floor",
      "100% Unfurnished / Empty"
    ],
    isVerified: true,
    hasVideo: true,
    images: [
      "images/empty-single-room.jpg",
      "images/empty-bathroom.jpg",
      "images/kumasi-compound.jpg"
    ],
    videoUrl: "videos/tour-asokwa.mp4",
    videoThumbnail: "images/empty-single-room.jpg",
    landlord: {
      name: "Mr. Kofi Boateng",
      phone: "+233 24 330 9941",
      role: "Property Manager",
      isVerified: true,
      memberSince: "2023"
    },
    datePosted: "2026-09-16",
    isAvailable: true
  },
  {
    id: "room-k06",
    title: "Vacant Chamber & Hall Self-Contained at Bantama",
    type: "Chamber & Hall Self-Contained",
    roomCategory: "chamber-and-hall",
    furnishing: "100% Unfurnished / Empty Room",
    bedrooms: 1,
    bathrooms: 1,
    rent: 850,
    advancePeriod: "1 Year Advance",
    advanceMonths: 12,
    securityDeposit: 500,
    region: "Ashanti",
    city: "Kumasi",
    neighborhood: "Bantama (Near High School / Abrepo)",
    description: "Spacious empty chamber and hall self-contained flat in central Bantama. Completely unfurnished with shiny floor tiles, bare walls, spacious empty hall, separate empty bedroom, private bathroom with shower, personal kitchenette with sink, and dedicated ECG meter. Excellent trotro connection to Adum and Komfo Anokye Teaching Hospital (KATH).",
    facilities: [
      "Self Prepaid Meter",
      "Gated Compound",
      "Poly Tank / Constant Water",
      "W/C Inside",
      "Personal Kitchen",
      "Tiled Floor",
      "100% Unfurnished / Empty"
    ],
    isVerified: true,
    hasVideo: true,
    images: [
      "images/empty-chamber-hall.jpg",
      "images/empty-bedroom-clean.jpg",
      "images/empty-bathroom.jpg",
      "images/empty-kitchenette.jpg"
    ],
    videoUrl: "videos/tour-bantama.mp4",
    videoThumbnail: "images/empty-chamber-hall.jpg",
    landlord: {
      name: "Lawyer Ohene Darko",
      phone: "+233 27 612 0055",
      role: "Landlord",
      isVerified: true,
      memberSince: "2024"
    },
    datePosted: "2026-09-15",
    isAvailable: true
  },
  {
    id: "room-k07",
    title: "Unfurnished Single Room Self-Contained at Tanoso",
    type: "Single Room Self-Contained",
    roomCategory: "single-room",
    furnishing: "100% Unfurnished / Empty Room",
    bedrooms: 1,
    bathrooms: 1,
    rent: 480,
    advancePeriod: "1 Year Advance",
    advanceMonths: 12,
    securityDeposit: 300,
    region: "Ashanti",
    city: "Kumasi",
    neighborhood: "Tanoso (Near AAMUSTED Campus)",
    description: "Affordable and neat unfurnished single room self-contained room near AAMUSTED (formerly UEW-K) Tanoso campus. Clean tiled floors, sliding glass window with metal grill, personal toilet and bath inside, self ECG meter, and constant flow tap backed by poly tank. Completely empty and ready for immediate tenancy.",
    facilities: [
      "Self Prepaid Meter",
      "Gated Compound",
      "Poly Tank / Constant Water",
      "W/C Inside",
      "Tiled Floor",
      "100% Unfurnished / Empty"
    ],
    isVerified: true,
    hasVideo: true,
    images: [
      "images/empty-single-room.jpg",
      "images/empty-bathroom.jpg",
      "images/kumasi-compound.jpg"
    ],
    videoUrl: "videos/tour-tanoso.mp4",
    videoThumbnail: "images/empty-single-room.jpg",
    landlord: {
      name: "Madam Gladys Mensah",
      phone: "+233 55 490 8221",
      role: "Landlord",
      isVerified: true,
      memberSince: "2024"
    },
    datePosted: "2026-09-14",
    isAvailable: true
  },
  {
    id: "room-k08",
    title: "Empty Chamber and Hall Self-Contained at Bomso",
    type: "Chamber & Hall Self-Contained",
    roomCategory: "chamber-and-hall",
    furnishing: "100% Unfurnished / Empty Room",
    bedrooms: 1,
    bathrooms: 1,
    rent: 900,
    advancePeriod: "1 Year Advance",
    advanceMonths: 12,
    securityDeposit: 600,
    region: "Ashanti",
    city: "Kumasi",
    neighborhood: "Bomso (Oforikrom / KNUST Axis)",
    description: "Beautiful empty chamber and hall self-contained apartment in peaceful Bomso residential enclave. Clean polished tiled floor, bare cream walls, modern plasterboard ceiling with downlights, en-suite bathroom with water heater point, empty kitchenette with sink and storage ledge, private balcony, and personal ECG prepaid meter. High walled compound with electric fencing.",
    facilities: [
      "Self Prepaid Meter",
      "Gated Compound",
      "Poly Tank / Constant Water",
      "W/C Inside",
      "Personal Kitchen",
      "Tiled Floor",
      "Car Parking",
      "100% Unfurnished / Empty"
    ],
    isVerified: true,
    hasVideo: true,
    images: [
      "images/empty-chamber-hall.jpg",
      "images/empty-bedroom-clean.jpg",
      "images/empty-kitchenette.jpg",
      "images/empty-bathroom.jpg",
      "images/kumasi-compound.jpg"
    ],
    videoUrl: "videos/tour-bomso.mp4",
    videoThumbnail: "images/empty-chamber-hall.jpg",
    landlord: {
      name: "Ing. Samuel Antwi",
      phone: "+233 24 881 3340",
      role: "Landlord",
      isVerified: true,
      memberSince: "2023"
    },
    datePosted: "2026-09-13",
    isAvailable: true
  }
];

const STORAGE_KEY_ROOMS = "roomhuntah_kumasi_empty_v5";
const STORAGE_KEY_ENQUIRIES = "roomhuntah_enquiries";
const STORAGE_KEY_FAVS = "roomhuntah_favourites";

/**
/**
 * Asynchronously fetch room listings from backend API with query filters
 */
async function fetchRooms(filters = {}) {
  try {
    const params = new URLSearchParams();
    if (filters.search) params.append('search', filters.search);
    if (filters.region) params.append('region', filters.region);
    if (filters.category) params.append('category', filters.category);
    if (filters.maxPrice) params.append('maxPrice', filters.maxPrice);
    if (filters.facilities) params.append('facilities', filters.facilities);
    if (filters.sort) params.append('sort', filters.sort);

    const qs = params.toString() ? `?${params.toString()}` : '';
    const res = await fetch(`/api/rooms${qs}`);
    if (!res.ok) throw new Error(`HTTP error ${res.status}`);
    const data = await res.json();
    const rooms = data.data || data.rooms || [];
    
    // Update local cache when fetching full list
    if (rooms.length > 0 && !qs) {
      localStorage.setItem(STORAGE_KEY_ROOMS, JSON.stringify(rooms));
    }
    return rooms;
  } catch (err) {
    console.warn("Backend API unavailable, falling back to local cache:", err);
    return getRooms();
  }
}

/**
 * Asynchronously fetch a single room by ID from backend API
 */
async function fetchRoomById(id) {
  if (!id) return null;
  try {
    const res = await fetch(`/api/rooms/${encodeURIComponent(id)}`);
    if (res.ok) {
      const data = await res.json();
      return data.data || data.room || null;
    }
  } catch (err) {
    console.warn(`Backend fetch failed for room ${id}, falling back to local cache:`, err);
  }
  return getRoomById(id);
}

/**
 * Submit newly created room to backend API (multipart/form-data)
 */
async function submitRoomListing(formData) {
  const res = await fetch('/api/rooms', {
    method: 'POST',
    body: formData
  });

  const result = await res.json();
  if (!res.ok) {
    throw new Error(result.message || 'Failed to publish room listing');
  }

  const newRoom = result.data || result.room;

  // Sync to local cache
  try {
    const stored = getRooms();
    stored.unshift(newRoom);
    localStorage.setItem(STORAGE_KEY_ROOMS, JSON.stringify(stored));
  } catch (e) {}

  return newRoom;
}

/**
 * Submit tenant enquiry to backend API
 */
async function submitEnquiry(enquiryData) {
  try {
    const res = await fetch('/api/enquiries', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(enquiryData)
    });
    const result = await res.json();
    if (!res.ok) throw new Error(result.message || 'Failed to submit enquiry');
    saveEnquiry(result.data || enquiryData);
    return result.data;
  } catch (err) {
    console.warn("API enquiry submission failed, saving locally:", err);
    return saveEnquiry(enquiryData);
  }
}

/**
 * Get all room listings (synchronous cache fallback)
 */
function getRooms() {
  const stored = localStorage.getItem(STORAGE_KEY_ROOMS);
  if (!stored) {
    localStorage.setItem(STORAGE_KEY_ROOMS, JSON.stringify(INITIAL_ROOMS));
    return INITIAL_ROOMS;
  }
  try {
    const parsed = JSON.parse(stored);
    const validKumasi = parsed.filter(room => room.city === "Kumasi" && room.region === "Ashanti");
    if (validKumasi.length === 0) {
      localStorage.setItem(STORAGE_KEY_ROOMS, JSON.stringify(INITIAL_ROOMS));
      return INITIAL_ROOMS;
    }
    const synced = validKumasi.map(room => {
      const seed = INITIAL_ROOMS.find(s => s.id === room.id);
      return seed ? { ...room, ...seed } : room;
    });
    localStorage.setItem(STORAGE_KEY_ROOMS, JSON.stringify(synced));
    return synced;
  } catch (err) {
    console.error("Error reading stored listings", err);
    localStorage.setItem(STORAGE_KEY_ROOMS, JSON.stringify(INITIAL_ROOMS));
    return INITIAL_ROOMS;
  }
}

/**
 * Save a newly created room from landlord form (Kumasi only)
 */
function saveRoom(newRoom) {
  if (newRoom.city !== "Kumasi" || newRoom.region !== "Ashanti") {
    throw new Error("RoomHuntah currently accepts empty room listings in Kumasi (Ashanti Region) only.");
  }
  if (!newRoom.images || newRoom.images.length === 0) {
    newRoom.images = ["images/empty-single-room.jpg", "images/empty-bathroom.jpg"];
  }
  if (!newRoom.videoUrl) {
    newRoom.videoUrl = "videos/sample-tour.mp4";
    newRoom.hasVideo = true;
    newRoom.videoThumbnail = newRoom.images[0];
  }
  newRoom.furnishing = "100% Unfurnished / Empty Room";

  const rooms = getRooms();
  rooms.unshift(newRoom);
  localStorage.setItem(STORAGE_KEY_ROOMS, JSON.stringify(rooms));
  return newRoom;
}

/**
 * Find room by unique ID (synchronous cache fallback)
 */
function getRoomById(id) {
  const rooms = getRooms();
  return rooms.find(r => r.id === id) || null;
}

/**
 * Save tenant enquiry locally
 */
function saveEnquiry(enquiry) {
  let list = [];
  const stored = localStorage.getItem(STORAGE_KEY_ENQUIRIES);
  if (stored) {
    try {
      list = JSON.parse(stored);
    } catch (e) {
      list = [];
    }
  }
  enquiry.id = enquiry.id || ("enq-" + Date.now());
  enquiry.submittedAt = enquiry.submittedAt || new Date().toISOString();
  enquiry.status = "pending";
  list.unshift(enquiry);
  localStorage.setItem(STORAGE_KEY_ENQUIRIES, JSON.stringify(list));
  return enquiry;
}

/**
 * Retrieve saved enquiries
 */
function getEnquiries() {
  const stored = localStorage.getItem(STORAGE_KEY_ENQUIRIES);
  if (!stored) return [];
  try {
    return JSON.parse(stored);
  } catch (e) {
    return [];
  }
}

/**
 * Favourites toggling
 */
function toggleFavourite(roomId) {
  let favs = [];
  try {
    favs = JSON.parse(localStorage.getItem(STORAGE_KEY_FAVS) || "[]");
  } catch (e) {
    favs = [];
  }
  const index = favs.indexOf(roomId);
  let isNowFav = false;
  if (index > -1) {
    favs.splice(index, 1);
    isNowFav = false;
  } else {
    favs.push(roomId);
    isNowFav = true;
  }
  localStorage.setItem(STORAGE_KEY_FAVS, JSON.stringify(favs));
  return isNowFav;
}

function isFavourite(roomId) {
  try {
    const favs = JSON.parse(localStorage.getItem(STORAGE_KEY_FAVS) || "[]");
    return favs.includes(roomId);
  } catch (e) {
    return false;
  }
}
