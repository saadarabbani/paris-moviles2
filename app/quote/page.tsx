"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useLang } from "@/lib/i18n";
import { useStore } from "@/lib/store";
import Corners from "@/components/Corners";
import { BRANDS, ISSUE_KEYS, MODELS, money, type IssueKey } from "@/lib/data";

export default function QuotePage() {
  const router = useRouter();
  const { t } = useLang();
  const { prices } = useStore();
  const s = t as Record<string, string>;
  const issues = (t as unknown as { issues: Record<string, string> }).issues;

  const [brand, setBrand] = useState("");
  const [model, setModel] = useState("");
  const [issue, setIssue] = useState<IssueKey | "">("");

  const models = brand ? MODELS[brand] ?? [] : [];
  const hasQuote = !!(brand && issue);

  const bookThis = () => {
    const q = new URLSearchParams();
    if (brand) q.set("brand", brand);
    if (issue) q.set("issue", issue);
    router.push(`/book?${q.toString()}`);
  };

  return (
    <section className="pm-in" style={{ maxWidth: 760, margin: "0 auto", padding: "48px 40px 64px" }}>
      <div className="pm-kick">{s.quote_kick}</div>
      <hr style={{ height: 1, border: 0, margin: "12px 0 22px", background: "var(--color-divider)" }} />
      <h1 className="pm-hd" style={{ fontSize: 44, margin: "0 0 8px" }}>{s.quote_h}</h1>
      <p style={{ color: "color-mix(in srgb, var(--color-text) 65%, transparent)", margin: "0 0 28px" }}>{s.quote_sub}</p>

      <div className="pm-frame" style={{ padding: 32 }}>
        <Corners />
        <div className="field" style={{ marginBottom: 16 }}>
          <label>{s.q_brand}</label>
          <select className="input" value={brand} onChange={(e) => { setBrand(e.target.value); setModel(""); }}>
            <option value="">—</option>
            {BRANDS.map((b) => (
              <option key={b} value={b}>{b}</option>
            ))}
          </select>
        </div>
        <div className="field" style={{ marginBottom: 16 }}>
          <label>{s.q_model}</label>
          <select className="input" value={model} onChange={(e) => setModel(e.target.value)}>
            <option value="">—</option>
            {models.map((m) => (
              <option key={m} value={m}>{m}</option>
            ))}
          </select>
        </div>
        <div className="field">
          <label>{s.q_issue}</label>
          <select className="input" value={issue} onChange={(e) => setIssue(e.target.value as IssueKey | "")}>
            <option value="">—</option>
            {ISSUE_KEYS.map((k) => (
              <option key={k} value={k}>{issues[k]}</option>
            ))}
          </select>
        </div>

        {hasQuote ? (
          <div style={{ marginTop: 24, paddingTop: 22, borderTop: "1px solid var(--color-divider)", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
            <div>
              <div style={{ fontSize: 12, letterSpacing: "0.08em", textTransform: "uppercase", color: "color-mix(in srgb, var(--color-text) 55%, transparent)" }}>{s.q_estimate}</div>
              <div className="pm-hd" style={{ fontSize: 34, color: "var(--color-accent-700)" }}>{money(prices[issue as IssueKey])}</div>
            </div>
            <button type="button" onClick={bookThis} className="btn btn-primary pm-hd" style={{ fontSize: 14, letterSpacing: "0.06em", padding: "13px 24px" }}>
              {s.book_this} →
            </button>
          </div>
        ) : null}
      </div>
    </section>
  );
}
