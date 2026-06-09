import type { Metadata } from "next";
import { ReactNode } from "react";
import "./globals.css";

export const metadata: Metadata = {
  title: "MLP Library",
  description: "Система управления библиотекой на Next.js"
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ru">
      <body className="bg-slate-50">
        <main className="mx-auto max-w-6xl px-4 py-8">
          {children}
        </main>
      </body>
    </html>
  );
}
