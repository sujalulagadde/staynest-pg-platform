import React from 'react';
import { VerificationStatus } from '../types';
import { CheckCircle2, Clock, AlertTriangle, Info } from 'lucide-react';

interface PGBadgeProps {
  status: VerificationStatus;
  isDemo?: boolean;
}

export const PGBadge: React.FC<PGBadgeProps> = ({ status, isDemo }) => {
  return (
    <div className="flex flex-wrap items-center gap-1.5">
      {status === 'verified' && (
        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 border border-emerald-200 shadow-sm">
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
          Verified PG
        </span>
      )}

      {status === 'pending' && (
        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-100 text-amber-800 border border-amber-200">
          <Clock className="w-3.5 h-3.5 text-amber-600" />
          Pending Verification
        </span>
      )}

      {status === 'rejected' && (
        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-rose-100 text-rose-800 border border-rose-200">
          <AlertTriangle className="w-3.5 h-3.5 text-rose-600" />
          Rejected Listing
        </span>
      )}

      {isDemo && (
        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-medium bg-slate-100 text-slate-600 border border-slate-200" title="This is a realistic sample listing for project demonstration">
          <Info className="w-3 h-3 text-slate-500" />
          Demo Data
        </span>
      )}
    </div>
  );
};
