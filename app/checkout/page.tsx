"use client";

import { useState } from "react";
import Link from "next/link";
import { useLang } from "@/lib/i18n";
import { useStore } from "@/lib/store";
import Corners from "@/components/Corners";
import { money } from "@/lib/data";

export default function CheckoutPage() {
  const { t } = useLang();
  const { cart, cartTotal, placeOrder } = useStore();
  const s = t as Record<string, string>;

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [fulfil, setFulfil] = useState<"pickup" | "delivery">("pickup");
  const [addr, setAddr] = useState("");
  const [placed, setPlaced] = useState<string | null>(null);

  const submit = () => {
    if (cart.length === 0) return;
    const num = placeOrder(name);
    setPlaced(num);
    window.scrollTo(0, 0);
  };

  if (placed) {
    return (
      <section className="pm-in" style={{ maxWidth: 640, margin: "0 auto", padding: "80px 40px", textAlign: "center" }}>
        <div className="pm-frame" style={{ padding: 52 }}>
          <Corners />
          <div className="pm-kick">{s.confirm_kick}</div>
          <h1 className="pm-hd" style={{ fontSize: 38, margin: "14px 0 0" }}>{s.confirm_h}</h1>
          <div className="pm-hd" style={{ fontSize: 40, margin: "24px 0", color: "var(--color-accent-700)" }}>{placed}</div>
          <p style={{ color: "color-mix(in srgb, var(--color-text) 70%, transparent)", margin: "0 auto", maxWidth: "42ch" }}>
            {s.confirm_sub}
          </p>
          <Link href="/shop" className="btn btn-secondary pm-hd" style={{ fontSize: 14, letterSpacing: "0.06em", padding: "13px 26px", marginTop: 28 }}>
            {s.keep_shopping}
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="pm-in" style={{ maxWidth: 760, margin: "0 auto", padding: "48px 40px 64px" }}>
      <h1 className="pm-hd" style={{ fontSize: 40, margin: "0 0 8px" }}>{s.checkout_h}</h1>
      <p style={{ color: "color-mix(in srgb, var(--color-text) 60%, transparent)", margin: "0 0 28px" }}>{s.checkout_sub}</p>

      <div className="pm-frame" style={{ padding: 32 }}>
        <Corners />
        <div className="pm-fields">
          <div className="field"><label>{s.f_name}</label><input className="input" value={name} onChange={(e) => setName(e.target.value)} /></div>
          <div className="field"><label>{s.f_phone}</label><input className="input" value={phone} onChange={(e) => setPhone(e.target.value)} /></div>
        </div>

        <div style={{ marginTop: 20 }}>
          <div className="field" style={{ marginBottom: 10 }}><label>{s.f_fulfil}</label></div>
          <div style={{ display: "flex", gap: 12 }}>
            <button type="button" onClick={() => setFulfil("pickup")} className={`pm-chip ${fulfil === "pickup" ? "on" : ""}`}>{s.f_pickup}</button>
            <button type="button" onClick={() => setFulfil("delivery")} className={`pm-chip ${fulfil === "delivery" ? "on" : ""}`}>{s.f_delivery}</button>
          </div>
        </div>

        {fulfil === "delivery" ? (
          <div className="field" style={{ marginTop: 18 }}>
            <label>{s.f_address}</label>
            <input className="input" value={addr} onChange={(e) => setAddr(e.target.value)} />
          </div>
        ) : null}

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 24, paddingTop: 20, borderTop: "1px solid var(--color-divider)" }}>
          <span className="pm-hd" style={{ fontSize: 16 }}>{s.total} · {s.f_cash}</span>
          <span className="pm-hd" style={{ fontSize: 22, color: "var(--color-accent-700)" }}>{money(cartTotal)}</span>
        </div>
      </div>

      <button
        type="button"
        onClick={submit}
        disabled={cart.length === 0}
        className="btn btn-primary btn-block pm-hd"
        style={{ fontSize: 15, letterSpacing: "0.06em", padding: 16, marginTop: 20 }}
      >
        {s.place_order}
      </button>
      {cart.length === 0 ? (
        <p style={{ marginTop: 12, fontSize: 13, color: "color-mix(in srgb, var(--color-text) 55%, transparent)" }}>
          {s.cart_empty} <Link href="/shop">{s.shop_h} →</Link>
        </p>
      ) : null}
    </section>
  );
}
