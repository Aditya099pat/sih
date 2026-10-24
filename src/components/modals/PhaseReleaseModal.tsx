import React, { useState } from 'react';
import { X, CheckCircle2, RotateCcw, AlertTriangle, ArrowRight, ShieldCheck, FileCheck2, Building2 } from 'lucide-react';
import { FDRInstrument } from '../../types';
import { FORMAT_INDIAN_CURRENCY } from '../../data/mockData';

interface PhaseReleaseModalProps {
  isOpen: boolean;
  onClose: () => void;
  instrument: FDRInstrument | null;
  onCompleteRelease: (fdrRef: string, actionType: 'refund' | 'rollover') => void;
}

export const PhaseReleaseModal: React.FC<PhaseReleaseModalProps> = ({
  isOpen,
  onClose,
  instrument,
  onCompleteRelease
}) => {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [releaseChoice, setReleaseChoice] = useState<'refund' | 'rollover'>('refund');
  const [checks, setChecks] = useState({
    lockInCompleted: true,
    noDefaulterCase: true,
    nbaNaacMaintained: true,
    facultySalariesCleared: true,
    affidavitAttached: true
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successSubmitted, setSuccessSubmitted] = useState(false);

  if (!isOpen) return null;

  const targetFdr = instrument || {
    ref: 'FDR-SBIN-2018-09',
    discipline: 'B.Tech Engineering & Tech (Est. 2018)',
    principalAmount: 3500000,
    accruedInterest: 648200,
    maturityDate: '15 Dec 2026',
    bankName: 'State Bank of India',
    branchName: 'Nariman Point Br.'
  };

  const handleNext = () => {
    if (step < 3) setStep((prev) => (prev + 1) as 2 | 3);
  };

  const handleSubmit = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSuccessSubmitted(true);
      onCompleteRelease(targetFdr.ref, releaseChoice);
      setTimeout(() => {
        setSuccessSubmitted(false);
        setStep(1);
        onClose();
      }, 2000);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in">
      <div className="bg-white rounded-2xl max-w-xl w-full border border-slate-200 shadow-2xl overflow-hidden flex flex-col">
        {/* Modal Header */}
        <div className="p-4 bg-[#0D3B66] text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <RotateCcw className="w-5 h-5 text-amber-400" />
            <div>
              <h2 className="text-sm font-bold">Apply Phase-5 RPGF Statutory Release</h2>
              <p className="text-[11px] text-slate-300">Under AICTE Approval Process Handbook (Sec 1.4.3)</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1 rounded text-slate-300 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Stepper Indicator */}
        <div className="px-6 py-3 bg-slate-50 border-b border-slate-200 flex items-center justify-between text-xs">
          <div className={`flex items-center gap-1.5 ${step >= 1 ? 'font-bold text-[#0D3B66]' : 'text-slate-400'}`}>
            <span className="w-5 h-5 rounded-full bg-[#0D3B66] text-white flex items-center justify-center text-[10px]">1</span>
            <span>Eligibility Audit</span>
          </div>
          <div className="h-0.5 w-8 bg-slate-200"></div>
          <div className={`flex items-center gap-1.5 ${step >= 2 ? 'font-bold text-[#0D3B66]' : 'text-slate-400'}`}>
            <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${step >= 2 ? 'bg-[#0D3B66] text-white' : 'bg-slate-200 text-slate-600'}`}>2</span>
            <span>Release Modality</span>
          </div>
          <div className="h-0.5 w-8 bg-slate-200"></div>
          <div className={`flex items-center gap-1.5 ${step >= 3 ? 'font-bold text-[#0D3B66]' : 'text-slate-400'}`}>
            <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${step >= 3 ? 'bg-[#0D3B66] text-white' : 'bg-slate-200 text-slate-600'}`}>3</span>
            <span>DSC Sign-off</span>
          </div>
        </div>

        {/* Step 1: Verification of Eligibility */}
        {step === 1 && (
          <div className="p-5 space-y-4 text-xs">
            <div className="p-3 bg-amber-50 rounded-xl border border-amber-200/80">
              <span className="text-[10px] font-bold text-amber-800 uppercase tracking-wider block">Target Instrument</span>
              <p className="font-bold text-slate-900 text-sm mt-0.5">{targetFdr.ref} • {targetFdr.discipline}</p>
              <p className="text-slate-600 mt-1">
                Principal: <strong className="tabular-nums font-mono">{FORMAT_INDIAN_CURRENCY(targetFdr.principalAmount)}</strong> + Accrued Interest: <strong className="text-emerald-700 tabular-nums font-mono">{FORMAT_INDIAN_CURRENCY(targetFdr.accruedInterest)}</strong>
              </p>
            </div>

            <div className="space-y-2.5">
              <span className="font-bold text-slate-900 uppercase tracking-wider text-[11px] block">
                Statutory Prerequisites Checklist
              </span>

              <label className="flex items-center gap-2.5 p-2 rounded-lg border border-slate-200 bg-white cursor-pointer hover:bg-slate-50">
                <input
                  type="checkbox"
                  checked={checks.lockInCompleted}
                  onChange={(e) => setChecks({ ...checks, lockInCompleted: e.target.checked })}
                  className="rounded text-[#0D3B66]"
                />
                <span className="text-slate-700">Completion of 8 full academic years without withdrawal (2018–2026)</span>
              </label>

              <label className="flex items-center gap-2.5 p-2 rounded-lg border border-slate-200 bg-white cursor-pointer hover:bg-slate-50">
                <input
                  type="checkbox"
                  checked={checks.noDefaulterCase}
                  onChange={(e) => setChecks({ ...checks, noDefaulterCase: e.target.checked })}
                  className="rounded text-[#0D3B66]"
                />
                <span className="text-slate-700">No pending regional ombudsman disputes or judicial encumbrances</span>
              </label>

              <label className="flex items-center gap-2.5 p-2 rounded-lg border border-slate-200 bg-white cursor-pointer hover:bg-slate-50">
                <input
                  type="checkbox"
                  checked={checks.facultySalariesCleared}
                  onChange={(e) => setChecks({ ...checks, facultySalariesCleared: e.target.checked })}
                  className="rounded text-[#0D3B66]"
                />
                <span className="text-slate-700">6th/7th CPC faculty compensation audit certificate affirmed</span>
              </label>

              <label className="flex items-center gap-2.5 p-2 rounded-lg border border-slate-200 bg-white cursor-pointer hover:bg-slate-50">
                <input
                  type="checkbox"
                  checked={checks.affidavitAttached}
                  onChange={(e) => setChecks({ ...checks, affidavitAttached: e.target.checked })}
                  className="rounded text-[#0D3B66]"
                />
                <span className="text-slate-700">Registered ₹100 e-Stamp Affidavit-6 uploaded to Dossier</span>
              </label>
            </div>
          </div>
        )}

        {/* Step 2: Choose Modality */}
        {step === 2 && (
          <div className="p-5 space-y-4 text-xs">
            <span className="font-bold text-slate-900 uppercase tracking-wider text-[11px] block">
              Select Statutory Settlement Modality
            </span>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div
                onClick={() => setReleaseChoice('refund')}
                className={`p-4 rounded-xl border cursor-pointer transition-all ${
                  releaseChoice === 'refund'
                    ? 'border-[#0D3B66] bg-blue-50/40 ring-1 ring-[#0D3B66]'
                    : 'border-slate-200 hover:border-slate-300'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-bold text-slate-900 text-xs">100% Statutory Refund</span>
                  <input
                    type="radio"
                    name="modality"
                    checked={releaseChoice === 'refund'}
                    onChange={() => setReleaseChoice('refund')}
                    className="text-[#0D3B66]"
                  />
                </div>
                <p className="text-slate-600 text-[11px] leading-relaxed">
                  Lien cancellation letter dispatched via SFMS to State Bank of India. Principal + accrued yield transferred to Trust account.
                </p>
                <div className="mt-3 font-mono font-bold text-sm text-[#0D3B66]">
                  {FORMAT_INDIAN_CURRENCY(targetFdr.principalAmount + targetFdr.accruedInterest)}
                </div>
              </div>

              <div
                onClick={() => setReleaseChoice('rollover')}
                className={`p-4 rounded-xl border cursor-pointer transition-all ${
                  releaseChoice === 'rollover'
                    ? 'border-[#0D3B66] bg-blue-50/40 ring-1 ring-[#0D3B66]'
                    : 'border-slate-200 hover:border-slate-300'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-bold text-slate-900 text-xs">RPGF Rollover for Intake</span>
                  <input
                    type="radio"
                    name="modality"
                    checked={releaseChoice === 'rollover'}
                    onChange={() => setReleaseChoice('rollover')}
                    className="text-[#0D3B66]"
                  />
                </div>
                <p className="text-slate-600 text-[11px] leading-relaxed">
                  Rollover deposit to qualify for New AI/ML discipline or additional 60-seat intake for AY 2026-27 without fresh capital call.
                </p>
                <div className="mt-3 font-mono font-bold text-sm text-emerald-700">
                  Zero Fresh Outlay
                </div>
              </div>
            </div>

            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
              <span className="font-semibold text-slate-800 text-[11px] block">Designated Receiving Bank Account (PFMS Verified)</span>
              <p className="text-slate-600 text-xs mt-1">
                State Bank of India • A/c No: <strong>3381900128919</strong> (Trust Central Account) • IFSC: <strong>SBIN0001423</strong>
              </p>
            </div>
          </div>
        )}

        {/* Step 3: DSC Sign-off */}
        {step === 3 && (
          <div className="p-5 space-y-4 text-xs">
            <div className="p-4 border border-slate-200 rounded-xl bg-slate-50/50 space-y-3">
              <div className="flex items-center gap-2 text-emerald-700 font-bold text-xs">
                <ShieldCheck className="w-4 h-4" />
                Class-3 Digital Signature Token Detected
              </div>

              <div className="text-slate-600 text-[11px] space-y-1">
                <p><strong>Signatory:</strong> Dr. Rajesh K. Sharma</p>
                <p><strong>Designation:</strong> Registrar & Authorized Signatory</p>
                <p><strong>Organization:</strong> Bharti Institute of Technology & Research</p>
                <p><strong>Certificate Issuer:</strong> e-Mudhra CA / CCA India</p>
              </div>
            </div>

            <p className="text-[11.5px] text-slate-600">
              By clicking "Submit Statutory Application", you affirm under penalty of section 10 of AICTE Act 1987 that all information provided is accurate and all terms of APH 2025 are satisfied.
            </p>

            {successSubmitted && (
              <div className="p-3 bg-emerald-50 text-emerald-800 border border-emerald-200 rounded-xl text-center font-bold">
                ✓ Application #AICTE-RPGF-2026-092 successfully signed and transmitted to WRO Bureau!
              </div>
            )}
          </div>
        )}

        {/* Modal Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
          {step > 1 ? (
            <button
              onClick={() => setStep((prev) => (prev - 1) as 1 | 2)}
              className="px-3.5 py-1.5 text-xs text-slate-600 hover:text-slate-900 border border-slate-200 rounded-lg"
            >
              Back
            </button>
          ) : (
            <div></div>
          )}

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-3.5 py-1.5 text-xs text-slate-600 hover:text-slate-900"
            >
              Cancel
            </button>

            {step < 3 ? (
              <button
                onClick={handleNext}
                className="px-4 py-2 text-xs font-semibold text-white bg-[#0D3B66] hover:bg-[#002546] rounded-lg flex items-center gap-1.5"
              >
                Next Step <ArrowRight className="w-3.5 h-3.5" />
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                disabled={isSubmitting || successSubmitted}
                className="px-4 py-2 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg flex items-center gap-1.5 disabled:opacity-50"
              >
                {isSubmitting ? 'Signing Application...' : 'Sign & Transmit to AICTE'}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
