import { useState, useRef, useEffect } from "react";
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
  FileText,
  Trash2,
  Copy,
  Check
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
      text: "Namaste! I am your **AICTE Statutory Regulatory Copilot & Intelligence Engine**, trained on the Approval Process Handbook (APH 2025-26), Core Banking SFMS protocols, and the active national repository of 1,350 statutory deposit records.\n\nAsk me anything regarding live deposit statistics, Table 1.4 calculations, 8-year lock-in tenures, Affidavit-6 notarization, or Phase-5 refund eligibility.",
      suggestedQuestions: [
        "How many institutes are registered?",
        "How much total money is in custody?",
        "Which instruments mature in the next 30 days?",
        "What is an FDR in AICTE?",
        "What are the deposit amounts under Table 1.4?"
      ]
    }
  ]);
  const [query, setQuery] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [copiedIndex, setCopiedIndex] = useState(null);
  const messagesEndRef = useRef(null);

  const sampleQuestions = [
    "How many institutes are registered?",
    "How much total money is in custody?",
    "Which instruments mature in the next 30 days?",
    "Show cases with pending bank verification",
    "Show flagged discrepancy cases",
    "What is an FDR and why is it mandatory?",
    "What are the deposit amounts under Table 1.4?",
    "How does the 50% concession for Women institutions work?",
    "What is Joint Lien and why is it required?",
    "How does Phase-5 statutory release work?"
  ];

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isOpen]);

  const handleCopy = (text, idx) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(idx);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const handleClearChat = () => {
    setMessages([
      {
        role: "assistant",
        text: "Chat cleared. I am ready to answer your questions regarding AICTE Approval Process Handbook (APH 2025-26) norms, live repository statistics, and banking compliance.",
        suggestedQuestions: [
          "How many institutes are registered?",
          "How much total money is in custody?",
          "What are the deposit amounts under Table 1.4?"
        ]
      }
    ]);
  };

  const handleSend = async (textToSend) => {
    const q = textToSend || query;
    if (!q.trim()) return;

    const userMsg = { role: "user", text: q };
    setMessages((prev) => [...prev, userMsg]);
    setQuery("");
    setIsTyping(true);

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
            text: data.reply || data.answer,
            clause: data.statutoryClause,
            interactiveCard: data.interactiveCard,
            sources: data.sources,
            suggestedQuestions: data.suggestedQuestions
          }
        ]);
      } else {
        throw new Error(data.error || "Query failed");
      }
    } catch (err) {
      console.warn("Copilot fetch fallback:", err.message);
      // Offline fallback
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          text: `Under AICTE Approval Process Handbook (APH 2025-26 Section 1.4), all technical institutions must maintain statutory security deposits pledged in unconditional joint lien with Member Secretary, AICTE New Delhi.\n\nThe national portal currently tracks 1,350 registered instruments totaling ₹331.40 Cr in custody across 8 scheduled commercial banks.`,
          clause: "APH 2025-26 Section 1.4 & Table 1.4"
        }
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  // Helper to format simple markdown-like text
  const renderFormattedText = (text) => {
    if (!text) return null;

    // Split paragraphs
    const paragraphs = text.split("\n\n");

    return paragraphs.map((para, pIdx) => {
      // Check if table
      if (para.includes("|") && para.includes("---")) {
        const rows = para.trim().split("\n").filter(r => r.trim().startsWith("|"));
        if (rows.length >= 2) {
          const headerCols = rows[0].split("|").filter((_, i, arr) => i > 0 && i < arr.length - 1).map(c => c.trim());
          const bodyRows = rows.slice(2).map(r => r.split("|").filter((_, i, arr) => i > 0 && i < arr.length - 1).map(c => c.trim()));

          return (
            <div key={pIdx} className="overflow-x-auto my-2 rounded border border-slate-200">
              <table className="w-full text-[11px] text-left">
                <thead className="bg-slate-100 text-slate-700 font-bold border-b border-slate-200">
                  <tr>
                    {headerCols.map((col, cIdx) => (
                      <th key={cIdx} className="p-1.5">{col.replace(/\*\*/g, "")}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {bodyRows.map((row, rIdx) => (
                    <tr key={rIdx} className={rIdx % 2 === 0 ? "bg-white" : "bg-slate-50"}>
                      {row.map((cell, cIdx) => (
                        <td key={cIdx} className="p-1.5">{cell.replace(/\*\*/g, "")}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          );
        }
      }

      // Check if bullet list
      if (para.includes("• ") || para.includes("- ") || para.includes("1. ")) {
        const lines = para.split("\n");
        return (
          <div key={pIdx} className="space-y-1 my-1.5">
            {lines.map((line, lIdx) => {
              const isBullet = line.trim().startsWith("• ") || line.trim().startsWith("- ") || /^\d+\.\s/.test(line.trim());
              return (
                <div key={lIdx} className={isBullet ? "pl-2 flex gap-1.5 leading-relaxed" : "leading-relaxed"}>
                  {formatInlineText(line)}
                </div>
              );
            })}
          </div>
        );
      }

      return (
        <p key={pIdx} className="my-1.5 leading-relaxed">
          {formatInlineText(para)}
        </p>
      );
    });
  };

  const formatInlineText = (line) => {
    // Bold matching
    const parts = line.split(/(\*\*.*?\*\*|`.*?`)/g);
    return parts.map((part, idx) => {
      if (part.startsWith("**") && part.endsWith("**")) {
        return <strong key={idx} className="font-semibold text-slate-900">{part.slice(2, -2)}</strong>;
      }
      if (part.startsWith("`") && part.endsWith("`")) {
        return (
          <code key={idx} className="font-mono text-[10.5px] bg-slate-100 text-[#0B2545] px-1 py-0.5 rounded border border-slate-200">
            {part.slice(1, -1)}
          </code>
        );
      }
      return part;
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-slate-900/40 backdrop-blur-xs flex justify-end">
      <div className="w-full max-w-xl bg-white h-full shadow-2xl flex flex-col border-l border-[#E2E8F0] animate-in slide-in-from-right duration-200">
        {/* Header */}
        <div className="flex items-center justify-between p-4 bg-[#0B2545] text-white">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center text-amber-400 border border-white/10">
              <Bot className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-sm font-bold">AI Regulatory Copilot</h2>
                <span className="text-[10px] bg-amber-400/20 text-amber-300 font-bold px-1.5 py-0.5 rounded border border-amber-400/30 font-mono">
                  APH 2025-26
                </span>
                <span className="text-[9px] bg-emerald-500/20 text-emerald-300 font-bold px-1.5 py-0.5 rounded border border-emerald-500/30">
                  1,350 Live FDRs
                </span>
              </div>
              <p className="text-[10px] text-blue-200">
                Context-Aware Gazette Assistant &amp; Compliance Data Engine
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1">
            <button
              onClick={handleClearChat}
              title="Clear conversation"
              className="p-1.5 hover:bg-white/10 rounded-md text-white/80 hover:text-white transition cursor-pointer"
            >
              <Trash2 className="w-4 h-4" />
            </button>
            <button
              onClick={onClose}
              className="p-1.5 hover:bg-white/10 rounded-md text-white transition cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Chat message stream */}
        <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-slate-50/70 text-xs">
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`flex gap-2.5 ${msg.role === "user" ? "justify-end" : "justify-start"}`}
            >
              {msg.role === "assistant" && (
                <div className="w-7 h-7 rounded-full bg-[#0B2545] text-white flex items-center justify-center shrink-0 mt-0.5 shadow-xs">
                  <Bot className="w-4 h-4 text-amber-400" />
                </div>
              )}

              <div
                className={`p-3.5 rounded-lg max-w-[88%] leading-relaxed ${
                  msg.role === "user"
                    ? "bg-[#0B2545] text-white rounded-br-xs shadow-xs"
                    : "bg-white text-slate-800 rounded-bl-xs border border-[#E2E8F0] shadow-xs"
                }`}
              >
                {/* Message Text with rich formatting */}
                <div className="text-[12px]">{renderFormattedText(msg.text)}</div>

                {/* Rich Contextual Card Response with Direct Navigation Link */}
                {msg.interactiveCard && (
                  <div className="mt-3 p-3 rounded-md border border-slate-200 bg-[#F8FAFC] space-y-1.5 font-sans shadow-xs">
                    <div className="flex items-center justify-between">
                      <span className="font-mono font-bold text-[#0B2545] text-[11px]">
                        {msg.interactiveCard.ref}
                      </span>
                      <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                        msg.interactiveCard.severity === 'error'
                          ? 'bg-rose-100 text-rose-800'
                          : msg.interactiveCard.severity === 'warning'
                          ? 'bg-amber-100 text-amber-800'
                          : 'bg-emerald-100 text-emerald-800'
                      }`}>
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
                      className="w-full mt-2 py-1.5 px-2 bg-[#0B2545] hover:bg-[#133E87] text-white rounded text-[11px] font-bold flex items-center justify-center gap-1 cursor-pointer transition-colors shadow-xs"
                    >
                      <span>{msg.interactiveCard.actionLabel}</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                )}

                {/* Statutory Reference Badge */}
                {msg.clause && (
                  <div className="mt-2.5 pt-2 border-t border-slate-100 text-[10px] text-slate-500 font-mono flex items-center gap-1">
                    <BookOpen className="w-3 h-3 text-[#D97706] shrink-0" />
                    <span>Statutory Ref: {msg.clause}</span>
                  </div>
                )}

                {/* Sources & Copy button */}
                {msg.role === "assistant" && (
                  <div className="mt-2 pt-1.5 flex items-center justify-between text-[10px] text-slate-400">
                    <div className="flex items-center gap-1">
                      {msg.sources && msg.sources.length > 0 && (
                        <span>Source: {msg.sources[0]}</span>
                      )}
                    </div>
                    <button
                      onClick={() => handleCopy(msg.text, i)}
                      className="p-1 hover:text-slate-600 hover:bg-slate-100 rounded flex items-center gap-1 transition"
                      title="Copy response"
                    >
                      {copiedIndex === i ? (
                        <>
                          <Check className="w-3 h-3 text-emerald-600" />
                          <span className="text-[9px] text-emerald-600">Copied</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3" />
                          <span className="text-[9px]">Copy</span>
                        </>
                      )}
                    </button>
                  </div>
                )}

                {/* Clickable Suggested Follow-up Questions */}
                {msg.suggestedQuestions && msg.suggestedQuestions.length > 0 && (
                  <div className="mt-3 pt-2 border-t border-slate-100">
                    <span className="text-[10px] font-bold text-slate-500 block mb-1.5">
                      Suggested Follow-ups:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {msg.suggestedQuestions.map((sq, sqIdx) => (
                        <button
                          key={sqIdx}
                          onClick={() => handleSend(sq)}
                          className="text-[10.5px] bg-slate-50 hover:bg-blue-50 hover:text-[#0B2545] hover:border-blue-300 border border-slate-200 px-2 py-1 rounded-md text-slate-700 transition cursor-pointer text-left font-medium"
                        >
                          → {sq}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {msg.role === "user" && (
                <div className="w-7 h-7 rounded-full bg-amber-600 text-white flex items-center justify-center shrink-0 mt-0.5 font-bold text-[10px] shadow-xs">
                  PID
                </div>
              )}
            </div>
          ))}

          {isTyping && (
            <div className="flex items-center gap-2 text-slate-500 text-xs italic bg-white p-3 rounded-lg border border-slate-200 w-fit">
              <RefreshCw className="w-3.5 h-3.5 animate-spin text-[#0B2545]" />
              Querying regulatory knowledge base and active registry state (1,350 FDRs)...
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Quick query chips */}
        <div className="p-3 bg-white/95 border-t border-[#E2E8F0]">
          <span className="text-[10px] font-bold text-slate-500 block mb-1.5 uppercase tracking-wider flex items-center justify-between">
            <span>Quick Regulatory Queries:</span>
            <span className="text-[9px] text-slate-400 font-normal">Click to ask</span>
          </span>
          <div className="flex flex-wrap gap-1.5 max-h-24 overflow-y-auto pr-1">
            {sampleQuestions.map((q, idx) => (
              <button
                key={idx}
                onClick={() => handleSend(q)}
                className="text-[10px] bg-slate-100 hover:bg-blue-50 hover:text-[#0B2545] hover:border-blue-200 border border-slate-200 px-2.5 py-1 rounded-md text-slate-700 transition cursor-pointer text-left font-medium"
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
            placeholder="Ask anything: 1,350 FDR stats, Table 1.4, lock-in, maturing in 30 days..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && !isTyping && handleSend()}
            disabled={isTyping}
            className="flex-1 bg-[#F8FAFC] border border-[#E2E8F0] rounded-md px-3.5 py-2 text-xs text-[#0F172A] focus:outline-none focus:ring-1 focus:ring-[#0B2545] focus:border-[#0B2545] placeholder-slate-400"
          />
          <button
            onClick={() => handleSend()}
            disabled={!query.trim() || isTyping}
            className="p-2 bg-[#0B2545] hover:bg-[#133E87] disabled:opacity-50 text-white rounded-md transition cursor-pointer shadow-xs"
            title="Send query"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
