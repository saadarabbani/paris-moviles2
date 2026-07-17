"use client";

import Link from "next/link";
import { useLang } from "@/lib/i18n";
import { useStore } from "@/lib/store";
import Corners from "@/components/Corners";
import { money } from "@/lib/data";

export default function CartPage() {
  const { lang, t } = useLang();
  const { cart, findProduct, changeQty, removeItem, cartTotal } = useStore();
  const s = t as Record<string, string>;

  const lines = cart
    .map((c) => {
      const p = findProduct(c.id);
      return p ? { ...c, product: p } : null;
    })
    .filter((x): x is NonNullable<typeof x> => x !== null);

  return (
    <section className="pm-in" style={{ maxWidth: 900, margin: "0 auto", padding: "48px 40px 64px" }}>
      <h1 className="pm-hd" style={{ fontSize: 44, margin: "0 0 24px" }}>{s.cart_h}</h1>

      {lines.length === 0 ? (
        <div style={{ padding: "40px 0", color: "color-mix(in srgb, var(--color-text) 55%, transparent)" }}>
          {s.cart_empty}{" "}
          <Link href="/shop">{s.shop_h} →</Link>
        </div>
      ) : (
        <>
          <div className="pm-frame" style={{ padding: "8px 24px" }}>
            <Corners />
            {lines.map((l) => {
              const name = lang === "en" ? l.product.en : l.product.es;
              return (
                <div
                  key={l.id}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 14,
                    rowGap: 10,
                    flexWrap: "wrap",
                    padding: "18px 0",
                    borderBottom: "1px solid var(--color-divider)",
                  }}
                >
                  <div className="pm-shot pm-frame" style={{ width: 64, height: 64, flex: "none" }} />
                  <div style={{ flex: 1 }}>
                    <div className="pm-hd" style={{ fontSize: 16 }}>{name}</div>
                    <div style={{ fontSize: 13, color: "color-mix(in srgb, var(--color-text) 55%, transparent)" }}>
                      {money(l.product.price)}
                    </div>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <button type="button" onClick={() => changeQty(l.id, -1)} className="pm-chip" style={{ padding: "4px 11px" }}>−</button>
                    <span className="pm-hd" style={{ minWidth: 24, textAlign: "center" }}>{l.qty}</span>
                    <button type="button" onClick={() => changeQty(l.id, 1)} className="pm-chip" style={{ padding: "4px 11px" }}>+</button>
                  </div>
                  <div className="pm-hd" style={{ fontSize: 16, minWidth: 80, textAlign: "right" }}>
                    {money(l.product.price * l.qty)}
                  </div>
                  <a onClick={() => removeItem(l.id)} style={{ fontSize: 12, color: "color-mix(in srgb, var(--color-text) 45%, transparent)" }}>
                    ✕
                  </a>
                </div>
              );
            })}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "20px 0" }}>
              <span className="pm-hd" style={{ fontSize: 18 }}>{s.total}</span>
              <span className="pm-hd" style={{ fontSize: 24, color: "var(--color-accent-700)" }}>{money(cartTotal)}</span>
            </div>
          </div>
          <Link href="/checkout" className="btn btn-primary btn-block pm-hd" style={{ fontSize: 15, letterSpacing: "0.06em", padding: 16, marginTop: 20 }}>
            {s.checkout} →
          </Link>
        </>
      )}
    </section>
  );
}
