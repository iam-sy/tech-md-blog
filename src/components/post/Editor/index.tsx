"use client";

import React, { ChangeEventHandler, memo } from "react";

export interface EditorProps {
  onChange: ChangeEventHandler<HTMLTextAreaElement>;
  value?: string;
}

const Editor = ({ onChange, value }: EditorProps) => {
  return (
    <div className="w-full h-full">
      <textarea
        autoFocus={false}
        onChange={onChange}
        value={value}
        className="w-full h-full bg-transparent resize-none text-gray-400 cus-scroll"
      />
    </div>
  );
};

export default memo(Editor);
