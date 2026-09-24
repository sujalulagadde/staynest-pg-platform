import React, { useState } from 'react';
import { College } from '../types';
import { Building2, PlusCircle, Shield, FileText, Search, Menu, X, Home, Compass } from 'lucide-react';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  colleges: College[];
  selectedCollegeId: string;
  onSelectCollege: (id: string) => void;
  onOpenAddPG: () => void;
  onOpenDoc: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  colleges,
  selectedCollegeId,
  onSelectCollege,
  onOpenAddPG,
  onOpenDoc
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const selectedCollege = colleges.find(c => c.id === selectedCollegeId);

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo & Brand */}
          <div className="flex items-center gap-6">
            <button 
              onClick={() => setActiveTab('home')}
              className="flex items-center gap-2.5 group text-left focus:outline-none"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-700 via-brand-600 to-brand-500 flex items-center justify-center text-white shadow-md shadow-brand-500/20 group-hover:scale-105 transition-transform">
                <Home className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xl font-extrabold tracking-tight bg-gradient-to-r from-slate-900 via-brand-900 to-brand-700 bg-clip-text text-transparent">
                  StayNest
                </span>
                <span className="block text-[10px] font-bold text-brand-600 tracking-wider uppercase -mt-1">
                  Student PG Finder
                </span>
              </div>
            </button>

            {/* Quick College Switcher (Desktop) */}
            <div className="hidden lg:flex items-center bg-slate-100/80 border border-slate-200 rounded-lg px-2.5 py-1 text-xs">
              <Building2 className="w-3.5 h-3.5 text-brand-600 mr-1.5 shrink-0" />
              <span className="text-slate-500 font-medium mr-1.5">College:</span>
              <select
                value={selectedCollegeId}
                onChange={(e) => {
                  onSelectCollege(e.target.value);
                  if (activeTab !== 'pgs') setActiveTab('pgs');
                }}
                className="bg-transparent font-semibold text-slate-800 focus:outline-none cursor-pointer max-w-[200px] truncate"
              >
                <option value="all">All Colleges / Cities</option>
                {colleges.map((col) => (
                  <option key={col.id} value={col.id}>
                    {col.code} ({col.city})
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-1.5">
            <button
              onClick={() => setActiveTab('home')}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-1.5 ${
                activeTab === 'home'
                  ? 'bg-brand-50 text-brand-700 font-semibold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              <Home className="w-4 h-4" />
              Home
            </button>

            <button
              onClick={() => setActiveTab('pgs')}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-1.5 ${
                activeTab === 'pgs'
                  ? 'bg-brand-50 text-brand-700 font-semibold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              <Search className="w-4 h-4" />
              Find PGs
              {selectedCollege && (
                <span className="ml-1 px-1.5 py-0.5 rounded-full text-[10px] bg-brand-100 text-brand-800 font-bold">
                  {selectedCollege.code}
                </span>
              )}
            </button>

            <button
              onClick={() => setActiveTab('colleges')}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-1.5 ${
                activeTab === 'colleges'
                  ? 'bg-brand-50 text-brand-700 font-semibold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              <Compass className="w-4 h-4" />
              Colleges
            </button>

            <button
              onClick={onOpenAddPG}
              className="px-3 py-2 rounded-lg text-sm font-medium text-slate-700 hover:text-slate-900 hover:bg-slate-100 transition-colors flex items-center gap-1.5"
            >
              <PlusCircle className="w-4 h-4 text-emerald-600" />
              Add Your PG
            </button>

            <button
              onClick={onOpenDoc}
              className="px-3 py-2 rounded-lg text-sm font-medium text-slate-700 hover:text-slate-900 hover:bg-slate-100 transition-colors flex items-center gap-1.5"
              title="View Academic Project Documentation"
            >
              <FileText className="w-4 h-4 text-brand-600" />
              Project Docs
            </button>

            <button
              onClick={() => setActiveTab('admin')}
              className={`ml-2 px-3.5 py-2 rounded-lg text-sm font-semibold transition-all flex items-center gap-1.5 shadow-sm ${
                activeTab === 'admin'
                  ? 'bg-slate-900 text-white'
                  : 'bg-slate-900 text-slate-100 hover:bg-slate-800'
              }`}
            >
              <Shield className="w-4 h-4 text-amber-400" />
              Admin Portal
            </button>
          </nav>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-2 md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 focus:outline-none"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 space-y-3 shadow-xl">
          <div className="p-3 bg-slate-50 rounded-lg">
            <label className="block text-xs font-semibold text-slate-500 mb-1">
              Select Your College:
            </label>
            <select
              value={selectedCollegeId}
              onChange={(e) => {
                onSelectCollege(e.target.value);
                setActiveTab('pgs');
                setMobileMenuOpen(false);
              }}
              className="w-full bg-white border border-slate-300 rounded-md p-2 text-sm font-medium text-slate-800"
            >
              <option value="all">All Colleges / Cities</option>
              {colleges.map((col) => (
                <option key={col.id} value={col.id}>
                  {col.name} ({col.city})
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-1 gap-1">
            <button
              onClick={() => { setActiveTab('home'); setMobileMenuOpen(false); }}
              className="w-full text-left px-3 py-2.5 rounded-md text-sm font-medium text-slate-700 hover:bg-slate-100 flex items-center gap-2"
            >
              <Home className="w-4 h-4 text-brand-600" /> Home Page
            </button>
            <button
              onClick={() => { setActiveTab('pgs'); setMobileMenuOpen(false); }}
              className="w-full text-left px-3 py-2.5 rounded-md text-sm font-medium text-slate-700 hover:bg-slate-100 flex items-center gap-2"
            >
              <Search className="w-4 h-4 text-brand-600" /> Search PGs Near College
            </button>
            <button
              onClick={() => { setActiveTab('colleges'); setMobileMenuOpen(false); }}
              className="w-full text-left px-3 py-2.5 rounded-md text-sm font-medium text-slate-700 hover:bg-slate-100 flex items-center gap-2"
            >
              <Compass className="w-4 h-4 text-brand-600" /> View Colleges List
            </button>
            <button
              onClick={() => { onOpenAddPG(); setMobileMenuOpen(false); }}
              className="w-full text-left px-3 py-2.5 rounded-md text-sm font-medium text-slate-700 hover:bg-slate-100 flex items-center gap-2"
            >
              <PlusCircle className="w-4 h-4 text-emerald-600" /> Add Your PG (Owner Submission)
            </button>
            <button
              onClick={() => { onOpenDoc(); setMobileMenuOpen(false); }}
              className="w-full text-left px-3 py-2.5 rounded-md text-sm font-medium text-slate-700 hover:bg-slate-100 flex items-center gap-2"
            >
              <FileText className="w-4 h-4 text-brand-600" /> Academic Project Documentation
            </button>
            <button
              onClick={() => { setActiveTab('admin'); setMobileMenuOpen(false); }}
              className="w-full text-left px-3 py-2.5 rounded-md text-sm font-bold text-white bg-slate-900 flex items-center justify-between mt-2"
            >
              <span className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-amber-400" /> Admin Portal
              </span>
              <span className="text-xs font-normal text-slate-300">Login</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
