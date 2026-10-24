import {
  Building,
  Clock,
  RotateCcw,
  AlertCircle,
  FileCheck2,
  AlertTriangle
} from "lucide-react";
import { FORMAT_INDIAN_CURRENCY } from "@data/mockData";

export const StatCards = ({
  instruments = [],
  onSelectTab,
  onFilterChange
}) => {
  const totalPrincipal = instruments.reduce((sum, item) => sum + (item.principalAmount || 0), 0);
  const maturingInstruments = instruments.filter((i) => i.remainingDays <= 90);
  const maturingAmount = maturingInstruments.reduce((sum, i) => sum + (i.principalAmount || 0), 0);
  const pendingInstruments = instruments.filter((i) => i.statusType === "info" || !i.bankConfirmed);
  const pendingAmount = pendingInstruments.reduce((sum, i) => sum + (i.principalAmount || 0), 0);
  const releaseEligibleCount = instruments.filter((i) => i.remainingDays <= 60).length;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
      {/* Tile 1: Total Active FDRs Value (Neutral baseline container) */}
      <div className="card-clean rounded-lg p-4 bg-white border border-[#E2E8F0] flex flex-col justify-between hover:border-slate-300 transition-all">
        <div>
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-md bg-[#0B2545]/10 text-[#0B2545] flex items-center justify-center font-bold">
                <Building className="w-4 h-4" />
              </div>
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Total Active Portfolio
              </span>
            </div>
            <span className="badge-bank-verified text-[11px] font-semibold px-2 py-0.5 rounded-full flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-[#059669]" />
              Active Locked
            </span>
          </div>

          <div className="mt-1 flex items-baseline justify-between">
            <div className="text-2xl lg:text-[28px] font-bold text-[#0F172A] font-mono tracking-tight tabular-nums">
              ₹1.05 Cr
            </div>
            <div className="flex items-end gap-1 h-5">
              <div className="w-1 bg-slate-200 rounded-xs h-2.5" />
              <div className="w-1 bg-slate-300 rounded-xs h-3.5" />
              <div className="w-1 bg-slate-400 rounded-xs h-4" />
              <div className="w-1 bg-[#0B2545] rounded-xs h-5" />
            </div>
          </div>
        </div>

        <div className="mt-3 pt-2.5 border-t border-[#E2E8F0] flex items-center justify-between text-xs">
          <span className="text-slate-500">
            {instruments.length} Registered Deposits
          </span>
          <span className="font-semibold font-mono text-[#059669]">
            +₹18.40L Accrued
          </span>
        </div>
      </div>

      {/* Tile 2: Maturing Within 30/60 Days (EMPHASIZED: Amber tint & priority alert) */}
      <div className="rounded-lg p-4 bg-amber-50/70 border border-amber-300 flex flex-col justify-between hover:border-amber-400 transition-all shadow-2xs">
        <div>
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-md bg-amber-200/60 text-amber-900 flex items-center justify-center font-bold">
                <Clock className="w-4 h-4 text-amber-800" />
              </div>
              <span className="text-xs font-bold uppercase tracking-wider text-amber-900">
                Maturing &lt; 60 Days
              </span>
            </div>
            <span className="bg-amber-100 text-amber-900 border border-amber-300 text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
              <AlertTriangle className="w-3 h-3 text-amber-700" />
              Action Required
            </span>
          </div>

          <div className="mt-1 flex items-baseline justify-between">
            <div className="text-2xl lg:text-[28px] font-bold text-amber-950 font-mono tracking-tight tabular-nums">
              {maturingInstruments.length} <span className="text-sm font-semibold text-amber-800">Instruments</span>
            </div>
            <div className="flex items-end gap-1 h-5">
              <div className="w-1 bg-amber-300 rounded-xs h-2.5" />
              <div className="w-1 bg-amber-400 rounded-xs h-3.5" />
              <div className="w-1 bg-amber-600 rounded-xs h-5" />
            </div>
          </div>
        </div>

        <div className="mt-3 pt-2.5 border-t border-amber-200 flex items-center justify-between text-xs">
          <span className="text-amber-900 font-medium font-mono">
            {FORMAT_INDIAN_CURRENCY(maturingAmount || 3500000)} At Risk
          </span>
          <span className="font-bold text-amber-900 bg-amber-200/50 px-1.5 py-0.5 rounded text-[11px]">
            42 Days to Rollover
          </span>
        </div>
      </div>

      {/* Tile 3: Pending Bank Verification (EMPHASIZED: Rose/Red tint & priority review) */}
      <div className="rounded-lg p-4 bg-rose-50/70 border border-rose-300 flex flex-col justify-between hover:border-rose-400 transition-all shadow-2xs">
        <div>
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-md bg-rose-200/60 text-rose-900 flex items-center justify-center font-bold">
                <AlertCircle className="w-4 h-4 text-rose-800" />
              </div>
              <span className="text-xs font-bold uppercase tracking-wider text-rose-900">
                Pending Bank Verification
              </span>
            </div>
            <span className="bg-rose-100 text-rose-900 border border-rose-300 text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-rose-600 animate-pulse" />
              Scrutiny Queue
            </span>
          </div>

          <div className="mt-1 flex items-baseline justify-between">
            <div className="text-2xl lg:text-[28px] font-bold text-rose-950 font-mono tracking-tight tabular-nums">
              {pendingInstruments.length} <span className="text-sm font-semibold text-rose-800">Pending</span>
            </div>
            <div className="flex items-end gap-1 h-5">
              <div className="w-1 bg-rose-300 rounded-xs h-2.5" />
              <div className="w-1 bg-rose-400 rounded-xs h-3.5" />
              <div className="w-1 bg-rose-600 rounded-xs h-4.5" />
            </div>
          </div>
        </div>

        <div className="mt-3 pt-2.5 border-t border-rose-200 flex items-center justify-between text-xs">
          <span className="text-rose-900 font-medium font-mono">
            {FORMAT_INDIAN_CURRENCY(pendingAmount || 3500000)} Awaiting CBS Match
          </span>
          <span className="font-bold text-rose-900 bg-rose-200/50 px-1.5 py-0.5 rounded text-[11px]">
            WRO Priority
          </span>
        </div>
      </div>

      {/* Tile 4: Release / Refund Requests (Compliant Emerald Container) */}
      <div className="card-clean rounded-lg p-4 bg-white border border-[#E2E8F0] flex flex-col justify-between hover:border-slate-300 transition-all">
        <div>
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-md bg-emerald-50 text-[#059669] flex items-center justify-center font-bold">
                <RotateCcw className="w-4 h-4" />
              </div>
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Phase-5 Release Ready
              </span>
            </div>
            <span className="badge-bank-verified text-[11px] font-semibold px-2 py-0.5 rounded-full">
              Refund Eligible
            </span>
          </div>

          <div className="mt-1 flex items-baseline justify-between">
            <div className="text-2xl lg:text-[28px] font-bold text-[#0F172A] font-mono tracking-tight tabular-nums">
              1 <span className="text-sm font-medium text-slate-500">Instrument</span>
            </div>
            <div className="flex items-end gap-1 h-5">
              <div className="w-1 bg-emerald-200 rounded-xs h-2" />
              <div className="w-1 bg-emerald-300 rounded-xs h-3.5" />
              <div className="w-1 bg-emerald-500 rounded-xs h-5" />
            </div>
          </div>
        </div>

        <div className="mt-3 pt-2.5 border-t border-[#E2E8F0] flex items-center justify-between text-xs">
          <span className="text-slate-600 font-mono">
            ₹35.00 Lakhs Eligible
          </span>
          <span className="font-semibold text-[#059669] flex items-center gap-0.5">
            100% Cleared
          </span>
        </div>
      </div>
    </div>
  );
};
