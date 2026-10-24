import crypto from 'crypto';

// SHA-256 helper
export function generateSha256(content) {
  return crypto.createHash('sha256').update(typeof content === 'string' ? content : JSON.stringify(content)).digest('hex');
}

// Initial Instruments Repository (Multi-instrument under PID 1-1029384)
export const initialInstruments = [
  {
    id: 'fdr-1',
    ref: 'FDR-SBIN-2018-09',
    instituteCode: '1-1029384',
    instituteName: 'Bharati Vidya Sansthan',
    campusType: 'Owned Campus',
    discipline: 'B.Tech Engineering & Technology (Main Program)',
    disciplineCategory: 'engineering',
    disciplineCode: 'UG-ENGG-01',
    dotColor: '#D97706',
    type: 'Joint Fixed Deposit',
    custodyMode: 'SFMS e-Lien Registered',
    bankName: 'State Bank of India',
    branchName: 'Nariman Point Br., Mumbai',
    ifsc: 'SBIN0001423',
    principalAmount: 3500000,
    accruedInterest: 648200,
    interestRate: 7.25,
    issueDate: '15 Dec 2018',
    maturityDate: '15 Dec 2026',
    remainingDays: 42,
    termYears: 8,
    verificationSource: 'Trust Declared & Bank Confirmed',
    bankApiStatus: 'SBI CBS ✓',
    bankConfirmed: true,
    bankConfirmedBy: 'State Bank of India CBS Gateway',
    statutoryStatus: 'Maturing in 42 Days',
    statusType: 'warning',
    jointLienWith: 'Member Secretary, AICTE New Delhi',
    fdrReceiptNo: 'SBI-FD-77291044',
    sfmsReference: 'SFMS/2018/L799/0091823',
    eStampNumber: 'IN-MH889210947721A',
    intakeCapacity: 300,
    approvedYear: '2018-19',
    phaseReleaseEligible: true,
    ocrConfidence: 98.4,
    hasDiscrepancy: false
  },
  {
    id: 'fdr-2',
    ref: 'FDR-PNB-2020-04',
    instituteCode: '1-1029384',
    instituteName: 'Bharati Vidya Sansthan',
    campusType: 'Owned Campus',
    discipline: 'B.Tech Computer Science Additional Intake',
    disciplineCategory: 'engineering',
    disciplineCode: 'UG-ENGG-ADDL',
    dotColor: '#059669',
    type: 'Joint Fixed Deposit',
    custodyMode: 'SFMS e-Lien Registered',
    bankName: 'Punjab National Bank',
    branchName: 'Fort Branch, Mumbai',
    ifsc: 'PUNB0012900',
    principalAmount: 5000000,
    accruedInterest: 892450,
    interestRate: 7.10,
    issueDate: '01 Jul 2020',
    maturityDate: '30 Jun 2028',
    remainingDays: 614,
    termYears: 8,
    verificationSource: 'Trust Declared & Bank Confirmed',
    bankApiStatus: 'PNB Direct ✓',
    bankConfirmed: true,
    bankConfirmedBy: 'Punjab National Bank Direct SFMS',
    statutoryStatus: 'Active (>180 Days)',
    statusType: 'success',
    jointLienWith: 'Regional Officer, AICTE WRO Mumbai & Member Secretary',
    fdrReceiptNo: 'PNB-E-FDR-9023411',
    sfmsReference: 'SFMS/2020/L799/992140',
    eStampNumber: 'IN-MH99218471922B',
    intakeCapacity: 120,
    approvedYear: '2020-21',
    phaseReleaseEligible: false,
    ocrConfidence: 99.1,
    hasDiscrepancy: false
  },
  {
    id: 'fdr-3',
    ref: 'FDR-SBIN-2023-11',
    instituteCode: '1-1029384',
    instituteName: 'Bharati Vidya Sansthan',
    campusType: 'Owned Campus',
    discipline: 'Post Graduate MBA Discipline',
    disciplineCategory: 'management',
    disciplineCode: 'PG-MGMT-MBA',
    dotColor: '#0D3B66',
    type: 'Direct RTGS Custody',
    custodyMode: 'Central Lien Sub-account',
    bankName: 'State Bank of India',
    branchName: 'Bandra Kurla Br., Mumbai',
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
    bankConfirmed: false,
    statutoryStatus: 'Under Scrutiny',
    statusType: 'info',
    jointLienWith: 'Member Secretary, AICTE New Delhi',
    fdrReceiptNo: 'SBI-FD-88392019',
    sfmsReference: 'SFMS/2023/RTGS/441029',
    eStampNumber: 'IN-MH44910284712C',
    intakeCapacity: 60,
    approvedYear: '2023-24',
    phaseReleaseEligible: false,
    ocrConfidence: 94.2,
    hasDiscrepancy: false
  },
  {
    id: 'fdr-4',
    ref: 'FDR-CNRB-2022-07',
    instituteCode: '1-1029384',
    instituteName: 'Bharati Vidya Sansthan',
    campusType: 'Leasehold Campus (2x Multiplier)',
    discipline: 'M.Tech Artificial Intelligence & Robotics',
    disciplineCategory: 'engineering',
    disciplineCode: 'PG-ENGG-AIR',
    dotColor: '#DC2626',
    type: 'Joint Fixed Deposit',
    custodyMode: 'Branch Custody Scanned Copy',
    bankName: 'Canara Bank',
    branchName: 'Shivaji Nagar Br., Pune',
    ifsc: 'CNRB0000412',
    principalAmount: 1500000,
    accruedInterest: 184000,
    interestRate: 7.00,
    issueDate: '14 Aug 2022',
    maturityDate: '13 Aug 2030',
    remainingDays: 1388,
    termYears: 8,
    verificationSource: 'Trust Declared',
    bankApiStatus: 'Discrepancy Alert ✕',
    bankConfirmed: false,
    hasDiscrepancy: true,
    discrepancyNote: 'Lien Clause in uploaded certificate omits "Member Secretary AICTE" joint pledge condition.',
    statutoryStatus: 'Discrepancy Flagged',
    statusType: 'error',
    jointLienWith: 'Pending AICTE Endorsement',
    fdrReceiptNo: 'CNRB-FD-4491024',
    sfmsReference: 'SFMS/2022/CAN/882190',
    eStampNumber: 'IN-MH77192840192D',
    intakeCapacity: 30,
    approvedYear: '2022-23',
    phaseReleaseEligible: false,
    ocrConfidence: 81.3
  },
  {
    id: 'fdr-5',
    ref: 'FDR-BOB-2019-10',
    instituteCode: '1-1029384',
    instituteName: 'Bharati Vidya Sansthan',
    campusType: 'Owned Campus',
    discipline: 'Diploma in Computer Engineering (Polytechnic)',
    disciplineCategory: 'other',
    disciplineCode: 'DIP-POLY-CE',
    dotColor: '#059669',
    type: 'Joint Fixed Deposit',
    custodyMode: 'SFMS e-Lien Registered',
    bankName: 'Bank of Baroda',
    branchName: 'Andheri East Br., Mumbai',
    ifsc: 'BARB0ANDHER',
    principalAmount: 2500000,
    accruedInterest: 512000,
    interestRate: 7.20,
    issueDate: '20 Oct 2019',
    maturityDate: '19 Oct 2027',
    remainingDays: 359,
    termYears: 8,
    verificationSource: 'Trust Declared & Bank Confirmed',
    bankApiStatus: 'SBI CBS ✓',
    bankConfirmed: true,
    bankConfirmedBy: 'Bank of Baroda CBS Gateway',
    statutoryStatus: 'Active (>180 Days)',
    statusType: 'success',
    jointLienWith: 'Member Secretary, AICTE New Delhi',
    fdrReceiptNo: 'BOB-FD-99482103',
    sfmsReference: 'SFMS/2019/L799/331092',
    eStampNumber: 'IN-MH55219034812E',
    intakeCapacity: 60,
    approvedYear: '2019-20',
    phaseReleaseEligible: false,
    ocrConfidence: 97.8,
    hasDiscrepancy: false
  }
];

// Cross-Bureau Sanctions & Litigation Registry (USP 2: Policy-as-Code Freeze)
export const initialSanctionsRegistry = {
  institutionPid: '1-1029384',
  institutionName: 'Bharati Vidya Sansthan',
  hasActiveSanction: true,
  sanctionType: 'STUDENT_OMBUDSMAN_GRIEVANCE',
  sanctionTitle: 'Pending Fee Ombudsman Grievance & Provisional Intake Sanction',
  sanctionDetails: 'Student Grievance Redressal Committee Order #GRC/2026/WRO/892: Pending refund of excess capitation fee (₹14.5 Lakhs) for 12 aggrieved students. Section 1.4.9 statutory freeze in effect.',
  issuedBy: 'State Fee Regulatory Authority & AICTE WRO Grievance Ombudsman',
  issuedDate: '12 Sep 2026',
  orderRef: 'OMBUD-WRO-2026-0892',
  hardLockPhase5Release: true,
  penaltyDeductionEnforced: 20, // 20% forfeiture
  legalCases: [
    {
      caseNo: 'WP(C) 4410/2026',
      court: 'High Court of Bombay',
      subject: 'Staff Salary Pay Commission Arrears',
      status: 'Stay on Deposit Liquidation'
    }
  ]
};

// Multi-Stage Automated Escalation Ladder (USP 3)
export const initialEscalationLadder = [
  {
    tier: 'T-180 Days',
    target: 'College Signatory (Registrar)',
    channel: 'In-Portal Notification & Email Dispatch',
    status: 'Executed',
    date: '18 Jun 2026',
    actionItem: 'Statutory 8-Year Maturity Advisory dispatched.',
    readStatus: true
  },
  {
    tier: 'T-90 Days',
    target: 'College Principal & Trust Secretary',
    channel: 'Registered Email & Portal Urgent Banner',
    status: 'Executed',
    date: '16 Sep 2026',
    actionItem: 'Phase-5 Rollover Window Activated (Format-6 Affidavit due).',
    readStatus: true
  },
  {
    tier: 'T-60 Days',
    target: 'Trust Chairman & Managing Trustee',
    channel: 'SMS Gateway Dispatch (+91 98200 11223)',
    status: 'Executed',
    date: '16 Oct 2026',
    actionItem: 'SMS Alert: FDR-SBIN-2018-09 matures in 60 days. Statutory lien action mandatory.',
    readStatus: true
  },
  {
    tier: 'T-30 Days',
    target: 'Regional Officer High-Priority Scrutiny Desk',
    channel: 'WRO Priority Queue Flagging',
    status: 'Active Alert',
    date: '15 Nov 2026 (Due in 22 Days)',
    actionItem: 'Flagged on Regional Director Priority Scrutiny Desk for non-renewal.',
    readStatus: false
  },
  {
    tier: 'T-0 Days (Maturity)',
    target: 'Council Head & Approval Bureau',
    channel: 'Automated Show-Cause Notice (SCN) Generator',
    status: 'Scheduled',
    date: '15 Dec 2026',
    actionItem: 'Auto-generate Statutory Show-Cause Notice with provisional intake embargo.',
    readStatus: false
  }
];

// Cryptographic SHA-256 Audit Blocks (USP 5: Immutable Chain)
export const initialAuditChain = [
  {
    index: 1,
    title: 'Genesis Block · Institutional Deposit Registry Initialized',
    timestamp: '15 Dec 2018, 10:00:00 IST',
    action: 'GENESIS_REGISTRATION',
    actor: 'AICTE HQ Approval Bureau',
    previousHash: '0000000000000000000000000000000000000000000000000000000000000000',
    hash: '0e39b7405796c5614918e7d23d8c47b59ef9120785195b4f87a89e1a9c3947a1',
    data: {
      pid: '1-1029384',
      instrumentRef: 'FDR-SBIN-2018-09',
      principal: 3500000,
      lien: 'Member Secretary AICTE'
    }
  },
  {
    index: 2,
    title: 'SFMS MT760 Joint Lien Advice Confirmed',
    timestamp: '18 Dec 2018, 14:22:10 IST',
    action: 'SFMS_MT760_VERIFIED',
    actor: 'SBI Core Banking Gateway',
    previousHash: '0e39b7405796c5614918e7d23d8c47b59ef9120785195b4f87a89e1a9c3947a1',
    hash: '3f84b1427189a0e6981cf5d98471c261895a940176829e847192847198274182',
    data: {
      sfmsCode: 'SFMS/2018/L799/0091823',
      cbsMatch: true,
      bank: 'State Bank of India'
    }
  },
  {
    index: 3,
    title: 'Bureau Scrutiny Seal & Legal Lien Affixed',
    timestamp: '22 Dec 2018, 11:05:40 IST',
    action: 'SCRUTINY_SEAL_APPROVED',
    actor: 'Regional Officer, AICTE WRO Mumbai',
    previousHash: '3f84b1427189a0e6981cf5d98471c261895a940176829e847192847198274182',
    hash: '8912e74928174829174829174982718947291847192847192847192847192847',
    data: {
      scrutinyOfficer: 'Sh. V. K. Nambiar (ADG)',
      status: 'Active Encumbrance',
      tenor: 8
    }
  },
  {
    index: 4,
    title: 'SFMS MT799 Periodic Non-Encashment Heartbeat Confirmed',
    timestamp: '15 Oct 2026, 09:30:15 IST',
    action: 'MT799_HEARTBEAT_ACK',
    actor: 'SBI Core Banking System',
    previousHash: '8912e74928174829174829174982718947291847192847192847192847192847',
    hash: '9a712e4827194829174829174829174829174829174829174829174829174829',
    data: {
      balanceVerified: 3500000,
      accruedInterest: 648200,
      encumbranceFree: true
    }
  },
  {
    index: 5,
    title: 'Cross-Bureau Sanction Gate Hard-Freeze Imposed',
    timestamp: '24 Oct 2026, 16:45:00 IST',
    action: 'SANCTION_FREEZE_LOCKED',
    actor: 'AICTE Policy-as-Code Engine',
    previousHash: '9a712e4827194829174829174829174829174829174829174829174829174829',
    hash: 'b149182749182749182749182749182749182749182749182749182749182749',
    data: {
      sanctionRef: 'OMBUD-WRO-2026-0892',
      reason: 'Student Fee Grievance pending resolution',
      phase5Locked: true
    }
  }
];

// SFMS Core Banking Simulator Logs (USP 6)
export const initialSfmsMessages = [
  {
    id: 'sfms-01',
    type: 'MT760',
    messageType: 'MT760',
    title: 'Advice of Guarantee / Joint Lien Issuance',
    bank: 'State Bank of India',
    senderBic: 'SBININBB001',
    receiverBic: 'AICTINBBXXX',
    sfmsReference: 'TRX-77291044-L760',
    amount: 3500000,
    direction: 'Inbound to AICTE Gateway',
    timestamp: '15 Dec 2018 11:30:00 IST',
    rawTelegram: `{1:F01SBININBB0010000000000}{2:I760AICTINBBXXXXN}{4:\n:20:TRX-77291044-L760\n:23B:ISSUE\n:31C:181215\n:40C:URDG\n:50:BHARATI VIDYA SANSTHAN, MUMBAI\n:59:MEMBER SECRETARY, AICTE NEW DELHI\n:32B:INR3500000,00\n:77C:JOINT LIEN MARKED IRREVOCABLY IN FAVOUR OF MEMBER SECRETARY AICTE UNTIL STATUTORY DISCHARGE\n-}`,
    fields: {
      '20': 'TRX-77291044-L760',
      '23B': 'ISSUE',
      '31C': '181215 (Date of Issue: 15/12/2018)',
      '40C': 'URDG',
      '50': 'BHARATI VIDYA SANSTHAN, MUMBAI',
      '59': 'MEMBER SECRETARY, AICTE NEW DELHI',
      '32B': 'INR 3500000,00',
      '77C': 'JOINT LIEN MARKED IRREVOCABLY IN FAVOUR OF MEMBER SECRETARY AICTE UNTIL STATUTORY DISCHARGE'
    },
    status: 'ACK_DELIVERED'
  },
  {
    id: 'sfms-02',
    type: 'MT799',
    messageType: 'MT799',
    title: 'Free-Format Encumbrance & Balance Heartbeat',
    bank: 'State Bank of India',
    senderBic: 'SBININBB001',
    receiverBic: 'AICTINBBXXX',
    sfmsReference: 'HBEAT-2026-10-24-001',
    amount: 3500000,
    direction: 'Bidirectional Gateway Heartbeat',
    timestamp: '24 Oct 2026 10:15:22 IST',
    rawTelegram: `{1:F01SBININBB0010000000000}{2:I799AICTINBBXXXXN}{4:\n:20:HBEAT-2026-10-24-001\n:21:FDR-SBIN-2018-09\n:79:CONFIRMED: PRINCIPAL BALANCE OF INR 35,00,000 REMAINS UNENCUMBERED IN JOINT LIEN WITH AICTE. NO UNAUTHORIZED PRE-CLOSURE PERMITTED.\n-}`,
    fields: {
      '20': 'HBEAT-2026-10-24-001',
      '21': 'FDR-SBIN-2018-09',
      '79': 'CONFIRMED: PRINCIPAL BALANCE OF INR 35,00,000 REMAINS UNENCUMBERED IN JOINT LIEN WITH AICTE. NO UNAUTHORIZED PRE-CLOSURE PERMITTED.'
    },
    status: 'VERIFIED_ACTIVE'
  }
];

// Yield & Scholarship Reinvestment Analytics (Value-Add)
export const initialScholarshipYield = {
  totalAccruedAssigned: 1842890,
  fiscalYear: '2025-26',
  fundsAllocated: [
    {
      scheme: 'AICTE Pragati Scholarship for Girls',
      allocationAmount: 920000,
      studentsSupported: 18,
      percentage: 50,
      color: '#059669'
    },
    {
      scheme: 'AICTE Saksham Scholarship for Differently-Abled',
      allocationAmount: 550000,
      studentsSupported: 11,
      percentage: 30,
      color: '#0D3B66'
    },
    {
      scheme: 'ATAL Academy Faculty Research & Innovation Grants',
      allocationAmount: 372890,
      projectsSupported: 4,
      percentage: 20,
      color: '#D97706'
    }
  ]
};

// Regional Geospatial Compliance Clusters (Value-Add)
export const initialRegionalData = [
  {
    region: 'Western Region (WRO)',
    hq: 'Mumbai',
    states: ['Maharashtra', 'Gujarat', 'Goa'],
    institutes: 1240,
    totalFdrCapital: '₹ 420.50 Cr',
    capitalNum: 420.50,
    compliancePct: 98.4,
    maturingCount: 14,
    defaultCluster: 'Low Risk',
    color: '#059669'
  },
  {
    region: 'Northern Region (NRO)',
    hq: 'Kanpur',
    states: ['Uttar Pradesh', 'Uttarakhand'],
    institutes: 1420,
    totalFdrCapital: '₹ 388.20 Cr',
    capitalNum: 388.20,
    compliancePct: 94.2,
    maturingCount: 22,
    defaultCluster: 'Moderate Risk',
    color: '#D97706'
  },
  {
    region: 'Southern Region (SRO)',
    hq: 'Chennai',
    states: ['Tamil Nadu', 'Puducherry'],
    institutes: 1680,
    totalFdrCapital: '₹ 510.80 Cr',
    capitalNum: 510.80,
    compliancePct: 99.1,
    maturingCount: 9,
    defaultCluster: 'Low Risk',
    color: '#059669'
  },
  {
    region: 'South-Western Region (SWRO)',
    hq: 'Bengaluru',
    states: ['Karnataka', 'Kerala'],
    institutes: 1110,
    totalFdrCapital: '₹ 345.60 Cr',
    capitalNum: 345.60,
    compliancePct: 97.8,
    maturingCount: 12,
    defaultCluster: 'Low Risk',
    color: '#059669'
  },
  {
    region: 'Central Region (CRO)',
    hq: 'Bhopal',
    states: ['Madhya Pradesh', 'Chhattisgarh', 'Gujarat'],
    institutes: 890,
    totalFdrCapital: '₹ 215.40 Cr',
    capitalNum: 215.40,
    compliancePct: 91.5,
    maturingCount: 18,
    defaultCluster: 'High Vigilance',
    color: '#DC2626'
  },
  {
    region: 'Eastern Region (ERO)',
    hq: 'Kolkata',
    states: ['West Bengal', 'Odisha', 'Bihar', 'Jharkhand'],
    institutes: 740,
    totalFdrCapital: '₹ 190.10 Cr',
    capitalNum: 190.10,
    compliancePct: 93.8,
    maturingCount: 15,
    defaultCluster: 'Moderate Risk',
    color: '#D97706'
  }
];
