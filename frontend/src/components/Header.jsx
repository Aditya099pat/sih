import { useState } from "react";
import {
  Search,
  Bell,
  ChevronDown,
  AlertTriangle,
  X,
  PhoneCall,
  Shield,
  ShieldCheck,
  Lock,
  KeyRound,
  UserCheck
} from "lucide-react";
import { AicteLogo } from "./AicteLogo";

export const Header = ({
  searchQuery,
  onSearchChange,
  selectedYear,
  onYearChange,
  activeRole = "admin",
  onRoleChange,
  onOpenAiCopilot,
  onOpenDigitalSignature,
  onOpenLoginPortal
}) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [notificationsRead, setNotificationsRead] = useState(false);
  const [showLoginMenu, setShowLoginMenu] = useState(false);

  return (
    <div className="sticky top-0 z-40 w-full select-none">
      {/* Top National Tricolor Stripe */}
      <div className="h-1 w-full bg-gradient-to-r from-[#FF9933] via-white to-[#138808]" />

      {/* Official Government of India Top Strip */}
      <div className="bg-[#F8FAFC] border-b border-[#E2E8F0] px-4 lg:px-8 py-1.5 text-[11px] text-slate-500 flex items-center justify-between">
        <div className="flex items-center gap-2 font-medium">
          <span className="flex items-center gap-1.5 text-[#0F172A] font-semibold">
            <span className="inline-block w-4 h-2.5 rounded-xs overflow-hidden border border-slate-300">
              <span className="block h-[3.3px] bg-[#FF9933]" />
              <span className="block h-[3.3px] bg-white flex items-center justify-center">
                <span className="w-1 h-1 rounded-full bg-[#000080]" />
              </span>
              <span className="block h-[3.3px] bg-[#138808]" />
            </span>
            <span>भारत सरकार</span>
            <span className="text-slate-300">|</span>
            <span>Government of India</span>
            <span className="text-slate-300">|</span>
            <span className="text-[#0B2545] font-bold">Ministry of Education</span>
          </span>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden md:flex items-center gap-1.5 text-amber-900 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
            <AlertTriangle className="w-3 h-3 text-[#D97706]" />
            <span className="font-semibold text-[10px] uppercase tracking-wide">Statutory Mandate:</span>
            <span className="text-[10px]">Joint Lien Pledge Mandatory under APH 2025-26</span>
          </div>

          <div className="hidden sm:flex items-center gap-3">
            <a href="tel:1800113355" className="hover:text-[#0B2545] flex items-center gap-1">
              <PhoneCall className="w-3 h-3 text-[#0B2545]" />
              <span>Helpline: 1800-11-3355</span>
            </a>
            <span className="text-slate-300">|</span>
            <div className="flex items-center gap-1 text-[10px] font-semibold">
              <span className="hover:text-[#0B2545] cursor-pointer">A-</span>
              <span className="hover:text-[#0B2545] cursor-pointer">A</span>
              <span className="hover:text-[#0B2545] cursor-pointer">A+</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Administrative Header Bar */}
      <header className="flex h-16 w-full items-center justify-between border-b border-[#E2E8F0] bg-white px-4 lg:px-8 shadow-none">
        {/* Brand & Council Identity */}
        <div className="flex items-center gap-3 shrink-0">
          <AicteLogo size={38} />
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <span className="font-bold text-[#0B2545] tracking-tight text-sm lg:text-base font-sans">
                AICTE
              </span>
              <span className="text-slate-300 text-xs">•</span>
              <span className="font-semibold text-[#0F172A] text-xs lg:text-sm">
                अखिल भारतीय तकनीकी शिक्षा परिषद
              </span>
            </div>
            <div className="flex items-center gap-1.5 text-[11px] text-slate-500">
              <span>Security Deposit &amp; FDR Management Portal</span>
              <span className="text-slate-300">•</span>
              <span className="text-[11px] font-medium text-slate-500">Regulation Bureau</span>
            </div>
          </div>
        </div>

        {/* Global Search & Financial Year Filter with Distinct Separation (Space Between) */}
        <div className="hidden md:flex items-center flex-1 max-w-2xl mx-6 gap-3">
          {/* Standalone Search Bar with full rounded-md */}
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search by Institute PID, FDR No., Bank, Branch or IFSC..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-xs lg:text-sm bg-[#F8FAFC] border border-[#E2E8F0] rounded-md focus:outline-none focus:ring-1 focus:ring-[#0B2545] focus:border-[#0B2545] focus:bg-white transition-all text-[#0F172A] placeholder-slate-400 font-sans shadow-xs"
            />
          </div>

          {/* Standalone Financial/Academic Year Selector with clear gap and full rounded-md */}
          <div className="relative shrink-0">
            <select
              value={selectedYear}
              onChange={(e) => onYearChange(e.target.value)}
              className="appearance-none bg-[#F8FAFC] hover:bg-slate-100 border border-[#E2E8F0] rounded-md px-3.5 py-2 text-xs font-semibold text-[#0B2545] pr-8 cursor-pointer focus:outline-none focus:border-[#0B2545] shadow-xs"
            >
              <option value="AY 2025-26 | Phase-1">AY 2025-26 (Active Phase-1)</option>
              <option value="AY 2024-25 | Annual">AY 2024-25 (Audited)</option>
              <option value="AY 2023-24 | Historical">AY 2023-24 (Archive)</option>
            </select>
            <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-500 pointer-events-none" />
          </div>
        </div>

        {/* Action Controls & Officer Login Portal */}
        <div className="flex items-center gap-3 shrink-0">
          {/* AI Regulatory Copilot Quick Button */}
          <button
            onClick={onOpenAiCopilot}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-blue-50 text-[#0B2545] hover:bg-blue-100 border border-blue-200 transition text-xs font-bold cursor-pointer"
            title="Open AI Regulatory Copilot (APH Assistant)"
          >
            <span className="text-[#D97706]">✦</span>
            <span className="hidden sm:inline">AI Copilot</span>
          </button>

          {/* e-Sign / Class-3 DSC quick button */}
          <button
            onClick={onOpenDigitalSignature}
            className="hidden sm:flex items-center gap-1.5 px-2.5 py-1.5 rounded-md bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200 transition text-xs font-semibold cursor-pointer"
            title="Apply Aadhaar e-Sign or Class-3 DSC"
          >
            <span>✍️</span>
            <span className="text-[11px]">e-Sign</span>
          </button>

          {/* Notification Bell */}
          <div className="relative">
            <button
              onClick={() => {
                setShowNotifications(!showNotifications);
                if (!showNotifications) setNotificationsRead(true);
              }}
              className="relative p-2 rounded-md text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-colors cursor-pointer border border-transparent hover:border-[#E2E8F0]"
              aria-label="Notifications"
            >
              <Bell className="w-5 h-5 text-slate-500" />
              {!notificationsRead && (
                <span className="absolute top-1 right-1 flex h-4 w-4 items-center justify-center rounded-full bg-[#D97706] text-[10px] font-bold text-white">
                  2
                </span>
              )}
            </button>

            {/* Notifications Dropdown */}
            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 sm:w-96 rounded-md border border-[#E2E8F0] bg-white p-3 shadow-lg z-50 animate-in fade-in slide-in-from-top-2">
                <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-100">
                  <span className="text-xs font-bold text-[#0F172A] uppercase tracking-wider">
                    Statutory Alerts (2)
                  </span>
                  <button
                    onClick={() => setShowNotifications(false)}
                    className="p-1 rounded text-slate-400 hover:text-slate-600 cursor-pointer"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                <div className="space-y-2 max-h-72 overflow-y-auto">
                  <div className="p-2.5 rounded-md bg-[#FFFBEB] border border-[#FDE68A] text-xs">
                    <div className="flex items-center gap-1.5 text-[#D97706] font-bold mb-1">
                      <AlertTriangle className="w-4 h-4 shrink-0" />
                      <span>FDR-SBIN-2018-09 Maturing Soon</span>
                    </div>
                    <p className="text-amber-900 text-[11px] leading-relaxed">
                      Instrument of ₹35.00 Lakhs reaches 8-year term on 15 Dec 2026. Action required: Affidavit 6 submission or Phase-5 Rollover.
                    </p>
                  </div>

                  <div className="p-2.5 rounded-md bg-[#FEF2F2] border border-[#FECACA] text-xs">
                    <div className="flex items-center gap-1.5 text-[#DC2626] font-bold mb-1">
                      <AlertTriangle className="w-4 h-4 shrink-0" />
                      <span>FDR-CNRB-2022-07 Discrepancy Flagged</span>
                    </div>
                    <p className="text-rose-900 text-[11px] leading-relaxed">
                      Scrutiny detected lien clause text mismatch in Canara Bank instrument. Flagged for RO Mumbai review.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* OFFICIAL LOGIN PORTAL: Replaces Role:Applicant/Trust & Dr. Rajesh text with Administrator & Supervisor Login */}
          <div className="relative pl-2 border-l border-[#E2E8F0]">
            <button
              onClick={() => setShowLoginMenu(!showLoginMenu)}
              className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-slate-50 hover:bg-slate-100 border border-[#E2E8F0] hover:border-[#0B2545] transition-all cursor-pointer shadow-2xs"
              title="Official Login Portal - Administrator & Supervisor"
            >
              <div className="w-6 h-6 rounded bg-[#0B2545] text-white flex items-center justify-center text-xs font-bold shrink-0">
                {activeRole === "supervisor" ? (
                  <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
                ) : (
                  <Shield className="w-3.5 h-3.5 text-amber-400" />
                )}
              </div>
              <div className="flex flex-col text-left">
                <div className="flex items-center gap-1.5">
                  <span className="text-xs font-bold text-[#0B2545] leading-none">
                    {activeRole === "supervisor" ? "Supervisor" : "Administrator"}
                  </span>
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                </div>
                <span className="text-[10px] text-slate-500 leading-tight">
                  {activeRole === "supervisor" ? "Scrutiny Desk · WRO" : "HQ Central Bureau"}
                </span>
              </div>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400 ml-1" />
            </button>

            {/* Quick Login Menu Dropdown */}
            {showLoginMenu && (
              <div className="absolute right-0 mt-2 w-72 rounded-md border border-[#E2E8F0] bg-white p-3 shadow-xl z-50 animate-in fade-in slide-in-from-top-2 space-y-2">
                <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    Official Login Portal
                  </span>
                  <span className="text-[10px] text-emerald-700 bg-emerald-50 font-bold px-1.5 py-0.5 rounded border border-emerald-200">
                    Active Session
                  </span>
                </div>

                <div className="space-y-1">
                  {/* Administrator Login Option */}
                  <button
                    onClick={() => {
                      if (onRoleChange) onRoleChange("admin");
                      setShowLoginMenu(false);
                    }}
                    className={`w-full flex items-start gap-2.5 p-2 rounded-md transition text-left cursor-pointer ${
                      activeRole === "admin"
                        ? "bg-blue-50 border border-blue-200"
                        : "hover:bg-slate-50 border border-transparent"
                    }`}
                  >
                    <div className="w-7 h-7 rounded bg-[#0B2545] text-white flex items-center justify-center shrink-0 mt-0.5">
                      <Shield className="w-4 h-4 text-amber-400" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-[#0B2545] flex items-center gap-1.5">
                        <span>Administrator Login</span>
                        {activeRole === "admin" && <span className="text-[10px] text-emerald-600 font-bold">✓</span>}
                      </div>
                      <p className="text-[10px] text-slate-500 leading-tight mt-0.5">
                        Central Bureau Admin • Policy, Sanctions &amp; RPGF Release
                      </p>
                    </div>
                  </button>

                  {/* Supervisor Login Option */}
                  <button
                    onClick={() => {
                      if (onRoleChange) onRoleChange("supervisor");
                      setShowLoginMenu(false);
                    }}
                    className={`w-full flex items-start gap-2.5 p-2 rounded-md transition text-left cursor-pointer ${
                      activeRole === "supervisor"
                        ? "bg-amber-50 border border-amber-200"
                        : "hover:bg-slate-50 border border-transparent"
                    }`}
                  >
                    <div className="w-7 h-7 rounded bg-[#D97706] text-white flex items-center justify-center shrink-0 mt-0.5">
                      <ShieldCheck className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-amber-950 flex items-center gap-1.5">
                        <span>Supervisor Login</span>
                        {activeRole === "supervisor" && <span className="text-[10px] text-emerald-600 font-bold">✓</span>}
                      </div>
                      <p className="text-[10px] text-slate-500 leading-tight mt-0.5">
                        Scrutiny Supervisor • Dual-Track OCR, CBS &amp; Verification
                      </p>
                    </div>
                  </button>
                </div>

                <div className="pt-2 border-t border-slate-100">
                  <button
                    onClick={() => {
                      setShowLoginMenu(false);
                      if (onOpenLoginPortal) onOpenLoginPortal();
                    }}
                    className="w-full py-2 px-2 bg-[#0B2545] hover:bg-[#07182D] text-white rounded text-xs font-bold transition flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
                  >
                    <KeyRound className="w-3.5 h-3.5 text-amber-400" />
                    <span>Open Official Login Portal &rarr;</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </header>
    </div>
  );
};
