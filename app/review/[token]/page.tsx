"use client";

import { useState } from "react";
import Link from "next/link";
import { useLang } from "@/lib/i18n";
import { useStore } from "@/lib/store";
import Corners from "@/components/Corners";

export default function ReviewPage() {
  const { t } = useLang();
  const { addReview } = useStore();
  const s = t as Record<string, string>;

  const [author, setAuthor] = useState("");
  const [rating, setRating] = useState(5);
  const [text, setText] = useState("");
  const [done, setDone] = useState(false);

  const submit = () => {
    if (!text.trim()) return;
    addReview(author, text.trim());
    setDone(true);
    window.scrollTo(0, 0);
  };

  if (done) {
    return (
      <section className="pm-in" style={{ maxWidth: 640, margin: "0 auto", padding: "80px 40px", textAlign: "center" }}>
        <div className="pm-frame" style={{ padding: 52 }}>
          <Corners />
          <div className="pm-kick">{s.review_kick}</div>
          <h1 className="pm-hd" style={{ fontSize: 36, margin: "14px 0 12px" }}>{s.r_thanks_h}</h1>
          <p style={{ color: "color-mix(in srgb, var(--color-text) 70%, transparent)", margin: "0 auto 24px", maxWidth: "42ch" }}>{s.r_thanks_sub}</p>
          <Link href="/" className="btn btn-secondary pm-hd" style={{ fontSize: 14, letterSpacing: "0.06em", padding: "13px 26px" }}>{s.keep_shopping}</Link>
        </div>
      </section>
    );
  }

  return (
    <section className="pm-in" style={{ maxWidth: 640, margin: "0 auto", padding: "48px 40px 64px" }}>
      <div className="pm-kick">{s.review_kick}</div>
      <hr style={{ height: 1, border: 0, margin: "12px 0 22px", background: "var(--color-divider)" }} />
      <h1 className="pm-hd" style={{ fontSize: 44, margin: "0 0 8px" }}>{s.review_h}</h1>
      <p style={{ color: "color-mix(in srgb, var(--color-text) 65%, transparent)", margin: "0 0 28px" }}>{s.review_sub}</p>

      <div className="pm-frame" style={{ padding: 32 }}>
        <Corners />
        <div className="field" style={{ marginBottom: 16 }}>
          <label>{s.r_author}</label>
          <input className="input" value={author} onChange={(e) => setAuthor(e.target.value)} />
        </div>
        <div className="field" style={{ marginBottom: 16 }}>
          <label>{s.r_rating}</label>
          <div style={{ display: "flex", gap: 6, fontSize: 26, cursor: "pointer", color: "var(--color-accent)" }}>
            {[1, 2, 3, 4, 5].map((n) => (
              <span
                key={n}
                role="button"
                aria-label={`${n} star`}
                onClick={() => setRating(n)}
                style={{ opacity: n <= rating ? 1 : 0.3 }}
              >
                ★
              </span>
            ))}
          </div>
        </div>
        <div className="field">
          <label>{s.r_text}</label>
          <textarea className="input" value={text} onChange={(e) => setText(e.target.value)} />
        </div>
      </div>

      <button type="button" onClick={submit} className="btn btn-primary btn-block pm-hd" style={{ fontSize: 15, letterSpacing: "0.06em", padding: 16, marginTop: 20 }}>
        {s.r_submit}
      </button>
    </section>
  );
}
