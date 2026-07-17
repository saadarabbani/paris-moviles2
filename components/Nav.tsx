"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useLang } from "@/lib/i18n";
import { useStore } from "@/lib/store";

export default function Nav() {
  const { t, lang, toggle } = useLang();
  const { cartCount } = useStore();
  const s = t as Record<string, string>;
  const [open, setOpen] = useState(false);

  const links = [
    { href: "/shop", label: s.nav_shop },
    { href: "/repairs", label: s.nav_repairs },
    { href: "/quote", label: s.nav_quote },
    { href: "/track", label: s.nav_track },
    { href: "/contact", label: s.nav_contact },
  ];

  return (
    <nav
      className="pm-nav"
      style={{
        position: "sticky",
        top: 0,
        zIndex: 40,
        background: "color-mix(in srgb, var(--color-bg) 92%, transparent)",
        backdropFilter: "blur(6px)",
        borderBottom: "1px solid var(--color-divider)",
      }}
    >
      <div
        className="pm-wrap"
        style={{
          display: "flex",
          alignItems: "center",
          gap: 22,
          padding: "16px 40px",
        }}
      >
        <Link
          href="/"
          onClick={() => setOpen(false)}
          className="pm-hd"
          style={{
            fontSize: 20,
            letterSpacing: "0.04em",
            marginRight: "auto",
            color: "var(--color-text)",
          }}
        >
          Paris Móviles
        </Link>

        <span className="pm-nav-links" style={{ display: "flex", alignItems: "center", gap: 22 }}>
          {links.map((l) => (
            <Link key={l.href} href={l.href}>
              {l.label}
            </Link>
          ))}
        </span>

        <button
          type="button"
          onClick={toggle}
          className="pm-chip"
          style={{ padding: "6px 11px" }}
          aria-label="Toggle language"
        >
          {lang === "en" ? "ES" : "EN"}
        </button>

        <Link
          href="/cart"
          onClick={() => setOpen(false)}
          className="pm-hd"
          style={{ fontSize: 13, letterSpacing: "0.05em", color: "var(--color-text)", whiteSpace: "nowrap" }}
        >
          {s.nav_cart} · {cartCount}
        </Link>

        <Link
          href="/admin"
          className="pm-nav-admin"
          style={{ fontSize: 11, color: "color-mix(in srgb, var(--color-text) 45%, transparent)" }}
        >
          {s.nav_admin}
        </Link>

        <button
          type="button"
          className="pm-burger"
          onClick={() => setOpen((o) => !o)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
        >
          {open ? <X size={20} strokeWidth={1.8} /> : <Menu size={20} strokeWidth={1.8} />}
        </button>
      </div>

      {/* Mobile dropdown menu */}
      <div className={`pm-mobile-menu${open ? " open" : ""}`}>
        {links.map((l) => (
          <Link key={l.href} href={l.href} onClick={() => setOpen(false)}>
            {l.label}
          </Link>
        ))}
        <Link href="/admin" onClick={() => setOpen(false)}>
          {s.nav_admin}
        </Link>
      </div>
    </nav>
  );
}
