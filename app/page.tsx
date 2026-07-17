"use client";

import Link from "next/link";
import { useLang } from "@/lib/i18n";
import { useStore } from "@/lib/store";
import Corners from "@/components/Corners";
import ProductCard from "@/components/ProductCard";
import RepairServices from "@/components/RepairServices";

export default function HomePage() {
  const { lang, t } = useLang();
  const { products, reviews } = useStore();
  const s = t as Record<string, string>;
  const proc = (t as unknown as { proc: { t: string; d: string }[] }).proc;

  const stats = [
    { n: "30 min", l: lang === "en" ? "Average repair" : "Reparación media" },
    { n: "12 mo", l: lang === "en" ? "Warranty" : "Garantía" },
    { n: "14 yrs", l: lang === "en" ? "In business" : "De experiencia" },
    { n: "4.9 ★", l: lang === "en" ? "2,300+ reviews" : "+2.300 reseñas" },
  ];

  const featured = products.slice(0, 4);
  const homeReviews = reviews
    .filter((r) => r.status === "approved")
    .slice(0, 3);
  const steps = proc.slice(0, 3);

  return (
    <div className="pm-in">
      {/* Hero */}
      <section
        className="pm-wrap pm-grid-hero"
        style={{
          padding: "56px 40px 64px",
          display: "grid",
          gridTemplateColumns: "minmax(0,7fr) minmax(0,5fr)",
          gap: 56,
          alignItems: "center",
        }}
      >
        <div>
          <div className="pm-kick" style={{ marginBottom: 12 }}>
            {s.home_eyebrow}
          </div>
          <hr style={{ height: 1, border: 0, margin: "0 0 26px", background: "var(--color-divider)" }} />
          <h1 className="pm-hd" style={{ fontSize: 72, lineHeight: 0.98, letterSpacing: "0.005em", margin: 0 }}>
            {s.home_title}
          </h1>
          <p
            style={{
              fontSize: 17,
              lineHeight: 1.6,
              maxWidth: "52ch",
              margin: "26px 0 0",
              color: "color-mix(in srgb, var(--color-text) 82%, transparent)",
            }}
          >
            {s.home_sub}
          </p>
          <div style={{ display: "flex", gap: 14, marginTop: 34, flexWrap: "wrap" }}>
            <Link href="/book" className="btn btn-primary pm-hd" style={{ fontSize: 14, letterSpacing: "0.06em", padding: "14px 26px" }}>
              {s.home_cta1}
            </Link>
            <Link href="/shop" className="btn btn-secondary pm-hd" style={{ fontSize: 14, letterSpacing: "0.06em", padding: "14px 26px" }}>
              {s.home_cta2}
            </Link>
          </div>
        </div>
        <figure style={{ margin: 0, aspectRatio: "4/5" }}>
          <div className="pm-shot" style={{ width: "100%", height: "100%" }}>
            <span>storefront photo</span>
          </div>
        </figure>
      </section>

      {/* Stat band */}
      <section style={{ background: "var(--color-accent-900)", color: "var(--color-bg)" }}>
        <div
          className="pm-wrap pm-grid-4"
          style={{ padding: "48px 40px", display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 32 }}
        >
          {stats.map((st) => (
            <div key={st.n}>
              <div className="pm-hd" style={{ fontSize: 52, lineHeight: 1 }}>{st.n}</div>
              <div
                style={{
                  fontSize: 12,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  marginTop: 8,
                  color: "color-mix(in srgb, var(--color-bg) 60%, transparent)",
                }}
              >
                {st.l}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Featured */}
      <section className="pm-wrap" style={{ padding: "72px 40px 8px" }}>
        <div className="pm-kick">{s.home_featured}</div>
        <hr style={{ height: 1, border: 0, margin: "12px 0 0", background: "var(--color-divider)" }} />
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginTop: 22 }}>
          <h2 className="pm-hd" style={{ fontSize: 38, margin: 0 }}>{s.home_featured_h}</h2>
          <Link href="/shop" className="pm-hd" style={{ fontSize: 13, letterSpacing: "0.06em" }}>
            {s.view_all} →
          </Link>
        </div>
        <div className="pm-grid-4" style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 22, marginTop: 32 }}>
          {featured.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      {/* Repair details */}
      <section className="pm-wrap" style={{ padding: "56px 40px 8px" }}>
        <div className="pm-kick">{s.rep_kick}</div>
        <hr style={{ height: 1, border: 0, margin: "12px 0 0", background: "var(--color-divider)" }} />
        <div className="pm-grid-2" style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginTop: 22, gap: 20, flexWrap: "wrap" }}>
          <h2 className="pm-hd" style={{ fontSize: 38, margin: 0 }}>{s.rep_h}</h2>
          <Link href="/repairs" className="pm-hd" style={{ fontSize: 13, letterSpacing: "0.06em" }}>
            {s.get_quote} →
          </Link>
        </div>
        <p style={{ fontSize: 16, lineHeight: 1.6, margin: "16px 0 0", maxWidth: "60ch", color: "color-mix(in srgb, var(--color-text) 80%, transparent)" }}>
          {s.rep_sub}
        </p>

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

        <div style={{ display: "flex", gap: 14, marginTop: 36, flexWrap: "wrap" }}>
          <Link href="/quote" className="btn btn-primary pm-hd" style={{ fontSize: 14, letterSpacing: "0.06em", padding: "14px 26px" }}>{s.get_quote}</Link>
          <Link href="/book" className="btn btn-secondary pm-hd" style={{ fontSize: 14, letterSpacing: "0.06em", padding: "14px 26px" }}>{s.book_now}</Link>
        </div>
      </section>

      {/* Booking block */}
      <section className="pm-wrap" style={{ padding: "56px 40px" }}>
        <div className="pm-frame" style={{ padding: 52, background: "var(--color-accent-900)", color: "var(--color-bg)" }}>
          <Corners light />
          <div className="pm-grid-2" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 52, alignItems: "center" }}>
            <div>
              <div className="pm-hd" style={{ fontSize: 13, letterSpacing: "0.12em", color: "color-mix(in srgb, var(--color-bg) 70%, transparent)" }}>
                {s.home_book_kick}
              </div>
              <h2 className="pm-hd" style={{ fontSize: 36, margin: "14px 0 0", lineHeight: 1.05 }}>
                {s.home_book_h}
              </h2>
              <p style={{ fontSize: 15, lineHeight: 1.6, margin: "16px 0 0", maxWidth: "40ch", color: "color-mix(in srgb, var(--color-bg) 75%, transparent)" }}>
                {s.home_book_sub}
              </p>
              <Link
                href="/book"
                className="btn btn-primary pm-hd"
                style={{
                  fontSize: 14,
                  letterSpacing: "0.06em",
                  padding: "14px 26px",
                  marginTop: 26,
                  background: "var(--color-bg)",
                  color: "var(--color-accent-900)",
                  borderColor: "var(--color-bg)",
                }}
              >
                {s.home_cta1} →
              </Link>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {steps.map((sp, i) => (
                <div
                  key={i}
                  style={{
                    display: "flex",
                    gap: 16,
                    alignItems: "center",
                    border: "1px solid color-mix(in srgb, var(--color-bg) 22%, transparent)",
                    padding: 18,
                  }}
                >
                  <div
                    className="pm-hd"
                    style={{
                      fontSize: 19,
                      width: 34,
                      height: 34,
                      flex: "none",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      background: "var(--color-bg)",
                      color: "var(--color-accent-900)",
                    }}
                  >
                    {i + 1}
                  </div>
                  <div>
                    <div className="pm-hd" style={{ fontSize: 16 }}>{sp.t}</div>
                    <div style={{ fontSize: 13, color: "color-mix(in srgb, var(--color-bg) 65%, transparent)" }}>{sp.d}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section className="pm-wrap" style={{ padding: "8px 40px 40px" }}>
        <div className="pm-kick">{s.home_reviews_kick}</div>
        <hr style={{ height: 1, border: 0, margin: "12px 0 0", background: "var(--color-divider)" }} />
        <div className="pm-grid-3" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 22, marginTop: 32 }}>
          {homeReviews.map((r) => (
            <div key={r.id} className="pm-frame" style={{ padding: 26 }}>
              <Corners />
              <div style={{ color: "var(--color-accent)", letterSpacing: "0.1em" }}>★★★★★</div>
              <p className="pm-hd" style={{ fontSize: 19, lineHeight: 1.3, margin: "12px 0 0", textTransform: "none" }}>
                “{r.text}”
              </p>
              <div
                style={{
                  fontSize: 12,
                  letterSpacing: "0.06em",
                  textTransform: "uppercase",
                  color: "color-mix(in srgb, var(--color-text) 55%, transparent)",
                  marginTop: 16,
                }}
              >
                — {r.author}
              </div>
            </div>
          ))}
        </div>
        <div style={{ marginTop: 22, fontSize: 13, color: "color-mix(in srgb, var(--color-text) 55%, transparent)" }}>
          {s.home_google}
        </div>
      </section>
    </div>
  );
}
