import { useState, useRef, useEffect, useCallback } from "react";
import { useTranslation } from "src/context/LanguageContext";
import { sendChatMessage } from "src/lib/chat";
import style from "./style.module.css";

interface Message {
  id: number;
  role: "user" | "assistant";
  text: string;
  hasInfo?: boolean;
  confidence?: number;
}

let msgId = 0;

export const ChatWidget = () => {
  const t = useTranslation();
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  // Seed welcome message when first opened
  useEffect(() => {
    if (open && messages.length === 0) {
      setMessages([
        {
          id: ++msgId,
          role: "assistant",
          text: t.chat.welcome,
          hasInfo: true,
          confidence: 1,
        },
      ]);
    }
  }, [open]);

  // Scroll to bottom on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  // Focus input when panel opens
  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [open]);

  // Close on Escape
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const handleSend = useCallback(async () => {
    const text = input.trim();
    if (!text || loading) return;

    setInput("");
    setMessages((prev) => [...prev, { id: ++msgId, role: "user", text }]);
    setLoading(true);

    try {
      const res = await sendChatMessage(text);
      setMessages((prev) => [
        ...prev,
        {
          id: ++msgId,
          role: "assistant",
          text: res.has_info ? res.answer : t.chat.noInfo,
          hasInfo: res.has_info,
          confidence: res.confidence,
        },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          id: ++msgId,
          role: "assistant",
          text: t.chat.error,
          hasInfo: false,
          confidence: 0,
        },
      ]);
    } finally {
      setLoading(false);
    }
  }, [input, loading, t]);

  const onKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const confidenceColor = (c: number) => {
    if (c >= 0.7) return "var(--color-primary)";
    if (c >= 0.4) return "#f59e0b";
    return "#ef4444";
  };

  return (
    <>
      {/* FAB */}
      <button
        className={style.fab}
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? "Close chat" : "Open chat"}
      >
        {open ? (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        ) : (
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M20 2H4a2 2 0 0 0-2 2v18l4-4h14a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2z" />
          </svg>
        )}
      </button>

      {/* Panel */}
      {open && (
        <div className={style.panel} role="dialog" aria-label={t.chat.title}>
          {/* Header */}
          <div className={style.header}>
            <div className={style.statusDot} />
            <div className={style.headerInfo}>
              <span className={style.headerTitle}>{t.chat.title}</span>
              <span className={style.headerSubtitle}>{t.chat.subtitle}</span>
            </div>
            <button
              className={style.closeBtn}
              onClick={() => setOpen(false)}
              aria-label="Close"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>

          {/* Messages */}
          <div className={style.messages}>
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`${style.bubble} ${
                  msg.role === "user"
                    ? style.bubbleUser
                    : msg.hasInfo === false
                    ? `${style.bubbleAssistant} ${style.bubbleNoInfo}`
                    : style.bubbleAssistant
                }`}
              >
                <div className={style.bubbleText}>{msg.text}</div>
                {msg.role === "assistant" && typeof msg.confidence === "number" && msg.confidence > 0 && (
                  <div className={style.confidenceBar}>
                    <span className={style.confidenceLabel}>
                      {t.chat.confidence}
                    </span>
                    <div className={style.confidenceTrack}>
                      <div
                        className={style.confidenceFill}
                        style={{
                          width: `${Math.round(msg.confidence * 100)}%`,
                          backgroundColor: confidenceColor(msg.confidence),
                        }}
                      />
                    </div>
                    <span className={style.confidenceLabel}>
                      {Math.round(msg.confidence * 100)}%
                    </span>
                  </div>
                )}
              </div>
            ))}

            {loading && (
              <div className={style.typing}>
                <div className={style.typingDot} />
                <div className={style.typingDot} />
                <div className={style.typingDot} />
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className={style.inputArea}>
            <textarea
              ref={inputRef}
              className={style.input}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={onKeyDown}
              placeholder={t.chat.placeholder}
              rows={1}
              disabled={loading}
            />
            <button
              className={style.sendBtn}
              onClick={handleSend}
              disabled={!input.trim() || loading}
              aria-label={t.chat.send}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <line x1="22" y1="2" x2="11" y2="13" />
                <polygon points="22 2 15 22 11 13 2 9 22 2" />
              </svg>
            </button>
          </div>
        </div>
      )}
    </>
  );
};
