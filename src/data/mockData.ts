import { FDRInstrument, AuditLogItem, BankLinkage, DossierDocument } from '../types';

export const INITIAL_INSTRUMENTS: FDRInstrument[] = [
  {
    id: 'fdr-1',
    ref: 'FDR-SBIN-2018-09',
    discipline: 'B.Tech Engineering & Tech (Est. 2018)',
    disciplineCategory: 'engineering',
    disciplineCode: 'UG-ENGG-01',
    dotColor: '#f97316', // orange dot
    type: 'Joint Fixed Deposit',
    custodyMode: 'Physical Custody @ AICTE HQ',
    bankName: 'State Bank of India',
    branchName: 'Nariman Point Br.',
    ifsc: 'SBIN0001423',
    principalAmount: 3500000,
    accruedInterest: 648200,
    interestRate: 7.25,
    issueDate: '15 Dec 2018',
    maturityDate: '15 Dec 2026',
    remainingDays: 42,
    termYears: 8,
    verificationSource: 'Trust Declared',
    bankApiStatus: 'SBI CBS ✓',
    statutoryStatus: 'Maturing in 42 Days',
    statusType: 'warning',
    jointLienWith: 'Member Secretary, AICTE New Delhi',
    fdrReceiptNo: 'SBI-FD-77291044',
    sfmsReference: 'SFMS/2018/L799/0091823',
    eStampNumber: 'IN-MH889210947721A',
    intakeCapacity: 300,
    approvedYear: '2018-19'
  },
  {
    id: 'fdr-2',
    ref: 'FDR-PNB-2020-04',
    discipline: 'B.Tech Engineering Additional Intake',
    disciplineCategory: 'engineering',
    disciplineCode: 'UG-ENGG-ADDL',
    dotColor: '#10b981', // green dot
    type: 'Joint Fixed Deposit',
    custodyMode: 'SFMS e-Lien Registered',
    bankName: 'Punjab National Bank',
    branchName: 'Fort Branch',
    ifsc: 'PUNB0012900',
    principalAmount: 5000000,
    accruedInterest: 892450,
    interestRate: 7.10,
    issueDate: '01 Jul 2020',
    maturityDate: '30 Jun 2028',
    remainingDays: 614,
    termYears: 8,
    verificationSource: 'Trust Declared',
    bankApiStatus: 'PNB Direct ✓',
    statutoryStatus: 'Active (>180 Days)',
    statusType: 'success',
    jointLienWith: 'Regional Officer, AICTE WRO Mumbai & Member Secretary',
    fdrReceiptNo: 'PNB-E-FDR-9023411',
    sfmsReference: 'SFMS/2020/L799/992140',
    eStampNumber: 'IN-MH99218471922B',
    intakeCapacity: 120,
    approvedYear: '2020-21'
  },
  {
    id: 'fdr-3',
    ref: 'FDR-SBIN-2023-11',
    discipline: 'Post Graduate MBA Discipline',
    disciplineCategory: 'management',
    disciplineCode: 'PG-MGMT-MBA',
    dotColor: '#3b82f6', // blue dot
    type: 'Direct RTGS Custody',
    custodyMode: 'Central Lien Sub-account',
    bankName: 'State Bank of India',
    branchName: 'Bandra Kurla Br.',
    ifsc: 'SBIN0004521',
    principalAmount: 2000000,
    accruedInterest: 302240,
    interestRate: 7.15,
    issueDate: '11 Nov 2023',
    maturityDate: '10 Nov 2031',
    remainingDays: 1842,
    termYears: 8,
    verificationSource: 'Trust Declared',
    bankApiStatus: 'Pending Verification',
    statutoryStatus: 'Under Scrutiny',
    statusType: 'info',
    jointLienWith: 'Member Secretary, AICTE New Delhi',
    fdrReceiptNo: 'SBI-FD-88392019',
    sfmsReference: 'SFMS/2023/RTGS/441029',
    eStampNumber: 'IN-MH44910284712C',
    intakeCapacity: 60,
    approvedYear: '2023-24'
  }
];

export const INITIAL_AUDIT_LOGS: AuditLogItem[] = [
  {
    id: 'log-1',
    title: 'Phase-5 Rollover Window Initiated',
    timestamp: 'Today, 10:14 AM',
    date: '2026-10-24',
    type: 'alert',
    description: 'Automated 45-day statutory milestone reminder triggered for FDR-SBIN-2018-09. Lien letter dispatched to State Bank of India, Nariman Point.',
    txnId: '#AICTE-WRO-2025-9982',
    actionDue: '15 Nov 2026',
    hash: '0x8f2a...771c99',
    actor: 'AICTE Automated Rule Engine'
  },
  {
    id: 'log-2',
    title: 'SFMS Core Banking API Verified',
    timestamp: '22 Oct 2025',
    date: '2025-10-22',
    type: 'success',
    description: 'Periodic balance & non-encashment lien status successfully verified via PNB Core Banking SFMS Gateway for Instrument FDR-PNB-2020-04.',
    txnId: '#SFMS-API-PNB-8831',
    hash: '0x33e1...b049d2',
    actor: 'PNB Gateway v2.4.1'
  },
  {
    id: 'log-3',
    title: 'Statutory Affidavit-6 Uploaded',
    timestamp: '14 Sep 2025',
    date: '2025-09-14',
    type: 'document',
    description: 'Dr. Rajesh K. Sharma (Registrar) digitally signed and uploaded ₹100 e-Stamp Affidavit affirming no prior lien or legal encumbrance.',
    txnId: '#E-STAMP-MH-4402',
    hash: '0xaa94...55ef10',
    actor: 'Dr. Rajesh K. Sharma (Registrar)'
  },
  {
    id: 'log-4',
    title: 'Joint Lien Member Secretary Endorsement',
    timestamp: '11 Nov 2023',
    date: '2023-11-11',
    type: 'success',
    description: 'AICTE Bureau Approval Division counter-signed and registered joint security custody for PG MBA program.',
    txnId: '#AICTE-DEL-2023-4109',
    hash: '0x17c0...398fae',
    actor: 'Regional Officer, WRO Mumbai'
  }
];

export const INITIAL_BANK_LINKAGES: BankLinkage[] = [
  {
    id: 'bank-sbi',
    bankName: 'State Bank of India',
    shortCode: 'SBI',
    sfmsCode: 'SBIN0001423',
    status: 'Active',
    protocol: 'CBS-Direct / SFMS 799',
    lastPing: 'Synced 2 mins ago',
    latencyMs: 142,
    logoBg: '#002546',
    logoText: 'SBI'
  },
  {
    id: 'bank-pnb',
    bankName: 'Punjab National Bank',
    shortCode: 'PNB',
    sfmsCode: 'PUNB0012900',
    status: 'Active',
    protocol: 'SFMS Gateway v2.4.1',
    lastPing: 'Synced 4 mins ago',
    latencyMs: 188,
    logoBg: '#904d00',
    logoText: 'PNB'
  },
  {
    id: 'bank-pfms',
    bankName: 'Public Financial Mgmt System',
    shortCode: 'RBI (PFMS)',
    sfmsCode: 'Central Sanction Protocol Linked',
    status: 'Active',
    protocol: 'Govt. Direct Sanction Portal',
    lastPing: 'Active Heartbeat',
    latencyMs: 95,
    logoBg: '#0284c7',
    logoText: 'RBI'
  }
];

export const INITIAL_DOSSIER_DOCS: DossierDocument[] = [
  {
    id: 'doc-1',
    title: 'Statutory Affidavit-6 (No Encumbrance Affirmation)',
    documentType: 'Legal Affidavit on Non-Judicial e-Stamp',
    stampValue: '₹100 e-Stamp IN-MH889210947721A',
    fdrRef: 'FDR-SBIN-2018-09',
    uploadDate: '15 Dec 2018 (Renewal Pending)',
    signatory: 'Dr. Rajesh K. Sharma & Trust Chairman',
    fileSize: '2.4 MB (Signed PDF/A)',
    verified: true,
    status: 'Verified & Encrypted'
  },
  {
    id: 'doc-2',
    title: 'Original FDR Fixed Deposit Receipt Front & Reverse Scan',
    documentType: 'Bank Deposit Certificate (Security Grade)',
    fdrRef: 'FDR-SBIN-2018-09',
    uploadDate: '16 Dec 2018',
    signatory: 'Chief Manager, SBI Nariman Point',
    fileSize: '4.8 MB (High-Res 300DPI)',
    verified: true,
    status: 'Verified & Encrypted'
  },
  {
    id: 'doc-3',
    title: 'SFMS Structured Financial Messaging System Advice (MT760/799)',
    documentType: 'Inter-Bank Structured Financial Message',
    fdrRef: 'FDR-PNB-2020-04',
    uploadDate: '02 Jul 2020',
    signatory: 'PNB Treasury Gateway Hub',
    fileSize: '840 KB (Encrypted XML+PDF)',
    verified: true,
    status: 'Verified & Encrypted'
  },
  {
    id: 'doc-4',
    title: 'Joint Lien Undertaking & Tripartite Covenant (AICTE Format-B)',
    documentType: 'Statutory Tripartite Covenant',
    fdrRef: 'FDR-PNB-2020-04',
    uploadDate: '05 Jul 2020',
    signatory: 'Registrar, Trust Secretary & AICTE WRO',
    fileSize: '3.1 MB (Signed PDF/A)',
    verified: true,
    status: 'Verified & Encrypted'
  },
  {
    id: 'doc-5',
    title: 'Post Graduate MBA Sanction Lien Certificate',
    documentType: 'Lien Marking Confirmation',
    fdrRef: 'FDR-SBIN-2023-11',
    uploadDate: '14 Nov 2023',
    signatory: 'Branch Manager, SBI BKC',
    fileSize: '1.9 MB (Submitted PDF)',
    verified: false,
    status: 'Under Regional Scrutiny'
  }
];

export const TABLE_1_4_RATES = [
  { program: 'Engineering & Technology (Degree)', minorityWomen: 2800000, unreserved: 3500000, tenureYears: 8 },
  { program: 'Management / MBA (PG)', minorityWomen: 1500000, unreserved: 2000000, tenureYears: 8 },
  { program: 'Pharmacy (B.Pharm / M.Pharm)', minorityWomen: 2500000, unreserved: 3000000, tenureYears: 8 },
  { program: 'Architecture & Planning', minorityWomen: 1500000, unreserved: 2000000, tenureYears: 8 },
  { program: 'MCA (Computer Applications)', minorityWomen: 1500000, unreserved: 2000000, tenureYears: 8 },
  { program: 'Hotel Management & Catering (HMCT)', minorityWomen: 1500000, unreserved: 2000000, tenureYears: 8 },
  { program: 'Applied Arts & Crafts / Design', minorityWomen: 1500000, unreserved: 2000000, tenureYears: 8 },
  { program: 'Diploma in Engineering (Polytechnic)', minorityWomen: 1200000, unreserved: 1500000, tenureYears: 8 }
];

export const FORMAT_INDIAN_CURRENCY = (num: number): string => {
  return '₹' + num.toLocaleString('en-IN');
};
