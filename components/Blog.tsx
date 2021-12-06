import Link from "next/link";
import React, { FC } from "react";
import slugify from "slugify";
import { BlogItems } from "../lib/types";

interface BlogProps {
  className?: string;
  chidlren?: React.ReactNode;
  blogItems: BlogItems;
}

const Blog: FC<BlogProps> = ({ blogItems }) => {
  return (
    <div>
      <h2>Blog</h2>
      {blogItems.map((item) => (
        <Link
          href={`blog/${slugify(item.name).toLowerCase()}`}
          key={slugify(item.name).toLowerCase()}
        >
          <a>{item.name}</a>
        </Link>
      ))}
    </div>
  );
};

export default Blog;
