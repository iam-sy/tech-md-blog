"use client";

import React, {
  ChangeEventHandler,
  KeyboardEventHandler,
  useCallback,
  useRef,
  useState,
} from "react";
import Link from "next/link";
import Editor from "@/components/post/Editor";
import MarkdownPost from "@/components/post/MarkdownPost";

function WriteClient() {
  const inputTitleRef = useRef(null);
  const inputTagRef = useRef(null);
  const inputThumbRef = useRef(null);
  const [content, setContent] = useState("");
  const [tags, setTags] = useState<string[]>();

  const handleChange = useCallback<ChangeEventHandler<HTMLTextAreaElement>>(
    (e) => {
      const { value } = e.currentTarget;
      setContent(value);
    },
    [],
  );

  const handleTagInput = useCallback<KeyboardEventHandler<HTMLInputElement>>(
    (e) => {
      console.log(e);
    },
    [],
  );

  const handleTagChange = useCallback<ChangeEventHandler<HTMLInputElement>>(
    (e) => {
      console.log(e);
    },
    [],
  );

  return (
    <div className="flex flex-col w-full h-[100vh] overflow-hidden">
      <div className="flex w-full h-full min-h-0">
        <div className="flex flex-col flex-1 dark:bg-zinc-900 p-8 h-max-[calc(100vh_-_72px)]">
          <div className="pb-6">
            <input
              type="text"
              ref={inputTitleRef}
              className="bg-transparent w-full text-4xl text-white"
              placeholder="제목을 입력하세요"
            />
          </div>
          <div className="flex py-2">
            <input
              type="text"
              className="w-full bg-transparent text-xl text-white"
              placeholder="썸네일 경로를 입력하세요"
              ref={inputThumbRef}
            />
          </div>
          <div className="flex py-2">
            <div>test1</div>
            <input
              type="text"
              className="min-w-[200px] bg-transparent w-full text-2xl text-white"
              placeholder="태그를 입력하세요"
              onKeyDown={handleTagInput}
              ref={inputTagRef}
            />
          </div>
          <div className="flex-1 py-4">
            <Editor onChange={handleChange} value={content} />
          </div>
        </div>
        <div className="markdown-body text-gray-400 flex-1 p-8 cus-scroll overflow-auto">
          <MarkdownPost post={content} />
        </div>
      </div>
      <div className="flex justify-center gap-4 py-4 mt-auto">
        <Link
          href="/"
          className="inline-block bg-teal-500 text-white p-2 rounded"
          prefetch={false}
        >
          목록으로 가기
        </Link>
        <Link
          href="/"
          className="inline-block bg-teal-500 text-white p-2 rounded"
          prefetch={false}
        >
          저장하기
        </Link>
      </div>
    </div>
  );
}

export default WriteClient;
