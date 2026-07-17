"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Sparkles, X, Send } from "lucide-react";
import { useLang } from "@/lib/i18n";
import { useStore } from "@/lib/store";
import { matchFaq, suggestions, answerText, type FaqAnswer } from "@/lib/faq";

type Msg = { role: "bot" | "user"; text: string; link?: { href: string; label: string } };

export default function ChatBot() {
  const { lang } = useLang();
  const { prices } = useStore();

  const ui =
    lang === "en"
      ? {
          launcher: "Ask us",
          title: "Paris Móviles Assistant",
          status: "Typically replies instantly",
          placeholder: "Ask about repairs, prices, hours…",
          greeting:
            "Hi! 👋 I'm the Paris Móviles assistant. Ask me about repair prices, timings, warranty, tracking, hours or the shop — or tap a question below.",
          fallback:
            "I'm not sure about that one. Try asking about repair prices, timings, warranty, tracking or opening hours — or reach a human on the Contact page.",
          contactLabel: "Contact us",
        }
      : {
          launcher: "Pregúntanos",
          title: "Asistente Paris Móviles",
          status: "Suele responder al instante",
          placeholder: "Pregunta por reparaciones, precios, horario…",
          greeting:
            "¡Hola! 👋 Soy el asistente de Paris Móviles. Pregúntame por precios de reparación, tiempos, garantía, seguimiento, horario o la tienda — o toca una pregunta abajo.",
          fallback:
            "No estoy seguro de eso. Prueba a preguntar por precios de reparación, tiempos, garantía, seguimiento u horario — o habla con una persona en la página de Contacto.",
          contactLabel: "Contáctanos",
        };

  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Msg[]>([]);
  const bodyRef = useRef<HTMLDivElement>(null);

  // Seed the greeting the first time the panel opens (and re-seed if language changes while empty).
  useEffect(() => {
    if (open && messages.length === 0) {
      setMessages([{ role: "bot", text: ui.greeting }]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  useEffect(() => {
    bodyRef.current?.scrollTo({ top: bodyRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, open]);

  const toLink = (a: FaqAnswer) =>
    a.link ? { href: a.link.href, label: lang === "en" ? a.link.en : a.link.es } : undefined;

  const answer = (text: string) => {
    const entry = matchFaq(text);
    if (!entry) {
      return {
        role: "bot" as const,
        text: ui.fallback,
        link: { href: "/contact", label: ui.contactLabel },
      };
    }
    const a = entry.a(prices);
    return { role: "bot" as const, text: answerText(a, lang), link: toLink(a) };
  };

  const send = (text: string) => {
    const q = text.trim();
    if (!q) return;
    setMessages((m) => [...m, { role: "user", text: q }, answer(q)]);
    setInput("");
  };

  const chips = suggestions();

  return (
    <>
      {!open ? (
        <button type="button" className="pm-chat-launcher" onClick={() => setOpen(true)} aria-label={ui.launcher}>
          <Sparkles size={18} strokeWidth={1.8} />
          {ui.launcher}
        </button>
      ) : (
        <div className="pm-chat-panel" role="dialog" aria-label={ui.title}>
          <div className="pm-chat-head">
            <span className="pm-chat-head__avatar">
              <Sparkles size={19} strokeWidth={1.8} />
            </span>
            <div>
              <div className="pm-chat-head__title">{ui.title}</div>
              <div className="pm-chat-head__status">
                <span className="pm-chat-head__dot" />
                {ui.status}
              </div>
            </div>
            <button type="button" className="pm-chat-head__close" onClick={() => setOpen(false)} aria-label="Close">
              <X size={20} strokeWidth={1.8} />
            </button>
          </div>

          <div className="pm-chat-body" ref={bodyRef}>
            {messages.map((m, i) => (
              <div key={i} className={`pm-chat-msg ${m.role}`}>
                {m.text}
                {m.link ? (
                  <Link href={m.link.href} className="pm-chat-link" onClick={() => setOpen(false)}>
                    {m.link.label} →
                  </Link>
                ) : null}
              </div>
            ))}
          </div>

          <div className="pm-chat-chips">
            {chips.map((c) => (
              <button key={c.id} type="button" className="pm-chat-chip" onClick={() => send(lang === "en" ? c.q!.en : c.q!.es)}>
                {lang === "en" ? c.q!.en : c.q!.es}
              </button>
            ))}
          </div>

          <form
            className="pm-chat-foot"
            onSubmit={(e) => {
              e.preventDefault();
              send(input);
            }}
          >
            <input
              className="input"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={ui.placeholder}
              aria-label={ui.placeholder}
            />
            <button type="submit" className="pm-chat-send" aria-label="Send">
              <Send size={17} strokeWidth={1.9} />
            </button>
          </form>
        </div>
      )}
    </>
  );
}
