import React from 'react';
import { Search, MapPin, Building2, ShieldCheck, Star, Sparkles } from 'lucide-react';
import { College } from '../types';

interface HeroSearchProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedCollegeId: string;
  setSelectedCollegeId: (id: string) => void;
  colleges: College[];
  onSearch: () => void;
}

export const HeroSearch: React.FC<HeroSearchProps> = ({
  searchQuery,
  setSearchQuery,
  selectedCollegeId,
  setSelectedCollegeId,
  colleges,
  onSearch
}) => {
  return (
    <div className="relative bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 text-white pt-16 pb-20 overflow-hidden">
      {/* Background Glow Overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-brand-600/20 via-transparent to-transparent pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-500/10 border border-brand-500/30 text-brand-300 text-xs sm:text-sm font-semibold mb-6 shadow-inner">
          <Sparkles className="w-4 h-4 text-brand-400" />
          <span>Multi-College Student PG Accommodation Platform</span>
        </div>

        {/* Hero Title */}
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight max-w-4xl mx-auto leading-tight mb-4">
          Find the Right PG <br />
          <span className="bg-gradient-to-r from-brand-300 via-brand-400 to-brand-200 bg-clip-text text-transparent">
            Near Your College
          </span>
        </h1>

        <p className="text-slate-300 text-base sm:text-lg max-w-2xl mx-auto mb-10 leading-relaxed">
          Not limited to PCCOE — Works for students from <span className="font-semibold text-white">ANY</span> college or university. Compare rent, facilities, distance, ratings, and contact owners directly.
        </p>

        {/* Main Search Box Container */}
        <div className="max-w-4xl mx-auto bg-white/10 backdrop-blur-xl p-3 sm:p-4 rounded-2xl border border-white/20 shadow-2xl">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
            
            {/* Search Input */}
            <div className="md:col-span-6 relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <Search className="w-5 h-5 text-brand-400" />
              </div>
              <input
                type="text"
                placeholder="Enter college name (e.g. PCCOE, COEP, IIT Bombay)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && onSearch()}
                className="w-full pl-11 pr-4 py-3.5 bg-white text-slate-900 placeholder-slate-400 rounded-xl font-medium text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 shadow-inner"
              />
            </div>

            {/* Select College Dropdown */}
            <div className="md:col-span-4 relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <Building2 className="w-5 h-5 text-brand-400" />
              </div>
              <select
                value={selectedCollegeId}
                onChange={(e) => setSelectedCollegeId(e.target.value)}
                className="w-full pl-11 pr-4 py-3.5 bg-white text-slate-900 rounded-xl font-medium text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 appearance-none cursor-pointer"
              >
                <option value="all">All Colleges / Cities</option>
                {colleges.map((col) => (
                  <option key={col.id} value={col.id}>
                    {col.name} ({col.city})
                  </option>
                ))}
              </select>
            </div>

            {/* Submit Button */}
            <div className="md:col-span-2">
              <button
                onClick={onSearch}
                className="w-full py-3.5 bg-gradient-to-r from-brand-600 to-brand-500 hover:from-brand-500 hover:to-brand-400 text-white font-bold rounded-xl text-sm transition-all shadow-lg shadow-brand-600/30 flex items-center justify-center gap-2 active:scale-95"
              >
                <Search className="w-4 h-4" />
                Search
              </button>
            </div>
          </div>

          {/* Quick College Tags */}
          <div className="mt-4 pt-3 border-t border-white/10 flex flex-wrap items-center justify-center gap-2 text-xs text-slate-300">
            <span className="font-semibold text-slate-400 flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-brand-400" /> Popular Colleges:
            </span>
            {colleges.map((col) => (
              <button
                key={col.id}
                onClick={() => {
                  setSelectedCollegeId(col.id);
                  onSearch();
                }}
                className={`px-2.5 py-1 rounded-md text-xs font-semibold transition-all ${
                  selectedCollegeId === col.id
                    ? 'bg-brand-500 text-white shadow-sm'
                    : 'bg-white/10 hover:bg-white/20 text-slate-200'
                }`}
              >
                {col.code} ({col.city})
              </button>
            ))}
          </div>
        </div>

        {/* Feature Stats */}
        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
          <div className="p-4 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm">
            <div className="text-2xl sm:text-3xl font-extrabold text-white">100%</div>
            <div className="text-xs text-slate-400 mt-0.5">Multi-College Support</div>
          </div>
          <div className="p-4 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm">
            <div className="text-2xl sm:text-3xl font-extrabold text-emerald-400 flex items-center justify-center gap-1">
              <ShieldCheck className="w-6 h-6" /> Verified
            </div>
            <div className="text-xs text-slate-400 mt-0.5">Admin Approved PGs</div>
          </div>
          <div className="p-4 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm">
            <div className="text-2xl sm:text-3xl font-extrabold text-brand-400">15+</div>
            <div className="text-xs text-slate-400 mt-0.5">Facility Filter Checklist</div>
          </div>
          <div className="p-4 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm">
            <div className="text-2xl sm:text-3xl font-extrabold text-amber-400 flex items-center justify-center gap-1">
              <Star className="w-5 h-5 fill-amber-400 text-amber-400" /> 4.8
            </div>
            <div className="text-xs text-slate-400 mt-0.5">Verified Student Reviews</div>
          </div>
        </div>

      </div>
    </div>
  );
};
