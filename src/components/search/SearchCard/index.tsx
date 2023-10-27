"use client";

import React, { memo } from "react";
import Link from "next/link";
import Image from "next/image";
import type { SearchCardProps } from "@/types/component/search";

function SearchCard({ image, title, content, update, slug }: SearchCardProps) {
  return (
    <Link
      href={`post/${slug}`}
      className="card flex flex-col flex-1 justify-between overflow-hidden transition-transform"
    >
      {image && (
        <div className="relative pt-[52.1921%] mb-4">
          <Image
            src={image}
            fill
            alt={""}
            style={{ width: "100%", objectFit: "cover" }}
          />
        </div>
      )}
      <div className="flex flex-1 flex-col">
        <p className="text-2xl text-gray-200 text-ellipsis overflow-hidden block whitespace-nowrap">
          {title}
        </p>
        <p className="pt-2 text-gray-400 text-m line-clamp-3">{content}</p>
      </div>
      <p className="text-gray-600 text-xs pt-4">{update}</p>
    </Link>
  );
}

SearchCard.displayName = "SearchCard";

export default memo(SearchCard);
