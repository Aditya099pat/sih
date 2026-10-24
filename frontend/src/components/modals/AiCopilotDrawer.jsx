import { useState } from "react";
import {
  X,
  Send,
  Bot,
  User,
  Sparkles,
  BookOpen,
  ExternalLink,
  RefreshCw,
  Clock,
  AlertTriangle,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  FileText
} from "lucide-react";
import { FORMAT_INDIAN_CURRENCY } from "@data/mockData";

export const AiCopilotDrawer = ({
  isOpen,
  onClose,
  onSelectTab,
  onViewInstrument
}) => {
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      text: "Namaste! I am your AICTE Statutory Regulatory Copilot trained on Approval Process Handbook (APH 2025-26) norms, deposit formulas, and SFMS protocols. Ask me anything regarding FDR lock-in tenures, Table 1.4 concessions, or Phase 5 refund eligibility."
    }
  ]);
  const [query, setQuery] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const sampleQuestions = [
    "Which instruments mature in the next 30 days?",
    "Show cases with pending bank verification",
    "Calculate penalty for premature closure under Table 1.4",
    "What is the statutory lock-in period for Engineering FDRs?",
    "How does the 50% concession for Women institutions work?"
  ];

  const handleSend = async (textToSend) => {
    const q = textToSend || query;
    if (!q.trim()) return;

    const userMsg = { role: "user", text: q };
    setMessages((prev) => [...prev, userMsg]);
    setQuery("");
    setIsTyping(true);

    const lowerQ = q.toLowerCase();

    // Context-Aware Instant Smart Handling for SIH Demo
    if (lowerQ.includes("mature in the next 30 days") || lowerQ.includes("next 30 days") || lowerQ.includes("maturing")) {
      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            text: "Based on active CBS telemetry and regulatory ledger records, there is 1 high-priority instrument approaching maturity within the immediate action window:",
            clause: "AICTE APH 2025-26 Clause 1.4.3 & Notification S.O. 412(E)",
            interactiveCard: {
              type: "instrument",
              ref: "FDR-SBIN-2018-09",
              title: "Bharati Vidya Sansthan (PID: 1-1029384)",
              bank: "State Bank of India (Nariman Point)",
              amount: 3500000,
              deadline: "15 Dec 2026 (42 Days Remaining)",
              severity: "warning",
              actionLabel: "Open Scrutiny & Affidavit Desk",
              actionTab: "scrutiny"
            }
          }
        ]);
        setIsTyping(false);
      }, 700);
      return;
    }

    if (lowerQ.includes("pending bank verification") || lowerQ.includes("pending verification") || lowerQ.includes("cbs")) {
      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            text: "Here are the cases currently pending Core Banking SFMS verification across regional jurisdictions:",
            clause: "SFMS Structured Financial Messaging System MT760 Standards",
            interactiveCard: {
              type: "verification_queue",
              ref: "FDR-BOB-2023-11 & FDR-CNRB-2022-07",
              title: "Bank of Baroda & Canara Bank Queue (2 Cases)",
              bank: "Awaiting Core Banking System (CBS) Ping",
              amount: 4000000,
              deadline: "Review Deadline: T-14 Days",
              severity: "info",
              actionLabel: "Inspect SFMS Telemetry Gateway",
              actionTab: "sfms"
            }
          }
        ]);
        setIsTyping(false);
      }, 700);
      return;
    }

    if (lowerQ.includes("premature closure") || lowerQ.includes("penalty") || lowerQ.includes("table 1.4")) {
      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            text: "Under Table 1.4 of the Approval Process Handbook, calibrated forfeiture deduction applies upon voluntary closure. For an approved Technical UG campus with ₹35.00 L base deposit, voluntary closure in Year 3 triggers an administrative deduction between 10% and 50% based on student transfer compliance.",
            clause: "APH 2025-26 Table 1.4 & Section 2.8 Closure Regulations",
            interactiveCard: {
              type: "calculator",
              ref: "Table 1.4 Matrix Engine",
              title: "Statutory Capital & Penalty Calculator",
              bank: "AICTE Regulation Bureau Norms",
              amount: 3500000,
              deadline: "50% Concession for Women / PwD / NE / J&K",
              severity: "success",
              actionLabel: "Open Statutory Calculator",
              actionTab: "calculator"
            }
          }
        ]);
        setIsTyping(false);
      }, 700);
      return;
    }

    // Default API call
    try {
      const res = await fetch("/api/copilot/query", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: q })
      });
      const data = await res.json();
      if (data.success) {
        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            text: data.reply,
            clause: data.statutoryClause
          }
        ]);
      } else {
        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            text: "Under APH 2025-26 Regulation 1.4, joint fixed deposits must remain pledged in unconditional lien to Member Secretary AICTE for a mandatory 8-year term. Premature release or encumbrance is strictly prohibited without statutory clearance."
          }
        ]);
      }
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          text: "Under APH 2025-26 Regulation 1.4, joint fixed deposits must remain pledged in unconditional lien to Member Secretary AICTE for an 8-year term."
        }
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-slate-900/50 backdrop-blur-xs flex justify-end animate-in fade-in duration-200">
      <div className="w-full max-w-lg bg-white/95 backdrop-blur-md h-full shadow-2xl flex flex-col justify-between border-l border-[#E2E8F0] animate-in slide-in-from-right duration-200">
        {/* Header */}
        <div className="p-4 bg-[#0B2545] text-white flex items-center justify-between select-none">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-md bg-white/10 flex items-center justify-center text-amber-400">
              <Bot className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-sm font-bold">AI Regulatory Copilot</h2>
                <span className="text-[9px] bg-amber-400/20 text-amber-300 font-bold px-1.5 py-0.2 rounded border border-amber-400/30 font-mono">
                  APH 2025-26
                </span>
              </div>
              <p className="text-[10px] text-blue-200">
                Context-Aware Gazette Assistant &amp; Compliance Data Engine
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 hover:bg-white/10 rounded-md text-white transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Chat message stream */}
        <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-slate-50/70 text-xs">
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`flex gap-2.5 ${msg.role === "user" ? "justify-end" : "justify-start"}`}
            >
              {msg.role === "assistant" && (
                <div className="w-7 h-7 rounded-full bg-[#0B2545] text-white flex items-center justify-center shrink-0 mt-0.5">
                  <Bot className="w-4 h-4" />
                </div>
              )}

              <div
                className={`p-3.5 rounded-lg max-w-[88%] leading-relaxed ${
                  msg.role === "user"
                    ? "bg-[#0B2545] text-white rounded-br-xs shadow-xs"
                    : "bg-white text-slate-800 rounded-bl-xs border border-[#E2E8F0] shadow-xs"
                }`}
              >
                <div>{msg.text}</div>

                {/* Rich Contextual Card Response with Direct Navigation Link */}
                {msg.interactiveCard && (
                  <div className="mt-3 p-3 rounded-md border border-slate-200 bg-[#F8FAFC] space-y-1.5 font-sans">
                    <div className="flex items-center justify-between">
                      <span className="font-mono font-bold text-[#0B2545] text-[11px]">
                        {msg.interactiveCard.ref}
                      </span>
                      <span className="text-[10px] font-bold text-amber-800 bg-amber-100 px-1.5 py-0.2 rounded">
                        {msg.interactiveCard.deadline}
                      </span>
                    </div>

                    <div className="font-bold text-slate-900 text-xs">
                      {msg.interactiveCard.title}
                    </div>

                    <div className="flex items-center justify-between text-[11px] text-slate-600 font-mono">
                      <span>{msg.interactiveCard.bank}</span>
                      <span className="font-bold text-slate-900">
                        {FORMAT_INDIAN_CURRENCY(msg.interactiveCard.amount)}
                      </span>
                    </div>

                    <button
                      onClick={() => {
                        if (onSelectTab && msg.interactiveCard.actionTab) {
                          onSelectTab(msg.interactiveCard.actionTab);
                          onClose();
                        }
                      }}
                      className="w-full mt-2 py-1.5 px-2 bg-[#0B2545] hover:bg-[#133E87] text-white rounded text-[11px] font-bold flex items-center justify-center gap-1 cursor-pointer transition-colors"
                    >
                      <span>{msg.interactiveCard.actionLabel}</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                )}

                {msg.clause && (
                  <div className="mt-2 pt-2 border-t border-slate-100 text-[10px] text-slate-500 font-mono flex items-center gap-1">
                    <BookOpen className="w-3 h-3 text-[#D97706]" />
                    <span>Statutory Ref: {msg.clause}</span>
                  </div>
                )}
              </div>

              {msg.role === "user" && (
                <div className="w-7 h-7 rounded-full bg-amber-600 text-white flex items-center justify-center shrink-0 mt-0.5 font-bold text-[10px]">
                  PID
                </div>
              )}
            </div>
          ))}

          {isTyping && (
            <div className="flex items-center gap-2 text-slate-500 text-xs italic">
              <RefreshCw className="w-3.5 h-3.5 animate-spin text-[#0B2545]" />
              Querying regulatory knowledge base and active registry state...
            </div>
          )}
        </div>

        {/* Quick query chips */}
        <div className="p-3 bg-white/90 border-t border-[#E2E8F0]">
          <span className="text-[10px] font-bold text-slate-500 block mb-1.5 uppercase tracking-wider">
            Quick Context Queries:
          </span>
          <div className="flex flex-wrap gap-1.5">
            {sampleQuestions.map((q, idx) => (
              <button
                key={idx}
                onClick={() => handleSend(q)}
                className="text-[10px] bg-slate-100 hover:bg-blue-50 hover:text-[#0B2545] hover:border-blue-200 border border-slate-200 px-2 py-1 rounded text-slate-700 transition cursor-pointer text-left font-medium"
              >
                {q}
              </button>
            ))}
          </div>
        </div>

        {/* Input box */}
        <div className="p-3 bg-white border-t border-[#E2E8F0] flex items-center gap-2">
          <input
            type="text"
            placeholder="Ask about 30-day maturities, pending bank verifications, or penalty rules..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            className="flex-1 bg-[#F8FAFC] border border-[#E2E8F0] rounded-md px-3 py-2 text-xs text-[#0F172A] focus:outline-none focus:border-[#0B2545]"
          />
          <button
            onClick={() => handleSend()}
            disabled={!query.trim() || isTyping}
            className="p-2 bg-[#0B2545] hover:bg-[#133E87] disabled:opacity-50 text-white rounded-md transition cursor-pointer"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
