import { useEffect, useRef, useState } from "react";
import ReactMarkdown, { type Components } from "react-markdown";
import { checkHealth, createChatSession, streamChatMessage } from "../lib/api";
import { profile } from "../data/profile";

type Message = { role: "user" | "assistant"; content: string };

const USERNAME_KEY = "portfolio_chat_username";
const MAX_ATTEMPTS = 3;

const markdownComponents: Components = {
  p: ({ children }) => <p className="mb-2 last:mb-0">{children}</p>,
  ul: ({ children }) => <ul className="mb-2 list-disc space-y-1 pl-4 last:mb-0">{children}</ul>,
  ol: ({ children }) => <ol className="mb-2 list-decimal space-y-1 pl-4 last:mb-0">{children}</ol>,
  li: ({ children }) => <li>{children}</li>,
  a: ({ children, href }) => (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="underline transition hover:text-accent"
    >
      {children}
    </a>
  ),
  strong: ({ children }) => <strong className="font-semibold">{children}</strong>,
  em: ({ children }) => <em className="italic">{children}</em>,
  code: ({ children }) => (
    <code className="rounded bg-ink/10 px-1 py-0.5 font-mono text-xs">{children}</code>
  ),
  pre: ({ children }) => (
    <pre className="mb-2 overflow-x-auto rounded-lg bg-ink/10 p-2 font-mono text-xs last:mb-0">
      {children}
    </pre>
  ),
};

export default function Chat() {
  const [open, setOpen] = useState(false);
  const [usernameInput, setUsernameInput] = useState("");
  const [userId, setUserId] = useState<string | null>(null);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [verifying, setVerifying] = useState(false);
  const [usernameError, setUsernameError] = useState<string | null>(null);
  const [attempts, setAttempts] = useState(0);
  const [locked, setLocked] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isStreaming, setIsStreaming] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const triedStoredUsername = useRef(false);

  async function attemptSession(name: string) {
    setVerifying(true);
    setUsernameError(null);

    const result = await createChatSession(name).catch(() => null);

    if (!result) {
      setUsernameError("Couldn't reach the chat backend.");
      setVerifying(false);
      return;
    }

    if (result.ok) {
      setUserId(name);
      setSessionId(result.sessionId);
      localStorage.setItem(USERNAME_KEY, name);
      setVerifying(false);
      return;
    }

    if (result.reason === "not_found") {
      const nextAttempts = attempts + 1;
      setAttempts(nextAttempts);
      localStorage.removeItem(USERNAME_KEY);
      if (nextAttempts >= MAX_ATTEMPTS) {
        setLocked(true);
        setUsernameError("Too many failed attempts. Please try again later.");
      } else {
        const remaining = MAX_ATTEMPTS - nextAttempts;
        setUsernameError(
          `Username not found. ${remaining} attempt${remaining === 1 ? "" : "s"} remaining.`,
        );
      }
    } else {
      setUsernameError(result.reason || "An error occurred. Please try again.");
    }
    setVerifying(false);
  }

  useEffect(() => {
    if (!open || sessionId || triedStoredUsername.current) return;
    triedStoredUsername.current = true;
    const stored = localStorage.getItem(USERNAME_KEY);
    if (stored) attemptSession(stored);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, sessionId]);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, isStreaming]);

  useEffect(() => {
    checkHealth();
  }, []);

  function submitUsername(e: React.FormEvent) {
    e.preventDefault();
    const name = usernameInput.trim();
    if (!name || locked || verifying) return;
    attemptSession(name);
  }

  async function sendMessage() {
    const content = input.trim();
    if (!content || !sessionId || !userId || isStreaming) return;

    setMessages((prev) => [...prev, { role: "user", content }]);
    setInput("");
    setIsStreaming(true);
    setError(null);

    try {
      let assistantText = "";
      setMessages((prev) => [...prev, { role: "assistant", content: "" }]);

      for await (const event of streamChatMessage(sessionId, userId, content)) {
        if ("delta" in event) {
          assistantText += event.delta;
          setMessages((prev) => {
            const next = [...prev];
            next[next.length - 1] = { role: "assistant", content: assistantText };
            return next;
          });
        } else if ("error" in event) {
          if (event.error === "rate_limited") {
            setError("The AI assistant is getting a lot of use right now. Please try again in a minute.");
          } else if (event.error === "stream_interrupted") {
            setError("The response was interrupted. Please try again.");
          } else {
            setError("Something went wrong. Please try again.");
          }
        }
      }
    } catch (e) {
      setError(
        e instanceof Error && e.message
          ? e.message
          : "Something went wrong sending that message. Please try again.",
      );
    } finally {
      setIsStreaming(false);
    }
  }

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {open && (
        <div className="mb-4 flex h-[34rem] w-96 flex-col overflow-hidden rounded-2xl border border-ink/10 bg-paper shadow-xl sm:w-[26rem]">
          <div className="flex items-center justify-between border-b border-ink/10 px-4 py-3">
            <div>
              <p className="text-sm font-semibold">Ask about {profile.name.split(" ")[0]}</p>
              <p className="text-xs text-ink/40">AI assistant, grounded in his real experience</p>
            </div>
            <button
              onClick={() => setOpen(false)}
              className="text-ink/40 transition-colors hover:text-ink"
              aria-label="Close chat"
            >
              ✕
            </button>
          </div>

          {!sessionId ? (
            <div className="flex flex-1 flex-col items-center justify-center gap-3 px-6 text-center">
              <p className="text-sm text-ink/60">
                This chat function is for Recruiters and Hiring Managers.
                To chat enter the Company Name and Date I applied to your company.
              </p>
              <p className="text-sm text-ink/60">
                Example: Aecon October 2023 = "Aecon1023".
              </p>
              <form onSubmit={submitUsername} className="flex w-full flex-col gap-2">
                <input
                  value={usernameInput}
                  onChange={(e) => setUsernameInput(e.target.value)}
                  placeholder="Username"
                  disabled={locked || verifying}
                  autoFocus
                  className="w-full rounded-full border border-ink/15 bg-surface px-4 py-2 text-center text-sm outline-none focus:border-accent disabled:opacity-50"
                />
                <button
                  type="submit"
                  disabled={locked || verifying || !usernameInput.trim()}
                  className="w-full rounded-full bg-ink px-4 py-2 text-sm font-medium text-paper transition-opacity disabled:opacity-40"
                >
                  {verifying ? "Checking…" : "Start chat"}
                </button>
              </form>
              {usernameError && <p className="text-xs text-red-500">{usernameError}</p>}
            </div>
          ) : (
            <>
              <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto px-4 py-3">
                {messages.length === 0 && (
                  <p className="text-sm text-ink/40">
                    Try asking: "What did you build at Aecon?" or "Tell me about MEDAI."
                  </p>
                )}
                {messages.map((message, i) => (
                  <div
                    key={i}
                    className={`max-w-[85%] rounded-2xl px-3 py-2 text-sm leading-relaxed ${
                      message.role === "user"
                        ? "ml-auto bg-ink text-paper"
                        : "bg-accent-soft text-ink/80"
                    }`}
                  >
                    {message.role === "assistant" ? (
                      message.content ? (
                        <ReactMarkdown components={markdownComponents}>
                          {message.content}
                        </ReactMarkdown>
                      ) : isStreaming && i === messages.length - 1 ? (
                        "…"
                      ) : (
                        ""
                      )
                    ) : (
                      message.content
                    )}
                  </div>
                ))}
                {error && <p className="text-xs text-red-500">{error}</p>}
              </div>

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  sendMessage();
                }}
                className="flex items-center gap-2 border-t border-ink/10 p-3"
              >
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Type a message…"
                  disabled={isStreaming}
                  maxLength={250}
                  className="flex-1 rounded-full border border-ink/15 bg-surface px-4 py-2 text-sm outline-none focus:border-accent disabled:opacity-50"
                />
                <button
                  type="submit"
                  disabled={isStreaming || !input.trim()}
                  className="rounded-full bg-ink px-4 py-2 text-sm font-medium text-paper transition-opacity disabled:opacity-40"
                >
                  Send
                </button>
              </form>
            </>
          )}
        </div>
      )}

      <button
        onClick={() => setOpen((v) => !v)}
        className="rounded-full bg-ink px-5 py-3 text-sm font-medium text-paper shadow-lg transition-opacity hover:opacity-90"
      >
        {open ? "Close" : "Chat with my AI"}
      </button>
    </div>
  );
}
