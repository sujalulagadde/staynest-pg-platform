import React, { useState } from 'react';
import { PG, College, FilterState } from '../types';
import { PGCard } from '../components/PGCard';
import { FilterDrawer } from '../components/FilterDrawer';
import { MapView } from '../components/MapView';
import { 
  Building2, MapPin, SlidersHorizontal, Grid, Map, 
  Sparkles, ArrowUpDown, X
} from 'lucide-react';

interface PGsPageProps {
  pgs: PG[];
  colleges: College[];
  filters: FilterState;
  setFilters: React.Dispatch<React.SetStateAction<FilterState>>;
  onResetFilters: () => void;
  onViewDetails: (pg: PG) => void;
  onToggleCompare: (pg: PG) => void;
  comparedPGs: PG[];
  onOpenCompareModal: () => void;
  onRemoveCompared: (pgId: string) => void;
}

export const PGsPage: React.FC<PGsPageProps> = ({
  pgs,
  colleges,
  filters,
  setFilters,
  onResetFilters,
  onViewDetails,
  onToggleCompare,
  comparedPGs,
  onOpenCompareModal,
  onRemoveCompared
}) => {
  const [viewMode, setViewMode] = useState<'grid' | 'map'>('grid');
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  const selectedCollege = colleges.find(c => c.id === filters.selectedCollegeId);
  const cities = Array.from(new Set(colleges.map(c => c.city)));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      
      {/* Selected College Header Banner */}
      {selectedCollege ? (
        <div className="p-6 bg-gradient-to-r from-slate-900 via-brand-900 to-slate-900 text-white rounded-3xl shadow-xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-400/20 text-amber-300 text-xs font-bold border border-amber-400/30">
              <Building2 className="w-3.5 h-3.5" /> Selected College Campus
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold">{selectedCollege.name}</h1>
            <p className="text-xs text-slate-300 flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-brand-400" /> {selectedCollege.area}, {selectedCollege.city}, {selectedCollege.state}
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <span className="px-4 py-2 rounded-xl bg-white/10 text-white font-extrabold text-sm border border-white/20">
              {pgs.length} PGs Available Nearby
            </span>
            <button
              onClick={() => setFilters(prev => ({ ...prev, selectedCollegeId: 'all' }))}
              className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-white/10"
              title="Clear selected college"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>
      ) : (
        <div className="p-6 bg-slate-900 text-white rounded-3xl shadow-xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl font-extrabold">All Colleges & Cities</h1>
            <p className="text-xs text-slate-300 mt-1">Showing all verified PG listings across India</p>
          </div>
          <span className="px-4 py-2 rounded-xl bg-white/10 text-white font-extrabold text-sm border border-white/20">
            {pgs.length} PGs Found
          </span>
        </div>
      )}

      {/* Control Bar: View Switcher, Filter Mobile Toggle, Sorting */}
      <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-sm flex flex-col sm:flex-row justify-between items-center gap-3">
        
        {/* Mobile Filter Button */}
        <button
          onClick={() => setMobileFilterOpen(true)}
          className="lg:hidden w-full sm:w-auto py-2 px-4 bg-slate-100 text-slate-800 font-bold text-xs rounded-xl flex items-center justify-center gap-2 border border-slate-300"
        >
          <SlidersHorizontal className="w-4 h-4 text-brand-600" />
          Filter PGs ({filters.facilities.length + (filters.genderType !== 'all' ? 1 : 0)})
        </button>

        {/* View Mode Toggle (Grid vs Map) */}
        <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl w-full sm:w-auto">
          <button
            onClick={() => setViewMode('grid')}
            className={`flex-1 sm:flex-initial px-4 py-1.5 rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 transition-all ${
              viewMode === 'grid'
                ? 'bg-white text-slate-900 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Grid className="w-4 h-4" /> Grid View
          </button>
          <button
            onClick={() => setViewMode('map')}
            className={`flex-1 sm:flex-initial px-4 py-1.5 rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 transition-all ${
              viewMode === 'map'
                ? 'bg-white text-slate-900 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Map className="w-4 h-4 text-brand-600" /> Interactive Map View
          </button>
        </div>

        {/* Sorting Dropdown */}
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <ArrowUpDown className="w-4 h-4 text-slate-400 shrink-0" />
          <select
            value={filters.sortBy}
            onChange={(e) => setFilters(prev => ({ ...prev, sortBy: e.target.value as any }))}
            className="w-full sm:w-auto bg-slate-50 border border-slate-300 rounded-xl p-2 text-xs font-bold text-slate-800"
          >
            <option value="rent_low">Lowest Rent First</option>
            <option value="rent_high">Highest Rent First</option>
            <option value="rating">Highest Rating First</option>
            <option value="distance">Nearest to College</option>
            <option value="reviews">Most Reviewed</option>
          </select>
        </div>

      </div>

      {/* Main Layout Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Desktop Filter Sidebar */}
        <div className="hidden lg:block lg:col-span-3 sticky top-20">
          <FilterDrawer
            filters={filters}
            setFilters={setFilters}
            onReset={onResetFilters}
            cities={cities}
          />
        </div>

        {/* PGs Listing / Map Section */}
        <div className="lg:col-span-9 space-y-6">
          
          {viewMode === 'map' ? (
            <div className="space-y-4">
              <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-sm">
                <MapView
                  college={selectedCollege}
                  allPGs={pgs}
                  height="500px"
                  onSelectPG={onViewDetails}
                />
              </div>
            </div>
          ) : (
            pgs.length === 0 ? (
              <div className="p-12 text-center bg-white rounded-3xl border border-slate-200 space-y-3">
                <Building2 className="w-12 h-12 text-slate-300 mx-auto" />
                <h3 className="text-lg font-bold text-slate-800">No PGs found matching your filters</h3>
                <p className="text-xs text-slate-500 max-w-sm mx-auto">
                  Try clearing some facility filters or expanding your budget and distance settings.
                </p>
                <button
                  onClick={onResetFilters}
                  className="px-4 py-2 bg-brand-600 text-white text-xs font-bold rounded-xl"
                >
                  Reset Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {pgs.map((pg) => (
                  <PGCard
                    key={pg.id}
                    pg={pg}
                    selectedCollegeId={filters.selectedCollegeId}
                    onViewDetails={onViewDetails}
                    onToggleCompare={onToggleCompare}
                    isCompared={comparedPGs.some(p => p.id === pg.id)}
                  />
                ))}
              </div>
            )
          )}

        </div>

      </div>

      {/* Mobile Filter Drawer */}
      <FilterDrawer
        filters={filters}
        setFilters={setFilters}
        onReset={onResetFilters}
        isOpen={mobileFilterOpen}
        onClose={() => setMobileFilterOpen(false)}
        cities={cities}
      />

      {/* Floating Compare Action Bar */}
      {comparedPGs.length > 0 && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 bg-slate-900 text-white px-6 py-3 rounded-2xl shadow-2xl border border-slate-700 flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span className="text-xs font-bold">{comparedPGs.length} PGs Selected for Compare</span>
          </div>

          <div className="flex items-center gap-2">
            {comparedPGs.map(p => (
              <span key={p.id} className="text-[11px] font-semibold bg-slate-800 px-2 py-0.5 rounded flex items-center gap-1">
                {p.name.slice(0, 10)}...
                <button onClick={() => onRemoveCompared(p.id)} className="text-slate-400 hover:text-white">
                  <X className="w-3 h-3" />
                </button>
              </span>
            ))}
          </div>

          <button
            onClick={onOpenCompareModal}
            className="px-4 py-1.5 bg-brand-500 hover:bg-brand-400 text-white font-bold text-xs rounded-xl transition-all"
          >
            Compare Now →
          </button>
        </div>
      )}

    </div>
  );
};
