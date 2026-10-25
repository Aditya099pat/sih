import { useState, useEffect, useMemo } from "react";
import { 
  Building2, 
  Radio, 
  Send, 
  Activity, 
  CheckCircle2, 
  RefreshCw, 
  ShieldCheck, 
  Terminal, 
  ArrowRightLeft,
  Server,
  Layers,
  FileCode,
  Search,
  ChevronLeft,
  ChevronRight,
  Filter
} from "lucide-react";
import { FORMAT_INDIAN_CURRENCY, FORMAT_COMPACT_CURRENCY } from "@data/mockData";

export const SfmsSimulatorView = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedBank, setSelectedBank] = useState("State Bank of India");
  const [instrumentRef, setInstrumentRef] = useState("FDR-SBI-2025-88");
  const [fdrReceiptNo, setFdrReceiptNo] = useState("SBI-FD-49102938");
  const [principalAmount, setPrincipalAmount] = useState(3500000);
  const [isTransmitting, setIsTransmitting] = useState(false);
  const [consoleLogs, setConsoleLogs] = useState([]);
  const [activeMessage, setActiveMessage] = useState(null);

  // Search & Filter & Pagination
  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState("all"); // 'all', 'MT760', 'MT799'
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 12;

  const fetchMessages = async () => {
    try {
      const res = await fetch("/api/sfms/messages");
      const data = await res.json();
      if (data.success) {
        setMessages(data.data);
        if (data.data.length > 0 && !activeMessage) {
          setActiveMessage(data.data[0]);
        }
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const addLog = (log) => {
    setConsoleLogs(prev => [`[${new Date().toLocaleTimeString('en-IN')}] ${log}`, ...prev.slice(0, 15)]);
  };

  const handleTransmitMt760 = async () => {
    setIsTransmitting(true);
    addLog(`INIT: SFMS MT760 Transmission initiated for ${instrumentRef} via ${selectedBank}...`);
    try {
      const res = await fetch("/api/sfms/simulate-mt760", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          bankName: selectedBank,
          fdrRef: instrumentRef,
          principal: principalAmount
        })
      });
      const data = await res.json();
      if (data.success) {
        addLog(`ACK: SFMS Gateway received MT760 Ref: ${data.data.sfmsReference}. Lien registered.`);
        fetchMessages();
        setActiveMessage(data.data);
      }
    } catch (err) {
      addLog(`ERR: SFMS Handshake failed: ${err.message}`);
    } finally {
      setIsTransmitting(false);
    }
  };

  const handleDispatchHeartbeat = async () => {
    setIsTransmitting(true);
    addLog(`POLL: Sending SFMS MT799 Encumbrance Heartbeat request to ${selectedBank} Core Banking...`);
    try {
      const res = await fetch("/api/sfms/simulate-mt799", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fdrRef: instrumentRef,
          balance: principalAmount
        })
      });
      const data = await res.json();
      if (data.success) {
        addLog(`HEARTBEAT OK: CBS Confirmed Balance ₹${principalAmount.toLocaleString('en-IN')}. Encumbrance Free.`);
        fetchMessages();
        setActiveMessage(data.data);
      }
    } catch (err) {
      addLog(`ERR: Heartbeat failed: ${err.message}`);
    } finally {
      setIsTransmitting(false);
    }
  };

  // Filter messages
  const filteredMessages = useMemo(() => {
    return messages.filter((msg) => {
      if (typeFilter !== "all" && msg.type !== typeFilter && msg.messageType !== typeFilter) {
        return false;
      }
      if (searchTerm.trim()) {
        const q = searchTerm.toLowerCase().trim();
        return (
          msg.sfmsReference?.toLowerCase().includes(q) ||
          msg.title?.toLowerCase().includes(q) ||
          msg.bank?.toLowerCase().includes(q) ||
          msg.senderBic?.toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [messages, typeFilter, searchTerm]);

  const totalPages = Math.max(1, Math.ceil(filteredMessages.length / pageSize));
  const safePage = Math.min(Math.max(1, currentPage), totalPages);
  const paginatedMessages = filteredMessages.slice((safePage - 1) * pageSize, safePage * pageSize);

  const mt760Count = messages.filter(m => m.type === "MT760" || m.messageType === "MT760").length;
  const mt799Count = messages.filter(m => m.type === "MT799" || m.messageType === "MT799").length;

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="flex items-center gap-3 text-sm text-[#0D3B66] font-semibold">
          <RefreshCw className="w-5 h-5 animate-spin text-[#E65100]" />
          Connecting to Scheduled Commercial Banking SFMS Gateway (RBI-INFINET) ({messages.length || "1,000+"} messages)...
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#E2E8F0]">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-md bg-[#0B2545] text-white">
              <Building2 className="w-5 h-5" />
            </span>
            <div>
              <h1 className="text-xl font-bold text-[#0B2545]">
                Core Banking SFMS Telecommunication Gateway
              </h1>
              <p className="text-xs text-slate-500">
                Structured Financial Messaging System (SFMS MT760/MT799) Protocol Engine • Real-Time Core Banking Lien Verification ({messages.length.toLocaleString('en-IN')} Packets Logged)
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-mono bg-emerald-50 text-emerald-800 border border-emerald-200 px-3 py-1 rounded-full flex items-center gap-1.5 font-bold">
            <Radio className="w-3.5 h-3.5 text-emerald-600 animate-pulse" />
            RBI INFINET Gateway Online
          </span>
        </div>
      </div>

      {/* Gateway Control Panel (Top) */}
      <div className="card-clean rounded-xl border border-[#E2E8F0] bg-white p-5 shadow-xs">
        <div className="flex items-center justify-between pb-3 border-b border-[#E2E8F0] mb-4">
          <div className="flex items-center gap-2">
            <Server className="w-4 h-4 text-[#0D3B66]" />
            <h2 className="text-xs font-bold text-[#0F172A] uppercase tracking-wider">
              Core Banking Protocol Dispatch Console
            </h2>
          </div>
          <span className="text-[10px] text-slate-500 font-mono">
            PROTOCOL: ISO-15022 / SFMS VER 4.2
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
          <div>
            <label className="block text-xs font-bold text-[#0F172A] mb-1">
              Select Scheduled Bank
            </label>
            <select
              value={selectedBank}
              onChange={(e) => setSelectedBank(e.target.value)}
              className="w-full bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg px-3 py-2 text-xs font-semibold text-[#0F172A] focus:outline-none focus:border-[#0D3B66]"
            >
              <option value="State Bank of India">State Bank of India (SBI)</option>
              <option value="Punjab National Bank">Punjab National Bank (PNB)</option>
              <option value="Bank of Baroda">Bank of Baroda (BOB)</option>
              <option value="Canara Bank">Canara Bank</option>
              <option value="Union Bank of India">Union Bank of India</option>
              <option value="HDFC Bank">HDFC Bank Ltd</option>
              <option value="ICICI Bank">ICICI Bank Ltd</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-[#0F172A] mb-1">
              Instrument Reference / Receipt
            </label>
            <input
              type="text"
              value={fdrReceiptNo}
              onChange={(e) => setFdrReceiptNo(e.target.value)}
              className="w-full bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg px-3 py-2 text-xs font-mono font-bold text-[#0F172A] focus:outline-none focus:border-[#0D3B66]"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-[#0F172A] mb-1">
              Principal Sum (₹)
            </label>
            <input
              type="number"
              step="500000"
              value={principalAmount}
              onChange={(e) => setPrincipalAmount(Number(e.target.value))}
              className="w-full bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg px-3 py-2 text-xs font-mono font-bold text-[#0F172A] focus:outline-none focus:border-[#0D3B66]"
            />
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleTransmitMt760}
              disabled={isTransmitting}
              className="flex-1 py-2 px-3 bg-[#0D3B66] hover:bg-[#092c4d] text-white rounded-lg text-xs font-bold transition flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Send MT760 Lien</span>
            </button>

            <button
              onClick={handleDispatchHeartbeat}
              disabled={isTransmitting}
              className="py-2 px-3 bg-emerald-700 hover:bg-emerald-800 text-white rounded-lg text-xs font-bold transition flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
              title="Ping non-encashment balance heartbeat"
            >
              <Activity className="w-3.5 h-3.5" />
              <span>MT799 Ping</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main 2-Column Section: Packet Stream (Left) + Raw Telegram Dissector (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* LEFT (Col 6): SFMS Telegram Traffic Stream with Pagination and Filters */}
        <div className="lg:col-span-6 space-y-4">
          <div className="card-clean rounded-xl border border-[#E2E8F0] bg-white p-4 shadow-xs">
            {/* Filter & Search Header */}
            <div className="space-y-2.5 pb-3 border-b border-[#E2E8F0] mb-3">
              <div className="flex items-center justify-between gap-2 flex-wrap">
                <h3 className="text-xs font-bold text-[#0F172A] uppercase tracking-wider flex items-center gap-2">
                  <ArrowRightLeft className="w-4 h-4 text-[#0D3B66]" />
                  <span>SFMS Transmission Queue</span>
                </h3>
                
                <div className="relative w-52">
                  <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Search messages..."
                    value={searchTerm}
                    onChange={(e) => {
                      setSearchTerm(e.target.value);
                      setCurrentPage(1);
                    }}
                    className="w-full bg-[#F8FAFC] border border-[#E2E8F0] rounded-md pl-8 pr-2 py-1 text-xs focus:outline-none focus:border-[#0D3B66]"
                  />
                </div>
              </div>

              {/* Message Type Filter Buttons */}
              <div className="flex items-center gap-1.5 text-xs">
                {[
                  { id: "all", label: `All (${messages.length.toLocaleString('en-IN')})` },
                  { id: "MT760", label: `MT760 Liens (${mt760Count.toLocaleString('en-IN')})` },
                  { id: "MT799", label: `MT799 Heartbeats (${mt799Count.toLocaleString('en-IN')})` }
                ].map((tf) => (
                  <button
                    key={tf.id}
                    onClick={() => {
                      setTypeFilter(tf.id);
                      setCurrentPage(1);
                    }}
                    className={`px-2.5 py-1 rounded text-[11px] font-semibold cursor-pointer ${
                      typeFilter === tf.id
                        ? "bg-[#0B2545] text-white font-bold"
                        : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                    }`}
                  >
                    {tf.label}
                  </button>
                ))}
              </div>
            </div>

            {/* List */}
            <div className="space-y-2.5">
              {paginatedMessages.length === 0 ? (
                <div className="text-center py-8 text-xs text-slate-500">
                  No SFMS messages matching query.
                </div>
              ) : (
                paginatedMessages.map((msg) => {
                  const isSelected = activeMessage?.sfmsReference === msg.sfmsReference;
                  return (
                    <div
                      key={msg.id}
                      onClick={() => setActiveMessage(msg)}
                      className={`p-3 rounded-lg border transition-all cursor-pointer ${
                        isSelected 
                          ? "bg-blue-50/60 border-[#0D3B66] ring-1 ring-[#0D3B66]" 
                          : "bg-white border-[#E2E8F0] hover:border-slate-300"
                      }`}
                    >
                      <div className="flex items-center justify-between text-xs mb-1">
                        <div className="flex items-center gap-1.5">
                          <span className={`px-2 py-0.5 rounded font-mono font-black text-[10px] ${
                            msg.messageType === "MT760" || msg.type === "MT760"
                              ? "bg-purple-100 text-purple-900 border border-purple-200" 
                              : "bg-emerald-100 text-emerald-900 border border-emerald-200"
                          }`}>
                            {msg.messageType || msg.type}
                          </span>
                          <span className="font-bold text-[#0F172A]">{msg.bank}</span>
                        </div>
                        <span className="text-[10px] font-mono text-slate-500">{msg.timestamp}</span>
                      </div>

                      <div className="flex items-center justify-between text-[11px] text-slate-600">
                        <span className="font-mono text-slate-500 truncate max-w-[200px]">
                          REF: {msg.sfmsReference || msg.id}
                        </span>
                        <span className="font-bold text-slate-900 font-mono">
                          {FORMAT_INDIAN_CURRENCY(msg.amount || 0)}
                        </span>
                      </div>

                      <div className="mt-1.5 pt-1.5 border-t border-slate-100 flex items-center justify-between text-[10px]">
                        <span className="text-slate-500">{msg.direction || "Gateway Transaction"}</span>
                        <span className="text-emerald-700 font-semibold flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3" />
                          {msg.status}
                        </span>
                      </div>
                    </div>
                  );
                })
              )}
            </div>

            {/* Pagination Controls */}
            <div className="mt-4 pt-3 border-t border-[#E2E8F0] flex items-center justify-between text-xs text-slate-500">
              <div>
                Showing {(safePage - 1) * pageSize + 1} to{" "}
                {Math.min(safePage * pageSize, filteredMessages.length)} of{" "}
                <strong>{filteredMessages.length.toLocaleString('en-IN')}</strong> packets
              </div>

              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  disabled={safePage === 1}
                  className="p-1 rounded border border-[#E2E8F0] bg-white text-slate-600 hover:bg-slate-50 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
                >
                  <ChevronLeft className="w-3.5 h-3.5" />
                </button>
                <span className="font-mono font-semibold">
                  {safePage} / {totalPages}
                </span>
                <button
                  onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                  disabled={safePage === totalPages}
                  className="p-1 rounded border border-[#E2E8F0] bg-white text-slate-600 hover:bg-slate-50 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
                >
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>

          {/* Live Gateway Terminal Log */}
          <div className="card-clean rounded-xl bg-slate-950 text-slate-100 p-4 border border-slate-800 font-mono text-xs shadow-xs">
            <div className="flex items-center justify-between pb-2 border-b border-slate-800 mb-2 text-slate-400 text-[10px]">
              <span className="flex items-center gap-1.5">
                <Terminal className="w-3.5 h-3.5 text-emerald-400" />
                <span>INFINET / SFMS GATEWAY SOCKET STREAM</span>
              </span>
              <span className="text-emerald-400">CONNECTED</span>
            </div>

            <div className="space-y-1 text-[11px] h-32 overflow-y-auto">
              {consoleLogs.length === 0 ? (
                <div className="text-slate-500 italic py-2">
                  Waiting for transmission trigger... Click &apos;Send MT760 Lien&apos; or &apos;MT799 Ping&apos; to view live socket traffic.
                </div>
              ) : (
                consoleLogs.map((log, i) => (
                  <div key={i} className="text-emerald-300 leading-tight">
                    {log}
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* RIGHT (Col 6): Dissected Raw SWIFT/SFMS ISO-15022 Telegram */}
        <div className="lg:col-span-6 space-y-4 sticky top-28">
          {activeMessage ? (
            <div className="card-clean rounded-xl border border-[#E2E8F0] bg-white p-5 shadow-xs">
              <div className="flex items-center justify-between pb-3 border-b border-[#E2E8F0]">
                <div>
                  <h3 className="text-xs font-bold text-[#0F172A] uppercase tracking-wide flex items-center gap-1.5">
                    <FileCode className="w-4 h-4 text-[#0D3B66]" />
                    <span>SFMS {activeMessage.messageType || activeMessage.type} Telegram Dissector</span>
                  </h3>
                  <span className="text-[10px] text-slate-500 font-mono">{activeMessage.sfmsReference || activeMessage.id}</span>
                </div>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-blue-100 text-[#0D3B66]">
                  ISO 15022 Validated
                </span>
              </div>

              <div className="space-y-3 pt-3">
                <div className="p-3 bg-slate-900 text-slate-200 rounded-lg font-mono text-[11px] leading-relaxed overflow-x-auto border border-slate-800">
                  <div className="text-slate-500 pb-1 mb-1 border-b border-slate-800">
                    -- RAW SFMS ENCRYPTED TELECOMMUNICATION PACKET --
                  </div>
                  <pre className="whitespace-pre-wrap text-emerald-400 font-mono">
                    {activeMessage.rawTelegram || JSON.stringify(activeMessage.fields || {}, null, 2)}
                  </pre>
                </div>

                {/* ISO Field Explanation */}
                <div className="space-y-2 text-xs">
                  <span className="text-[10px] uppercase font-bold text-[#64748B] block">
                    Key Structured Fields
                  </span>
                  <div className="grid grid-cols-2 gap-2 text-[11px]">
                    <div className="p-2 bg-slate-50 rounded border border-slate-200">
                      <span className="text-slate-400 font-mono block text-[10px]">:20: REFERENCE</span>
                      <span className="font-bold font-mono text-slate-800 truncate block">
                        {activeMessage.fields?.['20'] || activeMessage.sfmsReference}
                      </span>
                    </div>

                    <div className="p-2 bg-slate-50 rounded border border-slate-200">
                      <span className="text-slate-400 font-mono block text-[10px]">:32B: PRINCIPAL CURRENCY</span>
                      <span className="font-bold font-mono text-emerald-700 truncate block">
                        {activeMessage.fields?.['32B'] || `INR ${(activeMessage.amount || 0).toLocaleString('en-IN')}`}
                      </span>
                    </div>

                    <div className="col-span-2 p-2 bg-slate-50 rounded border border-slate-200">
                      <span className="text-slate-400 font-mono block text-[10px]">:59: BENEFICIARY IN LIEN</span>
                      <span className="font-bold text-slate-800">
                        {activeMessage.fields?.['59'] || "MEMBER SECRETARY, AICTE NEW DELHI"}
                      </span>
                    </div>

                    <div className="col-span-2 p-2 bg-slate-50 rounded border border-slate-200">
                      <span className="text-slate-400 font-mono block text-[10px]">:77C/:79: COVENANT CLAUSE</span>
                      <span className="text-slate-700 leading-snug block">
                        {activeMessage.fields?.['77C'] || activeMessage.fields?.['79'] || "Irrevocable joint lien endorsed in favor of AICTE until formal statutory discharge."}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="p-2.5 rounded bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs flex items-center justify-between">
                  <span className="flex items-center gap-1.5 font-semibold">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Cryptographic Core Banking Signature Valid</span>
                  </span>
                  <span className="font-mono text-[10px] bg-white px-1.5 py-0.5 rounded border border-emerald-300 font-bold">
                    ACK RECEIVED
                  </span>
                </div>
              </div>
            </div>
          ) : (
            <div className="card-clean rounded-xl border border-dashed border-slate-300 bg-white p-8 text-center text-xs text-slate-500">
              Select an SFMS telegram packet from the left queue to view and dissect its structured ISO-15022 message payload.
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
