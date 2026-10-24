import React, { useState } from 'react';
import { X, Landmark, RefreshCw, CheckCircle2, ShieldCheck, Send, Calendar } from 'lucide-react';

interface BankVerificationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const BankVerificationModal: React.FC<BankVerificationModalProps> = ({
  isOpen,
  onClose
}) => {
  const [isVerifying, setIsVerifying] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success'>('idle');

  if (!isOpen) return null;

  const handleVerifyNow = () => {
    setIsVerifying(true);
    setTimeout(() => {
      setIsVerifying(false);
      setStatus('success');
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in">
      <div className="bg-white rounded-2xl max-w-lg w-full border border-slate-200 shadow-2xl overflow-hidden flex flex-col">
        {/* Header */}
        <div className="p-4 bg-[#0D3B66] text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Landmark className="w-5 h-5 text-amber-400" />
            <div>
              <h2 className="text-sm font-bold">Schedule Bank Verification & Lien Audit</h2>
              <p className="text-[11px] text-slate-300">SFMS Structured Inter-Bank Messaging System</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1 rounded text-slate-300 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 space-y-4 text-xs text-slate-700">
          <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 space-y-1.5">
            <div className="flex justify-between">
              <span className="text-slate-500">Target Bank</span>
              <span className="font-bold text-slate-900">State Bank of India</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Branch & IFSC</span>
              <span className="font-mono text-slate-800">Nariman Point Br. • SBIN0001423</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Instrument</span>
              <span className="font-mono text-slate-800">FDR-SBIN-2018-09 (₹35,00,000)</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Designated Manager</span>
              <span className="text-slate-800 font-medium">Chief Manager (Commercial & Institutional Desk)</span>
            </div>
          </div>

          <p className="text-slate-600 text-xs leading-relaxed">
            AICTE Core Banking Integration sends an automated SFMS MT799 lien status request to the designated Branch Manager to cross-validate continuous unencumbered balance before initiating RPGF release.
          </p>

          {status === 'success' ? (
            <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 text-emerald-800 space-y-1">
              <div className="flex items-center gap-1.5 font-bold text-xs">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                SFMS Ping Acknowledged by SBI CBS Nariman Point
              </div>
              <p className="text-[11px] text-emerald-700">
                Lien Status: <strong>100% Intact</strong> • Outstanding Balance: <strong>₹41,48,200</strong> • Tripartite Lock Valid.
              </p>
            </div>
          ) : (
            <div className="space-y-2">
              <label className="text-[11px] font-bold text-slate-700 block">Proposed Verification Window</label>
              <div className="flex items-center gap-2">
                <input
                  type="date"
                  defaultValue="2026-11-05"
                  className="px-3 py-1.5 border border-slate-200 rounded-lg text-xs bg-slate-50"
                />
                <span className="text-slate-400 text-xs">to</span>
                <input
                  type="date"
                  defaultValue="2026-11-12"
                  className="px-3 py-1.5 border border-slate-200 rounded-lg text-xs bg-slate-50"
                />
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-end gap-2">
          <button
            onClick={onClose}
            className="px-3.5 py-1.5 text-xs text-slate-600 hover:text-slate-900"
          >
            Cancel
          </button>
          <button
            onClick={handleVerifyNow}
            disabled={isVerifying || status === 'success'}
            className="px-4 py-2 text-xs font-semibold text-white bg-[#0D3B66] hover:bg-[#002546] rounded-lg flex items-center gap-1.5 disabled:opacity-50 cursor-pointer"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isVerifying ? 'animate-spin' : ''}`} />
            {isVerifying ? 'Dispatching SFMS Ping...' : status === 'success' ? 'Verified' : 'Dispatch SFMS Direct Ping'}
          </button>
        </div>
      </div>
    </div>
  );
};
