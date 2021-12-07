import type { NextPage, GetStaticProps } from "next";
import { Client } from "@notionhq/client";
import Link from "next/link";
import { Pages } from "../lib/types";
import { resolveRootPageData } from "../lib/resolve-root-page-data";
import Container from "../components/Container";
import { getMainPages } from "../lib/get-main-pages";
import Image from "next/image";

interface Props {
  pages: Pages;
}
const Home: NextPage<Props> = ({ pages }) => {
  // console.log(page);
  return (
    <Container pages={pages}>
      <main className="max-w-2xl mx-auto px-4 h-screen mt-5">
        <div className="flex flex-col sm:flex-row-reverse ">
          <div className="w-[20px] sm:w-[200px] relative mb-8 sm:mb-0 mr-auto">
            <Image
              alt="MohammadMehran Shahidi"
              height={230}
              width={230}
              src="/avatar.svg"
              className="rounded-full filter grayscale"
            />
          </div>
          <div className="flex flex-col pr-8">
            <h1 className="font-bold text-3xl md:text-5xl tracking-tight mb-1 text-black dark:text-white">
              Mehran Shahidi
            </h1>
            <h2 className="text-gray-700 dark:text-gray-200 mb-4">
              Software Engineer & Noobie Writer{" "}
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-16">
              I am studying computer science, developing software projects,
              reflecting on life and writing about it.
            </p>
          </div>
        </div>
        <h3 className="font-bold text-2xl md:text-4xl tracking-tight mb-6 text-black dark:text-white">
          Recent Posts
        </h3>
      </main>
    </Container>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  // Get children blocks of the root page
  const pages: Pages = await getMainPages();

  return {
    props: {
      pages,
    },
  };
};
export default Home;
