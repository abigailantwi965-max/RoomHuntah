/**
 * RoomHuntah — Client Data Layer & Realistic Ghana Room Listings
 * 
 * This file contains authentic sample room rental listings for Ghana
 * and helper functions to read/write listings and enquiries in localStorage.
 */

const INITIAL_ROOMS = [
  {
    id: "room-001",
    title: "Chamber and Hall Self-Contained at Ayeduase",
    type: "Chamber & Hall Self-Contained",
    roomCategory: "chamber-and-hall",
    bedrooms: 1,
    bathrooms: 1,
    rent: 750,
    advancePeriod: "1 Year Advance",
    advanceMonths: 12,
    securityDeposit: 500,
    region: "Ashanti",
    city: "Kumasi",
    neighborhood: "Ayeduase (Near KNUST Gate)",
    description: "Spacious chamber and hall self-contained room located just 5 minutes walk from KNUST Ayeduase gate. Features a modern tiled floor, dedicated ECG prepaid self-meter (no shared electricity issues), clean running tap water connected to an overhead poly tank, and a secure gated compound with a day-and-night caretaker.",
    facilities: [
      "Self Prepaid Meter",
      "Gated Compound",
      "Poly Tank / Constant Water",
      "W/C Inside",
      "Personal Kitchen",
      "Tiled Floor",
      "Paved Compound"
    ],
    isVerified: true,
    hasVideo: true,
    images: [
      "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1000&q=80"
    ],
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
    videoThumbnail: "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=1000&q=80",
    landlord: {
      name: "Mr. Kwabena Owusu",
      phone: "+233 24 412 8901",
      role: "Landlord",
      isVerified: true,
      memberSince: "2024"
    },
    datePosted: "2026-09-10",
    isAvailable: true
  },
  {
    id: "room-002",
    title: "Neat Single Room Self-Contained in Madina",
    type: "Single Room Self-Contained",
    roomCategory: "single-room",
    bedrooms: 1,
    bathrooms: 1,
    rent: 550,
    advancePeriod: "2 Years Advance",
    advanceMonths: 24,
    securityDeposit: 400,
    region: "Greater Accra",
    city: "Accra",
    neighborhood: "Madina (Social Welfare / Zongo Junction)",
    description: "Clean single room self-contained with private modern washroom and kitchenette corner. Located in a calm residential zone in Madina with easy access to trotro stops and Madina market. Water flows regularly plus overhead backup poly tank. Separate electric meter.",
    facilities: [
      "Self Prepaid Meter",
      "Gated Compound",
      "Poly Tank / Constant Water",
      "W/C Inside",
      "Kitchenette",
      "Tiled Floor"
    ],
    isVerified: true,
    hasVideo: true,
    images: [
      "https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=1000&q=80"
    ],
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
    videoThumbnail: "https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=1000&q=80",
    landlord: {
      name: "Madam Faustina Mensah",
      phone: "+233 20 833 4519",
      role: "Property Manager",
      isVerified: true,
      memberSince: "2023"
    },
    datePosted: "2026-09-12",
    isAvailable: true
  },
  {
    id: "room-003",
    title: "2-Bedroom House Flat at Oyarifa",
    type: "2-Bedroom Self-Contained",
    roomCategory: "two-bedroom",
    bedrooms: 2,
    bathrooms: 2,
    rent: 1400,
    advancePeriod: "1 Year Advance",
    advanceMonths: 12,
    securityDeposit: 1000,
    region: "Greater Accra",
    city: "Accra",
    neighborhood: "Oyarifa (Near Special Ice)",
    description: "Spacious 2-bedroom flat with master en-suite, guest washroom, fitted kitchen with store, personal balcony, and broad compound for car parking. Enjoy fresh mountain breeze from the Aburi hills, quiet neighborhood, and reliable Ghana Water supply backed by automated borehole.",
    facilities: [
      "Self Prepaid Meter",
      "Gated Compound",
      "Car Parking",
      "Borehole & Ghana Water",
      "W/C Inside",
      "Personal Kitchen",
      "Tiled Floor",
      "Paved Compound",
      "Security / Guard"
    ],
    isVerified: true,
    hasVideo: true,
    images: [
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=1000&q=80"
    ],
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4",
    videoThumbnail: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1000&q=80",
    landlord: {
      name: "Alhaji Nuhu",
      phone: "+233 24 990 1234",
      role: "Landlord",
      isVerified: true,
      memberSince: "2024"
    },
    datePosted: "2026-09-14",
    isAvailable: true
  },
  {
    id: "room-004",
    title: "Modern 1-Bedroom Self-Contained at Kotei",
    type: "1-Bedroom Self-Contained",
    roomCategory: "single-room",
    bedrooms: 1,
    bathrooms: 1,
    rent: 650,
    advancePeriod: "1 Year Advance",
    advanceMonths: 12,
    securityDeposit: 450,
    region: "Ashanti",
    city: "Kumasi",
    neighborhood: "Kotei (Behind Shell Station)",
    description: "Very serene 1-bedroom self-contained apartment suitable for young working professionals or post-graduate students. Pop ceiling, sliding windows with burglar proofing, modern bathroom, and dedicated electricity prepaid meter.",
    facilities: [
      "Self Prepaid Meter",
      "Gated Compound",
      "Poly Tank / Constant Water",
      "W/C Inside",
      "Kitchenette",
      "Tiled Floor"
    ],
    isVerified: true,
    hasVideo: false,
    images: [
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=1000&q=80"
    ],
    videoUrl: null,
    videoThumbnail: null,
    landlord: {
      name: "Dr. Osei Bonsu",
      phone: "+233 50 120 7741",
      role: "Landlord",
      isVerified: true,
      memberSince: "2024"
    },
    datePosted: "2026-09-11",
    isAvailable: true
  },
  {
    id: "room-005",
    title: "Chamber and Hall Self-Contained at Haatso",
    type: "Chamber & Hall Self-Contained",
    roomCategory: "chamber-and-hall",
    bedrooms: 1,
    bathrooms: 1,
    rent: 900,
    advancePeriod: "1 Year Advance",
    advanceMonths: 12,
    securityDeposit: 600,
    region: "Greater Accra",
    city: "Accra",
    neighborhood: "Haatso (Ecomog Junction / Westland link)",
    description: "Nicely finished chamber and hall apartment in a peaceful compound of 4 tenants. Personal kitchen, internal toilet & bath with heater switch, separate ECG meter, and paved car park inside high gated fence with razor wire.",
    facilities: [
      "Self Prepaid Meter",
      "Gated Compound",
      "Car Parking",
      "Poly Tank / Constant Water",
      "W/C Inside",
      "Personal Kitchen",
      "Tiled Floor",
      "Paved Compound"
    ],
    isVerified: true,
    hasVideo: true,
    images: [
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=1000&q=80"
    ],
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyBlazes.mp4",
    videoThumbnail: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1000&q=80",
    landlord: {
      name: "Mrs. Grace Addo",
      phone: "+233 24 331 6682",
      role: "Landlord",
      isVerified: true,
      memberSince: "2023"
    },
    datePosted: "2026-09-08",
    isAvailable: true
  },
  {
    id: "room-006",
    title: "Student Single Room at Amamoma, Cape Coast",
    type: "Single Room (Shared Facilities)",
    roomCategory: "single-room",
    bedrooms: 1,
    bathrooms: 1,
    rent: 350,
    advancePeriod: "1 Year Advance",
    advanceMonths: 12,
    securityDeposit: 200,
    region: "Central",
    city: "Cape Coast",
    neighborhood: "Amamoma (5 mins to UCC Campus)",
    description: "Affordable and neat single room for UCC students or single workers. Tiled room, ceiling fan, well ventilated, steady water supply with tank on site, walled house with night light.",
    facilities: [
      "Gated Compound",
      "Poly Tank / Constant Water",
      "Tiled Floor",
      "Compound Lighting"
    ],
    isVerified: true,
    hasVideo: false,
    images: [
      "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=1000&q=80"
    ],
    videoUrl: null,
    videoThumbnail: null,
    landlord: {
      name: "Uncle Ebo",
      phone: "+233 27 719 3302",
      role: "Landlord",
      isVerified: true,
      memberSince: "2024"
    },
    datePosted: "2026-09-05",
    isAvailable: true
  }
];

const STORAGE_KEY_ROOMS = "roomhuntah_listings";
const STORAGE_KEY_ENQUIRIES = "roomhuntah_enquiries";
const STORAGE_KEY_FAVS = "roomhuntah_favourites";

/**
 * Get all room listings (combines default dataset with user-created rooms in localStorage)
 */
function getRooms() {
  const stored = localStorage.getItem(STORAGE_KEY_ROOMS);
  if (!stored) {
    localStorage.setItem(STORAGE_KEY_ROOMS, JSON.stringify(INITIAL_ROOMS));
    return INITIAL_ROOMS;
  }
  try {
    return JSON.parse(stored);
  } catch (err) {
    console.error("Error reading stored listings", err);
    return INITIAL_ROOMS;
  }
}

/**
 * Save a newly created room from landlord form
 */
function saveRoom(newRoom) {
  const rooms = getRooms();
  // Insert at front so new listing shows at top
  rooms.unshift(newRoom);
  localStorage.setItem(STORAGE_KEY_ROOMS, JSON.stringify(rooms));
  return newRoom;
}

/**
 * Find room by unique ID
 */
function getRoomById(id) {
  const rooms = getRooms();
  return rooms.find(r => r.id === id) || null;
}

/**
 * Save tenant enquiry
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
  enquiry.id = "enq-" + Date.now();
  enquiry.submittedAt = new Date().toISOString();
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
