"use client";

import {
  Smartphone,
  BatteryCharging,
  Droplets,
  Cable,
  LockOpen,
  DatabaseBackup,
  type LucideIcon,
} from "lucide-react";
import { useLang } from "@/lib/i18n";
import { useStore } from "@/lib/store";
import { ISSUE_KEYS, money, type IssueKey } from "@/lib/data";

type Svc = { t: string; d: string; w: string };

const ICONS: Record<IssueKey, LucideIcon> = {
  screen: Smartphone,
  battery: BatteryCharging,
  water: Droplets,
  port: Cable,
  unlock: LockOpen,
  data: DatabaseBackup,
};

export default function RepairServices() {
  const { t } = useLang();
  const { prices } = useStore();
  const s = t as Record<string, string>;
  const svc = (t as unknown as { svc: Svc[] }).svc;

  return (
    <div className="repair-grid">
      {svc.map((sv, i) => {
        const key = ISSUE_KEYS[i];
        const Icon = ICONS[key];
        return (
          <article key={key} className="repair-card">
            <span className="repair-card__icon">
              <Icon size={22} strokeWidth={1.5} aria-hidden />
            </span>
            <h3 className="pm-hd repair-card__title">{sv.t}</h3>
            <p className="repair-card__desc">{sv.d}</p>
            <div className="repair-card__foot">
              <div>
                <div className="repair-card__from">{s.q_estimate}</div>
                <div className="pm-hd repair-card__price">
                  {money(prices[key]).replace("€", "from €")}
                </div>
              </div>
              <span className="repair-card__eta">{sv.w}</span>
            </div>
          </article>
        );
      })}
    </div>
  );
}
