import { Client } from "@notionhq/client";
import { BlogItems } from "./types";

export const resolveMainPage = async (page_name: string, notion?: Client) => {
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
      block.type.startsWith("child_") && block[block.type].title === page_name
  );
  return block;
};
