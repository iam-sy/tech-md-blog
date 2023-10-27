import { ReactNode } from "react";
import matter from "gray-matter";

export interface Menu {
  text: string;
  menus: Menu[];
}
export interface CardProps {
  image?: string;
  title: string;
  content: ReactNode | string;
  update: string;
  slug: string;
  tag: string[];
  measure?(): void;
}
export interface CardListProps {
  list: CardProps[];
}

export interface MarkdownPostProps {
  post: string;
}

export interface PostMenusProps {
  menus: Menu[];
}

export interface PostClientProps {
  content: string;
  title: string;
  update: string;
  tags: string;
}
