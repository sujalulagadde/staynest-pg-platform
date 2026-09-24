import React, { useState } from 'react';
import { PG, Review } from '../types';
import { PGBadge } from './PGBadge';
import { MapView } from './MapView';
import { storageService } from '../services/storageService';
import { 
  X, MapPin, Star, Phone, Mail, CheckCircle2, Shield, 
  BedDouble, UserCheck, Utensils, AlertTriangle, MessageSquare, 
  ChevronLeft, ChevronRight, Share2, Sparkles, AlertCircle
} from 'lucide-react';

interface PGDetailsModalProps {
  pg: PG;
  onClose: () => void;
  selectedCollegeId?: string;
}

export const PGDetailsModal: React.FC<PGDetailsModalProps> = ({
  pg,
  onClose,
  selectedCollegeId
}) => {
  const [activePhotoIndex, setActivePhotoIndex] = useState(0);
  const [reviews, setReviews] = useState<Review[]>(() => storageService.getReviews(pg.id));
  
  // Modals state inside details view
  const [showContactModal, setShowContactModal] = useState(false);
  const [showReportModal, setShowReportModal] = useState(false);
  const [showReviewForm, setShowReviewForm] = useState(false);

  // Review Form State
  const [reviewAuthor, setReviewAuthor] = useState('');
  const [reviewCollege, setReviewCollege] = useState('');
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewComment, setReviewComment] = useState('');
  const [captchaAnswer, setCaptchaAnswer] = useState('');
  const [captchaError, setCaptchaError] = useState('');

  // Report Form State
  const [reportReason, setReportReason] = useState('Incorrect Information');
  const [reportDetails, setReportDetails] = useState('');
  const [reportSubmitted, setReportSubmitted] = useState(false);

  const activeDist = selectedCollegeId && selectedCollegeId !== 'all'
    ? pg.nearbyColleges.find(c => c.collegeId === selectedCollegeId)
    : pg.nearbyColleges[0];

  // Rating breakdown calculation
  const getRatingCount = (star: number) => {
    return reviews.filter(r => Math.round(r.rating) === star).length;
  };

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (captchaAnswer.trim() !== '7') {
      setCaptchaError('Anti-spam verification failed (5 + 2 = 7). Please enter 7.');
      return;
    }
    setCaptchaError('');

    const newRev = storageService.addReview({
      pgId: pg.id,
      authorName: reviewAuthor.trim() || 'Anonymous Student',
      rating: reviewRating,
      comment: reviewComment.trim(),
      isVerifiedStudent: true,
      collegeName: reviewCollege.trim() || 'College Student'
    });

    setReviews(prev => [newRev, ...prev]);
    setShowReviewForm(false);
    setReviewComment('');
    setReviewAuthor('');
    setReviewCollege('');
    alert('Thank you! Your review has been published.');
  };

  const handleReportSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    storageService.submitReport({
      pgId: pg.id,
      pgName: pg.name,
      reason: reportReason,
      details: reportDetails
    });
    setReportSubmitted(true);
    setTimeout(() => {
      setShowReportModal(false);
      setReportSubmitted(false);
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-5xl w-full max-h-[92vh] overflow-hidden flex flex-col shadow-2xl border border-slate-200 relative">
        
        {/* Sticky Modal Header */}
        <div className="p-4 sm:p-5 bg-white border-b border-slate-200 flex items-center justify-between z-10">
          <div className="flex items-center gap-3">
            <PGBadge status={pg.verifiedStatus} isDemo={pg.isDemoData} />
            <h2 className="text-lg sm:text-xl font-extrabold text-slate-900 line-clamp-1">{pg.name}</h2>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                if (navigator.share) {
                  navigator.share({ title: pg.name, url: window.location.href });
                } else {
                  alert('URL copied to clipboard!');
                }
              }}
              className="p-2 text-slate-500 hover:text-slate-900 rounded-lg hover:bg-slate-100"
              title="Share listing"
            >
              <Share2 className="w-5 h-5" />
            </button>
            <button
              onClick={onClose}
              className="p-2 text-slate-500 hover:text-slate-900 rounded-lg hover:bg-slate-100"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Modal Scrollable Content */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-8">
          
          {/* Top Section: Photo Carousel & Key Highlights Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            
            {/* Gallery Column */}
            <div className="lg:col-span-7 space-y-3">
              <div className="relative h-64 sm:h-80 w-full rounded-2xl overflow-hidden bg-slate-900 shadow-md">
                <img
                  src={pg.photos[activePhotoIndex] || pg.photos[0]}
                  alt={pg.name}
                  className="w-full h-full object-cover"
                />
                
                {pg.photos.length > 1 && (
                  <>
                    <button
                      onClick={() => setActivePhotoIndex(prev => (prev === 0 ? pg.photos.length - 1 : prev - 1))}
                      className="absolute left-3 top-1/2 -translate-y-1/2 p-2 bg-slate-900/60 hover:bg-slate-900 text-white rounded-full backdrop-blur-sm"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => setActivePhotoIndex(prev => (prev === pg.photos.length - 1 ? 0 : prev + 1))}
                      className="absolute right-3 top-1/2 -translate-y-1/2 p-2 bg-slate-900/60 hover:bg-slate-900 text-white rounded-full backdrop-blur-sm"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </>
                )}

                <div className="absolute bottom-3 right-3 px-2.5 py-1 rounded-md bg-slate-900/80 text-white text-xs font-bold backdrop-blur-md">
                  {activePhotoIndex + 1} / {pg.photos.length} Photos
                </div>
              </div>

              {/* Thumbnails */}
              <div className="flex gap-2 overflow-x-auto pb-1">
                {pg.photos.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActivePhotoIndex(idx)}
                    className={`h-16 w-20 rounded-xl overflow-hidden shrink-0 border-2 transition-all ${
                      activePhotoIndex === idx ? 'border-brand-600 scale-95' : 'border-transparent opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt={`Thumb ${idx}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>

            {/* Quick Specs Column */}
            <div className="lg:col-span-5 flex flex-col justify-between space-y-4 bg-slate-50 p-5 rounded-2xl border border-slate-200">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="px-3 py-1 rounded-full text-xs font-extrabold uppercase bg-brand-100 text-brand-800">
                    {pg.genderType} PG
                  </span>
                  <div className="flex items-center gap-1 bg-amber-100 px-2.5 py-1 rounded-md border border-amber-300">
                    <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                    <span className="text-sm font-extrabold text-amber-900">{pg.rating}</span>
                    <span className="text-xs text-amber-700 font-medium">({reviews.length} reviews)</span>
                  </div>
                </div>

                <h1 className="text-2xl font-extrabold text-slate-900">{pg.name}</h1>
                <p className="text-xs text-slate-500 mt-1 flex items-center gap-1">
                  <MapPin className="w-4 h-4 text-slate-400 shrink-0" />
                  {pg.address}, {pg.area}, {pg.city}, {pg.pincode}
                </p>

                {/* Distance Badge */}
                {activeDist && (
                  <div className="mt-3 p-2.5 bg-amber-50 rounded-xl border border-amber-200 text-xs font-bold text-amber-900 flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-amber-600 shrink-0" />
                    <span>{activeDist.distanceKm} km from {activeDist.collegeName}</span>
                  </div>
                )}

                {/* Rent & Deposit Box */}
                <div className="mt-4 p-4 bg-white rounded-xl border border-slate-200 shadow-sm space-y-2">
                  <div className="flex justify-between items-baseline">
                    <span className="text-xs font-bold text-slate-400 uppercase">Monthly Rent</span>
                    <span className="text-2xl font-extrabold text-brand-700">₹{pg.rentPerMonth.toLocaleString('en-IN')} <span className="text-xs text-slate-500 font-normal">/mo</span></span>
                  </div>
                  <div className="flex justify-between items-center text-xs text-slate-600 pt-2 border-t border-slate-100">
                    <span>Security Deposit:</span>
                    <span className="font-bold text-slate-900">₹{pg.securityDeposit.toLocaleString('en-IN')}</span>
                  </div>
                  {pg.extraChargesDescription && (
                    <p className="text-[11px] text-slate-500 italic">{pg.extraChargesDescription}</p>
                  )}
                </div>

                {/* Availability Row */}
                <div className="mt-3 grid grid-cols-2 gap-2 text-xs">
                  <div className="p-3 bg-white rounded-xl border border-slate-200 flex items-center gap-2">
                    <UserCheck className="w-5 h-5 text-emerald-600 shrink-0" />
                    <div>
                      <span className="text-[10px] text-slate-400 font-bold block uppercase">Available Beds</span>
                      <span className="font-extrabold text-emerald-700 text-sm">{pg.availableBeds} / {pg.totalBeds} Beds</span>
                    </div>
                  </div>

                  <div className="p-3 bg-white rounded-xl border border-slate-200 flex items-center gap-2">
                    <BedDouble className="w-5 h-5 text-brand-600 shrink-0" />
                    <div>
                      <span className="text-[10px] text-slate-400 font-bold block uppercase">Room Types</span>
                      <span className="font-extrabold text-slate-800 text-xs capitalize">{pg.sharingTypes.join(', ')}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2 pt-2">
                <button
                  onClick={() => setShowContactModal(true)}
                  className="w-full py-3 bg-gradient-to-r from-brand-600 to-brand-500 hover:from-brand-500 hover:to-brand-400 text-white font-bold rounded-xl text-sm transition-all shadow-md flex items-center justify-center gap-2 active:scale-95"
                >
                  <Phone className="w-4 h-4" />
                  Contact Owner ({pg.ownerName})
                </button>

                <button
                  onClick={() => setShowReportModal(true)}
                  className="w-full py-2 bg-slate-200/80 hover:bg-slate-200 text-slate-700 font-semibold rounded-xl text-xs transition-colors flex items-center justify-center gap-1.5"
                >
                  <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
                  Report Listing / False Info
                </button>
              </div>
            </div>

          </div>

          {/* Facilities Checklist Grid */}
          <div>
            <h3 className="text-base font-bold text-slate-900 uppercase tracking-wider mb-4 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-brand-600" /> Facilities & Amenities Provided
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
              {pg.facilities.map((fac, idx) => (
                <div key={idx} className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center gap-2 text-xs font-semibold text-slate-800">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>{fac}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Food / Mess & Rules Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Food Details */}
            <div className="p-5 bg-orange-50/50 rounded-2xl border border-orange-200 space-y-2">
              <h4 className="font-bold text-orange-950 text-sm flex items-center gap-2">
                <Utensils className="w-4 h-4 text-orange-600" /> Food & Mess Information
              </h4>
              <p className="text-xs text-orange-900 leading-relaxed">
                {pg.foodAvailable ? pg.foodDetails || 'Healthy meals served daily.' : 'Self-cooking or external mess option.'}
              </p>
            </div>

            {/* PG Rules */}
            <div className="p-5 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
              <h4 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                <Shield className="w-4 h-4 text-slate-600" /> PG Rules & Regulations
              </h4>
              <ul className="space-y-1 text-xs text-slate-700">
                {pg.rules.map((rule, idx) => (
                  <li key={idx} className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-400" />
                    {rule}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Location Map View */}
          <div>
            <h3 className="text-base font-bold text-slate-900 uppercase tracking-wider mb-3">
              Map Location & Nearby Transit
            </h3>
            <MapView pg={pg} height="320px" />
          </div>

          {/* Student Reviews & Star Breakdown */}
          <div className="pt-6 border-t border-slate-200 space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <h3 className="text-lg font-extrabold text-slate-900 flex items-center gap-2">
                  <MessageSquare className="w-5 h-5 text-brand-600" /> Student Ratings & Reviews
                </h3>
                <p className="text-xs text-slate-500">Real feedback from students residing at this property</p>
              </div>

              <button
                onClick={() => setShowReviewForm(!showReviewForm)}
                className="px-4 py-2 bg-brand-50 text-brand-700 font-bold text-xs rounded-xl border border-brand-200 hover:bg-brand-100 transition-colors"
              >
                + Write a Review
              </button>
            </div>

            {/* Write Review Form */}
            {showReviewForm && (
              <form onSubmit={handleReviewSubmit} className="p-5 bg-slate-50 rounded-2xl border border-brand-200 space-y-4">
                <h4 className="font-bold text-slate-900 text-sm">Submit Student Review</h4>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-600 mb-1">Your Name</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Rahul Verma"
                      value={reviewAuthor}
                      onChange={(e) => setReviewAuthor(e.target.value)}
                      className="w-full bg-white border border-slate-300 rounded-lg p-2 text-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-600 mb-1">Your College</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. PCCOE / COEP"
                      value={reviewCollege}
                      onChange={(e) => setReviewCollege(e.target.value)}
                      className="w-full bg-white border border-slate-300 rounded-lg p-2 text-xs"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">Rating (1 to 5 Stars)</label>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map(star => (
                      <button
                        type="button"
                        key={star}
                        onClick={() => setReviewRating(star)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold border transition-colors ${
                          reviewRating === star ? 'bg-amber-400 text-slate-900 border-amber-500' : 'bg-white text-slate-600'
                        }`}
                      >
                        {star} ⭐
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">Written Review</label>
                  <textarea
                    required
                    rows={3}
                    placeholder="Describe room condition, Wi-Fi speed, food quality, owner behavior..."
                    value={reviewComment}
                    onChange={(e) => setReviewComment(e.target.value)}
                    className="w-full bg-white border border-slate-300 rounded-lg p-2 text-xs"
                  />
                </div>

                {/* Anti-spam math captcha */}
                <div className="p-3 bg-amber-50 rounded-xl border border-amber-200">
                  <label className="block text-xs font-bold text-amber-900 mb-1">
                    Anti-Spam Verification: What is 5 + 2?
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Enter answer (7)"
                    value={captchaAnswer}
                    onChange={(e) => setCaptchaAnswer(e.target.value)}
                    className="w-32 bg-white border border-amber-300 rounded-md p-1.5 text-xs font-bold"
                  />
                  {captchaError && <p className="text-xs text-rose-600 font-bold mt-1">{captchaError}</p>}
                </div>

                <div className="flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setShowReviewForm(false)}
                    className="px-4 py-2 text-slate-600 text-xs font-semibold hover:bg-slate-200 rounded-lg"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 bg-brand-600 text-white text-xs font-bold rounded-lg hover:bg-brand-700"
                  >
                    Submit Review
                  </button>
                </div>
              </form>
            )}

            {/* Ratings Bar Chart Breakdown */}
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
              <div className="md:col-span-4 text-center border-r border-slate-200 pr-4">
                <div className="text-4xl font-extrabold text-slate-900">{pg.rating}</div>
                <div className="flex justify-center text-amber-400 my-1">
                  {[1, 2, 3, 4, 5].map(s => (
                    <Star key={s} className="w-4 h-4 fill-amber-400" />
                  ))}
                </div>
                <div className="text-xs text-slate-500 font-medium">Based on {reviews.length} ratings</div>
              </div>

              <div className="md:col-span-8 space-y-1.5 text-xs">
                {[5, 4, 3, 2, 1].map(star => {
                  const count = getRatingCount(star);
                  const pct = reviews.length > 0 ? (count / reviews.length) * 100 : 0;
                  return (
                    <div key={star} className="flex items-center gap-2">
                      <span className="w-12 text-slate-600 font-semibold">{star} stars</span>
                      <div className="flex-1 bg-slate-200 h-2 rounded-full overflow-hidden">
                        <div className="bg-amber-400 h-full rounded-full" style={{ width: `${pct}%` }} />
                      </div>
                      <span className="w-8 text-right text-slate-500 font-mono">{count}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Reviews List */}
            <div className="space-y-3">
              {reviews.length === 0 ? (
                <p className="text-xs text-slate-500 italic text-center py-4">No reviews yet. Be the first student to review!</p>
              ) : (
                reviews.map(rev => (
                  <div key={rev.id} className="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-1.5">
                    <div className="flex justify-between items-start">
                      <div>
                        <span className="font-bold text-slate-900 text-sm">{rev.authorName}</span>
                        {rev.collegeName && (
                          <span className="ml-2 text-[10px] font-bold bg-brand-50 text-brand-700 px-2 py-0.5 rounded-full border border-brand-200">
                            {rev.collegeName} Student
                          </span>
                        )}
                      </div>
                      <span className="text-[11px] text-slate-400">{rev.date}</span>
                    </div>

                    <div className="flex items-center gap-1 text-amber-400">
                      {[...Array(rev.rating)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                      ))}
                    </div>

                    <p className="text-xs text-slate-700 leading-relaxed">{rev.comment}</p>
                  </div>
                ))
              )}
            </div>

          </div>

        </div>

        {/* Contact Owner Modal */}
        {showContactModal && (
          <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl max-w-md w-full p-6 space-y-4 shadow-2xl relative border border-slate-200">
              <button
                onClick={() => setShowContactModal(false)}
                className="absolute top-4 right-4 text-slate-400 hover:text-slate-800"
              >
                <X className="w-5 h-5" />
              </button>
              
              <div className="flex items-center gap-3 pb-3 border-b border-slate-100">
                <div className="w-10 h-10 rounded-xl bg-brand-100 text-brand-700 flex items-center justify-center">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-base">Contact PG Owner</h3>
                  <p className="text-xs text-slate-500">{pg.name}</p>
                </div>
              </div>

              <div className="space-y-3 text-xs">
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                  <span className="text-[10px] font-bold text-slate-400 block uppercase">Owner Name</span>
                  <span className="text-sm font-extrabold text-slate-900">{pg.ownerName}</span>
                </div>

                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                  <span className="text-[10px] font-bold text-slate-400 block uppercase">Phone Number</span>
                  <a
                    href={`tel:${pg.ownerPhone}`}
                    className="text-base font-extrabold text-brand-600 hover:underline flex items-center gap-1.5 mt-0.5"
                  >
                    <Phone className="w-4 h-4" /> {pg.ownerPhone}
                  </a>
                </div>

                {pg.ownerEmail && (
                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                    <span className="text-[10px] font-bold text-slate-400 block uppercase">Email Address</span>
                    <a href={`mailto:${pg.ownerEmail}`} className="text-xs font-semibold text-slate-800 hover:underline flex items-center gap-1 mt-0.5">
                      <Mail className="w-3.5 h-3.5" /> {pg.ownerEmail}
                    </a>
                  </div>
                )}

                <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-amber-900 text-[11px] flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  <span>Always mention you found this listing on <strong>StayNest</strong> when calling the owner.</span>
                </div>
              </div>

              <button
                onClick={() => setShowContactModal(false)}
                className="w-full py-2.5 bg-slate-900 text-white font-bold text-xs rounded-xl hover:bg-slate-800"
              >
                Done
              </button>
            </div>
          </div>
        )}

        {/* Report Modal */}
        {showReportModal && (
          <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl max-w-md w-full p-6 space-y-4 shadow-2xl relative border border-slate-200">
              <button
                onClick={() => setShowReportModal(false)}
                className="absolute top-4 right-4 text-slate-400 hover:text-slate-800"
              >
                <X className="w-5 h-5" />
              </button>

              <h3 className="font-bold text-slate-900 text-base flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-rose-600" /> Report PG Listing
              </h3>

              {reportSubmitted ? (
                <div className="p-4 bg-emerald-50 text-emerald-800 rounded-xl text-xs font-bold text-center">
                  Report submitted to admin for moderation. Thank you!
                </div>
              ) : (
                <form onSubmit={handleReportSubmit} className="space-y-3 text-xs">
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Reason for report</label>
                    <select
                      value={reportReason}
                      onChange={(e) => setReportReason(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2 text-xs font-medium"
                    >
                      <option value="Incorrect Rent / Pricing">Incorrect Rent / Pricing</option>
                      <option value="Wrong Distance from College">Wrong Distance from College</option>
                      <option value="Owner Unreachable / Fraud">Owner Unreachable / Fraud</option>
                      <option value="Unsafe Environment">Unsafe Environment</option>
                      <option value="Spam / Duplicate">Spam / Duplicate</option>
                    </select>
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Additional details</label>
                    <textarea
                      required
                      rows={3}
                      placeholder="Explain what is incorrect or unsafe..."
                      value={reportDetails}
                      onChange={(e) => setReportDetails(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2 text-xs"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-2.5 bg-rose-600 text-white font-bold rounded-xl text-xs hover:bg-rose-700"
                  >
                    Submit Report to Admin
                  </button>
                </form>
              )}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
