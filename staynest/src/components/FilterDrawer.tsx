import React from 'react';
import { FilterState } from '../types';
import { Filter, RotateCcw, X } from 'lucide-react';

interface FilterDrawerProps {
  filters: FilterState;
  setFilters: React.Dispatch<React.SetStateAction<FilterState>>;
  onReset: () => void;
  isOpen?: boolean;
  onClose?: () => void;
  cities: string[];
}

const ALL_FACILITIES = [
  'Wi-Fi', 'Hot water', '24-hour water', 'Washing machine', 'Refrigerator', 
  'CCTV', 'Security', 'Parking', 'Housekeeping', 'Study table', 
  'Cupboard', 'Bed', 'Electricity backup', 'Attached bathroom', 
  'Mess/Food', 'Kitchen', 'Laundry', 'Common area'
];

export const FilterDrawer: React.FC<FilterDrawerProps> = ({
  filters,
  setFilters,
  onReset,
  isOpen,
  onClose,
  cities
}) => {
  const toggleFacility = (facility: string) => {
    setFilters(prev => {
      const exists = prev.facilities.includes(facility);
      return {
        ...prev,
        facilities: exists
          ? prev.facilities.filter(f => f !== facility)
          : [...prev.facilities, facility]
      };
    });
  };

  const toggleSharing = (type: string) => {
    setFilters(prev => {
      const exists = prev.sharingTypes.includes(type);
      return {
        ...prev,
        sharingTypes: exists
          ? prev.sharingTypes.filter(s => s !== type)
          : [...prev.sharingTypes, type]
      };
    });
  };

  const content = (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-200">
        <div className="flex items-center gap-2">
          <Filter className="w-5 h-5 text-brand-600" />
          <h3 className="font-bold text-slate-900 text-base">Filter PGs</h3>
        </div>
        <button
          onClick={onReset}
          className="text-xs font-semibold text-brand-600 hover:text-brand-800 flex items-center gap-1 bg-brand-50 px-2.5 py-1 rounded-md transition-colors"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          Reset All
        </button>
      </div>

      {/* City */}
      <div>
        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
          City
        </label>
        <select
          value={filters.city}
          onChange={(e) => setFilters(prev => ({ ...prev, city: e.target.value }))}
          className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2 text-sm font-medium text-slate-800 focus:ring-2 focus:ring-brand-500"
        >
          <option value="all">All Cities</option>
          {cities.map(c => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
      </div>

      {/* Max Distance Slider */}
      {filters.selectedCollegeId && filters.selectedCollegeId !== 'all' && (
        <div className="p-3 bg-brand-50/50 rounded-xl border border-brand-100">
          <div className="flex justify-between items-center mb-1.5">
            <label className="text-xs font-bold text-brand-900">
              Max Distance from College
            </label>
            <span className="text-xs font-extrabold text-brand-700">
              {filters.maxDistanceKm >= 20 ? 'Any distance' : `Within ${filters.maxDistanceKm} km`}
            </span>
          </div>
          <input
            type="range"
            min="0.5"
            max="20"
            step="0.5"
            value={filters.maxDistanceKm}
            onChange={(e) => setFilters(prev => ({ ...prev, maxDistanceKm: parseFloat(e.target.value) }))}
            className="w-full accent-brand-600 cursor-pointer"
          />
          <div className="flex justify-between text-[10px] text-slate-500 font-medium">
            <span>0.5 km</span>
            <span>5 km</span>
            <span>10 km</span>
            <span>20+ km</span>
          </div>
        </div>
      )}

      {/* Rent Budget Range */}
      <div>
        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
          Monthly Rent Budget (₹)
        </label>
        <div className="flex items-center gap-2 mb-2">
          <input
            type="number"
            placeholder="Min"
            value={filters.minRent || ''}
            onChange={(e) => setFilters(prev => ({ ...prev, minRent: Number(e.target.value) }))}
            className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2 text-xs font-medium text-slate-800"
          />
          <span className="text-slate-400 font-bold">-</span>
          <input
            type="number"
            placeholder="Max"
            value={filters.maxRent < 30000 ? filters.maxRent : ''}
            onChange={(e) => setFilters(prev => ({ ...prev, maxRent: e.target.value ? Number(e.target.value) : 30000 }))}
            className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2 text-xs font-medium text-slate-800"
          />
        </div>
      </div>

      {/* Accommodation / Gender */}
      <div>
        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
          Accommodation Type
        </label>
        <div className="grid grid-cols-4 gap-1 bg-slate-100 p-1 rounded-xl">
          {[
            { id: 'all', label: 'All' },
            { id: 'boys', label: 'Boys' },
            { id: 'girls', label: 'Girls' },
            { id: 'unisex', label: 'Unisex' }
          ].map(item => (
            <button
              key={item.id}
              onClick={() => setFilters(prev => ({ ...prev, genderType: item.id }))}
              className={`py-1.5 rounded-lg text-xs font-bold transition-all ${
                filters.genderType === item.id
                  ? 'bg-white text-brand-700 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      {/* Room Sharing Type */}
      <div>
        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
          Room Sharing Type
        </label>
        <div className="grid grid-cols-2 gap-2">
          {[
            { id: 'single', label: 'Single Room' },
            { id: 'double', label: 'Double Sharing' },
            { id: 'triple', label: 'Triple Sharing' },
            { id: 'four_sharing', label: '4+ Sharing' }
          ].map(item => (
            <label
              key={item.id}
              className={`flex items-center gap-2 p-2 rounded-lg border text-xs font-medium cursor-pointer transition-colors ${
                filters.sharingTypes.includes(item.id)
                  ? 'bg-brand-50 border-brand-300 text-brand-900 font-bold'
                  : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
              }`}
            >
              <input
                type="checkbox"
                checked={filters.sharingTypes.includes(item.id)}
                onChange={() => toggleSharing(item.id)}
                className="w-3.5 h-3.5 rounded text-brand-600 focus:ring-brand-500"
              />
              {item.label}
            </label>
          ))}
        </div>
      </div>

      {/* Facilities Checkboxes */}
      <div>
        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
          Required Facilities ({filters.facilities.length} selected)
        </label>
        <div className="grid grid-cols-2 gap-1.5 max-h-48 overflow-y-auto pr-1">
          {ALL_FACILITIES.map(fac => (
            <label
              key={fac}
              className={`flex items-center gap-2 p-1.5 rounded-md border text-xs font-medium cursor-pointer transition-colors ${
                filters.facilities.includes(fac)
                  ? 'bg-emerald-50 border-emerald-300 text-emerald-900 font-bold'
                  : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
              }`}
            >
              <input
                type="checkbox"
                checked={filters.facilities.includes(fac)}
                onChange={() => toggleFacility(fac)}
                className="w-3.5 h-3.5 rounded text-emerald-600 focus:ring-emerald-500"
              />
              <span className="truncate">{fac}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Ratings */}
      <div>
        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
          Minimum Rating
        </label>
        <div className="flex gap-2">
          {[0, 3, 4, 4.5].map(rating => (
            <button
              key={rating}
              onClick={() => setFilters(prev => ({ ...prev, minRating: rating }))}
              className={`flex-1 py-1.5 rounded-lg text-xs font-bold border transition-all ${
                filters.minRating === rating
                  ? 'bg-amber-500 text-white border-amber-600 shadow-sm'
                  : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
              }`}
            >
              {rating === 0 ? 'Any' : `${rating}+ ⭐`}
            </button>
          ))}
        </div>
      </div>

    </div>
  );

  if (isOpen) {
    return (
      <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-sm flex justify-end">
        <div className="w-full max-w-md bg-white h-full p-6 overflow-y-auto shadow-2xl relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-800"
          >
            <X className="w-6 h-6" />
          </button>
          {content}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
      {content}
    </div>
  );
};
