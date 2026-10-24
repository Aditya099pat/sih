import React, { useState } from 'react';
import { FolderPlus, Landmark, ShieldCheck, Upload, CheckCircle2, ArrowRight, ArrowLeft } from 'lucide-react';
import { FDRInstrument } from '../types';
import { FORMAT_INDIAN_CURRENCY } from '../data/mockData';

interface RegisterDepositViewProps {
  onAddInstrument: (newInst: FDRInstrument) => void;
  onCancel: () => void;
}

export const RegisterDepositView: React.FC<RegisterDepositViewProps> = ({
  onAddInstrument,
  onCancel
}) => {
  const [discipline, setDiscipline] = useState('B.Tech Artificial Intelligence & Data Science (New Program)');
  const [disciplineCategory, setDisciplineCategory] = useState<'engineering' | 'management' | 'other'>('engineering');
  const [bankName, setBankName] = useState('State Bank of India');
  const [branchName, setBranchName] = useState('Bandra Kurla Complex Br.');
  const [ifsc, setIfsc] = useState('SBIN0004521');
  const [fdrReceiptNo, setFdrReceiptNo] = useState('SBI-FD-' + Math.floor(10000000 + Math.random() * 90000000));
  const [principalAmount, setPrincipalAmount] = useState(3500000);
  const [termYears, setTermYears] = useState(8);
  const [interestRate, setInterestRate] = useState(7.20);
  const [custodyMode, setCustodyMode] = useState('SFMS e-Lien Registered');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const issueYear = new Date().getFullYear();
    const maturityYear = issueYear + termYears;
    const refCode = `FDR-${bankName.includes('Punjab') ? 'PNB' : 'SBIN'}-${issueYear}-${Math.floor(10 + Math.random() * 89)}`;

    const newInst: FDRInstrument = {
      id: 'fdr-' + Date.now(),
      ref: refCode,
      discipline,
      disciplineCategory,
      disciplineCode: 'UG-ENGG-AIDS',
      dotColor: '#8b5cf6',
      type: 'Joint Fixed Deposit',
      custodyMode,
      bankName,
      branchName,
      ifsc,
      principalAmount,
      accruedInterest: 0,
      interestRate,
      issueDate: `01 Aug ${issueYear}`,
      maturityDate: `31 Jul ${maturityYear}`,
      remainingDays: termYears * 365,
      termYears,
      verificationSource: 'Trust Declared & SFMS e-Lien',
      bankApiStatus: 'SBI CBS ✓',
      statutoryStatus: 'Active (>180 Days)',
      statusType: 'success',
      jointLienWith: 'Member Secretary, AICTE New Delhi',
      fdrReceiptNo,
      sfmsReference: `SFMS/${issueYear}/L799/${Math.floor(100000 + Math.random() * 900000)}`,
      eStampNumber: `IN-MH${Math.floor(1000000000 + Math.random() * 9000000000)}D`,
      intakeCapacity: 60,
      approvedYear: `${issueYear}-${issueYear + 1}`
    };

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      onAddInstrument(newInst);
    }, 1200);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Title */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-[#002546] text-amber-400">
              <FolderPlus className="w-5 h-5" />
            </span>
            <h1 className="text-xl font-bold text-slate-900">Register New Statutory Security Deposit / FDR</h1>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            AICTE Approval Process Handbook (APH 2025-26) • Joint Lien Pledge with Member Secretary
          </p>
        </div>

        <button
          onClick={onCancel}
          className="px-3 py-1.5 text-xs text-slate-600 border border-slate-200 rounded-lg hover:bg-slate-50 flex items-center gap-1 cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> Back to Dashboard
        </button>
      </div>

      {isSuccess ? (
        <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm text-center space-y-4">
          <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <h2 className="text-lg font-bold text-slate-900">Statutory FDR Registered Successfully!</h2>
          <p className="text-xs text-slate-600 max-w-md mx-auto">
            The Fixed Deposit has been registered in the institutional portfolio with a joint lien marked to the Member Secretary, AICTE New Delhi. SFMS transaction dispatched to core banking gateway.
          </p>
          <button
            onClick={onCancel}
            className="px-5 py-2 text-xs font-bold text-white bg-[#0D3B66] rounded-lg hover:bg-[#002546] transition-colors"
          >
            View in Dashboard & Instruments
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Section 1: Academic Discipline & Purpose */}
          <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-2xs space-y-4">
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#0D3B66]"></span>
              1. Academic Program & Discipline Assignment
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="block text-slate-700 font-semibold mb-1">Academic Program / Discipline</label>
                <select
                  value={discipline}
                  onChange={(e) => setDiscipline(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg bg-slate-50 focus:bg-white text-xs font-medium"
                >
                  <option value="B.Tech Artificial Intelligence & Data Science (New Program)">
                    B.Tech Artificial Intelligence & Data Science (New Program)
                  </option>
                  <option value="B.Tech Computer Science & Engineering (Additional Intake 60)">
                    B.Tech Computer Science & Engineering (Additional Intake 60)
                  </option>
                  <option value="Master of Business Administration (Dual Specialization)">
                    Master of Business Administration (Dual Specialization)
                  </option>
                  <option value="B.Pharm Bachelor of Pharmacy (New Institution)">
                    B.Pharm Bachelor of Pharmacy (New Institution)
                  </option>
                </select>
              </div>

              <div>
                <label className="block text-slate-700 font-semibold mb-1">Category Classification</label>
                <select
                  value={disciplineCategory}
                  onChange={(e) => setDisciplineCategory(e.target.value as any)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg bg-slate-50 focus:bg-white text-xs font-medium"
                >
                  <option value="engineering">Engineering & Technology</option>
                  <option value="management">Management / MBA</option>
                  <option value="other">Pharmacy / Architecture / Design</option>
                </select>
              </div>
            </div>
          </div>

          {/* Section 2: Banking & Principal Details */}
          <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-2xs space-y-4">
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
              <Landmark className="w-4 h-4 text-slate-600" />
              2. Scheduled Commercial Bank & FDR Particulars
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
              <div>
                <label className="block text-slate-700 font-semibold mb-1">Bank Name</label>
                <select
                  value={bankName}
                  onChange={(e) => setBankName(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg bg-slate-50 focus:bg-white text-xs font-medium"
                >
                  <option value="State Bank of India">State Bank of India</option>
                  <option value="Punjab National Bank">Punjab National Bank</option>
                  <option value="Bank of Baroda">Bank of Baroda</option>
                  <option value="Canara Bank">Canara Bank</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-700 font-semibold mb-1">Branch Name</label>
                <input
                  type="text"
                  value={branchName}
                  onChange={(e) => setBranchName(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg bg-slate-50 focus:bg-white text-xs"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-semibold mb-1">Branch IFSC Code</label>
                <input
                  type="text"
                  value={ifsc}
                  onChange={(e) => setIfsc(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg font-mono bg-slate-50 focus:bg-white text-xs"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-semibold mb-1">FDR Receipt Number</label>
                <input
                  type="text"
                  value={fdrReceiptNo}
                  onChange={(e) => setFdrReceiptNo(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg font-mono bg-slate-50 focus:bg-white text-xs"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-semibold mb-1">Principal Deposit Amount (₹)</label>
                <select
                  value={principalAmount}
                  onChange={(e) => setPrincipalAmount(Number(e.target.value))}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg bg-slate-50 focus:bg-white text-xs font-mono font-bold text-slate-900"
                >
                  <option value={3500000}>₹35,00,000 (Engineering Degree - Standard)</option>
                  <option value={5000000}>₹50,00,000 (Multi-Discipline / Additional Intake)</option>
                  <option value={2000000}>₹20,00,000 (Management / MBA Program)</option>
                  <option value={2800000}>₹28,00,000 (Minority / Women Institution Concession)</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-700 font-semibold mb-1">Annual Interest Yield (%)</label>
                <input
                  type="number"
                  step="0.05"
                  value={interestRate}
                  onChange={(e) => setInterestRate(Number(e.target.value))}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg bg-slate-50 focus:bg-white text-xs font-mono"
                />
              </div>
            </div>
          </div>

          {/* Section 3: Joint Lien & Custody */}
          <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-2xs space-y-4">
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              3. Joint Statutory Lien & Custody Mode
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="block text-slate-700 font-semibold mb-1">Custody Mode</label>
                <select
                  value={custodyMode}
                  onChange={(e) => setCustodyMode(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg bg-slate-50 focus:bg-white text-xs font-medium"
                >
                  <option value="SFMS e-Lien Registered">SFMS e-Lien Registered (Digital Demat)</option>
                  <option value="Physical Custody @ AICTE HQ">Physical Custody @ AICTE HQ New Delhi</option>
                  <option value="Central Lien Sub-account">Central Lien Sub-account (Direct RTGS)</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-700 font-semibold mb-1">Joint Holder in Bank FDR</label>
                <input
                  type="text"
                  disabled
                  value="Member Secretary, AICTE New Delhi"
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg bg-slate-100 text-slate-600 text-xs font-semibold"
                />
              </div>
            </div>

            <div className="border border-slate-200 rounded-lg p-3 bg-slate-50 text-[11px] text-slate-600 flex items-start gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span>
                By submitting, the institution confirms that the original FDR will be retained in joint custody with AICTE for 8 mandatory years, with quarterly accrued interest assigned to the statutory account under Chapter 1.4.3.
              </span>
            </div>
          </div>

          {/* Submit Action */}
          <div className="flex items-center justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onCancel}
              className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-2.5 text-xs font-bold text-white bg-[#002546] hover:bg-[#0D3B66] rounded-lg shadow-sm flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
            >
              {isSubmitting ? 'Registering Instrument & SFMS Lien...' : 'Submit & Register Joint FDR'}
              <ArrowRight className="w-3.5 h-3.5 text-amber-400" />
            </button>
          </div>
        </form>
      )}
    </div>
  );
};
