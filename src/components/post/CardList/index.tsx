"use client";

import React, { memo, useCallback, useEffect, useMemo, useRef } from "react";

import Card from "@/components/post/Card";
import {
  AutoSizer,
  CellMeasurerCache,
  Grid,
  WindowScroller,
} from "react-virtualized";
import { GridCellRenderer } from "react-virtualized/dist/es/Grid";
import Link from "next/link";
import type { CardListProps } from "@/types/component/post";

const COLUMN_COUNT = 4;

function CardList({ list }: CardListProps) {
  const listRef = useRef(null);

  const tags = useMemo(() => {
    const tagSet = new Set<string>();
    list.forEach(({ tag }) => {
      tag.forEach((str: string) => {
        tagSet.add(str);
      });
    });
    return Array.from(tagSet);
  }, [list]);

  const cellRenderer: GridCellRenderer = useCallback(
    ({ columnIndex, key, rowIndex, style }) => {
      const index = rowIndex * COLUMN_COUNT + columnIndex;
      const data = list[index];
      if (!data) return null;
      return (
        <div
          key={key}
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
          <Card {...data} />
        </div>
      );
    },
    [list],
  );

  const cache = useMemo(() => {
    return new CellMeasurerCache({
      fixedWidth: true,
      defaultHeight: 348,
    });
  }, []);

  const updateRowHeight = useCallback(() => {
    if (!listRef) {
      return;
    }
    cache.clearAll();
  }, [cache]);

  useEffect(() => {
    cache.clearAll();
    window.addEventListener("resize", () => updateRowHeight());
    return () => window.removeEventListener("resize", updateRowHeight);
  }, [cache, updateRowHeight]);

  return (
    <div className="flex-1 w-[1408px] m-auto pt-8">
      <div className="mx-4 mb-2 overflow-auto">
        {tags.map((tag) => (
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
      <WindowScroller>
        {({ scrollTop, isScrolling, onChildScroll }) => (
          <div className="w-full">
            <div className="w-full">
              {/*<p className="mt-12 mb-12 text-3xl text-center dark:text-white">
                Hello and Welcome 👋&nbsp;
                <span className="whitespace-nowrap ">
                  I&lsquo;m <span className="font-bold">Moon</span>.
                </span>
              </p>*/}
              <AutoSizer defaultWidth={1408} defaultHeight={800}>
                {({ width, height }) => {
                  return (
                    <div
                      style={{
                        width: width,
                      }}
                    >
                      <Grid
                        ref={listRef}
                        autoHeight
                        width={width}
                        height={900}
                        scrollTop={scrollTop}
                        isScrolling={isScrolling}
                        onScroll={onChildScroll}
                        noContentRenderer={() => <div>No cells</div>}
                        cellRenderer={cellRenderer}
                        rowHeight={cache.rowHeight}
                        rowCount={Math.ceil(list.length / COLUMN_COUNT)}
                        columnCount={COLUMN_COUNT}
                        columnWidth={width / COLUMN_COUNT}
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
    </div>
  );
}
export default memo(CardList);
