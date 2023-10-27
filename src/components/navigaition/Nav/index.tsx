"use client";

import Link from "next/link";
import React from "react";
import Search from "./search.svg";
import Log from "./log.svg";

function Nav() {
  return (
    <nav className="nav mx-4 py-4">
      <div className="flex justify-between items-center">
        <h1 className="text-white">
          <Link href="/">
            <Log />
            <span className="screen-out">홈으로 가기</span>
          </Link>
        </h1>
        <Link
          href="/search?keyword="
          className="text-white hover:bg-zinc-800 p-2 rounded-full"
        >
          <Search className="w-[30px] h-[30px]" />
          <span className="screen-out">검색</span>
        </Link>
      </div>
    </nav>
  );
}

export default Nav;
