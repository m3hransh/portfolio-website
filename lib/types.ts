import { ExtendedRecordMap } from "notion-types";

export interface Page {
  title: string;
  notionId: string | null | undefined;
}
export type Pages = Array<Page>;

export interface BlogItem {
  id: string;
  name: string;
  cover?: string;
  author?: {
    name: string;
    avatar_url: string | null;
  } | null;
  description?: string | null;
  last_edited_time: string | null;
  tags?: string[];
}

export interface ProjectItem {
  id: string;
  name: string;
  description: string | null;
  cover?: string;
  contributors: { name: string | null; avatar_url: string | null }[];
  start_time: string | null;
  finish_time: string | null;
  tags: string[];
}
export type ProjectItems = Array<ProjectItem>;
export type BlogItems = Array<BlogItem>;

export type MainPageProps =
  | {
      type: "blog";
      pageData: BlogItems;
      pages: Pages;
    }
  | { type: "projects"; pages: Pages; pageData: ProjectItems }
  | { type: "courses"; pages: Pages; pageData: {} }
  | { type: "about"; pages: Pages; pageData: ExtendedRecordMap };
