import { useState, useMemo } from "react";
import { 
  RotateCcw, 
  Clock, 
  AlertTriangle, 
  ArrowRight, 
  Search, 
  ChevronLeft, 
  ChevronRight, 
  CheckCircle2, 
  Building 
} from "lucide-react";
import { FORMAT_INDIAN_CURRENCY, FORMAT_COMPACT_CURRENCY } from "@data/mockData";

export const RpgfTrackerView = ({
  instruments = [],
  onInitiateRelease
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 8;

  // Dynamic statistics
  const totalSecurityCapital = useMemo(() => {
    return instruments.reduce((sum, i) => sum + (i.principalAmount || 0), 0);
  }, [instruments]);

  const releaseEligibleList = useMemo(() => {
    return instruments.filter((i) => (i.phaseReleaseEligible || i.remainingDays <= 60) && i.bankConfirmed);
  }, [instruments]);

  const releaseEligibleAmount = useMemo(() => {
    return releaseEligibleList.reduce((sum, i) => sum + (i.principalAmount || 0), 0);
  }, [releaseEligibleList]);

  // Filter instruments
  const filteredInstruments = useMemo(() => {
    return instruments.filter((inst) => {
      if (statusFilter === "release" && !(inst.phaseReleaseEligible || inst.remainingDays <= 60)) return false;
      if (statusFilter === "maturing" && inst.remainingDays > 90) return false;
      if (statusFilter === "active" && inst.remainingDays <= 90) return false;

      if (searchTerm.trim()) {
        const q = searchTerm.toLowerCase().trim();
        return (
          inst.ref.toLowerCase().includes(q) ||
          inst.instituteName.toLowerCase().includes(q) ||
          inst.instituteCode.toLowerCase().includes(q) ||
          inst.discipline.toLowerCase().includes(q) ||
          inst.bankName.toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [instruments, statusFilter, searchTerm]);

  const totalPages = Math.max(1, Math.ceil(filteredInstruments.length / pageSize));
  const safePage = Math.min(Math.max(1, currentPage), totalPages);
  const paginatedInstruments = filteredInstruments.slice((safePage - 1) * pageSize, safePage * pageSize);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-[#002546] text-amber-400">
              <RotateCcw className="w-5 h-5" />
            </span>
            <h1 className="text-xl font-bold text-slate-900">
              RPGF &amp; Phase-5 Release Lifecycle Tracker
            </h1>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Refundable Performance Guaranty Fund • 8-Year Statutory Lock-in Lifecycle &amp; Phased Settlement ({instruments.length.toLocaleString('en-IN')} Instruments)
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-amber-50 text-amber-800 border border-amber-200 flex items-center gap-1">
            <Clock className="w-3.5 h-3.5" />
            <span>{releaseEligibleList.length} Due for Phase-5 Settlement</span>
          </span>
        </div>
      </div>

      {/* Dynamic Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
          <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
            Total National Security Capital
          </span>
          <div className="text-xl font-extrabold text-slate-900 mt-1 font-mono">
            {FORMAT_COMPACT_CURRENCY(totalSecurityCapital)}
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            {instruments.length.toLocaleString('en-IN')} Active Program Instruments
          </p>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
          <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
            Eligible for Phase-5 Release
          </span>
          <div className="text-xl font-extrabold text-amber-700 mt-1 font-mono">
            {FORMAT_COMPACT_CURRENCY(releaseEligibleAmount)}
          </div>
          <p className="text-xs text-amber-800 font-medium mt-0.5">
            {releaseEligibleList.length} Instruments Cleared for Settlement
          </p>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
          <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
            Student Protection Reserve
          </span>
          <div className="text-xl font-extrabold text-emerald-700 mt-1 font-mono">
            100% Protected
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Indemnity &amp; Capitation Guarantee Intact
          </p>
        </div>
      </div>

      {/* Toolbar: Search & Status Filters */}
      <div className="card-clean rounded-xl border border-slate-200 bg-white p-4 shadow-2xs space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">
              Filter Lifecycle Timelines:
            </span>

            <div className="inline-flex rounded-md border border-slate-200 bg-slate-50 p-0.5 text-xs">
              <button
                onClick={() => {
                  setStatusFilter("all");
                  setCurrentPage(1);
                }}
                className={`px-2.5 py-1 font-semibold rounded cursor-pointer ${
                  statusFilter === "all" ? "bg-white text-[#0B2545] font-bold shadow-2xs" : "text-slate-600 hover:text-slate-900"
                }`}
              >
                All ({instruments.length})
              </button>
              <button
                onClick={() => {
                  setStatusFilter("release");
                  setCurrentPage(1);
                }}
                className={`px-2.5 py-1 font-semibold rounded cursor-pointer flex items-center gap-1 ${
                  statusFilter === "release" ? "bg-white text-emerald-800 font-bold shadow-2xs" : "text-slate-600 hover:text-slate-900"
                }`}
              >
                <span>Release Ready</span>
                <span className="text-[9px] px-1 rounded-full bg-emerald-100">{releaseEligibleList.length}</span>
              </button>
              <button
                onClick={() => {
                  setStatusFilter("maturing");
                  setCurrentPage(1);
                }}
                className={`px-2.5 py-1 font-semibold rounded cursor-pointer ${
                  statusFilter === "maturing" ? "bg-white text-amber-900 font-bold shadow-2xs" : "text-slate-600 hover:text-slate-900"
                }`}
              >
                Maturing &lt; 90d
              </button>
              <button
                onClick={() => {
                  setStatusFilter("active");
                  setCurrentPage(1);
                }}
                className={`px-2.5 py-1 font-semibold rounded cursor-pointer ${
                  statusFilter === "active" ? "bg-white text-[#0B2545] font-bold shadow-2xs" : "text-slate-600 hover:text-slate-900"
                }`}
              >
                In Lock-in (&gt;90d)
              </button>
            </div>
          </div>

          <div className="relative w-full sm:w-64">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search timelines..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full bg-[#F8FAFC] border border-slate-200 rounded-md pl-8 pr-3 py-1.5 text-xs focus:outline-none focus:border-[#0D3B66]"
            />
          </div>
        </div>
      </div>

      {/* 8-Year Timeline Cards for Each Instrument (Paginated) */}
      <div className="space-y-4">
        <div className="flex items-center justify-between text-xs text-slate-500">
          <span className="font-bold text-slate-700 uppercase tracking-wider">
            Multi-Year Maturity Timelines &amp; Progression ({filteredInstruments.length.toLocaleString('en-IN')})
          </span>
          <span>
            Page {safePage} of {totalPages}
          </span>
        </div>

        {paginatedInstruments.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-xl border border-slate-200 text-xs text-slate-500">
            No instruments found matching the criteria.
          </div>
        ) : (
          paginatedInstruments.map((inst) => {
            const isMaturingSoon = inst.remainingDays <= 90;
            const isEligible = inst.phaseReleaseEligible || inst.remainingDays <= 60;
            const totalYears = 8;
            const yearsCompleted = Math.min(8, Math.max(1, Math.round(8 - (inst.remainingDays / 365))));
            const progressPct = Math.min(100, Math.round((yearsCompleted / totalYears) * 100));

            return (
              <div
                key={inst.id}
                className={`bg-white rounded-xl border p-5 shadow-2xs space-y-4 transition-all ${
                  isEligible
                    ? "border-emerald-300 ring-1 ring-emerald-200"
                    : isMaturingSoon
                    ? "border-amber-300 ring-1 ring-amber-200"
                    : "border-slate-200"
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-bold text-sm text-slate-900">{inst.ref}</span>
                      <span
                        className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                          isEligible
                            ? "bg-emerald-100 text-emerald-800"
                            : isMaturingSoon
                            ? "bg-amber-100 text-amber-800"
                            : "bg-blue-100 text-[#0B2545]"
                        }`}
                      >
                        {inst.statutoryStatus}
                      </span>
                      {inst.region && (
                        <span className="text-[9px] bg-slate-100 text-slate-600 px-1.5 py-0.2 rounded font-mono font-bold border border-slate-200">
                          {inst.region}
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-slate-800 font-semibold">{inst.instituteName} (PID: {inst.instituteCode})</p>
                    <p className="text-[11px] text-slate-500">{inst.discipline} • {inst.bankName} ({inst.branchName})</p>
                  </div>

                  <div className="text-right shrink-0">
                    <span className="text-[11px] text-slate-400 block">Principal + Yield</span>
                    <span className="text-base font-bold font-mono text-slate-900">
                      {FORMAT_INDIAN_CURRENCY(inst.principalAmount + inst.accruedInterest)}
                    </span>
                    <span className="text-[11px] text-emerald-700 block font-mono">
                      Yield: +{FORMAT_INDIAN_CURRENCY(inst.accruedInterest)}
                    </span>
                  </div>
                </div>

                {/* Progress Milestones (Year 1 to Year 8) */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between text-[11px] text-slate-500">
                    <span>Issued: {inst.issueDate}</span>
                    <span className="font-bold text-slate-800">
                      Progress: {yearsCompleted} / {totalYears} Years Locked ({progressPct}%)
                    </span>
                    <span>Maturity: {inst.maturityDate} ({inst.remainingDays}d left)</span>
                  </div>

                  {/* Progress Bar */}
                  <div className="w-full h-2.5 rounded-full bg-slate-100 overflow-hidden border border-slate-200">
                    <div
                      className={`h-full transition-all duration-300 rounded-full ${
                        isEligible
                          ? "bg-emerald-600"
                          : isMaturingSoon
                          ? "bg-amber-500"
                          : "bg-[#0B2545]"
                      }`}
                      style={{ width: `${progressPct}%` }}
                    />
                  </div>
                </div>

                {/* Footer Action */}
                <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                  <span className="text-slate-500 text-[11px]">
                    Lien Beneficiary: <strong>{inst.jointLienWith}</strong>
                  </span>

                  {isEligible ? (
                    <button
                      onClick={() => onInitiateRelease && onInitiateRelease(inst)}
                      className="px-3 py-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded text-xs font-bold transition-colors flex items-center gap-1 cursor-pointer shadow-2xs"
                    >
                      <span>Initiate Phase-5 Discharge</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  ) : (
                    <span className="text-slate-400 font-mono text-[11px]">
                      Mandatory lock-in in effect
                    </span>
                  )}
                </div>
              </div>
            );
          })
        )}

        {/* Pagination Controls */}
        <div className="p-3 bg-white rounded-xl border border-slate-200 flex items-center justify-between text-xs text-slate-500">
          <div>
            Showing {(safePage - 1) * pageSize + 1} to{" "}
            {Math.min(safePage * pageSize, filteredInstruments.length)} of{" "}
            <strong>{filteredInstruments.length.toLocaleString('en-IN')}</strong> timeline milestones
          </div>

          <div className="flex items-center gap-1.5">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={safePage === 1}
              className="p-1 rounded border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
            </button>
            <span className="font-mono font-semibold">
              {safePage} / {totalPages}
            </span>
            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={safePage === totalPages}
              className="p-1 rounded border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
            >
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
