"use client";

import React, { useCallback } from "react";

function LoginClient() {
  const inputClass = "w-full bg-transparent text-l text-gray-400 py-2";
  const rowClass = "border-b-[1px] border-b-gray-500 mb-8";

  const handleSubmit = useCallback(() => {
    console.log("submit");
  }, []);

  return (
    <div className="absolute left-0 right-0 bottom-0 top-0">
      <div
        className="relative w-[480px] m-auto mt-60 bg-zinc-800 bg-opacity-70 rounded p-14 shadow-md shadow-zinc-950"
        style={{ zIndex: 1 }}
      >
        <form onSubmit={handleSubmit}>
          <div className={rowClass}>
            <input
              type="text"
              className={inputClass}
              placeholder="아이디를 입력하세요"
            />
          </div>
          <div className={rowClass}>
            <input
              type="text"
              className={inputClass}
              placeholder="비밀번호를 입력하세요"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-teal-500 text-white p-2 rounded"
          >
            로그인
          </button>
        </form>
      </div>
      <div
        className="absolute left-0 right-0 bottom-0 top-0"
        style={{
          backgroundImage:
            "url(https://source.unsplash.com/random/300x300/?programming)",
          backgroundSize: "cover",
          filter: "brightness(10%)",
          zIndex: 0,
          //backdropFilter: "grayscale(100%)",
        }}
      ></div>
    </div>
  );
}

export default LoginClient;
