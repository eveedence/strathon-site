import type React from "react";
import type { Metadata } from "next";
import "./globals.css";
import "@/design-system/eveedence.css";

export const metadata: Metadata = {
  title: "Eveedence — Custo da Prova",
  description: "Quando alguém pedir para provar, não comece do zero. Explore o esforço de reconstruir decisões, incidentes e controles.",
  icons: { icon: "/brand/eveedence-logotipo.svg" },
};
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="pt-BR" data-theme="light"><body>{children}</body></html>;
}
