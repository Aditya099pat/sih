import React from 'react';
import { X, Landmark, FileText, CheckCircle2, Shield, Calendar, AlertTriangle, Download, ArrowUpRight } from 'lucide-react';
import { FDRInstrument } from '../../types';
import { FORMAT_INDIAN_CURRENCY } from '../../data/mockData';

interface InstrumentDetailModalProps {
  instrument: FDRInstrument | null;
  onClose: () => void;
  onInitiateRpgf?: (inst: FDRInstrument) => void;
  onOpenAffidavit?: (inst: FDRInstrument) => void;
}

export const InstrumentDetailModal: React.FC<InstrumentDetailModalProps> = ({
  instrument,
  onClose,
  onInitiateRpgf,
  onOpenAffidavit
}) => {
  if (!instrument) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in">
      <div className="bg-white rounded-2xl max-w-2xl w-full border border-slate-200 shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
        {/* Modal Header */}
        <div className="p-4 lg:p-5 bg-gradient-to-r from-[#002546] to-[#0D3B66] text-white flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-base font-bold text-amber-400">{instrument.ref}</span>
              <span className="text-xs bg-white/20 text-white px-2 py-0.5 rounded-full font-medium">
                PID: 1-1029384
              </span>
            </div>
            <p className="text-xs text-slate-200 mt-1">{instrument.discipline}</p>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 overflow-y-auto space-y-5 text-xs text-slate-700">
          {/* Status Alert if Maturing Soon */}
          {instrument.remainingDays <= 90 && (
            <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <p className="font-bold text-amber-900 text-xs">Statutory Lock-In Milestone Approaching</p>
                <p className="text-amber-800 text-[11px] mt-0.5">
                  This instrument completes its mandatory 8-year lock-in period on {instrument.maturityDate} ({instrument.remainingDays} days remaining). 
                  Under AICTE APH Regulations, submit the Phase-5 RPGF release or rollover dossier to prevent provisional intake embargo.
                </p>
              </div>
            </div>
          )}

          {/* Core Numbers 3-Column Strip */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="bg-slate-50 p-3 rounded-xl border border-slate-200/80">
              <span className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">Principal Pledged</span>
              <div className="text-xl font-extrabold text-slate-900 mt-1 tabular-nums">
                {FORMAT_INDIAN_CURRENCY(instrument.principalAmount)}
              </div>
              <span className="text-[10px] text-emerald-700 font-medium">100% Lien Marked</span>
            </div>

            <div className="bg-slate-50 p-3 rounded-xl border border-slate-200/80">
              <span className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">Accrued Interest</span>
              <div className="text-xl font-extrabold text-emerald-700 mt-1 tabular-nums">
                +{FORMAT_INDIAN_CURRENCY(instrument.accruedInterest)}
              </div>
              <span className="text-[10px] text-slate-500 font-medium">{instrument.interestRate}% p.a. Quarterly Comp.</span>
            </div>

            <div className="bg-slate-50 p-3 rounded-xl border border-slate-200/80">
              <span className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">Total Value</span>
              <div className="text-xl font-extrabold text-[#0D3B66] mt-1 tabular-nums">
                {FORMAT_INDIAN_CURRENCY(instrument.principalAmount + instrument.accruedInterest)}
              </div>
              <span className="text-[10px] text-slate-500 font-medium">As on Today</span>
            </div>
          </div>

          {/* Statutory Lien & Banking Specification */}
          <div className="border border-slate-200 rounded-xl p-4 bg-white space-y-3">
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
              <Landmark className="w-3.5 h-3.5 text-slate-500" />
              Banking & Custody Specification
            </h4>

            <div className="grid grid-cols-2 gap-y-2.5 gap-x-4 text-xs">
              <div>
                <span className="text-slate-400 text-[11px] block">Issuing Bank & Branch</span>
                <span className="font-semibold text-slate-800">{instrument.bankName}, {instrument.branchName}</span>
              </div>

              <div>
                <span className="text-slate-400 text-[11px] block">IFSC Code</span>
                <span className="font-mono font-semibold text-slate-800">{instrument.ifsc}</span>
              </div>

              <div>
                <span className="text-slate-400 text-[11px] block">FDR Receipt Number</span>
                <span className="font-mono font-semibold text-slate-800">{instrument.fdrReceiptNo}</span>
              </div>

              <div>
                <span className="text-slate-400 text-[11px] block">SFMS Lien Reference (MT760)</span>
                <span className="font-mono font-semibold text-slate-800">{instrument.sfmsReference}</span>
              </div>

              <div>
                <span className="text-slate-400 text-[11px] block">Custody Mode</span>
                <span className="font-medium text-slate-800">{instrument.custodyMode}</span>
              </div>

              <div>
                <span className="text-slate-400 text-[11px] block">Mandatory Lock-in Term</span>
                <span className="font-semibold text-slate-800">{instrument.termYears} Years (Issued: {instrument.issueDate})</span>
              </div>
            </div>
          </div>

          {/* Joint Lien Undertaking Details */}
          <div className="border border-slate-200 rounded-xl p-4 bg-slate-50/50 space-y-2">
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
              <Shield className="w-3.5 h-3.5 text-emerald-600" />
              Joint Security Lien Covenant
            </h4>
            <p className="text-[11.5px] text-slate-600 leading-relaxed">
              Pledged jointly in the name of <strong>{instrument.jointLienWith}</strong> and the Trust 
              <strong> Bharati Vidya Sansthan</strong> under AICTE Table 1.4 regulation. Neither principal nor 
              cumulative interest can be encashed, revoked, or discounted without prior written no-objection from AICTE Council.
            </p>
            <div className="pt-2 flex items-center justify-between text-[11px] text-slate-500 border-t border-slate-200">
              <span>e-Stamp Certificate: <strong className="font-mono text-slate-700">{instrument.eStampNumber}</strong></span>
              <span className="text-emerald-700 font-semibold flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3 text-emerald-600" /> Tamper-Proof Verified
              </span>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
          <button
            onClick={() => {
              onClose();
              onOpenAffidavit && onOpenAffidavit(instrument);
            }}
            className="px-3 py-2 text-xs font-semibold text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <FileText className="w-3.5 h-3.5 text-slate-500" />
            View Affidavit-6
          </button>

          <div className="flex items-center gap-2">
            {instrument.remainingDays <= 90 && (
              <button
                onClick={() => {
                  onClose();
                  onInitiateRpgf && onInitiateRpgf(instrument);
                }}
                className="px-3.5 py-2 text-xs font-semibold text-white bg-amber-600 hover:bg-amber-700 rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
              >
                Initiate RPGF Phase Release <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            )}

            <button
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-white bg-[#002546] hover:bg-[#0D3B66] rounded-lg transition-colors cursor-pointer"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
