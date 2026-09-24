import React from 'react';
import { Home, ShieldCheck, Heart, FileText } from 'lucide-react';
import { College } from '../types';

interface FooterProps {
  colleges: College[];
  onSelectCollege: (id: string) => void;
  onOpenDoc: () => void;
  onOpenAddPG: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  colleges,
  onSelectCollege,
  onOpenDoc,
  onOpenAddPG
}) => {
  return (
    <footer className="bg-slate-900 text-slate-300 border-t border-slate-800 pt-12 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          
          {/* Brand Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-brand-500 flex items-center justify-center text-white">
                <Home className="w-5 h-5" />
              </div>
              <span className="text-xl font-extrabold text-white tracking-tight">
                StayNest
              </span>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed">
              A general-purpose student PG accommodation finder supporting ANY college, university, or institute across India. Discover verified PGs, compare rent, facilities, and distance from campus.
            </p>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-800 border border-slate-700 text-xs text-amber-400">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              Admin Moderated & Verified Listings
            </div>
          </div>

          {/* Quick Colleges */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4">
              Supported Colleges
            </h4>
            <ul className="space-y-2 text-sm">
              {colleges.slice(0, 6).map((col) => (
                <li key={col.id}>
                  <button
                    onClick={() => onSelectCollege(col.id)}
                    className="hover:text-brand-400 transition-colors text-slate-400 flex items-center gap-1.5"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-500"></span>
                    PGs near {col.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Platform Features */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4">
              Platform Features
            </h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li>• College-Based Location Search</li>
              <li>• Multi-Facility Filter Engine</li>
              <li>• PG Side-by-Side Comparison Matrix</li>
              <li>• Verified Student Reviews System</li>
              <li>
                <button 
                  onClick={onOpenAddPG} 
                  className="text-emerald-400 hover:underline font-medium"
                >
                  • Add Your PG (Owner Registration)
                </button>
              </li>
              <li>
                <button 
                  onClick={onOpenDoc} 
                  className="text-brand-400 hover:underline font-medium flex items-center gap-1 mt-1"
                >
                  <FileText className="w-3.5 h-3.5" /> Project Documentation (20 Sections)
                </button>
              </li>
            </ul>
          </div>

          {/* Academic Notice & Disclaimer */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-2">
              Academic Project Note
            </h4>
            <div className="p-3 rounded-lg bg-slate-800/80 border border-slate-700 text-xs text-slate-300 leading-relaxed">
              <p className="font-semibold text-amber-300 mb-1">Community Impact Project</p>
              Designed to solve accommodation challenges for outstation college students entering new cities across India.
            </div>
            <p className="text-[11px] text-slate-500">
              Disclaimer: Students are advised to verify PG property in person before paying deposits.
            </p>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© 2026 StayNest Student PG Finder. Created for College Community Project.</p>
          <div className="flex items-center gap-1">
            <span>Built with</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
            <span>for College Students across India</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
