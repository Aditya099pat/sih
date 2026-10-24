import { useState, useEffect } from "react";
import { 
  BellRing, 
  Clock, 
  Send, 
  AlertTriangle, 
  FileText, 
  Mail, 
  MessageSquare, 
  ShieldAlert, 
  CheckCircle2, 
  Sparkles,
  RefreshCw,
  Building2,
  Calendar,
  ExternalLink
} from "lucide-react";
import { FORMAT_INDIAN_CURRENCY } from "../data/mockData";

export const EscalationLadderView = ({ onOpenShowCauseModal }) => {
  const [escalationData, setEscalationData] = useState([]);
  const [selectedTier, setSelectedTier] = useState("T-90");
  const [loading, setLoading] = useState(true);
  const [triggering, setTriggering] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");

  const fetchEscalation = async () => {
    try {
      const res = await fetch("/api/escalation");
      const data = await res.json();
      if (data.success) {
        setEscalationData(data.data);
      }
    } catch (err) {
      console.error("Failed to load escalation ladder:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEscalation();
  }, []);

  const handleTriggerTier = async (tierName) => {
    setTriggering(true);
    try {
      const res = await fetch(`/api/escalation/trigger/${tierName}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" }
      });
      const data = await res.json();
      if (data.success) {
        setStatusMessage(`Tier ${tierName} escalation protocol successfully triggered! Transmitted across gateway.`);
        fetchEscalation();
        setTimeout(() => setStatusMessage(""), 4500);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setTriggering(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="flex items-center gap-3 text-sm text-[#0D3B66] font-semibold">
          <RefreshCw className="w-5 h-5 animate-spin text-[#E65100]" />
          Loading Statutory Multi-Stage Escalation Matrix...
        </div>
      </div>
    );
  }

  const activeStage = escalationData.find(s => s.tier === selectedTier) || escalationData[0];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#E2E8F0]">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-md bg-[#0B2545] text-white">
              <BellRing className="w-5 h-5" />
            </span>
            <div>
              <h1 className="text-xl font-bold text-[#0B2545]">
                Compliance Escalation Engine
              </h1>
              <p className="text-xs text-slate-500">
                4-Tier Statutory Automated Countdown Engine • Prevents security deposits from lapsing into zero-yield dormancy
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs text-[#64748B]">Automated Cron Status:</span>
          <span className="inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            Daemon Active (00:00 IST Daily)
          </span>
        </div>
      </div>

      {statusMessage && (
        <div className="p-3 bg-emerald-50 border-l-4 border-emerald-600 text-emerald-900 text-xs font-medium rounded-r flex items-center justify-between">
          <span>{statusMessage}</span>
        </div>
      )}

      {/* 4-Stage Horizontal Stepper (Interactive) */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {escalationData.map((stage, idx) => {
          const isSelected = selectedTier === stage.tier;
          return (
            <button
              key={stage.tier}
              onClick={() => setSelectedTier(stage.tier)}
              className={`p-4 rounded-xl text-left border transition-all cursor-pointer relative overflow-hidden ${
                isSelected 
                  ? "bg-white border-[#0D3B66] shadow-md ring-2 ring-[#0D3B66]/10" 
                  : "bg-white border-[#E2E8F0] hover:border-slate-300"
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className={`text-xs font-black font-mono px-2 py-0.5 rounded ${
                  stage.tier.includes("T-0") 
                    ? "bg-red-100 text-red-800" 
                    : stage.tier.includes("T-30") 
                    ? "bg-amber-100 text-amber-800"
                    : "bg-blue-100 text-[#0D3B66]"
                }`}>
                  {stage.tier}
                </span>
                <span className="text-[10px] text-slate-400 font-mono">Stage {idx + 1} of {escalationData.length}</span>
              </div>

              <h3 className="font-bold text-xs text-[#0F172A] leading-tight">
                {stage.title}
              </h3>
              <p className="text-[11px] text-[#64748B] mt-1 line-clamp-2">
                {stage.target}
              </p>

              <div className="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between text-[10px]">
                <span className="text-slate-500">{stage.channel}</span>
                <span className={`font-semibold ${stage.status === 'Sent' || stage.status === 'Flagged' ? 'text-emerald-700' : 'text-slate-500'}`}>
                  {stage.status}
                </span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Stage Detail Card */}
      {activeStage && (
        <div className="card-clean rounded-xl border border-[#E2E8F0] bg-white p-6 shadow-xs">
          <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6 pb-6 border-b border-[#E2E8F0]">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className={`px-2.5 py-1 rounded text-xs font-black font-mono ${
                  activeStage.tier.includes("T-0") ? "bg-red-600 text-white" : "bg-[#0D3B66] text-white"
                }`}>
                  {activeStage.tier} Protocol
                </span>
                <h2 className="text-base font-bold text-[#0F172A]">
                  {activeStage.title}
                </h2>
              </div>
              <p className="text-xs text-[#64748B] max-w-2xl leading-relaxed">
                {activeStage.description}
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-xs">
                <div className="p-2.5 bg-slate-50 rounded border border-slate-200">
                  <span className="text-[#64748B] block text-[10px] uppercase font-bold">Escalation Recipient</span>
                  <span className="font-semibold text-[#0F172A]">{activeStage.target}</span>
                </div>
                <div className="p-2.5 bg-slate-50 rounded border border-slate-200">
                  <span className="text-[#64748B] block text-[10px] uppercase font-bold">Transmission Channel</span>
                  <span className="font-semibold text-[#0F172A]">{activeStage.channel}</span>
                </div>
                <div className="p-2.5 bg-slate-50 rounded border border-slate-200">
                  <span className="text-[#64748B] block text-[10px] uppercase font-bold">Legal Consequence</span>
                  <span className="font-semibold text-red-700">{activeStage.consequence}</span>
                </div>
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex flex-col gap-2 shrink-0">
              <button
                onClick={() => handleTriggerTier(activeStage.tier)}
                disabled={triggering}
                className="px-4 py-2 bg-[#0D3B66] hover:bg-[#092c4d] text-white rounded-lg text-xs font-bold transition flex items-center gap-2 cursor-pointer shadow-xs"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Simulate Trigger {activeStage.tier} Alert</span>
              </button>

              {activeStage.tier.includes("T-0") && (
                <button
                  onClick={() => onOpenShowCauseModal && onOpenShowCauseModal("fdr-5")}
                  className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg text-xs font-bold transition flex items-center gap-2 cursor-pointer shadow-xs"
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>Preview Draft Show-Cause Notice</span>
                </button>
              )}
            </div>
          </div>

          {/* Staged Message Dispatch Payload Preview */}
          <div className="mt-6">
            <h3 className="text-xs font-bold text-[#0F172A] uppercase tracking-wider mb-2 flex items-center gap-2">
              <MessageSquare className="w-3.5 h-3.5 text-[#0D3B66]" />
              <span>Automated Gateway Dispatch Payload</span>
            </h3>

            <div className="p-4 rounded-xl bg-slate-900 text-slate-100 font-mono text-xs border border-slate-800 space-y-2">
              <div className="text-slate-400 text-[11px] pb-2 border-b border-slate-800 flex justify-between">
                <span>HEADER: AICTE-SCHEDULER // PROTOCOL-{activeStage.tier}</span>
                <span>SECURITY: SHA-256 SIGNED</span>
              </div>
              <div className="text-amber-300 font-semibold">
                DESTINATION: {activeStage.target} &lt;{activeStage.channel}&gt;
              </div>
              <div className="text-slate-200 whitespace-pre-wrap leading-relaxed">
                {activeStage.sampleNotice}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
