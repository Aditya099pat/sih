export type NavigationTab = 
  | 'dashboard'
  | 'register'
  | 'scrutiny'
  | 'rpgf'
  | 'calculator'
  | 'affidavits'
  | 'audit'
  | 'bank-api';

export type StatutoryStatus = 'Maturing Soon' | 'Active (>180 Days)' | 'Under Scrutiny' | 'Defaulter/Frozen';

export interface FDRInstrument {
  id: string;
  ref: string;
  discipline: string;
  disciplineCategory: 'engineering' | 'management' | 'other';
  disciplineCode: string;
  dotColor: string;
  type: string;
  custodyMode: string;
  bankName: string;
  branchName: string;
  ifsc: string;
  principalAmount: number;
  accruedInterest: number;
  interestRate: number;
  issueDate: string;
  maturityDate: string;
  remainingDays: number;
  termYears: number;
  verificationSource: string;
  bankApiStatus: 'SBI CBS ✓' | 'PNB Direct ✓' | 'Pending Verification';
  statutoryStatus: 'Maturing in 42 Days' | 'Active (>180 Days)' | 'Under Scrutiny';
  statusType: 'warning' | 'success' | 'info';
  jointLienWith: string;
  fdrReceiptNo: string;
  sfmsReference: string;
  eStampNumber: string;
  intakeCapacity: number;
  approvedYear: string;
}

export interface AuditLogItem {
  id: string;
  title: string;
  timestamp: string;
  date: string;
  type: 'alert' | 'success' | 'document' | 'bank';
  description: string;
  txnId?: string;
  actionDue?: string;
  hash: string;
  actor: string;
}

export interface BankLinkage {
  id: string;
  bankName: string;
  shortCode: string;
  sfmsCode: string;
  status: 'Active' | 'Under Maintenance' | 'Synchronized';
  protocol: string;
  lastPing: string;
  latencyMs: number;
  logoBg: string;
  logoText: string;
}

export interface DossierDocument {
  id: string;
  title: string;
  documentType: string;
  stampValue?: string;
  fdrRef?: string;
  uploadDate: string;
  signatory: string;
  fileSize: string;
  verified: boolean;
  status: 'Verified & Encrypted' | 'Under Regional Scrutiny' | 'Pending Bank Counter-Sign';
}
