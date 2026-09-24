import React, { useState } from 'react';
import { College, PG, PGReport, VerificationStatus } from '../types';
import { storageService } from '../services/storageService';
import { 
  Shield, CheckCircle2, Clock, AlertTriangle, Building2, 
  Trash2, Plus, Lock, Key, RefreshCw, Layers
} from 'lucide-react';

interface AdminDashboardProps {
  colleges: College[];
  onRefreshData: () => void;
  onViewPGDetails: (pg: PG) => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  colleges,
  onRefreshData,
  onViewPGDetails
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [authError, setAuthError] = useState('');

  const [activeTab, setActiveTab] = useState<'pending' | 'colleges' | 'pgs' | 'reports'>('pending');

  // Colleges Form state
  const [showAddCollegeModal, setShowAddCollegeModal] = useState(false);
  const [newColName, setNewColName] = useState('');
  const [newColCode, setNewColCode] = useState('');
  const [newColCity, setNewColCity] = useState('Pune');
  const [newColState, setNewColState] = useState('Maharashtra');
  const [newColArea, setNewColArea] = useState('');
  const [newColImg, setNewColImg] = useState('https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=800&q=80');

  const stats = storageService.getAdminStats();
  const allPGs = storageService.getPGs(true);
  const pendingPGs = allPGs.filter(p => p.verifiedStatus === 'pending');
  const reports = storageService.getReports();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'admin123' || password === 'admin' || password === '') {
      setIsAuthenticated(true);
      setAuthError('');
    } else {
      setAuthError('Invalid passcode. Use "admin123".');
    }
  };

  const handleUpdateStatus = (pgId: string, status: VerificationStatus) => {
    storageService.updatePGStatus(pgId, status);
    onRefreshData();
  };

  const handleDeletePG = (pgId: string) => {
    if (window.confirm('Are you sure you want to delete this PG?')) {
      storageService.deletePG(pgId);
      onRefreshData();
    }
  };

  const handleAddCollege = (e: React.FormEvent) => {
    e.preventDefault();
    storageService.saveCollege({
      name: newColName,
      code: newColCode,
      city: newColCity,
      state: newColState,
      area: newColArea,
      image: newColImg,
      lat: 18.5204,
      lng: 73.8567
    });
    setShowAddCollegeModal(false);
    setNewColName('');
    setNewColCode('');
    onRefreshData();
  };

  const handleDeleteCollege = (colId: string) => {
    if (window.confirm('Delete this college?')) {
      storageService.deleteCollege(colId);
      onRefreshData();
    }
  };

  const handleResolveReport = (reportId: string) => {
    storageService.resolveReport(reportId);
    onRefreshData();
  };

  if (!isAuthenticated) {
    return (
      <div className="max-w-md mx-auto my-16 p-8 bg-white rounded-3xl border border-slate-200 shadow-xl text-center space-y-6">
        <div className="w-16 h-16 rounded-2xl bg-slate-900 text-amber-400 flex items-center justify-center mx-auto shadow-md">
          <Shield className="w-8 h-8" />
        </div>
        <div>
          <h2 className="text-2xl font-extrabold text-slate-900">Admin Portal Login</h2>
          <p className="text-xs text-slate-500 mt-1">Review owner submissions, approve PG verification, and manage colleges</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4 text-left">
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              Admin Passcode
            </label>
            <div className="relative">
              <input
                type="password"
                placeholder="Enter admin passcode (Default: admin123)"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm font-medium focus:ring-2 focus:ring-slate-900"
              />
              <Key className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
            </div>
            {authError && <p className="text-xs text-rose-600 font-bold mt-1">{authError}</p>}
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl text-sm transition-colors shadow-md flex items-center justify-center gap-2"
          >
            <Lock className="w-4 h-4 text-amber-400" />
            Login to Admin Dashboard
          </button>
        </form>

        <button
          onClick={() => setIsAuthenticated(true)}
          className="text-xs font-semibold text-brand-600 hover:underline"
        >
          ⚡ Quick Demo Access (Bypass Passcode)
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-slate-900 text-white p-6 rounded-3xl shadow-xl">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-amber-400 text-slate-950 flex items-center justify-center font-bold">
            <Shield className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl font-extrabold tracking-tight">StayNest Administrator Control Center</h1>
            <p className="text-xs text-slate-400">Moderation & Verification Management Console</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={onRefreshData}
            className="px-3.5 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold rounded-xl flex items-center gap-1.5 border border-slate-700"
          >
            <RefreshCw className="w-3.5 h-3.5" /> Refresh Stats
          </button>
          <button
            onClick={() => setIsAuthenticated(false)}
            className="px-4 py-2 bg-rose-600/80 hover:bg-rose-600 text-white text-xs font-bold rounded-xl"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Analytics Statistics Row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-4">
        <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-sm">
          <span className="text-[10px] font-bold text-slate-400 uppercase block">Total Colleges</span>
          <span className="text-2xl font-extrabold text-slate-900">{stats.totalColleges}</span>
        </div>

        <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-sm">
          <span className="text-[10px] font-bold text-slate-400 uppercase block">Total PGs</span>
          <span className="text-2xl font-extrabold text-slate-900">{stats.totalPGs}</span>
        </div>

        <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-200 shadow-sm">
          <span className="text-[10px] font-bold text-emerald-700 uppercase block">🟢 Verified PGs</span>
          <span className="text-2xl font-extrabold text-emerald-800">{stats.verifiedPGs}</span>
        </div>

        <div className="p-4 bg-amber-50 rounded-2xl border border-amber-200 shadow-sm">
          <span className="text-[10px] font-bold text-amber-800 uppercase block">🟡 Pending Review</span>
          <span className="text-2xl font-extrabold text-amber-900">{stats.pendingPGs}</span>
        </div>

        <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-sm">
          <span className="text-[10px] font-bold text-slate-400 uppercase block">Student Reviews</span>
          <span className="text-2xl font-extrabold text-slate-900">{stats.totalReviews}</span>
        </div>

        <div className="p-4 bg-rose-50 rounded-2xl border border-rose-200 shadow-sm">
          <span className="text-[10px] font-bold text-rose-800 uppercase block">Active Reports</span>
          <span className="text-2xl font-extrabold text-rose-900">{stats.activeReports}</span>
        </div>
      </div>

      {/* Tabs Row */}
      <div className="flex gap-2 border-b border-slate-200 pb-2">
        <button
          onClick={() => setActiveTab('pending')}
          className={`px-4 py-2.5 rounded-xl text-xs font-extrabold transition-all flex items-center gap-2 ${
            activeTab === 'pending'
              ? 'bg-amber-400 text-slate-950 shadow-sm'
              : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
          }`}
        >
          <Clock className="w-4 h-4" />
          Pending Approvals ({pendingPGs.length})
        </button>

        <button
          onClick={() => setActiveTab('pgs')}
          className={`px-4 py-2.5 rounded-xl text-xs font-extrabold transition-all flex items-center gap-2 ${
            activeTab === 'pgs'
              ? 'bg-slate-900 text-white shadow-sm'
              : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
          }`}
        >
          <Layers className="w-4 h-4" />
          Manage All PGs ({allPGs.length})
        </button>

        <button
          onClick={() => setActiveTab('colleges')}
          className={`px-4 py-2.5 rounded-xl text-xs font-extrabold transition-all flex items-center gap-2 ${
            activeTab === 'colleges'
              ? 'bg-slate-900 text-white shadow-sm'
              : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
          }`}
        >
          <Building2 className="w-4 h-4" />
          Manage Colleges ({colleges.length})
        </button>

        <button
          onClick={() => setActiveTab('reports')}
          className={`px-4 py-2.5 rounded-xl text-xs font-extrabold transition-all flex items-center gap-2 ${
            activeTab === 'reports'
              ? 'bg-slate-900 text-white shadow-sm'
              : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
          }`}
        >
          <AlertTriangle className="w-4 h-4 text-rose-400" />
          Flagged Reports ({reports.filter(r => r.status === 'pending').length})
        </button>
      </div>

      {/* Tab Content 1: Pending Approvals */}
      {activeTab === 'pending' && (
        <div className="space-y-4">
          <div className="p-4 bg-amber-50 rounded-2xl border border-amber-200 text-xs text-amber-900 font-medium">
            <strong>Verification Queue:</strong> Review owner-submitted PGs below. Verify photos, address, rent, facilities, and owner contact before granting the 🟢 Verified PG badge.
          </div>

          {pendingPGs.length === 0 ? (
            <div className="p-12 text-center bg-white rounded-3xl border border-slate-200 text-slate-500 space-y-2">
              <CheckCircle2 className="w-10 h-10 text-emerald-500 mx-auto" />
              <p className="font-bold text-slate-800">No Pending Submissions!</p>
              <p className="text-xs">All submitted PGs have been reviewed and approved.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {pendingPGs.map(pg => (
                <div key={pg.id} className="p-5 bg-white rounded-2xl border border-slate-200 shadow-sm space-y-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <span className="px-2 py-0.5 rounded text-[10px] font-extrabold bg-amber-100 text-amber-800 uppercase">
                        Pending Owner Listing
                      </span>
                      <h3 className="font-extrabold text-slate-900 text-base mt-1">{pg.name}</h3>
                      <p className="text-xs text-slate-500">{pg.address}, {pg.area}, {pg.city}</p>
                    </div>
                    <span className="font-extrabold text-brand-700 text-base">₹{pg.rentPerMonth}/mo</span>
                  </div>

                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs space-y-1">
                    <p className="font-semibold text-slate-800">Owner: {pg.ownerName} ({pg.ownerPhone})</p>
                    <p className="text-slate-600">Beds: {pg.availableBeds} available / {pg.totalBeds} total</p>
                    <p className="text-slate-600">Colleges linked: {pg.nearbyColleges.map(c => `${c.collegeName} (${c.distanceKm} km)`).join(', ')}</p>
                  </div>

                  <div className="flex gap-2 pt-2">
                    <button
                      onClick={() => onViewPGDetails(pg)}
                      className="flex-1 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs rounded-xl"
                    >
                      Inspect PG
                    </button>
                    <button
                      onClick={() => handleUpdateStatus(pg.id, 'verified')}
                      className="flex-1 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-1"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" /> Approve & Verify
                    </button>
                    <button
                      onClick={() => handleUpdateStatus(pg.id, 'rejected')}
                      className="py-2 px-3 bg-rose-100 hover:bg-rose-200 text-rose-800 font-bold text-xs rounded-xl"
                    >
                      Reject
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Tab Content 2: Manage All PGs */}
      {activeTab === 'pgs' && (
        <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm">
          <div className="p-4 border-b border-slate-200 bg-slate-50 flex justify-between items-center">
            <h3 className="font-bold text-slate-900 text-sm">All Registered PGs ({allPGs.length})</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-100 text-slate-500 font-bold uppercase border-b border-slate-200">
                <tr>
                  <th className="p-3">PG Name</th>
                  <th className="p-3">City / Area</th>
                  <th className="p-3">Rent</th>
                  <th className="p-3">Status</th>
                  <th className="p-3">Beds</th>
                  <th className="p-3">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {allPGs.map(pg => (
                  <tr key={pg.id} className="hover:bg-slate-50">
                    <td className="p-3 font-bold text-slate-900">{pg.name}</td>
                    <td className="p-3 text-slate-600">{pg.area}, {pg.city}</td>
                    <td className="p-3 font-extrabold text-slate-900">₹{pg.rentPerMonth}</td>
                    <td className="p-3">
                      <select
                        value={pg.verifiedStatus}
                        onChange={(e) => handleUpdateStatus(pg.id, e.target.value as VerificationStatus)}
                        className="p-1 rounded font-bold text-xs bg-slate-100 border border-slate-300"
                      >
                        <option value="verified">🟢 Verified</option>
                        <option value="pending">🟡 Pending</option>
                        <option value="rejected">🔴 Rejected</option>
                      </select>
                    </td>
                    <td className="p-3 font-semibold">{pg.availableBeds} / {pg.totalBeds}</td>
                    <td className="p-3 flex items-center gap-2">
                      <button
                        onClick={() => onViewPGDetails(pg)}
                        className="text-brand-600 font-bold hover:underline"
                      >
                        View
                      </button>
                      <button
                        onClick={() => handleDeletePG(pg.id)}
                        className="text-rose-600 hover:text-rose-800"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab Content 3: Manage Colleges */}
      {activeTab === 'colleges' && (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="font-bold text-slate-900 text-sm">Supported Educational Institutes ({colleges.length})</h3>
            <button
              onClick={() => setShowAddCollegeModal(true)}
              className="px-4 py-2 bg-brand-600 hover:bg-brand-700 text-white font-bold text-xs rounded-xl flex items-center gap-1.5"
            >
              <Plus className="w-4 h-4" /> Add New College
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {colleges.map(col => (
              <div key={col.id} className="p-4 bg-white rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img src={col.image} alt={col.name} className="w-12 h-12 rounded-xl object-cover" />
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm">{col.code}</h4>
                    <p className="text-xs text-slate-500">{col.city}, {col.state}</p>
                    <span className="text-[10px] font-semibold text-brand-700 bg-brand-50 px-2 py-0.5 rounded">
                      {col.totalPGs || 0} PGs
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => handleDeleteCollege(col.id)}
                  className="p-2 text-rose-500 hover:text-rose-700 hover:bg-rose-50 rounded-lg"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab Content 4: Reports */}
      {activeTab === 'reports' && (
        <div className="space-y-3">
          {reports.length === 0 ? (
            <div className="p-8 text-center bg-white rounded-3xl border border-slate-200 text-slate-500">
              No reported listings.
            </div>
          ) : (
            reports.map(rep => (
              <div key={rep.id} className="p-4 bg-white rounded-2xl border border-slate-200 flex justify-between items-center text-xs">
                <div>
                  <span className="font-bold text-rose-600">{rep.reason}</span>
                  <h4 className="font-bold text-slate-900 text-sm">{rep.pgName}</h4>
                  <p className="text-slate-600">{rep.details}</p>
                  <span className="text-[10px] text-slate-400">{rep.date}</span>
                </div>
                {rep.status === 'pending' ? (
                  <button
                    onClick={() => handleResolveReport(rep.id)}
                    className="px-3 py-1.5 bg-emerald-600 text-white font-bold rounded-lg"
                  >
                    Mark Resolved
                  </button>
                ) : (
                  <span className="font-bold text-slate-400">Resolved</span>
                )}
              </div>
            ))
          )}
        </div>
      )}

      {/* Add College Modal */}
      {showAddCollegeModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 space-y-4 border border-slate-200">
            <h3 className="font-bold text-slate-900 text-base">Add New College / Educational Institute</h3>
            <form onSubmit={handleAddCollege} className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Full College Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Pune Institute of Computer Technology"
                  value={newColName}
                  onChange={(e) => setNewColName(e.target.value)}
                  className="w-full p-2 bg-slate-50 border border-slate-300 rounded-lg text-xs"
                />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Short Code *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. PICT"
                    value={newColCode}
                    onChange={(e) => setNewColCode(e.target.value)}
                    className="w-full p-2 bg-slate-50 border border-slate-300 rounded-lg text-xs"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">City *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Pune"
                    value={newColCity}
                    onChange={(e) => setNewColCity(e.target.value)}
                    className="w-full p-2 bg-slate-50 border border-slate-300 rounded-lg text-xs"
                  />
                </div>
              </div>
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Area / Suburb</label>
                <input
                  type="text"
                  placeholder="e.g. Dhankawadi"
                  value={newColArea}
                  onChange={(e) => setNewColArea(e.target.value)}
                  className="w-full p-2 bg-slate-50 border border-slate-300 rounded-lg text-xs"
                />
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddCollegeModal(false)}
                  className="px-4 py-2 text-slate-600 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-slate-900 text-white font-bold rounded-xl"
                >
                  Save College
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
