import React, { useState } from 'react';
import { ShieldCheck, CheckCircle2, AlertCircle, FileText, Search, Building2, UserCheck, Stamp } from 'lucide-react';
import { FDRInstrument } from '../types';
import { FORMAT_INDIAN_CURRENCY } from '../data/mockData';

interface BureauScrutinyViewProps {
  instruments: FDRInstrument[];
  onVerifyInstrument: (id: string) => void;
}

export const BureauScrutinyView: React.FC<BureauScrutinyViewProps> = ({
  instruments,
  onVerifyInstrument
}) => {
  const [selectedInstId, setSelectedInstId] = useState<string>(instruments[2]?.id || instruments[0].id);
  const [scrutinyChecks, setScrutinyChecks] = useState({
    originalFdrVerified: true,
    sfmsLienAcknowledged: true,
    affidavit6Notarized: true,
    panTanCrossChecked: true,
    societyResolutionEnclosed: true
  });
  const [stampedSuccess, setStampedSuccess] = useState(false);

  const currentInst = instruments.find((i) => i.id === selectedInstId) || instruments[0];

  const handleGrantClearance = () => {
    setStampedSuccess(true);
    onVerifyInstrument(currentInst.id);
    setTimeout(() => {
      setStampedSuccess(false);
    }, 2500);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-[#002546] text-amber-400">
              <ShieldCheck className="w-5 h-5" />
            </span>
            <h1 className="text-xl font-bold text-slate-900">Bureau Scrutiny & Statutory Verification</h1>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Regional Scrutiny Desk • Western Regional Office (WRO), Mumbai • Section 1.4 Regulatory Validation
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-blue-50 text-[#0D3B66] border border-blue-200 flex items-center gap-1.5">
            <UserCheck className="w-3.5 h-3.5 text-[#0D3B66]" />
            Scrutiny Officer: Sh. V. K. Nambiar (ADG)
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Instruments Queue */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-2xs overflow-hidden">
          <div className="p-3.5 border-b border-slate-200 bg-slate-50 font-bold text-xs text-slate-700 uppercase tracking-wider flex items-center justify-between">
            <span>Instruments in Portfolio ({instruments.length})</span>
            <span className="text-[10px] text-slate-400">Select to inspect</span>
          </div>

          <div className="divide-y divide-slate-100">
            {instruments.map((inst) => {
              const isSelected = inst.id === selectedInstId;
              return (
                <button
                  key={inst.id}
                  onClick={() => setSelectedInstId(inst.id)}
                  className={`w-full text-left p-3.5 transition-colors cursor-pointer ${
                    isSelected ? 'bg-blue-50/60 border-l-4 border-[#0D3B66]' : 'hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono font-bold text-xs text-slate-900">{inst.ref}</span>
                    <span
                      className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                        inst.statusType === 'warning'
                          ? 'bg-amber-100 text-amber-800'
                          : inst.statusType === 'info'
                          ? 'bg-sky-100 text-sky-800'
                          : 'bg-emerald-100 text-emerald-800'
                      }`}
                    >
                      {inst.statutoryStatus}
                    </span>
                  </div>

                  <p className="text-[11px] text-slate-600 truncate mt-1">{inst.discipline}</p>
                  <div className="flex justify-between items-center text-[10px] text-slate-400 mt-1.5">
                    <span>{inst.bankName}</span>
                    <span className="font-mono font-bold text-slate-700">{FORMAT_INDIAN_CURRENCY(inst.principalAmount)}</span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right 2 Columns: Scrutiny Workstation */}
        <div className="lg:col-span-2 space-y-5">
          {/* Active Instrument Card */}
          <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-2xs space-y-4">
            <div className="flex items-start justify-between">
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">Active Scrutiny Dossier</span>
                <h2 className="text-base font-bold text-slate-900 font-mono mt-0.5">{currentInst.ref}</h2>
                <p className="text-xs text-slate-600 mt-0.5">{currentInst.discipline}</p>
              </div>

              <div className="text-right">
                <span className="text-xs text-slate-400 block">Face Value</span>
                <span className="text-lg font-bold font-mono text-[#0D3B66]">{FORMAT_INDIAN_CURRENCY(currentInst.principalAmount)}</span>
              </div>
            </div>

            {/* Checklist */}
            <div className="border border-slate-200 rounded-xl p-4 bg-slate-50 space-y-3">
              <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                Statutory Verification Invariants
              </h3>

              <div className="space-y-2 text-xs">
                <label className="flex items-center gap-2.5 p-2 bg-white rounded-lg border border-slate-200 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={scrutinyChecks.originalFdrVerified}
                    onChange={(e) => setScrutinyChecks({ ...scrutinyChecks, originalFdrVerified: e.target.checked })}
                    className="rounded text-[#0D3B66]"
                  />
                  <span>Physical/Demat FDR Receipt {currentInst.fdrReceiptNo} verified against Bank CBS Ledger</span>
                </label>

                <label className="flex items-center gap-2.5 p-2 bg-white rounded-lg border border-slate-200 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={scrutinyChecks.sfmsLienAcknowledged}
                    onChange={(e) => setScrutinyChecks({ ...scrutinyChecks, sfmsLienAcknowledged: e.target.checked })}
                    className="rounded text-[#0D3B66]"
                  />
                  <span>SFMS Message MT760 lien registration code {currentInst.sfmsReference} active</span>
                </label>

                <label className="flex items-center gap-2.5 p-2 bg-white rounded-lg border border-slate-200 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={scrutinyChecks.affidavit6Notarized}
                    onChange={(e) => setScrutinyChecks({ ...scrutinyChecks, affidavit6Notarized: e.target.checked })}
                    className="rounded text-[#0D3B66]"
                  />
                  <span>Format Affidavit-6 on ₹100 e-Stamp ({currentInst.eStampNumber}) authenticated by Notary</span>
                </label>

                <label className="flex items-center gap-2.5 p-2 bg-white rounded-lg border border-slate-200 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={scrutinyChecks.panTanCrossChecked}
                    onChange={(e) => setScrutinyChecks({ ...scrutinyChecks, panTanCrossChecked: e.target.checked })}
                    className="rounded text-[#0D3B66]"
                  />
                  <span>Permanent Account Number (PAN) and Trust TAN linked without prior encumbrance</span>
                </label>
              </div>
            </div>

            {/* Stamp Banner */}
            {stampedSuccess ? (
              <div className="p-4 bg-emerald-50 border border-emerald-300 rounded-xl text-center space-y-1">
                <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <h4 className="font-bold text-emerald-900 text-xs">OFFICIAL AICTE VERIFICATION STAMP AFFIXED</h4>
                <p className="text-[11px] text-emerald-700">
                  Instrument {currentInst.ref} status upgraded to Active. Recorded in Central Bureau Audit Log.
                </p>
              </div>
            ) : (
              <div className="flex items-center justify-between pt-2">
                <span className="text-[11px] text-slate-500 flex items-center gap-1">
                  <Stamp className="w-3.5 h-3.5 text-slate-400" />
                  Western Regional Office Digital Stamp Protocol
                </span>

                <button
                  onClick={handleGrantClearance}
                  className="px-4 py-2 text-xs font-bold text-white bg-emerald-700 hover:bg-emerald-800 rounded-lg shadow-sm flex items-center gap-1.5 cursor-pointer"
                >
                  <Stamp className="w-3.5 h-3.5 text-amber-300" />
                  Grant Bureau Scrutiny Clearance
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
