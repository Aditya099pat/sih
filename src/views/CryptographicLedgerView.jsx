import { useState, useEffect } from "react";
import { 
  ShieldCheck, 
  Hash, 
  Link2, 
  CheckCircle2, 
  Download, 
  FileCheck, 
  RefreshCw, 
  Search, 
  Layers, 
  Clock, 
  UserCheck,
  AlertCircle
} from "lucide-react";

export const CryptographicLedgerView = () => {
  const [chain, setChain] = useState([]);
  const [loading, setLoading] = useState(true);
  const [verifying, setVerifying] = useState(false);
  const [verificationResult, setVerificationResult] = useState(null);
  const [selectedBlock, setSelectedBlock] = useState(null);
  const [searchHash, setSearchHash] = useState("");

  const fetchLedger = async () => {
    try {
      const res = await fetch("/api/ledger");
      const data = await res.json();
      if (data.success) {
        setChain(data.data);
        if (data.data.length > 0 && !selectedBlock) {
          setSelectedBlock(data.data[data.data.length - 1]);
        }
      }
    } catch (err) {
      console.error("Failed to load ledger:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLedger();
  }, []);

  const handleVerifyChain = async () => {
    setVerifying(true);
    try {
      const res = await fetch("/api/ledger/verify");
      const data = await res.json();
      setVerificationResult(data);
    } catch (err) {
      console.error(err);
    } finally {
      setVerifying(false);
    }
  };

  const handleExportTranscript = () => {
    const transcriptText = JSON.stringify({
      title: "CENTRAL VIGILANCE COMMISSION (CVC) COMPLIANCE AUDIT TRANSCRIPT",
      authority: "All India Council for Technical Education (AICTE)",
      institutionCode: "1-1029384",
      institutionName: "Bharati Vidya Sansthan",
      generatedAt: new Date().toISOString(),
      cryptographicAlgorithm: "SHA-256 (NIST FIPS 180-4)",
      chainLength: chain.length,
      blocks: chain
    }, null, 2);

    const blob = new Blob([transcriptText], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `AICTE_CVC_AUDIT_TRANSCRIPT_${Date.now()}.json`;
    a.click();
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="flex items-center gap-3 text-sm text-[#0D3B66] font-semibold">
          <RefreshCw className="w-5 h-5 animate-spin text-[#E65100]" />
          Loading SHA-256 Chained Cryptographic Ledger...
        </div>
      </div>
    );
  }

  const filteredChain = chain.filter(b => {
    if (!searchHash.trim()) return true;
    const q = searchHash.toLowerCase();
    return b.hash.toLowerCase().includes(q) || 
           b.title.toLowerCase().includes(q) || 
           b.action.toLowerCase().includes(q) || 
           b.actor.toLowerCase().includes(q);
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[#E2E8F0]">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-[#0D3B66] text-white">
              <Hash className="w-5 h-5" />
            </span>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-bold text-[#0F172A]">
                Cryptographic SHA-256 Immutable Audit Ledger
              </h1>
              <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-blue-100 text-[#0D3B66] border border-blue-200">
                USP 5
              </span>
            </div>
          </div>
          <p className="text-xs text-[#64748B] mt-0.5">
            Tamper-proof hash-chained event registry for CVC vigilance inspections, RTI inquiries, and Member Secretary clearances
          </p>
        </div>

        {/* Verification & Export Action Buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={handleVerifyChain}
            disabled={verifying}
            className="px-3.5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition flex items-center gap-1.5 cursor-pointer shadow-xs"
          >
            <ShieldCheck className="w-4 h-4" />
            <span>{verifying ? "Hashing..." : "Verify Chain Integrity"}</span>
          </button>

          <button
            onClick={handleExportTranscript}
            className="px-3.5 py-1.5 rounded-lg bg-[#0D3B66] hover:bg-[#092c4d] text-white text-xs font-bold transition flex items-center gap-1.5 cursor-pointer shadow-xs"
          >
            <Download className="w-4 h-4" />
            <span>Export CVC Audit Transcript</span>
          </button>
        </div>
      </div>

      {/* Verification Result Banner */}
      {verificationResult && (
        <div className={`p-4 rounded-xl border flex items-center justify-between gap-4 ${
          verificationResult.valid 
            ? "bg-emerald-50 border-emerald-300 text-emerald-900" 
            : "bg-red-50 border-red-300 text-red-900"
        }`}>
          <div className="flex items-center gap-3">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
              verificationResult.valid ? "bg-emerald-200 text-emerald-800" : "bg-red-200 text-red-800"
            }`}>
              {verificationResult.valid ? <CheckCircle2 className="w-5 h-5" /> : <AlertCircle className="w-5 h-5" />}
            </div>
            <div>
              <div className="font-bold text-xs">
                {verificationResult.valid 
                  ? "CRYPTOGRAPHIC CHAIN INTEGRITY 100% VERIFIED" 
                  : "CHAIN INTEGRITY COMPROMISED - MISMATCH DETECTED"}
              </div>
              <p className="text-[11px] text-slate-600 mt-0.5">
                {verificationResult.message} • Recalculated {verificationResult.totalBlocks} blocks up to Genesis block.
              </p>
            </div>
          </div>
          <span className="font-mono text-[10px] bg-white px-2.5 py-1 rounded border border-slate-200 font-bold">
            STANDARD: NIST FIPS 180-4 SHA-256
          </span>
        </div>
      )}

      {/* Stats bar */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="card-clean p-3.5 rounded-xl border border-[#E2E8F0] bg-white">
          <span className="text-[10px] text-[#64748B] font-bold uppercase block">Total Chained Blocks</span>
          <span className="text-xl font-bold font-mono text-[#0F172A]">{chain.length}</span>
        </div>
        <div className="card-clean p-3.5 rounded-xl border border-[#E2E8F0] bg-white">
          <span className="text-[10px] text-[#64748B] font-bold uppercase block">Latest Block Hash</span>
          <span className="text-xs font-bold font-mono text-[#0D3B66] truncate block">
            {chain[chain.length - 1]?.hash.substring(0, 16)}...
          </span>
        </div>
        <div className="card-clean p-3.5 rounded-xl border border-[#E2E8F0] bg-white">
          <span className="text-[10px] text-[#64748B] font-bold uppercase block">Consensus Authority</span>
          <span className="text-xs font-bold text-[#0F172A]">AICTE Regulation Bureau</span>
        </div>
        <div className="card-clean p-3.5 rounded-xl border border-[#E2E8F0] bg-white">
          <span className="text-[10px] text-[#64748B] font-bold uppercase block">Audit Compliance</span>
          <span className="text-xs font-bold text-emerald-700 flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5" />
            CVC &amp; RTI Certified
          </span>
        </div>
      </div>

      {/* Main Chain Viewer: Block List (Left) + Selected Block Payload Inspector (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* LEFT (Col 7): The Chained Blocks Stream */}
        <div className="lg:col-span-7 space-y-4">
          <div className="card-clean rounded-xl border border-[#E2E8F0] bg-white p-4 shadow-xs">
            <div className="flex items-center justify-between pb-3 border-b border-[#E2E8F0] mb-3">
              <h2 className="text-xs font-bold text-[#0F172A] uppercase tracking-wider flex items-center gap-2">
                <Layers className="w-4 h-4 text-[#0D3B66]" />
                <span>Chronological Event Blocks</span>
              </h2>
              <div className="relative w-48">
                <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Filter block hash..."
                  value={searchHash}
                  onChange={(e) => setSearchHash(e.target.value)}
                  className="w-full bg-[#F8FAFC] border border-[#E2E8F0] rounded pl-8 pr-2 py-1 text-xs focus:outline-none"
                />
              </div>
            </div>

            <div className="space-y-3">
              {filteredChain.map((block, idx) => {
                const isSelected = selectedBlock?.index === block.index;
                return (
                  <div
                    key={block.index}
                    onClick={() => setSelectedBlock(block)}
                    className={`p-3.5 rounded-lg border transition-all cursor-pointer relative ${
                      isSelected 
                        ? "bg-blue-50/50 border-[#0D3B66] shadow-xs ring-1 ring-[#0D3B66]" 
                        : "bg-white border-[#E2E8F0] hover:border-slate-300"
                    }`}
                  >
                    <div className="flex items-center justify-between text-[11px] mb-1">
                      <div className="flex items-center gap-1.5">
                        <span className="font-mono font-bold text-[#0D3B66] bg-blue-100/70 px-1.5 py-0.2 rounded">
                          Block #{block.index}
                        </span>
                        <span className="font-bold text-[#0F172A]">{block.action}</span>
                      </div>
                      <span className="text-[10px] text-slate-500 font-mono">{block.timestamp}</span>
                    </div>

                    <h3 className="text-xs font-semibold text-slate-800 mb-2">
                      {block.title}
                    </h3>

                    {/* Hash display */}
                    <div className="space-y-1 font-mono text-[10px] bg-slate-900 text-slate-200 p-2 rounded">
                      <div className="flex items-center gap-1 text-slate-400 truncate">
                        <Link2 className="w-3 h-3 shrink-0 text-slate-500" />
                        <span className="shrink-0">PREV:</span>
                        <span className="truncate">{block.previousHash}</span>
                      </div>
                      <div className="flex items-center gap-1 text-emerald-400 font-bold truncate">
                        <Hash className="w-3 h-3 shrink-0 text-emerald-500" />
                        <span className="shrink-0 text-slate-300">HASH:</span>
                        <span className="truncate">{block.hash}</span>
                      </div>
                    </div>

                    <div className="mt-2 flex items-center justify-between text-[10px] text-slate-500">
                      <span>Actor: <strong className="text-slate-700">{block.actor}</strong></span>
                      <span className="text-[#0D3B66] font-semibold">Inspect Payload →</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* RIGHT (Col 5): Block Cryptographic Certificate & Payload Inspector */}
        <div className="lg:col-span-5 space-y-4 sticky top-28">
          {selectedBlock ? (
            <div className="card-clean rounded-xl border border-[#E2E8F0] bg-white p-5 shadow-xs">
              <div className="flex items-center justify-between pb-3 border-b border-[#E2E8F0]">
                <div>
                  <h3 className="text-xs font-bold text-[#0F172A] uppercase tracking-wide">
                    Block #{selectedBlock.index} Inspector
                  </h3>
                  <span className="text-[10px] text-slate-500 font-mono">{selectedBlock.action}</span>
                </div>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800">
                  Immutable
                </span>
              </div>

              <div className="space-y-3 pt-3 text-xs">
                <div>
                  <span className="text-[#64748B] block text-[10px] uppercase font-bold">Block Title</span>
                  <span className="font-semibold text-[#0F172A]">{selectedBlock.title}</span>
                </div>

                <div>
                  <span className="text-[#64748B] block text-[10px] uppercase font-bold">Certified Actor / Officer</span>
                  <span className="font-semibold text-[#0F172A]">{selectedBlock.actor}</span>
                </div>

                <div>
                  <span className="text-[#64748B] block text-[10px] uppercase font-bold">Cryptographic Timestamp</span>
                  <span className="font-mono text-slate-700">{selectedBlock.timestamp}</span>
                </div>

                <div>
                  <span className="text-[#64748B] block text-[10px] uppercase font-bold">SHA-256 Digest (Block Hash)</span>
                  <div className="p-2 rounded bg-slate-900 text-emerald-400 font-mono text-[10px] break-all border border-slate-800 select-all">
                    {selectedBlock.hash}
                  </div>
                </div>

                <div>
                  <span className="text-[#64748B] block text-[10px] uppercase font-bold">Previous Block Hash (Chained)</span>
                  <div className="p-2 rounded bg-slate-100 text-slate-700 font-mono text-[10px] break-all border border-slate-200 select-all">
                    {selectedBlock.previousHash}
                  </div>
                </div>

                <div>
                  <span className="text-[#64748B] block text-[10px] uppercase font-bold mb-1">State Transition Payload Data</span>
                  <pre className="p-3 rounded bg-slate-950 text-slate-100 font-mono text-[11px] overflow-auto max-h-52 border border-slate-800">
                    {JSON.stringify(selectedBlock.data, null, 2)}
                  </pre>
                </div>
              </div>
            </div>
          ) : (
            <div className="card-clean rounded-xl border border-dashed border-slate-300 bg-white p-8 text-center text-xs text-slate-500">
              Select a block from the ledger stream to inspect its cryptographic certificate and state payload.
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
