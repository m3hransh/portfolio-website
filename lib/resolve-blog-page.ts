import { Client } from "@notionhq/client";
import { BlogItems } from "./types";

export const resolveBlogPage = async (
  database_id: string,
  notion?: Client
) => {
  if (!notion) {
    notion = new Client({
      auth: process.env.NOTION_SECRET,
    });
  }

  const page = await notion.databases.query({
    database_id: database_id,
  });
  const blogItems: BlogItems = [];
  page.results.forEach((el) => {
    blogItems.push({
      id: el.id,
      name: (el.properties.name.type === "title" &&
        el.properties.name?.title[0].plain_text) as string,
      cover: el.cover
        ? el.cover?.type === "external"
          ? el.cover.external.url
          : el.cover?.file.url
        : null,
      author:
        el.properties.author.type === "created_by"
          ? {
              name: el.properties.author.created_by.id,
              avatar_url:
                "avatar_url" in el.properties.author.created_by
                  ? el.properties.author.created_by.avatar_url
                  : null,
            }
          : null,
      description:
        el.properties.description.type === "rich_text" &&
        el.properties.description.rich_text[0]
          ? el.properties.description.rich_text[0]?.plain_text
          : null,
      date:
        el.properties.created_time.type === "created_time"
          ? el.properties.created_time.created_time
          : null,
      tags:
        el.properties.tags.type === "multi_select"
          ? el.properties.tags.multi_select.map((e) => e.name)
          : [],
    });
  });

  return blogItems;
};
