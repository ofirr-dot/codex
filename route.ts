import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "תיק השקעות | Ofir",
  description: "דשבורד תיק השקעות פרטי"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="he" dir="rtl">
      <body>{children}</body>
    </html>
  );
}
