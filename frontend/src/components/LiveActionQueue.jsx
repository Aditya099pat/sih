import { useState, useMemo } from "react";
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
  FileSignature,
  ChevronLeft
} from "lucide-react";
import { FORMAT_INDIAN_CURRENCY, FORMAT_COMPACT_CURRENCY } from "@data/mockData";

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
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5;

  // Dynamically derive prioritized action cases from all instruments
  const actionItems = useMemo(() => {
    // Collect all candidates needing attention
    const candidates = instruments.filter(
      (inst) =>
        inst.hasDiscrepancy ||
        inst.remainingDays <= 60 ||
        !inst.bankConfirmed ||
        inst.phaseReleaseEligible
    );

    // Sort by urgency:
    // 1. Critical maturity <= 15 days
    // 2. Discrepancy flagged
    // 3. Maturing 16 - 60 days
    // 4. Pending bank confirmation
    // 5. Release ready
    candidates.sort((a, b) => {
      const getScore = (item) => {
        if (item.remainingDays <= 15) return 1;
        if (item.hasDiscrepancy) return 2;
        if (item.remainingDays <= 45) return 3;
        if (item.phaseReleaseEligible) return 4;
        if (!item.bankConfirmed) return 5;
        return 6;
      };
      return getScore(a) - getScore(b);
    });

    return candidates.map((inst, idx) => {
      let priority = "normal";
      let priorityLabel = "REVIEW REQUIRED";
      let priorityColor = "bg-blue-100 text-[#0B2545] border-blue-200";
      let nextAction = "Inspect Compliance File";
      let actionIcon = <Eye className="w-3.5 h-3.5" />;
      let actionButtonClass = "bg-[#0B2545] hover:bg-[#133E87] text-white";
      let onExecute = () => onViewInstrument && onViewInstrument(inst);

      if (inst.hasDiscrepancy) {
        priority = "discrepancy";
        priorityLabel = "OCR DISCREPANCY FLAGGED";
        priorityColor = "bg-rose-100 text-rose-900 border-rose-300";
        nextAction = "Open Dual-Track Scrutiny";
        actionIcon = <Eye className="w-3.5 h-3.5" />;
        actionButtonClass = "bg-rose-600 hover:bg-rose-700 text-white";
        onExecute = () => onOpenScrutiny ? onOpenScrutiny(inst.id) : (onSelectTab && onSelectTab("scrutiny"));
      } else if (inst.remainingDays <= 45) {
        priority = "urgent";
        priorityLabel = `T-${inst.remainingDays} MATURITY ALERT`;
        priorityColor = inst.remainingDays <= 15 ? "bg-red-100 text-red-900 border-red-400 font-bold" : "bg-amber-100 text-amber-900 border-amber-300";
        nextAction = "Prepare Affidavit-6 Renewal";
        actionIcon = <FileSignature className="w-3.5 h-3.5" />;
        actionButtonClass = "bg-amber-600 hover:bg-amber-700 text-white";
        onExecute = () => onOpenAffidavit ? onOpenAffidavit(inst) : (onSelectTab && onSelectTab("affidavits"));
      } else if (inst.phaseReleaseEligible || inst.remainingDays <= 60) {
        priority = "release";
        priorityLabel = "PHASE-5 RELEASE READY";
        priorityColor = "bg-emerald-100 text-emerald-900 border-emerald-300";
        nextAction = "Initiate Phase-5 Discharge";
        actionIcon = <RotateCcw className="w-3.5 h-3.5" />;
        actionButtonClass = "bg-emerald-600 hover:bg-emerald-700 text-white";
        onExecute = () => onOpenPhaseRelease ? onOpenPhaseRelease(inst) : (onSelectTab && onSelectTab("rpgf"));
      } else if (!inst.bankConfirmed) {
        priority = "pending";
        priorityLabel = "CBS PENDING MATCH";
        priorityColor = "bg-sky-100 text-sky-900 border-sky-300";
        nextAction = "Trigger SFMS MT799 Ping";
        actionIcon = <Radio className="w-3.5 h-3.5" />;
        actionButtonClass = "bg-[#0B2545] hover:bg-[#133E87] text-white";
        onExecute = () => onTriggerSfmsPing ? onTriggerSfmsPing() : (onSelectTab && onSelectTab("sfms"));
      }

      const officers = [
        "Sh. V. K. Nambiar (ADG Scrutiny)",
        "Dr. Rameshwar V. Rao (Regional Director)",
        "Bank Auditor (Core Banking Desk)",
        "Senior Scrutiny Officer (Approval Bureau)",
        "Central Vigilance Liaison Officer"
      ];

      return {
        id: `action-${inst.id}`,
        instrumentId: inst.id,
        ref: inst.ref,
        institutionName: inst.instituteName,
        instituteCode: inst.instituteCode,
        amount: inst.principalAmount,
        maturityDate: inst.maturityDate,
        remainingDays: inst.remainingDays,
        priority,
        priorityLabel,
        priorityColor,
        verificationStatus: inst.bankConfirmed ? "Bank API Verified" : inst.hasDiscrepancy ? "Discrepancy Flagged" : "Pending Bank Match",
        verificationType: inst.bankConfirmed ? "verified" : inst.hasDiscrepancy ? "discrepancy" : "pending",
        assignedOfficer: officers[idx % officers.length],
        nextAction,
        actionIcon,
        actionButtonClass,
        onExecute,
        inst
      };
    });
  }, [instruments, onViewInstrument, onOpenScrutiny, onOpenPhaseRelease, onOpenAffidavit, onTriggerSfmsPing, onSelectTab]);

  // Filter queue items
  const filteredActionItems = useMemo(() => {
    return actionItems.filter((item) => {
      if (filterPriority === "urgent" && item.priority !== "urgent") return false;
      if (filterPriority === "discrepancy" && item.priority !== "discrepancy") return false;
      if (filterPriority === "pending" && item.priority !== "pending") return false;
      if (filterPriority === "release" && item.priority !== "release") return false;

      if (queueSearch.trim()) {
        const q = queueSearch.toLowerCase().trim();
        return (
          item.ref.toLowerCase().includes(q) ||
          item.institutionName.toLowerCase().includes(q) ||
          item.instituteCode.toLowerCase().includes(q) ||
          item.assignedOfficer.toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [actionItems, filterPriority, queueSearch]);

  const totalPages = Math.max(1, Math.ceil(filteredActionItems.length / pageSize));
  const safePage = Math.min(Math.max(1, currentPage), totalPages);
  const paginatedItems = filteredActionItems.slice((safePage - 1) * pageSize, safePage * pageSize);

  const urgentCount = actionItems.filter((i) => i.priority === "urgent").length;
  const discrepancyCount = actionItems.filter((i) => i.priority === "discrepancy").length;
  const pendingCount = actionItems.filter((i) => i.priority === "pending").length;
  const releaseCount = actionItems.filter((i) => i.priority === "release").length;

  return (
    <div className="card-clean rounded-lg bg-white border border-[#E2E8F0] overflow-hidden shadow-2xs">
      {/* Header */}
      <div className="p-3.5 border-b border-[#E2E8F0] flex flex-col md:flex-row md:items-center justify-between gap-3 bg-white">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-md bg-amber-500/10 text-[#D97706] flex items-center justify-center font-bold">
            <AlertTriangle className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-2">
              <span>National Live Priority Action Queue</span>
              <span className="bg-amber-100 text-amber-900 border border-amber-300 text-[10px] px-2 py-0.2 rounded-full font-bold">
                {actionItems.length} Cases Requiring Scrutiny
              </span>
            </h2>
            <p className="text-[11px] text-slate-500">
              Prescriptive regulatory dispatch engine guiding bureau officials on immediate statutory milestones.
            </p>
          </div>
        </div>

        {/* Search & Priority Filter Pills */}
        <div className="flex items-center gap-2 flex-wrap">
          {/* Queue Search */}
          <div className="relative min-w-[190px]">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
            <input
              type="text"
              placeholder="Search action cases..."
              value={queueSearch}
              onChange={(e) => {
                setQueueSearch(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full pl-8 pr-3 py-1 text-xs bg-[#F8FAFC] border border-[#E2E8F0] rounded-md focus:outline-none focus:bg-white text-[#0F172A]"
            />
          </div>

          {/* Filter Pills */}
          <div className="inline-flex rounded-md border border-[#E2E8F0] bg-[#F8FAFC] p-0.5 text-xs">
            <button
              onClick={() => {
                setFilterPriority("all");
                setCurrentPage(1);
              }}
              className={`px-2 py-0.5 text-[11px] font-semibold rounded cursor-pointer ${
                filterPriority === "all" ? "bg-white text-[#0B2545] font-bold shadow-2xs" : "text-slate-600 hover:text-slate-900"
              }`}
            >
              All ({actionItems.length})
            </button>
            <button
              onClick={() => {
                setFilterPriority("urgent");
                setCurrentPage(1);
              }}
              className={`px-2 py-0.5 text-[11px] font-semibold rounded cursor-pointer flex items-center gap-1 ${
                filterPriority === "urgent" ? "bg-white text-amber-900 font-bold shadow-2xs" : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <span>Maturing</span>
              <span className="text-[9px] px-1 rounded-full bg-amber-100">{urgentCount}</span>
            </button>
            <button
              onClick={() => {
                setFilterPriority("discrepancy");
                setCurrentPage(1);
              }}
              className={`px-2 py-0.5 text-[11px] font-semibold rounded cursor-pointer flex items-center gap-1 ${
                filterPriority === "discrepancy" ? "bg-white text-rose-900 font-bold shadow-2xs" : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <span>Discrepancy</span>
              <span className="text-[9px] px-1 rounded-full bg-rose-100">{discrepancyCount}</span>
            </button>
            <button
              onClick={() => {
                setFilterPriority("release");
                setCurrentPage(1);
              }}
              className={`px-2 py-0.5 text-[11px] font-semibold rounded cursor-pointer flex items-center gap-1 ${
                filterPriority === "release" ? "bg-white text-emerald-900 font-bold shadow-2xs" : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <span>Release</span>
              <span className="text-[9px] px-1 rounded-full bg-emerald-100">{releaseCount}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Action Queue List */}
      <div className="divide-y divide-[#E2E8F0]">
        {paginatedItems.length === 0 ? (
          <div className="py-8 text-center text-slate-500 text-xs">
            No pending action items matching the current filter.
          </div>
        ) : (
          paginatedItems.map((item) => (
            <div
              key={item.id}
              className="p-3.5 hover:bg-[#F8FAFC] transition-colors flex flex-col md:flex-row md:items-center justify-between gap-3"
            >
              {/* Left Column: Priority Tag, Institution & Instrument */}
              <div className="space-y-1 flex-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded border uppercase tracking-wider ${item.priorityColor}`}
                  >
                    {item.priorityLabel}
                  </span>
                  <span className="font-mono font-bold text-xs text-[#0B2545]">{item.ref}</span>
                  <span className="text-slate-300">•</span>
                  <span className="text-xs font-semibold text-slate-800 truncate max-w-[240px]">
                    {item.institutionName}
                  </span>
                  <span className="text-[11px] font-mono text-slate-500">({item.instituteCode})</span>
                </div>

                <div className="flex items-center gap-3 text-xs text-slate-500 flex-wrap">
                  <span>
                    Pledged Capital:{" "}
                    <strong className="text-slate-800 font-mono">
                      {FORMAT_INDIAN_CURRENCY(item.amount)}
                    </strong>
                  </span>
                  <span className="text-slate-300">•</span>
                  <span>Matures: {item.maturityDate}</span>
                  <span className="text-slate-300">•</span>
                  <span className="text-slate-600 font-medium">Assigned Officer: {item.assignedOfficer}</span>
                </div>
              </div>

              {/* Right Column: Next Action Execution */}
              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={item.onExecute}
                  className={`px-3 py-1.5 rounded-md text-xs font-bold transition-colors flex items-center gap-1.5 cursor-pointer shadow-2xs ${item.actionButtonClass}`}
                >
                  {item.actionIcon}
                  <span>{item.nextAction}</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Queue Footer & Pagination */}
      <div className="p-2.5 bg-[#F8FAFC] border-t border-[#E2E8F0] flex items-center justify-between text-xs text-slate-500">
        <div>
          Showing {(safePage - 1) * pageSize + 1} to{" "}
          {Math.min(safePage * pageSize, filteredActionItems.length)} of{" "}
          <strong>{filteredActionItems.length}</strong> prioritized queue items
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={safePage === 1}
            className="p-1 rounded border border-[#E2E8F0] bg-white text-slate-600 hover:bg-slate-50 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
          >
            <ChevronLeft className="w-3.5 h-3.5" />
          </button>
          <span className="font-mono font-semibold">
            {safePage} / {totalPages}
          </span>
          <button
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={safePage === totalPages}
            className="p-1 rounded border border-[#E2E8F0] bg-white text-slate-600 hover:bg-slate-50 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
          >
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
