import { useState, useEffect, useRef, useMemo } from "react";
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
  UserCheck,
  Building2,
  Clock,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  Layers
} from "lucide-react";
import { AicteLogo } from "./AicteLogo";
import { FORMAT_COMPACT_CURRENCY, FORMAT_INDIAN_CURRENCY } from "@data/mockData";

export const Header = ({
  searchQuery = "",
  onSearchChange,
  instruments = [],
  onViewInstrument,
  onSelectInstrumentForScrutiny,
  onGoToDashboard,
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
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [currentTime, setCurrentTime] = useState("");
  const [fontScale, setFontScale] = useState(100);

  const searchContainerRef = useRef(null);
  const searchInputRef = useRef(null);

  // Live IST Clock
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const options = {
        timeZone: "Asia/Kolkata",
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false
      };
      setCurrentTime(new Intl.DateTimeFormat("en-IN", options).format(now) + " IST");
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Keyboard shortcut listener ('/' to focus search, 'Escape' to dismiss dropdown)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "/" && document.activeElement !== searchInputRef.current && e.target.tagName !== "INPUT" && e.target.tagName !== "TEXTAREA") {
        e.preventDefault();
        searchInputRef.current?.focus();
      } else if (e.key === "Escape") {
        setIsSearchFocused(false);
        searchInputRef.current?.blur();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Close search results dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(e.target)) {
        setIsSearchFocused(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Filter instruments for live autocomplete dropdown across all 1,350 records
  const searchResults = useMemo(() => {
    if (!searchQuery || !searchQuery.trim()) return [];
    const q = searchQuery.toLowerCase().trim();

    return instruments.filter((inst) =>
      (inst.ref && inst.ref.toLowerCase().includes(q)) ||
      (inst.instituteCode && inst.instituteCode.toLowerCase().includes(q)) ||
      (inst.instituteName && inst.instituteName.toLowerCase().includes(q)) ||
      (inst.bankName && inst.bankName.toLowerCase().includes(q)) ||
      (inst.branchName && inst.branchName.toLowerCase().includes(q)) ||
      (inst.ifsc && inst.ifsc.toLowerCase().includes(q)) ||
      (inst.city && inst.city.toLowerCase().includes(q)) ||
      (inst.state && inst.state.toLowerCase().includes(q)) ||
      (inst.discipline && inst.discipline.toLowerCase().includes(q)) ||
      (inst.fdrReceiptNo && inst.fdrReceiptNo.toLowerCase().includes(q)) ||
      (inst.region && inst.region.toLowerCase().includes(q))
    );
  }, [instruments, searchQuery]);

  // Adjust document font scale
  const handleFontChange = (scale) => {
    setFontScale(scale);
    document.documentElement.style.fontSize = `${(scale / 100) * 16}px`;
  };

  const showDropdown = isSearchFocused && searchQuery.trim().length > 0;

  return (
    <div className="sticky top-0 z-40 w-full select-none shadow-xs">
      {/* Top National Tricolor Stripe */}
      <div className="h-1.5 w-full bg-gradient-to-r from-[#FF9933] via-white to-[#138808]" />

      {/* Official Government of India Top Strip */}
      <div className="bg-[#F8FAFC] border-b border-[#E2E8F0] px-4 lg:px-8 py-1.5 text-[11px] text-slate-500 flex items-center justify-between">
        <div className="flex items-center gap-2 font-medium">
          <span className="flex items-center gap-1.5 text-[#0F172A] font-semibold">
            <span className="inline-block w-4 h-2.5 rounded-xs overflow-hidden border border-slate-300 shadow-2xs">
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

          <span className="hidden xl:inline-flex items-center gap-1.5 text-slate-400 text-[10.5px] ml-2 pl-2 border-l border-slate-200">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-emerald-700 font-semibold font-mono">Core Banking SFMS Gateway: Online</span>
          </span>
        </div>

        <div className="flex items-center gap-3.5">
          {/* Statutory Mandate Badge */}
          <div className="hidden lg:flex items-center gap-1.5 text-amber-900 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
            <AlertTriangle className="w-3 h-3 text-[#D97706] shrink-0" />
            <span className="font-semibold text-[10px] uppercase tracking-wide">Statutory Mandate:</span>
            <span className="text-[10px]">Joint Lien Mandatory under APH 2025-26</span>
          </div>

          {/* Live Indian Standard Time (IST) */}
          <div className="hidden sm:flex items-center gap-1 font-mono text-[10.5px] text-slate-500 bg-slate-100 px-2 py-0.5 rounded border border-slate-200">
            <Clock className="w-3 h-3 text-[#0B2545]" />
            <span>{currentTime || "IST (UTC+05:30)"}</span>
          </div>

          {/* Helpline Telephone */}
          <div className="hidden sm:flex items-center gap-2">
            <a
              href="tel:1800113355"
              className="hover:text-[#0B2545] text-slate-600 flex items-center gap-1 font-medium transition"
              title="National Technical Education Helpline"
            >
              <PhoneCall className="w-3 h-3 text-[#0B2545]" />
              <span className="font-mono text-[10.5px]">1800-11-3355</span>
            </a>
            <span className="text-slate-300">|</span>
            {/* Accessibility Font Zoom (A-, A, A+) */}
            <div className="flex items-center gap-1 text-[10px] font-semibold text-slate-600">
              <button
                onClick={() => handleFontChange(90)}
                className={`px-1 rounded hover:bg-slate-200 cursor-pointer ${fontScale === 90 ? "bg-slate-200 font-bold text-[#0B2545]" : ""}`}
                title="Decrease Font Size"
              >
                A-
              </button>
              <button
                onClick={() => handleFontChange(100)}
                className={`px-1 rounded hover:bg-slate-200 cursor-pointer ${fontScale === 100 ? "bg-slate-200 font-bold text-[#0B2545]" : ""}`}
                title="Normal Font Size"
              >
                A
              </button>
              <button
                onClick={() => handleFontChange(110)}
                className={`px-1 rounded hover:bg-slate-200 cursor-pointer ${fontScale === 110 ? "bg-slate-200 font-bold text-[#0B2545]" : ""}`}
                title="Increase Font Size"
              >
                A+
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Administrative Header Bar */}
      <header className="flex h-16 w-full items-center justify-between border-b border-[#E2E8F0] bg-white px-4 lg:px-8">
        {/* Brand & Council Identity */}
        <div className="flex items-center gap-3 shrink-0">
          <div className="relative">
            <AicteLogo size={38} />
            <div className="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-emerald-600 border-2 border-white rounded-full flex items-center justify-center text-[7px] text-white font-bold" title="Verified Portal">
              ✓
            </div>
          </div>
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
              <span className="text-[10px] font-semibold text-[#0B2545] bg-blue-50 px-1.5 py-0.2 rounded border border-blue-200">
                Regulation Bureau
              </span>
            </div>
          </div>
        </div>

        {/* Operational Global Search with Real-Time Autocomplete from 1,350 Records */}
        <div ref={searchContainerRef} className="hidden md:flex items-center flex-1 max-w-2xl mx-6 gap-3 relative">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
            <input
              ref={searchInputRef}
              type="text"
              placeholder="Search 1,350 records by Institute PID, FDR No., Bank, Branch or IFSC..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              onFocus={() => setIsSearchFocused(true)}
              className="w-full pl-9 pr-14 py-2 text-xs lg:text-sm bg-[#F8FAFC] border border-[#E2E8F0] rounded-md focus:outline-none focus:ring-2 focus:ring-[#0B2545]/20 focus:border-[#0B2545] focus:bg-white transition-all text-[#0F172A] placeholder-slate-400 font-sans shadow-xs"
            />
            {/* Clear Button (X) or Keyboard Shortcut Badge */}
            {searchQuery ? (
              <button
                onClick={() => {
                  onSearchChange("");
                  searchInputRef.current?.focus();
                }}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 p-1 hover:bg-slate-200 rounded text-slate-400 hover:text-slate-700 transition cursor-pointer"
                title="Clear search"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            ) : (
              <kbd className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[10px] bg-slate-200/80 text-slate-500 px-1.5 py-0.5 rounded font-mono pointer-events-none border border-slate-300">
                /
              </kbd>
            )}
          </div>

          {/* Standalone Financial/Academic Year Selector */}
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

          {/* Autocomplete Search Dropdown Floating Panel */}
          {showDropdown && (
            <div className="absolute left-0 right-0 top-full mt-1.5 bg-white rounded-lg shadow-xl border border-slate-200 max-h-[460px] overflow-y-auto z-50 animate-in fade-in-50 duration-150">
              <div className="p-2.5 bg-slate-50 border-b border-slate-200 flex items-center justify-between text-[11px]">
                <div className="font-semibold text-slate-700 flex items-center gap-1.5">
                  <Search className="w-3.5 h-3.5 text-[#0B2545]" />
                  <span>
                    Found <strong className="text-[#0B2545]">{searchResults.length}</strong> matching instruments in 1,350 repository records
                  </span>
                </div>
                <span className="text-[10px] text-slate-400 font-mono">Press Esc to close</span>
              </div>

              {searchResults.length === 0 ? (
                <div className="p-6 text-center text-slate-500 text-xs">
                  <AlertCircle className="w-6 h-6 text-slate-400 mx-auto mb-1.5" />
                  <p className="font-medium text-slate-700">No matching deposit records found</p>
                  <p className="text-[11px] text-slate-400 mt-0.5">
                    Try searching by PID (e.g. 1-1029384), FDR Receipt, Bank name, or City.
                  </p>
                </div>
              ) : (
                <div className="divide-y divide-slate-100">
                  {searchResults.slice(0, 6).map((inst) => (
                    <div
                      key={inst.id}
                      onClick={() => {
                        if (onViewInstrument) onViewInstrument(inst);
                        setIsSearchFocused(false);
                      }}
                      className="p-3 hover:bg-blue-50/60 cursor-pointer transition flex items-start justify-between gap-3 group"
                    >
                      <div className="space-y-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="font-bold text-slate-900 text-xs group-hover:text-[#0B2545] transition">
                            {inst.instituteName}
                          </span>
                          <span className="font-mono text-[10px] bg-slate-100 text-[#0B2545] font-bold px-1.5 py-0.2 rounded border border-slate-200">
                            PID: {inst.instituteCode}
                          </span>
                          <span className="text-[10px] text-slate-500 bg-slate-50 px-1.5 py-0.2 rounded border border-slate-200 font-medium">
                            {inst.region} Bureau
                          </span>
                        </div>

                        <div className="text-[11px] text-slate-600 flex items-center gap-2 flex-wrap">
                          <span className="font-mono font-medium text-slate-800">{inst.ref}</span>
                          <span className="text-slate-300">•</span>
                          <span>{inst.bankName} ({inst.branchName})</span>
                          <span className="text-slate-300">•</span>
                          <span className="font-mono text-[10px] text-slate-500">{inst.ifsc}</span>
                        </div>

                        <div className="text-[10.5px] text-slate-400 flex items-center gap-2">
                          <span>{inst.city}, {inst.state}</span>
                          <span>•</span>
                          <span>Receipt: <code className="font-mono text-slate-600">{inst.fdrReceiptNo}</code></span>
                        </div>
                      </div>

                      <div className="text-right shrink-0 space-y-1">
                        <div className="font-bold text-slate-900 text-xs font-mono">
                          {FORMAT_COMPACT_CURRENCY(inst.principalAmount)}
                        </div>
                        <div>
                          <span className={`inline-block text-[10px] font-bold px-1.5 py-0.5 rounded ${
                            inst.hasDiscrepancy
                              ? "bg-rose-100 text-rose-800"
                              : inst.remainingDays <= 60
                              ? "bg-amber-100 text-amber-800"
                              : "bg-emerald-100 text-emerald-800"
                          }`}>
                            {inst.statutoryStatus}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}

                  {searchResults.length > 6 && (
                    <div className="p-2.5 bg-slate-50 text-center border-t border-slate-200">
                      <button
                        onClick={() => {
                          if (onGoToDashboard) onGoToDashboard();
                          setIsSearchFocused(false);
                        }}
                        className="text-xs font-bold text-[#0B2545] hover:text-[#133E87] flex items-center justify-center gap-1 w-full py-1 cursor-pointer"
                      >
                        <span>View all {searchResults.length} matching instruments in Table</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Action Controls & Officer Login Portal */}
        <div className="flex items-center gap-2.5 shrink-0">
          {/* AI Regulatory Copilot Quick Button */}
          <button
            onClick={onOpenAiCopilot}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-gradient-to-r from-blue-50 to-indigo-50 hover:from-blue-100 hover:to-indigo-100 text-[#0B2545] border border-blue-200 transition text-xs font-bold cursor-pointer shadow-xs"
            title="Open AI Regulatory Copilot (APH Assistant)"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-500 fill-amber-500 animate-pulse" />
            <span className="hidden sm:inline">AI Copilot</span>
            <span className="hidden xl:inline text-[9px] bg-[#0B2545] text-white px-1 py-0.2 rounded font-mono">
              1,350 FDRs
            </span>
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

          {/* Notification Bell with Dynamic Alert Badge */}
          <div className="relative">
            <button
              onClick={() => {
                setShowNotifications(!showNotifications);
                if (!showNotifications) setNotificationsRead(true);
              }}
              className="relative p-2 rounded-md text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-colors cursor-pointer border border-transparent hover:border-[#E2E8F0]"
              aria-label="Notifications"
            >
              <Bell className="w-4 h-4" />
              {!notificationsRead && (
                <span className="absolute top-1.5 right-1.5 flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-rose-600"></span>
                </span>
              )}
            </button>

            {/* Notification Dropdown Panel */}
            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 sm:w-96 rounded-lg bg-white p-3 shadow-xl border border-slate-200 z-50 text-xs">
                <div className="flex items-center justify-between pb-2 border-b border-slate-100 mb-2">
                  <span className="font-bold text-[#0B2545] text-sm">Regulatory Alerts (Live)</span>
                  <span className="text-[10px] font-semibold text-rose-600 bg-rose-50 px-2 py-0.5 rounded border border-rose-200">
                    3 Action Required
                  </span>
                </div>

                <div className="space-y-2 max-h-72 overflow-y-auto">
                  <div className="p-2.5 bg-amber-50/70 border border-amber-200 rounded-md">
                    <div className="flex items-center justify-between font-bold text-amber-900 text-xs">
                      <span>417 Maturing Instruments</span>
                      <span className="text-[10px] bg-amber-200 text-amber-900 px-1.5 py-0.2 rounded font-mono">
                        T-60 Days
                      </span>
                    </div>
                    <p className="text-[11px] text-amber-800 mt-1">
                      Statutory maturity window reached across multi-region portfolios. SCN pre-warnings issued.
                    </p>
                  </div>

                  <div className="p-2.5 bg-rose-50/70 border border-rose-200 rounded-md">
                    <div className="flex items-center justify-between font-bold text-rose-900 text-xs">
                      <span>82 Discrepancies Flagged</span>
                      <span className="text-[10px] bg-rose-200 text-rose-900 px-1.5 py-0.2 rounded font-mono">
                        OCR Review
                      </span>
                    </div>
                    <p className="text-[11px] text-rose-800 mt-1">
                      Dual-track OCR identified missing Member Secretary joint pledge or stamp duty defects.
                    </p>
                  </div>

                  <div className="p-2.5 bg-emerald-50/70 border border-emerald-200 rounded-md">
                    <div className="flex items-center justify-between font-bold text-emerald-900 text-xs">
                      <span>1,000 SFMS Packets Synced</span>
                      <span className="text-[10px] bg-emerald-200 text-emerald-900 px-1.5 py-0.2 rounded font-mono">
                        CBS Heartbeat
                      </span>
                    </div>
                    <p className="text-[11px] text-emerald-800 mt-1">
                      Scheduled Commercial Banks confirmed tripartite inviolate lien status over INFINET network.
                    </p>
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-100 mt-2 text-center">
                  <button
                    onClick={() => setShowNotifications(false)}
                    className="text-[11px] font-bold text-[#0B2545] hover:underline cursor-pointer"
                  >
                    Close Alerts
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* User Profile & Role Switcher */}
          <div className="relative">
            <button
              onClick={() => setShowLoginMenu(!showLoginMenu)}
              className="flex items-center gap-2 pl-2 pr-3 py-1.5 rounded-md border border-[#E2E8F0] hover:bg-slate-50 transition cursor-pointer"
            >
              <div className="w-7 h-7 rounded-md bg-[#0B2545] text-white flex items-center justify-center font-bold text-xs shadow-2xs">
                {activeRole === "supervisor" ? "RS" : "HQ"}
              </div>
              <div className="hidden lg:flex flex-col text-left">
                <span className="text-xs font-bold text-[#0F172A] leading-tight">
                  {activeRole === "supervisor" ? "Regional Supervisor" : "Central Administrator"}
                </span>
                <span className="text-[10px] text-emerald-600 font-semibold leading-none flex items-center gap-1 mt-0.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span>{activeRole === "supervisor" ? "WRO Mumbai Desk" : "AICTE HQ New Delhi"}</span>
                </span>
              </div>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
            </button>

            {/* Login Menu Dropdown */}
            {showLoginMenu && (
              <div className="absolute right-0 mt-2 w-72 rounded-lg bg-white p-3 shadow-xl border border-slate-200 z-50 text-xs space-y-2">
                <div className="pb-2 border-b border-slate-100">
                  <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                    Switch Active Officer Role
                  </div>
                  <div className="text-xs font-bold text-[#0B2545] mt-0.5">
                    Dr. Rajesh K. Sharma (Registrar)
                  </div>
                </div>

                <div className="space-y-1">
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
                        <span>Central Administrator (HQ)</span>
                        {activeRole === "admin" && <span className="text-[10px] text-emerald-600 font-bold">✓</span>}
                      </div>
                      <p className="text-[10px] text-slate-500 leading-tight mt-0.5">
                        Central Bureau Admin • Policy, Sanctions &amp; RPGF Release
                      </p>
                    </div>
                  </button>

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
                        <span>Regional Supervisor (WRO)</span>
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
