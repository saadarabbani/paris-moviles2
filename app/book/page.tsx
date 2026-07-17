"use client";

import { Suspense, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useLang } from "@/lib/i18n";
import { useStore } from "@/lib/store";
import Corners from "@/components/Corners";
import { BRANDS, ISSUE_KEYS, type IssueKey } from "@/lib/data";

function BookInner() {
  const params = useSearchParams();
  const { t } = useLang();
  const { bookRepair } = useStore();
  const s = t as Record<string, string>;
  const issues = (t as unknown as { issues: Record<string, string> }).issues;

  const prefillBrand = params.get("brand") ?? "";
  const prefillIssue = (params.get("issue") as IssueKey | null) ?? "";

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [brand, setBrand] = useState(prefillBrand);
  const [issue, setIssue] = useState<IssueKey | "">(prefillIssue);
  const [notes, setNotes] = useState("");
  const [ticket, setTicket] = useState<string | null>(null);

  const submit = () => {
    const num = bookRepair(brand, (issue || "screen") as IssueKey);
    setTicket(num);
    window.scrollTo(0, 0);
  };

  if (ticket) {
    return (
      <section className="pm-in" style={{ maxWidth: 640, margin: "0 auto", padding: "80px 40px", textAlign: "center" }}>
        <div className="pm-frame" style={{ padding: 52 }}>
          <Corners />
          <div className="pm-kick">{s.ticket_kick}</div>
          <h1 className="pm-hd" style={{ fontSize: 36, margin: "14px 0 0" }}>{s.ticket_h}</h1>
          <div className="pm-hd" style={{ fontSize: 44, margin: "24px 0", color: "var(--color-accent-700)" }}>{ticket}</div>
          <p style={{ color: "color-mix(in srgb, var(--color-text) 70%, transparent)", margin: "0 auto", maxWidth: "42ch" }}>{s.ticket_sub}</p>
          <Link href={`/track?ticket=${ticket}`} className="btn btn-secondary pm-hd" style={{ fontSize: 14, letterSpacing: "0.06em", padding: "13px 26px", marginTop: 28 }}>
            {s.nav_track} →
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="pm-in" style={{ maxWidth: 760, margin: "0 auto", padding: "48px 40px 64px" }}>
      <div className="pm-kick">{s.book_kick}</div>
      <hr style={{ height: 1, border: 0, margin: "12px 0 22px", background: "var(--color-divider)" }} />
      <h1 className="pm-hd" style={{ fontSize: 44, margin: "0 0 24px" }}>{s.book_h}</h1>

      <div className="pm-frame" style={{ padding: 32 }}>
        <Corners />
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 18 }}>
          <div className="field"><label>{s.f_name}</label><input className="input" value={name} onChange={(e) => setName(e.target.value)} /></div>
          <div className="field"><label>{s.f_phone}</label><input className="input" value={phone} onChange={(e) => setPhone(e.target.value)} /></div>
          <div className="field">
            <label>{s.q_brand}</label>
            <select className="input" value={brand} onChange={(e) => setBrand(e.target.value)}>
              <option value="">—</option>
              {BRANDS.map((b) => (<option key={b} value={b}>{b}</option>))}
            </select>
          </div>
          <div className="field">
            <label>{s.q_issue}</label>
            <select className="input" value={issue} onChange={(e) => setIssue(e.target.value as IssueKey | "")}>
              <option value="">—</option>
              {ISSUE_KEYS.map((k) => (<option key={k} value={k}>{issues[k]}</option>))}
            </select>
          </div>
        </div>
        <div className="field" style={{ marginTop: 18 }}>
          <label>{s.b_notes}</label>
          <textarea className="input" value={notes} onChange={(e) => setNotes(e.target.value)} />
        </div>
      </div>

      <button type="button" onClick={submit} className="btn btn-primary btn-block pm-hd" style={{ fontSize: 15, letterSpacing: "0.06em", padding: 16, marginTop: 20 }}>
        {s.b_submit}
      </button>
    </section>
  );
}

export default function BookPage() {
  return (
    <Suspense fallback={<div style={{ padding: "80px 40px", textAlign: "center" }}>…</div>}>
      <BookInner />
    </Suspense>
  );
}
