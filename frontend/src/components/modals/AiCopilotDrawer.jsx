import { useState } from "react";
import { X, Send, Bot, User, Sparkles, BookOpen, ExternalLink, RefreshCw } from "lucide-react";

export const AiCopilotDrawer = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      text: "Namaste! I am your AICTE Statutory Regulatory Copilot trained on Approval Process Handbook (APH 2025-26) norms, deposit formulas, and SFMS protocols. Ask me anything regarding FDR lock-in tenures, Table 1.4 concessions, or Phase 5 refund eligibility."
    }
  ]);
  const [query, setQuery] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const sampleQuestions = [
    "What is the statutory lock-in period for Engineering FDRs?",
    "How does the 50% concession for Women institutions work?",
    "When can an institute apply for Phase 5 deposit refund?",
    "What happens if an FDR is not renewed by T-0 days?"
  ];

  const handleSend = async (textToSend) => {
    const q = textToSend || query;
    if (!q.trim()) return;

    const userMsg = { role: "user", text: q };
    setMessages(prev => [...prev, userMsg]);
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
        setMessages(prev => [...prev, {
          role: "assistant",
          text: data.reply,
          clause: data.statutoryClause
        }]);
      } else {
        setMessages(prev => [...prev, {
          role: "assistant",
          text: "I could not resolve the regulatory query. Under APH 2025-26 Regulation 1.4, please consult the Regional Officer for customized interpretations."
        }]);
      }
    } catch (err) {
      setMessages(prev => [...prev, {
        role: "assistant",
        text: "Error connecting to AICTE Legal Knowledge Base. Default rule: Joint FDRs require mandatory tripartite SFMS lien with Member Secretary AICTE."
      }]);
    } finally {
      setIsTyping(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/40 backdrop-blur-xs flex justify-end">
      <div className="w-full max-w-lg bg-white h-full shadow-2xl flex flex-col justify-between border-l border-[#E2E8F0] animate-in slide-in-from-right duration-200">
        
        {/* Header */}
        <div className="p-4 bg-[#0D3B66] text-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center text-amber-400">
              <Bot className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-sm font-bold">AI Regulatory Copilot</h2>
                <span className="text-[9px] bg-amber-400/20 text-amber-300 font-bold px-1.5 py-0.2 rounded border border-amber-400/30">
                  APH 2025-26
                </span>
              </div>
              <p className="text-[10px] text-blue-200">
                Statutory Gazette Assistant &amp; Compliance Guide
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 hover:bg-white/10 rounded-lg text-white transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Chat message stream */}
        <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-slate-50 text-xs">
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`flex gap-2.5 ${msg.role === "user" ? "justify-end" : "justify-start"}`}
            >
              {msg.role === "assistant" && (
                <div className="w-7 h-7 rounded-full bg-[#0D3B66] text-white flex items-center justify-center shrink-0 mt-0.5">
                  <Bot className="w-4 h-4" />
                </div>
              )}

              <div className={`p-3.5 rounded-xl max-w-[85%] leading-relaxed ${
                msg.role === "user" 
                  ? "bg-[#0D3B66] text-white rounded-br-xs shadow-xs" 
                  : "bg-white text-slate-800 rounded-bl-xs border border-[#E2E8F0] shadow-xs"
              }`}>
                <div>{msg.text}</div>
                {msg.clause && (
                  <div className="mt-2 pt-2 border-t border-slate-100 text-[10px] text-[#64748B] font-mono flex items-center gap-1">
                    <BookOpen className="w-3 h-3 text-[#E65100]" />
                    <span>Statutory Ref: {msg.clause}</span>
                  </div>
                )}
              </div>

              {msg.role === "user" && (
                <div className="w-7 h-7 rounded-full bg-amber-500 text-white flex items-center justify-center shrink-0 mt-0.5 font-bold text-[10px]">
                  PID
                </div>
              )}
            </div>
          ))}

          {isTyping && (
            <div className="flex items-center gap-2 text-slate-500 text-xs italic">
              <RefreshCw className="w-3.5 h-3.5 animate-spin text-[#0D3B66]" />
              Analyzing statutory handbook and legal gazette clauses...
            </div>
          )}
        </div>

        {/* Quick query chips */}
        <div className="p-3 bg-white border-t border-[#E2E8F0]">
          <span className="text-[10px] font-bold text-[#64748B] block mb-1.5 uppercase">
            Suggested Statutory Queries:
          </span>
          <div className="flex flex-wrap gap-1.5">
            {sampleQuestions.map((q, idx) => (
              <button
                key={idx}
                onClick={() => handleSend(q)}
                className="text-[10px] bg-slate-100 hover:bg-blue-50 hover:text-[#0D3B66] hover:border-blue-200 border border-slate-200 px-2 py-1 rounded text-slate-700 transition cursor-pointer text-left"
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
            placeholder="Ask about APH clauses, concessions, or refund rules..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            className="flex-1 bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg px-3 py-2 text-xs text-[#0F172A] focus:outline-none focus:border-[#0D3B66]"
          />
          <button
            onClick={() => handleSend()}
            disabled={!query.trim() || isTyping}
            className="p-2 bg-[#0D3B66] hover:bg-[#092c4d] disabled:opacity-50 text-white rounded-lg transition cursor-pointer"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
};
