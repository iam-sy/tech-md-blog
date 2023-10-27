import React, { ReactNode } from "react";
import Nav from "@/components/navigaition/Nav";

interface DefaultLayoutProps {
  children: ReactNode;
}

function DefaultLayout({ children }: DefaultLayoutProps) {
  return (
    <>
      <Nav />
      <main className="prose prose-xl prose-slate dark:prose-invert">
        {children}
      </main>
    </>
  );
}

export default DefaultLayout;
