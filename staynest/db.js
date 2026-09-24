const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const fs = require('fs');

const dbPath = path.join(__dirname, 'staynest.db');
const db = new sqlite3.Database(dbPath);

// Initialize SQLite Schema & Seed Initial Data
db.serialize(() => {
  // 1. Users Table
  db.run(`
    CREATE TABLE IF NOT EXISTS users (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      username TEXT UNIQUE NOT NULL,
      email TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL,
      role TEXT CHECK(role IN ('student', 'owner', 'admin')) NOT NULL
    )
  `);

  // 2. Colleges Table
  db.run(`
    CREATE TABLE IF NOT EXISTS colleges (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      code TEXT NOT NULL,
      city TEXT NOT NULL,
      state TEXT NOT NULL,
      area TEXT NOT NULL,
      image TEXT,
      lat REAL,
      lng REAL
    )
  `);

  // 3. PG Properties Table
  db.run(`
    CREATE TABLE IF NOT EXISTS pg_properties (
      id TEXT PRIMARY KEY,
      owner_id TEXT NOT NULL,
      name TEXT NOT NULL,
      tagline TEXT,
      gender_type TEXT CHECK(gender_type IN ('boys', 'girls', 'unisex')) NOT NULL,
      rent_per_month INTEGER NOT NULL,
      security_deposit INTEGER NOT NULL,
      extra_charges TEXT,
      total_beds INTEGER NOT NULL,
      available_beds INTEGER NOT NULL,
      sharing_types TEXT NOT NULL,
      facilities TEXT NOT NULL,
      photos TEXT NOT NULL,
      address TEXT NOT NULL,
      area TEXT NOT NULL,
      city TEXT NOT NULL,
      state TEXT NOT NULL,
      pincode TEXT NOT NULL,
      lat REAL,
      lng REAL,
      google_map_url TEXT,
      owner_name TEXT NOT NULL,
      owner_phone TEXT NOT NULL,
      owner_email TEXT NOT NULL,
      verified_status TEXT CHECK(verified_status IN ('pending', 'verified', 'rejected')) NOT NULL,
      rating REAL DEFAULT 4.5,
      total_reviews INTEGER DEFAULT 1,
      food_available INTEGER DEFAULT 1,
      food_details TEXT,
      nearby_colleges TEXT NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // 4. Reviews Table
  db.run(`
    CREATE TABLE IF NOT EXISTS reviews (
      id TEXT PRIMARY KEY,
      pg_id TEXT NOT NULL,
      author_name TEXT NOT NULL,
      rating INTEGER NOT NULL,
      comment TEXT NOT NULL,
      college_name TEXT,
      created_at DATE DEFAULT (date('now'))
    )
  `);

  // SEED DEFAULT USERS IF EMPTY
  db.get("SELECT COUNT(*) AS count FROM users", (err, row) => {
    if (row && row.count === 0) {
      const stmt = db.prepare("INSERT INTO users (id, name, username, email, password, role) VALUES (?, ?, ?, ?, ?, ?)");
      stmt.run("user-1", "Rohan Sharma", "rohan123", "rohan@student.com", "password123", "student");
      stmt.run("user-2", "Rajesh Patil", "rajesh_owner", "rajesh@staynest.com", "password123", "owner");
      stmt.run("admin-1", "PCCoE Administrator", "staynest.pccoe", "admin@pccoe.edu", "sujal.pccoe", "admin");
      stmt.finalize();
      console.log("🌱 Default users seeded.");
    }
  });

  // SEED DEFAULT COLLEGES IF EMPTY
  db.get("SELECT COUNT(*) AS count FROM colleges", (err, row) => {
    if (row && row.count === 0) {
      const stmt = db.prepare("INSERT INTO colleges (id, name, code, city, state, area, image, lat, lng) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)");
      stmt.run('col-1', 'Pimpri Chinchwad College of Engineering (PCCOE)', 'PCCOE', 'Pune', 'Maharashtra', 'Akurdi / Nigdi', 'https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=800&q=80', 18.6517, 73.7616);
      stmt.run('col-2', 'College of Engineering Pune (COEP Technological University)', 'COEP', 'Pune', 'Maharashtra', 'Shivajinagar', 'https://images.unsplash.com/photo-1541829070764-84a7d30dd3f3?auto=format&fit=crop&w=800&q=80', 18.5293, 73.8565);
      stmt.run('col-3', 'Vishwakarma Institute of Technology (VIT Pune)', 'VIT Pune', 'Pune', 'Maharashtra', 'Bibwewadi', 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=800&q=80', 18.4636, 73.8682);
      stmt.run('col-4', 'Indian Institute of Technology Bombay (IIT Bombay)', 'IIT Bombay', 'Mumbai', 'Maharashtra', 'Powai', 'https://images.unsplash.com/photo-1592280771190-3e2e4d571952?auto=format&fit=crop&w=800&q=80', 19.1334, 72.9133);
      stmt.run('col-5', 'Veermata Jijabai Technological Institute (VJTI)', 'VJTI', 'Mumbai', 'Maharashtra', 'Matunga', 'https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?auto=format&fit=crop&w=800&q=80', 19.0222, 72.8561);
      stmt.run('col-6', 'Delhi Technological University (DTU)', 'DTU', 'Delhi', 'Delhi', 'Rohini', 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=800&q=80', 28.7499, 77.1170);
      stmt.finalize();
      console.log("🌱 Default colleges seeded.");
    }
  });

  // SEED DEFAULT PGS IF EMPTY
  db.get("SELECT COUNT(*) AS count FROM pg_properties", (err, row) => {
    if (row && row.count === 0) {
      const stmt = db.prepare(`
        INSERT INTO pg_properties (
          id, owner_id, name, tagline, gender_type, rent_per_month, security_deposit, extra_charges,
          total_beds, available_beds, sharing_types, facilities, photos, address, area, city, state, pincode,
          lat, lng, google_map_url, owner_name, owner_phone, owner_email, verified_status, rating, total_reviews,
          food_available, food_details, nearby_colleges
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `);

      stmt.run(
        'pg-101', 'user-2', 'Sunrise Luxury Student Living', 'Premium Boys PG with modern study lounge & high-speed Wi-Fi',
        'boys', 7500, 10000, 'Electricity billed at ₹9/unit on actual sub-meter reading.', 24, 5,
        JSON.stringify(['double', 'triple']),
        JSON.stringify(['Wi-Fi', 'Hot water', '24-hour water', 'Washing machine', 'CCTV', 'Security', 'Study table', 'Cupboard', 'Bed', 'Electricity backup', 'Housekeeping', 'Attached bathroom']),
        JSON.stringify(['https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=1000&q=80', 'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=1000&q=80']),
        'Plot 42, Sector 26, Pradhikaran, Akurdi', 'Akurdi', 'Pune', 'Maharashtra', '411044',
        18.6502, 73.7645, 'https://maps.google.com/?q=18.6502,73.7645',
        'Rajesh Patil', '+91 98220 12345', 'rajesh@staynest.com', 'verified', 4.7, 48, 1,
        '3 Meals daily (Pure Veg). Unlimited Breakfast, Lunch, and Dinner with Sunday Special.',
        JSON.stringify([{ collegeId: 'col-1', collegeName: 'PCCOE', distanceKm: 0.6, travelTimeMins: 7 }])
      );

      stmt.run(
        'pg-102', 'user-2', 'Sai Krupa Girls PG & Hostel', 'Safe, secure & homely accommodation for female students',
        'girls', 6800, 8000, 'Includes Wi-Fi, Water & Maintenance. No hidden costs.', 18, 2,
        JSON.stringify(['single', 'double', 'triple']),
        JSON.stringify(['Wi-Fi', 'Hot water', '24-hour water', 'Washing machine', 'CCTV', 'Security', 'Study table', 'Cupboard', 'Bed', 'Attached bathroom', 'Mess/Food', 'Housekeeping']),
        JSON.stringify(['https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=1000&q=80', 'https://images.unsplash.com/photo-1540518614846-7ede433c5172?auto=format&fit=crop&w=1000&q=80']),
        'Near Station Road, Sector 24, Pradhikaran', 'Akurdi', 'Pune', 'Maharashtra', '411044',
        18.6489, 73.7680, 'https://maps.google.com/?q=18.6489,73.7680',
        'Sunita Deshmukh', '+91 94231 88900', 'saikrupa.pg@staynest-demo.com', 'verified', 4.8, 62, 1,
        'Homely Maharashtrian Veg food prepared under hygienic supervision.',
        JSON.stringify([{ collegeId: 'col-1', collegeName: 'PCCOE', distanceKm: 0.9, travelTimeMins: 10 }])
      );

      stmt.finalize();
      console.log("🌱 Default PGs seeded.");
    }
  });
});

module.exports = db;
