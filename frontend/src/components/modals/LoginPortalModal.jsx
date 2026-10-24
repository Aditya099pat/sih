import { useState } from "react";
import {
  X,
  Shield,
  ShieldCheck,
  Lock,
  UserCheck,
  Building,
  KeyRound,
  CheckCircle2,
  ChevronRight,
  ExternalLink,
  Laptop
} from "lucide-react";
import { AicteLogo } from "../AicteLogo";

export const LoginPortalModal = ({
  isOpen,
  onClose,
  activeRole,
  onLogin
}) => {
  const [selectedRole, setSelectedRole] = useState(activeRole || "admin");
  const [adminUsername, setAdminUsername] = useState("admin.hq@aicte-india.org");
  const [adminPassword, setAdminPassword] = useState("••••••••••••");
  const [supervisorUsername, setSupervisorUsername] = useState("supervisor.wro@aicte-india.org");
  const [supervisorPassword, setSupervisorPassword] = useState("••••••••••••");
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleLoginSubmit = (role) => {
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      if (onLogin) {
        onLogin(role);
      }
      onClose();
    }, 400);
  };

  return (
    <div
      className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 select-none animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      aria-labelledby="login-portal-title"
    >
      <div className="relative w-full max-w-2xl bg-white rounded-lg shadow-2xl border border-slate-200 overflow-hidden animate-in zoom-in-95 duration-200">
        
        {/* National Tricolor Stripe */}
        <div className="h-1 w-full bg-gradient-to-r from-[#FF9933] via-white to-[#138808]" />

        {/* Modal Header */}
        <div className="p-5 bg-[#F8FAFC] border-b border-slate-200 flex items-start justify-between">
          <div className="flex items-center gap-3">
            <AicteLogo size={42} />
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-[#0B2545] text-base">
                  AICTE Officer Login Portal
                </span>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-blue-100 text-[#0B2545] border border-blue-200">
                  Gov-SSO
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-0.5 font-medium">
                All India Council for Technical Education • Ministry of Education, Govt. of India
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-md text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 transition cursor-pointer"
            aria-label="Close Login Portal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Portal Selection Tabs */}
        <div className="p-6 space-y-6">
          <div className="text-center max-w-lg mx-auto">
            <h2 id="login-portal-title" className="text-sm font-bold uppercase tracking-wider text-slate-800">
              Select Bureau Authentication Privilege
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              Authorized access restricted to statutory officials of AICTE Central Headquarters and Regional Scrutiny Directorates.
            </p>
          </div>

          {/* Two Distinct Login Cards: Administrator & Supervisor */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            {/* 1. ADMINISTRATOR PORTAL CARD */}
            <div
              onClick={() => setSelectedRole("admin")}
              className={`p-4 rounded-lg border-2 transition-all cursor-pointer relative flex flex-col justify-between ${
                selectedRole === "admin"
                  ? "border-[#0B2545] bg-blue-50/40 shadow-xs"
                  : "border-slate-200 hover:border-slate-300 bg-white"
              }`}
            >
              {selectedRole === "admin" && (
                <span className="absolute top-3 right-3 text-emerald-600">
                  <CheckCircle2 className="w-5 h-5" />
                </span>
              )}

              <div className="space-y-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-md bg-[#0B2545] text-white flex items-center justify-center shrink-0">
                    <Shield className="w-5 h-5 text-amber-400" />
                  </div>
                  <div>
                    <h3 className="text-xs font-bold text-[#0B2545] uppercase tracking-wider">
                      Administrator Portal
                    </h3>
                    <span className="text-[10px] text-slate-500 font-medium">
                      AICTE HQ • Central Bureau Admin
                    </span>
                  </div>
                </div>

                <p className="text-[11px] text-slate-600 leading-relaxed font-medium">
                  Full administrative authority: Regulatory sanctions matrix, policy freezes, Phase-5 refund authorizations, and cryptographic ledger ledger certification.
                </p>

                <div className="p-2.5 bg-slate-50 rounded border border-slate-200 space-y-1.5 text-[11px]">
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase font-bold block">Official ID:</span>
                    <span className="font-mono text-slate-800 font-semibold">{adminUsername}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase font-bold block">Passcode / 2FA Token:</span>
                    <span className="font-mono text-slate-500">{adminPassword}</span>
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-200/70">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleLoginSubmit("admin");
                  }}
                  disabled={isSubmitting}
                  className="w-full py-2 px-3 rounded-md bg-[#0B2545] hover:bg-[#07182D] text-white text-xs font-bold transition flex items-center justify-center gap-1.5 cursor-pointer shadow-xs disabled:opacity-75"
                >
                  <Lock className="w-3.5 h-3.5" />
                  <span>Login as Administrator &rarr;</span>
                </button>
              </div>
            </div>

            {/* 2. SUPERVISOR PORTAL CARD */}
            <div
              onClick={() => setSelectedRole("supervisor")}
              className={`p-4 rounded-lg border-2 transition-all cursor-pointer relative flex flex-col justify-between ${
                selectedRole === "supervisor"
                  ? "border-[#0B2545] bg-blue-50/40 shadow-xs"
                  : "border-slate-200 hover:border-slate-300 bg-white"
              }`}
            >
              {selectedRole === "supervisor" && (
                <span className="absolute top-3 right-3 text-emerald-600">
                  <CheckCircle2 className="w-5 h-5" />
                </span>
              )}

              <div className="space-y-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-md bg-[#D97706] text-white flex items-center justify-center shrink-0">
                    <ShieldCheck className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xs font-bold text-amber-950 uppercase tracking-wider">
                      Supervisor Portal
                    </h3>
                    <span className="text-[10px] text-slate-500 font-medium">
                      Regional Scrutiny Cell • WRO
                    </span>
                  </div>
                </div>

                <p className="text-[11px] text-slate-600 leading-relaxed font-medium">
                  Verification desk authority: Dual-track OCR scrutiny, Core Banking SFMS telemetry reconciliation, discrepancy flagging, and notice issuance.
                </p>

                <div className="p-2.5 bg-slate-50 rounded border border-slate-200 space-y-1.5 text-[11px]">
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase font-bold block">Official ID:</span>
                    <span className="font-mono text-slate-800 font-semibold">{supervisorUsername}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase font-bold block">Passcode / 2FA Token:</span>
                    <span className="font-mono text-slate-500">{supervisorPassword}</span>
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-200/70">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleLoginSubmit("supervisor");
                  }}
                  disabled={isSubmitting}
                  className="w-full py-2 px-3 rounded-md bg-[#D97706] hover:bg-[#B45309] text-white text-xs font-bold transition flex items-center justify-center gap-1.5 cursor-pointer shadow-xs disabled:opacity-75"
                >
                  <UserCheck className="w-3.5 h-3.5" />
                  <span>Login as Supervisor &rarr;</span>
                </button>
              </div>
            </div>

          </div>

          {/* Security & Regulatory Clearance Notice */}
          <div className="p-3 bg-slate-50 border border-slate-200 rounded-md flex items-center justify-between text-[11px] text-slate-500">
            <div className="flex items-center gap-2">
              <KeyRound className="w-4 h-4 text-slate-400" />
              <span>TLS 1.3 256-Bit Cryptographic Session • Government NIC SSO Protocol</span>
            </div>
            <span className="font-mono font-bold text-[#0B2545]">SEC-FDR-2026</span>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-[#F8FAFC] border-t border-slate-200 flex items-center justify-between">
          <span className="text-[11px] text-slate-500">
            Currently active session: <strong className="text-slate-800 capitalize">{activeRole === "admin" ? "Administrator" : "Supervisor"}</strong>
          </span>
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900 cursor-pointer"
          >
            Cancel
          </button>
        </div>

      </div>
    </div>
  );
};
