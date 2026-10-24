import { Folder, Download, RotateCcw, Plus } from "lucide-react";
import { StatCards } from "../components/StatCards";
import { StatutoryAlert } from "../components/StatutoryAlert";
import { InstrumentsTable } from "../components/InstrumentsTable";
import { DashboardRightPanel } from "../components/DashboardRightPanel";
export const DashboardView = ({
  instruments,
  auditLogs,
  bankLinkages,
  onOpenDossierDrawer,
  onOpenExportDossier,
  onOpenPhaseRelease,
  onOpenRegisterDeposit,
  onScheduleVerification,
  onPrepareAffidavit,
  onViewInstrument,
  onViewDocuments,
  onInitiateRpgfForInstrument,
  onDownloadAuditTrail,
  onTriggerReconciliation,
  onOpenDrawer
}) => {
  return <div className="space-y-6">
      {
    /* Top Banner & Administrative Action Header */
  }
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 pb-2 border-b border-[#E2E8F0]">
        <div className="space-y-1.5">
          {
    /* Statutory Regulation Breadcrumb */
  }
          <div className="flex items-center gap-2 flex-wrap">
            <span className="badge-bank-verified inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-[#059669]" />
              Statutory Compliance: Active Joint Liens
            </span>
            <span className="text-slate-300">•</span>
            <span className="text-xs text-[#64748B] font-medium">
              AY 2025-26 Regulation Compliance
            </span>
            <span className="text-slate-300">•</span>
            <span className="text-xs font-mono font-semibold text-[#0D3B66]">
              AICTE APH Sec 1.4.3
            </span>
          </div>

          {
    /* Main Title (H1: 24px | Semi-Bold 600 | Color: #0F172A) */
  }
          <h1 className="text-2xl font-bold text-[#0F172A] tracking-tight">
            Security Deposit & FDR Portfolio Management
          </h1>

          {
    /* Subtitle */
  }
          <p className="text-xs text-[#64748B] font-medium">
            Bharati Vidya Sansthan • <span className="font-mono font-semibold">PID: 1-1029384</span> • Western Regional Office (WRO), Mumbai
          </p>
        </div>

        {
    /* Top Right Action Button Row */
  }
        <div className="flex items-center gap-2 flex-wrap self-start lg:self-auto">
          {
    /* Dossier Drawer Button */
  }
          <button
    onClick={onOpenDossierDrawer}
    className="px-3 py-2 text-xs font-semibold text-[#0F172A] bg-white border border-[#E2E8F0] rounded-lg hover:bg-slate-50 transition-colors flex items-center gap-1.5 shadow-2xs cursor-pointer"
  >
            <Folder className="w-3.5 h-3.5 text-[#64748B]" />
            <span>Dossier Drawer</span>
          </button>

          {
    /* Export Dossier Button */
  }
          <button
    onClick={onOpenExportDossier}
    className="px-3 py-2 text-xs font-semibold text-[#0F172A] bg-white border border-[#E2E8F0] rounded-lg hover:bg-slate-50 transition-colors flex items-center gap-1.5 shadow-2xs cursor-pointer"
  >
            <Download className="w-3.5 h-3.5 text-[#64748B]" />
            <span>Export Dossier (PDF/XLSX)</span>
          </button>

          {
    /* Apply Phase-5 Release Button */
  }
          <button
    onClick={onOpenPhaseRelease}
    className="px-3 py-2 text-xs font-semibold text-[#92400E] bg-[#FFFBEB] border border-[#FDE68A] rounded-lg hover:bg-amber-100 transition-colors flex items-center gap-1.5 shadow-2xs cursor-pointer"
  >
            <RotateCcw className="w-3.5 h-3.5 text-[#D97706]" />
            <span>Apply Phase-5 Release</span>
          </button>

          {
    /* Register New FDR Button (Primary Navy) */
  }
          <button
    onClick={onOpenRegisterDeposit}
    className="px-3.5 py-2 text-xs font-bold text-white bg-[#0D3B66] hover:bg-[#002546] rounded-lg transition-colors flex items-center gap-1.5 shadow-2xs cursor-pointer"
  >
            <Plus className="w-4 h-4" />
            <span>+ Register Deposit</span>
          </button>
        </div>
      </div>

      {
    /* 4 TOP KPI METRIC TILES IN A GRID (from Wireframe 1 & Requirement 3.B) */
  }
      <StatCards instruments={instruments} />

      {
    /* Statutory Alert if Maturing Instruments Exist */
  }
      <StatutoryAlert
    instruments={instruments}
    onPrepareAffidavit={onPrepareAffidavit}
    onOpenPhaseRelease={onOpenPhaseRelease}
  />

      {
    /* MAIN SECTION: Split Layout with Data Table (Left) + Donut & Stepper (Right) (from Wireframe 1) */
  }
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {
    /* Left Column (lg:col-span-8 or 9): 52px Clean Data Table */
  }
        <div className="lg:col-span-8 xl:col-span-9 space-y-4">
          <InstrumentsTable
    instruments={instruments}
    onViewInstrument={onViewInstrument}
    onViewDocuments={onViewDocuments}
    onInitiateRpgf={onInitiateRpgfForInstrument}
    onOpenDrawer={onOpenDrawer}
  />
        </div>

        {
    /* Right Column (lg:col-span-4 or 3): Bank Allocation Donut Chart & Lifecycle Stepper */
  }
        <div className="lg:col-span-4 xl:col-span-3 space-y-4">
          <DashboardRightPanel
    instruments={instruments}
    onOpenLifecycleAction={onOpenPhaseRelease}
  />
        </div>
      </div>
    </div>;
};
