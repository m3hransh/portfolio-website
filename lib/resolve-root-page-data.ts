import { Client } from "@notionhq/client";

export const resolveRootPageData = async () => {
  const notion = new Client({
    auth: process.env.NOTION_SECRET,
  });

  const data = await notion.blocks.children.list({
    block_id: process.env.PAGE_ID as string,
  });

  return data;
};
