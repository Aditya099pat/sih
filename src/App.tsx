import React, { useState } from 'react';
import { NavigationTab, FDRInstrument, AuditLogItem, BankLinkage, DossierDocument } from './types';
import { 
  INITIAL_INSTRUMENTS, 
  INITIAL_AUDIT_LOGS, 
  INITIAL_BANK_LINKAGES, 
  INITIAL_DOSSIER_DOCS 
} from './data/mockData';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { DashboardView } from './views/DashboardView';
import { RegisterDepositView } from './views/RegisterDepositView';
import { BureauScrutinyView } from './views/BureauScrutinyView';
import { RpgfTrackerView } from './views/RpgfTrackerView';
import { CapitalCalculatorView } from './views/CapitalCalculatorView';
import { DossiersAffidavitsView } from './views/DossiersAffidavitsView';
import { AuditLedgerView } from './views/AuditLedgerView';
import { BankLinkagesView } from './views/BankLinkagesView';
import { InstrumentDetailModal } from './components/modals/InstrumentDetailModal';
import { DossierDrawer } from './components/modals/DossierDrawer';
import { PhaseReleaseModal } from './components/modals/PhaseReleaseModal';
import { AffidavitRenewalModal } from './components/modals/AffidavitRenewalModal';
import { BankVerificationModal } from './components/modals/BankVerificationModal';
import { ExportDossierModal } from './components/modals/ExportDossierModal';
import { HandbookModal } from './components/modals/HandbookModal';
import { CheckCircle2 } from 'lucide-react';

export default function App() {
  const [currentTab, setCurrentTab] = useState<NavigationTab>('dashboard');
  const [instruments, setInstruments] = useState<FDRInstrument[]>(INITIAL_INSTRUMENTS);
  const [auditLogs, setAuditLogs] = useState<AuditLogItem[]>(INITIAL_AUDIT_LOGS);
  const [bankLinkages, setBankLinkages] = useState<BankLinkage[]>(INITIAL_BANK_LINKAGES);
  const [dossierDocs, setDossierDocs] = useState<DossierDocument[]>(INITIAL_DOSSIER_DOCS);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedYear, setSelectedYear] = useState('AY 2025-26 | Phase-1');

  // Modals state
  const [selectedInstrument, setSelectedInstrument] = useState<FDRInstrument | null>(null);
  const [isDossierDrawerOpen, setIsDossierDrawerOpen] = useState(false);
  const [isExportDossierOpen, setIsExportDossierOpen] = useState(false);
  const [isPhaseReleaseOpen, setIsPhaseReleaseOpen] = useState(false);
  const [phaseReleaseTarget, setPhaseReleaseTarget] = useState<FDRInstrument | null>(null);
  const [isAffidavitOpen, setIsAffidavitOpen] = useState(false);
  const [affidavitTarget, setAffidavitTarget] = useState<FDRInstrument | null>(null);
  const [isBankVerificationOpen, setIsBankVerificationOpen] = useState(false);
  const [isHandbookOpen, setIsHandbookOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  // Add new FDR handler
  const handleAddInstrument = (newInst: FDRInstrument) => {
    setInstruments((prev) => [newInst, ...prev]);
    const newLog: AuditLogItem = {
      id: 'log-' + Date.now(),
      title: 'New Joint FDR Registered & SFMS Lien Dispatched',
      timestamp: 'Just now',
      date: new Date().toISOString().split('T')[0],
      type: 'success',
      description: `Registered ${newInst.ref} (${newInst.discipline}) for ${newInst.bankName} of ₹${newInst.principalAmount.toLocaleString('en-IN')}.`,
      txnId: '#AICTE-REG-' + Math.floor(1000 + Math.random() * 9000),
      hash: '0x' + Math.random().toString(16).substring(2, 14),
      actor: 'Dr. Rajesh K. Sharma (Registrar)'
    };
    setAuditLogs((prev) => [newLog, ...prev]);
    showToast(`Instrument ${newInst.ref} registered successfully!`);
    setCurrentTab('dashboard');
  };

  // Bureau Scrutiny Verify handler
  const handleVerifyInstrument = (id: string) => {
    setInstruments((prev) =>
      prev.map((inst) =>
        inst.id === id
          ? {
              ...inst,
              statutoryStatus: 'Active (>180 Days)',
              statusType: 'success',
              bankApiStatus: 'SBI CBS ✓'
            }
          : inst
      )
    );
    const newLog: AuditLogItem = {
      id: 'log-' + Date.now(),
      title: 'Bureau Scrutiny Seal Affixed',
      timestamp: 'Just now',
      date: new Date().toISOString().split('T')[0],
      type: 'success',
      description: `WRO Mumbai Bureau completed statutory verification and confirmed unencumbered joint lien for instrument.`,
      txnId: '#WRO-SCRUTINY-' + Math.floor(1000 + Math.random() * 9000),
      hash: '0x' + Math.random().toString(16).substring(2, 14),
      actor: 'Regional Officer, WRO Mumbai'
    };
    setAuditLogs((prev) => [newLog, ...prev]);
    showToast('Instrument verified and upgraded to Active status!');
  };

  // Complete Phase-5 release
  const handleCompleteRelease = (fdrRef: string, actionType: 'refund' | 'rollover') => {
    setInstruments((prev) =>
      prev.map((inst) =>
        inst.ref === fdrRef
          ? {
              ...inst,
              statutoryStatus: actionType === 'refund' ? 'Active (>180 Days)' : 'Active (>180 Days)',
              statusType: 'success',
              remainingDays: 365 * 4
            }
          : inst
      )
    );

    const newLog: AuditLogItem = {
      id: 'log-' + Date.now(),
      title: actionType === 'refund' ? 'Phase-5 Refund Authorized' : 'RPGF Rollover Approved',
      timestamp: 'Just now',
      date: new Date().toISOString().split('T')[0],
      type: 'success',
      description: `Application for ${fdrRef} digitally counter-signed by Member Secretary AICTE. Settlement protocol executed.`,
      txnId: '#AICTE-SETTLE-' + Math.floor(1000 + Math.random() * 9000),
      hash: '0x' + Math.random().toString(16).substring(2, 14),
      actor: 'Member Secretary, AICTE New Delhi'
    };
    setAuditLogs((prev) => [newLog, ...prev]);
    showToast(`Phase-5 ${actionType === 'refund' ? 'refund' : 'rollover'} transmitted to council!`);
  };

  // Reconciliation handler
  const handleTriggerReconciliation = () => {
    setBankLinkages((prev) =>
      prev.map((bank) => ({
        ...bank,
        lastPing: 'Synced just now',
        latencyMs: Math.floor(80 + Math.random() * 90)
      }))
    );
    showToast('Core banking SFMS gateways synchronized. All tripartite liens verified intact.');
  };

  // Filter instruments by global search
  const displayedInstruments = instruments.filter((inst) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      inst.ref.toLowerCase().includes(q) ||
      inst.discipline.toLowerCase().includes(q) ||
      inst.bankName.toLowerCase().includes(q) ||
      inst.ifsc.toLowerCase().includes(q) ||
      inst.fdrReceiptNo.toLowerCase().includes(q)
    );
  });

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#1A1C1F] flex flex-col font-sans">
      {/* Header */}
      <Header
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        selectedYear={selectedYear}
        onYearChange={setSelectedYear}
      />

      {/* Main Container with Sidebar + View */}
      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar */}
        <Sidebar
          currentTab={currentTab}
          onSelectTab={setCurrentTab}
          onOpenHandbook={() => setIsHandbookOpen(true)}
        />

        {/* Viewport Canvas */}
        <main className="flex-1 overflow-y-auto p-4 lg:p-6">
          <div className="max-w-7xl mx-auto">
            {currentTab === 'dashboard' && (
              <DashboardView
                instruments={displayedInstruments}
                auditLogs={auditLogs}
                bankLinkages={bankLinkages}
                onOpenDossierDrawer={() => setIsDossierDrawerOpen(true)}
                onOpenExportDossier={() => setIsExportDossierOpen(true)}
                onOpenPhaseRelease={() => {
                  setPhaseReleaseTarget(instruments.find((i) => i.remainingDays <= 90) || instruments[0]);
                  setIsPhaseReleaseOpen(true);
                }}
                onOpenRegisterDeposit={() => setCurrentTab('register')}
                onScheduleVerification={() => setIsBankVerificationOpen(true)}
                onPrepareAffidavit={() => {
                  setAffidavitTarget(instruments[0]);
                  setIsAffidavitOpen(true);
                }}
                onViewInstrument={(inst) => setSelectedInstrument(inst)}
                onViewDocuments={(inst) => {
                  setIsDossierDrawerOpen(true);
                }}
                onInitiateRpgfForInstrument={(inst) => {
                  setPhaseReleaseTarget(inst);
                  setIsPhaseReleaseOpen(true);
                }}
                onDownloadAuditTrail={() => {
                  showToast('Downloading Certified Audit Trail Log (SHA-256)...');
                }}
                onTriggerReconciliation={handleTriggerReconciliation}
              />
            )}

            {currentTab === 'register' && (
              <RegisterDepositView
                onAddInstrument={handleAddInstrument}
                onCancel={() => setCurrentTab('dashboard')}
              />
            )}

            {currentTab === 'scrutiny' && (
              <BureauScrutinyView
                instruments={instruments}
                onVerifyInstrument={handleVerifyInstrument}
              />
            )}

            {currentTab === 'rpgf' && (
              <RpgfTrackerView
                instruments={instruments}
                onInitiateRelease={(inst) => {
                  setPhaseReleaseTarget(inst);
                  setIsPhaseReleaseOpen(true);
                }}
              />
            )}

            {currentTab === 'calculator' && <CapitalCalculatorView />}

            {currentTab === 'affidavits' && (
              <DossiersAffidavitsView
                documents={dossierDocs}
                onOpenAffidavitModal={() => {
                  setAffidavitTarget(instruments[0]);
                  setIsAffidavitOpen(true);
                }}
              />
            )}

            {currentTab === 'audit' && (
              <AuditLedgerView
                logs={auditLogs}
                onDownloadLog={() => {
                  showToast('Certified SHA-256 Cryptographic Audit Log downloaded.');
                }}
              />
            )}

            {currentTab === 'bank-api' && (
              <BankLinkagesView
                bankLinkages={bankLinkages}
                onTriggerReconciliation={handleTriggerReconciliation}
              />
            )}
          </div>
        </main>
      </div>

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-5 right-5 z-50 bg-[#002546] text-white px-4 py-3 rounded-xl shadow-xl border border-slate-700 flex items-center gap-2.5 text-xs animate-in slide-in-from-bottom-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Modals & Overlays */}
      <InstrumentDetailModal
        instrument={selectedInstrument}
        onClose={() => setSelectedInstrument(null)}
        onInitiateRpgf={(inst) => {
          setPhaseReleaseTarget(inst);
          setIsPhaseReleaseOpen(true);
        }}
        onOpenAffidavit={(inst) => {
          setAffidavitTarget(inst);
          setIsAffidavitOpen(true);
        }}
      />

      <DossierDrawer
        isOpen={isDossierDrawerOpen}
        onClose={() => setIsDossierDrawerOpen(false)}
        documents={dossierDocs}
        onUploadDocument={(newDoc) => {
          setDossierDocs((prev) => [newDoc as DossierDocument, ...prev]);
          showToast('Document uploaded to institutional repository.');
        }}
      />

      <PhaseReleaseModal
        isOpen={isPhaseReleaseOpen}
        onClose={() => setIsPhaseReleaseOpen(false)}
        instrument={phaseReleaseTarget}
        onCompleteRelease={handleCompleteRelease}
      />

      <AffidavitRenewalModal
        isOpen={isAffidavitOpen}
        onClose={() => setIsAffidavitOpen(false)}
        instrument={affidavitTarget}
      />

      <BankVerificationModal
        isOpen={isBankVerificationOpen}
        onClose={() => setIsBankVerificationOpen(false)}
      />

      <ExportDossierModal
        isOpen={isExportDossierOpen}
        onClose={() => setIsExportDossierOpen(false)}
        instruments={instruments}
      />

      <HandbookModal
        isOpen={isHandbookOpen}
        onClose={() => setIsHandbookOpen(false)}
      />
    </div>
  );
}
