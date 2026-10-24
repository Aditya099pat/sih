import { useState } from "react";
import { Clock, ArrowRight, Landmark } from "lucide-react";
export const DashboardRightPanel = ({
  instruments,
  onOpenLifecycleAction
}) => {
  const [hoveredBank, setHoveredBank] = useState(null);
  const bankData = [
    { bank: "State Bank of India", pct: 52, amount: "\u20B955.00 L", color: "#0D3B66" },
    { bank: "Punjab National Bank", pct: 28, amount: "\u20B950.00 L", color: "#059669" },
    { bank: "Bank of Baroda", pct: 12, amount: "\u20B925.00 L", color: "#0284C7" },
    { bank: "Canara Bank", pct: 8, amount: "\u20B915.00 L", color: "#DC2626" }
  ];
  return <div className="space-y-4">
      {
    /* Widget 1: Donut Chart - Security Deposit Breakdown by Bank (from Wireframe 1) */
  }
      <div className="card-clean rounded-xl p-4 bg-white">
        <div className="flex items-center justify-between pb-3 border-b border-[#E2E8F0]">
          <div className="flex items-center gap-1.5">
            <Landmark className="w-4 h-4 text-[#0D3B66]" />
            <h3 className="text-xs font-bold text-[#0F172A] uppercase tracking-wider">
              Bank Portfolio Allocation
            </h3>
          </div>
          <span className="text-[10px] text-[#64748B] font-mono">100% PLEDGED</span>
        </div>

        {
    /* Donut Chart Visual SVG */
  }
        <div className="py-4 flex flex-col items-center">
          <div className="relative w-36 h-36 flex items-center justify-center">
            <svg viewBox="0 0 36 36" className="w-full h-full -rotate-90">
              {
    /* Segments: total circumference = 100 */
  }
              {
    /* SBI: 52% */
  }
              <circle
    cx="18"
    cy="18"
    r="15.915"
    fill="transparent"
    stroke="#0D3B66"
    strokeWidth="4"
    strokeDasharray="52 48"
    strokeDashoffset="0"
    className="transition-all hover:stroke-width-5 cursor-pointer"
    onMouseEnter={() => setHoveredBank("SBI")}
    onMouseLeave={() => setHoveredBank(null)}
  />
              {
    /* PNB: 28% */
  }
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
              {
    /* BOB: 12% */
  }
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
              {
    /* Canara: 8% */
  }
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
              <span className="text-[10px] text-[#64748B] font-semibold uppercase">Total Value</span>
              <span className="text-base font-bold text-[#0F172A] tabular-nums font-mono">₹1.05 Cr</span>
              <span className="text-[9px] text-[#059669] font-medium">4 Public Banks</span>
            </div>
          </div>

          {
    /* Legend Items */
  }
          <div className="grid grid-cols-2 gap-2 w-full mt-2 text-[11px]">
            {bankData.map((item) => <div
    key={item.bank}
    className="flex items-center justify-between p-1.5 rounded-md hover:bg-slate-50 transition-colors"
  >
                <div className="flex items-center gap-1.5 truncate">
                  <span className="w-2.5 h-2.5 rounded-xs shrink-0" style={{ backgroundColor: item.color }} />
                  <span className="truncate text-[#0F172A] font-medium">{item.bank.split(" ")[0]}</span>
                </div>
                <span className="font-mono font-bold text-[#64748B]">{item.pct}%</span>
              </div>)}
          </div>
        </div>
      </div>

      {
    /* Widget 2: Audit & Renewal Lifecycle Stepper (from Wireframe 1) */
  }
      <div className="card-clean rounded-xl p-4 bg-white">
        <div className="flex items-center justify-between pb-3 border-b border-[#E2E8F0]">
          <div className="flex items-center gap-1.5">
            <Clock className="w-4 h-4 text-[#0D3B66]" />
            <h3 className="text-xs font-bold text-[#0F172A] uppercase tracking-wider">
              Statutory Lifecycle Stepper
            </h3>
          </div>
          <span className="badge-expiring text-[10px] font-bold px-2 py-0.5 rounded-full">
            Stage 4 Active
          </span>
        </div>

        {
    /* Stepper Timeline */
  }
        <div className="py-3 space-y-4">
          {
    /* Step 1: Submitted */
  }
          <div className="flex gap-3 relative">
            <div className="flex flex-col items-center">
              <div className="w-6 h-6 rounded-full bg-[#059669] text-white flex items-center justify-center text-[10px] font-bold shrink-0">
                ✓
              </div>
              <div className="w-0.5 h-full bg-[#059669] my-0.5" />
            </div>
            <div className="pb-1 text-xs">
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-[#0F172A]">1. FDR Submitted & Registered</span>
                <span className="text-[10px] text-[#059669] font-medium">Done</span>
              </div>
              <p className="text-[11px] text-[#64748B] mt-0.5">
                Trust uploaded e-Stamp affidavit and original term deposit scan.
              </p>
              <span className="text-[10px] font-mono text-slate-400">15 Dec 2018</span>
            </div>
          </div>

          {
    /* Step 2: Bank Scrutiny Verified */
  }
          <div className="flex gap-3 relative">
            <div className="flex flex-col items-center">
              <div className="w-6 h-6 rounded-full bg-[#059669] text-white flex items-center justify-center text-[10px] font-bold shrink-0">
                ✓
              </div>
              <div className="w-0.5 h-full bg-[#059669] my-0.5" />
            </div>
            <div className="pb-1 text-xs">
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-[#0F172A]">2. Bank Scrutiny Verified</span>
                <span className="text-[10px] text-[#059669] font-medium">Done</span>
              </div>
              <p className="text-[11px] text-[#64748B] mt-0.5">
                SFMS 799 lien confirmation verified via SBI CBS gateway.
              </p>
              <span className="text-[10px] font-mono text-slate-400">18 Dec 2018</span>
            </div>
          </div>

          {
    /* Step 3: Active / Locked */
  }
          <div className="flex gap-3 relative">
            <div className="flex flex-col items-center">
              <div className="w-6 h-6 rounded-full bg-[#059669] text-white flex items-center justify-center text-[10px] font-bold shrink-0">
                ✓
              </div>
              <div className="w-0.5 h-full bg-[#D97706] my-0.5" />
            </div>
            <div className="pb-1 text-xs">
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-[#0F172A]">3. Active / Joint Lien Locked</span>
                <span className="text-[10px] text-[#059669] font-medium">In Force (8 Yrs)</span>
              </div>
              <p className="text-[11px] text-[#64748B] mt-0.5">
                Lien marked in favor of Member Secretary AICTE. Accrued ₹6.48L.
              </p>
              <span className="text-[10px] font-mono text-slate-400">2018 - 2026</span>
            </div>
          </div>

          {
    /* Step 4: Maturity Alert (Current) */
  }
          <div className="flex gap-3 relative">
            <div className="flex flex-col items-center">
              <div className="w-6 h-6 rounded-full bg-[#D97706] text-white flex items-center justify-center text-[10px] font-bold shrink-0 animate-pulse">
                !
              </div>
              <div className="w-0.5 h-full bg-slate-200 my-0.5" />
            </div>
            <div className="pb-1 text-xs">
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-[#D97706]">4. Maturity Alert (Current Stage)</span>
                <span className="badge-expiring text-[10px] font-semibold px-1.5 rounded">Action Due</span>
              </div>
              <p className="text-[11px] text-[#92400E] font-medium mt-0.5">
                FDR-SBIN-2018-09 reaches 8-year maturity in 42 days. Action required.
              </p>
              <span className="text-[10px] font-mono text-[#D97706] font-semibold">Due: 15 Dec 2026</span>
            </div>
          </div>

          {
    /* Step 5: Release Processed */
  }
          <div className="flex gap-3 relative">
            <div className="flex flex-col items-center">
              <div className="w-6 h-6 rounded-full bg-slate-200 text-slate-500 flex items-center justify-center text-[10px] font-bold shrink-0">
                5
              </div>
            </div>
            <div className="pb-1 text-xs">
              <div className="flex items-center gap-1.5">
                <span className="font-semibold text-slate-400">5. Release / Rollover Processed</span>
              </div>
              <p className="text-[11px] text-slate-400 mt-0.5">
                Phase-5 refund or tripartite rollover seal issued upon scrutiny.
              </p>
            </div>
          </div>
        </div>

        {
    /* Quick Stepper Action */
  }
        <button
    onClick={onOpenLifecycleAction}
    className="w-full mt-2 py-2 px-3 text-xs font-semibold text-white bg-[#0D3B66] hover:bg-[#002546] rounded-lg transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
  >
          <span>Initiate Phase-5 Resolution</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>;
};
