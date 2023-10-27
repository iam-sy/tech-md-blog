import fs from "fs";
import matter from "gray-matter";
import getPostMetadata from "@/libs/getPostMetadata";
import path from "path";
import React from "react";
import PostClient from "@/app/post/[slug]/client";

const getPostContent = (slug: string) => {
  const folder = path.resolve("src/contents");
  const file = `${folder}/${slug}.md`;
  const content = fs.readFileSync(file, "utf8");
  const matterResult = matter(content);
  return matterResult;
};

export const generateStaticParams = async () => {
  const posts = getPostMetadata();
  return posts.map((post) => ({
    slug: post.slug,
  }));
};

const PostPage = (props: any) => {
  const slug = decodeURIComponent(props.params.slug);
  const post = getPostContent(slug);
  return (
    <PostClient
      title={post.data.title}
      update={post.data.update}
      tags={post.data.tags}
      content={post.content}
    />
  );
};

export default PostPage;
