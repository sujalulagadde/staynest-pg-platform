const mongoose = require('mongoose');

const PGSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  ownerId: { type: String, required: true },
  name: { type: String, required: true },
  tagline: { type: String, default: '' },
  genderType: { type: String, enum: ['boys', 'girls', 'unisex'], required: true },
  rentPerMonth: { type: Number, required: true },
  securityDeposit: { type: Number, required: true },
  extraChargesDescription: { type: String, default: '' },
  totalBeds: { type: Number, required: true },
  availableBeds: { type: Number, required: true },
  sharingTypes: [{ type: String }],
  facilities: [{ type: String }],
  photos: [{ type: String }],
  address: { type: String, required: true },
  area: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, default: 'Maharashtra' },
  pincode: { type: String, required: true },
  lat: { type: Number, default: 18.6502 },
  lng: { type: Number, default: 73.7645 },
  googleMapUrl: { type: String, default: '' },
  ownerName: { type: String, required: true },
  ownerPhone: { type: String, required: true },
  ownerEmail: { type: String, required: true },
  verifiedStatus: { type: String, enum: ['pending', 'verified', 'rejected'], default: 'pending' },
  rating: { type: Number, default: 4.5 },
  totalReviews: { type: Number, default: 1 },
  foodAvailable: { type: Boolean, default: true },
  foodDetails: { type: String, default: '' },
  nearbyColleges: [{
    collegeId: String,
    collegeName: String,
    distanceKm: Number,
    travelTimeMins: Number
  }]
}, { timestamps: true });

module.exports = mongoose.model('PG', PGSchema);
