"use client";

import React from "react";
import type { PostMenusProps } from "@/types/component/post";

function PostMenus({ menus }: PostMenusProps) {
  return (
    <div>
      {menus && (
        <div className="absolute left-[100%]">
          <div className="fixed top-[100px] ml-8">
            <ul className="w-[240px]">
              {menus.map((menu) => {
                return (
                  <li key={menu.text}>
                    <a href={`#${menu.text}`} className="text-gray-300 text-sm">
                      {menu.text}
                    </a>
                    {menu.menus.length > 0 && (
                      <ul className="py-2">
                        {menu.menus.map((submenu) => (
                          <li key={submenu.text} className="pl-4">
                            <a
                              href={`#${submenu.text}`}
                              className="text-gray-300 text-sm"
                            >
                              {submenu.text}
                            </a>
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}

export default PostMenus;
