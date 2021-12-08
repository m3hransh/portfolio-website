import Link from "next/link";
import React, { FC } from "react";
import slugify from "slugify";
import { BlogItems } from "../lib/types";
import BlogPostCard from "./BlogPostCard";

interface BlogProps {
  className?: string;
  chidlren?: React.ReactNode;
  blogItems: BlogItems;
}

const Blog: FC<BlogProps> = ({ blogItems }) => {
  return (
    <main className="max-w-2xl mx-auto w-full px-4 h-screen mt-5">
      <h3 className="font-bold text-2xl md:text-4xl tracking-tight mb-6 text-black dark:text-white">
        Blog Posts
      </h3>
      <div className="flex flex-col gap-3">
        {blogItems.map((item) => (
          <Link
            key={slugify(item.name).toLowerCase()}
            href={`blog/${slugify(item.name).toLowerCase()}`}
          >
            <a className="sm:border-b-2 pb-3">
              <BlogPostCard postData={item} />
            </a>
          </Link>
        ))}
      </div>
    </main>
  );
};

export default Blog;
