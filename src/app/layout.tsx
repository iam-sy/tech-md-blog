import type { Metadata } from "next";
import "./globals.css";
import DefaultLayout from "@/components/layout/DefaultLayout";

export const metadata: Metadata = {
  title: "M.log",
  description: "M.log",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body className="dark:bg-zinc-950">{children}</body>
    </html>
  );
}
