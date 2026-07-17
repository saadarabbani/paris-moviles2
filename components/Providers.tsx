"use client";

import type { ReactNode } from "react";
import { LangProvider } from "@/lib/i18n";
import { StoreProvider } from "@/lib/store";

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <LangProvider>
      <StoreProvider>{children}</StoreProvider>
    </LangProvider>
  );
}
