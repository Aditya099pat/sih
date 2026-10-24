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
  onOpenDrawer,
  onOpenTranscript
}) => {
  return (
    <div className="space-y-6">
      {/* Top Banner & Administrative Action Header */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 pb-2 border-b border-[#E2E8F0]">
        <div className="space-y-1">
          {/* Statutory Regulation Breadcrumb */}
          <div className="flex items-center gap-2 flex-wrap">
            <span className="badge-bank-verified inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-[#059669]" />
              Statutory Compliance: Active Joint Liens
            </span>
            <span className="text-slate-300">•</span>
            <span className="text-xs text-slate-500 font-medium">
              AY 2025-26 Regulatory Compliance
            </span>
            <span className="text-slate-300">•</span>
            <span className="text-xs font-mono font-semibold text-[#0B2545]">
              AICTE APH Sec 1.4.3
            </span>
          </div>

          {/* Main Title: 24px Bold Navy Blue */}
          <h1 className="text-2xl font-bold text-[#0B2545] tracking-tight">
            Security Deposit &amp; FDR Portfolio Management
          </h1>

          <p className="text-xs text-slate-600 font-medium">
            Bharati Vidya Sansthan • <span className="font-mono font-semibold">PID: 1-1029384</span> • Western Regional Office (WRO), Mumbai
          </p>
        </div>

        {/* Top Right Action Button Row */}
        <div className="flex items-center gap-2 flex-wrap self-start lg:self-auto">
          <button
            onClick={onOpenDossierDrawer}
            className="px-3 py-2 text-xs font-semibold text-slate-800 bg-white border border-[#E2E8F0] rounded-md hover:bg-slate-50 transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <Folder className="w-3.5 h-3.5 text-slate-500" />
            <span>Dossier Drawer</span>
          </button>

          <button
            onClick={onOpenExportDossier}
            className="px-3 py-2 text-xs font-semibold text-slate-800 bg-white border border-[#E2E8F0] rounded-md hover:bg-slate-50 transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <Download className="w-3.5 h-3.5 text-slate-500" />
            <span>Export Dossier</span>
          </button>

          <button
            onClick={() => onOpenTranscript && onOpenTranscript(instruments[0])}
            className="px-3 py-2 text-xs font-semibold text-[#0B2545] bg-blue-50 border border-blue-200 rounded-md hover:bg-blue-100 transition-colors flex items-center gap-1.5 cursor-pointer"
            title="Generate Certified Transcript with Dynamic QR for EVC Inspection"
          >
            <span>📱</span>
            <span>QR Transcript</span>
          </button>

          <button
            onClick={onOpenPhaseRelease}
            className="px-3 py-2 text-xs font-semibold text-amber-900 bg-amber-50 border border-amber-300 rounded-md hover:bg-amber-100 transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5 text-amber-700" />
            <span>Apply Phase-5 Release</span>
          </button>

          <button
            onClick={onOpenRegisterDeposit}
            className="px-3.5 py-2 text-xs font-bold text-white bg-[#0B2545] hover:bg-[#133E87] rounded-md transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>+ Register Deposit</span>
          </button>
        </div>
      </div>

      {/* 4 Top KPI Metric Cards (Emphasized Action Required & Review Queue) */}
      <StatCards instruments={instruments} />

      {/* Statutory Alert if Maturing Instruments Exist */}
      <StatutoryAlert
        instruments={instruments}
        onPrepareAffidavit={onPrepareAffidavit}
        onOpenPhaseRelease={onOpenPhaseRelease}
      />

      {/* Analytical Overview: Bank Portfolio Allocation Donut & Statutory Stepper side-by-side */}
      <div className="w-full">
        <DashboardRightPanel
          instruments={instruments}
          onOpenLifecycleAction={onOpenPhaseRelease}
        />
      </div>

      {/* FULL-WIDTH INSTRUMENTS REGISTRY TABLE */}
      <div className="w-full space-y-2">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-sm font-bold uppercase tracking-wider text-slate-500">
              Statutory Security Deposits &amp; Fixed Deposits Registry
            </h2>
            <p className="text-xs text-slate-500">
              Full unencumbered lien register certified under Section 1.4 of the AICTE Approval Process Handbook.
            </p>
          </div>
          <span className="text-xs font-mono text-slate-600 font-bold bg-slate-100 px-2 py-0.5 rounded border border-slate-200">
            {instruments.length} Total Registered Instruments
          </span>
        </div>

        <InstrumentsTable
          instruments={instruments}
          onViewInstrument={onViewInstrument}
          onViewDocuments={onViewDocuments}
          onInitiateRpgf={onInitiateRpgfForInstrument}
          onOpenDrawer={onOpenDrawer}
        />
      </div>
    </div>
  );
};
