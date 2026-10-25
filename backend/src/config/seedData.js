/**
 * Seed Data for Beach Tourism & Safety Portal
 * Contains 6 beaches, 3 safety alerts, emergency contacts, and sample reviews.
 * Also provides fallback in-memory data so the portal works even without MongoDB!
 */

const Beach = require('../models/Beach');
const Alert = require('../models/Alert');
const Review = require('../models/Review');
const User = require('../models/User');

const initialBeaches = [
  {
    _id: 'beach-1',
    name: 'Marina Beach',
    location: 'Chennai, Tamil Nadu',
    description: 'The world’s second-longest natural urban beach, renowned for golden sand, historic colonial statues, scenic sunrise views, and bustling evening food stalls along the Bay of Bengal.',
    safetyLevel: 'Caution',
    bestTime: 'November to February (5:30 AM - 8:30 AM)',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80',
    facilities: ['Promenade Walkway', 'Parking Lot', 'First Aid Post', 'Street Food Stalls', 'Restrooms']
  },
  {
    _id: 'beach-2',
    name: 'Kovalam Beach',
    location: 'Covelong, Tamil Nadu',
    description: 'A peaceful crescent-shaped coastal haven famous for calm bay waters, premier windsurfing and surfing academies, scenic fishing village life, and luxury seaside resorts.',
    safetyLevel: 'Safe',
    bestTime: 'October to March (6:00 AM - 10:00 AM)',
    image: 'https://images.unsplash.com/photo-1510414842594-a61c69b5ae57?auto=format&fit=crop&w=800&q=80',
    facilities: ['Certified Surf Schools', 'Boat Rides', 'Shower Stations', 'Resort Cafes', 'Lifeguard Tower']
  },
  {
    _id: 'beach-3',
    name: 'Mahabalipuram Beach',
    location: 'Mahabalipuram, Tamil Nadu',
    description: 'A picturesque UNESCO World Heritage shoreline featuring the 8th-century Shore Temple, coastal monolithic rock sculptures, and vibrant stone-carver craft markets.',
    safetyLevel: 'Moderate',
    bestTime: 'October to March (6:30 AM - 6:00 PM)',
    image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=800&q=80',
    facilities: ['UNESCO Heritage Monuments', 'Surf Schools', 'Handicraft Bazaars', 'Seafood Restaurants']
  },
  {
    _id: 'beach-4',
    name: 'Promenade Beach (Pondicherry)',
    location: 'White Town, Puducherry',
    description: 'A charming 1.5 km French-colonial seaside promenade with iconic landmarks including the War Memorial, Joan of Arc statue, Heritage City Hall, and ocean-facing cafes.',
    safetyLevel: 'Safe',
    bestTime: 'October to March (5:00 AM - 9:00 PM)',
    image: 'https://images.unsplash.com/photo-1506953823976-52e1fdc0149a?auto=format&fit=crop&w=800&q=80',
    facilities: ['Pedestrian-Only Walkway', 'Heritage Cafes', 'Tourist Information Booth', 'Wheelchair Ramps']
  },
  {
    _id: 'beach-5',
    name: 'Baga Beach',
    location: 'North Goa, Goa',
    description: 'One of Goa’s most lively and popular beaches, renowned for water sports like parasailing and jet skiing, vibrant beachfront shacks, and exhilarating coastal atmosphere.',
    safetyLevel: 'Moderate',
    bestTime: 'November to February (All Day)',
    image: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=800&q=80',
    facilities: ['Water Sports Operators', 'Beach Shacks & Dining', 'Lifeguard Patrol', 'Sunbed Rentals']
  },
  {
    _id: 'beach-6',
    name: 'Puri Beach (Golden Beach)',
    location: 'Puri, Odisha',
    description: 'A sacred and scenic beach on the Bay of Bengal coast, celebrated for golden sands, spiritual pilgrimages near the Jagannath Temple, and impressive sand art displays by local artists.',
    safetyLevel: 'Caution',
    bestTime: 'October to February (Sunrise to Sunset)',
    image: 'https://images.unsplash.com/photo-1520942702018-0862200e6873?auto=format&fit=crop&w=800&q=80',
    facilities: ['Blue Flag Certified Zone', 'Lifeguards', 'Sand Art Pavilions', 'Drinking Water Kiosks']
  }
];

const initialAlerts = [
  {
    _id: 'alert-1',
    beachName: 'Marina Beach',
    type: 'High Waves',
    message: 'Rough sea conditions with swells reaching 2.5m to 3.2m due to offshore squall activity. Deep water bathing is strictly prohibited.',
    date: new Date('2026-10-25T08:30:00Z')
  },
  {
    _id: 'alert-2',
    beachName: 'Baga Beach',
    type: 'Strong Currents',
    message: 'High tidal currents and undertow spotted near the northern rocky headland. Swimming beyond knee-depth is restricted today.',
    date: new Date('2026-10-25T10:15:00Z')
  },
  {
    _id: 'alert-3',
    beachName: 'Puri Beach (Golden Beach)',
    type: 'Weather Warning',
    message: 'High tide surge and sudden squalls predicted during late afternoon (4:30 PM - 7:00 PM). Obey red flags on the open shoreline.',
    date: new Date('2026-10-25T11:00:00Z')
  }
];

const initialEmergencyContacts = [
  {
    id: 1,
    name: 'Indian Coast Guard SAR',
    number: '1554',
    type: 'Toll-Free Coastal Rescue',
    available: '24/7 Available',
    description: 'National emergency maritime search & rescue and vessel distress helpline.'
  },
  {
    id: 2,
    name: 'Police Emergency',
    number: '100 / 112',
    type: 'All-in-One Emergency',
    available: '24/7 Immediate Response',
    description: 'Universal police helpline for beach safety, missing persons, and law enforcement.'
  },
  {
    id: 3,
    name: 'Medical Ambulance Helpline',
    number: '108',
    type: 'Life Support / Ambulance',
    available: '24/7 Paramedic Transit',
    description: 'Emergency ambulance dispatch with trained trauma and drowning stabilization units.'
  },
  {
    id: 4,
    name: 'Coastal Security Police',
    number: '1093',
    type: 'Coastal Law Enforcement',
    available: '24/7 Coastal Patrol',
    description: 'State coastal police desk specialized in nearshore beach and harbour safety.'
  }
];

const initialReviews = [
  {
    _id: 'rev-1',
    beachId: 'beach-1',
    userName: 'Karthik Raja',
    rating: 5,
    comment: 'Wonderful sunrise views! Lifeguards are very watchful with whistles near the shorebreak. Best visited early morning.',
    date: new Date('2026-10-22')
  },
  {
    _id: 'rev-2',
    beachId: 'beach-2',
    userName: 'Ananya Sharma',
    rating: 5,
    comment: 'Covelong is exceptionally clean and great for beginner surfing. The lifejacket policy is strictly followed.',
    date: new Date('2026-10-23')
  },
  {
    _id: 'rev-3',
    beachId: 'beach-4',
    userName: 'Rohan Mehra',
    rating: 4,
    comment: 'Pondicherry Promenade is peaceful in the evenings. The vehicle-free walkway makes it very safe for walking.',
    date: new Date('2026-10-24')
  }
];

// Fallback in-memory stores (used whenever MongoDB is not connected or returns an error)
let memoryBeaches = [...initialBeaches];
let memoryAlerts = [...initialAlerts];
let memoryReviews = [...initialReviews];
let memoryUsers = [
  { email: 'admin@beachtourism.com', password: 'admin', name: 'System Admin', role: 'admin' },
  { email: 'tourist@beachtourism.com', password: 'password', name: 'John Doe', role: 'tourist' }
];

/**
 * Automatically seeds the database if collections are empty.
 */
async function seedDatabase() {
  try {
    const beachCount = await Beach.countDocuments();
    if (beachCount === 0) {
      console.log('🌱 Seeding sample beaches into MongoDB...');
      // Remove _id string so MongoDB generates native ObjectIds
      const beachesToInsert = initialBeaches.map(({ _id, ...rest }) => rest);
      const inserted = await Beach.insertMany(beachesToInsert);
      console.log(`✅ Seeded ${inserted.length} beaches into MongoDB.`);
    }

    const alertCount = await Alert.countDocuments();
    if (alertCount === 0) {
      console.log('🌱 Seeding sample alerts into MongoDB...');
      const alertsToInsert = initialAlerts.map(({ _id, ...rest }) => rest);
      await Alert.insertMany(alertsToInsert);
      console.log('✅ Seeded sample alerts into MongoDB.');
    }

    const reviewCount = await Review.countDocuments();
    if (reviewCount === 0) {
      console.log('🌱 Seeding sample reviews into MongoDB...');
      const reviewsToInsert = initialReviews.map(({ _id, ...rest }) => rest);
      await Review.insertMany(reviewsToInsert);
      console.log('✅ Seeded sample reviews into MongoDB.');
    }

    const userCount = await User.countDocuments();
    if (userCount === 0) {
      console.log('🌱 Seeding demo users into MongoDB...');
      await User.insertMany(memoryUsers);
      console.log('✅ Seeded demo users into MongoDB.');
    }
  } catch (err) {
    console.log('⚠️ MongoDB seed skipped (using in-memory fallback):', err.message);
  }
}

module.exports = {
  initialBeaches,
  initialAlerts,
  initialEmergencyContacts,
  initialReviews,
  memoryBeaches,
  memoryAlerts,
  memoryReviews,
  memoryUsers,
  seedDatabase
};
