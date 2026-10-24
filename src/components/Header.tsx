import React, { useState } from 'react';
import { Search, Bell, ChevronDown, CheckCircle2, AlertTriangle, X, Shield, ExternalLink } from 'lucide-react';
import { AicteLogo } from './AicteLogo';

interface HeaderProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  selectedYear: string;
  onYearChange: (year: string) => void;
  onOpenNotifications?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  searchQuery,
  onSearchChange,
  selectedYear,
  onYearChange
}) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [notificationsRead, setNotificationsRead] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  return (
    <header className="sticky top-0 z-30 flex h-16 w-full items-center justify-between border-b border-slate-200 bg-white px-4 lg:px-6 shadow-xs">
      {/* Zone 1: Brand & Council Identity */}
      <div className="flex items-center gap-3 shrink-0">
        <AicteLogo size={42} />
        <div className="flex flex-col">
          <div className="flex items-center gap-1.5">
            <span className="font-bold text-slate-900 tracking-tight text-sm lg:text-base">AICTE</span>
            <span className="text-slate-400 text-xs">●</span>
            <span className="font-semibold text-slate-800 text-xs lg:text-sm">अखिल भारतीय तकनीकी शिक्षा परिषद</span>
          </div>
          <span className="text-[11px] font-medium text-slate-500 tracking-wide">
            Security Deposit & FDR Lifecycle Portal <span className="text-[#0D3B66] font-semibold">(PS26265)</span>
          </span>
        </div>
      </div>

      {/* Zone 2: Global Search & Statutory Academic Context */}
      <div className="hidden md:flex items-center flex-1 max-w-xl mx-6">
        <div className="relative w-full flex items-center">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search FDR No, PID, Bank, UTR..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full pl-9 pr-4 py-1.5 text-xs lg:text-sm bg-slate-50 border border-slate-200 rounded-l-lg focus:outline-none focus:ring-1 focus:ring-[#0D3B66] focus:border-[#0D3B66] focus:bg-white transition-all text-slate-800 placeholder-slate-400"
            />
          </div>

          {/* Quick Filter: Institutional View */}
          <div className="flex items-center border-y border-r border-slate-200 bg-slate-100 text-xs text-slate-700 px-2.5 py-2 whitespace-nowrap cursor-pointer hover:bg-slate-200 transition-colors">
            <span>Institutional View</span>
            <ChevronDown className="w-3.5 h-3.5 ml-1 text-slate-500" />
          </div>

          {/* Academic Year Selector */}
          <div className="relative">
            <select
              value={selectedYear}
              onChange={(e) => onYearChange(e.target.value)}
              className="appearance-none bg-slate-100 border-y border-r border-slate-200 rounded-r-lg px-3 py-2 text-xs font-medium text-[#0D3B66] pr-6 hover:bg-slate-200 cursor-pointer focus:outline-none"
            >
              <option value="AY 2025-26 | Phase-1">AY 2025-26 | Phase-1</option>
              <option value="AY 2024-25 | Annual">AY 2024-25 | Annual</option>
              <option value="AY 2023-24 | Historical">AY 2023-24 | Historical</option>
            </select>
            <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-500 pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Zone 3: Notifications & Signatory Officer Profile */}
      <div className="flex items-center gap-4 shrink-0">
        {/* Notification Bell */}
        <div className="relative">
          <button
            onClick={() => {
              setShowNotifications(!showNotifications);
              if (!showNotifications) setNotificationsRead(true);
            }}
            className="relative p-2 rounded-lg text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
            aria-label="Notifications"
          >
            <Bell className="w-5 h-5 text-slate-600" />
            {!notificationsRead && (
              <span className="absolute top-1.5 right-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-red-600 text-[10px] font-bold text-white shadow-xs">
                2
              </span>
            )}
          </button>

          {/* Notifications Flyout */}
          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 sm:w-96 rounded-xl border border-slate-200 bg-white p-3 shadow-xl z-50 animate-in fade-in slide-in-from-top-2">
              <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-100">
                <span className="text-xs font-semibold text-slate-900 uppercase tracking-wider">Statutory Alerts (2)</span>
                <button 
                  onClick={() => setShowNotifications(false)}
                  className="text-slate-400 hover:text-slate-600 p-0.5"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
              <div className="space-y-2 text-xs">
                <div className="p-2.5 bg-amber-50 rounded-lg border border-amber-200/60 flex items-start gap-2.5">
                  <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-amber-900">8-Year Lock-In Term Expiring</p>
                    <p className="text-amber-800 text-[11px] mt-0.5">
                      FDR-SBIN-2018-09 matures on 15 Dec 2026. Submit RPGF rollover or refund request before 15 Nov 2026.
                    </p>
                  </div>
                </div>

                <div className="p-2.5 bg-emerald-50 rounded-lg border border-emerald-200/60 flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-emerald-900">SFMS Lien Verified with PNB</p>
                    <p className="text-emerald-800 text-[11px] mt-0.5">
                      Core Banking API confirmed active tripartite lien lock for FDR-PNB-2020-04.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* User Profile Lockup */}
        <div className="relative">
          <button 
            onClick={() => setShowProfileMenu(!showProfileMenu)}
            className="flex items-center gap-2.5 pl-2 py-1 rounded-lg hover:bg-slate-50 transition-colors cursor-pointer text-left"
          >
            {/* Avatar */}
            <div className="w-9 h-9 rounded-full bg-[#0D3B66] text-white flex items-center justify-center font-bold text-xs shadow-xs ring-2 ring-slate-100 overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&h=120&q=80"
                alt="Dr. Rajesh K. Sharma"
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.currentTarget as HTMLElement).style.display = 'none';
                }}
              />
              <span className="font-semibold">RS</span>
            </div>
            <div className="hidden sm:flex flex-col">
              <span className="text-xs font-semibold text-slate-900 leading-tight">Dr. Rajesh K. Sharma</span>
              <span className="text-[11px] text-slate-500 leading-tight">Registrar & Authorized Signatory</span>
            </div>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400 hidden sm:block" />
          </button>

          {/* Profile Dropdown */}
          {showProfileMenu && (
            <div className="absolute right-0 mt-2 w-64 rounded-xl border border-slate-200 bg-white p-2 shadow-xl z-50">
              <div className="px-3 py-2 border-b border-slate-100">
                <p className="text-xs font-bold text-slate-900">Dr. Rajesh K. Sharma</p>
                <p className="text-[11px] text-slate-500">registrar@bhartividya.edu.in</p>
                <div className="mt-1 flex items-center gap-1.5 text-[10px] text-emerald-700 font-semibold bg-emerald-50 px-2 py-0.5 rounded-sm w-fit">
                  <Shield className="w-3 h-3" /> Digital DSC Active (Class 3)
                </div>
              </div>
              <div className="py-1 text-xs text-slate-700">
                <button 
                  onClick={() => setShowProfileMenu(false)}
                  className="w-full text-left px-3 py-1.5 hover:bg-slate-50 rounded-md transition-colors flex items-center justify-between"
                >
                  <span>Institutional Authority Letter</span>
                  <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
                </button>
                <button 
                  onClick={() => setShowProfileMenu(false)}
                  className="w-full text-left px-3 py-1.5 hover:bg-slate-50 rounded-md transition-colors flex items-center justify-between"
                >
                  <span>DSC Token Certificate</span>
                  <span className="text-[10px] text-slate-400">Valid 2027</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
