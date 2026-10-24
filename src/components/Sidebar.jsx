import {
  LayoutGrid,
  FolderPlus,
  ShieldCheck,
  RotateCcw,
  Calculator,
  FileText,
  ScrollText,
  Building2,
  BookOpen
} from "lucide-react";
export const Sidebar = ({
  currentTab,
  onSelectTab,
  onOpenHandbook
}) => {
  const menuItems = [
    {
      id: "dashboard",
      label: "Dashboard & Instruments",
      icon: <LayoutGrid className="w-4 h-4 shrink-0" />
    },
    {
      id: "scrutiny",
      label: "Bureau Scrutiny (Dual-Pane)",
      icon: <ShieldCheck className="w-4 h-4 shrink-0" />,
      badge: "1 Action",
      badgeColor: "badge-expiring text-[10px] font-bold px-1.5 py-0.2 rounded-full"
    },
    {
      id: "register",
      label: "Register New Deposit / FDR",
      icon: <FolderPlus className="w-4 h-4 shrink-0" />
    },
    {
      id: "calculator",
      label: "Capital Calculator (Table 1.4)",
      icon: <Calculator className="w-4 h-4 shrink-0" />
    },
    {
      id: "rpgf",
      label: "RPGF & Phase Release",
      icon: <RotateCcw className="w-4 h-4 shrink-0" />,
      badge: "Due",
      badgeColor: "bg-amber-100 text-amber-800 text-[10px] font-bold px-1.5 py-0.2 rounded-full"
    },
    {
      id: "affidavits",
      label: "Dossiers & Affidavits",
      icon: <FileText className="w-4 h-4 shrink-0" />
    },
    {
      id: "audit",
      label: "Audit Ledger & Stepper",
      icon: <ScrollText className="w-4 h-4 shrink-0" />
    },
    {
      id: "bank-api",
      label: "Bank Gateway & SFMS",
      icon: <Building2 className="w-4 h-4 shrink-0" />,
      badge: "CBS Active",
      badgeColor: "badge-bank-verified text-[10px] font-semibold px-1.5 py-0.2 rounded-full"
    }
  ];
  return <aside className="w-64 lg:w-72 shrink-0 border-r border-[#E2E8F0] bg-white flex flex-col justify-between h-[calc(100vh-6.5rem)] sticky top-[6.5rem] select-none">
      <div className="flex flex-col p-4 overflow-y-auto">
        {
    /* Institutional Identity Card */
  }
        <div className="p-3 mb-4 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0]">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-[11px] font-mono text-[#64748B] font-bold">PID: 1-1029384</span>
            <span className="badge-bank-verified text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-[#059669]" />
              Compliant
            </span>
          </div>
          <h2 className="text-xs font-bold text-[#0F172A] leading-snug">
            Bharati Vidya Sansthan
          </h2>
          <p className="text-[11px] text-[#64748B] mt-0.5">
            Western Regional Office (WRO), Mumbai
          </p>
        </div>

        {
    /* Navigation Items */
  }
        <nav className="space-y-1">
          {menuItems.map((item) => {
    const isActive = currentTab === item.id;
    return <button
      key={item.id}
      onClick={() => onSelectTab(item.id)}
      className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${isActive ? "bg-[#0D3B66] text-white shadow-xs" : "text-[#64748B] hover:text-[#0F172A] hover:bg-[#F8FAFC]"}`}
    >
                <div className="flex items-center gap-2.5 truncate">
                  <span className={isActive ? "text-white" : "text-[#64748B]"}>
                    {item.icon}
                  </span>
                  <span className="truncate">{item.label}</span>
                </div>

                {item.badge && <span className={item.badgeColor || "text-[10px] px-1.5 py-0.5 rounded"}>
                    {item.badge}
                  </span>}
              </button>;
  })}
        </nav>
      </div>

      {
    /* Bottom Regulatory Support & Handbook Card */
  }
      <div className="p-4 border-t border-[#E2E8F0] bg-[#F8FAFC]">
        <div className="p-3 rounded-xl bg-white border border-[#E2E8F0] space-y-2">
          <div className="flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-[#0D3B66]" />
            <span className="text-xs font-bold text-[#0F172A]">AICTE APH 2025-26</span>
          </div>
          <p className="text-[11px] text-[#64748B] leading-tight">
            Section 1.4: Security Deposit and RPGF Joint Lien Regulations.
          </p>
          <button
    onClick={onOpenHandbook}
    className="w-full py-1.5 text-[11px] font-semibold text-[#0D3B66] bg-blue-50 hover:bg-blue-100 rounded-md transition-colors flex items-center justify-center gap-1 cursor-pointer"
  >
            <span>Regulatory Guide</span>
          </button>
        </div>
      </div>
    </aside>;
};
