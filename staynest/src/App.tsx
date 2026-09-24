import React, { useState, useEffect } from 'react';
import { College, PG, FilterState } from './types';
import { storageService } from './services/storageService';

import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { PGDetailsModal } from './components/PGDetailsModal';
import { PGCompareModal } from './components/PGCompareModal';
import { AddPGModal } from './components/AddPGModal';
import { AdminDashboard } from './components/AdminDashboard';
import { ProjectDocModal } from './components/ProjectDocModal';

import { HomePage } from './pages/HomePage';
import { CollegesPage } from './pages/CollegesPage';
import { PGsPage } from './pages/PGsPage';

export const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('home');
  const [colleges, setColleges] = useState<College[]>(() => storageService.getColleges());
  const [pgs, setPgs] = useState<PG[]>(() => storageService.getPGs(false));

  const [filters, setFilters] = useState<FilterState>({
    searchQuery: '',
    selectedCollegeId: 'all',
    city: 'all',
    area: 'all',
    maxDistanceKm: 20,
    minRent: 0,
    maxRent: 30000,
    genderType: 'all',
    sharingTypes: [],
    facilities: [],
    minRating: 0,
    availability: 'all',
    sortBy: 'rent_low'
  });

  // Modal states
  const [selectedPGDetails, setSelectedPGDetails] = useState<PG | null>(null);
  const [comparedPGs, setComparedPGs] = useState<PG[]>([]);
  const [showAddPGModal, setShowAddPGModal] = useState(false);
  const [showCompareModal, setShowCompareModal] = useState(false);
  const [showDocModal, setShowDocModal] = useState(false);

  // Refresh dataset from storage
  const refreshData = () => {
    const freshColleges = storageService.getColleges();
    const freshPGs = storageService.getPGs(false);
    setColleges(freshColleges);
    setPgs(freshPGs);
  };

  useEffect(() => {
    refreshData();
  }, []);

  // Filtered PGs calculation
  const filteredPGs = storageService.filterPGs(filters);

  // College selection handler
  const handleSelectCollege = (collegeId: string) => {
    setFilters(prev => ({
      ...prev,
      selectedCollegeId: collegeId
    }));
    setActiveTab('pgs');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleResetFilters = () => {
    setFilters({
      searchQuery: '',
      selectedCollegeId: 'all',
      city: 'all',
      area: 'all',
      maxDistanceKm: 20,
      minRent: 0,
      maxRent: 30000,
      genderType: 'all',
      sharingTypes: [],
      facilities: [],
      minRating: 0,
      availability: 'all',
      sortBy: 'rent_low'
    });
  };

  const handleToggleCompare = (pg: PG) => {
    setComparedPGs(prev => {
      const exists = prev.some(p => p.id === pg.id);
      if (exists) {
        return prev.filter(p => p.id !== pg.id);
      }
      if (prev.length >= 3) {
        alert('You can compare a maximum of 3 PGs at once.');
        return prev;
      }
      return [...prev, pg];
    });
  };

  const handleRemoveCompared = (pgId: string) => {
    setComparedPGs(prev => prev.filter(p => p.id !== pgId));
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 selection:bg-brand-500 selection:text-white">
      
      {/* Top Header Navbar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        colleges={colleges}
        selectedCollegeId={filters.selectedCollegeId}
        onSelectCollege={handleSelectCollege}
        onOpenAddPG={() => setShowAddPGModal(true)}
        onOpenDoc={() => setShowDocModal(true)}
      />

      {/* Main Page View Routing */}
      <main className="flex-1">
        {activeTab === 'home' && (
          <HomePage
            colleges={colleges}
            featuredPGs={pgs}
            searchQuery={filters.searchQuery}
            setSearchQuery={(q) => setFilters(prev => ({ ...prev, searchQuery: q }))}
            selectedCollegeId={filters.selectedCollegeId}
            setSelectedCollegeId={(id) => setFilters(prev => ({ ...prev, selectedCollegeId: id }))}
            onSearch={() => setActiveTab('pgs')}
            onSelectCollege={handleSelectCollege}
            onViewPGDetails={(pg) => setSelectedPGDetails(pg)}
            onToggleCompare={handleToggleCompare}
            comparedPGIds={comparedPGs.map(p => p.id)}
            onOpenAddPG={() => setShowAddPGModal(true)}
            onOpenDoc={() => setShowDocModal(true)}
          />
        )}

        {activeTab === 'pgs' && (
          <PGsPage
            pgs={filteredPGs}
            colleges={colleges}
            filters={filters}
            setFilters={setFilters}
            onResetFilters={handleResetFilters}
            onViewDetails={(pg) => setSelectedPGDetails(pg)}
            onToggleCompare={handleToggleCompare}
            comparedPGs={comparedPGs}
            onOpenCompareModal={() => setShowCompareModal(true)}
            onRemoveCompared={handleRemoveCompared}
          />
        )}

        {activeTab === 'colleges' && (
          <CollegesPage
            colleges={colleges}
            onSelectCollege={handleSelectCollege}
            selectedCollegeId={filters.selectedCollegeId}
          />
        )}

        {activeTab === 'admin' && (
          <AdminDashboard
            colleges={colleges}
            onRefreshData={refreshData}
            onViewPGDetails={(pg) => setSelectedPGDetails(pg)}
          />
        )}
      </main>

      {/* Footer */}
      <Footer
        colleges={colleges}
        onSelectCollege={handleSelectCollege}
        onOpenDoc={() => setShowDocModal(true)}
        onOpenAddPG={() => setShowAddPGModal(true)}
      />

      {/* PG Details Modal */}
      {selectedPGDetails && (
        <PGDetailsModal
          pg={selectedPGDetails}
          onClose={() => setSelectedPGDetails(null)}
          selectedCollegeId={filters.selectedCollegeId}
        />
      )}

      {/* Side-by-side Compare Modal */}
      {showCompareModal && (
        <PGCompareModal
          comparedPGs={comparedPGs}
          onClose={() => setShowCompareModal(false)}
          onRemove={handleRemoveCompared}
          selectedCollegeId={filters.selectedCollegeId}
          onViewDetails={(pg) => {
            setShowCompareModal(false);
            setSelectedPGDetails(pg);
          }}
        />
      )}

      {/* Add PG Owner Submission Modal */}
      {showAddPGModal && (
        <AddPGModal
          colleges={colleges}
          onClose={() => setShowAddPGModal(false)}
          onSuccess={refreshData}
        />
      )}

      {/* Project Documentation Modal */}
      {showDocModal && (
        <ProjectDocModal
          onClose={() => setShowDocModal(false)}
        />
      )}

    </div>
  );
};
export default App;
