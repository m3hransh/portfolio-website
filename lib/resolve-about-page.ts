import { NotionAPI } from "notion-client";

export const resolveAboutPage = async (page_id: string) => {
  const notion = new NotionAPI();
  const recordMap = await notion.getPage(page_id);
  return recordMap;
};
