import React from "react";
import getPostMetadata from "@/libs/getPostMetadata";
import { NextAppDirPageProps } from "@/types/global";
import SearchCardList from "@/components/search/SearchCardList";
import { CardProps } from "@/types/component/post";

export const revalidate = 0;

function SearchPage({ searchParams }: NextAppDirPageProps) {
  const { keyword, tag } = searchParams;
  let postMetadata: CardProps[] | undefined = getPostMetadata();

  if (!keyword && !tag) {
    postMetadata = undefined;
  }

  if (keyword) {
    postMetadata = postMetadata?.filter(
      (meta) => meta.content?.toString().includes(keyword),
    );
  }

  if (tag) {
    postMetadata = postMetadata?.filter((meta) => meta.tag.includes(tag));
  }

  return <SearchCardList keyword={keyword} tag={tag} list={postMetadata} />;
}

export default SearchPage;
