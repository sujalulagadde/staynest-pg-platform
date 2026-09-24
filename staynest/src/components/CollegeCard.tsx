import React from 'react';
import { College } from '../types';
import { MapPin, Building2, ChevronRight } from 'lucide-react';

interface CollegeCardProps {
  college: College;
  onSelect: (id: string) => void;
  isSelected?: boolean;
}

export const CollegeCard: React.FC<CollegeCardProps> = ({ college, onSelect, isSelected }) => {
  return (
    <div
      onClick={() => onSelect(college.id)}
      className={`group relative rounded-2xl overflow-hidden bg-white border transition-all duration-300 cursor-pointer shadow-sm hover:shadow-xl ${
        isSelected
          ? 'ring-2 ring-brand-500 border-brand-500 bg-brand-50/20'
          : 'border-slate-200 hover:border-brand-300'
      }`}
    >
      {/* Photo Header */}
      <div className="relative h-36 w-full overflow-hidden bg-slate-100">
        <img
          src={college.image}
          alt={college.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/20 to-transparent" />
        
        {/* City Badge */}
        <div className="absolute top-3 left-3 px-2.5 py-1 rounded-md text-xs font-semibold bg-slate-900/80 text-white backdrop-blur-md flex items-center gap-1">
          <MapPin className="w-3 h-3 text-brand-400" />
          {college.city}
        </div>

        {/* Code Badge */}
        <div className="absolute bottom-3 left-3 text-white">
          <span className="text-xl font-extrabold tracking-tight">{college.code}</span>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="font-bold text-slate-900 text-sm line-clamp-1 group-hover:text-brand-600 transition-colors">
          {college.name}
        </h3>
        
        <p className="text-xs text-slate-500 mt-1 flex items-center gap-1">
          <Building2 className="w-3.5 h-3.5 text-slate-400" />
          {college.area}, {college.state}
        </p>

        <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
          <span className="text-xs font-semibold text-brand-700 bg-brand-50 px-2.5 py-1 rounded-md">
            {college.totalPGs || 0}+ PGs Nearby
          </span>

          <span className="text-xs font-bold text-slate-600 group-hover:text-brand-600 flex items-center gap-0.5">
            Explore PGs <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </span>
        </div>
      </div>
    </div>
  );
};
