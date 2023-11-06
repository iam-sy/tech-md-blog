import fs from "fs";
import matter from "gray-matter";
import path from "path";
import { cutByteLength, getUpdateTime } from "@/libs/utils";
import { CardProps } from "@/types/component/post";

const getPostMetadata = (): CardProps[] => {
  const folder = path.resolve("src/contents");

  const files = fs
    .readdirSync(folder)
    .map((filename) => ({
      filename,
      updateTime: fs.statSync(`${folder}/${filename}`).mtime,
    }))
    .sort((a, b) => b.updateTime.valueOf() - a.updateTime.valueOf());
  const markdownPosts = files.filter((file) => file.filename.endsWith(".md"));
  // Get gray-matter data from each file.
  const posts = markdownPosts.map((file) => {
    const fileContents = fs.readFileSync(`${folder}/${file.filename}`, "utf8");
    const matterResult = matter(fileContents);

    return {
      title: matterResult.data.title,
      image: matterResult.data.image,
      update: getUpdateTime(file.updateTime),
      content: cutByteLength(matterResult.content, 140),
      tag: matterResult.data.tags?.split(","),
      slug: file.filename.replace(".md", ""),
    };
  });
  return posts;
};

export default getPostMetadata;
