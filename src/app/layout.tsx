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
      <body className="bg-zinc-950 w-[1408px] mx-auto">
        <DefaultLayout>{children}</DefaultLayout>
      </body>
    </html>
  );
}
