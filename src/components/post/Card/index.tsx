"use client";

import React, { memo } from "react";
import Link from "next/link";
import Image from "next/image";
import type { CardProps } from "@/types/component/post";

function Card({ image, title, content, update, slug }: CardProps) {
  return (
    <Link
      href={`post/${slug}`}
      className="card flex flex-col flex-1 m-4 justify-between shadow-xl bg-zinc-900 rounded overflow-hidden transition-transform hover:translate-y-[-10px]"
    >
      {image && (
        <div className="relative pt-[52.1921%]">
          <Image
            src={image}
            fill
            alt={""}
            style={{ width: "100%", objectFit: "cover" }}
          />
        </div>
      )}
      <div className="flex flex-1 flex-col p-4">
        <p className="text-gray-200 text-ellipsis overflow-hidden block whitespace-nowrap">
          {title}
        </p>
        <p className="pt-2 text-gray-400 text-sm line-clamp-3">{content}</p>
      </div>
      <div className="px-4 py-2 border-t-[1px] border-gray-700">
        <p className="text-gray-600 text-xs">{update}</p>
      </div>
    </Link>
  );
}

Card.displayName = "Card";

export default memo(Card);
