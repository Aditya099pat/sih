import { useState } from "react";
import { Search, Bell, ChevronDown, AlertTriangle, X, PhoneCall } from "lucide-react";
import { AicteLogo } from "./AicteLogo";
export const Header = ({
  searchQuery,
  onSearchChange,
  selectedYear,
  onYearChange
}) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [notificationsRead, setNotificationsRead] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [language, setLanguage] = useState("EN");
  return <div className="sticky top-0 z-40 w-full select-none">
      {
    /* Top National Tricolor Stripe */
  }
      <div className="h-1 w-full bg-gradient-to-r from-[#FF9933] via-white to-[#138808]" />

      {
    /* Official Government of India Top Strip (Reference: AICTE Official Portals) */
  }
      <div className="bg-[#F8FAFC] border-b border-[#E2E8F0] px-4 lg:px-8 py-1.5 text-[11px] text-[#64748B] flex items-center justify-between">
        <div className="flex items-center gap-2 font-medium">
          {
    /* India Flag mini icon */
  }
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
            <span className="text-[#0D3B66]">Ministry of Education</span>
          </span>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden md:flex items-center gap-1.5 text-amber-800 bg-amber-50 px-2 py-0.5 rounded border border-amber-200/80">
            <AlertTriangle className="w-3 h-3 text-[#E65100]" />
            <span className="font-semibold text-[10px] uppercase tracking-wide">Statutory Mandate:</span>
            <span className="text-[10px]">Joint Lien Pledge Mandatory under APH 2025-26</span>
          </div>

          <div className="hidden sm:flex items-center gap-3">
            <a href="tel:1800113355" className="hover:text-[#0D3B66] flex items-center gap-1">
              <PhoneCall className="w-3 h-3 text-[#0D3B66]" />
              <span>Helpline: 1800-11-3355</span>
            </a>
            <span className="text-slate-300">|</span>
            <button
    onClick={() => setLanguage((l) => l === "EN" ? "HI" : "EN")}
    className="hover:text-[#0D3B66] font-semibold cursor-pointer"
  >
              {language === "EN" ? "\u0939\u093F\u0928\u094D\u0926\u0940 (Hindi)" : "English (EN)"}
            </button>
            <span className="text-slate-300">|</span>
            <div className="flex items-center gap-1 text-[10px] font-semibold">
              <span className="hover:text-[#0D3B66] cursor-pointer">A-</span>
              <span className="hover:text-[#0D3B66] cursor-pointer">A</span>
              <span className="hover:text-[#0D3B66] cursor-pointer">A+</span>
            </div>
          </div>
        </div>
      </div>

      {
    /* Main Administrative Header Bar */
  }
      <header className="flex h-16 w-full items-center justify-between border-b border-[#E2E8F0] bg-white px-4 lg:px-8 shadow-xs">
        {
    /* Brand & Council Identity */
  }
        <div className="flex items-center gap-3 shrink-0">
          <AicteLogo size={40} />
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <span className="font-bold text-[#0D3B66] tracking-tight text-sm lg:text-base font-sans">
                AICTE
              </span>
              <span className="text-slate-300 text-xs">•</span>
              <span className="font-semibold text-[#0F172A] text-xs lg:text-sm">
                अखिल भारतीय तकनीकी शिक्षा परिषद
              </span>
            </div>
            <div className="flex items-center gap-1.5 text-[11px] text-[#64748B]">
              <span>Security Deposit & FDR Management Portal</span>
              <span className="px-1.5 py-0.2 rounded font-mono font-semibold text-[10px] bg-blue-50 text-[#0D3B66] border border-blue-200">
                PS26265
              </span>
              <span className="text-slate-300">•</span>
              <span className="text-[11px] font-medium text-slate-500">Regulation Bureau</span>
            </div>
          </div>
        </div>

        {
    /* Global Search & Academic Context Filter */
  }
        <div className="hidden md:flex items-center flex-1 max-w-xl mx-6">
          <div className="relative w-full flex items-center">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#64748B]" />
              <input
    type="text"
    placeholder="Search by Institute ID, FDR No., Bank, Branch or IFSC..."
    value={searchQuery}
    onChange={(e) => onSearchChange(e.target.value)}
    className="w-full pl-9 pr-4 py-2 text-xs lg:text-sm bg-[#F8FAFC] border border-[#E2E8F0] rounded-l-lg focus:outline-none focus:ring-1 focus:ring-[#0D3B66] focus:border-[#0D3B66] focus:bg-white transition-all text-[#0F172A] placeholder-[#64748B]"
  />
            </div>

            {
    /* Academic Year Selector */
  }
            <div className="relative">
              <select
    value={selectedYear}
    onChange={(e) => onYearChange(e.target.value)}
    className="appearance-none bg-[#F1F5F9] border-y border-r border-[#E2E8F0] rounded-r-lg px-3 py-2 text-xs font-semibold text-[#0D3B66] pr-7 hover:bg-slate-200 cursor-pointer focus:outline-none"
  >
                <option value="AY 2025-26 | Phase-1">AY 2025-26 (Active Phase-1)</option>
                <option value="AY 2024-25 | Annual">AY 2024-25 (Audited)</option>
                <option value="AY 2023-24 | Historical">AY 2023-24 (Archive)</option>
              </select>
              <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#64748B] pointer-events-none" />
            </div>
          </div>
        </div>

        {
    /* Action Controls & Signatory Officer Profile */
  }
        <div className="flex items-center gap-3 shrink-0">
          {
    /* Notification Bell */
  }
          <div className="relative">
            <button
    onClick={() => {
      setShowNotifications(!showNotifications);
      if (!showNotifications) setNotificationsRead(true);
    }}
    className="relative p-2 rounded-lg text-[#64748B] hover:text-[#0F172A] hover:bg-slate-100 transition-colors cursor-pointer border border-transparent hover:border-[#E2E8F0]"
    aria-label="Notifications"
  >
              <Bell className="w-5 h-5 text-[#64748B]" />
              {!notificationsRead && <span className="absolute top-1 right-1 flex h-4 w-4 items-center justify-center rounded-full bg-[#E65100] text-[10px] font-bold text-white shadow-xs">
                  2
                </span>}
            </button>

            {
    /* Notifications Dropdown */
  }
            {showNotifications && <div className="absolute right-0 mt-2 w-80 sm:w-96 rounded-xl border border-[#E2E8F0] bg-white p-3 shadow-lg z-50 animate-in fade-in slide-in-from-top-2">
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
                  <div className="p-2.5 rounded-lg bg-[#FFFBEB] border border-[#FDE68A] text-xs">
                    <div className="flex items-center gap-1.5 text-[#D97706] font-bold mb-1">
                      <AlertTriangle className="w-4 h-4 shrink-0" />
                      <span>FDR-SBIN-2018-09 Maturing Soon</span>
                    </div>
                    <p className="text-[#92400E] text-[11px] leading-relaxed">
                      Instrument of ₹35.00 Lakhs reaches 8-year term on 15 Dec 2026. Action required: Affidavit 6 submission or Phase-5 Rollover.
                    </p>
                  </div>

                  <div className="p-2.5 rounded-lg bg-[#FEF2F2] border border-[#FECACA] text-xs">
                    <div className="flex items-center gap-1.5 text-[#DC2626] font-bold mb-1">
                      <AlertTriangle className="w-4 h-4 shrink-0" />
                      <span>FDR-CNRB-2022-07 Discrepancy Flagged</span>
                    </div>
                    <p className="text-[#991B1B] text-[11px] leading-relaxed">
                      Scrutiny detected lien clause text mismatch in Canara Bank instrument. Flagged for RO Mumbai review.
                    </p>
                  </div>
                </div>
              </div>}
          </div>

          {
    /* Regional Officer Profile Pill */
  }
          <div className="flex items-center gap-2.5 pl-2 border-l border-[#E2E8F0]">
            <div className="w-8 h-8 rounded-full bg-[#0D3B66] text-white flex items-center justify-center font-bold text-xs ring-2 ring-slate-100">
              VN
            </div>
            <div className="hidden lg:flex flex-col text-left">
              <span className="text-xs font-bold text-[#0F172A] leading-tight">
                Sh. V. K. Nambiar
              </span>
              <span className="text-[10px] text-[#64748B]">
                ADG · WRO Mumbai Scrutiny Desk
              </span>
            </div>
          </div>
        </div>
      </header>
    </div>;
};
