"use client";

import dynamic from "next/dynamic";
import React, { createElement, useEffect, useState } from "react";
const PostMenus = dynamic(() => import("@/components/post/PostMenus"));
import MarkDownPost from "@/components/post/MarkdownPost";
import Link from "next/link";
import type { PostClientProps } from "@/types/component/post";
import type { Menu } from "@/types/component/post";
import { parseHeadings } from "@/libs/utils";
import { renderToStaticMarkup } from "react-dom/server";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

function PostClient({ tags, title, content, update }: PostClientProps) {
  const tagList = tags?.split(",");
  const [menus, setMenus] = useState<Menu[]>();

  let htmlString = renderToStaticMarkup(
    createElement(
      "div",
      null,
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          code({ node, className, children, ...props }) {
            return <code {...props}>{children}</code>;
          },
        }}
      >
        {content}
      </ReactMarkdown>,
    ),
  );

  useEffect(() => {
    const heading = parseHeadings(htmlString);
    setMenus(heading);
  }, [htmlString]);

  return (
    <div className="max-w-[768px] m-auto">
      <div className="mt-12 mb-6 text-center">
        <h1 className="text-3xl text-slate-300">{title}</h1>
        <p className="text-slate-400 mt-2">{update}</p>
      </div>

      <div className="my-6">
        {tagList?.map((tag: string) => (
          <Link
            href={`/search?tag=${tag}`}
            key={tag}
            className="inline-block bg-zinc-800 text-teal-500 px-4 py-2 rounded-3xl first:ml-0 ml-4"
            prefetch={false}
          >
            {tag}
          </Link>
        ))}
      </div>

      <div className="relative">
        {menus && <PostMenus menus={menus} />}
        <article className="text-gray-400 markdown-body">
          <MarkDownPost post={content} />
        </article>
      </div>

      <div className="text-center py-10">
        <Link
          href="/"
          className="inline-block bg-teal-500 text-white p-4 rounded"
        >
          목록으로 가기
        </Link>
      </div>
    </div>
  );
}

export default PostClient;
