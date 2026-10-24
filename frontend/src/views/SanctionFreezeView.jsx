import { useState, useEffect } from "react";
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
  FileText
} from "lucide-react";

export const SanctionFreezeView = ({ onNavigateToRpgf }) => {
  const [sanctions, setSanctions] = useState(null);
  const [loading, setLoading] = useState(true);
  const [toggling, setToggling] = useState(false);
  const [feedbackMsg, setFeedbackMsg] = useState("");

  const fetchSanctions = async () => {
    try {
      const res = await fetch("/api/sanctions");
      const data = await res.json();
      if (data.success) {
        setSanctions(data.data);
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

  const handleToggleGate = async (gateKey) => {
    setToggling(true);
    try {
      const res = await fetch("/api/sanctions/toggle", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          gate: gateKey,
          officerName: "Regional Director (WRO Mumbai)"
        })
      });
      const data = await res.json();
      if (data.success) {
        setSanctions(data.data);
        setFeedbackMsg(`Regulatory policy re-evaluated: Gate '${gateKey}' status updated.`);
        setTimeout(() => setFeedbackMsg(""), 4000);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setToggling(false);
    }
  };

  if (loading || !sanctions) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="flex items-center gap-3 text-sm text-[#0B2545] font-semibold">
          <RefreshCw className="w-5 h-5 animate-spin text-[#D97706]" />
          Synchronizing with Central Regulatory Enforcement Registries (EVC, Ombudsman, Courts)...
        </div>
      </div>
    );
  }

  const isLocked = sanctions.overallReleaseLocked;

  // Clause data structured for strict AICTE Act statutory checklist
  const statutoryClauses = [
    {
      gateKey: "evcFindings",
      clauseNo: "Clause 4.2",
      title: "Expert Visit Committee (EVC) Physical Audit",
      authority: "AICTE Bureau of Approval / EVC Inspection",
      citation: "AICTE Act 1987 Sec. 10(p) & APH 2025 Sec. 2.14",
      evidence: sanctions.evcFindings?.isDelinquent
        ? "Deficiency in cadre ratio: 8 Prof. vacancies; Zero Intake order issued"
        : "All physical infrastructure & cadre requirements compliant",
      sanctionEffect: "Zero Intake Penalty / Immediate Phase-5 Freeze",
      isViolated: sanctions.evcFindings?.isDelinquent,
      lastUpdated: sanctions.evcFindings?.lastInspected || "14 Oct 2026",
      icon: <Building className="w-4 h-4 text-rose-700" />
    },
    {
      gateKey: "ombudsmanComplaints",
      clauseNo: "Clause 7.1",
      title: "Student Fee Ombudsman & Grievance Redressal",
      authority: "National Student Ombudsman Central Registry",
      citation: "AICTE (Redressal of Grievance of Students) Reg. 2019",
      evidence: sanctions.ombudsmanComplaints?.isDelinquent
        ? "12 unsettled student fee refund grievances under Section 54"
        : "Zero unsettled student complaints in national repository",
      sanctionEffect: "Mandatory Student Refund Escrow / Hard Hold",
      isViolated: sanctions.ombudsmanComplaints?.isDelinquent,
      lastUpdated: "18 Oct 2026",
      icon: <GraduationCap className="w-4 h-4 text-amber-700" />
    },
    {
      gateKey: "courtLitigation",
      clauseNo: "Clause 9.4",
      title: "High Court Litigation & Judicial Injunction Registry",
      authority: "Bombay High Court Appellate Registry",
      citation: "Writ Petition No. 4410/2023 & Sec. 22 Contempt Rules",
      evidence: sanctions.courtLitigation?.isDelinquent
        ? "Judicial interim stay order in force pending disposal"
        : "Clear judicial title; no active stay orders or contempt notices",
      sanctionEffect: "Judicial Interlocutory Freeze on Deposit Liquidation",
      isViolated: sanctions.courtLitigation?.isDelinquent,
      lastUpdated: sanctions.courtLitigation?.caseNumber || "W.P. 4410/2023",
      icon: <Scale className="w-4 h-4 text-purple-700" />
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#E2E8F0]">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-md bg-[#0B2545] text-white">
              <ShieldAlert className="w-5 h-5" />
            </span>
            <div>
              <h1 className="text-xl font-bold text-[#0B2545]">
                Regulatory Sanctions Matrix
              </h1>
              <p className="text-xs text-slate-500">
                Institutional Health Profile &amp; Automated Cross-Bureau Policy Enforcement (Policy-as-Code)
              </p>
            </div>
          </div>
        </div>

        {/* Global Enforcement Status Banner Pill */}
        <div className="flex items-center gap-3">
          <div
            className={`px-3 py-1.5 rounded-md border flex items-center gap-2 text-xs font-bold ${
              isLocked
                ? "bg-rose-50 text-rose-900 border-rose-300"
                : "bg-emerald-50 text-emerald-900 border-emerald-300"
            }`}
          >
            {isLocked ? (
              <>
                <Lock className="w-4 h-4 text-rose-600 animate-pulse" />
                <span className="font-mono">PHASE-5 RELEASE: HARD-LOCKED</span>
              </>
            ) : (
              <>
                <Unlock className="w-4 h-4 text-emerald-600" />
                <span className="font-mono">ALL STATUTORY GATES PASSED</span>
              </>
            )}
          </div>
        </div>
      </div>

      {/* INSTITUTION HEALTH PROFILE SCORECARD */}
      <div className="card-clean rounded-lg p-5 bg-white border border-[#E2E8F0]">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-[#E2E8F0]">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block mb-1">
              Institution Compliance Health Profile
            </span>
            <h2 className="text-lg font-bold text-[#0F172A]">
              Bharati Vidya Sansthan (PID: 1-1029384)
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Region: Western Regional Office (WRO), Mumbai • Category: Private Self-Financing Engineering &amp; Management
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="text-right">
              <span className="text-[10px] text-slate-500 font-bold uppercase block">Statutory Gate Rule</span>
              <span className="text-xs font-mono font-bold text-[#0B2545]">
                Rule 1.4.3 (Automatic Triple-Lock Gate)
              </span>
            </div>
            <div
              className={`p-3 rounded-md border text-center ${
                isLocked ? "bg-rose-100/60 border-rose-300" : "bg-emerald-100/60 border-emerald-300"
              }`}
            >
              <span className="text-[10px] font-bold uppercase block text-slate-600">Health Index</span>
              <span className={`text-base font-bold font-mono ${isLocked ? "text-rose-900" : "text-emerald-900"}`}>
                {isLocked ? "CRITICAL (SANCTION ACTIVE)" : "100% COMPLIANT"}
              </span>
            </div>
          </div>
        </div>

        {/* Unified Tabulated Statutory Checklist */}
        <div className="mt-4 overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-50 text-slate-700 font-bold uppercase tracking-wider border-b border-slate-200 text-[10px]">
                <th className="py-2.5 px-3">Statutory Clause &amp; Authority</th>
                <th className="py-2.5 px-3">Enforcement Evidence &amp; Finding</th>
                <th className="py-2.5 px-3">Sanction Penalty Mandate</th>
                <th className="py-2.5 px-3 text-center">Policy Rule Engine</th>
                <th className="py-2.5 px-3 text-right">Bureau Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 font-sans">
              {statutoryClauses.map((clause) => (
                <tr
                  key={clause.gateKey}
                  className={`hover:bg-slate-50 transition-colors ${
                    clause.isViolated ? "bg-rose-50/30" : "bg-white"
                  }`}
                >
                  {/* Clause & Authority */}
                  <td className="py-3 px-3">
                    <div className="flex items-center gap-2">
                      {clause.icon}
                      <div>
                        <div className="font-bold text-[#0F172A] flex items-center gap-1.5">
                          <span className="font-mono text-[#0B2545] font-bold">{clause.clauseNo}</span>
                          <span>- {clause.title}</span>
                        </div>
                        <div className="text-[11px] text-slate-500 font-mono mt-0.5">
                          {clause.citation}
                        </div>
                      </div>
                    </div>
                  </td>

                  {/* Evidence */}
                  <td className="py-3 px-3 max-w-[280px]">
                    <div className="text-slate-800 text-xs leading-relaxed font-medium">
                      {clause.evidence}
                    </div>
                    <div className="text-[10px] font-mono text-slate-400 mt-0.5">
                      Updated: {clause.lastUpdated}
                    </div>
                  </td>

                  {/* Sanction Effect */}
                  <td className="py-3 px-3">
                    <span className="font-semibold text-slate-700 text-xs block">
                      {clause.sanctionEffect}
                    </span>
                    <span className="text-[10px] font-mono text-slate-500">
                      Auto-Locks Phase-5 Disbursement
                    </span>
                  </td>

                  {/* Status */}
                  <td className="py-3 px-3 text-center">
                    {clause.isViolated ? (
                      <span className="inline-flex items-center gap-1 bg-rose-100 text-rose-900 border border-rose-300 font-mono font-bold text-[10px] px-2 py-0.5 rounded">
                        <Ban className="w-3 h-3 text-rose-700" />
                        FAILED (HARD-LOCKED)
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 bg-emerald-100 text-emerald-900 border border-emerald-300 font-mono font-bold text-[10px] px-2 py-0.5 rounded">
                        <CheckCircle2 className="w-3 h-3 text-emerald-700" />
                        PASSED (CLEARED)
                      </span>
                    )}
                  </td>

                  {/* Action Toggle */}
                  <td className="py-3 px-3 text-right">
                    <button
                      onClick={() => handleToggleGate(clause.gateKey)}
                      disabled={toggling}
                      className={`px-3 py-1 rounded text-xs font-semibold border transition-colors cursor-pointer ${
                        clause.isViolated
                          ? "bg-white text-rose-800 border-rose-300 hover:bg-rose-50"
                          : "bg-white text-slate-700 border-slate-300 hover:bg-slate-100"
                      }`}
                    >
                      {clause.isViolated ? "Simulate Clearance" : "Simulate Infraction"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {feedbackMsg && (
          <div className="mt-3 p-2 bg-blue-50 border border-blue-200 rounded text-xs text-[#0B2545] font-semibold flex items-center gap-2">
            <RefreshCw className="w-3.5 h-3.5 animate-spin" />
            <span>{feedbackMsg}</span>
          </div>
        )}
      </div>

      {/* STRICT VERTICAL TIMELINE OF STATUTORY ENFORCEMENT */}
      <div className="card-clean rounded-lg p-5 bg-white border border-[#E2E8F0]">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-4 flex items-center gap-2">
          <Clock className="w-4 h-4 text-[#0B2545]" />
          <span>Statutory Enforcement &amp; Policy-as-Code Audit Trail</span>
        </h3>

        <div className="space-y-4 border-l-2 border-slate-200 pl-4 ml-2 text-xs">
          {/* Incident 1 */}
          <div className="relative">
            <div className="w-3 h-3 rounded-full bg-rose-600 absolute -left-[23px] top-1 ring-4 ring-rose-100" />
            <div className="flex items-center justify-between">
              <span className="font-bold text-[#0F172A]">EVC Physical Audit Report Filed (Zero Intake Sanction)</span>
              <span className="font-mono text-[10px] text-slate-500">14 Oct 2026, 11:30 IST</span>
            </div>
            <p className="text-slate-600 mt-0.5 leading-relaxed">
              Inspection team identified 8 faculty vacancies in Mechanical Engineering. Central approval portal triggered Zero Intake sanction, automatically activating Clause 4.2 deposit lock.
            </p>
          </div>

          {/* Incident 2 */}
          <div className="relative">
            <div className="w-3 h-3 rounded-full bg-amber-500 absolute -left-[23px] top-1 ring-4 ring-amber-100" />
            <div className="flex items-center justify-between">
              <span className="font-bold text-[#0F172A]">Student Ombudsman Grievance Registry Synchronization</span>
              <span className="font-mono text-[10px] text-slate-500">18 Oct 2026, 15:45 IST</span>
            </div>
            <p className="text-slate-600 mt-0.5 leading-relaxed">
              Central Ombudsman API reported 12 unsettled refund claims totaling ₹14.80L from 2024-25 batch students. Refund gate locked under Clause 7.1.
            </p>
          </div>

          {/* Incident 3 */}
          <div className="relative">
            <div className="w-3 h-3 rounded-full bg-[#0B2545] absolute -left-[23px] top-1 ring-4 ring-blue-100" />
            <div className="flex items-center justify-between">
              <span className="font-bold text-[#0F172A]">Policy-as-Code Gate Lock Enforced</span>
              <span className="font-mono text-[10px] text-slate-500">Continuous Real-Time Gate</span>
            </div>
            <p className="text-slate-600 mt-0.5 leading-relaxed">
              Phase-5 release API refused disbursement request. Promoter withdrawal blocked until student refund escrow is deposited in SBI joint account.
            </p>
          </div>
        </div>

        {/* Action Callout at Bottom */}
        <div className="mt-5 pt-3 border-t border-[#E2E8F0] flex flex-col sm:flex-row items-center justify-between gap-3 bg-[#F8FAFC] p-3 rounded-md">
          <div className="flex items-center gap-2 text-xs text-slate-700">
            <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
            <span>
              Under AICTE Approval Process Handbook, Phase 5 release cannot be authorized while regulatory gates remain unpassed.
            </span>
          </div>

          <button
            onClick={onNavigateToRpgf}
            className="px-3.5 py-1.5 text-xs font-bold text-white bg-[#0B2545] hover:bg-[#133E87] rounded-md transition-colors flex items-center gap-1.5 cursor-pointer shrink-0"
          >
            <span>Inspect Phase-5 Release Queue</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
