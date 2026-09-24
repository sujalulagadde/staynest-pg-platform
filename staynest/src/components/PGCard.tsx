import React from 'react';
import { PG } from '../types';
import { PGBadge } from './PGBadge';
import { 
  MapPin, Star, Wifi, Flame, Shield, BedDouble, 
  Check, UserCheck, Utensils, Tv, Layers
} from 'lucide-react';

interface PGCardProps {
  pg: PG;
  selectedCollegeId?: string;
  onViewDetails: (pg: PG) => void;
  onToggleCompare?: (pg: PG) => void;
  isCompared?: boolean;
}

export const PGCard: React.FC<PGCardProps> = ({
  pg,
  selectedCollegeId,
  onViewDetails,
  onToggleCompare,
  isCompared
}) => {
  // Find distance to selected college
  const activeCollegeDist = selectedCollegeId && selectedCollegeId !== 'all'
    ? pg.nearbyColleges.find(c => c.collegeId === selectedCollegeId)
    : pg.nearbyColleges[0];

  const genderStyles = {
    boys: { label: 'Boys PG', bg: 'bg-blue-50 text-blue-700 border-blue-200' },
    girls: { label: 'Girls PG', bg: 'bg-pink-50 text-pink-700 border-pink-200' },
    unisex: { label: 'Unisex Co-Living', bg: 'bg-purple-50 text-purple-700 border-purple-200' }
  };

  const currentGender = genderStyles[pg.genderType] || genderStyles.boys;

  // Icon mapping helper for main facility chips
  const renderFacilityIcon = (facility: string) => {
    const fLower = facility.toLowerCase();
    if (fLower.includes('wifi') || fLower.includes('wi-fi')) return <Wifi className="w-3.5 h-3.5 text-brand-600" />;
    if (fLower.includes('water')) return <Flame className="w-3.5 h-3.5 text-amber-600" />;
    if (fLower.includes('cctv') || fLower.includes('security')) return <Shield className="w-3.5 h-3.5 text-emerald-600" />;
    if (fLower.includes('mess') || fLower.includes('food')) return <Utensils className="w-3.5 h-3.5 text-orange-600" />;
    if (fLower.includes('tv')) return <Tv className="w-3.5 h-3.5 text-blue-600" />;
    return <Check className="w-3.5 h-3.5 text-slate-500" />;
  };

  return (
    <div className="group relative rounded-2xl bg-white border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden">
      
      {/* Top Image & Overlay */}
      <div className="relative h-48 w-full bg-slate-100 overflow-hidden">
        <img
          src={pg.photos[0] || 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=800&q=80'}
          alt={pg.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />

        {/* Top Floating Badges */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
          <PGBadge status={pg.verifiedStatus} isDemo={pg.isDemoData} />

          <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold border shadow-sm ${currentGender.bg}`}>
            {currentGender.label}
          </span>
        </div>

        {/* Bottom Distance Pill over image */}
        {activeCollegeDist && (
          <div className="absolute bottom-3 left-3 px-2.5 py-1 rounded-md text-xs font-bold bg-slate-900/90 text-amber-300 backdrop-blur-md flex items-center gap-1 border border-slate-700">
            <MapPin className="w-3.5 h-3.5 text-amber-400" />
            <span>{activeCollegeDist.distanceKm} km from {activeCollegeDist.collegeName}</span>
          </div>
        )}

        {/* Compare Checkbox */}
        {onToggleCompare && (
          <label className="absolute bottom-3 right-3 flex items-center gap-1.5 px-2.5 py-1 bg-white/90 backdrop-blur-md rounded-md text-xs font-semibold text-slate-800 cursor-pointer shadow hover:bg-white transition-colors">
            <input
              type="checkbox"
              checked={isCompared}
              onChange={() => onToggleCompare(pg)}
              className="w-3.5 h-3.5 rounded text-brand-600 focus:ring-brand-500 cursor-pointer"
            />
            <span>Compare</span>
          </label>
        )}
      </div>

      {/* Card Content Body */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          {/* Title & Rating */}
          <div className="flex items-start justify-between gap-2 mb-1">
            <h3 className="font-extrabold text-slate-900 text-base leading-snug group-hover:text-brand-600 transition-colors line-clamp-1">
              {pg.name}
            </h3>
            
            <div className="flex items-center gap-1 bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200 shrink-0">
              <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
              <span className="text-xs font-bold text-amber-900">{pg.rating > 0 ? pg.rating : 'New'}</span>
              {pg.totalReviews > 0 && (
                <span className="text-[10px] text-amber-700 font-medium">({pg.totalReviews})</span>
              )}
            </div>
          </div>

          {/* Location Area */}
          <p className="text-xs text-slate-500 flex items-center gap-1 mb-3">
            <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <span>{pg.address}, {pg.area}, {pg.city}</span>
          </p>

          {/* Key Parameters Row: Beds & Sharing */}
          <div className="grid grid-cols-2 gap-2 p-2.5 bg-slate-50 rounded-xl border border-slate-100 mb-3 text-xs">
            <div className="flex items-center gap-1.5">
              <UserCheck className="w-4 h-4 text-emerald-600 shrink-0" />
              <div>
                <span className="text-slate-400 block text-[10px] uppercase font-bold">Beds Left</span>
                <span className="font-extrabold text-slate-800">
                  {pg.availableBeds} / {pg.totalBeds} Beds
                </span>
              </div>
            </div>

            <div className="flex items-center gap-1.5">
              <BedDouble className="w-4 h-4 text-brand-600 shrink-0" />
              <div>
                <span className="text-slate-400 block text-[10px] uppercase font-bold">Sharing</span>
                <span className="font-extrabold text-slate-800 capitalize">
                  {pg.sharingTypes.join(', ')}
                </span>
              </div>
            </div>
          </div>

          {/* Facilities Chips */}
          <div className="flex flex-wrap gap-1.5 mb-4">
            {pg.facilities.slice(0, 4).map((fac, idx) => (
              <span 
                key={idx}
                className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] font-medium bg-slate-100 text-slate-700 border border-slate-200"
              >
                {renderFacilityIcon(fac)}
                {fac}
              </span>
            ))}
            {pg.facilities.length > 4 && (
              <span className="px-2 py-0.5 rounded-md text-[11px] font-bold bg-brand-50 text-brand-700">
                +{pg.facilities.length - 4} more
              </span>
            )}
          </div>
        </div>

        {/* Card Footer: Pricing & Action Button */}
        <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-3">
          <div>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Monthly Rent</span>
            <div className="flex items-baseline gap-1">
              <span className="text-lg font-extrabold text-slate-900">
                ₹{pg.rentPerMonth.toLocaleString('en-IN')}
              </span>
              <span className="text-xs text-slate-500 font-medium">/mo</span>
            </div>
          </div>

          <button
            onClick={() => onViewDetails(pg)}
            className="px-4 py-2 bg-brand-600 hover:bg-brand-700 text-white font-bold text-xs rounded-xl transition-colors shadow-sm flex items-center gap-1 active:scale-95"
          >
            <Layers className="w-3.5 h-3.5" />
            View Details
          </button>
        </div>

      </div>
    </div>
  );
};
