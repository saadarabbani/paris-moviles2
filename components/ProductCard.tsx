"use client";

import Link from "next/link";
import { useLang } from "@/lib/i18n";
import { useStore } from "@/lib/store";
import { money, type Product } from "@/lib/data";

type Props = {
  product: Product;
  showCat?: boolean;
  showTag?: boolean;
  showAdd?: boolean;
  imgHeight?: number;
};

export default function ProductCard({
  product,
  showCat = false,
  showTag = false,
  showAdd = true,
  imgHeight = 200,
}: Props) {
  const { lang, t } = useLang();
  const { addToCart } = useStore();
  const s = t as Record<string, string>;
  const cats = (t as Record<string, Record<string, string>>).cats;

  const name = lang === "en" ? product.en : product.es;
  const tag = lang === "en" ? product.tag.en : product.tag.es;

  return (
    <div className="pm-card">
      <Link
        href={`/shop/${product.slug}`}
        className="pm-shot"
        style={{ height: imgHeight, cursor: "pointer", color: "inherit" }}
      >
        {showTag && tag ? (
          <span
            style={{
              position: "absolute",
              top: 10,
              left: 10,
              fontFamily: "var(--font-heading)",
              fontWeight: 600,
              fontSize: 11,
              letterSpacing: "0.06em",
              textTransform: "uppercase",
              background: "var(--color-accent)",
              color: "var(--color-bg)",
              padding: "4px 9px",
            }}
          >
            {tag}
          </span>
        ) : null}
        <span>{name}</span>
      </Link>
      <div style={{ padding: "13px 2px 0" }}>
        <Link href={`/shop/${product.slug}`} className="pm-hd" style={{ fontSize: 16, color: "var(--color-text)", display: "block" }}>
          {name}
        </Link>
        {showCat ? (
          <div
            style={{
              fontSize: 12,
              letterSpacing: "0.04em",
              textTransform: "uppercase",
              color: "color-mix(in srgb, var(--color-text) 50%, transparent)",
              marginTop: 4,
            }}
          >
            {cats[product.cat]}
          </div>
        ) : null}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: 12,
          }}
        >
          <span className="pm-hd" style={{ fontSize: 17 }}>
            {money(product.price)}
          </span>
          {showAdd ? (
            <button
              type="button"
              onClick={() => addToCart(product.id)}
              className="btn btn-primary pm-hd"
              style={{ fontSize: 11, letterSpacing: "0.06em", padding: "7px 14px" }}
            >
              {s.add}
            </button>
          ) : null}
        </div>
      </div>
    </div>
  );
}
