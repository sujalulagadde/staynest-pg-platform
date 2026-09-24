import React, { useState } from 'react';
import { College, GenderType, SharingType } from '../types';
import { storageService } from '../services/storageService';
import { X, Plus, Trash2, Clock, CheckCircle2, Building2, Upload, Image as ImageIcon } from 'lucide-react';

interface AddPGModalProps {
  colleges: College[];
  onClose: () => void;
  onSuccess: () => void;
}

const ALL_FACILITIES = [
  'Wi-Fi', 'Hot water', '24-hour water', 'Washing machine', 'Refrigerator', 
  'CCTV', 'Security', 'Parking', 'Housekeeping', 'Study table', 
  'Cupboard', 'Bed', 'Electricity backup', 'Attached bathroom', 
  'Mess/Food', 'Kitchen', 'Laundry', 'Common area'
];

const SAMPLE_ROOM_PRESETS = [
  { name: 'Bed & Study Desk', url: 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=1000&q=80' },
  { name: 'Twin Bed Sharing', url: 'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=1000&q=80' },
  { name: 'Hostel Room', url: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=1000&q=80' },
  { name: 'Modern Living', url: 'https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=1000&q=80' }
];

export const AddPGModal: React.FC<AddPGModalProps> = ({
  colleges,
  onClose,
  onSuccess
}) => {
  const [submitted, setSubmitted] = useState(false);

  const [ownerName, setOwnerName] = useState('');
  const [ownerPhone, setOwnerPhone] = useState('');
  const [ownerEmail, setOwnerEmail] = useState('');

  const [name, setName] = useState('');
  const [tagline, setTagline] = useState('');
  const [genderType, setGenderType] = useState<GenderType>('boys');

  const [address, setAddress] = useState('');
  const [area, setArea] = useState('');
  const [city, setCity] = useState(colleges[0]?.city || 'Pune');
  const [state] = useState('Maharashtra');
  const [pincode, setPincode] = useState('');
  const [googleMapUrl, setGoogleMapUrl] = useState('');

  const [nearbyColleges, setNearbyColleges] = useState<Array<{ collegeId: string; collegeName: string; distanceKm: number }>>([
    { collegeId: colleges[0]?.id || 'col-1', collegeName: colleges[0]?.name || 'PCCOE', distanceKm: 1.0 }
  ]);

  const [rentPerMonth, setRentPerMonth] = useState<number>(7000);
  const [securityDeposit, setSecurityDeposit] = useState<number>(10000);
  const [extraCharges, setExtraCharges] = useState('Electricity billed as per sub-meter.');

  const [totalBeds, setTotalBeds] = useState<number>(10);
  const [availableBeds, setAvailableBeds] = useState<number>(3);
  const [sharingTypes, setSharingTypes] = useState<SharingType[]>(['double', 'triple']);

  const [facilities, setFacilities] = useState<string[]>(['Wi-Fi', 'Hot water', '24-hour water', 'Study table', 'Cupboard', 'Bed']);

  const [foodAvailable, setFoodAvailable] = useState(true);
  const [foodDetails, setFoodDetails] = useState('3 Veg Meals daily included.');

  const [rules, setRules] = useState('Gate closes at 10:00 PM\nNo smoking or alcohol');
  
  // Photo uploader state
  const [uploadedPhotos, setUploadedPhotos] = useState<string[]>([
    'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=1000&q=80'
  ]);
  const [customUrlInput, setCustomUrlInput] = useState('');

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      files.forEach(file => {
        const reader = new FileReader();
        reader.onload = (event) => {
          if (event.target?.result) {
            setUploadedPhotos(prev => [...prev, event.target!.result as string]);
          }
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const handleAddCustomUrl = () => {
    if (customUrlInput.trim()) {
      setUploadedPhotos(prev => [...prev, customUrlInput.trim()]);
      setCustomUrlInput('');
    }
  };

  const handleRemovePhoto = (index: number) => {
    setUploadedPhotos(prev => prev.filter((_, idx) => idx !== index));
  };

  const addCollegeRow = () => {
    setNearbyColleges(prev => [
      ...prev,
      { collegeId: colleges[0]?.id || 'col-1', collegeName: colleges[0]?.name || 'PCCOE', distanceKm: 2.0 }
    ]);
  };

  const removeCollegeRow = (index: number) => {
    setNearbyColleges(prev => prev.filter((_, idx) => idx !== index));
  };

  const toggleFacility = (fac: string) => {
    setFacilities(prev => 
      prev.includes(fac) ? prev.filter(f => f !== fac) : [...prev, fac]
    );
  };

  const toggleSharing = (st: SharingType) => {
    setSharingTypes(prev => 
      prev.includes(st) ? prev.filter(s => s !== st) : [...prev, st]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const rulesList = rules
      .split('\n')
      .map(r => r.trim())
      .filter(r => r.length > 0);

    const finalPhotos = uploadedPhotos.length > 0 ? uploadedPhotos : [
      'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=1000&q=80'
    ];

    storageService.submitPG({
      name,
      tagline,
      genderType,
      rentPerMonth,
      securityDeposit,
      extraChargesDescription: extraCharges,
      totalBeds,
      availableBeds,
      availabilityStatus: availableBeds > 3 ? 'available' : (availableBeds > 0 ? 'almost_full' : 'full'),
      sharingTypes,
      address,
      area,
      city,
      state,
      pincode,
      lat: 18.5204 + (Math.random() * 0.05 - 0.025),
      lng: 73.8567 + (Math.random() * 0.05 - 0.025),
      nearbyColleges,
      facilities,
      photos: finalPhotos,
      ownerName,
      ownerPhone,
      ownerEmail,
      foodAvailable,
      foodDetails,
      rules: rulesList
    });

    setSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-hidden flex flex-col shadow-2xl border border-slate-200">
        
        {/* Header */}
        <div className="p-4 sm:p-5 bg-slate-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Building2 className="w-5 h-5 text-emerald-400" />
            <h2 className="text-lg font-bold">Add Your PG Property (Owner Registration)</h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-4 sm:p-6 overflow-y-auto flex-1">
          {submitted ? (
            <div className="p-8 text-center space-y-4 max-w-md mx-auto">
              <div className="w-16 h-16 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center mx-auto">
                <Clock className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-extrabold text-slate-900">Submission Received!</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Your PG listing <strong className="text-slate-900">"{name}"</strong> with <strong className="text-slate-900">{uploadedPhotos.length} photo(s)</strong> has been saved with status:
              </p>
              
              <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-extrabold bg-amber-100 text-amber-800 border border-amber-300">
                🟡 Pending Verification
              </div>

              <p className="text-xs text-slate-500 bg-slate-50 p-4 rounded-xl border border-slate-200">
                To prevent spam and protect students, an Administrator will review your PG details and photos. Once verified, your listing will receive the <strong className="text-emerald-700">Verified PG Badge</strong> and appear in public college searches.
              </p>

              <button
                onClick={() => {
                  onSuccess();
                  onClose();
                }}
                className="w-full py-3 bg-brand-600 text-white font-bold rounded-xl text-xs hover:bg-brand-700"
              >
                Back to Platform
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6 text-xs">
              
              {/* Owner Info */}
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-3">
                <h4 className="font-bold text-slate-900 uppercase tracking-wider text-xs">1. Owner Contact Details</h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Owner Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Ramesh Kumar"
                      value={ownerName}
                      onChange={(e) => setOwnerName(e.target.value)}
                      className="w-full p-2 bg-white border border-slate-300 rounded-lg text-xs"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Phone Number *</label>
                    <input
                      type="tel"
                      required
                      placeholder="+91 98220 00000"
                      value={ownerPhone}
                      onChange={(e) => setOwnerPhone(e.target.value)}
                      className="w-full p-2 bg-white border border-slate-300 rounded-lg text-xs"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Email (Optional)</label>
                    <input
                      type="email"
                      placeholder="owner@email.com"
                      value={ownerEmail}
                      onChange={(e) => setOwnerEmail(e.target.value)}
                      className="w-full p-2 bg-white border border-slate-300 rounded-lg text-xs"
                    />
                  </div>
                </div>
              </div>

              {/* PG Details */}
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-3">
                <h4 className="font-bold text-slate-900 uppercase tracking-wider text-xs">2. PG Property Basics</h4>
                
                <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
                  <div className="sm:col-span-8">
                    <label className="block font-semibold text-slate-700 mb-1">PG Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Sunrise Luxury Boys PG"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full p-2 bg-white border border-slate-300 rounded-lg text-xs font-bold"
                    />
                  </div>
                  <div className="sm:col-span-4">
                    <label className="block font-semibold text-slate-700 mb-1">Gender Suitability *</label>
                    <select
                      value={genderType}
                      onChange={(e) => setGenderType(e.target.value as GenderType)}
                      className="w-full p-2 bg-white border border-slate-300 rounded-lg text-xs font-bold"
                    >
                      <option value="boys">Boys PG</option>
                      <option value="girls">Girls PG</option>
                      <option value="unisex">Unisex Co-Living</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Tagline / Short Catchphrase</label>
                  <input
                    type="text"
                    placeholder="e.g. Modern PG with high speed Wi-Fi near PCCOE campus"
                    value={tagline}
                    onChange={(e) => setTagline(e.target.value)}
                    className="w-full p-2 bg-white border border-slate-300 rounded-lg text-xs"
                  />
                </div>
              </div>

              {/* Address & City */}
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-3">
                <h4 className="font-bold text-slate-900 uppercase tracking-wider text-xs">3. Location & Google Maps Link</h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">City *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Pune / Mumbai"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className="w-full p-2 bg-white border border-slate-300 rounded-lg text-xs"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Area / Locality *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Akurdi / Nigdi"
                      value={area}
                      onChange={(e) => setArea(e.target.value)}
                      className="w-full p-2 bg-white border border-slate-300 rounded-lg text-xs"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Pincode *</label>
                    <input
                      type="text"
                      required
                      placeholder="411044"
                      value={pincode}
                      onChange={(e) => setPincode(e.target.value)}
                      className="w-full p-2 bg-white border border-slate-300 rounded-lg text-xs"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Full Street Address *</label>
                  <input
                    type="text"
                    required
                    placeholder="Plot 42, Sector 26, Pradhikaran"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="w-full p-2 bg-white border border-slate-300 rounded-lg text-xs"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Google Maps Link URL (Optional)</label>
                  <input
                    type="url"
                    placeholder="https://maps.google.com/?q=..."
                    value={googleMapUrl}
                    onChange={(e) => setGoogleMapUrl(e.target.value)}
                    className="w-full p-2 bg-white border border-slate-300 rounded-lg text-xs"
                  />
                </div>
              </div>

              {/* Multi-College Distance Association */}
              <div className="p-4 bg-brand-50/50 rounded-2xl border border-brand-200 space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-brand-950 uppercase tracking-wider text-xs">
                    4. Nearby Colleges & Distance (Multi-College Support)
                  </h4>
                  <button
                    type="button"
                    onClick={addCollegeRow}
                    className="px-2.5 py-1 bg-brand-600 text-white font-bold rounded-lg text-[11px] hover:bg-brand-700 flex items-center gap-1"
                  >
                    <Plus className="w-3.5 h-3.5" /> Add College
                  </button>
                </div>

                <div className="space-y-2">
                  {nearbyColleges.map((row, idx) => (
                    <div key={idx} className="flex items-center gap-2 bg-white p-2.5 rounded-xl border border-brand-200">
                      <select
                        value={row.collegeId}
                        onChange={(e) => {
                          const selectedCol = colleges.find(c => c.id === e.target.value);
                          setNearbyColleges(prev => {
                            const updated = [...prev];
                            updated[idx].collegeId = e.target.value;
                            updated[idx].collegeName = selectedCol ? selectedCol.name : '';
                            return updated;
                          });
                        }}
                        className="flex-1 p-1.5 bg-slate-50 border border-slate-300 rounded-md font-semibold text-xs"
                      >
                        {colleges.map(c => (
                          <option key={c.id} value={c.id}>{c.name} ({c.city})</option>
                        ))}
                      </select>

                      <div className="flex items-center gap-1 w-32 shrink-0">
                        <input
                          type="number"
                          step="0.1"
                          min="0.1"
                          required
                          value={row.distanceKm}
                          onChange={(e) => {
                            const val = parseFloat(e.target.value);
                            setNearbyColleges(prev => {
                              const updated = [...prev];
                              updated[idx].distanceKm = val;
                              return updated;
                            });
                          }}
                          className="w-16 p-1.5 bg-slate-50 border border-slate-300 rounded-md text-xs font-extrabold text-center"
                        />
                        <span className="font-bold text-slate-600">km</span>
                      </div>

                      {nearbyColleges.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeCollegeRow(idx)}
                          className="p-1.5 text-rose-500 hover:text-rose-700"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Pricing & Bed Count */}
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-3">
                <h4 className="font-bold text-slate-900 uppercase tracking-wider text-xs">5. Pricing & Beds</h4>
                
                <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Monthly Rent (₹) *</label>
                    <input
                      type="number"
                      required
                      value={rentPerMonth}
                      onChange={(e) => setRentPerMonth(Number(e.target.value))}
                      className="w-full p-2 bg-white border border-slate-300 rounded-lg text-xs font-bold"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Security Deposit (₹) *</label>
                    <input
                      type="number"
                      required
                      value={securityDeposit}
                      onChange={(e) => setSecurityDeposit(Number(e.target.value))}
                      className="w-full p-2 bg-white border border-slate-300 rounded-lg text-xs font-bold"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Total Beds *</label>
                    <input
                      type="number"
                      required
                      value={totalBeds}
                      onChange={(e) => setTotalBeds(Number(e.target.value))}
                      className="w-full p-2 bg-white border border-slate-300 rounded-lg text-xs"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Available Beds *</label>
                    <input
                      type="number"
                      required
                      value={availableBeds}
                      onChange={(e) => setAvailableBeds(Number(e.target.value))}
                      className="w-full p-2 bg-white border border-slate-300 rounded-lg text-xs font-bold text-emerald-700"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Sharing Types Offered</label>
                  <div className="flex gap-2">
                    {[
                      { id: 'single', label: 'Single Room' },
                      { id: 'double', label: 'Double' },
                      { id: 'triple', label: 'Triple' },
                      { id: 'four_sharing', label: '4+ Sharing' }
                    ].map(st => (
                      <label key={st.id} className="flex items-center gap-1.5 p-2 bg-white rounded-lg border text-xs cursor-pointer">
                        <input
                          type="checkbox"
                          checked={sharingTypes.includes(st.id as SharingType)}
                          onChange={() => toggleSharing(st.id as SharingType)}
                          className="w-3.5 h-3.5 rounded text-brand-600"
                        />
                        <span>{st.label}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>

              {/* Facilities Select */}
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
                <h4 className="font-bold text-slate-900 uppercase tracking-wider text-xs">6. Facilities Checklist</h4>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {ALL_FACILITIES.map(fac => (
                    <label key={fac} className="flex items-center gap-2 p-2 bg-white rounded-lg border text-xs cursor-pointer">
                      <input
                        type="checkbox"
                        checked={facilities.includes(fac)}
                        onChange={() => toggleFacility(fac)}
                        className="w-3.5 h-3.5 rounded text-emerald-600"
                      />
                      <span>{fac}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* RICH PHOTO UPLOADER */}
              <div className="p-4 bg-brand-50/50 rounded-2xl border border-brand-200 space-y-3">
                <div className="flex justify-between items-center">
                  <h4 className="font-bold text-brand-950 uppercase tracking-wider text-xs flex items-center gap-1.5">
                    <ImageIcon className="w-4 h-4 text-brand-600" />
                    7. PG Photos Uploader ({uploadedPhotos.length} Added)
                  </h4>
                  <span className="text-[10px] text-brand-700 font-semibold">Multiple Photos Allowed</span>
                </div>

                {/* Local File Picker */}
                <div className="p-4 bg-white border-2 border-dashed border-brand-300 rounded-xl text-center hover:bg-brand-50/50 transition-colors">
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleFileUpload}
                    className="hidden"
                    id="pg-photo-upload-input"
                  />
                  <label htmlFor="pg-photo-upload-input" className="cursor-pointer flex flex-col items-center gap-1">
                    <Upload className="w-6 h-6 text-brand-600" />
                    <span className="font-bold text-brand-700 text-xs">Click to Choose Photos from Laptop / Phone</span>
                    <span className="text-[10px] text-slate-400">Supports JPG, PNG, WEBP files</span>
                  </label>
                </div>

                {/* Custom URL Input */}
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Or paste an image web URL here..."
                    value={customUrlInput}
                    onChange={(e) => setCustomUrlInput(e.target.value)}
                    className="flex-1 p-2 border border-slate-300 rounded-xl text-xs bg-white"
                  />
                  <button
                    type="button"
                    onClick={handleAddCustomUrl}
                    className="px-3 py-1.5 bg-brand-600 text-white font-bold text-xs rounded-xl hover:bg-brand-700"
                  >
                    + Add URL
                  </button>
                </div>

                {/* Sample Presets */}
                <div>
                  <span className="text-[10px] font-bold text-slate-500 block mb-1">Quick Sample Photos:</span>
                  <div className="flex flex-wrap gap-1.5">
                    {SAMPLE_ROOM_PRESETS.map((preset, idx) => (
                      <button
                        type="button"
                        key={idx}
                        onClick={() => {
                          if (!uploadedPhotos.includes(preset.url)) {
                            setUploadedPhotos(prev => [...prev, preset.url]);
                          }
                        }}
                        className="px-2 py-1 bg-white border border-brand-200 rounded-lg text-[10px] font-semibold text-brand-800 hover:bg-brand-100"
                      >
                        + {preset.name}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Thumbnails Preview Grid */}
                {uploadedPhotos.length > 0 && (
                  <div className="space-y-1 pt-2 border-t border-brand-200">
                    <span className="text-[10px] font-bold text-slate-600 block">Uploaded Photo Previews:</span>
                    <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                      {uploadedPhotos.map((photo, index) => (
                        <div key={index} className="relative group rounded-xl overflow-hidden border border-slate-200 bg-slate-900 h-20">
                          <img src={photo} alt={`Upload ${index}`} className="w-full h-full object-cover" />
                          <button
                            type="button"
                            onClick={() => handleRemovePhoto(index)}
                            className="absolute top-1 right-1 bg-rose-600 text-white w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold shadow-md hover:bg-rose-700"
                            title="Remove photo"
                          >
                            ✕
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Submit Action */}
              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-5 py-2.5 text-slate-600 font-semibold hover:bg-slate-100 rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-brand-600 hover:bg-brand-700 text-white font-bold rounded-xl shadow-md transition-colors flex items-center gap-1.5"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  Submit Listing for Admin Approval
                </button>
              </div>

            </form>
          )}
        </div>

      </div>
    </div>
  );
};
