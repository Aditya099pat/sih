import React from 'react';
import { 
  LayoutGrid, 
  FolderPlus, 
  ShieldCheck, 
  RotateCcw, 
  Calculator, 
  FileText, 
  ScrollText, 
  Building2, 
  Download, 
  PhoneCall, 
  ShieldCheck as ShieldCheckIcon 
} from 'lucide-react';
import { NavigationTab } from '../types';

interface SidebarProps {
  currentTab: NavigationTab;
  onSelectTab: (tab: NavigationTab) => void;
  onOpenHandbook: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentTab,
  onSelectTab,
  onOpenHandbook
}) => {
  const menuItems: { id: NavigationTab; label: string; icon: React.ReactNode; badge?: string }[] = [
    {
      id: 'dashboard',
      label: 'Dashboard & Instruments',
      icon: <LayoutGrid className="w-4 h-4 shrink-0" />
    },
    {
      id: 'register',
      label: 'Register New Deposit / FDR',
      icon: <FolderPlus className="w-4 h-4 shrink-0" />
    },
    {
      id: 'scrutiny',
      label: 'Bureau Scrutiny & Verification',
      icon: <ShieldCheck className="w-4 h-4 shrink-0" />,
      badge: '1 Pending'
    },
    {
      id: 'rpgf',
      label: 'RPGF & Phase Release Tracker',
      icon: <RotateCcw className="w-4 h-4 shrink-0" />,
      badge: 'Due'
    },
    {
      id: 'calculator',
      label: 'Capital Calculator (Table 1.4)',
      icon: <Calculator className="w-4 h-4 shrink-0" />
    },
    {
      id: 'affidavits',
      label: 'Statutory Dossiers & Affidavits',
      icon: <FileText className="w-4 h-4 shrink-0" />
    },
    {
      id: 'audit',
      label: 'Audit Ledger & Activity Log',
      icon: <ScrollText className="w-4 h-4 shrink-0" />
    },
    {
      id: 'bank-api',
      label: 'Bank API & Core Linkages',
      icon: <Building2 className="w-4 h-4 shrink-0" />
    }
  ];

  return (
    <aside className="w-64 lg:w-72 shrink-0 border-r border-slate-200 bg-white flex flex-col justify-between h-[calc(100vh-4rem)] sticky top-16 select-none">
      <div className="flex flex-col p-4 overflow-y-auto">
        {/* Top Institutional Identity Card */}
        <div className="p-3 mb-4 rounded-xl bg-slate-50 border border-slate-200/80">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-[11px] font-mono text-slate-500 font-semibold tracking-tight">PID: 1-1029384</span>
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-600"></span>
              Compliant
            </span>
          </div>
          <h2 className="text-sm font-bold text-slate-900 leading-snug">
            Bharati Vidya Sansthan
          </h2>
          <p className="text-[11px] text-slate-500 mt-0.5 flex items-center gap-1">
            <span>Western Regional Office (WRO)</span>
          </p>
        </div>

        {/* Navigation Items */}
        <nav className="space-y-1">
          {menuItems.map((item) => {
            const isActive = currentTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onSelectTab(item.id)}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-xs font-medium transition-all text-left cursor-pointer group ${
                  isActive
                    ? 'bg-[#0D3B66] text-white shadow-xs font-semibold'
                    : 'text-slate-700 hover:bg-slate-100 hover:text-slate-900'
                }`}
              >
                <div className="flex items-center gap-2.5 truncate">
                  <span className={`${isActive ? 'text-amber-400' : 'text-slate-500 group-hover:text-slate-700'}`}>
                    {item.icon}
                  </span>
                  <span className="truncate">{item.label}</span>
                </div>

                {item.badge && !isActive && (
                  <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded-md bg-amber-100 text-amber-800">
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Bottom Sticky Footer */}
      <div className="p-4 border-t border-slate-200 bg-slate-50/50 space-y-2.5 text-xs text-slate-600">
        <button
          onClick={onOpenHandbook}
          className="w-full flex items-center justify-between px-2.5 py-2 rounded-lg bg-white border border-slate-200 hover:border-slate-300 hover:bg-slate-50 transition-colors cursor-pointer text-slate-800 font-medium text-[11px]"
        >
          <span className="flex items-center gap-1.5">
            <Download className="w-3.5 h-3.5 text-slate-500" />
            APH 2025-26 Handbook
          </span>
          <span className="text-[10px] text-slate-400">PDF (4.2 MB)</span>
        </button>

        <div className="flex items-center justify-between px-1 text-[11px] text-slate-500">
          <div className="flex items-center gap-1.5">
            <PhoneCall className="w-3.5 h-3.5 text-slate-400" />
            <span>Helpdesk: <strong className="text-slate-700">1800-11-2345</strong></span>
          </div>
        </div>

        <div className="pt-1 flex items-center justify-between text-[10px] text-slate-400 border-t border-slate-200/60">
          <span className="flex items-center gap-1">
            <ShieldCheckIcon className="w-3 h-3 text-emerald-600" />
            AICTE Central Portal
          </span>
          <span className="font-mono">v4.2.8 Secure</span>
        </div>
      </div>
    </aside>
  );
};
