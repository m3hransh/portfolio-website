import Link from 'next/link'
import React, { FC } from 'react'
import slugify from 'slugify'
import { ProjectItems } from '../lib/types'

interface ProjectsProps {
  className?: string
  chidlren?: React.ReactNode
  projectItems: ProjectItems
}

const Projects: FC<ProjectsProps> = ({ projectItems }) => {
  return (
    <main className="max-w-2xl mx-auto w-full px-4 h-screen mt-5">
      <h3 className="font-bold text-2xl md:text-4xl tracking-tight mb-6 text-black dark:text-white">
        Projects
      </h3>
      <ul>
        {projectItems.map(item => (
          <li key={slugify(item.name).toLowerCase()}>
            <Link href={slugify(item.name).toLowerCase()}>
              <a>{item.name}</a>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  )
}

export default Projects
