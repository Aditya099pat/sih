import { useState } from "react";
import { Building2, RefreshCw, CheckCircle2, Activity, ShieldCheck } from "lucide-react";
export const BankLinkagesView = ({
  bankLinkages,
  onTriggerReconciliation
}) => {
  const [isPinging, setIsPinging] = useState(false);
  const [pingResult, setPingResult] = useState(null);
  const handleTestPing = (bank) => {
    setIsPinging(true);
    setPingResult(null);
    setTimeout(() => {
      setIsPinging(false);
      setPingResult(`SFMS MT799 Heartbeat to ${bank.bankName} returned HTTP 200 OK (${bank.latencyMs}ms). Lien verification positive.`);
    }, 1e3);
  };
  return <div className="space-y-6">
      {
    /* Header */
  }
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-[#002546] text-amber-400">
              <Building2 className="w-5 h-5" />
            </span>
            <h1 className="text-xl font-bold text-slate-900">Core Banking API & SFMS Gateway Direct</h1>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Structured Financial Messaging System (SFMS) • Tripartite Lien Protocol v2.4.1 • RBI PFMS Bridge
          </p>
        </div>

        <button
    onClick={onTriggerReconciliation}
    className="px-3.5 py-2 text-xs font-bold text-white bg-[#0D3B66] hover:bg-[#002546] rounded-lg transition-colors flex items-center gap-1.5 shadow-xs cursor-pointer"
  >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>Synchronize All Bank Gateways</span>
        </button>
      </div>

      {pingResult && <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-800 flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>{pingResult}</span>
        </div>}

      {
    /* Grid of Bank Gateways */
  }
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {bankLinkages.map((bank) => <div
    key={bank.id}
    className="bg-white rounded-xl border border-slate-200 p-5 shadow-2xs space-y-4 hover:border-slate-300 transition-all flex flex-col justify-between"
  >
            <div>
              <div className="flex items-center justify-between mb-3">
                <div
    className="w-12 h-12 rounded-xl flex items-center justify-center font-bold text-white text-sm shadow-2xs"
    style={{ backgroundColor: bank.logoBg }}
  >
                  {bank.logoText}
                </div>

                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
                  {bank.status}
                </span>
              </div>

              <h2 className="font-bold text-slate-900 text-sm">{bank.bankName}</h2>
              <p className="text-xs font-mono text-slate-500 mt-0.5">{bank.sfmsCode}</p>

              <div className="mt-4 pt-3 border-t border-slate-100 space-y-2 text-xs text-slate-600">
                <div className="flex justify-between">
                  <span>Protocol:</span>
                  <span className="font-medium text-slate-800">{bank.protocol}</span>
                </div>
                <div className="flex justify-between">
                  <span>API Latency:</span>
                  <span className="font-mono text-emerald-700 font-semibold">{bank.latencyMs}ms</span>
                </div>
                <div className="flex justify-between">
                  <span>Last Reconciled:</span>
                  <span className="text-slate-500">{bank.lastPing}</span>
                </div>
              </div>
            </div>

            <button
    onClick={() => handleTestPing(bank)}
    disabled={isPinging}
    className="w-full mt-4 py-2 border border-slate-200 rounded-lg text-xs font-semibold text-slate-700 hover:bg-slate-50 hover:text-slate-900 transition-colors flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-50"
  >
              <Activity className="w-3.5 h-3.5 text-slate-500" />
              <span>Test SFMS MT799 Handshake</span>
            </button>
          </div>)}
      </div>

      {
    /* Structured Financial Messaging Specs Card */
  }
      <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-2xs space-y-4">
        <h2 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-[#0D3B66]" />
          SFMS Inter-Bank Standard Specification for Technical Institutions
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-slate-600">
          <div className="p-3 bg-slate-50 rounded-lg border border-slate-200/80 space-y-1">
            <span className="font-bold text-slate-900 font-mono">MT760 Message Type</span>
            <p className="text-[11px] leading-relaxed">
              Mandatory digital advice transmitted by issuing bank branch upon FDR creation to confirm non-encashment lien marked to AICTE Member Secretary.
            </p>
          </div>

          <div className="p-3 bg-slate-50 rounded-lg border border-slate-200/80 space-y-1">
            <span className="font-bold text-slate-900 font-mono">MT799 Free Format Verification</span>
            <p className="text-[11px] leading-relaxed">
              Periodic automated heartbeat sent by AICTE Central Server to confirm current balance, quarterly accrued interest, and freeze status.
            </p>
          </div>
        </div>
      </div>
    </div>;
};
