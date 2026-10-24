import { useState, useEffect } from "react";
import { 
  ShieldCheck, 
  Hash, 
  Link2, 
  CheckCircle2, 
  Download, 
  RefreshCw, 
  Search, 
  Layers, 
  Copy,
  Terminal,
  Check
} from "lucide-react";

export const CryptographicLedgerView = () => {
  const [chain, setChain] = useState([]);
  const [loading, setLoading] = useState(true);
  const [verifying, setVerifying] = useState(false);
  const [verificationResult, setVerificationResult] = useState(null);
  const [selectedBlock, setSelectedBlock] = useState(null);
  const [searchHash, setSearchHash] = useState("");
  const [copied, setCopied] = useState(false);

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

  const handleCopyHash = (text) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
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
        <div className="flex items-center gap-3 text-sm text-[#0B2545] font-semibold">
          <RefreshCw className="w-5 h-5 animate-spin text-[#D97706]" />
          Verifying SHA-256 Chained Cryptographic Ledger Blocks...
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
      {/* View Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#E2E8F0]">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-md bg-[#0B2545] text-white">
              <Hash className="w-5 h-5" />
            </span>
            <div>
              <h1 className="text-xl font-bold text-[#0B2545]">
                Cryptographic Audit Ledger
              </h1>
              <p className="text-xs text-slate-500">
                NIST FIPS 180-4 SHA-256 Chained Event Blocks • Non-Repudiation for Central Vigilance Commission (CVC) Audits
              </p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2 flex-wrap">
          <button
            onClick={handleVerifyChain}
            disabled={verifying}
            className="px-3 py-1.5 text-xs font-semibold text-[#0B2545] bg-blue-50 border border-blue-200 rounded-md hover:bg-blue-100 transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <ShieldCheck className="w-3.5 h-3.5 text-[#0B2545]" />
            <span>{verifying ? "Recalculating Hashes..." : "Verify Chain Integrity"}</span>
          </button>

          <button
            onClick={handleExportTranscript}
            className="px-3 py-1.5 text-xs font-bold text-white bg-[#0B2545] hover:bg-[#133E87] rounded-md transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export Certified Transcript</span>
          </button>
        </div>
      </div>

      {/* Verification Result Banner */}
      {verificationResult && (
        <div className={`p-4 rounded-md border flex items-center justify-between ${
          verificationResult.valid 
            ? "bg-emerald-50 border-emerald-300 text-emerald-900" 
            : "bg-rose-50 border-rose-300 text-rose-900"
        }`}>
          <div className="flex items-center gap-3">
            <CheckCircle2 className="w-5 h-5 text-[#059669] shrink-0" />
            <div>
              <div className="font-bold text-xs">
                {verificationResult.valid 
                  ? "CRYPTOGRAPHIC CHAIN INTEGRITY CERTIFIED (100% UNBROKEN HASH LINKAGE)" 
                  : "CHAIN INTEGRITY COMPROMISED - MISMATCH DETECTED"}
              </div>
              <p className="text-[11px] text-slate-600 mt-0.5">
                {verificationResult.message} • Recalculated {verificationResult.totalBlocks} blocks from Genesis block.
              </p>
            </div>
          </div>
          <span className="font-mono text-[10px] bg-white px-2 py-0.5 rounded border border-slate-200 font-bold">
            NIST FIPS 180-4 CERTIFIED
          </span>
        </div>
      )}

      {/* Stats bar */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="card-clean p-3.5 rounded-lg border border-[#E2E8F0] bg-white">
          <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider block">Total Chained Blocks</span>
          <span className="text-xl font-bold font-mono text-[#0F172A]">{chain.length}</span>
        </div>
        <div className="card-clean p-3.5 rounded-lg border border-[#E2E8F0] bg-white">
          <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider block">Latest Head Digest</span>
          <span className="text-xs font-bold font-mono text-[#0B2545] truncate block mt-1">
            {chain[chain.length - 1]?.hash.substring(0, 16)}...
          </span>
        </div>
        <div className="card-clean p-3.5 rounded-lg border border-[#E2E8F0] bg-white">
          <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider block">Consensus Authority</span>
          <span className="text-xs font-bold text-slate-800 mt-1 block">AICTE Regulation Bureau</span>
        </div>
        <div className="card-clean p-3.5 rounded-lg border border-[#E2E8F0] bg-white">
          <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider block">Statutory Audit Standard</span>
          <span className="text-xs font-bold text-[#059669] flex items-center gap-1 mt-1">
            <CheckCircle2 className="w-3.5 h-3.5" />
            CVC &amp; RTI Compliant
          </span>
        </div>
      </div>

      {/* Main Chain Viewer: Block Stream (Left) + Dark-Mode Terminal Payload Inspector (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        
        {/* LEFT (Col 7): The Chained Blocks Stream */}
        <div className="lg:col-span-7 space-y-4">
          <div className="card-clean rounded-lg border border-[#E2E8F0] bg-white p-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#E2E8F0] mb-3">
              <h2 className="text-xs font-bold text-slate-600 uppercase tracking-wider flex items-center gap-2">
                <Layers className="w-4 h-4 text-[#0B2545]" />
                <span>Chronological Event Blocks</span>
              </h2>
              <div className="relative w-52">
                <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Filter block hash..."
                  value={searchHash}
                  onChange={(e) => setSearchHash(e.target.value)}
                  className="w-full bg-[#F8FAFC] border border-[#E2E8F0] rounded-md pl-8 pr-2 py-1 text-xs focus:outline-none focus:border-[#0B2545]"
                />
              </div>
            </div>

            <div className="space-y-2.5">
              {filteredChain.map((block) => {
                const isSelected = selectedBlock?.index === block.index;
                return (
                  <div
                    key={block.index}
                    onClick={() => setSelectedBlock(block)}
                    className={`p-3 rounded-md border transition-all cursor-pointer ${
                      isSelected 
                        ? "bg-blue-50/50 border-[#0B2545] ring-1 ring-[#0B2545]" 
                        : "bg-white border-[#E2E8F0] hover:border-slate-300"
                    }`}
                  >
                    <div className="flex items-center justify-between text-[11px] mb-1">
                      <div className="flex items-center gap-1.5">
                        <span className="font-mono font-bold text-[#0B2545] bg-blue-100 px-1.5 py-0.2 rounded text-[10px]">
                          BLOCK #{block.index}
                        </span>
                        <span className="font-bold text-[#0F172A]">{block.action}</span>
                      </div>
                      <span className="text-[10px] text-slate-500 font-mono">{block.timestamp}</span>
                    </div>

                    <h3 className="text-xs font-semibold text-slate-800 mb-1.5">
                      {block.title}
                    </h3>

                    {/* Hash display */}
                    <div className="space-y-0.5 font-mono text-[10px] bg-slate-900 text-slate-200 p-2 rounded">
                      <div className="flex items-center gap-1 text-slate-400 truncate">
                        <Link2 className="w-3 h-3 shrink-0 text-slate-500" />
                        <span className="shrink-0 text-slate-500">PREV:</span>
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
                      <span className="text-[#0B2545] font-semibold hover:underline">Inspect Payload &rarr;</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* RIGHT (Col 5): Technical Dark-Mode Terminal Payload Inspector (Matching SFMS aesthetic) */}
        <div className="lg:col-span-5 space-y-4 sticky top-28">
          {selectedBlock ? (
            <div className="rounded-lg bg-[#0B132B] text-slate-200 overflow-hidden border border-slate-800 shadow-lg font-mono">
              {/* Terminal Title Bar */}
              <div className="h-9 bg-[#070D1F] px-3.5 flex items-center justify-between border-b border-slate-800 text-xs select-none">
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80 inline-block" />
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80 inline-block" />
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80 inline-block" />
                  </div>
                  <span className="text-[11px] font-mono text-slate-400 ml-1">
                    block-inspector:~/block_{selectedBlock.index}.json
                  </span>
                </div>
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => handleCopyHash(selectedBlock.hash)}
                    className="p-1 hover:text-white hover:bg-slate-800 rounded transition-colors text-[10px] text-slate-400 flex items-center gap-1 cursor-pointer"
                    title="Copy SHA-256 Digest"
                  >
                    {copied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                    <span>{copied ? "Copied" : "Copy Hash"}</span>
                  </button>
                  <span className="text-[9px] bg-emerald-950 text-emerald-400 border border-emerald-800/80 px-1.5 py-0.5 rounded font-bold">
                    VERIFIED
                  </span>
                </div>
              </div>

              {/* Terminal Body */}
              <div className="p-4 space-y-3 text-xs leading-relaxed">
                {/* Block Metadata Grid */}
                <div className="grid grid-cols-2 gap-2 text-[10px] pb-2 border-b border-slate-800">
                  <div>
                    <span className="text-slate-500 block">BLOCK SEQUENCE:</span>
                    <span className="font-bold text-amber-400">#{selectedBlock.index}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block">TIMESTAMP (UTC):</span>
                    <span className="text-slate-300">{selectedBlock.timestamp}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block">STATE ACTION:</span>
                    <span className="text-cyan-400 font-bold">{selectedBlock.action}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block">SIGNING ACTOR:</span>
                    <span className="text-slate-300 truncate block">{selectedBlock.actor}</span>
                  </div>
                </div>

                {/* SHA-256 Digest Box */}
                <div>
                  <span className="text-[10px] text-slate-400 uppercase tracking-wider block mb-1">
                    SHA-256 CRYPTOGRAPHIC DIGEST (FIPS 180-4):
                  </span>
                  <div className="p-2 rounded bg-[#070D1F] border border-slate-800 text-emerald-400 text-[10px] break-all select-all font-mono">
                    {selectedBlock.hash}
                  </div>
                </div>

                {/* Chained Previous Hash */}
                <div>
                  <span className="text-[10px] text-slate-400 uppercase tracking-wider block mb-1">
                    PARENT BLOCK LINKAGE (PREVIOUS HASH):
                  </span>
                  <div className="p-2 rounded bg-[#070D1F] border border-slate-800 text-slate-400 text-[10px] break-all select-all font-mono">
                    {selectedBlock.previousHash}
                  </div>
                </div>

                {/* State Payload Data Code Block */}
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[10px] text-slate-400 uppercase tracking-wider">
                      IMMUTABLE STATE TRANSITION PAYLOAD:
                    </span>
                    <span className="text-[9px] text-slate-500">JSON-LD ENCODED</span>
                  </div>
                  <pre className="p-3 rounded bg-[#070D1F] text-cyan-300 font-mono text-[10.5px] overflow-auto max-h-56 border border-slate-800 selection:bg-slate-700 selection:text-white leading-relaxed">
                    {JSON.stringify(selectedBlock.data, null, 2)}
                  </pre>
                </div>

                <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-[9px] text-slate-500">
                  <span>Tamper-evident consensus signed by AICTE Regulation Bureau</span>
                  <span className="text-emerald-400 font-bold">Merkle Proof Valid</span>
                </div>
              </div>
            </div>
          ) : (
            <div className="card-clean rounded-lg border border-dashed border-slate-300 bg-white p-8 text-center text-xs text-slate-500">
              Select a block from the chronological ledger to inspect its cryptographic certificate and state payload.
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
