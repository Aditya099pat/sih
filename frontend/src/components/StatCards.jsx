import {
  Building,
  Clock,
  RotateCcw,
  AlertCircle,
  FileCheck2
} from "lucide-react";
import { FORMAT_INDIAN_CURRENCY } from "../data/mockData";
export const StatCards = ({
  instruments,
  onSelectTab,
  onFilterChange
}) => {
  const totalPrincipal = instruments.reduce((sum, item) => sum + item.principalAmount, 0);
  const maturingInstruments = instruments.filter((i) => i.remainingDays <= 90);
  const maturingAmount = maturingInstruments.reduce((sum, i) => sum + i.principalAmount, 0);
  const pendingInstruments = instruments.filter((i) => i.statusType === "info" || !i.bankConfirmed);
  const pendingAmount = pendingInstruments.reduce((sum, i) => sum + i.principalAmount, 0);
  const releaseEligibleCount = instruments.filter((i) => i.remainingDays <= 60).length;
  return <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
      {
    /* Tile 1: Total Active FDRs Value */
  }
      <div className="card-clean rounded-xl p-4 bg-white flex flex-col justify-between hover:border-slate-300 transition-all">
        <div>
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-[#0D3B66]/10 text-[#0D3B66] flex items-center justify-center font-bold">
                <Building className="w-4 h-4" />
              </div>
              <span className="text-[12px] font-semibold tracking-wider text-[#64748B] uppercase">
                Total Active FDRs Value
              </span>
            </div>
            <span className="badge-bank-verified text-[11px] font-semibold px-2 py-0.5 rounded-full flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-[#059669]" />
              Active Locked
            </span>
          </div>

          <div className="mt-1 flex items-baseline justify-between">
            <div className="text-[28px] lg:text-[30px] font-bold text-[#0F172A] tracking-tight tabular-nums">
              ₹1.05 Cr
            </div>
            {
    /* Clean mini sparkline */
  }
            <div className="flex items-end gap-1 h-6">
              <div className="w-1.5 bg-blue-200 rounded-xs h-3" />
              <div className="w-1.5 bg-blue-300 rounded-xs h-4" />
              <div className="w-1.5 bg-blue-400 rounded-xs h-5" />
              <div className="w-1.5 bg-[#0D3B66] rounded-xs h-6" />
            </div>
          </div>
        </div>

        <div className="mt-3 pt-2.5 border-t border-[#E2E8F0] flex items-center justify-between text-[12px]">
          <span className="text-[#64748B]">
            {instruments.length} Total Registered Instruments
          </span>
          <span className="font-semibold text-[#059669] flex items-center gap-0.5">
            +₹18.4L Accrued
          </span>
        </div>
      </div>

      {
    /* Tile 2: Maturing Within 30/60 Days */
  }
      <div className="card-clean rounded-xl p-4 bg-white flex flex-col justify-between hover:border-slate-300 transition-all">
        <div>
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-amber-50 text-[#D97706] flex items-center justify-center font-bold">
                <Clock className="w-4 h-4" />
              </div>
              <span className="text-[12px] font-semibold tracking-wider text-[#64748B] uppercase">
                Maturing &lt; 60 Days
              </span>
            </div>
            <span className="badge-expiring text-[11px] font-semibold px-2 py-0.5 rounded-full flex items-center gap-1">
              <AlertCircle className="w-3 h-3 text-[#D97706]" />
              Action Req.
            </span>
          </div>

          <div className="mt-1 flex items-baseline justify-between">
            <div className="text-[28px] lg:text-[30px] font-bold text-[#D97706] tracking-tight tabular-nums">
              {maturingInstruments.length} <span className="text-base font-medium text-slate-500">Inst.</span>
            </div>
            {
    /* Clean pulse/indicator */
  }
            <div className="flex items-end gap-1 h-6">
              <div className="w-1.5 bg-amber-200 rounded-xs h-4" />
              <div className="w-1.5 bg-amber-300 rounded-xs h-5" />
              <div className="w-1.5 bg-amber-500 rounded-xs h-6" />
            </div>
          </div>
        </div>

        <div className="mt-3 pt-2.5 border-t border-[#E2E8F0] flex items-center justify-between text-[12px]">
          <span className="text-[#64748B]">
            ₹35.00 Lakhs Requires Renewal
          </span>
          <span className="font-semibold text-[#D97706]">
            42 Days Left
          </span>
        </div>
      </div>

      {
    /* Tile 3: Pending Bank Verification */
  }
      <div className="card-clean rounded-xl p-4 bg-white flex flex-col justify-between hover:border-slate-300 transition-all">
        <div>
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-blue-50 text-[#0284C7] flex items-center justify-center font-bold">
                <FileCheck2 className="w-4 h-4" />
              </div>
              <span className="text-[12px] font-semibold tracking-wider text-[#64748B] uppercase">
                Pending Bank Verification
              </span>
            </div>
            <span className="bg-sky-50 text-sky-800 border border-sky-200 text-[11px] font-semibold px-2 py-0.5 rounded-full">
              Review Queue
            </span>
          </div>

          <div className="mt-1 flex items-baseline justify-between">
            <div className="text-[28px] lg:text-[30px] font-bold text-[#0F172A] tracking-tight tabular-nums">
              {pendingInstruments.length} <span className="text-base font-medium text-slate-500">Inst.</span>
            </div>
            <div className="flex items-end gap-1 h-6">
              <div className="w-1.5 bg-sky-200 rounded-xs h-3" />
              <div className="w-1.5 bg-sky-400 rounded-xs h-5" />
              <div className="w-1.5 bg-sky-600 rounded-xs h-4" />
            </div>
          </div>
        </div>

        <div className="mt-3 pt-2.5 border-t border-[#E2E8F0] flex items-center justify-between text-[12px]">
          <span className="text-[#64748B]">
            {FORMAT_INDIAN_CURRENCY(pendingAmount)} Awaiting CBS Match
          </span>
          <span className="font-semibold text-[#0284C7]">
            WRO Queue
          </span>
        </div>
      </div>

      {
    /* Tile 4: Release / Refund Requests */
  }
      <div className="card-clean rounded-xl p-4 bg-white flex flex-col justify-between hover:border-slate-300 transition-all">
        <div>
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-emerald-50 text-[#059669] flex items-center justify-center font-bold">
                <RotateCcw className="w-4 h-4" />
              </div>
              <span className="text-[12px] font-semibold tracking-wider text-[#64748B] uppercase">
                Release / Refund Requests
              </span>
            </div>
            <span className="badge-bank-verified text-[11px] font-semibold px-2 py-0.5 rounded-full">
              Phase-5 Eligible
            </span>
          </div>

          <div className="mt-1 flex items-baseline justify-between">
            <div className="text-[28px] lg:text-[30px] font-bold text-[#0F172A] tracking-tight tabular-nums">
              1 <span className="text-base font-medium text-slate-500">Ready</span>
            </div>
            <div className="flex items-end gap-1 h-6">
              <div className="w-1.5 bg-emerald-200 rounded-xs h-2" />
              <div className="w-1.5 bg-emerald-300 rounded-xs h-4" />
              <div className="w-1.5 bg-emerald-500 rounded-xs h-6" />
            </div>
          </div>
        </div>

        <div className="mt-3 pt-2.5 border-t border-[#E2E8F0] flex items-center justify-between text-[12px]">
          <span className="text-[#64748B]">
            ₹35.00 Lakhs Eligible for Refund
          </span>
          <span className="font-semibold text-[#059669] flex items-center gap-0.5">
            100% Complied
          </span>
        </div>
      </div>
    </div>;
};
