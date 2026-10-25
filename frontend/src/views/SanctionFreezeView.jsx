import { useState, useEffect, useMemo } from "react";
import {
  ShieldAlert,
  ShieldCheck,
  Lock,
  Unlock,
  Scale,
  GraduationCap,
  Building,
  RefreshCw,
  ExternalLink,
  Ban,
  CheckCircle2,
  AlertTriangle,
  Clock,
  ArrowRight,
  FileCheck,
  FileText,
  Search,
  Filter,
  X,
  ChevronDown
} from "lucide-react";
import { FORMAT_INDIAN_CURRENCY, FORMAT_COMPACT_CURRENCY } from "@data/mockData";

export const SanctionFreezeView = ({ onNavigateToRpgf }) => {
  const [sanctions, setSanctions] = useState(null);
  const [institutionsList, setInstitutionsList] = useState([]);
  const [selectedInstituteCode, setSelectedInstituteCode] = useState("1-1029384");
  const [loading, setLoading] = useState(true);
  const [toggling, setToggling] = useState(false);
  const [feedbackMsg, setFeedbackMsg] = useState("");

  // Search & Selector State
  const [isSelectorOpen, setIsSelectorOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRegion, setSelectedRegion] = useState("all");

  const fetchSanctions = async (code) => {
    try {
      const url = code ? `/api/sanctions?instituteCode=${code}` : "/api/sanctions";
      const res = await fetch(url);
      const data = await res.json();
      if (data.success) {
        setSanctions(data.data);
        if (data.institutionsList) {
          setInstitutionsList(data.institutionsList);
        }
      }
    } catch (err) {
      console.error("Failed to load sanctions:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSanctions();
  }, []);

  const handleSelectInstitute = (inst) => {
    setSelectedInstituteCode(inst.instituteCode);
    setSanctions(inst);
    setIsSelectorOpen(false);
  };

  const handleToggleGate = async (gateKey) => {
    setToggling(true);
    try {
      const res = await fetch("/api/sanctions/toggle", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          gate: gateKey,
          officerName: "Regional Director (Approval Bureau)"
        })
      });
      const data = await res.json();
      if (data.success) {
        // Toggle in local state
        setSanctions((prev) => {
          const updated = { ...prev };
          if (gateKey === "evc") {
            updated.evcFindings = {
              ...updated.evcFindings,
              isDelinquent: !updated.evcFindings?.isDelinquent,
              status: !updated.evcFindings?.isDelinquent ? "Delinquent" : "Compliant ✓"
            };
          } else if (gateKey === "ombudsman") {
            const hasGrievance = (updated.ombudsmanComplaints?.unresolvedCount || 0) > 0;
            updated.ombudsmanComplaints = {
              ...updated.ombudsmanComplaints,
              unresolvedCount: hasGrievance ? 0 : 12,
              status: hasGrievance ? "Cleared ✓" : "Action Required"
            };
          } else if (gateKey === "court") {
            const hasStay = updated.courtLitigation?.activeStayOrder;
            updated.courtLitigation = {
              ...updated.courtLitigation,
              activeStayOrder: !hasStay,
              status: !hasStay ? "Injunction Active" : "Vacated / Clean ✓"
            };
          }
          updated.overallReleaseLocked =
            updated.evcFindings?.isDelinquent ||
            (updated.ombudsmanComplaints?.unresolvedCount || 0) > 0 ||
            updated.courtLitigation?.activeStayOrder;
          return updated;
        });
        setFeedbackMsg(`Regulatory policy re-evaluated: Gate '${gateKey}' updated.`);
        setTimeout(() => setFeedbackMsg(""), 4000);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setToggling(false);
    }
  };

  const filteredInstitutions = useMemo(() => {
    return institutionsList.filter((inst) => {
      if (selectedRegion !== "all" && inst.region !== selectedRegion) return false;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        return (
          inst.instituteName.toLowerCase().includes(q) ||
          inst.instituteCode.toLowerCase().includes(q) ||
          inst.state.toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [institutionsList, selectedRegion, searchQuery]);

  if (loading || !sanctions) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="flex items-center gap-3 text-sm text-[#0B2545] font-semibold">
          <RefreshCw className="w-5 h-5 animate-spin text-[#D97706]" />
          Synchronizing with Central Regulatory Enforcement Registries (EVC, Ombudsman, High Courts)...
        </div>
      </div>
    );
  }

  const isLocked = sanctions.overallReleaseLocked;

  // Clause data structured for strict AICTE Act statutory checklist
  const statutoryClauses = [
    {
      gateKey: "evc",
      clauseNo: "Clause 4.2",
      title: "Expert Visit Committee (EVC) Physical Audit",
      authority: "AICTE Bureau of Approval / EVC Inspection",
      citation: "AICTE Act 1987 Sec. 10(p) & APH 2025 Sec. 2.14",
      evidence: sanctions.evcFindings?.isDelinquent
        ? (sanctions.evcFindings.deficiency || "Deficiency in cadre ratio: Professor vacancies; Zero Intake order in force")
        : "All physical infrastructure & cadre requirements certified compliant",
      sanctionEffect: "Zero Intake Penalty / Immediate Phase-5 Freeze",
      isViolated: sanctions.evcFindings?.isDelinquent,
      lastUpdated: sanctions.evcFindings?.inspectionDate || "14 Oct 2026",
      icon: <Building className="w-4 h-4 text-rose-700" />
    },
    {
      gateKey: "ombudsman",
      clauseNo: "Clause 7.1",
      title: "Student Fee Ombudsman & Grievance Redressal",
      authority: "National Student Ombudsman Central Registry",
      citation: "AICTE (Redressal of Grievance of Students) Reg. 2019",
      evidence: (sanctions.ombudsmanComplaints?.unresolvedCount || 0) > 0
        ? `${sanctions.ombudsmanComplaints.unresolvedCount} student grievances pending adjudication regarding withheld capitation fee refunds (${FORMAT_INDIAN_CURRENCY(sanctions.ombudsmanComplaints.totalAmountClaimed || 1450000)})`
        : "Zero unsettled student complaints in national repository",
      sanctionEffect: "Mandatory Student Refund Escrow / Hard Hold",
      isViolated: (sanctions.ombudsmanComplaints?.unresolvedCount || 0) > 0,
      lastUpdated: "18 Oct 2026",
      icon: <GraduationCap className="w-4 h-4 text-amber-700" />
    },
    {
      gateKey: "court",
      clauseNo: "Clause 9.4",
      title: "High Court Litigation & Judicial Injunction Registry",
      authority: `${sanctions.courtLitigation?.court || "High Court of Bombay"} Registry`,
      citation: sanctions.courtLitigation?.petitionNo || "Writ Petition (Civil)",
      evidence: sanctions.courtLitigation?.activeStayOrder
        ? (sanctions.courtLitigation.details || "Judicial interim stay order in force pending disposal")
        : "Clear judicial title; no active stay orders or contempt notices",
      sanctionEffect: "Judicial Liquidation Injunction Active",
      isViolated: sanctions.courtLitigation?.activeStayOrder,
      lastUpdated: "Current Term",
      icon: <Scale className="w-4 h-4 text-purple-700" />
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[#E2E8F0]">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-[#0B2545] text-white">
              <ShieldAlert className="w-5 h-5" />
            </span>
            <div className="flex items-center gap-2 flex-wrap">
              <h1 className="text-xl font-bold text-[#0F172A]">
                Regulatory Policy Gate &amp; Sanctions Registry
              </h1>
              <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full border ${
                isLocked 
                  ? "bg-rose-100 text-rose-800 border-rose-300 font-mono" 
                  : "bg-emerald-100 text-emerald-800 border-emerald-300 font-mono"
              }`}>
                {isLocked ? "POLICY LOCK: ACTIVE" : "POLICY GATE: CLEARED ✓"}
              </span>
            </div>
          </div>
          <p className="text-xs text-[#64748B] mt-0.5">
            Policy-as-Code automated release freeze linking EVC physical deficiencies, Student Fee Ombudsman orders, and High Court stays across {institutionsList.length || "120+"} flagged institutions
          </p>
        </div>

        {/* Target Switcher */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsSelectorOpen(true)}
            className="px-3.5 py-1.5 rounded-lg bg-blue-50 border border-blue-200 text-xs font-bold text-[#0B2545] hover:bg-blue-100 flex items-center gap-2 cursor-pointer shadow-2xs"
          >
            <Search className="w-3.5 h-3.5" />
            <span className="truncate max-w-[200px]">
              {sanctions.instituteName?.split(" ")[0]} ({sanctions.instituteCode})
            </span>
            <ChevronDown className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {feedbackMsg && (
        <div className="p-3 bg-blue-50 border border-blue-300 rounded-lg text-xs font-bold text-[#0B2545] flex items-center gap-2 animate-in fade-in">
          <span>✓</span>
          <span>{feedbackMsg}</span>
        </div>
      )}

      {/* Primary Regulatory Freeze Banner */}
      <div className={`p-5 rounded-xl border transition-all ${
        isLocked
          ? "bg-rose-50/80 border-rose-300 text-rose-950 shadow-xs"
          : "bg-emerald-50/80 border-emerald-300 text-emerald-950 shadow-xs"
      }`}>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-start gap-3.5">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
              isLocked ? "bg-rose-600 text-white" : "bg-emerald-600 text-white"
            }`}>
              {isLocked ? <Lock className="w-5 h-5" /> : <Unlock className="w-5 h-5" />}
            </div>

            <div className="space-y-1">
              <div className="flex items-center gap-2 flex-wrap">
                <h2 className="text-sm font-bold uppercase tracking-wide">
                  {isLocked 
                    ? "Statutory Phase-5 Refund Hard-Freeze in Effect" 
                    : "Statutory Sanction Gates Passed - Liquid Settlement Permitted"}
                </h2>
                <span className="font-mono text-xs bg-white px-2 py-0.5 rounded border font-semibold">
                  PID: {sanctions.instituteCode} • {sanctions.instituteName}
                </span>
              </div>
              <p className="text-xs text-slate-700 leading-relaxed max-w-3xl">
                {isLocked
                  ? "Section 1.4.9 Policy Gate Triggered: Deposit refund is strictly frozen until all outstanding student capitation refund orders, cadre deficiencies, and High Court injunctions are formally vacated."
                  : "All tripartite inter-bureau clearance criteria satisfied. No student ombudsman judgments, judicial stays, or EVC penalties remain active against this institutional deposit."}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0 self-end md:self-center">
            {isLocked ? (
              <span className="text-xs font-bold text-rose-700 bg-white border border-rose-300 px-3 py-1.5 rounded-lg flex items-center gap-1.5">
                <Ban className="w-4 h-4" />
                <span>Encashment Prohibited</span>
              </span>
            ) : (
              <button
                onClick={onNavigateToRpgf}
                className="px-3.5 py-1.5 bg-[#059669] hover:bg-emerald-700 text-white rounded-lg text-xs font-bold transition flex items-center gap-1.5 cursor-pointer shadow-xs"
              >
                <span>Proceed to RPGF Release</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* 3 Interactive Regulatory Compliance Gate Cards */}
      <div className="space-y-4">
        <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
          Cross-Bureau Statutory Clearance Gates (Section 1.4.9)
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {statutoryClauses.map((clause) => (
            <div
              key={clause.gateKey}
              className={`p-4 rounded-xl border bg-white shadow-2xs space-y-3 flex flex-col justify-between transition-all ${
                clause.isViolated ? "border-rose-300 ring-1 ring-rose-200" : "border-slate-200"
              }`}
            >
              <div>
                <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                  <div className="flex items-center gap-1.5">
                    {clause.icon}
                    <span className="text-xs font-bold text-slate-900">{clause.clauseNo}</span>
                  </div>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                    clause.isViolated ? "bg-rose-100 text-rose-800" : "bg-emerald-100 text-emerald-800"
                  }`}>
                    {clause.isViolated ? "Non-Compliant" : "Compliant ✓"}
                  </span>
                </div>

                <h4 className="font-bold text-xs text-slate-900 mt-2">
                  {clause.title}
                </h4>
                <p className="text-[10px] text-slate-500 font-mono mt-0.5">{clause.authority}</p>

                <div className="mt-3 p-2.5 rounded bg-slate-50 border border-slate-100 text-[11px] text-slate-700 leading-snug">
                  <strong className="text-slate-900 block text-[10px] uppercase text-slate-400 mb-0.5">
                    Recorded Finding:
                  </strong>
                  {clause.evidence}
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="text-[10px] text-slate-400 font-mono">{clause.citation}</span>
                <button
                  onClick={() => handleToggleGate(clause.gateKey)}
                  disabled={toggling}
                  className={`px-2.5 py-1 text-[11px] font-bold rounded cursor-pointer transition-colors ${
                    clause.isViolated
                      ? "bg-emerald-50 text-emerald-800 border border-emerald-300 hover:bg-emerald-100"
                      : "bg-rose-50 text-rose-800 border border-rose-300 hover:bg-rose-100"
                  }`}
                >
                  {clause.isViolated ? "Mark Cleared ✓" : "Flag Violation ✕"}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* INSTITUTION SELECTOR MODAL */}
      {isSelectorOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-2xl border border-slate-300 w-full max-w-2xl max-h-[85vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95">
            <div className="p-4 border-b border-slate-200 flex items-center justify-between bg-slate-50">
              <div>
                <h3 className="font-bold text-[#0B2545] text-base">Select Flagged Institution for Sanctions Review</h3>
                <p className="text-xs text-slate-500">
                  Inspecting {institutionsList.length} institutions with active regulatory flags in repository
                </p>
              </div>
              <button
                onClick={() => setIsSelectorOpen(false)}
                className="p-1 rounded-md text-slate-400 hover:text-slate-700 hover:bg-slate-200 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Filter toolbar */}
            <div className="p-3 border-b border-slate-200 bg-white space-y-2">
              <div className="relative">
                <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search by PID, Institution Name, State..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-md focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#0B2545]"
                  autoFocus
                />
              </div>

              <div className="flex items-center gap-1.5 text-xs">
                {["all", "WRO", "NRO", "SRO", "SWRO", "CRO", "ERO", "NWRO", "SCRO"].map((r) => (
                  <button
                    key={r}
                    onClick={() => setSelectedRegion(r)}
                    className={`px-2 py-0.5 rounded text-[10px] font-semibold cursor-pointer ${
                      selectedRegion === r ? "bg-[#0B2545] text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                    }`}
                  >
                    {r}
                  </button>
                ))}
              </div>
            </div>

            {/* List */}
            <div className="p-3 overflow-y-auto space-y-2 flex-1 divide-y divide-slate-100">
              {filteredInstitutions.map((inst) => {
                const isSelected = inst.instituteCode === selectedInstituteCode;
                return (
                  <div
                    key={inst.id}
                    onClick={() => handleSelectInstitute(inst)}
                    className={`pt-2 p-2.5 rounded-lg border cursor-pointer transition-all flex items-center justify-between gap-3 ${
                      isSelected ? "border-[#0B2545] bg-blue-50/60" : "border-slate-200 hover:border-[#0B2545] hover:bg-slate-50"
                    }`}
                  >
                    <div className="space-y-0.5 flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-bold text-xs text-[#0B2545]">PID: {inst.instituteCode}</span>
                        <span className="text-[9px] bg-slate-100 text-slate-600 px-1.5 py-0.2 rounded font-bold">
                          {inst.region} • {inst.state}
                        </span>
                        {inst.overallReleaseLocked && (
                          <span className="text-[9px] bg-rose-100 text-rose-800 font-bold px-1.5 py-0.2 rounded">
                            Hard Lock Active
                          </span>
                        )}
                      </div>
                      <div className="font-semibold text-xs text-slate-800 truncate">
                        {inst.instituteName}
                      </div>
                    </div>

                    <button className="px-2.5 py-1 text-xs font-bold text-[#0B2545] bg-white border border-[#0B2545] rounded hover:bg-[#0B2545] hover:text-white transition-colors shrink-0">
                      Inspect
                    </button>
                  </div>
                );
              })}
            </div>

            <div className="p-3 border-t border-slate-200 bg-slate-50 flex items-center justify-between text-xs text-slate-500">
              <span>Showing {filteredInstitutions.length} institutions</span>
              <button
                onClick={() => setIsSelectorOpen(false)}
                className="px-3 py-1 bg-slate-200 hover:bg-slate-300 text-slate-700 font-semibold rounded cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
