import { 
  simpleHash,
  generateInstruments,
  generateAuditChain,
  generateSfmsMessages,
  generateDossierDocs,
  generateSanctionsList
} from './dataGenerator.js';

// Universal SHA-256 helper (compatible with Node.js and browser environments)
export function generateSha256(content) {
  const str = typeof content === 'string' ? content : JSON.stringify(content);
  return simpleHash(str);
}

// 1,350 Statutory Instruments Repository across 8 AICTE Regions
export const initialInstruments = generateInstruments(1350);

// 1,350 Cryptographic Chained Audit Blocks
export const initialAuditChain = generateAuditChain(initialInstruments, 1350);

// 1,000 SFMS Messages
export const initialSfmsMessages = generateSfmsMessages(initialInstruments, 1000);

// 1,000 Dossiers & Affidavits
export const initialDossierDocs = generateDossierDocs(initialInstruments, 1000);

// Multi-institution sanctions list
export const initialSanctionsList = generateSanctionsList(initialInstruments);

// Primary Sanction Registry for active institution (Bharati Vidya Sansthan)
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

// Multi-Stage Automated Escalation Ladder
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

// Yield & Scholarship Reinvestment Analytics (Dynamically aggregated from the 1,350 instruments)
// Yield & Scholarship Reinvestment Analytics (Dynamically aggregated from the 1,350 instruments)
export const computeScholarshipYield = (instruments = initialInstruments) => {
  const totalImmobilizedCapital = instruments.reduce((sum, i) => sum + (i.principalAmount || 0), 0);
  const totalAnnualAccruedInterest = instruments.reduce((sum, i) => sum + (i.accruedInterest || 0), 0);

  const pragatiAlloc = Math.round(totalAnnualAccruedInterest * 0.45);
  const sakshamAlloc = Math.round(totalAnnualAccruedInterest * 0.25);
  const atalAlloc = Math.round(totalAnnualAccruedInterest * 0.20);
  const swanathAlloc = Math.round(totalAnnualAccruedInterest * 0.10);

  return {
    fiscalYear: '2025-26',
    totalImmobilizedCapital: totalImmobilizedCapital,
    totalAnnualAccruedInterest: totalAnnualAccruedInterest,
    totalAccruedAssigned: totalAnnualAccruedInterest,
    activeInstrumentsCount: instruments.length,
    yieldSchemes: [
      {
        name: "AICTE Pragati Scholarship for Girl Students",
        allocatedSum: pragatiAlloc,
        percentage: 45,
        studentsSupported: Math.round(pragatiAlloc / 50000),
        description: "Direct cash grant assistance (₹50,000 p.a.) toward tuition and books for meritorious girl students in degree/diploma technical courses."
      },
      {
        name: "AICTE Saksham Scholarship for Differently-Abled",
        allocatedSum: sakshamAlloc,
        percentage: 25,
        studentsSupported: Math.round(sakshamAlloc / 50000),
        description: "Financial assistance (₹50,000 p.a.) ensuring barrier-free technical education access for specially-abled students with >40% disability."
      },
      {
        name: "ATAL Academy Faculty Research & Innovation Grants",
        allocatedSum: atalAlloc,
        percentage: 20,
        programsFunded: Math.round(atalAlloc / 300000),
        description: "National training workshops, semiconductor R&D faculty development programs, and AI laboratory incubation initiatives."
      },
      {
        name: "AICTE Swanath Scheme for COVID Orphaned Scholars",
        allocatedSum: swanathAlloc,
        percentage: 10,
        studentsSupported: Math.round(swanathAlloc / 50000),
        description: "100% tuition waiver indemnity for orphan students and children of Armed Forces / CAPF personnel martyred in service."
      }
    ],
    fundsAllocated: [
      {
        scheme: 'AICTE Pragati Scholarship for Girls',
        allocationAmount: pragatiAlloc,
        studentsSupported: Math.round(pragatiAlloc / 50000),
        percentage: 45,
        color: '#059669'
      },
      {
        scheme: 'AICTE Saksham Scholarship for Differently-Abled',
        allocationAmount: sakshamAlloc,
        studentsSupported: Math.round(sakshamAlloc / 50000),
        percentage: 25,
        color: '#0D3B66'
      },
      {
        scheme: 'ATAL Academy Faculty Research & Innovation Grants',
        allocationAmount: atalAlloc,
        projectsSupported: Math.round(atalAlloc / 300000),
        percentage: 20,
        color: '#D97706'
      }
    ],
    quarterlyYieldHistory: [
      { quarter: "Q1 (Apr - Jun)", accrued: Math.round(totalAnnualAccruedInterest * 0.24), status: "Disbursed", beneficiary: "PFMS DBT Gateway" },
      { quarter: "Q2 (Jul - Sep)", accrued: Math.round(totalAnnualAccruedInterest * 0.26), status: "Disbursed", beneficiary: "Direct Scholar Bank Escrow" },
      { quarter: "Q3 (Oct - Dec)", accrued: Math.round(totalAnnualAccruedInterest * 0.25), status: "Audited & Allocated", beneficiary: "ATAL Innovation Fund" },
      { quarter: "Q4 (Jan - Mar)", accrued: Math.round(totalAnnualAccruedInterest * 0.25), status: "Accruing", beneficiary: "Scheduled FY2026 Batch" }
    ]
  };
};

export const initialScholarshipYield = computeScholarshipYield(initialInstruments);

// Regional Geospatial Compliance Clusters (Dynamically aggregated across all 8 AICTE regions)
export const computeRegionalData = (instruments = initialInstruments) => {
  const regionDefs = [
    { id: 'WRO', region: 'Western Region (WRO)', hq: 'Mumbai', states: ['Maharashtra', 'Gujarat', 'Goa'], color: '#059669' },
    { id: 'NRO', region: 'Northern Region (NRO)', hq: 'Kanpur', states: ['Uttar Pradesh', 'Uttarakhand'], color: '#D97706' },
    { id: 'SRO', region: 'Southern Region (SRO)', hq: 'Chennai', states: ['Tamil Nadu', 'Puducherry'], color: '#059669' },
    { id: 'SWRO', region: 'South-Western Region (SWRO)', hq: 'Bengaluru', states: ['Karnataka', 'Kerala'], color: '#059669' },
    { id: 'CRO', region: 'Central Region (CRO)', hq: 'Bhopal', states: ['Madhya Pradesh', 'Chhattisgarh'], color: '#DC2626' },
    { id: 'ERO', region: 'Eastern Region (ERO)', hq: 'Kolkata', states: ['West Bengal', 'Odisha', 'Bihar', 'Jharkhand'], color: '#D97706' },
    { id: 'NWRO', region: 'North-Western Region (NWRO)', hq: 'Chandigarh', states: ['Delhi', 'Punjab', 'Haryana', 'Rajasthan'], color: '#059669' },
    { id: 'SCRO', region: 'South-Central Region (SCRO)', hq: 'Hyderabad', states: ['Telangana', 'Andhra Pradesh'], color: '#0284C7' }
  ];

  return regionDefs.map(r => {
    const matching = instruments.filter(i => i.region === r.id);
    const totalCap = matching.reduce((sum, i) => sum + (i.principalAmount || 0), 0);
    const maturing = matching.filter(i => i.remainingDays <= 60).length;
    const discrepancies = matching.filter(i => i.hasDiscrepancy).length;
    const compliancePct = matching.length > 0 
      ? +(100 - (discrepancies / matching.length) * 100).toFixed(1)
      : 98.4;

    return {
      id: r.id,
      region: r.region,
      hq: r.hq,
      states: r.states,
      institutes: matching.length,
      totalFdrCapital: `₹ ${(totalCap / 1e7).toFixed(2)} Cr`,
      capitalNum: +(totalCap / 1e7).toFixed(2),
      capitalRaw: totalCap,
      compliancePct: compliancePct,
      maturingCount: maturing,
      defaultCluster: compliancePct < 93 ? 'High Vigilance' : compliancePct < 96 ? 'Moderate Risk' : 'Low Risk',
      color: r.color
    };
  });
};

export const initialRegionalData = computeRegionalData(initialInstruments);
