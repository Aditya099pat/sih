import {
  Building,
  Clock,
  RotateCcw,
  AlertCircle,
  FileCheck2,
  AlertTriangle,
  ArrowRight,
  TrendingUp,
  ShieldCheck
} from "lucide-react";
import { FORMAT_INDIAN_CURRENCY } from "@data/mockData";

export const StatCards = ({
  instruments = [],
  activeFilter = "all",
  onSelectFilter
}) => {
  const totalPrincipal = instruments.reduce((sum, item) => sum + (item.principalAmount || 0), 0);
  const maturingInstruments = instruments.filter((i) => i.remainingDays <= 90);
  const maturingAmount = maturingInstruments.reduce((sum, i) => sum + (i.principalAmount || 0), 0);
  const pendingInstruments = instruments.filter((i) => i.statusType === "info" || !i.bankConfirmed);
  const pendingAmount = pendingInstruments.reduce((sum, i) => sum + (i.principalAmount || 0), 0);
  const releaseEligibleCount = instruments.filter((i) => i.remainingDays <= 60).length;

  const handleKeyDown = (e, filterKey) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onSelectFilter && onSelectFilter(filterKey);
    }
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
      {/* Tile 1: Total Active Portfolio (Clickable -> filters to all active FDRs) */}
      <div
        role="button"
        tabIndex={0}
        onClick={() => onSelectFilter && onSelectFilter("all")}
        onKeyDown={(e) => handleKeyDown(e, "all")}
        className={`card-clean rounded-lg p-4 bg-white border cursor-pointer transition-all hover:border-[#0B2545] hover:shadow-xs group ${
          activeFilter === "all" ? "ring-2 ring-[#0B2545] border-[#0B2545]" : "border-[#E2E8F0]"
        }`}
        title="Click to view full Active FDR registry"
      >
        <div className="flex flex-col justify-between h-full">
          <div>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-md bg-[#0B2545]/10 text-[#0B2545] flex items-center justify-center font-bold group-hover:bg-[#0B2545] group-hover:text-white transition-colors">
                  <Building className="w-4 h-4" />
                </div>
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Total Active Portfolio
                </span>
              </div>
              <span className="bg-emerald-50 text-emerald-800 border border-emerald-200 text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1 font-mono">
                <span className="w-1.5 h-1.5 rounded-full bg-[#059669]" />
                +8.4% YoY
              </span>
            </div>

            <div className="mt-1 flex items-baseline justify-between">
              <div className="text-2xl lg:text-[28px] font-bold text-[#0F172A] font-mono tracking-tight tabular-nums">
                ₹1.05 Cr
              </div>
              <span className="text-xs font-semibold text-slate-500 font-mono">
                {instruments.length} Instruments
              </span>
            </div>
          </div>

          <div className="mt-3 pt-2.5 border-t border-[#E2E8F0] flex items-center justify-between text-xs">
            <span className="text-slate-500 font-mono text-[11px]">
              +₹18.40L Accrued Yield
            </span>
            <span className="font-semibold text-[#0B2545] flex items-center gap-1 group-hover:translate-x-0.5 transition-transform text-[11px]">
              <span>View registry</span>
              <ArrowRight className="w-3 h-3" />
            </span>
          </div>
        </div>
      </div>

      {/* Tile 2: Maturing in 60 Days (Clickable -> filters to deadline-sorted instruments) */}
      <div
        role="button"
        tabIndex={0}
        onClick={() => onSelectFilter && onSelectFilter("expiring")}
        onKeyDown={(e) => handleKeyDown(e, "expiring")}
        className={`rounded-lg p-4 bg-amber-50/70 border cursor-pointer transition-all hover:border-amber-500 hover:shadow-xs group ${
          activeFilter === "expiring" ? "ring-2 ring-amber-600 border-amber-600" : "border-amber-300"
        }`}
        title="Click to view deadline-sorted instruments maturing within 60 days"
      >
        <div className="flex flex-col justify-between h-full">
          <div>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-md bg-amber-200/60 text-amber-900 flex items-center justify-center font-bold group-hover:bg-amber-600 group-hover:text-white transition-colors">
                  <Clock className="w-4 h-4" />
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
              <span className="text-xs font-bold text-amber-900 font-mono">
                42d Lead Left
              </span>
            </div>
          </div>

          <div className="mt-3 pt-2.5 border-t border-amber-200 flex items-center justify-between text-xs">
            <span className="text-amber-900 font-medium font-mono text-[11px]">
              {FORMAT_INDIAN_CURRENCY(maturingAmount || 3500000)} At Risk
            </span>
            <span className="font-semibold text-amber-900 flex items-center gap-1 group-hover:translate-x-0.5 transition-transform text-[11px]">
              <span>View deadlines</span>
              <ArrowRight className="w-3 h-3" />
            </span>
          </div>
        </div>
      </div>

      {/* Tile 3: Pending Bank Verification (Clickable -> filters to verification queue) */}
      <div
        role="button"
        tabIndex={0}
        onClick={() => onSelectFilter && onSelectFilter("pending")}
        onKeyDown={(e) => handleKeyDown(e, "pending")}
        className={`rounded-lg p-4 bg-rose-50/70 border cursor-pointer transition-all hover:border-rose-500 hover:shadow-xs group ${
          activeFilter === "pending" ? "ring-2 ring-rose-600 border-rose-600" : "border-rose-300"
        }`}
        title="Click to view pending bank verification queue"
      >
        <div className="flex flex-col justify-between h-full">
          <div>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-md bg-rose-200/60 text-rose-900 flex items-center justify-center font-bold group-hover:bg-rose-600 group-hover:text-white transition-colors">
                  <AlertCircle className="w-4 h-4" />
                </div>
                <span className="text-xs font-bold uppercase tracking-wider text-rose-900">
                  Pending Verification
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
              <span className="text-xs font-bold text-rose-900 font-mono">
                WRO Queue
              </span>
            </div>
          </div>

          <div className="mt-3 pt-2.5 border-t border-rose-200 flex items-center justify-between text-xs">
            <span className="text-rose-900 font-medium font-mono text-[11px]">
              {FORMAT_INDIAN_CURRENCY(pendingAmount || 3500000)} Awaiting Match
            </span>
            <span className="font-semibold text-rose-900 flex items-center gap-1 group-hover:translate-x-0.5 transition-transform text-[11px]">
              <span>View queue</span>
              <ArrowRight className="w-3 h-3" />
            </span>
          </div>
        </div>
      </div>

      {/* Tile 4: Phase-5 Release Ready (Clickable -> filters to eligible requests) */}
      <div
        role="button"
        tabIndex={0}
        onClick={() => onSelectFilter && onSelectFilter("release")}
        onKeyDown={(e) => handleKeyDown(e, "release")}
        className={`card-clean rounded-lg p-4 bg-white border cursor-pointer transition-all hover:border-emerald-600 hover:shadow-xs group ${
          activeFilter === "release" ? "ring-2 ring-emerald-600 border-emerald-600" : "border-[#E2E8F0]"
        }`}
        title="Click to view Phase-5 refund/release eligible requests"
      >
        <div className="flex flex-col justify-between h-full">
          <div>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-md bg-emerald-50 text-[#059669] flex items-center justify-center font-bold group-hover:bg-[#059669] group-hover:text-white transition-colors">
                  <RotateCcw className="w-4 h-4" />
                </div>
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Phase-5 Release Ready
                </span>
              </div>
              <span className="bg-emerald-50 text-[#059669] border border-emerald-200 text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1 font-mono">
                100% Cleared
              </span>
            </div>

            <div className="mt-1 flex items-baseline justify-between">
              <div className="text-2xl lg:text-[28px] font-bold text-[#0F172A] font-mono tracking-tight tabular-nums">
                1 <span className="text-sm font-medium text-slate-500">Instrument</span>
              </div>
              <span className="text-xs font-bold text-emerald-700 font-mono">
                Discharge Ready
              </span>
            </div>
          </div>

          <div className="mt-3 pt-2.5 border-t border-[#E2E8F0] flex items-center justify-between text-xs">
            <span className="text-slate-600 font-mono text-[11px]">
              ₹35.00L Refund Eligible
            </span>
            <span className="font-semibold text-emerald-700 flex items-center gap-1 group-hover:translate-x-0.5 transition-transform text-[11px]">
              <span>View eligible</span>
              <ArrowRight className="w-3 h-3" />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
