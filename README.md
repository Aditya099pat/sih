# AICTE Security Deposit & FDR Management Portal (PS26265)

[![React](https://img.shields.io/badge/React-19.0-blue.svg)](https://react.dev/)
[![Express](https://img.shields.io/badge/Express-4.21-lightgrey.svg)](https://expressjs.com/)
[![Vite](https://img.shields.io/badge/Vite-8.3-646CFF.svg)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4.3-38B2AC.svg)](https://tailwindcss.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

A statutory, production-grade **Security Deposit & Fixed Deposit Receipt (FDR) Lifecycle Management Portal** designed for the **All India Council for Technical Education (AICTE)**, Ministry of Education, Government of India, addressing **Problem Statement PS26265**.

---

## 🏛️ Problem Statement Context (PS26265)

Under the AICTE Approval Process Handbook (APH), technical institutions must maintain mandatory joint fixed deposits pledged in unconditional lien to the Member Secretary, AICTE. Traditionally, this process has suffered from manual paper-based delays, unverified bank confirmation letters, lack of automated maturity tracking, and illicit promoter withdrawals while student grievances or legal disputes remain active.

This portal establishes an end-to-end, policy-driven digital solution with real-time Core Banking integration, cryptographic ledger immutability, automated regulatory gatekeeping, and multi-tier escalation.

---

## 🌟 6 Core Unique Selling Propositions (USPs)

| # | USP Feature | Target Problem Solved | Functional Mechanism |
|---|---|---|---|
| **1** | **Dual-Track Discrepancy & OCR Extraction Engine** | Eliminates manual data entry errors and detects counterfeit certificates. | 50/50 split-screen desk: scanned FDR PDF with OCR bounding boxes on the left; self-declared vs. CBS telemetry on the right. Highlights date, tenure, or amount discrepancies in high-contrast red. |
| **2** | **Automated Regulatory Sanction Freezes (Policy-as-Code)** | Prevents delinquent promoters from withdrawing capital while student or legal claims are pending. | Cross-bureau validation gate linking deposit registry to Expert Visit Committee (EVC) findings, Student Fee Ombudsman grievances, and Court registries. Hard-locks Phase 5 refund actions if delinquent. |
| **3** | **Multi-Stage Automated Escalation Ladder** | Prevents deposits from silently maturing into dormant, zero-yield accounts. | 4-tier countdown engine: **T-90** (In-portal/email notice), **T-60** (SMS to Trust Chairman), **T-30** (Flagged in Regional Director priority queue), and **T-0** (Auto-generates draft statutory Show-Cause Notice). |
| **4** | **APH Table 1.4 Dynamic Capital & Calibrated Penalty Visualizer** | Eliminates confusion regarding statutory deposit slabs, affirmative concessions, and closure penalties. | Interactive calculation engine for Table 1.4 matrix. Dynamic 50% affirmative concessions (Women, PwD, North East, J&K/Ladakh) and 2.0x leasehold multipliers, with an administrative 10%–50% forfeiture slider. |
| **5** | **Cryptographic SHA-256 Immutable Audit Ledger** | Ensures non-repudiation and transparency during vigilance and RTI audits. | Every operational event is recorded as a cryptographically hashed, chained block (NIST FIPS 180-4). Includes a "Verify Chain Integrity" validator and exportable certified CVC audit transcripts. |
| **6** | **SFMS MT760/MT799 Core Banking Gateway Simulator** | Eliminates verification asymmetry and forged physical bank letters. | Mock gateway replicating Structured Financial Messaging System protocols: **MT760** for tripartite lien advice and **MT799** for periodic balance/encumbrance heartbeats. |

---

## 🚀 Additional Value-Add Modules

- **AI Regulatory Copilot / Statutory Chatbot:** Interactive drawer (`✦ AI Copilot`) answering complex queries on APH deposit guidelines, mandatory checklists, and penalty clauses with gazette citations.
- **DigiLocker & Aadhaar e-Sign / Class-3 DSC:** Direct simulation (`✍️ e-Sign`) for applying legally binding digital signatures on Affidavits and Discharge Letters under Section 3A of the IT Act, 2000.
- **One-Click Certified Transcripts with Dynamic QR:** Exports certified institutional dossiers (`📱 QR Transcript`) with dynamic QR codes for on-the-spot authentication by physical EVC inspection committees.
- **Yield & Scholarship Reinvestment Analytics:** Tracks cumulative quarterly yield accrued on locked FDRs assigned to AICTE for funding national scholarships (**Pragati**, **Saksham**) and **ATAL Academy** research grants.
- **Geospatial Regional Compliance Map:** Pan-India interactive heat-map visualizing active FDR capital concentration, regional compliance rates, and default clusters across Regional Offices (WRO, NRO, SRO, SWRO, CRO, ERO, NWRO).

---

## 👥 Role-Based Access Control (RBAC)

The portal features a 4-role identity switcher in the top navigation bar:

1. **🏛️ Applicant / Trust Role:** View portfolio under Permanent Institute ID (PID), register new FDRs, submit renewal affidavits, apply for Phase 5 lock-in release.
2. **🔍 AICTE Scrutiny Officer Role:** Dual-pane document verification desk, inspect OCR bounding boxes, record observations, approve or reject instruments.
3. **⚖️ AICTE Bureau Admin / Regional Officer:** Monitor regional quotas, inspect cross-bureau sanction gates, override holds, authorize final disbursements.
4. **🏦 Bank Auditor / Verifier Role:** View and verify pledged instruments originating from their banking network (SBI, PNB, Canara, BoB, HDFC) via SFMS telemetry.

---

## 📁 Repository Structure (3-Subfolder Architecture)

The project is structured into three clean, dedicated modules: **`frontend`**, **`backend`**, and **`data`**:

```
aicte-security-deposit-&-fdr-management-portal/
├── jsconfig.json                   # Path alias mappings (@/, @data/, @backend/)
├── package.json                    # Unified NPM scripts & dependencies
├── package-lock.json               # Deterministic dependency lockfile
├── vite.config.js                  # Vite configuration hosting frontend + backend middleware
├── dist/                           # Production build output bundle
│
├── 📂 backend/                     # Backend API & Gateway Server
│   ├── server.js                   # Express core gateway application & middleware setup
│   └── routes/
│       └── api.js                  # Express REST API endpoints (6 USPs, calculator, SFMS, ledger)
│
├── 📂 data/                        # Shared Data Stores & Initial State Repositories
│   ├── store.js                    # In-memory backend database (instruments, sanctions, escalation, SFMS, ledger)
│   └── mockData.js                 # Frontend baseline seed data, types, & Indian currency formatting utilities
│
└── 📂 frontend/                    # React 19 Frontend Application
    ├── index.html                  # HTML5 entry template with GovTech typography & favicon
    ├── public/                     # Static public assets
    └── src/                        # React JSX source code
        ├── App.jsx                 # Master application container, state orchestration & modal routing
        ├── index.css               # GovTech design system tokens, Tailwind CSS directives & components
        ├── main.jsx                # React 19 root bootstrap
        ├── types.js                # JSDoc type definitions & navigation constants
        ├── components/             # Reusable UI Components
        │   ├── AicteLogo.jsx       # Vector AICTE emblem
        │   ├── DashboardRightPanel.jsx # Bank portfolio donut chart & lifecycle stepper
        │   ├── Header.jsx          # Official Gov strip, tricolor ribbon, search, RBAC, AI Copilot
        │   ├── InstrumentsTable.jsx# 52px dense GovTech data table with filters & pagination
        │   ├── Sidebar.jsx         # Collapsible primary navigation with status badges
        │   ├── StatCards.jsx       # 4 Aggregated KPI metric cards
        │   ├── StatutoryAlert.jsx  # Sticky statutory alert banner
        │   └── modals/             # Dialogs & Slide-out Drawers
        │       ├── AffidavitRenewalModal.jsx    # Affidavit-6 rollover submission
        │       ├── AiCopilotDrawer.jsx          # AI Regulatory Copilot chatbot
        │       ├── BankVerificationModal.jsx    # Core Banking SFMS verification
        │       ├── CertifiedTranscriptModal.jsx # Certified transcript with dynamic QR
        │       ├── DigitalSignatureModal.jsx    # Aadhaar e-Sign & Class-3 DSC token
        │       ├── DossierDrawer.jsx            # Multi-document dossier drawer
        │       ├── ExportDossierModal.jsx       # Certified PDF & Excel dossier export
        │       ├── HandbookModal.jsx            # APH 2025-26 regulation reference
        │       ├── InstrumentDetailModal.jsx    # 540px slide-out instrument inspection drawer
        │       ├── PhaseReleaseModal.jsx        # Phase-5 statutory release approval chain
        │       └── ShowCauseNoticeModal.jsx     # Draft Statutory Show-Cause Notice order
        └── views/                  # Feature Views & Desks
            ├── BureauScrutinyView.jsx           # USP 1: Dual-Track OCR Discrepancy Desk
            ├── CapitalPenaltyVisualizerView.jsx # USP 4: Table 1.4 Capital & Penalty Visualizer
            ├── CryptographicLedgerView.jsx      # USP 5: SHA-256 Tamper-Proof Audit Ledger
            ├── DashboardView.jsx                # Main Executive Portfolio Dashboard
            ├── DossiersAffidavitsView.jsx       # Baseline: Dossiers & Affidavits
            ├── EscalationLadderView.jsx         # USP 3: Multi-Stage Escalation Ladder
            ├── GeospatialMapView.jsx            # Value-Add: Geospatial Regional Map
            ├── RegisterDepositView.jsx          # Baseline: Multi-step Deposit Registration
            ├── RpgfTrackerView.jsx              # Baseline: Phase 5 Release & Rollover
            ├── SanctionFreezeView.jsx           # USP 2: Policy-as-Code Sanction Freezes
            ├── ScholarshipAnalyticsView.jsx     # Value-Add: Yield & Scholarship Reinvestment
            └── SfmsSimulatorView.jsx            # USP 6: SFMS MT760/MT799 Bank Simulator
```

---

## ⚡ API Endpoints Summary

| Route | Method | Description |
|---|---|---|
| `/api/instruments` | `GET` / `POST` | Retrieve all instruments or register a new joint deposit |
| `/api/scrutiny/verify` | `POST` | Affix regional scrutiny seal and confirm unencumbered lien |
| `/api/scrutiny/reject` | `POST` | Flag document discrepancy and dispatch deficiency memo |
| `/api/sanctions` | `GET` | Retrieve cross-bureau gate status (EVC, Ombudsman, Court) |
| `/api/sanctions/toggle` | `POST` | Toggle individual gate status or overall policy freeze |
| `/api/escalation` | `GET` | Retrieve 4-tier escalation hierarchy and notice status |
| `/api/escalation/trigger/:tier` | `POST` | Simulate automated dispatch of escalation notice |
| `/api/escalation/generate-scn/:id` | `GET` | Auto-generate draft statutory Show-Cause Notice order |
| `/api/calculator/compute` | `POST` | Table 1.4 required capital with affirmative concessions & lease multiplier |
| `/api/calculator/forfeiture` | `POST` | Compute 10%–50% forfeiture deduction vs net trust refund |
| `/api/ledger` | `GET` | Retrieve chronological SHA-256 chained event blocks |
| `/api/ledger/verify` | `GET` | Recalculate block hashes to verify chain integrity |
| `/api/sfms/messages` | `GET` | Retrieve ISO-15022 SFMS telecommunication messages |
| `/api/sfms/transmit` | `POST` | Transmit simulated MT760 tripartite lien advice |
| `/api/sfms/heartbeat` | `POST` | Ping Core Banking system for MT799 encumbrance heartbeat |
| `/api/analytics/yield` | `GET` | Accrued interest yield allocations (Pragati, Saksham, ATAL) |
| `/api/analytics/regional-map` | `GET` | Pan-India regional bureau capital concentration & compliance rates |
| `/api/copilot/query` | `POST` | Query AI Regulatory Copilot on APH gazette regulations |

---

## 🛠️ Getting Started

### Prerequisites
- **Node.js** (v18.0.0 or higher)
- **npm** (v9.0.0 or higher)

### 1. Clone the repository
```bash
git clone https://github.com/Aditya099pat/sih.git
cd sih
```

### 2. Install dependencies
```bash
npm install
```

### 3. Launch the unified development server
```bash
npm run dev
```
> The application will start at **`http://localhost:3000`**. The Vite server automatically mounts the Express API at `/api/*`, enabling full frontend and backend functionality in a single terminal.

### 4. Build for production
```bash
npm run build
```

---

## 🎨 Design System Tokens

The application strictly adheres to the official **GovTech / Fintech Design System**:

| Token Name | Hex Code | Purpose |
|---|---|---|
| **Primary Navy** | `#0D3B66` | Header, primary CTA buttons, active state indicators |
| **National Saffron** | `#E65100` | Tricolor ribbon accent, notification badges, warnings |
| **National Green** | `#138808` | Tricolor ribbon, compliance verified tokens |
| **Surface Canvas** | `#F8FAFC` | Page background canvas (soft contrast neutral) |
| **Card Surface** | `#FFFFFF` | Containers, data tables, modals, right drawer |
| **Border Neutral** | `#E2E8F0` | Crisp 1px solid dividers |
| **Text Primary** | `#0F172A` | Headings, primary labels, numerical metrics |
| **Text Muted** | `#64748B` | Field captions, secondary details, dates |
| **Status: Valid** | `#059669` (bg: `#ECFDF5`) | Active compliance, bank-confirmed FDRs |
| **Status: Expiring** | `#D97706` (bg: `#FFFBEB`) | Maturing in < 90/60/30 days, renewal alerts |
| **Status: Delinquent** | `#DC2626` (bg: `#FEF2F2`) | Discrepancies, sanctions, overdue T-0 items |

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
