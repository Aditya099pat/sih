import {
  generateInstruments,
  generateAuditChain,
  generateSfmsMessages,
  generateDossierDocs,
  generateSanctionsList,
  BANKS
} from "./dataGenerator.js";

// Generate 1,350 realistic statutory instruments across India
export const INITIAL_INSTRUMENTS = generateInstruments(1350);

// Generate 1,350 cryptographic chained audit blocks
export const INITIAL_AUDIT_LOGS = generateAuditChain(INITIAL_INSTRUMENTS, 1350);

// Generate 1000 SFMS Core Banking simulator messages
export const INITIAL_SFMS_MESSAGES = generateSfmsMessages(INITIAL_INSTRUMENTS, 1000);

// Generate 1000 Legal Dossiers & e-Stamp Affidavits
export const INITIAL_DOSSIER_DOCS = generateDossierDocs(INITIAL_INSTRUMENTS, 1000);

// Generate Sanctions & Grievance list
export const INITIAL_SANCTIONS_LIST = generateSanctionsList(INITIAL_INSTRUMENTS);

// Comprehensive list of Scheduled Commercial Bank linkages
export const INITIAL_BANK_LINKAGES = [
  {
    id: "bank-sbi",
    bankName: "State Bank of India",
    shortCode: "SBI",
    sfmsCode: "SBIN0001423",
    status: "Active",
    protocol: "CBS-Direct / SFMS 799",
    lastPing: "Synced 2 mins ago",
    latencyMs: 142,
    logoBg: "#002546",
    logoText: "SBI",
    activePledgesCount: INITIAL_INSTRUMENTS.filter(i => i.bankName.includes("State Bank")).length
  },
  {
    id: "bank-pnb",
    bankName: "Punjab National Bank",
    shortCode: "PNB",
    sfmsCode: "PUNB0012900",
    status: "Active",
    protocol: "SFMS Gateway v2.4.1",
    lastPing: "Synced 4 mins ago",
    latencyMs: 188,
    logoBg: "#904d00",
    logoText: "PNB",
    activePledgesCount: INITIAL_INSTRUMENTS.filter(i => i.bankName.includes("Punjab")).length
  },
  {
    id: "bank-bob",
    bankName: "Bank of Baroda",
    shortCode: "BOB",
    sfmsCode: "BARB0ANDHER",
    status: "Active",
    protocol: "CBS SFMS L799 Engine",
    lastPing: "Synced 1 min ago",
    latencyMs: 120,
    logoBg: "#f97316",
    logoText: "BOB",
    activePledgesCount: INITIAL_INSTRUMENTS.filter(i => i.bankName.includes("Baroda")).length
  },
  {
    id: "bank-cnrb",
    bankName: "Canara Bank",
    shortCode: "CNRB",
    sfmsCode: "CNRB0000412",
    status: "Active",
    protocol: "Finacle SFMS Link",
    lastPing: "Synced 3 mins ago",
    latencyMs: 165,
    logoBg: "#0284c7",
    logoText: "CNRB",
    activePledgesCount: INITIAL_INSTRUMENTS.filter(i => i.bankName.includes("Canara")).length
  },
  {
    id: "bank-ubin",
    bankName: "Union Bank of India",
    shortCode: "UBIN",
    sfmsCode: "UBIN0531201",
    status: "Active",
    protocol: "SFMS Gateway v3",
    lastPing: "Synced 5 mins ago",
    latencyMs: 175,
    logoBg: "#dc2626",
    logoText: "UBIN",
    activePledgesCount: INITIAL_INSTRUMENTS.filter(i => i.bankName.includes("Union")).length
  },
  {
    id: "bank-pfms",
    bankName: "Public Financial Mgmt System (PFMS)",
    shortCode: "RBI (PFMS)",
    sfmsCode: "Central Sanction Protocol Linked",
    status: "Active",
    protocol: "Govt. Direct Sanction Portal",
    lastPing: "Active Heartbeat",
    latencyMs: 95,
    logoBg: "#0284c7",
    logoText: "RBI",
    activePledgesCount: INITIAL_INSTRUMENTS.length
  }
];

export const TABLE_1_4_RATES = [
  { program: "Engineering & Technology (Degree)", minorityWomen: 28e5, unreserved: 35e5, tenureYears: 8 },
  { program: "Management / MBA (PG)", minorityWomen: 15e5, unreserved: 2e6, tenureYears: 8 },
  { program: "Pharmacy (B.Pharm / M.Pharm)", minorityWomen: 25e5, unreserved: 3e6, tenureYears: 8 },
  { program: "Architecture & Planning", minorityWomen: 15e5, unreserved: 2e6, tenureYears: 8 },
  { program: "MCA (Computer Applications)", minorityWomen: 15e5, unreserved: 2e6, tenureYears: 8 },
  { program: "Hotel Management & Catering (HMCT)", minorityWomen: 15e5, unreserved: 2e6, tenureYears: 8 },
  { program: "Applied Arts & Crafts / Design", minorityWomen: 15e5, unreserved: 2e6, tenureYears: 8 },
  { program: "Diploma in Engineering (Polytechnic)", minorityWomen: 12e5, unreserved: 15e5, tenureYears: 8 }
];

export const FORMAT_INDIAN_CURRENCY = (num) => {
  if (num === null || num === undefined || isNaN(num)) return "₹0";
  return "₹" + Number(num).toLocaleString("en-IN");
};

// Compact formatter for large values in Crores / Lakhs
export const FORMAT_COMPACT_CURRENCY = (num) => {
  if (num === null || num === undefined || isNaN(num)) return "₹0";
  const val = Number(num);
  if (val >= 1e7) {
    return `₹${(val / 1e7).toFixed(2)} Cr`;
  }
  if (val >= 1e5) {
    return `₹${(val / 1e5).toFixed(2)} L`;
  }
  return FORMAT_INDIAN_CURRENCY(val);
};
