import { useState, useEffect } from "react";
import { 
  ShieldAlert, 
  ShieldCheck, 
  Lock, 
  Unlock, 
  AlertOctagon, 
  Scale, 
  GraduationCap, 
  Building, 
  FileWarning, 
  RefreshCw, 
  ExternalLink,
  Ban,
  CheckCircle2,
  Clock,
  ArrowRight
} from "lucide-react";
import { FORMAT_INDIAN_CURRENCY } from "../data/mockData";

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
        <div className="flex items-center gap-3 text-sm text-[#0D3B66] font-semibold">
          <RefreshCw className="w-5 h-5 animate-spin text-[#E65100]" />
          Synchronizing with Central Regulatory Enforcement Registries (EVC, Ombudsman, Courts)...
        </div>
      </div>
    );
  }

  const isLocked = sanctions.overallReleaseLocked;

  return (
    <div className="space-y-6">
      {/* View Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[#E2E8F0]">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-[#0D3B66] text-white">
              <ShieldAlert className="w-5 h-5" />
            </span>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-bold text-[#0F172A]">
                Automated Regulatory Sanction Freezes
              </h1>
              <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-blue-100 text-[#0D3B66] border border-blue-200">
                Policy-as-Code
              </span>
            </div>
          </div>
          <p className="text-xs text-[#64748B] mt-0.5">
            USP 2 • Direct inter-bureau linkage preventing delinquent college promoter withdrawals before student & legal claims are cleared
          </p>
        </div>

        {/* Global Lock Status Banner Pill */}
        <div className="flex items-center gap-3">
          <div className={`px-3 py-1.5 rounded-lg border flex items-center gap-2 text-xs font-bold ${
            isLocked 
              ? "bg-red-50 text-red-800 border-red-200" 
              : "bg-emerald-50 text-emerald-800 border-emerald-200"
          }`}>
            {isLocked ? (
              <>
                <Lock className="w-4 h-4 text-red-600 animate-pulse" />
                <span>PHASE-5 DISBURSEMENT HARD-LOCKED</span>
              </>
            ) : (
              <>
                <Unlock className="w-4 h-4 text-emerald-600" />
                <span>ALL REGULATORY CLEARANCES PASS</span>
              </>
            )}
          </div>
          <button
            onClick={fetchSanctions}
            className="p-1.5 bg-white border border-[#E2E8F0] hover:border-[#0D3B66] rounded-lg text-[#64748B] hover:text-[#0D3B66] transition cursor-pointer"
            title="Refresh cross-bureau feeds"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {feedbackMsg && (
        <div className="p-3 bg-amber-50 border-l-4 border-[#E65100] text-amber-900 text-xs font-medium rounded-r flex items-center justify-between">
          <span>{feedbackMsg}</span>
        </div>
      )}

      {/* Hero Policy Evaluation Engine Box */}
      <div className={`card-clean p-5 rounded-xl border ${
        isLocked 
          ? "border-red-300 bg-gradient-to-r from-red-50/70 via-white to-red-50/30" 
          : "border-emerald-300 bg-gradient-to-r from-emerald-50/70 via-white to-emerald-50/30"
      }`}>
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className={`w-2.5 h-2.5 rounded-full ${isLocked ? "bg-red-600 animate-ping" : "bg-emerald-600"}`} />
              <span className="font-mono text-xs font-bold uppercase tracking-wider text-slate-700">
                Rule Engine Evaluation Result: PID {sanctions.instituteCode}
              </span>
            </div>
            <h2 className="text-lg font-black text-[#0F172A]">
              {isLocked 
                ? "Statutory Release Gate: FORBIDDEN (Section 2.14 APH Enforced)"
                : "Statutory Release Gate: PERMITTED (All Regulatory Clearances Verified)"}
            </h2>
            <p className="text-xs text-[#64748B] max-w-2xl leading-relaxed">
              {isLocked 
                ? "Automated rule evaluator detected 1 or more unresolved regulatory violations. Under Gazette Regulations, joint fixed security deposits cannot be discharged until student compensation, court stays, and committee non-compliance orders are unconditionally resolved."
                : "No active regulatory sanctions or pending ombudsman complaints detected across central registries. The institution is authorized to proceed with Phase 5 FDR lock-in maturity claims."}
            </p>
          </div>

          <div className="bg-white/90 p-3.5 rounded-lg border border-[#E2E8F0] shadow-xs flex flex-col gap-2 shrink-0 lg:w-72">
            <span className="text-[11px] font-bold text-[#64748B] uppercase">Gate Summary</span>
            <div className="space-y-1.5 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-[#64748B]">EVC Inspection:</span>
                <span className={`font-bold ${sanctions.evcFindings.isDelinquent ? "text-red-700" : "text-emerald-700"}`}>
                  {sanctions.evcFindings.isDelinquent ? "Delinquent" : "Cleared ✓"}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[#64748B]">Fee Ombudsman:</span>
                <span className={`font-bold ${sanctions.ombudsmanComplaints.unresolvedCount > 0 ? "text-red-700" : "text-emerald-700"}`}>
                  {sanctions.ombudsmanComplaints.unresolvedCount > 0 ? `${sanctions.ombudsmanComplaints.unresolvedCount} Pending` : "No Claims ✓"}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[#64748B]">Court Registry:</span>
                <span className={`font-bold ${sanctions.courtLitigation.activeStayOrder ? "text-red-700" : "text-emerald-700"}`}>
                  {sanctions.courtLitigation.activeStayOrder ? "Active Stay" : "Clean Registry ✓"}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 3 Cross-Bureau Validation Gates Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        
        {/* GATE 1: Expert Visit Committee (EVC) */}
        <div className={`card-clean rounded-xl border p-4.5 flex flex-col justify-between transition-all ${
          sanctions.evcFindings.isDelinquent 
            ? "border-red-300 bg-white" 
            : "border-[#E2E8F0] bg-white"
        }`}>
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                  sanctions.evcFindings.isDelinquent ? "bg-red-100 text-red-700" : "bg-emerald-100 text-emerald-700"
                }`}>
                  <Building className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-bold text-xs text-[#0F172A]">EVC Registry</h3>
                  <span className="text-[10px] text-[#64748B]">Inspection Bureau</span>
                </div>
              </div>
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                sanctions.evcFindings.isDelinquent ? "bg-red-100 text-red-800" : "bg-emerald-100 text-emerald-800"
              }`}>
                {sanctions.evcFindings.status}
              </span>
            </div>

            <div className="space-y-2 text-xs py-2 border-y border-slate-100">
              <div className="flex justify-between">
                <span className="text-[#64748B]">Last EVC Date:</span>
                <span className="font-semibold text-[#0F172A]">{sanctions.evcFindings.inspectionDate}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#64748B]">Sanction Order:</span>
                <span className="font-mono font-bold text-red-700">{sanctions.evcFindings.orderNo}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#64748B]">Penalty Imposed:</span>
                <span className="font-bold text-[#0F172A]">{sanctions.evcFindings.penalty}</span>
              </div>
            </div>

            <div className="mt-3 p-2.5 rounded bg-slate-50 border border-slate-200 text-[11px] text-slate-700">
              <span className="font-semibold block mb-0.5 text-slate-900">EVC Chairman Observation:</span>
              <p className="leading-snug">{sanctions.evcFindings.deficiency}</p>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100">
            <button
              onClick={() => handleToggleGate("evc")}
              disabled={toggling}
              className={`w-full py-1.5 px-3 rounded text-xs font-semibold flex items-center justify-center gap-1.5 transition cursor-pointer ${
                sanctions.evcFindings.isDelinquent
                  ? "bg-emerald-600 hover:bg-emerald-700 text-white"
                  : "bg-red-50 hover:bg-red-100 text-red-700 border border-red-200"
              }`}
            >
              {sanctions.evcFindings.isDelinquent ? (
                <>
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Simulate Compliance Clearance</span>
                </>
              ) : (
                <>
                  <Ban className="w-3.5 h-3.5" />
                  <span>Simulate EVC Zero-Intake Order</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* GATE 2: Student Fee Ombudsman Registry */}
        <div className={`card-clean rounded-xl border p-4.5 flex flex-col justify-between transition-all ${
          sanctions.ombudsmanComplaints.unresolvedCount > 0 
            ? "border-amber-300 bg-white" 
            : "border-[#E2E8F0] bg-white"
        }`}>
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                  sanctions.ombudsmanComplaints.unresolvedCount > 0 ? "bg-amber-100 text-amber-800" : "bg-emerald-100 text-emerald-700"
                }`}>
                  <GraduationCap className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-bold text-xs text-[#0F172A]">Fee Ombudsman</h3>
                  <span className="text-[10px] text-[#64748B]">Student Welfare Bureau</span>
                </div>
              </div>
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                sanctions.ombudsmanComplaints.unresolvedCount > 0 ? "bg-amber-100 text-amber-800" : "bg-emerald-100 text-emerald-800"
              }`}>
                {sanctions.ombudsmanComplaints.status}
              </span>
            </div>

            <div className="space-y-2 text-xs py-2 border-y border-slate-100">
              <div className="flex justify-between">
                <span className="text-[#64748B]">Pending Grievances:</span>
                <span className="font-bold text-[#0F172A]">{sanctions.ombudsmanComplaints.unresolvedCount} Students</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#64748B]">Withheld Refund Amount:</span>
                <span className="font-mono font-bold text-amber-700">
                  {FORMAT_INDIAN_CURRENCY(sanctions.ombudsmanComplaints.totalAmountClaimed)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#64748B]">Primary Case:</span>
                <span className="font-mono text-[#0F172A]">{sanctions.ombudsmanComplaints.caseRef}</span>
              </div>
            </div>

            <div className="mt-3 p-2.5 rounded bg-slate-50 border border-slate-200 text-[11px] text-slate-700">
              <span className="font-semibold block mb-0.5 text-slate-900">Grievance Summary:</span>
              <p className="leading-snug">{sanctions.ombudsmanComplaints.description}</p>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100">
            <button
              onClick={() => handleToggleGate("ombudsman")}
              disabled={toggling}
              className={`w-full py-1.5 px-3 rounded text-xs font-semibold flex items-center justify-center gap-1.5 transition cursor-pointer ${
                sanctions.ombudsmanComplaints.unresolvedCount > 0
                  ? "bg-emerald-600 hover:bg-emerald-700 text-white"
                  : "bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-200"
              }`}
            >
              {sanctions.ombudsmanComplaints.unresolvedCount > 0 ? (
                <>
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Mark Student Refunds Settled</span>
                </>
              ) : (
                <>
                  <AlertOctagon className="w-3.5 h-3.5" />
                  <span>Simulate Student Fee Grievance</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* GATE 3: Court Litigation & NJDG Registry */}
        <div className={`card-clean rounded-xl border p-4.5 flex flex-col justify-between transition-all ${
          sanctions.courtLitigation.activeStayOrder 
            ? "border-red-300 bg-white" 
            : "border-[#E2E8F0] bg-white"
        }`}>
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                  sanctions.courtLitigation.activeStayOrder ? "bg-red-100 text-red-700" : "bg-emerald-100 text-emerald-700"
                }`}>
                  <Scale className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-bold text-xs text-[#0F172A]">Court Litigation</h3>
                  <span className="text-[10px] text-[#64748B]">NJDG Legal Interconnect</span>
                </div>
              </div>
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                sanctions.courtLitigation.activeStayOrder ? "bg-red-100 text-red-800" : "bg-emerald-100 text-emerald-800"
              }`}>
                {sanctions.courtLitigation.status}
              </span>
            </div>

            <div className="space-y-2 text-xs py-2 border-y border-slate-100">
              <div className="flex justify-between">
                <span className="text-[#64748B]">Judicial Forum:</span>
                <span className="font-semibold text-[#0F172A]">{sanctions.courtLitigation.court}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#64748B]">Petition Number:</span>
                <span className="font-mono font-bold text-blue-700">{sanctions.courtLitigation.petitionNo}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#64748B]">Stay Order Active:</span>
                <span className={`font-bold ${sanctions.courtLitigation.activeStayOrder ? "text-red-700" : "text-emerald-700"}`}>
                  {sanctions.courtLitigation.activeStayOrder ? "YES (Status Quo)" : "NO"}
                </span>
              </div>
            </div>

            <div className="mt-3 p-2.5 rounded bg-slate-50 border border-slate-200 text-[11px] text-slate-700">
              <span className="font-semibold block mb-0.5 text-slate-900">Legal Matter:</span>
              <p className="leading-snug">{sanctions.courtLitigation.details}</p>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100">
            <button
              onClick={() => handleToggleGate("court")}
              disabled={toggling}
              className={`w-full py-1.5 px-3 rounded text-xs font-semibold flex items-center justify-center gap-1.5 transition cursor-pointer ${
                sanctions.courtLitigation.activeStayOrder
                  ? "bg-emerald-600 hover:bg-emerald-700 text-white"
                  : "bg-red-50 hover:bg-red-100 text-red-700 border border-red-200"
              }`}
            >
              {sanctions.courtLitigation.activeStayOrder ? (
                <>
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Simulate High Court Stay Vacation</span>
                </>
              ) : (
                <>
                  <Scale className="w-3.5 h-3.5" />
                  <span>Simulate Interim Injunction / Stay</span>
                </>
              )}
            </button>
          </div>
        </div>

      </div>

      {/* Simulated Phase 5 Action Desk to demonstrate Hard-Lock */}
      <div className="card-clean rounded-xl border border-[#E2E8F0] p-5 bg-white">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#E2E8F0]">
          <div>
            <h3 className="text-sm font-bold text-[#0F172A]">
              Phase 5 Statutory Release & Refund Terminal
            </h3>
            <p className="text-xs text-[#64748B]">
              Simulated institutional disbursement request for matured instrument SBI-FD-49102938 (₹35,00,000)
            </p>
          </div>
          <span className="text-xs font-mono text-slate-500">
            Rule Policy: APH 2025-26 Clause 2.14
          </span>
        </div>

        <div className="py-5">
          {isLocked ? (
            <div className="p-4 rounded-xl bg-red-50/80 border border-red-200 flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-red-100 text-red-700 flex items-center justify-center shrink-0">
                  <Lock className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-red-900">
                    Statutory Action Hard-Lock Enforced
                  </h4>
                  <p className="text-xs text-red-700 mt-0.5 leading-relaxed">
                    Under AICTE automated policy-as-code, institutional capital cannot be returned to the trust while regulatory sanctions are active. The &quot;Apply for Refund / Encashment&quot; button has been automatically locked at the gateway level.
                  </p>
                  <div className="mt-2 text-[11px] font-mono text-red-800 bg-red-100/70 px-2.5 py-1 rounded inline-block">
                    GATEWAY_ERROR_CODE: REG_SANCTION_HOLD_LOCK
                  </div>
                </div>
              </div>

              <button
                disabled
                className="px-5 py-2.5 rounded-lg bg-slate-200 text-slate-400 font-bold text-xs cursor-not-allowed border border-slate-300 shrink-0 flex items-center gap-2"
              >
                <Lock className="w-4 h-4" />
                <span>Apply for Refund (Hard-Locked)</span>
              </button>
            </div>
          ) : (
            <div className="p-4 rounded-xl bg-emerald-50/80 border border-emerald-200 flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                  <Unlock className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-emerald-900">
                    All Statutory Policy Clearances Active
                  </h4>
                  <p className="text-xs text-emerald-700 mt-0.5 leading-relaxed">
                    Zero sanctions or outstanding student liabilities detected. The institution meets all Section 1.4 regulatory preconditions for Phase 5 lock-in refund processing.
                  </p>
                  <div className="mt-2 text-[11px] font-mono text-emerald-800 bg-emerald-100/70 px-2.5 py-1 rounded inline-block">
                    GATEWAY_STATUS: REGULATORY_CLEARANCE_VALIDATED
                  </div>
                </div>
              </div>

              <button
                onClick={onNavigateToRpgf}
                className="px-5 py-2.5 rounded-lg bg-[#0D3B66] hover:bg-[#092c4d] text-white font-bold text-xs cursor-pointer shadow-sm shrink-0 flex items-center gap-2 transition"
              >
                <span>Proceed to Phase 5 Release</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
