import React from 'react';
import { College, PG } from '../types';
import { HeroSearch } from '../components/HeroSearch';
import { CollegeCard } from '../components/CollegeCard';
import { PGCard } from '../components/PGCard';
import { DisclaimerBanner } from '../components/DisclaimerBanner';
import { 
  Building2, Search, Filter, PhoneCall, ShieldCheck, 
  Users, Heart, Sparkles, ArrowRight, CheckCircle
} from 'lucide-react';

interface HomePageProps {
  colleges: College[];
  featuredPGs: PG[];
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedCollegeId: string;
  setSelectedCollegeId: (id: string) => void;
  onSearch: () => void;
  onSelectCollege: (id: string) => void;
  onViewPGDetails: (pg: PG) => void;
  onToggleCompare: (pg: PG) => void;
  comparedPGIds: string[];
  onOpenAddPG: () => void;
  onOpenDoc: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  colleges,
  featuredPGs,
  searchQuery,
  setSearchQuery,
  selectedCollegeId,
  setSelectedCollegeId,
  onSearch,
  onSelectCollege,
  onViewPGDetails,
  onToggleCompare,
  comparedPGIds,
  onOpenAddPG,
  onOpenDoc
}) => {
  return (
    <div className="space-y-12">
      
      {/* Hero Search Section */}
      <HeroSearch
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        selectedCollegeId={selectedCollegeId}
        setSelectedCollegeId={setSelectedCollegeId}
        colleges={colleges}
        onSearch={onSearch}
      />

      {/* Safety Disclaimer Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <DisclaimerBanner />
      </div>

      {/* Popular Colleges Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-3">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-50 text-brand-700 text-xs font-bold mb-2">
              <Building2 className="w-3.5 h-3.5" /> Multi-City Institutes
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Popular Educational Institutes
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Select your college to instantly view nearby verified PG accommodations
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {colleges.slice(0, 6).map((college) => (
            <CollegeCard
              key={college.id}
              college={college}
              onSelect={(id) => {
                onSelectCollege(id);
              }}
              isSelected={selectedCollegeId === college.id}
            />
          ))}
        </div>
      </section>

      {/* Featured PGs Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-3">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-bold mb-2 border border-emerald-200">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" /> Admin Verified PGs
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Featured Verified PGs
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Top-rated student accommodations with Wi-Fi, food, security & verified distance
            </p>
          </div>

          <button
            onClick={onSearch}
            className="px-4 py-2 bg-brand-50 hover:bg-brand-100 text-brand-700 font-bold text-xs rounded-xl border border-brand-200 flex items-center gap-1 transition-colors"
          >
            Explore All PGs <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredPGs.slice(0, 6).map((pg) => (
            <PGCard
              key={pg.id}
              pg={pg}
              selectedCollegeId={selectedCollegeId}
              onViewDetails={onViewPGDetails}
              onToggleCompare={onToggleCompare}
              isCompared={comparedPGIds.includes(pg.id)}
            />
          ))}
        </div>
      </section>

      {/* How It Works Section */}
      <section className="bg-slate-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="px-3 py-1 rounded-full text-xs font-extrabold bg-brand-500/20 text-brand-300 border border-brand-500/30">
              Simple 4-Step Process
            </span>
            <h2 className="text-3xl font-extrabold tracking-tight">How StayNest Works</h2>
            <p className="text-slate-400 text-sm">
              Discovering suitable PG accommodation near your new college campus has never been easier
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            
            <div className="p-6 rounded-2xl bg-white/5 border border-white/10 space-y-3 relative">
              <div className="w-10 h-10 rounded-xl bg-brand-600 text-white font-extrabold text-base flex items-center justify-center">
                1
              </div>
              <h3 className="font-bold text-lg text-white">Select Your College</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Choose your educational institute (e.g. PCCOE, COEP, VIT, IIT Bombay) or search by city.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white/5 border border-white/10 space-y-3 relative">
              <div className="w-10 h-10 rounded-xl bg-brand-600 text-white font-extrabold text-base flex items-center justify-center">
                2
              </div>
              <h3 className="font-bold text-lg text-white">Filter & Customize</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Filter PGs by budget range, distance in km, gender (Boys/Girls/Unisex), and 15+ facilities.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white/5 border border-white/10 space-y-3 relative">
              <div className="w-10 h-10 rounded-xl bg-brand-600 text-white font-extrabold text-base flex items-center justify-center">
                3
              </div>
              <h3 className="font-bold text-lg text-white">Compare & Inspect</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Use our side-by-side comparison drawer and check photos, maps, and verified student reviews.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white/5 border border-white/10 space-y-3 relative">
              <div className="w-10 h-10 rounded-xl bg-brand-600 text-white font-extrabold text-base flex items-center justify-center">
                4
              </div>
              <h3 className="font-bold text-lg text-white">Contact Owner</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Call or email the PG owner directly with zero hidden brokerage fees or third-party commission.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* Platform Benefits Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-8">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-3xl font-extrabold text-slate-900">Why Choose StayNest?</h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-2">
            Designed specifically to benefit students, parents, and PG property owners
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* For Students */}
          <div className="p-6 bg-white rounded-3xl border border-slate-200 shadow-sm space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-brand-100 text-brand-700 flex items-center justify-center font-bold">
              <Users className="w-6 h-6" />
            </div>
            <h3 className="font-extrabold text-xl text-slate-900">For Students</h3>
            <ul className="space-y-2 text-xs text-slate-600">
              <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" /> Exact distance metrics from college gates</li>
              <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" /> Authentic student reviews & star ratings</li>
              <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" /> Direct contact with verified owners</li>
            </ul>
          </div>

          {/* For Parents */}
          <div className="p-6 bg-white rounded-3xl border border-slate-200 shadow-sm space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="font-extrabold text-xl text-slate-900">For Parents</h3>
            <ul className="space-y-2 text-xs text-slate-600">
              <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" /> Admin-moderated safety verification</li>
              <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" /> Transparent pricing & deposit details</li>
              <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" /> Biometric security & CCTV badges</li>
            </ul>
          </div>

          {/* For PG Owners */}
          <div className="p-6 bg-white rounded-3xl border border-slate-200 shadow-sm space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center font-bold">
              <Building2 className="w-6 h-6" />
            </div>
            <h3 className="font-extrabold text-xl text-slate-900">For PG Owners</h3>
            <ul className="space-y-2 text-xs text-slate-600">
              <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" /> High visibility among incoming students</li>
              <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" /> Multi-college distance mapping</li>
              <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" /> Simple "Add Your PG" submission portal</li>
            </ul>
          </div>

        </div>
      </section>

      {/* CTA Box */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <div className="bg-gradient-to-r from-brand-700 via-brand-600 to-slate-900 rounded-3xl p-8 sm:p-12 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl">
          <div className="space-y-2 text-center md:text-left">
            <h3 className="text-2xl sm:text-3xl font-extrabold">Are You a PG Property Owner?</h3>
            <p className="text-sm text-brand-100 max-w-xl">
              Register your PG on StayNest today to get verified and reach thousands of college students seeking accommodation near campus.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <button
              onClick={onOpenAddPG}
              className="px-6 py-3 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold text-sm rounded-xl transition-all shadow-lg active:scale-95"
            >
              + List Your PG Property
            </button>
            <button
              onClick={onOpenDoc}
              className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white font-bold text-sm rounded-xl transition-all border border-white/20"
            >
              Project Documentation
            </button>
          </div>
        </div>
      </section>

    </div>
  );
};
