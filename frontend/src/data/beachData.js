/**
 * Static Data for Beach Tourism & Safety Information Portal
 * Beginner-friendly data file for easy reading, editing, and extending.
 */

export const BEACHES_DATA = [
  {
    id: 'marina-beach',
    name: 'Marina Beach',
    location: 'Chennai, Tamil Nadu',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80',
    shortDescription: 'World’s second-longest natural urban beach, renowned for golden sand, historic statues, and vibrant evening food stalls.',
    safetyStatus: 'Caution: Strong Undercurrents',
    statusType: 'caution', // 'safe' | 'caution' | 'warning'
    badgeText: '⚠️ Caution: High Swell',
    timings: 'Open 24 Hours (Patrolled 6:00 AM - 7:00 PM)',
    swimmingAllowed: false,
    lifeguardOnDuty: true,
    facilities: ['Promenade Walkway', 'Parking Lot', 'First Aid Booth', 'Street Food Stalls', 'Restrooms'],
    bestTimeToVisit: '5:30 AM - 8:30 AM & 4:30 PM - 7:30 PM',
    safetyNotice: 'Swimming in deep waters is prohibited due to treacherous undercurrents. Please stay in designated dry sand and shoreline zones.'
  },
  {
    id: 'elliots-beach',
    name: "Elliot's Beach (Besant Nagar)",
    location: 'Besant Nagar, Chennai',
    image: 'https://images.unsplash.com/photo-1506953823976-52e1fdc0149a?auto=format&fit=crop&w=800&q=80',
    shortDescription: 'A calm, scenic coastal retreat famous for the historical Karl Schmidt Memorial, paved walkway, and seaside cafes.',
    safetyStatus: 'Safe for Walking & Shallow Wading',
    statusType: 'safe',
    badgeText: '✅ Safe Shoreline',
    timings: 'Open 24 Hours (Lifeguards 7:00 AM - 6:30 PM)',
    swimmingAllowed: true,
    lifeguardOnDuty: true,
    facilities: ['Schmidt Memorial', 'Beach Cafes', 'Public Toilets', 'Illuminated Boardwalk', 'Wheelchair Access'],
    bestTimeToVisit: '6:00 AM - 9:00 AM & 5:00 PM - 9:00 PM',
    safetyNotice: 'Wading up to knee depth is safe during low tide. Obey the yellow boundary flags near the memorial.'
  },
  {
    id: 'mahabalipuram-beach',
    name: 'Mahabalipuram Beach',
    location: 'Mahabalipuram, Chengalpattu',
    image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=800&q=80',
    shortDescription: 'Famous heritage beach framing the 8th-century UNESCO Shore Temple, coastal monoliths, and vibrant local surf schools.',
    safetyStatus: 'Moderate: Rocky Zones Present',
    statusType: 'caution',
    badgeText: '⚠️ Moderate Risk',
    timings: '6:00 AM - 6:00 PM (Temple Area)',
    swimmingAllowed: false,
    lifeguardOnDuty: true,
    facilities: ['UNESCO Heritage Monuments', 'Surf Schools', 'Handicraft Bazaars', 'Seafood Restaurants'],
    bestTimeToVisit: '6:30 AM - 10:30 AM & 3:30 PM - 6:00 PM',
    safetyNotice: 'Submerged boulders and slippery rocks surround the temple perimeter. Avoid climbing wet sea-facing rock barriers.'
  },
  {
    id: 'kovalam-beach',
    name: 'Kovalam Beach (Covelong)',
    location: 'Covelong, ECR, Tamil Nadu',
    image: 'https://images.unsplash.com/photo-1510414842594-a61c69b5ae57?auto=format&fit=crop&w=800&q=80',
    shortDescription: 'A peaceful crescent bay celebrated for premier windsurfing academies, clear blue waters, and fresh coastal seafood.',
    safetyStatus: 'Safe: Water Sports Permitted',
    statusType: 'safe',
    badgeText: '✅ Safe Zone',
    timings: '6:00 AM - 7:00 PM',
    swimmingAllowed: true,
    lifeguardOnDuty: true,
    facilities: ['Certified Surf Schools', 'Boat Rides', 'Shower Stations', 'Resort Dining', 'Parking Area'],
    bestTimeToVisit: '6:00 AM - 11:00 AM & 3:00 PM - 6:30 PM',
    safetyNotice: 'Lifejackets are mandatory for all water sports and boat rides. Follow the instructors’ safety guidelines at all times.'
  }
];

export const SAFETY_TIPS_DATA = [
  {
    id: 1,
    icon: '🛟',
    title: 'Follow Lifeguard Instructions',
    description: 'Always heed warnings from beach patrols, swim between flagged safety zones, and immediately exit the water if a red flag or siren sounds.',
    actionBadge: 'Lifeguard Guidance'
  },
  {
    id: 2,
    icon: '🌊',
    title: 'Check Sea Conditions',
    description: 'Verify live wave heights, tide times, and weather forecasts before wading in. Never enter turbulent waters during high tide surges.',
    actionBadge: 'Tide & Weather Check'
  },
  {
    id: 3,
    icon: '🚫',
    title: 'Avoid Restricted Swimming Areas',
    description: 'Stay clear of rocky groynes, deep underwater drop-offs, shipping channels, and signposted rip-current danger zones.',
    actionBadge: 'Hazard Zones'
  },
  {
    id: 4,
    icon: '☀️',
    title: 'Stay Hydrated & Use Sun Protection',
    description: 'Drink fresh water regularly under tropical sun, apply broad-spectrum sunscreen (SPF 50+), and wear UV-protective sunglasses or hats.',
    actionBadge: 'Health & Sun Care'
  }
];

export const SAFETY_ALERTS_DATA = [
  {
    id: 'alert-1',
    type: 'High Waves',
    severity: 'High Warning',
    severityClass: 'alert-danger',
    icon: '🌊',
    timestamp: 'Updated 45 mins ago',
    location: 'Marina Beach & Mahabalipuram Coast',
    message: 'Rough sea conditions with swells reaching 2.5m to 3.2m due to offshore squall activity. Deep water bathing is temporarily restricted.',
    advisory: 'Stay 20 meters away from the active breakline. Obey red flags.'
  },
  {
    id: 'alert-2',
    type: 'Strong Currents',
    severity: 'Active Advisory',
    severityClass: 'alert-warning',
    icon: '🌀',
    timestamp: 'Updated 2 hours ago',
    location: "Elliot's Beach (Southern Sandbars)",
    message: 'Strong lateral undertow and localized rip currents detected near the canal outflow. Swimmers must remain in designated shallow zones.',
    advisory: 'Never swim alone. If pulled by a current, float calmly and swim parallel to the shoreline.'
  },
  {
    id: 'alert-3',
    type: 'Weather Warning',
    severity: 'Precautionary Alert',
    severityClass: 'alert-info',
    icon: '⛈️',
    timestamp: 'Forecast valid for 12 hours',
    location: 'Coastal ECR & Covelong Belt',
    message: 'Gusty surface winds reaching 40–50 km/h predicted during late afternoon. High-tide surge expected between 5:30 PM and 7:00 PM.',
    advisory: 'Parasailing and non-motorized water sports paused until wind speeds stabilize.'
  }
];

export const EMERGENCY_CONTACTS_DATA = [
  {
    id: 'em-1',
    name: 'Coastal Security Police',
    number: '1093',
    tollFree: true,
    available: '24/7 Available',
    description: 'Dedicated coastal law enforcement for beach safety and coastal rescue assistance.'
  },
  {
    id: 'em-2',
    name: 'Indian Coast Guard SAR Helpline',
    number: '1554',
    tollFree: true,
    available: '24/7 Maritime Support',
    description: 'National search and rescue operations for nearshore and offshore distress emergencies.'
  },
  {
    id: 'em-3',
    name: 'National Emergency Helpline',
    number: '112',
    tollFree: true,
    available: 'All-in-One Helpline',
    description: 'Universal emergency response for police, fire, ambulance, and disaster rescue.'
  },
  {
    id: 'em-4',
    name: 'Medical Ambulance Emergency',
    number: '108',
    tollFree: true,
    available: 'Immediate Medical Transit',
    description: 'On-demand paramedic and life-support ambulance dispatch along the coastal corridor.'
  },
  {
    id: 'em-5',
    name: 'Beach Lifeguard Patrol Desk',
    number: '+91 44 2844 7200',
    tollFree: false,
    available: '6:00 AM - 8:00 PM Daily',
    description: 'Direct station line for on-ground lifeguard supervisor and lost child assistance.'
  },
  {
    id: 'em-6',
    name: 'Disaster Management Helpline',
    number: '1077',
    tollFree: true,
    available: '24/7 State Emergency',
    description: 'Cyclone, storm surge, and coastal high-tide alert coordination center.'
  }
];

export const SAMPLE_REVIEWS_DATA = [
  {
    id: 'rev-1',
    userName: 'Ananya S.',
    beachName: "Elliot's Beach (Besant Nagar)",
    beachId: 'elliots-beach',
    rating: 5,
    date: '2 days ago',
    visitType: 'Family Outing',
    comment:
      'Very clean promenade and reassuring to see active lifeguards near Schmidt Memorial. We stayed in the designated shallow area with the kids. The BeachSafe flag guidance made our visit stress-free!',
    helpfulCount: 24
  },
  {
    id: 'rev-2',
    userName: 'Karthik Raja',
    beachName: 'Kovalam Beach (Covelong)',
    beachId: 'kovalam-beach',
    rating: 5,
    date: '4 days ago',
    visitType: 'Surfing & Sports',
    comment:
      'Superb water conditions and the surf schools strictly enforce lifejackets. Calm waves in the crescent bay made it ideal for beginner paddleboarding. Highly recommended!',
    helpfulCount: 18
  },
  {
    id: 'rev-3',
    userName: 'Dr. Meenakshi Sundaram',
    beachName: 'Marina Beach',
    beachId: 'marina-beach',
    rating: 4,
    date: '1 week ago',
    visitType: 'Morning Jog & Walking',
    comment:
      'Spectacular sunrise views and expansive sands. The police and lifeguards blow warning whistles if anyone wanders too deep into the surf break. Appreciate the high swell warnings on this portal.',
    helpfulCount: 31
  },
  {
    id: 'rev-4',
    userName: 'Vikram & Sneha',
    beachName: 'Mahabalipuram Beach',
    beachId: 'mahabalipuram-beach',
    rating: 4,
    date: '2 weeks ago',
    visitType: 'Heritage Tourism',
    comment:
      'Breathtaking view of the Shore Temple against crashing waves. Just be careful around the slippery rocky groynes. Signboards and warning flags are placed well.',
    helpfulCount: 15
  },
  {
    id: 'rev-5',
    userName: 'Rahul Nair',
    beachName: 'Kovalam Beach (Covelong)',
    beachId: 'kovalam-beach',
    rating: 5,
    date: '3 weeks ago',
    visitType: 'Weekend Getaway',
    comment:
      'One of the safest beaches along ECR. Clean water, great local seafood stalls, and certified rescue buoys stationed every 100 meters. Loved the experience!',
    helpfulCount: 12
  }
];
