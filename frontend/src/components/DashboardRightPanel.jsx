import { useState, useMemo } from "react";
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
import { FORMAT_COMPACT_CURRENCY } from "@data/mockData";

export const DashboardRightPanel = ({
  instruments = [],
  onOpenLifecycleAction,
  onOpenRenewalComparison,
  onFilterByBank
}) => {
  const [hoveredBank, setHoveredBank] = useState(null);
  const [selectedStageIndex, setSelectedStageIndex] = useState(3); // Default to Stage 4 (Active Alert)

  // Dynamically compute bank portfolio distribution from actual instruments
  const bankData = useMemo(() => {
    if (!instruments || instruments.length === 0) return [];

    const totalPortfolio = instruments.reduce((sum, i) => sum + (i.principalAmount || 0), 0);
    const bankGroups = {};

    instruments.forEach((inst) => {
      const bName = inst.bankName || "Other Bank";
      if (!bankGroups[bName]) {
        bankGroups[bName] = { amount: 0, count: 0 };
      }
      bankGroups[bName].amount += inst.principalAmount || 0;
      bankGroups[bName].count += 1;
    });

    const colors = ["#0B2545", "#059669", "#0284C7", "#DC2626", "#D97706", "#7C3AED", "#475569"];
    const sorted = Object.entries(bankGroups).sort((a, b) => b[1].amount - a[1].amount);

    const top4 = sorted.slice(0, 4);
    const remainder = sorted.slice(4);

    const result = top4.map(([bank, data], idx) => {
      const pct = Math.round((data.amount / totalPortfolio) * 100);
      return {
        bank,
        pct,
        amount: FORMAT_COMPACT_CURRENCY(data.amount),
        rawAmount: data.amount,
        count: data.count,
        color: colors[idx]
      };
    });

    if (remainder.length > 0) {
      const remAmount = remainder.reduce((sum, item) => sum + item[1].amount, 0);
      const remCount = remainder.reduce((sum, item) => sum + item[1].count, 0);
      const remPct = Math.max(1, Math.round((remAmount / totalPortfolio) * 100));
      result.push({
        bank: "Other Scheduled Banks",
        pct: remPct,
        amount: FORMAT_COMPACT_CURRENCY(remAmount),
        rawAmount: remAmount,
        count: remCount,
        color: colors[4]
      });
    }

    return result;
  }, [instruments]);

  // Dynamic counts for each lifecycle stage
  const registeredCount = instruments.length;
  const verifiedCount = instruments.filter((i) => i.bankConfirmed).length;
  const inForceCount = instruments.filter((i) => i.remainingDays > 90 && i.bankConfirmed).length;
  const maturingCount = instruments.filter((i) => i.remainingDays <= 90).length;
  const releaseEligibleCount = instruments.filter((i) => (i.phaseReleaseEligible || i.remainingDays <= 60) && i.bankConfirmed).length;

  const lifecycleStages = [
    {
      id: 1,
      title: "Deposit Registration & Tripartite Lien",
      shortTitle: "1. Registration",
      state: "completed",
      date: "Initial Sanction Period",
      count: registeredCount,
      evidence: "Format Affidavit-6 • E-Stamping • Bank Tripartite Covenant",
      officer: "Institutional Signatory & Registrar",
      remarks: "Statutory capital pledged irrevocably in joint custody with Member Secretary, AICTE.",
      nextAction: "Core Banking SFMS Authentication Verification"
    },
    {
      id: 2,
      title: "Core Banking SFMS MT760 Verification",
      shortTitle: "2. Bank Verified",
      state: "completed",
      date: "Post-Issuance Gateway Sync",
      count: verifiedCount,
      evidence: "SFMS Structured Financial Messaging System L760 Protocol Confirmed",
      officer: "Scheduled Bank Treasury Gateway Hub",
      remarks: "Irrevocable non-encashment lien marked on bank Core Banking System (CBS).",
      nextAction: "8-Year Statutory Lock-in Enforced"
    },
    {
      id: 3,
      title: "Active 8-Year Statutory Lock-in",
      shortTitle: "3. In-Force (8 Yrs)",
      state: "completed",
      date: "8-Year Statutory Term",
      count: inForceCount,
      evidence: "Periodic Non-Encashment MT799 Electronic Heartbeats Verified",
      officer: "AICTE Central Bureau of Regulation",
      remarks: "Principal immobilized in unencumbered custody with interest yield assigned to national scholarships.",
      nextAction: "AY Annual Compliance Audit Certified"
    },
    {
      id: 4,
      title: "Maturity Alert & Rollover Window",
      shortTitle: "4. Maturity Due",
      state: "active",
      date: "T-90 to T-0 Countdown",
      count: maturingCount,
      evidence: "Prescriptive Automated Escalation Engine Dispatches Active",
      officer: "Regional Director & Scrutiny Bureau",
      remarks: "Institutions must file Affidavit-6 rollover addendum or petition Phase-5 statutory release.",
      nextAction: "Execute Rollover Covenant or File Phase-5 Petition"
    },
    {
      id: 5,
      title: "Phase-5 Release / Rollover Resolution",
      shortTitle: "5. Release / Refund",
      state: "upcoming",
      date: "Post 8-Year Settlement",
      count: releaseEligibleCount,
      evidence: "Inter-Bureau Clearance Certificate • No Ombudsman or EVC Penalties",
      officer: "Member Secretary, AICTE New Delhi",
      remarks: "Lien revocation and principal return authorized upon passing all policy-as-code clearance gates.",
      nextAction: "Awaiting Scrutiny Desk Recommendation"
    }
  ];

  const currentStage = lifecycleStages[selectedStageIndex] || lifecycleStages[3];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
      {/* Widget 1: Donut Chart - Security Deposit Breakdown by Bank (Col 5) */}
      <div className="lg:col-span-5 card-clean rounded-lg p-4 bg-white border border-[#E2E8F0] flex flex-col justify-between shadow-2xs">
        <div>
          <div className="flex items-center justify-between pb-3 border-b border-[#E2E8F0]">
            <div className="flex items-center gap-1.5">
              <Landmark className="w-4 h-4 text-[#0B2545]" />
              <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                Bank Portfolio Allocation &amp; Custody
              </h3>
            </div>
            <span className="text-[10px] font-mono bg-slate-100 text-slate-600 px-2 py-0.5 rounded border border-slate-200 font-semibold">
              {instruments.length} Total FDRs
            </span>
          </div>

          {/* Donut Chart Visual & Legend */}
          <div className="py-4 flex flex-col sm:flex-row items-center gap-6">
            {/* SVG Donut */}
            <div className="relative w-36 h-36 shrink-0 flex items-center justify-center">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                {/* Background Ring */}
                <circle
                  cx="50"
                  cy="50"
                  r="38"
                  fill="transparent"
                  stroke="#F1F5F9"
                  strokeWidth="14"
                />

                {/* Slices calculation */}
                {(() => {
                  let accumulatedPct = 0;
                  return bankData.map((item, idx) => {
                    const strokeDasharray = `${item.pct * 2.387} ${100 * 2.387}`;
                    const strokeDashoffset = -accumulatedPct * 2.387;
                    accumulatedPct += item.pct;
                    const isHovered = hoveredBank === item.bank;

                    return (
                      <circle
                        key={idx}
                        cx="50"
                        cy="50"
                        r="38"
                        fill="transparent"
                        stroke={item.color}
                        strokeWidth={isHovered ? "17" : "14"}
                        strokeDasharray={strokeDasharray}
                        strokeDashoffset={strokeDashoffset}
                        className="transition-all duration-200 cursor-pointer"
                        onMouseEnter={() => setHoveredBank(item.bank)}
                        onMouseLeave={() => setHoveredBank(null)}
                      />
                    );
                  });
                })()}
              </svg>

              {/* Center Donut Label */}
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none">
                <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                  National
                </span>
                <span className="text-sm font-bold font-mono text-[#0B2545]">
                  {bankData.length} Banks
                </span>
                <span className="text-[9px] text-slate-500 font-semibold">Scheduled</span>
              </div>
            </div>

            {/* Bank Breakdown List */}
            <div className="flex-1 space-y-2 w-full">
              {bankData.map((b, i) => (
                <div
                  key={i}
                  onMouseEnter={() => setHoveredBank(b.bank)}
                  onMouseLeave={() => setHoveredBank(null)}
                  onClick={() => onFilterByBank && onFilterByBank(b.bank)}
                  className={`flex items-center justify-between text-xs p-1.5 rounded transition-all cursor-pointer ${
                    hoveredBank === b.bank ? "bg-slate-100 font-bold" : "hover:bg-slate-50"
                  }`}
                >
                  <div className="flex items-center gap-2 truncate">
                    <span
                      className="w-2.5 h-2.5 rounded-full shrink-0"
                      style={{ backgroundColor: b.color }}
                    />
                    <span className="text-slate-700 truncate text-[11px]" title={b.bank}>
                      {b.bank}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 shrink-0 font-mono text-[11px]">
                    <span className="text-slate-500">{b.pct}%</span>
                    <strong className="text-slate-900">{b.amount}</strong>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer info note */}
        <div className="pt-2 border-t border-[#E2E8F0] flex items-center justify-between text-[11px] text-slate-500">
          <span className="flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5 text-[#059669]" />
            <span>100% Scheduled Commercial Bank Lien</span>
          </span>
          <span className="font-mono text-[10px]">APH Sec 1.4.3</span>
        </div>
      </div>

      {/* Widget 2: Interactive 5-Stage Statutory Stepper (Col 7) */}
      <div className="lg:col-span-7 card-clean rounded-lg p-4 bg-white border border-[#E2E8F0] flex flex-col justify-between shadow-2xs">
        <div>
          <div className="flex items-center justify-between pb-3 border-b border-[#E2E8F0]">
            <div>
              <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-[#0B2545]" />
                <span>Statutory 8-Year Lifecycle Progression</span>
              </h3>
            </div>
            <span className="text-xs font-mono font-bold text-[#0B2545]">
              Section 1.4 Compliance
            </span>
          </div>

          {/* Stepper Buttons (5 Interactive Stages) */}
          <div className="pt-4 pb-2">
            <div className="grid grid-cols-5 gap-1.5 relative">
              {lifecycleStages.map((stage, idx) => {
                const isSelected = selectedStageIndex === idx;
                return (
                  <button
                    key={stage.id}
                    onClick={() => setSelectedStageIndex(idx)}
                    className={`flex flex-col items-center text-center p-2 rounded-lg border transition-all cursor-pointer ${
                      isSelected
                        ? "border-[#0B2545] bg-blue-50/70 shadow-2xs"
                        : "border-[#E2E8F0] hover:border-slate-300 bg-white"
                    }`}
                  >
                    <div
                      className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold mb-1 ${
                        stage.state === "completed"
                          ? "bg-[#059669] text-white"
                          : stage.state === "active"
                          ? "bg-amber-500 text-white animate-pulse"
                          : "bg-slate-200 text-slate-600"
                      }`}
                    >
                      {stage.state === "completed" ? "✓" : idx + 1}
                    </div>
                    <span className="text-[10px] font-bold text-slate-800 line-clamp-1">
                      {stage.shortTitle}
                    </span>
                    <span className="text-[9px] font-mono text-slate-500 font-semibold mt-0.5">
                      {stage.count} FDRs
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Active Stage Detail Card */}
          <div className="mt-3 p-3.5 bg-[#F8FAFC] rounded-lg border border-[#E2E8F0] space-y-2 text-xs">
            <div className="flex items-start justify-between gap-2">
              <div>
                <h4 className="font-bold text-slate-900 text-xs">
                  {currentStage.title}
                </h4>
                <p className="text-[11px] text-slate-500 mt-0.5">
                  Phase Milestone: <strong>{currentStage.date}</strong> • {currentStage.count} instruments currently at this milestone
                </p>
              </div>
              <span
                className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase ${
                  currentStage.state === "completed"
                    ? "bg-emerald-100 text-emerald-800"
                    : currentStage.state === "active"
                    ? "bg-amber-100 text-amber-800"
                    : "bg-slate-200 text-slate-700"
                }`}
              >
                {currentStage.state}
              </span>
            </div>

            <div className="text-[11px] text-slate-600 bg-white p-2 rounded border border-slate-200 space-y-1">
              <div>
                <strong className="text-slate-800">Statutory Evidence:</strong>{" "}
                <span>{currentStage.evidence}</span>
              </div>
              <div>
                <strong className="text-slate-800">Signatory / Bureau Desk:</strong>{" "}
                <span>{currentStage.officer}</span>
              </div>
              <div>
                <strong className="text-slate-800">Regulatory Directive:</strong>{" "}
                <span>{currentStage.remarks}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Stepper Footer Action */}
        <div className="pt-3 border-t border-[#E2E8F0] flex items-center justify-between text-xs">
          <span className="text-slate-500 text-[11px]">
            Action Gate: <strong>{currentStage.nextAction}</strong>
          </span>
          <button
            onClick={onOpenLifecycleAction}
            className="text-xs font-bold text-[#0B2545] hover:underline flex items-center gap-1 cursor-pointer"
          >
            <span>Review Statutory Action</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
