import { useState } from "react";
import {
  Clock,
  ArrowRight,
  Landmark,
  CheckCircle2,
  FileText,
  ShieldCheck,
  RotateCw,
  AlertTriangle,
  Link2,
  ExternalLink
} from "lucide-react";

export const DashboardRightPanel = ({
  instruments = [],
  onOpenLifecycleAction,
  onOpenRenewalComparison
}) => {
  const [hoveredBank, setHoveredBank] = useState(null);
  const [selectedStageIndex, setSelectedStageIndex] = useState(3); // Default to Stage 4 (Active Alert)

  const bankData = [
    { bank: "State Bank of India", pct: 52, amount: "₹55.00 L", color: "#0B2545" },
    { bank: "Punjab National Bank", pct: 28, amount: "₹50.00 L", color: "#059669" },
    { bank: "Bank of Baroda", pct: 12, amount: "₹25.00 L", color: "#0284C7" },
    { bank: "Canara Bank", pct: 8, amount: "₹15.00 L", color: "#DC2626" }
  ];

  // Rich lifecycle stage definitions with evidence, officer remarks, and linked records
  const lifecycleStages = [
    {
      id: 1,
      title: "Deposit Registration & Tripartite Lien",
      shortTitle: "1. Registration",
      state: "completed", // completed, active, upcoming, blocked
      date: "15 Dec 2018",
      evidence: "e-Stamp Affidavit #IN-MH892019382 • Original Term Deposit Scanned",
      officer: "Dr. Rajesh K. Sharma (Registrar)",
      remarks: "Initial statutory capital deposited in joint name with Member Secretary, AICTE.",
      nextAction: "Core Banking Lien Authentication Passed"
    },
    {
      id: 2,
      title: "Core Banking SFMS MT760 Verification",
      shortTitle: "2. Bank Verified",
      state: "completed",
      date: "18 Dec 2018",
      evidence: "SFMS Reference #SFMS-SBI-2018-9901 • IFSC: SBIN0001234",
      officer: "Sh. Anupam Sengupta (SBI Treasury Manager)",
      remarks: "Lien endorsed on Core Banking Server without encumbrance.",
      nextAction: "8-Year Statutory Lock-in Enforced"
    },
    {
      id: 3,
      title: "Active 8-Year Statutory Lock-in",
      shortTitle: "3. In-Force (8 Yrs)",
      state: "completed",
      date: "2018 - 2026",
      evidence: "Cumulative Accrued Interest Statement: +₹6,48,200.00 assigned to AICTE Pragati Fund",
      officer: "Central Bureau of Approval",
      remarks: "Unbroken unencumbered custody in national repository for 96 months.",
      nextAction: "AY 2025-26 Annual Audit Verified"
    },
    {
      id: 4,
      title: "Maturity Alert & Rollover Window",
      shortTitle: "4. Maturity Due",
      state: "active",
      date: "15 Dec 2026 (42 Days Left)",
      evidence: "Statutory Countdown Engine: T-42 Alert triggered. Clause 1.4 Notice dispatched.",
      officer: "Sh. V. K. Nambiar (ADG Scrutiny)",
      remarks: "Attention: Trust must execute Affidavit-6 Rollover or petition Phase-5 refund by 15 Nov 2026.",
      nextAction: "Execute Rollover Affidavit or File Phase-5 Discharge"
    },
    {
      id: 5,
      title: "Phase-5 Release / Rollover Resolution",
      shortTitle: "5. Release / Refund",
      state: "upcoming",
      date: "Scheduled AY 2026-27",
      evidence: "Inter-Bureau Clearance Certificate • No Ombudsman or EVC Freezes Pending",
      officer: "Dr. Rameshwar V. Rao (Regional Director)",
      remarks: "Disbursement seal will be issued upon clearance of statutory gates.",
      nextAction: "Awaiting Scrutiny Desk Recommendation"
    }
  ];

  const currentStage = lifecycleStages[selectedStageIndex] || lifecycleStages[3];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
      {/* Widget 1: Donut Chart - Security Deposit Breakdown by Bank (Col 5) */}
      <div className="lg:col-span-5 card-clean rounded-lg p-4 bg-white border border-[#E2E8F0] flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between pb-3 border-b border-[#E2E8F0]">
            <div className="flex items-center gap-1.5">
              <Landmark className="w-4 h-4 text-[#0B2545]" />
              <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
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
          <span>SFMS Tripartite Lien Messaging Active</span>
          <span className="font-mono font-semibold text-[#059669]">Status: In-Sync</span>
        </div>
      </div>

      {/* Widget 2: Interactive Statutory Lifecycle Stepper with Evidence & Linked Records (Col 7) */}
      <div className="lg:col-span-7 card-clean rounded-lg p-4 bg-white border border-[#E2E8F0] flex flex-col justify-between">
        <div>
          {/* Header */}
          <div className="flex items-center justify-between pb-3 border-b border-[#E2E8F0]">
            <div className="flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-[#0B2545]" />
              <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                Interactive Statutory Lifecycle Stepper
              </h3>
            </div>

            {/* Linked Record Comparison Button */}
            <button
              onClick={onOpenRenewalComparison}
              className="text-[11px] font-bold text-[#0B2545] bg-blue-50 hover:bg-blue-100 px-2.5 py-1 rounded-md border border-blue-200 transition-colors flex items-center gap-1 cursor-pointer"
              title="Compare Original FDR with Rollover Replacement"
            >
              <Link2 className="w-3.5 h-3.5 text-[#0B2545]" />
              <span>Compare Original vs Renewal</span>
            </button>
          </div>

          {/* Interactive Stepper Navigation (Horizontal Timeline) */}
          <div className="pt-3 pb-2 flex items-center justify-between gap-1 overflow-x-auto">
            {lifecycleStages.map((stage, idx) => {
              const isSelected = selectedStageIndex === idx;
              return (
                <button
                  key={stage.id}
                  onClick={() => setSelectedStageIndex(idx)}
                  className={`flex-1 p-2 rounded-md border text-left transition-all cursor-pointer relative ${
                    isSelected
                      ? "bg-blue-50/70 border-[#0B2545] ring-1 ring-[#0B2545]"
                      : "bg-[#F8FAFC] border-slate-200 hover:bg-slate-100"
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[10px] font-mono font-bold text-slate-500">
                      STAGE {stage.id}
                    </span>
                    {stage.state === "completed" ? (
                      <span className="w-4 h-4 rounded-full bg-[#059669] text-white flex items-center justify-center text-[9px] font-bold">
                        ✓
                      </span>
                    ) : stage.state === "active" ? (
                      <span className="w-4 h-4 rounded-full bg-[#D97706] text-white flex items-center justify-center text-[9px] font-bold animate-pulse">
                        !
                      </span>
                    ) : (
                      <span className="w-4 h-4 rounded-full bg-slate-200 text-slate-500 flex items-center justify-center text-[9px] font-bold">
                        {stage.id}
                      </span>
                    )}
                  </div>
                  <div className="text-[11px] font-bold text-slate-800 truncate">
                    {stage.shortTitle}
                  </div>
                  <div className="text-[10px] font-mono text-slate-500 truncate">
                    {stage.date}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Stage Evidence & Officer Remarks Inspector Box */}
          <div className="mt-3 p-3.5 rounded-md border border-slate-200 bg-[#F8FAFC] space-y-2 text-xs">
            <div className="flex items-center justify-between">
              <span className="font-bold text-[#0F172A] text-xs">
                {currentStage.title}
              </span>
              <span
                className={`text-[10px] font-bold px-2 py-0.5 rounded font-mono ${
                  currentStage.state === "completed"
                    ? "bg-emerald-100 text-emerald-900 border border-emerald-300"
                    : currentStage.state === "active"
                    ? "bg-amber-100 text-amber-900 border border-amber-300"
                    : "bg-slate-100 text-slate-700 border border-slate-300"
                }`}
              >
                {currentStage.state === "completed"
                  ? "COMPLETED AUDIT"
                  : currentStage.state === "active"
                  ? "ACTION DUE (CURRENT)"
                  : "UPCOMING RESOLUTION"}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] pt-1">
              <div>
                <span className="text-slate-500 font-semibold block text-[10px] uppercase">
                  Supporting Legal Evidence:
                </span>
                <span className="font-mono text-slate-800 font-medium">
                  {currentStage.evidence}
                </span>
              </div>
              <div>
                <span className="text-slate-500 font-semibold block text-[10px] uppercase">
                  Statutory Officer Remarks:
                </span>
                <span className="text-slate-800 font-medium">
                  {currentStage.officer}: {currentStage.remarks}
                </span>
              </div>
            </div>

            <div className="pt-2 border-t border-slate-200/80 flex items-center justify-between text-[11px]">
              <span className="text-slate-600">
                Next Operational Step: <strong className="text-[#0B2545]">{currentStage.nextAction}</strong>
              </span>
              <span className="text-slate-400 font-mono text-[10px]">
                Linked Record: FDR-SBIN-2018-09
              </span>
            </div>
          </div>
        </div>

        {/* Stepper Footer Action */}
        <div className="pt-3 border-t border-[#E2E8F0] flex items-center justify-between">
          <span className="text-xs text-slate-500">
            Selected Stage: <strong>{currentStage.shortTitle}</strong> ({currentStage.date})
          </span>
          <button
            onClick={onOpenLifecycleAction}
            className="py-1.5 px-3.5 text-xs font-bold text-white bg-[#0B2545] hover:bg-[#133E87] rounded-md transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
          >
            <span>Initiate Phase-5 Resolution</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
