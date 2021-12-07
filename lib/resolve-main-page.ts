import { Client } from "@notionhq/client";
import slugify from "slugify";
import { Pages } from "./types";

export const resolveMainPage = async (
  page_name: string,
  notion?: Client
) => {
  if (!notion) {
    notion = new Client({
      auth: process.env.NOTION_SECRET,
    });
  }
  const data = await notion.blocks.children.list({
    block_id: process.env.PAGE_ID as string,
  });

  const block = data.results.find(
    (block: any) =>
      block.type.startsWith("child_") &&
      slugify(block[block.type].title).toLowerCase() === page_name
  );
  // get other pages as well
  const pages: Pages = [{ title: "home", notionId: process.env.PAGE_ID }];

  data.results.map((page: any) => {
    if (page.type.startsWith("child_")) {
      const child_field = page.type;

      if (child_field in page) {
        pages.push({
          title: page[child_field].title.toLowerCase(),
          notionId: page.id,
        });
      }
    }
  });
  return { block, pages };
};
