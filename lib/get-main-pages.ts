import slugify from "slugify";
import { resolveRootPageData } from "./resolve-root-page-data";
import { Pages } from "./types";

export const getMainPages = async () => {
  const data = await resolveRootPageData();
  const pages: Pages = {
    home: { href: "/", notionId: process.env.PAGE_ID as string },
  };

  //
  data.results.map((page: any) => {
    if (page.type.startsWith("child_")) {
      const child_field = page.type;

      if (child_field in page) {
        pages[page[child_field].title.toLowerCase()] = {
          href: "/" + slugify(page[child_field].title).toLowerCase(),
          notionId: page.id,
        };
      }
    }
  });
  return pages;
};
