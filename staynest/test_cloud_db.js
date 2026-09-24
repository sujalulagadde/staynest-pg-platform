const mongoose = require('mongoose');

const uri = "mongodb+srv://sujalulagadde25_db_user:UsiMLAakChZXRWkQ@cluster0.09fztyt.mongodb.net/staynest?retryWrites=true&w=majority&appName=Cluster0";

console.log("⚡ Testing connection to MongoDB Atlas Cloud Database...");

mongoose.connect(uri)
  .then(async () => {
    console.log("🎉 SUCCESS: Connected to MongoDB Atlas Cloud Database!");
    
    // Seed initial collections if needed
    const User = require('./models/User');
    const PG = require('./models/PG');

    const userCount = await User.countDocuments();
    if (userCount === 0) {
      await User.create([
        { id: 'user-1', name: 'Rohan Sharma', username: 'rohan123', email: 'rohan@student.com', password: 'password123', role: 'student' },
        { id: 'user-2', name: 'Rajesh Patil', username: 'rajesh_owner', email: 'rajesh@staynest.com', password: 'password123', role: 'owner' },
        { id: 'admin-1', name: 'PCCoE Administrator', username: 'staynest.pccoe', email: 'admin@pccoe.edu', password: 'sujal.pccoe', role: 'admin' }
      ]);
      console.log("🌱 Default users seeded in MongoDB Atlas.");
    }

    const pgCount = await PG.countDocuments();
    if (pgCount === 0) {
      await PG.create([
        {
          id: 'pg-101', ownerId: 'user-2', name: 'Sunrise Luxury Student Living', tagline: 'Premium Boys PG with modern study lounge & high-speed Wi-Fi',
          genderType: 'boys', rentPerMonth: 7500, securityDeposit: 10000, extraChargesDescription: 'Electricity billed at ₹9/unit on actual sub-meter reading.',
          totalBeds: 24, availableBeds: 5, sharingTypes: ['double', 'triple'],
          facilities: ['Wi-Fi', 'Hot water', '24-hour water', 'Washing machine', 'CCTV', 'Security', 'Study table', 'Cupboard', 'Bed', 'Electricity backup', 'Housekeeping', 'Attached bathroom'],
          photos: ['https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=1000&q=80', 'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=1000&q=80'],
          address: 'Plot 42, Sector 26, Pradhikaran, Akurdi', area: 'Akurdi', city: 'Pune', state: 'Maharashtra', pincode: '411044',
          lat: 18.6502, lng: 73.7645, googleMapUrl: 'https://maps.google.com/?q=18.6502,73.7645',
          ownerName: 'Rajesh Patil', ownerPhone: '+91 98220 12345', ownerEmail: 'rajesh@staynest.com',
          verifiedStatus: 'verified', rating: 4.7, totalReviews: 48, foodAvailable: true,
          foodDetails: '3 Meals daily (Pure Veg). Unlimited Breakfast, Lunch, and Dinner with Sunday Special.',
          nearbyColleges: [{ collegeId: 'col-1', collegeName: 'PCCOE', distanceKm: 0.6, travelTimeMins: 7 }]
        },
        {
          id: 'pg-102', ownerId: 'user-2', name: 'Sai Krupa Girls PG & Hostel', tagline: 'Safe, secure & homely accommodation for female students',
          genderType: 'girls', rentPerMonth: 6800, securityDeposit: 8000, extraChargesDescription: 'Includes Wi-Fi, Water & Maintenance. No hidden costs.',
          totalBeds: 18, availableBeds: 2, sharingTypes: ['single', 'double', 'triple'],
          facilities: ['Wi-Fi', 'Hot water', '24-hour water', 'Washing machine', 'CCTV', 'Security', 'Study table', 'Cupboard', 'Bed', 'Attached bathroom', 'Mess/Food', 'Housekeeping'],
          photos: ['https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=1000&q=80', 'https://images.unsplash.com/photo-1540518614846-7ede433c5172?auto=format&fit=crop&w=1000&q=80'],
          address: 'Near Station Road, Sector 24, Pradhikaran', area: 'Akurdi', city: 'Pune', state: 'Maharashtra', pincode: '411044',
          lat: 18.6489, lng: 73.7680, googleMapUrl: 'https://maps.google.com/?q=18.6489,73.7680',
          ownerName: 'Sunita Deshmukh', ownerPhone: '+91 94231 88900', ownerEmail: 'saikrupa.pg@staynest-demo.com',
          verifiedStatus: 'verified', rating: 4.8, totalReviews: 62, foodAvailable: true,
          foodDetails: 'Homely Maharashtrian Veg food prepared under hygienic supervision.',
          nearbyColleges: [{ collegeId: 'col-1', collegeName: 'PCCOE', distanceKm: 0.9, travelTimeMins: 10 }]
        }
      ]);
      console.log("🌱 Default PG properties seeded in MongoDB Atlas.");
    }

    const collections = await mongoose.connection.db.collections();
    console.log("📋 Active collections in Cloud Database:", collections.map(c => c.collectionName).join(', '));
    process.exit(0);
  })
  .catch(err => {
    console.error("❌ Connection failed:", err.message);
    process.exit(1);
  });
