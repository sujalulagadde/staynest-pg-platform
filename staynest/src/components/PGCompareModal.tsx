import React from 'react';
import { PG } from '../types';
import { X, Check, Minus, Sparkles, Phone, ShieldCheck } from 'lucide-react';

interface PGCompareModalProps {
  comparedPGs: PG[];
  onClose: () => void;
  onRemove: (pgId: string) => void;
  selectedCollegeId?: string;
  onViewDetails: (pg: PG) => void;
}

const COMMON_FACILITIES = [
  'Wi-Fi', 'Hot water', '24-hour water', 'Washing machine', 
  'CCTV', 'Security', 'Study table', 'Electricity backup', 
  'Attached bathroom', 'Mess/Food'
];

export const PGCompareModal: React.FC<PGCompareModalProps> = ({
  comparedPGs,
  onClose,
  onRemove,
  selectedCollegeId,
  onViewDetails
}) => {
  if (comparedPGs.length === 0) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-5xl w-full max-h-[90vh] overflow-hidden flex flex-col shadow-2xl border border-slate-200">
        
        {/* Header */}
        <div className="p-4 sm:p-6 bg-slate-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-amber-400" />
            <h2 className="text-xl font-bold">Side-by-Side PG Comparison ({comparedPGs.length}/3)</h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Scrollable Matrix Body */}
        <div className="p-4 sm:p-6 overflow-x-auto overflow-y-auto flex-1">
          <table className="w-full border-collapse text-left text-sm">
            <thead>
              <tr className="border-b border-slate-200">
                <th className="p-3 w-48 font-bold text-slate-500 uppercase text-xs">Features</th>
                {comparedPGs.map((pg) => {
                  const dist = selectedCollegeId && selectedCollegeId !== 'all'
                    ? pg.nearbyColleges.find(c => c.collegeId === selectedCollegeId)
                    : pg.nearbyColleges[0];

                  return (
                    <th key={pg.id} className="p-3 min-w-[220px] align-top relative">
                      <button
                        onClick={() => onRemove(pg.id)}
                        className="absolute top-2 right-2 text-slate-400 hover:text-rose-600 p-1"
                        title="Remove from compare"
                      >
                        <X className="w-4 h-4" />
                      </button>

                      <img
                        src={pg.photos[0]}
                        alt={pg.name}
                        className="w-full h-32 object-cover rounded-xl mb-2"
                      />
                      <h4 className="font-extrabold text-slate-900 text-base">{pg.name}</h4>
                      <p className="text-xs text-slate-500 mb-2">{pg.area}, {pg.city}</p>
                      
                      {dist && (
                        <span className="inline-block px-2 py-0.5 rounded text-[11px] font-bold bg-amber-100 text-amber-800 mb-2">
                          📍 {dist.distanceKm} km from {dist.collegeName}
                        </span>
                      )}

                      <button
                        onClick={() => onViewDetails(pg)}
                        className="w-full py-1.5 bg-brand-600 hover:bg-brand-700 text-white font-bold text-xs rounded-lg transition-colors"
                      >
                        View Details
                      </button>
                    </th>
                  );
                })}
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100">
              {/* Monthly Rent */}
              <tr>
                <td className="p-3 font-bold text-slate-700">Monthly Rent</td>
                {comparedPGs.map((pg) => (
                  <td key={pg.id} className="p-3 font-extrabold text-slate-900 text-base">
                    ₹{pg.rentPerMonth.toLocaleString('en-IN')} / mo
                  </td>
                ))}
              </tr>

              {/* Security Deposit */}
              <tr>
                <td className="p-3 font-bold text-slate-700">Security Deposit</td>
                {comparedPGs.map((pg) => (
                  <td key={pg.id} className="p-3 font-semibold text-slate-800">
                    ₹{pg.securityDeposit.toLocaleString('en-IN')}
                  </td>
                ))}
              </tr>

              {/* Gender */}
              <tr>
                <td className="p-3 font-bold text-slate-700">Gender Type</td>
                {comparedPGs.map((pg) => (
                  <td key={pg.id} className="p-3 font-bold capitalize text-slate-800">
                    {pg.genderType} PG
                  </td>
                ))}
              </tr>

              {/* Beds Available */}
              <tr>
                <td className="p-3 font-bold text-slate-700">Available Beds</td>
                {comparedPGs.map((pg) => (
                  <td key={pg.id} className="p-3 font-extrabold text-emerald-600">
                    {pg.availableBeds} / {pg.totalBeds} Beds
                  </td>
                ))}
              </tr>

              {/* Sharing Options */}
              <tr>
                <td className="p-3 font-bold text-slate-700">Sharing Options</td>
                {comparedPGs.map((pg) => (
                  <td key={pg.id} className="p-3 capitalize font-medium text-slate-800">
                    {pg.sharingTypes.join(', ')}
                  </td>
                ))}
              </tr>

              {/* Verified Status */}
              <tr>
                <td className="p-3 font-bold text-slate-700">Verification Status</td>
                {comparedPGs.map((pg) => (
                  <td key={pg.id} className="p-3">
                    {pg.verifiedStatus === 'verified' ? (
                      <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">
                        <ShieldCheck className="w-3.5 h-3.5" /> Verified PG
                      </span>
                    ) : (
                      <span className="text-xs text-slate-500 capitalize">{pg.verifiedStatus}</span>
                    )}
                  </td>
                ))}
              </tr>

              {/* Rating */}
              <tr>
                <td className="p-3 font-bold text-slate-700">Rating & Reviews</td>
                {comparedPGs.map((pg) => (
                  <td key={pg.id} className="p-3 font-bold text-amber-800">
                    ⭐ {pg.rating} ({pg.totalReviews} reviews)
                  </td>
                ))}
              </tr>

              {/* Facilities Checklist Matrix */}
              {COMMON_FACILITIES.map((facility) => (
                <tr key={facility}>
                  <td className="p-3 font-medium text-slate-600 text-xs">{facility}</td>
                  {comparedPGs.map((pg) => {
                    const hasFac = pg.facilities.includes(facility);
                    return (
                      <td key={pg.id} className="p-3">
                        {hasFac ? (
                          <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-emerald-100 text-emerald-700">
                            <Check className="w-4 h-4" />
                          </span>
                        ) : (
                          <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-slate-100 text-slate-400">
                            <Minus className="w-3.5 h-3.5" />
                          </span>
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))}

              {/* Owner Contact */}
              <tr>
                <td className="p-3 font-bold text-slate-700">Owner Contact</td>
                {comparedPGs.map((pg) => (
                  <td key={pg.id} className="p-3">
                    <span className="font-semibold text-slate-800 block">{pg.ownerName}</span>
                    <a
                      href={`tel:${pg.ownerPhone}`}
                      className="text-xs font-bold text-brand-600 hover:underline flex items-center gap-1 mt-0.5"
                    >
                      <Phone className="w-3 h-3" /> {pg.ownerPhone}
                    </a>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>

        {/* Footer Close */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2.5 bg-slate-900 text-white font-bold text-sm rounded-xl hover:bg-slate-800"
          >
            Close Comparison
          </button>
        </div>

      </div>
    </div>
  );
};
