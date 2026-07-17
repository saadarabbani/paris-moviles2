"use client";

import Link from "next/link";
import { useLang } from "@/lib/i18n";
import RepairServices from "@/components/RepairServices";

type Proc = { t: string; d: string };

export default function RepairsPage() {
  const { t } = useLang();
  const s = t as Record<string, string>;
  const proc = (t as unknown as { proc: Proc[] }).proc;

  return (
    <section className="pm-in pm-wrap" style={{ padding: "48px 40px 64px" }}>
      <div className="pm-kick">{s.rep_kick}</div>
      <hr style={{ height: 1, border: 0, margin: "12px 0 22px", background: "var(--color-divider)" }} />
      <div className="pm-grid-2" style={{ display: "grid", gridTemplateColumns: "minmax(0,1fr) minmax(0,1fr)", gap: 40, alignItems: "end" }}>
        <h1 className="pm-hd" style={{ fontSize: 52, margin: 0 }}>{s.rep_h}</h1>
        <p style={{ fontSize: 16, lineHeight: 1.6, margin: 0, color: "color-mix(in srgb, var(--color-text) 80%, transparent)" }}>{s.rep_sub}</p>
      </div>

      <div style={{ marginTop: 40 }}>
        <RepairServices />
      </div>

      <div className="pm-grid-4" style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 22, marginTop: 48 }}>
        {proc.map((pr, i) => (
          <div key={i}>
            <div className="pm-hd" style={{ fontSize: 34, color: "var(--color-accent)" }}>{"0" + (i + 1)}</div>
            <div className="pm-hd" style={{ fontSize: 16, marginTop: 8 }}>{pr.t}</div>
            <p style={{ fontSize: 13, lineHeight: 1.5, margin: "6px 0 0", color: "color-mix(in srgb, var(--color-text) 70%, transparent)" }}>{pr.d}</p>
          </div>
        ))}
      </div>

      <div style={{ display: "flex", gap: 14, marginTop: 40, flexWrap: "wrap" }}>
        <Link href="/quote" className="btn btn-primary pm-hd" style={{ fontSize: 14, letterSpacing: "0.06em", padding: "14px 26px" }}>{s.get_quote}</Link>
        <Link href="/book" className="btn btn-secondary pm-hd" style={{ fontSize: 14, letterSpacing: "0.06em", padding: "14px 26px" }}>{s.book_now}</Link>
      </div>
    </section>
  );
}
