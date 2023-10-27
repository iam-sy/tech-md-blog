"use client";

import ReactMarkdown from "react-markdown";
const SyntaxHighlighter = dynamic(
  () => import("react-syntax-highlighter/dist/esm/prism-async"),
  { ssr: true }
);
import remarkGfm from "remark-gfm";
import vscDarkPlus from "react-syntax-highlighter/dist/cjs/styles/prism/vsc-dark-plus";
import Image from "next/image";
import type { MarkdownPostProps } from "@/types/component/post";
import dynamic from "next/dynamic";

export default function MarkDownPost({ post }: MarkdownPostProps) {
  return (
    <div className="relative">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]} // Allows us to have embedded HTML tags in our markdown
        components={{
          code({ node, className, children, ...props }) {
            const match = /language-(\w+)/.exec(className || "");
            return match ? (
              <SyntaxHighlighter
                language={match[1] as string}
                style={vscDarkPlus}
              >
                {String(children).replace(/\n$/, "")}
              </SyntaxHighlighter>
            ) : (
              <code {...props}>{children}</code>
            );
          },
          img: (image) => (
            <Image
              src={image.src || ""}
              alt={image.alt || ""}
              width={768}
              height={300}
            />
          ),
          h2: ({ children }) => {
            return <h2 id={String(children)}>{children}</h2>;
          },
          h3: ({ children }) => {
            return <h3 id={String(children)}>{children}</h3>;
          },
        }}
      >
        {post}
      </ReactMarkdown>
    </div>
  );
}
