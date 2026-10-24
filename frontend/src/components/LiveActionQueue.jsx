import { useState } from "react";
import {
  AlertTriangle,
  Clock,
  ShieldAlert,
  RotateCcw,
  Eye,
  CheckCircle2,
  ArrowRight,
  Search,
  Filter,
  UserCheck,
  Building,
  Landmark,
  ChevronRight,
  Radio,
  FileSignature
} from "lucide-react";
import { FORMAT_INDIAN_CURRENCY } from "@data/mockData";

export const LiveActionQueue = ({
  instruments = [],
  onViewInstrument,
  onOpenScrutiny,
  onOpenPhaseRelease,
  onOpenAffidavit,
  onTriggerSfmsPing,
  onSelectTab
}) => {
  const [filterPriority, setFilterPriority] = useState("all");
  const [queueSearch, setQueueSearch] = useState("");
  const [page, setPage] = useState(1);
  const pageSize = 5;

  // Curated Action Queue items specifically informing officials what to work on next
  const actionItems = [
    {
      id: "action-1",
      instrumentId: "fdr-1",
      ref: "FDR-SBIN-2018-09",
      institutionName: "Bharati Vidya Sansthan",
      instituteCode: "1-1029384",
      amount: 3500000,
      maturityDate: "15 Dec 2026",
      remainingDays: 42,
      priority: "urgent",
      priorityLabel: "T-42 MATURITY ALERT",
      priorityColor: "bg-amber-100 text-amber-900 border-amber-300",
      verificationStatus: "Bank API Verified",
      verificationType: "verified",
      assignedOfficer: "Sh. V. K. Nambiar (ADG Scrutiny)",
      nextAction: "Prepare Affidavit-6 Renewal",
      actionIcon: <FileSignature className="w-3.5 h-3.5" />,
      actionButtonClass: "bg-amber-600 hover:bg-amber-700 text-white",
      onExecute: () => onOpenAffidavit && onOpenAffidavit(instruments[0])
    },
    {
      id: "action-2",
      instrumentId: "fdr-4",
      ref: "FDR-CNRB-2022-07",
      institutionName: "Somaiya Institute of Management",
      instituteCode: "1-2049182",
      amount: 1500000,
      maturityDate: "10 Jan 2027",
      remainingDays: 68,
      priority: "discrepancy",
      priorityLabel: "OCR TEXT MISMATCH",
      priorityColor: "bg-rose-100 text-rose-900 border-rose-300",
      verificationStatus: "Discrepancy Flagged",
      verificationType: "discrepancy",
      assignedOfficer: "Dr. Rameshwar V. Rao (Regional Director)",
      nextAction: "Open Dual-Track Scrutiny",
      actionIcon: <Eye className="w-3.5 h-3.5" />,
      actionButtonClass: "bg-rose-600 hover:bg-rose-700 text-white",
      onExecute: () => onOpenScrutiny ? onOpenScrutiny("fdr-4") : onSelectTab("scrutiny")
    },
    {
      id: "action-3",
      instrumentId: "fdr-3",
      ref: "FDR-BOB-2023-11",
      institutionName: "K. J. Somaiya College of Engineering",
      instituteCode: "1-4491028",
      amount: 2500000,
      maturityDate: "05 Mar 2027",
      remainingDays: 122,
      priority: "pending",
      priorityLabel: "CBS PENDING",
      priorityColor: "bg-sky-100 text-sky-900 border-sky-300",
      verificationStatus: "Pending Bank Confirmation",
      verificationType: "pending",
      assignedOfficer: "Bank Auditor (BOB Desk)",
      nextAction: "Trigger SFMS MT799 Ping",
      actionIcon: <Radio className="w-3.5 h-3.5" />,
      actionButtonClass: "bg-[#0B2545] hover:bg-[#133E87] text-white",
      onExecute: () => onTriggerSfmsPing ? onTriggerSfmsPing() : onSelectTab("sfms")
    },
    {
      id: "action-4",
      instrumentId: "fdr-2",
      ref: "FDR-PNB-2018-03",
      institutionName: "D. Y. Patil Technical Campus",
      instituteCode: "1-3829104",
      amount: 5000000,
      maturityDate: "20 Nov 2026",
      remainingDays: 17,
      priority: "release",
      priorityLabel: "PHASE-5 ELIGIBLE",
      priorityColor: "bg-emerald-100 text-emerald-900 border-emerald-300",
      verificationStatus: "All Bureau Gates Passed",
      verificationType: "verified",
      assignedOfficer: "Dr. Rameshwar V. Rao (WRO RO)",
      nextAction: "Authorize Phase-5 Release",
      actionIcon: <RotateCcw className="w-3.5 h-3.5" />,
      actionButtonClass: "bg-[#059669] hover:bg-emerald-700 text-white",
      onExecute: () => onOpenPhaseRelease && onOpenPhaseRelease()
    },
    {
      id: "action-5",
      instrumentId: "fdr-5",
      ref: "FDR-SBI-2020-04",
      institutionName: "Veermata Jijabai Technological Institute",
      instituteCode: "1-9920194",
      amount: 3500000,
      maturityDate: "14 Aug 2028",
      remainingDays: 650,
      priority: "compliant",
      priorityLabel: "COMPLIANT IN-FORCE",
      priorityColor: "bg-slate-100 text-slate-800 border-slate-300",
      verificationStatus: "Active Lien Locked",
      verificationType: "verified",
      assignedOfficer: "Central Treasury Desk",
      nextAction: "View Certified Transcript",
      actionIcon: <CheckCircle2 className="w-3.5 h-3.5" />,
      actionButtonClass: "bg-slate-700 hover:bg-slate-800 text-white",
      onExecute: () => onViewInstrument && onViewInstrument(instruments[4] || instruments[0])
    }
  ];

  // Filtering
  const filteredQueue = actionItems.filter((item) => {
    if (filterPriority === "urgent" && item.priority !== "urgent") return false;
    if (filterPriority === "discrepancy" && item.priority !== "discrepancy") return false;
    if (filterPriority === "pending" && item.priority !== "pending") return false;
    if (filterPriority === "release" && item.priority !== "release") return false;

    if (queueSearch.trim()) {
      const q = queueSearch.toLowerCase();
      const match =
        item.ref.toLowerCase().includes(q) ||
        item.institutionName.toLowerCase().includes(q) ||
        item.instituteCode.toLowerCase().includes(q) ||
        item.assignedOfficer.toLowerCase().includes(q) ||
        item.nextAction.toLowerCase().includes(q);
      if (!match) return false;
    }
    return true;
  });

  return (
    <div className="card-clean rounded-lg bg-white border border-[#E2E8F0] overflow-hidden shadow-none">
      {/* Header Bar */}
      <div className="p-4 border-b border-[#E2E8F0] flex flex-col md:flex-row md:items-center justify-between gap-3 bg-white">
        <div className="space-y-0.5">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
            <h2 className="text-sm font-bold uppercase tracking-wider text-slate-800">
              Live Priority Action Queue
            </h2>
            <span className="bg-rose-50 text-rose-800 border border-rose-200 text-[10px] font-bold px-2 py-0.5 rounded-full font-mono">
              {filteredQueue.length} TASKS REQUIRING ACTION
            </span>
          </div>
          <p className="text-xs text-slate-500">
            Immediate statutory tasks sorted by regulatory deadline, discrepancy risk, and officer jurisdiction.
          </p>
        </div>

        {/* Filter Pills & Search */}
        <div className="flex items-center gap-2 flex-wrap">
          {/* Quick Search */}
          <div className="relative min-w-[200px]">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
            <input
              type="text"
              placeholder="Search queue tasks..."
              value={queueSearch}
              onChange={(e) => setQueueSearch(e.target.value)}
              className="w-full pl-8 pr-3 py-1.5 text-xs bg-[#F8FAFC] border border-[#E2E8F0] rounded-md focus:outline-none focus:border-[#0B2545] text-slate-900"
            />
          </div>

          {/* Quick Category Pills */}
          <div className="inline-flex rounded-md border border-[#E2E8F0] bg-[#F8FAFC] p-0.5 text-xs">
            <button
              onClick={() => setFilterPriority("all")}
              className={`px-2.5 py-1 font-semibold rounded transition-colors cursor-pointer ${
                filterPriority === "all" ? "bg-white text-[#0B2545] shadow-2xs font-bold" : "text-slate-600 hover:text-slate-900"
              }`}
            >
              All ({actionItems.length})
            </button>
            <button
              onClick={() => setFilterPriority("urgent")}
              className={`px-2.5 py-1 font-semibold rounded transition-colors cursor-pointer flex items-center gap-1 ${
                filterPriority === "urgent" ? "bg-white text-amber-900 shadow-2xs font-bold" : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <Clock className="w-3 h-3 text-amber-600" />
              Deadlines (1)
            </button>
            <button
              onClick={() => setFilterPriority("discrepancy")}
              className={`px-2.5 py-1 font-semibold rounded transition-colors cursor-pointer flex items-center gap-1 ${
                filterPriority === "discrepancy" ? "bg-white text-rose-900 shadow-2xs font-bold" : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <AlertTriangle className="w-3 h-3 text-rose-600" />
              Discrepancies (1)
            </button>
            <button
              onClick={() => setFilterPriority("release")}
              className={`px-2.5 py-1 font-semibold rounded transition-colors cursor-pointer flex items-center gap-1 ${
                filterPriority === "release" ? "bg-white text-emerald-900 shadow-2xs font-bold" : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <CheckCircle2 className="w-3 h-3 text-emerald-600" />
              Release Ready (1)
            </button>
          </div>
        </div>
      </div>

      {/* High-Density Action Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="bg-slate-50 text-slate-700 font-bold uppercase tracking-wider border-b border-slate-200 text-[10px]">
              <th className="py-2.5 px-3">Priority / State</th>
              <th className="py-2.5 px-3">Instrument &amp; Institution</th>
              <th className="py-2.5 px-3 text-right">Pledged Capital</th>
              <th className="py-2.5 px-3">Statutory Deadline</th>
              <th className="py-2.5 px-3">Verification Telemetry</th>
              <th className="py-2.5 px-3">Jurisdiction Officer</th>
              <th className="py-2.5 px-3 text-right">Recommended Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
            {filteredQueue.map((item) => (
              <tr
                key={item.id}
                className="hover:bg-slate-50/80 transition-colors"
              >
                {/* Priority Badge */}
                <td className="py-3 px-3">
                  <span
                    className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold border font-mono ${item.priorityColor}`}
                  >
                    {item.priorityLabel}
                  </span>
                </td>

                {/* Instrument & Institution */}
                <td className="py-3 px-3">
                  <div className="font-mono font-bold text-[#0B2545]">
                    {item.ref}
                  </div>
                  <div className="text-slate-700 font-medium truncate max-w-[200px]">
                    {item.institutionName}
                  </div>
                  <div className="text-[10px] font-mono text-slate-400">
                    PID: {item.instituteCode}
                  </div>
                </td>

                {/* Pledged Capital */}
                <td className="py-3 px-3 text-right font-mono font-bold text-slate-900">
                  {FORMAT_INDIAN_CURRENCY(item.amount)}
                </td>

                {/* Target Maturity */}
                <td className="py-3 px-3">
                  <div className="font-mono text-slate-800">
                    {item.maturityDate}
                  </div>
                  <div
                    className={`text-[11px] font-semibold ${
                      item.remainingDays <= 45 ? "text-amber-800" : "text-slate-500"
                    }`}
                  >
                    {item.remainingDays <= 45 ? `⚠️ ${item.remainingDays}d lead remaining` : `${item.remainingDays} days`}
                  </div>
                </td>

                {/* Verification Status */}
                <td className="py-3 px-3">
                  {item.verificationType === "verified" ? (
                    <span className="badge-bank-verified text-[10px] font-bold px-2 py-0.5 rounded-full inline-flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#059669]" />
                      {item.verificationStatus}
                    </span>
                  ) : item.verificationType === "discrepancy" ? (
                    <span className="badge-discrepancy text-[10px] font-bold px-2 py-0.5 rounded-full inline-flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#DC2626]" />
                      {item.verificationStatus}
                    </span>
                  ) : (
                    <span className="bg-sky-50 text-sky-800 border border-sky-200 text-[10px] font-bold px-2 py-0.5 rounded-full inline-flex items-center gap-1">
                      <Clock className="w-2.5 h-2.5 text-sky-600" />
                      {item.verificationStatus}
                    </span>
                  )}
                </td>

                {/* Assigned Officer */}
                <td className="py-3 px-3">
                  <div className="flex items-center gap-1.5 text-slate-800 font-medium">
                    <UserCheck className="w-3.5 h-3.5 text-slate-500" />
                    <span>{item.assignedOfficer}</span>
                  </div>
                </td>

                {/* Recommended Next Action (Direct 1-Click Trigger) */}
                <td className="py-3 px-3 text-right">
                  <button
                    onClick={item.onExecute}
                    className={`px-3 py-1.5 text-xs font-bold rounded-md transition-all flex items-center gap-1.5 ml-auto cursor-pointer shadow-xs ${item.actionButtonClass}`}
                  >
                    {item.actionIcon}
                    <span>{item.nextAction}</span>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Queue Footer */}
      <div className="p-3 border-t border-[#E2E8F0] bg-[#F8FAFC] flex items-center justify-between text-xs text-slate-500">
        <div>
          Showing <strong>{filteredQueue.length}</strong> prioritized workflow items across WRO jurisdiction
        </div>
        <div className="flex items-center gap-1 text-[11px] text-[#0B2545] font-semibold">
          <span>Priority Algorithm: Real-Time Regulatory Gate Synchronization</span>
        </div>
      </div>
    </div>
  );
};
