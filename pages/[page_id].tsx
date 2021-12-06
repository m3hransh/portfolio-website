import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { ParsedUrlQuery } from "querystring";
import Link from "next/link";
import { resolveRootPageData } from "../lib/resolve-root-page-data";
import Blog from "../components/Blog";
import Projects from "../components/Projects";
import Courses from "../components/Courses";
import About from "../components/About";
import { Client } from "@notionhq/client";
import { resolveBlogPage } from "../lib/resolve-blog-page";
import { MainPageProps } from "../lib/types";
import { resolveMainPage } from "../lib/resolve-main-page";
import { resolveProjectPage } from "../lib/resolve-project-page";
import { resolveAboutPage } from "../lib/resolve-about-page";
import NotionPage from "../components/NotionPage";

const MainPage: NextPage<MainPageProps> = (props) => {
  return (
    <div>
      <Link href="/">
        <a>Home</a>
      </Link>
      {props.type === "blog" ? (
        <Blog blogItems={props.pageData} />
      ) : props.type === "projects" ? (
        <Projects projectItems={props.pageData} />
      ) : props.type === "courses" ? (
        <Courses />
      ) : props.type === "about" ? (
        <NotionPage recordMap={props.pageData} />
      ) : null}
    </div>
  );
};

interface Params extends ParsedUrlQuery {
  page_id: string;
}

export const getStaticProps: GetStaticProps<MainPageProps, Params> = async ({
  params,
}) => {
  const notion = new Client({
    auth: process.env.NOTION_SECRET,
  });

  const block = await resolveMainPage(params?.page_id as string, notion);
  // console.log(block);
  // console.log(page.results);
  if (!block) {
    return { notFound: true };
  }
  let mainPageProps: MainPageProps;
  if (
    block?.type === "child_database" &&
    block.child_database.title === "blog"
  ) {
    mainPageProps = {
      type: "blog",
      pageData: await resolveBlogPage(block.id, notion),
    };
  } else if (block.type === "child_database" && "projects") {
    mainPageProps = {
      type: "projects",
      pageData: await resolveProjectPage(block.id, notion),
    };
  } else if (block.type === "child_database" && "courses") {
    // mainPageProps = {
    //   type: "courses",
    //   pageData: {},
    // };
    // TODO: add course page
    return { notFound: true };
  } else if (block.type === "child_page" && "about") {
    mainPageProps = {
      type: "about",
      pageData: await resolveAboutPage(block.id),
    };
  } else {
    return { notFound: true };
  }
  // TODO error
  // if (!pageData) return null;

  return {
    props: {
      ...mainPageProps,
    },
    revalidate: 10,
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const data = await resolveRootPageData();
  // Get only notion pages or databases
  const pages = data.results.filter((block) => block.type.startsWith("child_"));
  // Return all the title of pages
  const paths = pages.map((page: any) => ({
    params: { page_id: page[page.type].title },
  }));

  // We'll pre-render only these paths at build time.
  // { fallback: blocking } will server-render pages
  // on-demand if the path doesn't exist.
  return { paths, fallback: "blocking" };
};

export default MainPage;
