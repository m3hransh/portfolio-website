import type { NextPage, GetStaticProps } from "next";
import { Client } from "@notionhq/client";
import Link from "next/link";
import { Pages } from "../lib/types";
import { resolveRootPageData } from "../lib/resolve-root-page-data";

interface Props {
  pages: Pages;
}
const Home: NextPage<Props> = ({ pages }) => {
  // console.log(page);
  return (
    <ul>
      {pages.map(({ notionId, title }) => (
        <li key={notionId}>
          <Link href={`/${title}`}>
            <a>{title}</a>
          </Link>
        </li>
      ))}
    </ul>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  // Get children blocks of the root page
  const data = await resolveRootPageData();
  const pages: Pages = [];

  //
  data.results.map((page: any) => {
    if (page.type.startsWith("child_")) {
      const child_field = page.type;

      if (child_field in page) {
        pages.push({ title: page[child_field].title, notionId: page.id });
      }
    }
  });
  // console.log(pages);
  return {
    props: {
      pages,
    },
  };
};
export default Home;
