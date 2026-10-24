import { useState } from "react";
import {
  LayoutGrid,
  FolderPlus,
  ShieldCheck,
  RotateCcw,
  Calculator,
  FileText,
  Building2,
  BookOpen,
  ShieldAlert,
  BellRing,
  Hash,
  GraduationCap,
  MapPin,
  Radio,
  ChevronDown,
  ChevronRight,
  Briefcase
} from "lucide-react";

export const Sidebar = ({
  currentTab,
  onSelectTab,
  onOpenHandbook,
  activeRole
}) => {
  const [bureauToolsOpen, setBureauToolsOpen] = useState(true);

  // Group 1: Core Institutional Workflows
  const coreModules = [
    {
      id: "dashboard",
      label: "Dashboard & Instruments",
      icon: <LayoutGrid className="w-4 h-4 shrink-0" />
    },
    {
      id: "register",
      label: "Register New Deposit / FDR",
      icon: <FolderPlus className="w-4 h-4 shrink-0" />
    },
    {
      id: "affidavits",
      label: "Dossiers & Affidavits",
      icon: <FileText className="w-4 h-4 shrink-0" />
    },
    {
      id: "rpgf",
      label: "Phase 5 Release & Refund",
      icon: <RotateCcw className="w-4 h-4 shrink-0" />
    }
  ];

  // Group 2: Advanced Bureau Tools (Collapsible group without hackathon USP meta-labels)
  const advancedBureauTools = [
    {
      id: "scrutiny",
      label: "Dual-Track Scrutiny Desk",
      icon: <ShieldCheck className="w-4 h-4 shrink-0" />,
      badge: "OCR Audit",
      badgeColor: "bg-blue-100 text-[#0B2545] text-[10px] font-bold px-1.5 py-0.5 rounded"
    },
    {
      id: "sanctions",
      label: "Regulatory Sanctions Matrix",
      icon: <ShieldAlert className="w-4 h-4 shrink-0" />,
      badge: "Policy Gate",
      badgeColor: "bg-rose-100 text-rose-800 text-[10px] font-bold px-1.5 py-0.5 rounded"
    },
    {
      id: "escalation",
      label: "Compliance Escalation Engine",
      icon: <BellRing className="w-4 h-4 shrink-0" />,
      badge: "T-0 SCN",
      badgeColor: "bg-amber-100 text-amber-800 text-[10px] font-bold px-1.5 py-0.5 rounded"
    },
    {
      id: "calculator",
      label: "Statutory Capital Calculator",
      icon: <Calculator className="w-4 h-4 shrink-0" />
    },
    {
      id: "sfms",
      label: "Core Banking SFMS Gateway",
      icon: <Radio className="w-4 h-4 shrink-0" />,
      badge: "MT760/799",
      badgeColor: "bg-emerald-100 text-emerald-800 text-[10px] font-bold px-1.5 py-0.5 rounded"
    },
    {
      id: "audit",
      label: "Cryptographic Audit Ledger",
      icon: <Hash className="w-4 h-4 shrink-0" />,
      badge: "SHA-256",
      badgeColor: "bg-indigo-100 text-indigo-800 text-[10px] font-bold px-1.5 py-0.5 rounded"
    }
  ];

  // Group 3: Oversight & Regional Analytics
  const analyticsModules = [
    {
      id: "scholarship",
      label: "Yield & Scholarship Impact",
      icon: <GraduationCap className="w-4 h-4 shrink-0" />
    },
    {
      id: "geospatial",
      label: "Geospatial Regional Map",
      icon: <MapPin className="w-4 h-4 shrink-0" />
    }
  ];

  const renderNavButton = (item, isNested = false) => {
    const isActive = currentTab === item.id;
    return (
      <button
        key={item.id}
        onClick={() => onSelectTab(item.id)}
        className={`w-full flex items-center justify-between px-3 py-2 rounded-md text-xs font-semibold transition-all cursor-pointer ${
          isNested ? "pl-5" : ""
        } ${
          isActive
            ? "bg-[#0B2545] text-white shadow-xs font-bold"
            : "text-slate-700 hover:text-[#0B2545] hover:bg-slate-100/80"
        }`}
      >
        <div className="flex items-center gap-2.5 truncate">
          <span className={isActive ? "text-white" : "text-slate-500"}>
            {item.icon}
          </span>
          <span className="truncate">{item.label}</span>
        </div>

        {item.badge && (
          <span className={item.badgeColor || "text-[10px] px-1.5 py-0.5 rounded font-mono"}>
            {item.badge}
          </span>
        )}
      </button>
    );
  };

  return (
    <aside className="w-64 lg:w-72 shrink-0 border-r border-[#E2E8F0] bg-white flex flex-col justify-between h-[calc(100vh-6.5rem)] sticky top-[6.5rem] select-none">
      <div className="flex flex-col p-3 overflow-y-auto space-y-4">
        {/* Institutional Identity Card */}
        <div className="p-3 rounded-md bg-[#F8FAFC] border border-[#E2E8F0]">
          <div className="flex items-center justify-between mb-1">
            <span className="text-[11px] font-mono text-slate-600 font-bold">PID: 1-1029384</span>
            <span className="badge-bank-verified text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-[#059669]" />
              Compliant
            </span>
          </div>
          <h2 className="text-xs font-bold text-[#0F172A] leading-snug">
            Bharati Vidya Sansthan
          </h2>
          <p className="text-[11px] text-slate-500 mt-0.5">
            Western Regional Office (WRO), Mumbai
          </p>
        </div>

        {/* Section 1: Core Modules */}
        <div>
          <div className="px-2 pb-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-400">
            Core Operations
          </div>
          <nav className="space-y-0.5">
            {coreModules.map((item) => renderNavButton(item))}
          </nav>
        </div>

        {/* Section 2: Advanced Bureau Tools (Collapsible Header) */}
        <div>
          <button
            onClick={() => setBureauToolsOpen(!bureauToolsOpen)}
            className="w-full flex items-center justify-between px-2 py-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-500 hover:text-[#0B2545] rounded cursor-pointer"
          >
            <div className="flex items-center gap-1.5">
              <Briefcase className="w-3.5 h-3.5 text-slate-500" />
              <span>Advanced Bureau Tools</span>
            </div>
            {bureauToolsOpen ? (
              <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
            ) : (
              <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            )}
          </button>

          {bureauToolsOpen && (
            <nav className="mt-1 space-y-0.5">
              {advancedBureauTools.map((item) => renderNavButton(item, true))}
            </nav>
          )}
        </div>

        {/* Section 3: Oversight & Regional Analytics */}
        <div>
          <div className="px-2 pb-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-400">
            Oversight & Analytics
          </div>
          <nav className="space-y-0.5">
            {analyticsModules.map((item) => renderNavButton(item))}
          </nav>
        </div>
      </div>

      {/* Bottom Regulatory Support & Handbook Card */}
      <div className="p-3 border-t border-[#E2E8F0] bg-[#F8FAFC]">
        <div className="p-2.5 rounded-md bg-white border border-[#E2E8F0] space-y-1.5">
          <div className="flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-[#0B2545]" />
            <span className="text-xs font-bold text-[#0F172A]">AICTE APH 2025-26</span>
          </div>
          <p className="text-[11px] text-slate-600 leading-tight">
            Section 1.4: Security Deposit and RPGF Joint Lien Regulations.
          </p>
          <button
            onClick={onOpenHandbook}
            className="w-full py-1.5 text-[11px] font-semibold text-[#0B2545] bg-blue-50 hover:bg-blue-100 rounded-md transition-colors flex items-center justify-center gap-1 cursor-pointer"
          >
            <span>Regulatory Guide &amp; Gazette</span>
          </button>
        </div>
      </div>
    </aside>
  );
};
