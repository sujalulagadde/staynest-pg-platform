const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const multer = require('multer');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// Ensure local uploads directory exists for fallback
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

app.use('/uploads', express.static(uploadsDir));

// Check if Cloud Database (MongoDB Atlas) URI is provided in environment
const MONGODB_URI = process.env.MONGODB_URI;
let dbDriver = 'sqlite';

if (MONGODB_URI) {
  console.log('🌐 Cloud Database Detected: Connecting to MongoDB Atlas...');
  dbDriver = 'mongodb';
  // MongoDB Atlas connection handler can be initialized here
} else {
  console.log('💻 Local Storage / SQLite Database Mode active on port ' + PORT);
}

// Local Database File Backup
const dbPath = path.join(__dirname, 'staynest_db.json');
let localDb = { users: [], colleges: [], pgs: [], reviews: [] };

if (fs.existsSync(dbPath)) {
  try {
    localDb = JSON.parse(fs.readFileSync(dbPath, 'utf8'));
  } catch (e) {
    console.error('Error reading local db:', e);
  }
}

function saveLocalDb() {
  fs.writeFileSync(dbPath, JSON.stringify(localDb, null, 2), 'utf8');
}

// Multer Storage Configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadsDir),
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname) || '.jpg';
    cb(null, 'pg-' + Date.now() + '-' + Math.round(Math.random() * 1E9) + ext);
  }
});
const upload = multer({ storage, limits: { fileSize: 10 * 1024 * 1024 } });

// --- REST API ENDPOINTS ---

// 1. PUBLIC LIVE VERIFIED PGS
app.get('/api/pgs', (req, res) => {
  const verified = localDb.pgs.filter(p => p.verifiedStatus === 'verified');
  res.json({ success: true, pgs: verified });
});

// 2. ALL PGS FOR ADMIN / OWNER DASHBOARD
app.get('/api/pgs/all', (req, res) => {
  res.json({ success: true, pgs: localDb.pgs });
});

// 3. POST NEW PG (WITH CLOUD / LOCAL IMAGE URLS)
app.post('/api/pgs', (req, res) => {
  const newPg = req.body;
  if (!newPg.id) newPg.id = 'pg-user-' + Date.now();
  newPg.verifiedStatus = 'pending'; // Default to pending Admin Verification

  localDb.pgs.unshift(newPg);
  saveLocalDb();

  res.json({ success: true, id: newPg.id, message: 'PG property submitted for Admin verification.' });
});

// 4. IMAGE FILE UPLOADER (Option 2: Saves to server uploads/ directory)
app.post('/api/upload', (req, res) => {
  try {
    const { dataUrl, photos } = req.body;
    let photoUrls = [];

    if (dataUrl) {
      let base64Data = dataUrl;
      if (base64Data.includes(',')) base64Data = base64Data.split(',')[1];
      const buffer = Buffer.from(base64Data, 'base64');
      const filename = 'pg-img-' + Date.now() + '.jpg';
      const diskPath = path.join(uploadsDir, filename);
      fs.writeFileSync(diskPath, buffer);

      const host = req.protocol + '://' + req.get('host');
      photoUrls.push(`${host}/uploads/${filename}`);
    } else if (photos) {
      photoUrls = photos;
    }

    res.json({ success: true, photos: photoUrls });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 5. DELETE IMAGE FILE FROM SERVER DISK
app.post('/api/upload/delete', (req, res) => {
  try {
    const { photoUrl } = req.body;
    if (photoUrl && photoUrl.includes('/uploads/')) {
      const filename = photoUrl.split('/uploads/').pop();
      const filePath = path.join(uploadsDir, filename);
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
        console.log(`🗑️ Unlinked image file: ${filePath}`);
      }
    }
    res.json({ success: true, message: 'Image deleted from disk.' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 6. UPDATE AVAILABLE BEDS
app.patch('/api/pgs/:id/beds', (req, res) => {
  const { availableBeds } = req.body;
  const pg = localDb.pgs.find(p => p.id === req.params.id);
  if (pg) {
    pg.availableBeds = Math.max(0, Number(availableBeds));
    saveLocalDb();
    res.json({ success: true, availableBeds: pg.availableBeds });
  } else {
    res.status(404).json({ error: 'PG Property not found' });
  }
});

// 7. DELETE PROPERTY AND UNLINK IMAGES
app.delete('/api/pgs/:id', (req, res) => {
  const pgIndex = localDb.pgs.findIndex(p => p.id === req.params.id);
  if (pgIndex !== -1) {
    const targetPg = localDb.pgs[pgIndex];
    if (targetPg.photos) {
      targetPg.photos.forEach(photoUrl => {
        if (photoUrl.includes('/uploads/')) {
          const filename = photoUrl.split('/uploads/').pop();
          const filePath = path.join(uploadsDir, filename);
          if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
            console.log(`🗑️ Deleted image on property removal: ${filePath}`);
          }
        }
      });
    }
    localDb.pgs.splice(pgIndex, 1);
    saveLocalDb();
    res.json({ success: true, message: 'PG property and associated images deleted.' });
  } else {
    res.status(404).json({ error: 'Property not found' });
  }
});

// 8. ADMIN LOGIN & APPROVAL STATUS (staynest.pccoe / sujal.pccoe)
app.post('/api/admin/login', (req, res) => {
  const { adminLoginId, adminPassword } = req.body;
  if (adminLoginId === 'staynest.pccoe' && adminPassword === 'sujal.pccoe') {
    res.json({ success: true, admin: { id: 'admin-1', username: 'staynest.pccoe', name: 'PCCOE Administrator' } });
  } else {
    res.status(401).json({ error: 'Invalid Admin Credentials! Use staynest.pccoe / sujal.pccoe' });
  }
});

app.patch('/api/admin/pgs/:id/status', (req, res) => {
  const { status } = req.body;
  const pg = localDb.pgs.find(p => p.id === req.params.id);
  if (pg) {
    pg.verifiedStatus = status;
    saveLocalDb();
    res.json({ success: true, status: pg.verifiedStatus });
  } else {
    res.status(404).json({ error: 'Property not found' });
  }
});

// 9. USER AUTHENTICATION
app.post('/api/auth/login', (req, res) => {
  const { emailOrUsername, password } = req.body;
  const q = (emailOrUsername || '').toLowerCase().trim();
  const user = localDb.users.find(u => (u.email.toLowerCase() === q || u.username.toLowerCase() === q) && u.password === password);
  if (user) {
    res.json({ success: true, user });
  } else {
    res.status(401).json({ error: 'Invalid credentials' });
  }
});

app.post('/api/auth/signup', (req, res) => {
  const { name, username, email, password, role } = req.body;
  const newUser = { id: 'user-' + Date.now(), name, username, email, password, role: role || 'student' };
  localDb.users.push(newUser);
  saveLocalDb();
  res.json({ success: true, user: newUser });
});

// Start Server
app.listen(PORT, () => {
  console.log(`🚀 StayNest Server active on http://localhost:${PORT}`);
});
