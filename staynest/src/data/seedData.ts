import { College, PG, Review } from '../types';

export const INITIAL_COLLEGES: College[] = [
  {
    id: 'col-1',
    name: 'Pimpri Chinchwad College of Engineering (PCCOE)',
    code: 'PCCOE',
    city: 'Pune',
    state: 'Maharashtra',
    area: 'Akurdi / Nigdi',
    image: 'https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=800&q=80',
    lat: 18.6517,
    lng: 73.7616,
  },
  {
    id: 'col-2',
    name: 'College of Engineering Pune (COEP Technological University)',
    code: 'COEP',
    city: 'Pune',
    state: 'Maharashtra',
    area: 'Shivajinagar',
    image: 'https://images.unsplash.com/photo-1541829070764-84a7d30dd3f3?auto=format&fit=crop&w=800&q=80',
    lat: 18.5293,
    lng: 73.8565,
  },
  {
    id: 'col-3',
    name: 'Vishwakarma Institute of Technology (VIT Pune)',
    code: 'VIT Pune',
    city: 'Pune',
    state: 'Maharashtra',
    area: 'Bibwewadi',
    image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=800&q=80',
    lat: 18.4636,
    lng: 73.8682,
  },
  {
    id: 'col-4',
    name: 'Indian Institute of Technology Bombay (IIT Bombay)',
    code: 'IIT Bombay',
    city: 'Mumbai',
    state: 'Maharashtra',
    area: 'Powai',
    image: 'https://images.unsplash.com/photo-1592280771190-3e2e4d571952?auto=format&fit=crop&w=800&q=80',
    lat: 19.1334,
    lng: 72.9133,
  },
  {
    id: 'col-5',
    name: 'Veermata Jijabai Technological Institute (VJTI)',
    code: 'VJTI',
    city: 'Mumbai',
    state: 'Maharashtra',
    area: 'Matunga',
    image: 'https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?auto=format&fit=crop&w=800&q=80',
    lat: 19.0222,
    lng: 72.8561,
  },
  {
    id: 'col-6',
    name: 'Delhi Technological University (DTU)',
    code: 'DTU',
    city: 'Delhi',
    state: 'Delhi',
    area: 'Rohini',
    image: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=800&q=80',
    lat: 28.7499,
    lng: 77.1170,
  }
];

export const INITIAL_PGS: PG[] = [
  {
    id: 'pg-101',
    name: 'Sunrise Luxury Student Living',
    tagline: 'Premium Boys PG with modern amenities & high-speed Wi-Fi',
    genderType: 'boys',
    rentPerMonth: 7500,
    securityDeposit: 10000,
    extraChargesDescription: 'Electricity billed at ₹9/unit on actual meter reading.',
    totalBeds: 24,
    availableBeds: 5,
    availabilityStatus: 'available',
    sharingTypes: ['double', 'triple'],
    address: 'Plot 42, Sector 26, Pradhikaran, Akurdi',
    area: 'Akurdi',
    city: 'Pune',
    state: 'Maharashtra',
    pincode: '411044',
    lat: 18.6502,
    lng: 73.7645,
    nearbyColleges: [
      { collegeId: 'col-1', collegeName: 'PCCOE', distanceKm: 0.6, travelTimeMins: 7 },
      { collegeId: 'col-2', collegeName: 'COEP', distanceKm: 14.5, travelTimeMins: 35 }
    ],
    facilities: [
      'Wi-Fi', 'Hot water', '24-hour water', 'Washing machine', 'CCTV', 'Security', 
      'Study table', 'Cupboard', 'Bed', 'Electricity backup', 'Housekeeping', 'Attached bathroom'
    ],
    photos: [
      'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=1000&q=80'
    ],
    ownerName: 'Mr. Rajesh Patil',
    ownerPhone: '+91 98220 12345',
    ownerEmail: 'rajesh.patil@staynest-demo.com',
    verifiedStatus: 'verified',
    rating: 4.7,
    totalReviews: 48,
    foodAvailable: true,
    foodDetails: '3 Meals daily (Pure Veg). Unlimited Breakfast, Lunch, and Dinner with Sunday Special.',
    rules: [
      'Gate closes at 10:30 PM',
      'No smoking or alcohol on premises',
      'Guests allowed in common lounge only until 8 PM'
    ],
    nearbyTransit: [
      'Akurdi Railway Station - 0.8 km',
      'PCMC Bus Stand - 0.3 km'
    ],
    nearbyAmenities: [
      'SBI ATM - 100m',
      'Medical Store - 50m',
      'Library & Study Room - 200m'
    ],
    isDemoData: true,
    createdAt: '2026-01-15T10:00:00.000Z'
  },
  {
    id: 'pg-102',
    name: 'Sai Krupa Girls PG & Hostel',
    tagline: 'Safe, secure & homely accommodation for female students',
    genderType: 'girls',
    rentPerMonth: 6800,
    securityDeposit: 8000,
    extraChargesDescription: 'Includes Wi-Fi, Water & Maintenance. No hidden costs.',
    totalBeds: 18,
    availableBeds: 2,
    availabilityStatus: 'almost_full',
    sharingTypes: ['single', 'double', 'triple'],
    address: 'Near Station Road, Sector 24, Pradhikaran',
    area: 'Akurdi',
    city: 'Pune',
    state: 'Maharashtra',
    pincode: '411044',
    lat: 18.6489,
    lng: 73.7680,
    nearbyColleges: [
      { collegeId: 'col-1', collegeName: 'PCCOE', distanceKm: 0.9, travelTimeMins: 10 }
    ],
    facilities: [
      'Wi-Fi', 'Hot water', '24-hour water', 'Washing machine', 'CCTV', 'Security', 
      'Study table', 'Cupboard', 'Bed', 'Attached bathroom', 'Mess/Food', 'Housekeeping'
    ],
    photos: [
      'https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1540518614846-7ede433c5172?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1000&q=80'
    ],
    ownerName: 'Mrs. Sunita Deshmukh',
    ownerPhone: '+91 94231 88900',
    ownerEmail: 'saikrupa.pg@staynest-demo.com',
    verifiedStatus: 'verified',
    rating: 4.8,
    totalReviews: 62,
    foodAvailable: true,
    foodDetails: 'Homely Maharashtrian Veg food prepared under hygienic supervision. Tea/Coffee morning & evening.',
    rules: [
      'Strict Biometric entry system',
      'Curfew time: 9:45 PM',
      'Prior parent consent required for night outs'
    ],
    nearbyTransit: [
      'Akurdi Station - 0.4 km',
      'Auto Stand - 50m'
    ],
    nearbyAmenities: [
      'HDFC ATM - 150m',
      'Stationery & Xerox Shop - 100m'
    ],
    isDemoData: true,
    createdAt: '2026-01-20T12:30:00.000Z'
  },
  {
    id: 'pg-103',
    name: 'Shivajinagar Scholars Co-Living',
    tagline: 'Modern Unisex PG near COEP & FC Road',
    genderType: 'unisex',
    rentPerMonth: 9500,
    securityDeposit: 15000,
    extraChargesDescription: 'Includes AC usage up to 100 units/month per room.',
    totalBeds: 30,
    availableBeds: 8,
    availabilityStatus: 'available',
    sharingTypes: ['single', 'double'],
    address: 'Lane 5, Ghole Road, Shivajinagar',
    area: 'Shivajinagar',
    city: 'Pune',
    state: 'Maharashtra',
    pincode: '411005',
    lat: 18.5285,
    lng: 73.8540,
    nearbyColleges: [
      { collegeId: 'col-2', collegeName: 'COEP', distanceKm: 0.8, travelTimeMins: 9 },
      { collegeId: 'col-1', collegeName: 'PCCOE', distanceKm: 15.1, travelTimeMins: 38 }
    ],
    facilities: [
      'Wi-Fi', 'Hot water', '24-hour water', 'Washing machine', 'Refrigerator', 'CCTV', 
      'Security', 'Study table', 'Cupboard', 'Bed', 'Electricity backup', 'Attached bathroom', 
      'Common area', 'Kitchen'
    ],
    photos: [
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1000&q=80'
    ],
    ownerName: 'Vikram Joshi',
    ownerPhone: '+91 98901 44556',
    ownerEmail: 'vikram.scholars@staynest-demo.com',
    verifiedStatus: 'verified',
    rating: 4.6,
    totalReviews: 35,
    foodAvailable: false,
    foodDetails: 'Self-cooking kitchen with gas stove, microwave, and fridge available. Nearby mess option available at ₹3,000/month.',
    rules: [
      'Biometric access 24x7',
      'Self-cleanliness inside room',
      'Quiet hours after 11 PM'
    ],
    nearbyTransit: [
      'Shivajinagar Metro Station - 0.5 km',
      'COEP Bus Stop - 0.7 km'
    ],
    nearbyAmenities: [
      'FC Road Cafe Street - 300m',
      'General Stores & Supermarket - 100m'
    ],
    isDemoData: true,
    createdAt: '2026-02-01T14:15:00.000Z'
  },
  {
    id: 'pg-104',
    name: 'Powai Lakeview Executive PG',
    tagline: 'Luxury PG accommodation for IIT Bombay students & researchers',
    genderType: 'boys',
    rentPerMonth: 12500,
    securityDeposit: 20000,
    extraChargesDescription: 'Maintenance ₹500/month extra.',
    totalBeds: 16,
    availableBeds: 4,
    availabilityStatus: 'available',
    sharingTypes: ['single', 'double'],
    address: 'Near Main Gate, Central Avenue, Powai',
    area: 'Powai',
    city: 'Mumbai',
    state: 'Maharashtra',
    pincode: '400076',
    lat: 19.1310,
    lng: 72.9150,
    nearbyColleges: [
      { collegeId: 'col-4', collegeName: 'IIT Bombay', distanceKm: 0.5, travelTimeMins: 5 }
    ],
    facilities: [
      'Wi-Fi', 'Hot water', '24-hour water', 'Washing machine', 'Refrigerator', 'CCTV', 
      'Security', 'Study table', 'Cupboard', 'Bed', 'Electricity backup', 'Housekeeping', 
      'Attached bathroom', 'Mess/Food', 'Parking'
    ],
    photos: [
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=1000&q=80'
    ],
    ownerName: 'Amitabh Sharma',
    ownerPhone: '+91 98200 99887',
    ownerEmail: 'powai.pg@staynest-demo.com',
    verifiedStatus: 'verified',
    rating: 4.9,
    totalReviews: 89,
    foodAvailable: true,
    foodDetails: 'North Indian & South Indian thali provided. High hygiene standard.',
    rules: [
      'Identity card mandatory for entry',
      'No unauthorized guests overnight'
    ],
    nearbyTransit: [
      'IIT Main Gate Bus Stop - 200m',
      'Kanjurmarg Railway Station - 2.5 km'
    ],
    nearbyAmenities: [
      'Galleria Shopping Mall - 600m',
      'ICICI Bank ATM - 150m'
    ],
    isDemoData: true,
    createdAt: '2026-02-05T09:00:00.000Z'
  },
  {
    id: 'pg-105',
    name: 'Bibwewadi Heights Student Residency',
    tagline: 'Affordable & comfortable PG near VIT Pune campus',
    genderType: 'boys',
    rentPerMonth: 6200,
    securityDeposit: 7500,
    extraChargesDescription: 'Electricity sharing among roommates.',
    totalBeds: 20,
    availableBeds: 1,
    availabilityStatus: 'almost_full',
    sharingTypes: ['double', 'triple'],
    address: 'Upper Indira Nagar, Near VIT Gate 2, Bibwewadi',
    area: 'Bibwewadi',
    city: 'Pune',
    state: 'Maharashtra',
    pincode: '411037',
    lat: 18.4650,
    lng: 73.8695,
    nearbyColleges: [
      { collegeId: 'col-3', collegeName: 'VIT Pune', distanceKm: 0.4, travelTimeMins: 5 }
    ],
    facilities: [
      'Wi-Fi', 'Hot water', '24-hour water', 'CCTV', 'Security', 'Study table', 
      'Cupboard', 'Bed', 'Housekeeping'
    ],
    photos: [
      'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1507652313519-d4e9174996dd?auto=format&fit=crop&w=1000&q=80'
    ],
    ownerName: 'Sanjay Kadam',
    ownerPhone: '+91 97665 33221',
    ownerEmail: 'sanjay.kadam@staynest-demo.com',
    verifiedStatus: 'verified',
    rating: 4.4,
    totalReviews: 29,
    foodAvailable: true,
    foodDetails: 'Mess facilities available on ground floor at extra ₹2,800/month.',
    rules: [
      'No loud music past 10 PM',
      'Rent due on 1st of every month'
    ],
    nearbyTransit: [
      'VIT Bus stop - 300m'
    ],
    nearbyAmenities: [
      'PPM Mess - 50m',
      'Print & Stationery - 20m'
    ],
    isDemoData: true,
    createdAt: '2026-02-10T11:20:00.000Z'
  },
  {
    id: 'pg-106',
    name: 'Matunga Pearl Girls Hostel',
    tagline: 'Peaceful accommodation close to VJTI & ICT Mumbai',
    genderType: 'girls',
    rentPerMonth: 10500,
    securityDeposit: 15000,
    extraChargesDescription: 'Water filter & Wi-Fi included.',
    totalBeds: 15,
    availableBeds: 3,
    availabilityStatus: 'available',
    sharingTypes: ['double', 'triple'],
    address: 'Five Bungalows Lane, Near Five Gardens, Matunga',
    area: 'Matunga',
    city: 'Mumbai',
    state: 'Maharashtra',
    pincode: '400019',
    lat: 19.0235,
    lng: 72.8575,
    nearbyColleges: [
      { collegeId: 'col-5', collegeName: 'VJTI', distanceKm: 0.4, travelTimeMins: 5 }
    ],
    facilities: [
      'Wi-Fi', 'Hot water', '24-hour water', 'Washing machine', 'CCTV', 'Security', 
      'Study table', 'Cupboard', 'Bed', 'Housekeeping', 'Attached bathroom', 'Mess/Food'
    ],
    photos: [
      'https://images.unsplash.com/photo-1540518614846-7ede433c5172?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1000&q=80'
    ],
    ownerName: 'Meena Shah',
    ownerPhone: '+91 98199 44332',
    ownerEmail: 'meenashah@staynest-demo.com',
    verifiedStatus: 'verified',
    rating: 4.7,
    totalReviews: 53,
    foodAvailable: true,
    foodDetails: 'Healthy Gujarati & South Indian vegetarian meals served twice daily.',
    rules: [
      'Curfew strictly 9:30 PM',
      'Visitors permitted in reception room only'
    ],
    nearbyTransit: [
      'Matunga Central Railway Station - 0.6 km',
      'VJTI Bus Gate - 0.3 km'
    ],
    nearbyAmenities: [
      'Five Gardens Park - 100m',
      'Cafes & Bookstores - 200m'
    ],
    isDemoData: true,
    createdAt: '2026-02-12T16:45:00.000Z'
  }
];

export const INITIAL_REVIEWS: Review[] = [
  {
    id: 'rev-1',
    pgId: 'pg-101',
    authorName: 'Rohan Sharma',
    rating: 5,
    comment: 'Awesome place for PCCOE students! Walking distance from college campus (600m). Wi-Fi speed is around 100 Mbps which is great for coding and assignments. Owner Mr. Patil is very helpful.',
    date: '2026-02-01',
    isVerifiedStudent: true,
    collegeName: 'PCCOE',
    status: 'approved'
  },
  {
    id: 'rev-2',
    pgId: 'pg-101',
    authorName: 'Pranav Kulkarni',
    rating: 4,
    comment: 'Clean rooms and good ventilation. The study table in double sharing room is spacious. Food in nearby mess is decent.',
    date: '2026-01-25',
    isVerifiedStudent: true,
    collegeName: 'PCCOE',
    status: 'approved'
  },
  {
    id: 'rev-3',
    pgId: 'pg-102',
    authorName: 'Ananya Verma',
    rating: 5,
    comment: 'Extremely safe PG for girls! Biometric system is always operational and security aunty takes very good care. Homely food is the biggest plus point.',
    date: '2026-02-10',
    isVerifiedStudent: true,
    collegeName: 'PCCOE',
    status: 'approved'
  },
  {
    id: 'rev-4',
    pgId: 'pg-104',
    authorName: 'Siddharth Nair',
    rating: 5,
    comment: 'Top quality rooms right next to IIT Bombay Powai gate. Saves so much commuting time for lab work!',
    date: '2026-02-08',
    isVerifiedStudent: true,
    collegeName: 'IIT Bombay',
    status: 'approved'
  }
];
