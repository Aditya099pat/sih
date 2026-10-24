import { useState } from "react";
import { Clock, ArrowRight, Landmark, CheckCircle2 } from "lucide-react";

export const DashboardRightPanel = ({
  instruments = [],
  onOpenLifecycleAction
}) => {
  const [hoveredBank, setHoveredBank] = useState(null);
  const bankData = [
    { bank: "State Bank of India", pct: 52, amount: "₹55.00 L", color: "#0B2545" },
    { bank: "Punjab National Bank", pct: 28, amount: "₹50.00 L", color: "#059669" },
    { bank: "Bank of Baroda", pct: 12, amount: "₹25.00 L", color: "#0284C7" },
    { bank: "Canara Bank", pct: 8, amount: "₹15.00 L", color: "#DC2626" }
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
      {/* Widget 1: Donut Chart - Security Deposit Breakdown by Bank (Col 6) */}
      <div className="lg:col-span-6 card-clean rounded-lg p-4 bg-white border border-[#E2E8F0] flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between pb-3 border-b border-[#E2E8F0]">
            <div className="flex items-center gap-1.5">
              <Landmark className="w-4 h-4 text-[#0B2545]" />
              <h3 className="text-xs font-bold text-slate-600 uppercase tracking-wider">
                Bank Portfolio Allocation &amp; Custody
              </h3>
            </div>
            <span className="text-[10px] text-slate-500 font-mono font-bold bg-slate-100 px-2 py-0.5 rounded border border-slate-200">
              100% PLEDGED LIEN
            </span>
          </div>

          <div className="py-4 flex flex-col sm:flex-row items-center justify-around gap-6">
            {/* Donut Chart Visual SVG */}
            <div className="relative w-36 h-36 shrink-0 flex items-center justify-center">
              <svg viewBox="0 0 36 36" className="w-full h-full -rotate-90">
                {/* SBI: 52% */}
                <circle
                  cx="18"
                  cy="18"
                  r="15.915"
                  fill="transparent"
                  stroke="#0B2545"
                  strokeWidth="4"
                  strokeDasharray="52 48"
                  strokeDashoffset="0"
                  className="transition-all hover:stroke-width-5 cursor-pointer"
                  onMouseEnter={() => setHoveredBank("SBI")}
                  onMouseLeave={() => setHoveredBank(null)}
                />
                {/* PNB: 28% */}
                <circle
                  cx="18"
                  cy="18"
                  r="15.915"
                  fill="transparent"
                  stroke="#059669"
                  strokeWidth="4"
                  strokeDasharray="28 72"
                  strokeDashoffset="-52"
                  className="transition-all hover:stroke-width-5 cursor-pointer"
                  onMouseEnter={() => setHoveredBank("PNB")}
                  onMouseLeave={() => setHoveredBank(null)}
                />
                {/* BOB: 12% */}
                <circle
                  cx="18"
                  cy="18"
                  r="15.915"
                  fill="transparent"
                  stroke="#0284C7"
                  strokeWidth="4"
                  strokeDasharray="12 88"
                  strokeDashoffset="-80"
                  className="transition-all hover:stroke-width-5 cursor-pointer"
                  onMouseEnter={() => setHoveredBank("BOB")}
                  onMouseLeave={() => setHoveredBank(null)}
                />
                {/* Canara: 8% */}
                <circle
                  cx="18"
                  cy="18"
                  r="15.915"
                  fill="transparent"
                  stroke="#DC2626"
                  strokeWidth="4"
                  strokeDasharray="8 92"
                  strokeDashoffset="-92"
                  className="transition-all hover:stroke-width-5 cursor-pointer"
                  onMouseEnter={() => setHoveredBank("Canara")}
                  onMouseLeave={() => setHoveredBank(null)}
                />
              </svg>
              <div className="absolute flex flex-col items-center justify-center text-center">
                <span className="text-[10px] text-slate-500 font-semibold uppercase">Total Locked</span>
                <span className="text-base font-bold text-[#0F172A] tabular-nums font-mono">₹1.05 Cr</span>
                <span className="text-[9px] text-[#059669] font-medium">4 Scheduled Banks</span>
              </div>
            </div>

            {/* Legend Items */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 flex-1 w-full text-xs">
              {bankData.map((item) => (
                <div
                  key={item.bank}
                  className="flex items-center justify-between p-2 rounded-md border border-slate-100 bg-[#F8FAFC] hover:bg-slate-100 transition-colors"
                >
                  <div className="flex items-center gap-1.5 truncate">
                    <span className="w-2.5 h-2.5 rounded-xs shrink-0" style={{ backgroundColor: item.color }} />
                    <span className="truncate text-slate-800 font-medium text-[11px]">{item.bank.split(" ")[0]}</span>
                  </div>
                  <div className="text-right">
                    <span className="font-mono font-bold text-slate-900 block text-[11px]">{item.amount}</span>
                    <span className="font-mono text-[10px] text-slate-500">{item.pct}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="pt-2 border-t border-[#E2E8F0] flex items-center justify-between text-[11px] text-slate-500">
          <span>SFMS Structured Financial Messaging Active</span>
          <span className="font-mono font-semibold text-[#059669]">Status: In-Sync</span>
        </div>
      </div>

      {/* Widget 2: Audit & Renewal Lifecycle Stepper (Col 6) */}
      <div className="lg:col-span-6 card-clean rounded-lg p-4 bg-white border border-[#E2E8F0] flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between pb-3 border-b border-[#E2E8F0]">
            <div className="flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-[#0B2545]" />
              <h3 className="text-xs font-bold text-slate-600 uppercase tracking-wider">
                Statutory Lifecycle &amp; Renewal Stepper
              </h3>
            </div>
            <span className="bg-amber-100 text-amber-900 border border-amber-300 text-[10px] font-bold px-2 py-0.5 rounded-full">
              Stage 4 Active
            </span>
          </div>

          <div className="py-2.5 space-y-2.5">
            {/* Step 1 & 2 Completed */}
            <div className="flex items-center gap-3 text-xs">
              <div className="w-5 h-5 rounded-full bg-[#059669] text-white flex items-center justify-center text-[10px] font-bold shrink-0">
                ✓
              </div>
              <div className="flex-1 flex items-center justify-between">
                <div>
                  <span className="font-bold text-slate-800">1. Deposit Registration &amp; Joint Lien</span>
                  <span className="text-[11px] text-slate-500 ml-2">Original Term Deposit uploaded</span>
                </div>
                <span className="text-[10px] font-mono text-slate-400">15 Dec 2018</span>
              </div>
            </div>

            <div className="flex items-center gap-3 text-xs">
              <div className="w-5 h-5 rounded-full bg-[#059669] text-white flex items-center justify-center text-[10px] font-bold shrink-0">
                ✓
              </div>
              <div className="flex-1 flex items-center justify-between">
                <div>
                  <span className="font-bold text-slate-800">2. Core Banking SFMS MT760 Verification</span>
                  <span className="text-[11px] text-slate-500 ml-2">SBI Gateway confirmed lien</span>
                </div>
                <span className="text-[10px] font-mono text-slate-400">18 Dec 2018</span>
              </div>
            </div>

            <div className="flex items-center gap-3 text-xs">
              <div className="w-5 h-5 rounded-full bg-[#059669] text-white flex items-center justify-center text-[10px] font-bold shrink-0">
                ✓
              </div>
              <div className="flex-1 flex items-center justify-between">
                <div>
                  <span className="font-bold text-slate-800">3. Active 8-Year Statutory Lock-in</span>
                  <span className="text-[11px] text-slate-500 ml-2">Accrued ₹6.48L interest to AICTE</span>
                </div>
                <span className="text-[10px] font-mono text-slate-400">2018-2026</span>
              </div>
            </div>

            {/* Step 4 Current Alert */}
            <div className="flex items-center gap-3 text-xs bg-amber-50 p-2 rounded-md border border-amber-200">
              <div className="w-5 h-5 rounded-full bg-[#D97706] text-white flex items-center justify-center text-[10px] font-bold shrink-0 animate-pulse">
                !
              </div>
              <div className="flex-1 flex items-center justify-between">
                <div>
                  <span className="font-bold text-amber-950">4. Maturity Alert &amp; Renewal Window</span>
                  <span className="text-[11px] text-amber-800 ml-2 font-medium">Reaches maturity in 42 days</span>
                </div>
                <span className="text-[10px] font-mono font-bold text-amber-900 bg-amber-100 px-1.5 py-0.5 rounded">
                  Due: 15 Dec 2026
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-2 border-t border-[#E2E8F0] flex items-center justify-between">
          <span className="text-[11px] text-slate-500">Stage 5: Phase-5 Release / Rollover</span>
          <button
            onClick={onOpenLifecycleAction}
            className="py-1.5 px-3 text-xs font-semibold text-white bg-[#0B2545] hover:bg-[#133E87] rounded-md transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <span>Initiate Phase-5 Resolution</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
