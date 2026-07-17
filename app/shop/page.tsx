"use client";

import { useMemo, useState } from "react";
import { useLang } from "@/lib/i18n";
import { useStore } from "@/lib/store";
import ProductCard from "@/components/ProductCard";
import { CATEGORIES, type Category } from "@/lib/data";

export default function ShopPage() {
  const { lang, t } = useLang();
  const { products } = useStore();
  const s = t as Record<string, string>;
  const cats = (t as unknown as { cats: Record<string, string> }).cats;

  const [search, setSearch] = useState("");
  const [cat, setCat] = useState<"all" | Category>("all");
  const [sort, setSort] = useState<"featured" | "low" | "high">("featured");

  const list = useMemo(() => {
    let l = products.filter((p) => cat === "all" || p.cat === cat);
    if (search.trim()) {
      const q = search.toLowerCase();
      l = l.filter((p) =>
        (lang === "en" ? p.en : p.es).toLowerCase().includes(q)
      );
    }
    if (sort === "low") l = l.slice().sort((a, b) => a.price - b.price);
    if (sort === "high") l = l.slice().sort((a, b) => b.price - a.price);
    return l;
  }, [products, cat, search, sort, lang]);

  return (
    <section className="pm-in pm-wrap" style={{ padding: "48px 40px 64px" }}>
      <div className="pm-kick">{s.shop_kick}</div>
      <hr style={{ height: 1, border: 0, margin: "12px 0 22px", background: "var(--color-divider)" }} />
      <h1 className="pm-hd" style={{ fontSize: 44, margin: "0 0 26px" }}>{s.shop_h}</h1>

      <div style={{ display: "flex", gap: 16, alignItems: "center", flexWrap: "wrap", marginBottom: 26 }}>
        <input
          className="input"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder={s.shop_search}
          style={{ maxWidth: 260 }}
        />
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          {CATEGORIES.map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => setCat(c)}
              className={`pm-chip ${cat === c ? "on" : ""}`}
            >
              {cats[c]}
            </button>
          ))}
        </div>
        <select
          className="input"
          value={sort}
          onChange={(e) => setSort(e.target.value as "featured" | "low" | "high")}
          style={{ maxWidth: 180, marginLeft: "auto" }}
        >
          <option value="featured">{s.sort_featured}</option>
          <option value="low">{s.sort_low}</option>
          <option value="high">{s.sort_high}</option>
        </select>
      </div>

      <div className="pm-grid-4" style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 22 }}>
        {list.map((p) => (
          <ProductCard key={p.id} product={p} showCat showTag />
        ))}
      </div>

      {list.length === 0 ? (
        <div style={{ padding: "40px 0", color: "color-mix(in srgb, var(--color-text) 55%, transparent)" }}>
          {s.shop_empty}
        </div>
      ) : null}
    </section>
  );
}
