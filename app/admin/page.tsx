"use client";

import { useEffect, useState } from "react";
import { useLang } from "@/lib/i18n";
import { useStore } from "@/lib/store";
import Corners from "@/components/Corners";
import {
  ISSUE_KEYS,
  ORDER_TAG_CLASS,
  TICKET_TAG_CLASS,
  WHATSAPP_NUMBER,
  money,
} from "@/lib/data";

type Tab = "orders" | "tickets" | "products" | "prices" | "reviews";

function waLink(text: string) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
}

export default function AdminPage() {
  const { lang, t } = useLang();
  const store = useStore();
  const s = t as Record<string, string>;
  const ostat = (t as unknown as { ostat: string[] }).ostat;
  const kstat = (t as unknown as { kstat: string[] }).kstat;
  const issues = (t as unknown as { issues: Record<string, string> }).issues;
  const cats = (t as unknown as { cats: Record<string, string> }).cats;

  const [authed, setAuthed] = useState(false);
  const [pass, setPass] = useState("");
  const [err, setErr] = useState(false);
  const [tab, setTab] = useState<Tab>("orders");
  const [npName, setNpName] = useState("");
  const [npPrice, setNpPrice] = useState("");

  useEffect(() => {
    try {
      if (sessionStorage.getItem("pm_admin") === "1") setAuthed(true);
    } catch {}
  }, []);

  const login = () => {
    if (pass === "admin") {
      setAuthed(true);
      setErr(false);
      try {
        sessionStorage.setItem("pm_admin", "1");
      } catch {}
    } else {
      setErr(true);
    }
  };
  const logout = () => {
    setAuthed(false);
    setPass("");
    try {
      sessionStorage.removeItem("pm_admin");
    } catch {}
  };

  if (!authed) {
    return (
      <section className="pm-in" style={{ maxWidth: 400, margin: "0 auto", padding: "100px 40px" }}>
        <div className="pm-frame" style={{ padding: 36 }}>
          <Corners />
          <div className="pm-kick">{s.admin_kick}</div>
          <h1 className="pm-hd" style={{ fontSize: 30, margin: "10px 0 22px" }}>{s.admin_login}</h1>
          <div className="field">
            <label>{s.admin_pass}</label>
            <input
              className="input"
              type="password"
              value={pass}
              onChange={(e) => setPass(e.target.value)}
              onKeyDown={(e) => { if (e.key === "Enter") login(); }}
              placeholder="admin"
            />
          </div>
          <button type="button" onClick={login} className="btn btn-primary btn-block pm-hd" style={{ fontSize: 14, letterSpacing: "0.06em", padding: 14, marginTop: 16 }}>
            {s.admin_enter}
          </button>
          {err ? <div style={{ color: "var(--color-accent-700)", fontSize: 13, marginTop: 12 }}>{s.admin_wrong}</div> : null}
          <div style={{ fontSize: 12, color: "color-mix(in srgb, var(--color-text) 45%, transparent)", marginTop: 12 }}>{s.admin_hint}</div>
        </div>
      </section>
    );
  }

  const pendingReviews = store.reviews.filter((r) => r.status === "pending").length;
  const counts = [
    { n: store.products.length, l: s.th_product + "s" },
    { n: store.orders.length, l: s.th_order + "s" },
    { n: store.tickets.length, l: s.nav_track },
    { n: pendingReviews, l: lang === "en" ? "Pending reviews" : "Reseñas pend." },
  ];
  const tabs: { key: Tab; label: string }[] = [
    { key: "orders", label: s.th_order + "s" },
    { key: "tickets", label: s.nav_track },
    { key: "products", label: s.th_product + "s" },
    { key: "prices", label: s.q_issue },
    { key: "reviews", label: s.reviews },
  ];

  return (
    <section className="pm-in pm-wrap" style={{ padding: "40px 40px 64px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 24 }}>
        <h1 className="pm-hd" style={{ fontSize: 36, margin: 0 }}>{s.admin_dash}</h1>
        <a onClick={logout} style={{ fontSize: 13 }}>{s.admin_logout}</a>
      </div>

      {/* count cards */}
      <div className="pm-grid-4" style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 18, marginBottom: 32 }}>
        {counts.map((c) => (
          <div key={c.l} className="pm-frame" style={{ padding: 22 }}>
            <Corners />
            <div className="pm-hd" style={{ fontSize: 40, color: "var(--color-accent-700)" }}>{c.n}</div>
            <div style={{ fontSize: 12, letterSpacing: "0.08em", textTransform: "uppercase", color: "color-mix(in srgb, var(--color-text) 55%, transparent)", marginTop: 4 }}>{c.l}</div>
          </div>
        ))}
      </div>

      {/* tabs */}
      <div style={{ display: "flex", gap: 8, borderBottom: "1px solid var(--color-divider)", marginBottom: 28, flexWrap: "wrap" }}>
        {tabs.map((tb) => (
          <button
            key={tb.key}
            type="button"
            onClick={() => setTab(tb.key)}
            className="pm-hd"
            style={{
              fontSize: 13,
              letterSpacing: "0.05em",
              padding: "12px 18px",
              background: "transparent",
              border: "none",
              borderBottom: `2px solid ${tab === tb.key ? "var(--color-accent)" : "transparent"}`,
              color: tab === tb.key ? "var(--color-accent-700)" : "color-mix(in srgb, var(--color-text) 55%, transparent)",
              cursor: "pointer",
            }}
          >
            {tb.label}
          </button>
        ))}
      </div>

      <div style={{ overflowX: "auto" }}>
        {tab === "orders" ? (
          <table className="table">
            <thead><tr><th>{s.th_order}</th><th>{s.th_customer}</th><th>{s.th_total}</th><th>{s.th_status}</th><th /></tr></thead>
            <tbody>
              {store.orders.map((o) => (
                <tr key={o.num}>
                  <td className="pm-hd">{o.num}</td>
                  <td>{o.customer}</td>
                  <td>{money(o.total)}</td>
                  <td><span className={`tag ${ORDER_TAG_CLASS[o.status]}`}>{ostat[o.status]}</span></td>
                  <td style={{ textAlign: "right" }}>
                    <span style={{ display: "flex", gap: 12, justifyContent: "flex-end" }}>
                      <a onClick={() => store.advanceOrder(o.num)} style={{ fontSize: 12 }}>{s.a_advance}</a>
                      <a href={waLink(`Hi ${o.customer}, thanks for your order ${o.num}! Could you leave us a review?`)} target="_blank" rel="noopener noreferrer" style={{ fontSize: 12, color: "#1a8a4a" }}>{s.a_review}</a>
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : null}

        {tab === "tickets" ? (
          <table className="table">
            <thead><tr><th>{s.th_ticket}</th><th>{s.th_device}</th><th>{s.th_issue}</th><th>{s.th_status}</th><th /></tr></thead>
            <tbody>
              {store.tickets.map((k) => (
                <tr key={k.num}>
                  <td className="pm-hd">{k.num}</td>
                  <td>{k.device}</td>
                  <td>{issues[k.issue] ?? k.issue}</td>
                  <td><span className={`tag ${TICKET_TAG_CLASS[k.status]}`}>{kstat[k.status]}</span></td>
                  <td style={{ textAlign: "right" }}>
                    <span style={{ display: "flex", gap: 12, justifyContent: "flex-end" }}>
                      <a onClick={() => store.advanceTicket(k.num)} style={{ fontSize: 12 }}>{s.a_advance}</a>
                      <a href={waLink(`Hi! Your repair ${k.num} is done — could you leave a review?`)} target="_blank" rel="noopener noreferrer" style={{ fontSize: 12, color: "#1a8a4a" }}>{s.a_review}</a>
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : null}

        {tab === "products" ? (
          <>
            <div style={{ display: "flex", gap: 10, marginBottom: 18, flexWrap: "wrap", alignItems: "flex-end" }}>
              <div className="field"><label>{s.p_name_en}</label><input className="input" value={npName} onChange={(e) => setNpName(e.target.value)} style={{ width: 200 }} /></div>
              <div className="field"><label>{s.p_price}</label><input className="input" value={npPrice} onChange={(e) => setNpPrice(e.target.value)} style={{ width: 110 }} /></div>
              <button type="button" onClick={() => { store.addProduct(npName, parseFloat(npPrice) || 0); setNpName(""); setNpPrice(""); }} className="btn btn-primary pm-hd" style={{ fontSize: 13, padding: "9px 18px" }}>{s.p_add}</button>
            </div>
            <table className="table">
              <thead><tr><th>{s.th_product}</th><th>{s.th_cat}</th><th>{s.th_price}</th><th /></tr></thead>
              <tbody>
                {store.products.map((p) => (
                  <tr key={p.id}>
                    <td className="pm-hd">{lang === "en" ? p.en : p.es}</td>
                    <td>{cats[p.cat]}</td>
                    <td>{money(p.price)}</td>
                    <td style={{ textAlign: "right" }}>
                      <a onClick={() => store.deleteProduct(p.id)} style={{ fontSize: 12, color: "var(--color-accent-700)" }}>{s.a_delete}</a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        ) : null}

        {tab === "prices" ? (
          <table className="table">
            <thead><tr><th>{s.th_issue}</th><th>{s.th_price}</th><th /></tr></thead>
            <tbody>
              {ISSUE_KEYS.map((k) => (
                <tr key={k}>
                  <td className="pm-hd">{issues[k]}</td>
                  <td>
                    <input
                      className="input"
                      value={String(store.prices[k])}
                      onChange={(e) => store.setPrice(k, parseFloat(e.target.value) || 0)}
                      style={{ width: 110 }}
                    />
                  </td>
                  <td />
                </tr>
              ))}
            </tbody>
          </table>
        ) : null}

        {tab === "reviews" ? (
          <table className="table">
            <thead><tr><th>{s.th_author}</th><th>{s.th_review}</th><th>{s.th_status}</th><th /></tr></thead>
            <tbody>
              {store.reviews.map((r) => (
                <tr key={r.id}>
                  <td className="pm-hd">{r.author}</td>
                  <td style={{ maxWidth: 360 }}>{r.text}</td>
                  <td>
                    <span className={`tag ${r.status === "approved" ? "tag-accent" : r.status === "pending" ? "tag-neutral" : "tag-outline"}`}>
                      {r.status}
                    </span>
                  </td>
                  <td style={{ textAlign: "right" }}>
                    <span style={{ display: "flex", gap: 12, justifyContent: "flex-end" }}>
                      <a onClick={() => store.approveReview(r.id)} style={{ fontSize: 12 }}>{s.a_approve}</a>
                      <a onClick={() => store.hideReview(r.id)} style={{ fontSize: 12 }}>{s.a_hide}</a>
                      <a onClick={() => store.deleteReview(r.id)} style={{ fontSize: 12, color: "var(--color-accent-700)" }}>{s.a_delete}</a>
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : null}
      </div>
    </section>
  );
}
