import { useState, useEffect } from "react";
import {
  INITIAL_INSTRUMENTS,
  INITIAL_AUDIT_LOGS,
  INITIAL_BANK_LINKAGES,
  INITIAL_DOSSIER_DOCS
} from "@data/mockData";
import { Header } from "./components/Header";
import { Sidebar } from "./components/Sidebar";
import { DashboardView } from "./views/DashboardView";
import { RegisterDepositView } from "./views/RegisterDepositView";
import { BureauScrutinyView } from "./views/BureauScrutinyView";
import { SanctionFreezeView } from "./views/SanctionFreezeView";
import { EscalationLadderView } from "./views/EscalationLadderView";
import { CapitalPenaltyVisualizerView } from "./views/CapitalPenaltyVisualizerView";
import { CryptographicLedgerView } from "./views/CryptographicLedgerView";
import { SfmsSimulatorView } from "./views/SfmsSimulatorView";
import { RpgfTrackerView } from "./views/RpgfTrackerView";
import { DossiersAffidavitsView } from "./views/DossiersAffidavitsView";
import { ScholarshipAnalyticsView } from "./views/ScholarshipAnalyticsView";
import { GeospatialMapView } from "./views/GeospatialMapView";
import { InstrumentDetailModal } from "./components/modals/InstrumentDetailModal";
import { DossierDrawer } from "./components/modals/DossierDrawer";
import { PhaseReleaseModal } from "./components/modals/PhaseReleaseModal";
import { AffidavitRenewalModal } from "./components/modals/AffidavitRenewalModal";
import { BankVerificationModal } from "./components/modals/BankVerificationModal";
import { ExportDossierModal } from "./components/modals/ExportDossierModal";
import { HandbookModal } from "./components/modals/HandbookModal";
import { AiCopilotDrawer } from "./components/modals/AiCopilotDrawer";
import { ShowCauseNoticeModal } from "./components/modals/ShowCauseNoticeModal";
import { DigitalSignatureModal } from "./components/modals/DigitalSignatureModal";
import { CertifiedTranscriptModal } from "./components/modals/CertifiedTranscriptModal";
import { CheckCircle2 } from "lucide-react";

export default function App() {
  const [currentTab, setCurrentTab] = useState("dashboard");
  const [activeRole, setActiveRole] = useState("trust"); // "trust" | "scrutiny" | "admin" | "bank"
  const [instruments, setInstruments] = useState(INITIAL_INSTRUMENTS);
  const [auditLogs, setAuditLogs] = useState(INITIAL_AUDIT_LOGS);
  const [bankLinkages, setBankLinkages] = useState(INITIAL_BANK_LINKAGES);
  const [dossierDocs, setDossierDocs] = useState(INITIAL_DOSSIER_DOCS);
  
  // Navigation & Search
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedYear, setSelectedYear] = useState("AY 2025-26 | Phase-1");
  const [selectedInstrument, setSelectedInstrument] = useState(null);
  const [scrutinyTargetId, setScrutinyTargetId] = useState("fdr-1");

  // Modals
  const [isDossierDrawerOpen, setIsDossierDrawerOpen] = useState(false);
  const [isExportDossierOpen, setIsExportDossierOpen] = useState(false);
  const [isPhaseReleaseOpen, setIsPhaseReleaseOpen] = useState(false);
  const [phaseReleaseTarget, setPhaseReleaseTarget] = useState(null);
  const [isAffidavitOpen, setIsAffidavitOpen] = useState(false);
  const [affidavitTarget, setAffidavitTarget] = useState(null);
  const [isBankVerificationOpen, setIsBankVerificationOpen] = useState(false);
  const [isHandbookOpen, setIsHandbookOpen] = useState(false);
  const [isAiCopilotOpen, setIsAiCopilotOpen] = useState(false);
  const [isShowCauseNoticeOpen, setIsShowCauseNoticeOpen] = useState(false);
  const [showCauseTargetId, setShowCauseTargetId] = useState("fdr-5");
  const [isDigitalSignatureOpen, setIsDigitalSignatureOpen] = useState(false);
  const [isCertifiedTranscriptOpen, setIsCertifiedTranscriptOpen] = useState(false);
  const [transcriptTarget, setTranscriptTarget] = useState(null);

  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  // Fetch instruments from backend API on mount
  useEffect(() => {
    fetch("/api/instruments")
      .then(res => res.json())
      .then(data => {
        if (data.success && data.data && data.data.length > 0) {
          setInstruments(data.data);
        }
      })
      .catch(err => console.log("Using cached initial instruments:", err.message));
  }, []);

  const handleAddInstrument = async (newInst) => {
    // Optimistic frontend update
    setInstruments((prev) => [newInst, ...prev]);

    // Send to backend API
    try {
      await fetch("/api/instruments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newInst)
      });
    } catch (err) {
      console.warn("Backend sync notice:", err);
    }

    const newLog = {
      id: "log-" + Date.now(),
      title: "New Joint FDR Registered & Chained to Ledger",
      timestamp: "Just now",
      date: new Date().toISOString().split("T")[0],
      type: "success",
      description: `Registered ${newInst.ref} (${newInst.discipline}) for ${newInst.bankName} of ₹${newInst.principalAmount.toLocaleString("en-IN")}.`,
      txnId: "#AICTE-REG-" + Math.floor(1000 + Math.random() * 9000),
      hash: "0x" + Math.random().toString(16).substring(2, 14),
      actor: "Dr. Rajesh K. Sharma (Registrar)"
    };
    setAuditLogs((prev) => [newLog, ...prev]);
    showToast(`Instrument ${newInst.ref} registered and chained to SHA-256 ledger!`);
    setCurrentTab("dashboard");
  };

  const handleVerifyInstrument = async (id) => {
    setInstruments((prev) =>
      prev.map((inst) =>
        inst.id === id
          ? {
              ...inst,
              statutoryStatus: "Active (>180 Days)",
              statusType: "success",
              bankApiStatus: "SBI CBS ✓"
            }
          : inst
      )
    );

    try {
      await fetch("/api/scrutiny/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ instrumentId: id, officerName: "Regional Director (WRO Mumbai)" })
      });
    } catch (err) {
      console.warn(err);
    }

    const newLog = {
      id: "log-" + Date.now(),
      title: "Bureau Scrutiny Seal Affixed",
      timestamp: "Just now",
      date: new Date().toISOString().split("T")[0],
      type: "success",
      description: `WRO Mumbai Bureau completed statutory verification and confirmed unencumbered joint lien for instrument.`,
      txnId: "#WRO-SCRUTINY-" + Math.floor(1000 + Math.random() * 9000),
      hash: "0x" + Math.random().toString(16).substring(2, 14),
      actor: "Regional Officer, WRO Mumbai"
    };
    setAuditLogs((prev) => [newLog, ...prev]);
    showToast("Instrument verified and upgraded to Active (>180 Days) status!");
  };

  const handleCompleteRelease = (fdrRef, actionType) => {
    setInstruments((prev) =>
      prev.map((inst) =>
        inst.ref === fdrRef
          ? {
              ...inst,
              statutoryStatus: actionType === "refund" ? "Released / Discharged" : "Active (>180 Days)",
              statusType: "success",
              remainingDays: 365 * 4
            }
          : inst
      )
    );
    const newLog = {
      id: "log-" + Date.now(),
      title: actionType === "refund" ? "Phase-5 Refund Authorized" : "RPGF Rollover Approved",
      timestamp: "Just now",
      date: new Date().toISOString().split("T")[0],
      type: "success",
      description: `Application for ${fdrRef} digitally counter-signed by Member Secretary AICTE. Settlement protocol executed.`,
      txnId: "#AICTE-SETTLE-" + Math.floor(1000 + Math.random() * 9000),
      hash: "0x" + Math.random().toString(16).substring(2, 14),
      actor: "Member Secretary, AICTE New Delhi"
    };
    setAuditLogs((prev) => [newLog, ...prev]);
    showToast(`Phase-5 ${actionType === "refund" ? "refund" : "rollover"} transmitted to council!`);
  };

  const handleTriggerReconciliation = () => {
    setBankLinkages((prev) =>
      prev.map((bank) => ({
        ...bank,
        lastPing: "Synced just now",
        latencyMs: Math.floor(80 + Math.random() * 90)
      }))
    );
    showToast("Core banking SFMS gateways synchronized. All tripartite liens verified intact.");
  };

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
    <div className="min-h-screen bg-[#F8FAFC] text-[#0F172A] flex flex-col font-sans">
      {/* Top Header */}
      <Header
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        selectedYear={selectedYear}
        onYearChange={setSelectedYear}
        activeRole={activeRole}
        onRoleChange={setActiveRole}
        onOpenAiCopilot={() => setIsAiCopilotOpen(true)}
        onOpenDigitalSignature={() => setIsDigitalSignatureOpen(true)}
      />

      {/* Main Container with Sidebar + View */}
      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar */}
        <Sidebar
          currentTab={currentTab}
          onSelectTab={setCurrentTab}
          onOpenHandbook={() => setIsHandbookOpen(true)}
          activeRole={activeRole}
        />

        {/* Viewport Canvas */}
        <main className="flex-1 overflow-y-auto p-4 lg:p-6 bg-[#F8FAFC]">
          <div className="max-w-7xl mx-auto">
            {/* 1. Dashboard & Instruments */}
            {currentTab === "dashboard" && (
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
                onOpenTranscript={(inst) => {
                  setTranscriptTarget(inst);
                  setIsCertifiedTranscriptOpen(true);
                }}
              />
            )}

            {/* USP 1: Dual-Track OCR Discrepancy Desk */}
            {currentTab === "scrutiny" && (
              <BureauScrutinyView
                instruments={instruments}
                onVerifyInstrument={handleVerifyInstrument}
                selectedInstrumentId={scrutinyTargetId}
              />
            )}

            {/* USP 2: Automated Regulatory Sanctions Freeze (Policy-as-Code) */}
            {currentTab === "sanctions" && (
              <SanctionFreezeView onNavigateToRpgf={() => setCurrentTab("rpgf")} />
            )}

            {/* USP 3: Multi-Stage Automated Escalation Ladder */}
            {currentTab === "escalation" && (
              <EscalationLadderView
                onOpenShowCauseModal={(instId) => {
                  setShowCauseTargetId(instId);
                  setIsShowCauseNoticeOpen(true);
                }}
              />
            )}

            {/* USP 4: APH Table 1.4 Dynamic Capital & Penalty Visualizer */}
            {currentTab === "calculator" && <CapitalPenaltyVisualizerView />}

            {/* USP 5: Cryptographic SHA-256 Immutable Audit Ledger */}
            {currentTab === "audit" && <CryptographicLedgerView />}

            {/* USP 6: SFMS MT760/MT799 Core Banking Gateway Simulator */}
            {currentTab === "sfms" && <SfmsSimulatorView />}

            {/* Baseline: Phase 5 Release & Refund */}
            {currentTab === "rpgf" && (
              <RpgfTrackerView
                instruments={instruments}
                onInitiateRelease={(inst) => {
                  setPhaseReleaseTarget(inst);
                  setIsPhaseReleaseOpen(true);
                }}
              />
            )}

            {/* Baseline: Register New Instrument */}
            {currentTab === "register" && (
              <RegisterDepositView
                onAddInstrument={handleAddInstrument}
                onCancel={() => setCurrentTab("dashboard")}
              />
            )}

            {/* Value-Add: Yield & Scholarship Reinvestment Analytics */}
            {currentTab === "scholarship" && <ScholarshipAnalyticsView />}

            {/* Value-Add: Geospatial Regional Compliance Map */}
            {currentTab === "geospatial" && <GeospatialMapView />}

            {/* Baseline: Dossiers & Affidavits */}
            {currentTab === "affidavits" && (
              <DossiersAffidavitsView
                documents={dossierDocs}
                onOpenAffidavitModal={() => {
                  setAffidavitTarget(instruments[0]);
                  setIsAffidavitOpen(true);
                }}
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

      {/* Slide-out Instrument Detail Drawer */}
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
        onScrutinize={(inst) => {
          setScrutinyTargetId(inst.id);
          setCurrentTab("scrutiny");
        }}
      />

      {/* Dossier Drawer */}
      <DossierDrawer
        isOpen={isDossierDrawerOpen}
        onClose={() => setIsDossierDrawerOpen(false)}
        documents={dossierDocs}
        onOpenUploadModal={() => {
          setIsDossierDrawerOpen(false);
          setIsAffidavitOpen(true);
        }}
      />

      {/* Phase 5 Release Modal */}
      <PhaseReleaseModal
        isOpen={isPhaseReleaseOpen}
        onClose={() => {
          setIsPhaseReleaseOpen(false);
          setPhaseReleaseTarget(null);
        }}
        targetInstrument={phaseReleaseTarget}
        onConfirmRelease={handleCompleteRelease}
      />

      {/* Affidavit Renewal Modal */}
      <AffidavitRenewalModal
        isOpen={isAffidavitOpen}
        onClose={() => {
          setIsAffidavitOpen(false);
          setAffidavitTarget(null);
        }}
        targetInstrument={affidavitTarget}
        onSubmitRenewal={(ref) => {
          showToast(`Affidavit-6 submitted for ${ref}. Under regional review.`);
          setIsAffidavitOpen(false);
        }}
      />

      {/* Bank Verification Modal */}
      <BankVerificationModal
        isOpen={isBankVerificationOpen}
        onClose={() => setIsBankVerificationOpen(false)}
        onTriggerPing={() => {
          handleTriggerReconciliation();
          setIsBankVerificationOpen(false);
        }}
      />

      {/* Export Dossier Modal */}
      <ExportDossierModal
        isOpen={isExportDossierOpen}
        onClose={() => setIsExportDossierOpen(false)}
        instruments={instruments}
      />

      {/* Regulatory Handbook Modal */}
      <HandbookModal
        isOpen={isHandbookOpen}
        onClose={() => setIsHandbookOpen(false)}
      />

      {/* Value-Add: AI Regulatory Copilot Drawer */}
      <AiCopilotDrawer
        isOpen={isAiCopilotOpen}
        onClose={() => setIsAiCopilotOpen(false)}
      />

      {/* Value-Add: Show-Cause Notice Preview Modal */}
      <ShowCauseNoticeModal
        isOpen={isShowCauseNoticeOpen}
        onClose={() => setIsShowCauseNoticeOpen(false)}
        instrumentId={showCauseTargetId}
      />

      {/* Value-Add: DigiLocker & Aadhaar e-Sign / Class-3 DSC Modal */}
      <DigitalSignatureModal
        isOpen={isDigitalSignatureOpen}
        onClose={() => setIsDigitalSignatureOpen(false)}
        onSigned={(cert) => {
          showToast(`Document successfully e-Signed by ${cert.signer}!`);
        }}
      />

      {/* Value-Add: One-Click Certified Transcript with Dynamic QR */}
      <CertifiedTranscriptModal
        isOpen={isCertifiedTranscriptOpen}
        onClose={() => setIsCertifiedTranscriptOpen(false)}
        instrument={transcriptTarget || instruments[0]}
      />
    </div>
  );
}
