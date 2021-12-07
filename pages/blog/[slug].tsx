import { error } from "console";
import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { resolveBlogPage } from "../../lib/resolve-blog-page";
import { resolveRootPageData } from "../../lib/resolve-root-page-data";
import slugify from "slugify";
import { resolveMainPage } from "../../lib/resolve-main-page";
import { ParsedUrlQuery } from "querystring";
import { NotionAPI } from "notion-client";
import { ExtendedRecordMap } from "notion-types";
import NotionPage from "../../components/NotionPage";
import Container from "../../components/Container";
import { Pages } from "../../lib/types";
import { getMainPages } from "../../lib/get-main-pages";

const BlogPost: NextPage<BlogPostProps> = ({ recordMap, pages }) => {
  return (
    <Container pages={pages}>
      <NotionPage recordMap={recordMap} />
    </Container>
  );
};
interface BlogPostProps {
  recordMap: ExtendedRecordMap;
  pages: Pages;
}
interface Params extends ParsedUrlQuery {
  slug: string;
}
export const getStaticProps: GetStaticProps<BlogPostProps, Params> =
  async ({ params }) => {
    const pages: Pages = await getMainPages();
    const blog_id = pages.find((p) => p.title === "blog")?.notionId;
    if (!blog_id) return { notFound: true };
    const blogItems = await resolveBlogPage(blog_id);
    const post = blogItems.find(
      (item) => slugify(item.name).toLowerCase() === params?.slug
    );
    if (!post) return { notFound: true };
    const notion = new NotionAPI();
    const recordMap = await notion.getPage(post.id);
    // console.log(recordMap);

    return { props: { recordMap, pages } };
  };

export const getStaticPaths: GetStaticPaths = async () => {
  const { block } = await resolveMainPage("blog");
  const blog_id = block?.id;
  if (!blog_id) throw error("There is blog page in root notion page");
  const blogItems = await resolveBlogPage(blog_id);
  const paths = blogItems.map((item) => ({
    params: { slug: slugify(item.name).toLowerCase() },
  }));
  // console.log(paths);
  return { paths, fallback: "blocking" };
};
export default BlogPost;
