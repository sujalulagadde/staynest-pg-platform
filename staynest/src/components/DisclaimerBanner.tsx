import React from 'react';
import { AlertCircle, ShieldCheck } from 'lucide-react';

export const DisclaimerBanner: React.FC = () => {
  return (
    <div className="bg-amber-50 border-y border-amber-200 py-3 px-4 sm:px-6">
      <div className="max-w-7xl mx-mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs sm:text-sm text-amber-900">
        <div className="flex items-start gap-2.5">
          <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
          <div>
            <span className="font-bold">Student Safety Disclaimer:</span> Students and parents should personally verify property location, owner credentials, monthly rent, facilities, and available beds before making any advance payments.
          </div>
        </div>
        <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-100/80 rounded-md font-semibold text-amber-800 text-xs shrink-0 self-end sm:self-center border border-amber-300">
          <ShieldCheck className="w-3.5 h-3.5 text-amber-700" />
          Verified Listings Only
        </div>
      </div>
    </div>
  );
};
