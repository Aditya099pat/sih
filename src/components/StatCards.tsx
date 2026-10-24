import React from 'react';
import { 
  Building, 
  TrendingUp, 
  Clock, 
  ShieldCheck, 
  AlertCircle, 
  CheckCircle2, 
  ArrowUpRight 
} from 'lucide-react';
import { FDRInstrument } from '../types';

interface StatCardsProps {
  instruments: FDRInstrument[];
  onSelectInstrumentRef?: (ref: string) => void;
  onInitiateRpgf?: () => void;
}

export const StatCards: React.FC<StatCardsProps> = ({
  instruments,
  onSelectInstrumentRef,
  onInitiateRpgf
}) => {
  const totalPrincipal = instruments.reduce((sum, item) => sum + item.principalAmount, 0);
  const totalAccrued = instruments.reduce((sum, item) => sum + item.accruedInterest, 0);
  const maturingCount = instruments.filter(i => i.remainingDays <= 90).length;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
      {/* Card 1: Total Pledged Capital */}
      <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-2xs hover:border-slate-300 transition-all flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <div className="p-1.5 rounded-lg bg-blue-50 text-[#0D3B66]">
                <Building className="w-4 h-4" />
              </div>
              <span className="text-[11px] font-bold tracking-wider text-slate-500 uppercase">
                TOTAL PLEDGED CAPITAL
              </span>
            </div>
            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
              {instruments.length} Active Instruments
            </span>
          </div>

          <div className="mt-1">
            <div className="text-2xl lg:text-[28px] font-extrabold text-slate-900 tracking-tight tabular-nums">
              ₹1,05,00,000
            </div>
            <p className="text-xs font-medium text-slate-500 mt-0.5">
              ₹1.05 Cr • 100% Locked with AICTE
            </p>
          </div>
        </div>

        <div className="mt-4 pt-3 border-t border-slate-100">
          <div className="flex items-center justify-between text-[11px] text-slate-600 mb-1">
            <span>Joint Lien: Member Se...</span>
            <span className="font-semibold text-emerald-700">Verified 100.0%</span>
          </div>
          <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
            <div className="bg-emerald-500 h-1.5 rounded-full w-full"></div>
          </div>
        </div>
      </div>

      {/* Card 2: Accrued Interest (Yield) */}
      <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-2xs hover:border-slate-300 transition-all flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <div className="p-1.5 rounded-lg bg-sky-50 text-[#0284C7]">
                <TrendingUp className="w-4 h-4" />
              </div>
              <span className="text-[11px] font-bold tracking-wider text-slate-500 uppercase">
                ACCRUED INTEREST (YIELD)
              </span>
            </div>
            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-semibold bg-sky-50 text-[#0284C7] border border-sky-200">
              Assigned to AICTE
            </span>
          </div>

          <div className="mt-1 flex items-baseline justify-between">
            <div className="text-2xl lg:text-[28px] font-extrabold text-slate-900 tracking-tight tabular-nums">
              ₹18,42,890
            </div>
            {/* Mini Bar Sparkline */}
            <div className="flex items-end gap-1 h-5">
              <div className="w-1.5 bg-sky-300 rounded-xs h-2.5"></div>
              <div className="w-1.5 bg-sky-400 rounded-xs h-3.5"></div>
              <div className="w-1.5 bg-sky-500 rounded-xs h-4.5"></div>
              <div className="w-1.5 bg-[#0284C7] rounded-xs h-5"></div>
            </div>
          </div>

          <p className="text-xs font-medium text-slate-500 mt-0.5">
            ₹18.42 Lakhs Cumulative Accrual
          </p>
        </div>

        <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-600">
          <span>Compounded Quarterly</span>
          <span className="font-semibold text-slate-800">Avg 7.15% p.a.</span>
        </div>
      </div>

      {/* Card 3: Upcoming Maturities */}
      <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-2xs hover:border-slate-300 transition-all flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <div className="p-1.5 rounded-lg bg-amber-50 text-[#D97706]">
                <Clock className="w-4 h-4" />
              </div>
              <span className="text-[11px] font-bold tracking-wider text-slate-500 uppercase">
                UPCOMING MATURITIES
              </span>
            </div>
            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-semibold bg-amber-50 text-[#D97706] border border-amber-200">
              Action: 42 Days
            </span>
          </div>

          <div className="mt-1 flex items-center justify-between">
            <div className="text-2xl lg:text-[28px] font-extrabold text-slate-900 tracking-tight">
              1 <span className="text-lg font-bold text-slate-700">Instrument</span>
            </div>
            <div className="w-6 h-6 rounded-full bg-amber-100 flex items-center justify-center text-amber-700">
              <AlertCircle className="w-4 h-4 text-[#D97706]" />
            </div>
          </div>

          <p className="text-xs font-medium text-slate-500 mt-0.5">
            ₹35,00,000 maturing 15 Dec 2026
          </p>
        </div>

        <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px]">
          <span className="font-mono text-slate-500">FDR-SBIN-2018-09</span>
          <button
            onClick={onInitiateRpgf}
            className="text-[#D97706] font-semibold hover:text-amber-800 transition-colors flex items-center gap-0.5 cursor-pointer"
          >
            Initiate RPGF <ArrowUpRight className="w-3 h-3" />
          </button>
        </div>
      </div>

      {/* Card 4: Defaulter & Penalties */}
      <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-2xs hover:border-slate-300 transition-all flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <div className="p-1.5 rounded-lg bg-emerald-50 text-emerald-700">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <span className="text-[11px] font-bold tracking-wider text-slate-500 uppercase">
                DEFAULTER & PENALTIES
              </span>
            </div>
            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
              Clean Record
            </span>
          </div>

          <div className="mt-1 flex items-center justify-between">
            <div className="text-2xl lg:text-[28px] font-extrabold text-slate-900 tracking-tight">
              0 <span className="text-lg font-bold text-slate-700">Frozen</span>
            </div>
            <CheckCircle2 className="w-5 h-5 text-emerald-600" />
          </div>

          <p className="text-xs font-medium text-slate-500 mt-0.5">
            Zero regional encashment disputes
          </p>
        </div>

        <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-600">
          <span>AICTE Security Clearance</span>
          <span className="font-semibold text-emerald-700">Unconditional</span>
        </div>
      </div>
    </div>
  );
};
