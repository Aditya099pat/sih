import React, { useState } from 'react';
import { Landmark, RefreshCw, CheckCircle2 } from 'lucide-react';
import { BankLinkage } from '../types';

interface BankApiCardProps {
  bankLinkages: BankLinkage[];
  onTriggerReconciliation: () => void;
}

export const BankApiCard: React.FC<BankApiCardProps> = ({
  bankLinkages,
  onTriggerReconciliation
}) => {
  const [isReconciling, setIsReconciling] = useState(false);
  const [lastReconciledTime, setLastReconciledTime] = useState<string | null>(null);

  const handleReconcile = () => {
    setIsReconciling(true);
    setTimeout(() => {
      setIsReconciling(false);
      setLastReconciledTime('Just now');
      onTriggerReconciliation();
    }, 1200);
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200 p-4 lg:p-5 shadow-2xs flex flex-col justify-between">
      <div>
        {/* Card Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
          <div className="flex items-center gap-2">
            <Landmark className="w-4 h-4 text-slate-600" />
            <h3 className="text-sm font-bold text-slate-900 tracking-tight">
              Bank API & Gateway Direct
            </h3>
          </div>
          <span className="flex items-center gap-1.5 text-xs font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse"></span>
            Online
          </span>
        </div>

        {/* Bank List */}
        <div className="space-y-3">
          {bankLinkages.map((bank) => (
            <div
              key={bank.id}
              className="flex items-center justify-between p-2.5 rounded-lg border border-slate-100 hover:border-slate-200 hover:bg-slate-50/50 transition-colors"
            >
              <div className="flex items-center gap-3">
                {/* Short Code Square Box */}
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center font-bold text-white text-[11px] shadow-2xs shrink-0 tracking-wider"
                  style={{ backgroundColor: bank.logoBg }}
                >
                  {bank.logoText}
                </div>

                <div>
                  <h4 className="font-bold text-slate-900 text-xs">{bank.bankName}</h4>
                  <p className="text-[11px] text-slate-500 font-mono mt-0.5">
                    {bank.sfmsCode.startsWith('SBIN') || bank.sfmsCode.startsWith('PUNB')
                      ? `SFMS Code: ${bank.sfmsCode} • `
                      : `${bank.sfmsCode} `}
                    <span className="text-emerald-700 font-sans font-semibold">
                      {bank.status === 'Active' ? 'Active' : bank.status}
                    </span>
                  </p>
                </div>
              </div>

              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 ml-2" />
            </div>
          ))}
        </div>
      </div>

      {/* Footer Controls */}
      <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-600">
        <div>
          <span className="text-slate-500">Core Banking API Protocol:</span>{' '}
          <strong className="font-mono text-slate-800 font-semibold">v2.4.1</strong>
          {lastReconciledTime && (
            <span className="ml-2 text-emerald-700 font-medium">({lastReconciledTime})</span>
          )}
        </div>

        <button
          onClick={handleReconcile}
          disabled={isReconciling}
          className="px-3 py-1.5 rounded-lg border border-slate-300 text-slate-700 hover:text-slate-900 hover:bg-slate-50 transition-colors flex items-center gap-1.5 font-semibold cursor-pointer disabled:opacity-60 shadow-2xs text-xs"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${isReconciling ? 'animate-spin text-[#0D3B66]' : 'text-slate-500'}`} />
          <span>{isReconciling ? 'Verifying Gateway...' : 'Trigger Reconciliation'}</span>
        </button>
      </div>
    </div>
  );
};
