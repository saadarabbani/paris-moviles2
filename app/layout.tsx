import type { Metadata } from "next";
import "./globals.css";
import Providers from "@/components/Providers";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import ChatBot from "@/components/ChatBot";

export const metadata: Metadata = {
  title: "Paris Móviles — Phone shop & repairs",
  description:
    "Mobile phone shop and repair service. Screens, batteries, accessories and electronics — repairs in under 30 minutes with a 12-month warranty.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
        <Providers>
          <Nav />
          <main style={{ flex: 1 }}>{children}</main>
          <Footer />
          <WhatsAppButton />
          <ChatBot />
        </Providers>
      </body>
    </html>
  );
}
