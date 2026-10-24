import { useState } from "react";
import { ScrollText, Download, Search, CheckCircle2, AlertTriangle, FileText } from "lucide-react";
export const AuditLedgerView = ({
  logs,
  onDownloadLog
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");
  const filteredLogs = logs.filter((log) => {
    if (filterType !== "all" && log.type !== filterType) return false;
    if (searchTerm) {
      const q = searchTerm.toLowerCase();
      return log.title.toLowerCase().includes(q) || log.description.toLowerCase().includes(q) || log.txnId && log.txnId.toLowerCase().includes(q) || log.actor.toLowerCase().includes(q);
    }
    return true;
  });
  return <div className="space-y-6">
      {
    /* Header */
  }
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-[#002546] text-amber-400">
              <ScrollText className="w-5 h-5" />
            </span>
            <h1 className="text-xl font-bold text-slate-900">Cryptographic Audit Ledger & Activity Log</h1>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Immutable Event Trail • SHA-256 Checksums • AICTE Compliance Enforcement Logs
          </p>
        </div>

        <button
    onClick={onDownloadLog}
    className="px-3.5 py-2 text-xs font-semibold text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 flex items-center gap-1.5 shadow-2xs"
  >
          <Download className="w-3.5 h-3.5 text-slate-500" />
          <span>Download Audit Certificate (SHA-256)</span>
        </button>
      </div>

      {
    /* Filter toolbar */
  }
      <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="relative flex-1 max-w-sm">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
    type="text"
    placeholder="Search by Txn ID, actor, description..."
    value={searchTerm}
    onChange={(e) => setSearchTerm(e.target.value)}
    className="w-full pl-9 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:bg-white"
  />
        </div>

        <div className="flex items-center gap-1.5 text-xs">
          <span className="text-slate-400 text-[11px] mr-1">Filter Type:</span>
          {["all", "alert", "success", "document"].map((type) => <button
    key={type}
    onClick={() => setFilterType(type)}
    className={`px-2.5 py-1 rounded-lg font-medium capitalize transition-colors ${filterType === type ? "bg-[#0D3B66] text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-200"}`}
  >
              {type}
            </button>)}
        </div>
      </div>

      {
    /* Ledger Table */
  }
      <div className="bg-white rounded-xl border border-slate-200 shadow-2xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                <th className="py-3 px-4">Event Details</th>
                <th className="py-3 px-4">Transaction Ref / Due</th>
                <th className="py-3 px-4">Actor & Authority</th>
                <th className="py-3 px-4 font-mono">SHA-256 Hash</th>
                <th className="py-3 px-4 text-right">Timestamp</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {filteredLogs.map((log) => <tr key={log.id} className="hover:bg-slate-50/70 transition-colors">
                  <td className="py-3.5 px-4 max-w-sm">
                    <div className="flex items-start gap-2.5">
                      {log.type === "alert" && <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />}
                      {log.type === "success" && <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />}
                      {log.type === "document" && <FileText className="w-4 h-4 text-[#0D3B66] shrink-0 mt-0.5" />}
                      <div>
                        <div className="font-bold text-slate-900 text-xs">{log.title}</div>
                        <p className="text-[11px] text-slate-500 mt-0.5 leading-relaxed">{log.description}</p>
                      </div>
                    </div>
                  </td>

                  <td className="py-3.5 px-4 whitespace-nowrap">
                    <div className="font-mono text-slate-800 font-semibold">{log.txnId || "N/A"}</div>
                    {log.actionDue && <span className="text-[10.5px] font-semibold text-amber-700">Due: {log.actionDue}</span>}
                  </td>

                  <td className="py-3.5 px-4">
                    <span className="font-medium text-slate-800">{log.actor}</span>
                  </td>

                  <td className="py-3.5 px-4 font-mono text-[11px] text-slate-400">
                    {log.hash}
                  </td>

                  <td className="py-3.5 px-4 text-right whitespace-nowrap text-slate-500 font-medium">
                    {log.timestamp}
                  </td>
                </tr>)}
            </tbody>
          </table>
        </div>
      </div>
    </div>;
};
