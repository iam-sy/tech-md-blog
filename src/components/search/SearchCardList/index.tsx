"use client";

import React, {
  KeyboardEventHandler,
  memo,
  useCallback,
  useEffect,
  useMemo,
  useRef,
} from "react";
import {
  AutoSizer,
  CellMeasurer,
  CellMeasurerCache,
  List,
  WindowScroller,
} from "react-virtualized";
import { ListRowRenderer } from "react-virtualized/dist/es/List";
import SearchCard from "@/components/search/SearchCard";
import { useRouter } from "next/navigation";
import type { SearchCardListProps } from "@/types/component/search";

function SearchCardList({ keyword, tag, list }: SearchCardListProps) {
  const inputRef = useRef(null);
  const listRef = useRef(null);
  const router = useRouter();
  const cache = useMemo(() => {
    return new CellMeasurerCache({
      fixedWidth: true,
      defaultHeight: 300,
    });
  }, []);

  const rowRenderer: ListRowRenderer = useCallback(
    ({ index, key, style, parent }) => {
      if (!list) return;
      const data = list[index];
      if (!data) return null;
      return (
        <CellMeasurer
          cache={cache}
          parent={parent}
          rowIndex={index}
          key={`search-${key}`}
        >
          <div
            className="py-10 first:pt-0 border-b-[1px] border-gray-700"
            style={{
              left: style.left,
              top: style.top,
              position: style.position,
              width: style.width,
              display: "flex",
              flex: 1,
              height: style.height,
            }}
          >
            <SearchCard {...data} />
          </div>
        </CellMeasurer>
      );
    },
    [cache, list],
  );

  const updateRowHeight = useCallback(() => {
    if (!listRef) {
      return;
    }
    cache.clearAll();
  }, [cache]);

  const handleSearch = useCallback<KeyboardEventHandler>(
    (e) => {
      if (!inputRef.current) return;
      if (e.key === "Enter") {
        router.push(
          `/search?keyword=${(inputRef.current as HTMLInputElement).value}`,
        );
      }
    },
    [router],
  );

  useEffect(() => {
    cache.clearAll();
    window.addEventListener("resize", () => updateRowHeight());
    return () => window.removeEventListener("resize", updateRowHeight);
  }, [cache, updateRowHeight]);

  return (
    <div className="flex-1 w-[736px] m-auto pt-8">
      {!tag ? (
        <input
          ref={inputRef}
          name="keyword"
          type="text"
          defaultValue={keyword}
          placeholder="검색어 입력"
          className="bg-transparent text-white text-3xl border p-4 w-full"
          onKeyUp={handleSearch}
          autoComplete="off"
          autoFocus
        />
      ) : (
        <p className="text-4xl text-white pb-4"> # {tag}</p>
      )}

      {list && list.length > 0 ? (
        <WindowScroller>
          {({ scrollTop, isScrolling, onChildScroll }) => (
            <div className="w-full pt-8">
              <div className="w-full">
                <AutoSizer defaultWidth={736} defaultHeight={800}>
                  {({ width, height }) => {
                    return (
                      <div
                        style={{
                          width: width,
                        }}
                      >
                        <List
                          autoHeight
                          width={width}
                          height={900}
                          scrollTop={scrollTop}
                          isScrolling={isScrolling}
                          onScroll={onChildScroll}
                          noContentRenderer={() => <div>No cells</div>}
                          rowRenderer={rowRenderer}
                          rowHeight={cache.rowHeight}
                          rowCount={list.length}
                          overscanRowCount={1}
                          style={{ overflowX: "auto" }}
                        />
                      </div>
                    );
                  }}
                </AutoSizer>
              </div>
            </div>
          )}
        </WindowScroller>
      ) : (
        <p className="text-center text-slate-300 text-2xl pt-10 ">
          {(keyword || tag) && "검색결과가 없습니다."}
        </p>
      )}
    </div>
  );
}
export default memo(SearchCardList);
