import { useState } from "react";
import {
  INITIAL_INSTRUMENTS,
  INITIAL_AUDIT_LOGS,
  INITIAL_BANK_LINKAGES,
  INITIAL_DOSSIER_DOCS
} from "./data/mockData";
import { Header } from "./components/Header";
import { Sidebar } from "./components/Sidebar";
import { DashboardView } from "./views/DashboardView";
import { RegisterDepositView } from "./views/RegisterDepositView";
import { BureauScrutinyView } from "./views/BureauScrutinyView";
import { RpgfTrackerView } from "./views/RpgfTrackerView";
import { CapitalCalculatorView } from "./views/CapitalCalculatorView";
import { DossiersAffidavitsView } from "./views/DossiersAffidavitsView";
import { AuditLedgerView } from "./views/AuditLedgerView";
import { BankLinkagesView } from "./views/BankLinkagesView";
import { InstrumentDetailModal } from "./components/modals/InstrumentDetailModal";
import { DossierDrawer } from "./components/modals/DossierDrawer";
import { PhaseReleaseModal } from "./components/modals/PhaseReleaseModal";
import { AffidavitRenewalModal } from "./components/modals/AffidavitRenewalModal";
import { BankVerificationModal } from "./components/modals/BankVerificationModal";
import { ExportDossierModal } from "./components/modals/ExportDossierModal";
import { HandbookModal } from "./components/modals/HandbookModal";
import { CheckCircle2 } from "lucide-react";
export default function App() {
  const [currentTab, setCurrentTab] = useState("dashboard");
  const [instruments, setInstruments] = useState(INITIAL_INSTRUMENTS);
  const [auditLogs, setAuditLogs] = useState(INITIAL_AUDIT_LOGS);
  const [bankLinkages, setBankLinkages] = useState(INITIAL_BANK_LINKAGES);
  const [dossierDocs, setDossierDocs] = useState(INITIAL_DOSSIER_DOCS);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedYear, setSelectedYear] = useState("AY 2025-26 | Phase-1");
  const [selectedInstrument, setSelectedInstrument] = useState(null);
  const [isDossierDrawerOpen, setIsDossierDrawerOpen] = useState(false);
  const [isExportDossierOpen, setIsExportDossierOpen] = useState(false);
  const [isPhaseReleaseOpen, setIsPhaseReleaseOpen] = useState(false);
  const [phaseReleaseTarget, setPhaseReleaseTarget] = useState(null);
  const [isAffidavitOpen, setIsAffidavitOpen] = useState(false);
  const [affidavitTarget, setAffidavitTarget] = useState(null);
  const [isBankVerificationOpen, setIsBankVerificationOpen] = useState(false);
  const [isHandbookOpen, setIsHandbookOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);
  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };
  const handleAddInstrument = (newInst) => {
    setInstruments((prev) => [newInst, ...prev]);
    const newLog = {
      id: "log-" + Date.now(),
      title: "New Joint FDR Registered & SFMS Lien Dispatched",
      timestamp: "Just now",
      date: (/* @__PURE__ */ new Date()).toISOString().split("T")[0],
      type: "success",
      description: `Registered ${newInst.ref} (${newInst.discipline}) for ${newInst.bankName} of \u20B9${newInst.principalAmount.toLocaleString("en-IN")}.`,
      txnId: "#AICTE-REG-" + Math.floor(1e3 + Math.random() * 9e3),
      hash: "0x" + Math.random().toString(16).substring(2, 14),
      actor: "Dr. Rajesh K. Sharma (Registrar)"
    };
    setAuditLogs((prev) => [newLog, ...prev]);
    showToast(`Instrument ${newInst.ref} registered successfully!`);
    setCurrentTab("dashboard");
  };
  const handleVerifyInstrument = (id) => {
    setInstruments(
      (prev) => prev.map(
        (inst) => inst.id === id ? {
          ...inst,
          statutoryStatus: "Active (>180 Days)",
          statusType: "success",
          bankApiStatus: "SBI CBS \u2713"
        } : inst
      )
    );
    const newLog = {
      id: "log-" + Date.now(),
      title: "Bureau Scrutiny Seal Affixed",
      timestamp: "Just now",
      date: (/* @__PURE__ */ new Date()).toISOString().split("T")[0],
      type: "success",
      description: `WRO Mumbai Bureau completed statutory verification and confirmed unencumbered joint lien for instrument.`,
      txnId: "#WRO-SCRUTINY-" + Math.floor(1e3 + Math.random() * 9e3),
      hash: "0x" + Math.random().toString(16).substring(2, 14),
      actor: "Regional Officer, WRO Mumbai"
    };
    setAuditLogs((prev) => [newLog, ...prev]);
    showToast("Instrument verified and upgraded to Active status!");
  };
  const handleCompleteRelease = (fdrRef, actionType) => {
    setInstruments(
      (prev) => prev.map(
        (inst) => inst.ref === fdrRef ? {
          ...inst,
          statutoryStatus: actionType === "refund" ? "Active (>180 Days)" : "Active (>180 Days)",
          statusType: "success",
          remainingDays: 365 * 4
        } : inst
      )
    );
    const newLog = {
      id: "log-" + Date.now(),
      title: actionType === "refund" ? "Phase-5 Refund Authorized" : "RPGF Rollover Approved",
      timestamp: "Just now",
      date: (/* @__PURE__ */ new Date()).toISOString().split("T")[0],
      type: "success",
      description: `Application for ${fdrRef} digitally counter-signed by Member Secretary AICTE. Settlement protocol executed.`,
      txnId: "#AICTE-SETTLE-" + Math.floor(1e3 + Math.random() * 9e3),
      hash: "0x" + Math.random().toString(16).substring(2, 14),
      actor: "Member Secretary, AICTE New Delhi"
    };
    setAuditLogs((prev) => [newLog, ...prev]);
    showToast(`Phase-5 ${actionType === "refund" ? "refund" : "rollover"} transmitted to council!`);
  };
  const handleTriggerReconciliation = () => {
    setBankLinkages(
      (prev) => prev.map((bank) => ({
        ...bank,
        lastPing: "Synced just now",
        latencyMs: Math.floor(80 + Math.random() * 90)
      }))
    );
    showToast("Core banking SFMS gateways synchronized. All tripartite liens verified intact.");
  };
  const [scrutinyTargetId, setScrutinyTargetId] = useState("fdr-1");
  const displayedInstruments = instruments.filter((inst) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return inst.ref.toLowerCase().includes(q) || inst.discipline.toLowerCase().includes(q) || inst.bankName.toLowerCase().includes(q) || inst.ifsc.toLowerCase().includes(q) || inst.fdrReceiptNo.toLowerCase().includes(q);
  });
  return <div className="min-h-screen bg-[#F8FAFC] text-[#0F172A] flex flex-col font-sans">
      {
    /* Header */
  }
      <Header
    searchQuery={searchQuery}
    onSearchChange={setSearchQuery}
    selectedYear={selectedYear}
    onYearChange={setSelectedYear}
  />

      {
    /* Main Container with Sidebar + View */
  }
      <div className="flex-1 flex overflow-hidden">
        {
    /* Sidebar */
  }
        <Sidebar
    currentTab={currentTab}
    onSelectTab={setCurrentTab}
    onOpenHandbook={() => setIsHandbookOpen(true)}
  />

        {
    /* Viewport Canvas */
  }
        <main className="flex-1 overflow-y-auto p-4 lg:p-6 bg-[#F8FAFC]">
          <div className="max-w-7xl mx-auto">
            {currentTab === "dashboard" && <DashboardView
    instruments={displayedInstruments}
    auditLogs={auditLogs}
    bankLinkages={bankLinkages}
    onOpenDossierDrawer={() => setIsDossierDrawerOpen(true)}
    onOpenExportDossier={() => setIsExportDossierOpen(true)}
    onOpenPhaseRelease={() => {
      setPhaseReleaseTarget(instruments.find((i) => i.remainingDays <= 90) || instruments[0]);
      setIsPhaseReleaseOpen(true);
    }}
    onOpenRegisterDeposit={() => setCurrentTab("register")}
    onScheduleVerification={() => setIsBankVerificationOpen(true)}
    onPrepareAffidavit={() => {
      setAffidavitTarget(instruments[0]);
      setIsAffidavitOpen(true);
    }}
    onViewInstrument={(inst) => {
      setScrutinyTargetId(inst.id);
      setCurrentTab("scrutiny");
    }}
    onViewDocuments={(inst) => {
      setSelectedInstrument(inst);
    }}
    onInitiateRpgfForInstrument={(inst) => {
      setPhaseReleaseTarget(inst);
      setIsPhaseReleaseOpen(true);
    }}
    onDownloadAuditTrail={() => {
      showToast("Downloading Certified Audit Trail Log (SHA-256)...");
    }}
    onTriggerReconciliation={handleTriggerReconciliation}
    onOpenDrawer={(inst) => setSelectedInstrument(inst)}
  />}

            {currentTab === "register" && <RegisterDepositView
    onAddInstrument={handleAddInstrument}
    onCancel={() => setCurrentTab("dashboard")}
  />}

            {currentTab === "scrutiny" && <BureauScrutinyView
    instruments={instruments}
    onVerifyInstrument={handleVerifyInstrument}
    selectedInstrumentId={scrutinyTargetId}
  />}


            {currentTab === "rpgf" && <RpgfTrackerView
    instruments={instruments}
    onInitiateRelease={(inst) => {
      setPhaseReleaseTarget(inst);
      setIsPhaseReleaseOpen(true);
    }}
  />}

            {currentTab === "calculator" && <CapitalCalculatorView />}

            {currentTab === "affidavits" && <DossiersAffidavitsView
    documents={dossierDocs}
    onOpenAffidavitModal={() => {
      setAffidavitTarget(instruments[0]);
      setIsAffidavitOpen(true);
    }}
  />}

            {currentTab === "audit" && <AuditLedgerView
    logs={auditLogs}
    onDownloadLog={() => {
      showToast("Certified SHA-256 Cryptographic Audit Log downloaded.");
    }}
  />}

            {currentTab === "bank-api" && <BankLinkagesView
    bankLinkages={bankLinkages}
    onTriggerReconciliation={handleTriggerReconciliation}
  />}
          </div>
        </main>
      </div>

      {
    /* Toast Notification */
  }
      {toastMessage && <div className="fixed bottom-5 right-5 z-50 bg-[#002546] text-white px-4 py-3 rounded-xl shadow-xl border border-slate-700 flex items-center gap-2.5 text-xs animate-in slide-in-from-bottom-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>}

      {
    /* Modals & Overlays */
  }
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
    onOpenScrutiny={(inst) => {
      setScrutinyTargetId(inst.id);
      setSelectedInstrument(null);
      setCurrentTab("scrutiny");
    }}
  />


      <DossierDrawer
    isOpen={isDossierDrawerOpen}
    onClose={() => setIsDossierDrawerOpen(false)}
    documents={dossierDocs}
    onUploadDocument={(newDoc) => {
      setDossierDocs((prev) => [newDoc, ...prev]);
      showToast("Document uploaded to institutional repository.");
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
    </div>;
}
