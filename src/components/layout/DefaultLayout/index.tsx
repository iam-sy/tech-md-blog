"use client";

import React, { ReactNode } from "react";
import Nav from "@/components/navigaition/Nav";

interface DefaultLayoutProps {
  children: ReactNode;
}

function DefaultLayout({ children }: DefaultLayoutProps) {
  return (
    <div className="w-[1408px] mx-auto">
      <div className="relative" style={{ zIndex: 1 }}>
        <Nav />
      </div>
      <main
        className="prose prose-xl prose-slate dark:prose-invert"
        style={{ zIndex: 0 }}
      >
        {children}
      </main>
    </div>
  );
}

export default DefaultLayout;
