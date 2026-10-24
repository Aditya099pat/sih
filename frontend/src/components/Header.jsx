import { useState } from "react";
import { Search, Bell, ChevronDown, AlertTriangle, X, PhoneCall } from "lucide-react";
import { AicteLogo } from "./AicteLogo";

export const Header = ({
  searchQuery,
  onSearchChange,
  selectedYear,
  onYearChange,
  activeRole,
  onRoleChange,
  onOpenAiCopilot,
  onOpenDigitalSignature
}) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [notificationsRead, setNotificationsRead] = useState(false);
  const [language, setLanguage] = useState("EN");

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
            <button
              onClick={() => setLanguage((l) => (l === "EN" ? "HI" : "EN"))}
              className="hover:text-[#0B2545] font-semibold cursor-pointer"
            >
              {language === "EN" ? "हिन्दी (Hindi)" : "English (EN)"}
            </button>
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
              <span className="px-1.5 py-0.2 rounded font-mono font-semibold text-[10px] bg-blue-50 text-[#0B2545] border border-blue-200">
                PS26265
              </span>
              <span className="text-slate-300">•</span>
              <span className="text-[11px] font-medium text-slate-500">Regulation Bureau</span>
            </div>
          </div>
        </div>

        {/* Global Search & Academic Context Filter */}
        <div className="hidden md:flex items-center flex-1 max-w-xl mx-6">
          <div className="relative w-full flex items-center">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search by Institute PID, FDR No., Bank, Branch or IFSC..."
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                className="w-full pl-9 pr-4 py-2 text-xs lg:text-sm bg-[#F8FAFC] border border-[#E2E8F0] rounded-l-md focus:outline-none focus:ring-1 focus:ring-[#0B2545] focus:border-[#0B2545] focus:bg-white transition-all text-[#0F172A] placeholder-slate-400 font-sans"
              />
            </div>

            {/* Academic Year Selector */}
            <div className="relative">
              <select
                value={selectedYear}
                onChange={(e) => onYearChange(e.target.value)}
                className="appearance-none bg-[#F1F5F9] border-y border-r border-[#E2E8F0] rounded-r-md px-3 py-2 text-xs font-semibold text-[#0B2545] pr-7 hover:bg-slate-200 cursor-pointer focus:outline-none"
              >
                <option value="AY 2025-26 | Phase-1">AY 2025-26 (Active Phase-1)</option>
                <option value="AY 2024-25 | Annual">AY 2024-25 (Audited)</option>
                <option value="AY 2023-24 | Historical">AY 2023-24 (Archive)</option>
              </select>
              <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-500 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Action Controls & Signatory Officer Profile */}
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

          {/* RBAC Role Selector Dropdown */}
          <div className="flex items-center gap-2 pl-2 border-l border-[#E2E8F0]">
            <div className="relative">
              <select
                value={activeRole || "trust"}
                onChange={(e) => onRoleChange && onRoleChange(e.target.value)}
                className="appearance-none bg-slate-100 border border-[#E2E8F0] hover:border-[#0B2545] rounded-md px-2.5 py-1.5 text-xs font-bold text-[#0B2545] pr-7 cursor-pointer focus:outline-none"
                title="Switch Role-Based Access Control Profile"
              >
                <option value="trust">🏛️ Role: Applicant / Trust</option>
                <option value="scrutiny">🔍 Role: Scrutiny Officer</option>
                <option value="admin">⚖️ Role: Bureau Admin / RO</option>
                <option value="bank">🏦 Role: Bank Auditor</option>
              </select>
              <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-500 pointer-events-none" />
            </div>

            <div className="hidden xl:flex flex-col text-left">
              <span className="text-xs font-bold text-[#0F172A] leading-tight">
                {activeRole === "trust"
                  ? "Dr. Rajesh K. Sharma"
                  : activeRole === "scrutiny"
                  ? "Sh. V. K. Nambiar"
                  : activeRole === "admin"
                  ? "Dr. Rameshwar V. Rao"
                  : "Sh. Anupam Sengupta"}
              </span>
              <span className="text-[10px] text-slate-500">
                {activeRole === "trust"
                  ? "Registrar · Bharati Vidya"
                  : activeRole === "scrutiny"
                  ? "ADG · Scrutiny Desk"
                  : activeRole === "admin"
                  ? "Regional Director (WRO)"
                  : "SBI Central Treasury"}
              </span>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
};
