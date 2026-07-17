"use client";

import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { useLang } from "@/lib/i18n";
import { useStore } from "@/lib/store";
import Corners from "@/components/Corners";
import ProductCard from "@/components/ProductCard";
import { money } from "@/lib/data";

export default function ProductPage() {
  const params = useParams<{ slug: string }>();
  const router = useRouter();
  const { lang, t } = useLang();
  const { productBySlug, products, reviews, addToCart, ready } = useStore();
  const s = t as Record<string, string>;
  const cats = (t as unknown as { cats: Record<string, string> }).cats;

  const product = productBySlug(params.slug);

  if (!product) {
    return (
      <section className="pm-in pm-wrap" style={{ padding: "80px 40px", textAlign: "center" }}>
        <p style={{ color: "color-mix(in srgb, var(--color-text) 60%, transparent)" }}>
          {ready ? (lang === "en" ? "Product not found." : "Producto no encontrado.") : "…"}
        </p>
        <Link href="/shop" className="pm-hd" style={{ fontSize: 13 }}>
          ← {s.back_shop}
        </Link>
      </section>
    );
  }

  const name = lang === "en" ? product.en : product.es;
  const blurb = lang === "en" ? product.blurbEn : product.blurbEs;
  const productReviews = reviews.filter((r) => r.status === "approved").slice(0, 2);
  const related = products
    .filter((p) => p.cat === product.cat && p.id !== product.id)
    .slice(0, 4);

  const buyNow = () => {
    addToCart(product.id);
    router.push("/cart");
  };

  return (
    <section className="pm-in pm-wrap" style={{ padding: "40px 40px 64px" }}>
      <Link href="/shop" className="pm-hd" style={{ fontSize: 12, letterSpacing: "0.06em" }}>
        ← {s.back_shop}
      </Link>

      <div className="pm-grid-2" style={{ display: "grid", gridTemplateColumns: "minmax(0,1fr) minmax(0,1fr)", gap: 52, marginTop: 24 }}>
        <div>
          <figure className="pm-frame" style={{ margin: 0, aspectRatio: "1/1" }}>
            <div className="pm-shot" style={{ width: "100%", height: "100%" }}>
              <span>{name}</span>
            </div>
            <Corners />
          </figure>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 12, marginTop: 12 }}>
            {[1, 2, 3, 4].map((n) => (
              <div key={n} className="pm-shot pm-frame" style={{ height: 70 }}>
                <span>{n}</span>
              </div>
            ))}
          </div>
        </div>

        <div>
          <div className="pm-kick">{cats[product.cat]}</div>
          <h1 className="pm-hd" style={{ fontSize: 40, margin: "10px 0 0" }}>{name}</h1>
          <div className="pm-hd" style={{ fontSize: 30, marginTop: 16, color: "var(--color-accent-700)" }}>
            {money(product.price)}
          </div>
          {blurb ? (
            <p style={{ fontSize: 15, lineHeight: 1.6, margin: "20px 0 0", color: "color-mix(in srgb, var(--color-text) 80%, transparent)" }}>
              {blurb}
            </p>
          ) : null}
          <div style={{ display: "flex", gap: 14, marginTop: 28, flexWrap: "wrap" }}>
            <button type="button" onClick={() => addToCart(product.id)} className="btn btn-primary pm-hd" style={{ fontSize: 14, letterSpacing: "0.06em", padding: "14px 28px" }}>
              {s.add_cart}
            </button>
            <button type="button" onClick={buyNow} className="btn btn-secondary pm-hd" style={{ fontSize: 14, letterSpacing: "0.06em", padding: "14px 28px" }}>
              {s.buy_now}
            </button>
          </div>

          <div style={{ marginTop: 32, borderTop: "1px solid var(--color-divider)", paddingTop: 24 }}>
            <div className="pm-kick" style={{ marginBottom: 14 }}>{s.reviews}</div>
            {productReviews.map((r) => (
              <div key={r.id} style={{ marginBottom: 16 }}>
                <div style={{ color: "var(--color-accent)", letterSpacing: "0.1em", fontSize: 13 }}>★★★★★</div>
                <p style={{ fontSize: 14, lineHeight: 1.5, margin: "6px 0 2px" }}>“{r.text}”</p>
                <div style={{ fontSize: 12, color: "color-mix(in srgb, var(--color-text) 50%, transparent)" }}>— {r.author}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {related.length > 0 ? (
        <div style={{ marginTop: 56 }}>
          <div className="pm-kick">{s.related}</div>
          <hr style={{ height: 1, border: 0, margin: "12px 0 24px", background: "var(--color-divider)" }} />
          <div className="pm-grid-4" style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 22 }}>
            {related.map((p) => (
              <ProductCard key={p.id} product={p} showAdd={false} imgHeight={170} />
            ))}
          </div>
        </div>
      ) : null}
    </section>
  );
}
