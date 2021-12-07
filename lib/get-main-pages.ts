import { resolveRootPageData } from "./resolve-root-page-data";
import { Pages } from "./types";

export const getMainPages = async () => {
  const data = await resolveRootPageData();
  const pages: Pages = [{ title: "home", notionId: process.env.PAGE_ID }];

  //
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
  return pages;
};
