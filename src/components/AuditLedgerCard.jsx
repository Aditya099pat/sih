import {
  History,
  Download,
  AlertTriangle,
  CheckCircle2,
  FileText,
  ShieldCheck
} from "lucide-react";
export const AuditLedgerCard = ({
  logs,
  onDownloadAuditTrail,
  onViewAllLogs
}) => {
  return <div className="bg-white rounded-xl border border-slate-200 p-4 lg:p-5 shadow-2xs flex flex-col justify-between">
      <div>
        {
    /* Card Header */
  }
        <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
          <div className="flex items-center gap-2">
            <History className="w-4 h-4 text-slate-600" />
            <h3 className="text-sm font-bold text-slate-900 tracking-tight">
              Statutory Ledger & Immutable Audit Trail
            </h3>
          </div>
          <span className="text-[11px] font-mono text-slate-500 bg-slate-100 px-2 py-0.5 rounded-md font-medium flex items-center gap-1">
            <ShieldCheck className="w-3 h-3 text-emerald-600" />
            Blockchain Hash Verified
          </span>
        </div>

        {
    /* Timeline Log Items */
  }
        <div className="space-y-4">
          {logs.slice(0, 3).map((log) => {
    return <div key={log.id} className="flex items-start gap-3 text-xs">
                {
      /* Icon based on log type */
    }
                <div className="shrink-0 mt-0.5">
                  {log.type === "alert" && <div className="w-5 h-5 rounded-full bg-amber-100 flex items-center justify-center text-amber-700">
                      <AlertTriangle className="w-3 h-3 text-amber-600" />
                    </div>}
                  {log.type === "success" && <div className="w-5 h-5 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700">
                      <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                    </div>}
                  {log.type === "document" && <div className="w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center text-blue-700">
                      <FileText className="w-3 h-3 text-[#0D3B66]" />
                    </div>}
                </div>

                {
      /* Content */
    }
                <div className="flex-1 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-900 text-xs">{log.title}</span>
                    <span className="text-[11px] text-slate-400 font-medium">{log.timestamp}</span>
                  </div>

                  <p className="text-[11.5px] text-slate-600 leading-relaxed">
                    {log.description}
                  </p>

                  {log.txnId && <div className="flex items-center gap-3 text-[10.5px] pt-0.5">
                      <span className="font-mono text-slate-500 font-medium">TXN: {log.txnId}</span>
                      {log.actionDue && <span className="font-semibold text-amber-700">
                          Action Due: {log.actionDue}
                        </span>}
                    </div>}
                </div>
              </div>;
  })}
        </div>
      </div>

      {
    /* Footer Controls */
  }
      <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
        <button
    onClick={onDownloadAuditTrail}
    className="font-medium text-slate-700 hover:text-[#0D3B66] flex items-center gap-1.5 cursor-pointer hover:underline"
  >
          <span>Download Certified Audit Trail Log (SHA-256)</span>
          <Download className="w-3.5 h-3.5 text-slate-400" />
        </button>
        <span className="text-slate-400">Sync: 4 mins ago</span>
      </div>
    </div>;
};
