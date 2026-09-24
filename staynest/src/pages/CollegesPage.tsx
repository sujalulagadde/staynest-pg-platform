import React, { useState } from 'react';
import { College } from '../types';
import { CollegeCard } from '../components/CollegeCard';
import { Building2, Search, MapPin } from 'lucide-react';

interface CollegesPageProps {
  colleges: College[];
  onSelectCollege: (id: string) => void;
  selectedCollegeId: string;
}

export const CollegesPage: React.FC<CollegesPageProps> = ({
  colleges,
  onSelectCollege,
  selectedCollegeId
}) => {
  const [search, setSearch] = useState('');
  const [selectedCity, setSelectedCity] = useState('all');

  const cities = Array.from(new Set(colleges.map(c => c.city)));

  const filteredColleges = colleges.filter(col => {
    const matchQuery = col.name.toLowerCase().includes(search.toLowerCase()) ||
                       col.code.toLowerCase().includes(search.toLowerCase()) ||
                       col.area.toLowerCase().includes(search.toLowerCase());
    const matchCity = selectedCity === 'all' || col.city.toLowerCase() === selectedCity.toLowerCase();
    return matchQuery && matchCity;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Title Header */}
      <div className="bg-slate-900 text-white p-8 rounded-3xl space-y-3 shadow-xl relative overflow-hidden">
        <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-brand-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-500/20 text-brand-300 text-xs font-bold border border-brand-500/30">
          <Building2 className="w-4 h-4" /> Scalable Educational Campus Directory
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
          Supported Colleges & Universities
        </h1>
        <p className="text-slate-300 text-sm max-w-2xl">
          StayNest is designed for students from ANY institute across India. Select your campus to view nearby verified PG listings.
        </p>
      </div>

      {/* Filter Bar */}
      <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-sm grid grid-cols-1 sm:grid-cols-12 gap-3 items-center">
        <div className="sm:col-span-8 relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
          <input
            type="text"
            placeholder="Search by college name, code (e.g. PCCOE, COEP, IIT)..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs font-medium focus:ring-2 focus:ring-brand-500"
          />
        </div>

        <div className="sm:col-span-4 flex items-center gap-2">
          <MapPin className="w-4 h-4 text-brand-600 shrink-0" />
          <select
            value={selectedCity}
            onChange={(e) => setSelectedCity(e.target.value)}
            className="w-full p-2 bg-slate-50 border border-slate-300 rounded-xl text-xs font-medium text-slate-800"
          >
            <option value="all">All Cities</option>
            {cities.map(c => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>
      </div>

      {/* College Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredColleges.map((college) => (
          <CollegeCard
            key={college.id}
            college={college}
            onSelect={onSelectCollege}
            isSelected={selectedCollegeId === college.id}
          />
        ))}
      </div>

    </div>
  );
};
