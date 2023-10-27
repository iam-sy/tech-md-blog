import { ReactNode } from "react";
import { CardProps } from "@/types/component/post";

export interface SearchCardProps {
  image?: string;
  title: string;
  content: ReactNode | string;
  update: string;
  slug: string;
  measure?(): void;
}

export interface SearchCardListProps {
  keyword?: string;
  tag?: string;
  list?: CardProps[];
}
