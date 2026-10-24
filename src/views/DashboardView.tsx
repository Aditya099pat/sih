import React from 'react';
import { Folder, Download, RotateCcw, Plus, CheckCircle2 } from 'lucide-react';
import { FDRInstrument, AuditLogItem, BankLinkage } from '../types';
import { StatCards } from '../components/StatCards';
import { StatutoryAlert } from '../components/StatutoryAlert';
import { InstrumentsTable } from '../components/InstrumentsTable';
import { AuditLedgerCard } from '../components/AuditLedgerCard';
import { BankApiCard } from '../components/BankApiCard';

interface DashboardViewProps {
  instruments: FDRInstrument[];
  auditLogs: AuditLogItem[];
  bankLinkages: BankLinkage[];
  onOpenDossierDrawer: () => void;
  onOpenExportDossier: () => void;
  onOpenPhaseRelease: () => void;
  onOpenRegisterDeposit: () => void;
  onScheduleVerification: () => void;
  onPrepareAffidavit: () => void;
  onViewInstrument: (inst: FDRInstrument) => void;
  onViewDocuments: (inst: FDRInstrument) => void;
  onInitiateRpgfForInstrument: (inst: FDRInstrument) => void;
  onDownloadAuditTrail: () => void;
  onTriggerReconciliation: () => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
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
  onTriggerReconciliation
}) => {
  return (
    <div className="space-y-6">
      {/* Top Banner & Action Header */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4">
        <div className="space-y-1.5">
          {/* Status pill & Regulation breadcrumb */}
          <div className="flex items-center gap-2 flex-wrap">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-600"></span>
              Compliant — All Statutory Instruments Active
            </span>
            <span className="text-slate-300">•</span>
            <span className="text-xs text-slate-500 font-medium">
              AY 2025-26 Regulation Compliance
            </span>
            <span className="text-slate-300">•</span>
            <span className="text-xs font-mono font-medium text-[#0D3B66]">
              APH 2025 Sec 1.4.3
            </span>
          </div>

          {/* Main Title */}
          <h1 className="text-2xl lg:text-3xl font-extrabold text-slate-900 tracking-tight">
            Institutional Security Deposit & FDR Management
          </h1>

          {/* Subtitle */}
          <p className="text-xs lg:text-sm text-slate-500 font-medium">
            Bharti Institute of Technology & Research • <span className="font-mono">PID: 1-1029384</span> • WRO, Mumbai
          </p>
        </div>

        {/* Top Right Action Button Row */}
        <div className="flex items-center gap-2 flex-wrap self-start lg:self-auto">
          {/* Dossier Drawer Button */}
          <button
            onClick={onOpenDossierDrawer}
            className="px-3 py-2 text-xs font-semibold text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 hover:text-slate-900 transition-colors flex items-center gap-1.5 shadow-2xs cursor-pointer"
          >
            <Folder className="w-3.5 h-3.5 text-slate-500" />
            <span>Dossier Drawer</span>
          </button>

          {/* Export Dossier Button */}
          <button
            onClick={onOpenExportDossier}
            className="px-3 py-2 text-xs font-semibold text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 hover:text-slate-900 transition-colors flex items-center gap-1.5 shadow-2xs cursor-pointer"
          >
            <Download className="w-3.5 h-3.5 text-slate-500" />
            <span>Export Dossier (PDF/XLSX)</span>
          </button>

          {/* Apply Phase-5 Release Button */}
          <button
            onClick={onOpenPhaseRelease}
            className="px-3 py-2 text-xs font-semibold text-amber-900 bg-amber-50 border border-amber-300 rounded-lg hover:bg-amber-100 transition-colors flex items-center gap-1.5 shadow-2xs cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5 text-amber-600" />
            <span>Apply Phase-5 Release</span>
          </button>

          {/* Register New Deposit Primary CTA Button */}
          <button
            onClick={onOpenRegisterDeposit}
            className="px-3.5 py-2 text-xs font-bold text-white bg-[#002546] hover:bg-[#0D3B66] rounded-lg transition-colors flex items-center gap-1.5 shadow-xs cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5 text-amber-400" />
            <span>+ Register New Deposit / FDR</span>
          </button>
        </div>
      </div>

      {/* 4 Stat Cards */}
      <StatCards
        instruments={instruments}
        onSelectInstrumentRef={(ref) => {
          const inst = instruments.find((i) => i.ref === ref);
          if (inst) onViewInstrument(inst);
        }}
        onInitiateRpgf={() => {
          const firstMaturing = instruments.find((i) => i.remainingDays <= 90);
          if (firstMaturing) onInitiateRpgfForInstrument(firstMaturing);
        }}
      />

      {/* Statutory Lock-In Expiry Alert Banner */}
      <StatutoryAlert
        onScheduleVerification={onScheduleVerification}
        onPrepareAffidavit={onPrepareAffidavit}
      />

      {/* Instruments Data Table */}
      <InstrumentsTable
        instruments={instruments}
        onViewInstrument={onViewInstrument}
        onViewDocuments={onViewDocuments}
        onInitiateRpgf={onInitiateRpgfForInstrument}
      />

      {/* Bottom 2-Column Split: Statutory Ledger & Bank API Direct */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <AuditLedgerCard
          logs={auditLogs}
          onDownloadAuditTrail={onDownloadAuditTrail}
        />
        <BankApiCard
          bankLinkages={bankLinkages}
          onTriggerReconciliation={onTriggerReconciliation}
        />
      </div>
    </div>
  );
};
