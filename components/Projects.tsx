import Link from "next/link";
import React, { FC } from "react";
import slugify from "slugify";
import { ProjectItems } from "../lib/types";

interface ProjectsProps {
  className?: string;
  chidlren?: React.ReactNode;
  projectItems: ProjectItems;
}

const Projects: FC<ProjectsProps> = ({ projectItems }) => {
  return (
    <div>
      Projects
      {projectItems.map((item) => (
        <Link
          href={slugify(item.name).toLowerCase()}
          key={slugify(item.name).toLowerCase()}
        >
          <a>{item.name}</a>
        </Link>
      ))}
    </div>
  );
};

export default Projects;
