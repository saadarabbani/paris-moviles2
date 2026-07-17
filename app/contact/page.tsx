"use client";

import { useState } from "react";
import { useLang } from "@/lib/i18n";
import Corners from "@/components/Corners";

export default function ContactPage() {
  const { t } = useLang();
  const s = t as Record<string, string>;
  const [sent, setSent] = useState(false);

  return (
    <section className="pm-in pm-wrap" style={{ maxWidth: 1100, margin: "0 auto", padding: "48px 40px 64px" }}>
      <div className="pm-kick">{s.contact_kick}</div>
      <hr style={{ height: 1, border: 0, margin: "12px 0 22px", background: "var(--color-divider)" }} />
      <h1 className="pm-hd" style={{ fontSize: 48, margin: "0 0 32px" }}>{s.contact_h}</h1>

      <div className="pm-grid-2" style={{ display: "grid", gridTemplateColumns: "minmax(0,1fr) minmax(0,1fr)", gap: 48 }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 28, alignContent: "start" }}>
          <div>
            <div className="pm-kick" style={{ fontSize: 12 }}>{s.c_address}</div>
            <div style={{ fontSize: 15, marginTop: 6, color: "color-mix(in srgb, var(--color-text) 80%, transparent)" }}>
              Your street address<br />City, postcode
            </div>
          </div>
          <div>
            <div className="pm-kick" style={{ fontSize: 12 }}>{s.c_phone}</div>
            <div style={{ fontSize: 15, marginTop: 6, color: "color-mix(in srgb, var(--color-text) 80%, transparent)" }}>+34 900 000 000</div>
          </div>
          <div>
            <div className="pm-kick" style={{ fontSize: 12 }}>{s.c_hours}</div>
            <div style={{ fontSize: 15, marginTop: 6, color: "color-mix(in srgb, var(--color-text) 80%, transparent)" }}>
              Mon–Sat · 10:00–20:00<br />Sun · closed
            </div>
          </div>
          <div>
            <div className="pm-kick" style={{ fontSize: 12 }}>{s.c_email}</div>
            <div style={{ fontSize: 15, marginTop: 6, color: "color-mix(in srgb, var(--color-text) 80%, transparent)" }}>hola@parismoviles.com</div>
          </div>
          <div style={{ gridColumn: "1/-1" }} className="pm-shot pm-frame">
            <span style={{ padding: "40px 0" }}>map</span>
          </div>
        </div>

        <div className="pm-frame" style={{ padding: 28 }}>
          <Corners />
          {sent ? (
            <div style={{ padding: "40px 0", textAlign: "center" }}>
              <div className="pm-hd" style={{ fontSize: 22 }}>{s.confirm_h}</div>
              <p style={{ marginTop: 10, color: "color-mix(in srgb, var(--color-text) 70%, transparent)" }}>{s.c_sent}</p>
            </div>
          ) : (
            <>
              <div className="field" style={{ marginBottom: 16 }}><label>{s.f_name}</label><input className="input" /></div>
              <div className="field" style={{ marginBottom: 16 }}><label>{s.f_phone}</label><input className="input" /></div>
              <div className="field" style={{ marginBottom: 16 }}><label>{s.c_message}</label><textarea className="input" /></div>
              <button type="button" onClick={() => setSent(true)} className="btn btn-primary btn-block pm-hd" style={{ fontSize: 14, letterSpacing: "0.06em", padding: 14 }}>
                {s.c_send}
              </button>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
