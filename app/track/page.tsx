"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useLang } from "@/lib/i18n";
import { useStore } from "@/lib/store";
import Corners from "@/components/Corners";

function TrackInner() {
  const params = useSearchParams();
  const { t } = useLang();
  const { tickets } = useStore();
  const s = t as Record<string, string>;
  const kstat = (t as unknown as { kstat: string[] }).kstat;
  const issues = (t as unknown as { issues: Record<string, string> }).issues;

  const [input, setInput] = useState("");
  const [query, setQuery] = useState<string | null>(null);
  const [tried, setTried] = useState(false);

  // Prefill + auto-search when arriving from a booking confirmation.
  useEffect(() => {
    const q = params.get("ticket");
    if (q) {
      setInput(q);
      setQuery(q.trim());
      setTried(true);
    }
  }, [params]);

  const ticket = query
    ? tickets.find((k) => k.num.toUpperCase() === query.toUpperCase())
    : null;

  const doTrack = () => {
    setQuery(input.trim());
    setTried(true);
  };

  return (
    <section className="pm-in" style={{ maxWidth: 760, margin: "0 auto", padding: "48px 40px 64px" }}>
      <div className="pm-kick">{s.track_kick}</div>
      <hr style={{ height: 1, border: 0, margin: "12px 0 22px", background: "var(--color-divider)" }} />
      <h1 className="pm-hd" style={{ fontSize: 44, margin: "0 0 24px" }}>{s.track_h}</h1>

      <div style={{ display: "flex", gap: 12 }}>
        <input
          className="input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => { if (e.key === "Enter") doTrack(); }}
          placeholder={s.track_ph}
          style={{ flex: 1 }}
        />
        <button type="button" onClick={doTrack} className="btn btn-primary pm-hd" style={{ fontSize: 14, letterSpacing: "0.06em", padding: "0 26px" }}>
          {s.track_btn}
        </button>
      </div>

      {ticket ? (
        <div className="pm-frame" style={{ padding: 32, marginTop: 28 }}>
          <Corners />
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 24, flexWrap: "wrap", gap: 12 }}>
            <div>
              <div style={{ fontSize: 12, letterSpacing: "0.08em", textTransform: "uppercase", color: "color-mix(in srgb, var(--color-text) 55%, transparent)" }}>{s.track_device}</div>
              <div className="pm-hd" style={{ fontSize: 20 }}>{ticket.device}</div>
              <div style={{ fontSize: 13, color: "color-mix(in srgb, var(--color-text) 55%, transparent)" }}>{issues[ticket.issue]}</div>
            </div>
            <div style={{ textAlign: "right" }}>
              <div style={{ fontSize: 12, letterSpacing: "0.08em", textTransform: "uppercase", color: "color-mix(in srgb, var(--color-text) 55%, transparent)" }}>{s.track_ticket}</div>
              <div className="pm-hd" style={{ fontSize: 20 }}>{ticket.num}</div>
            </div>
          </div>
          {kstat.map((label, i) => {
            const done = i <= ticket.status;
            const current = i === ticket.status;
            return (
              <div key={i} style={{ display: "flex", gap: 16, alignItems: "center", padding: "12px 0" }}>
                <div
                  style={{
                    width: 14,
                    height: 14,
                    flex: "none",
                    borderRadius: "50%",
                    border: "2px solid var(--color-accent)",
                    background: done ? "var(--color-accent)" : "transparent",
                  }}
                />
                <div className="pm-hd" style={{ fontSize: 16, color: done ? "var(--color-text)" : "color-mix(in srgb, var(--color-text) 40%, transparent)" }}>
                  {label}
                </div>
                {current ? <span className="tag tag-accent" style={{ marginLeft: "auto" }}>{s.track_now}</span> : null}
              </div>
            );
          })}
        </div>
      ) : null}

      {tried && !ticket ? (
        <div style={{ marginTop: 24, color: "var(--color-accent-700)" }}>{s.track_miss}</div>
      ) : null}
    </section>
  );
}

export default function TrackPage() {
  return (
    <Suspense fallback={<div style={{ padding: "80px 40px", textAlign: "center" }}>…</div>}>
      <TrackInner />
    </Suspense>
  );
}
