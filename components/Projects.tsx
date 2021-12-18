import cn from 'classnames'
import Link from 'next/link'
import React, { FC } from 'react'
import slugify from 'slugify'
import { ProjectItems } from '../lib/types'
import ProjectCard from './ProjectCard'

interface ProjectsProps {
  className?: string
  chidlren?: React.ReactNode
  projectItems: ProjectItems
}

const Projects: FC<ProjectsProps> = ({ projectItems }) => {
  return (
    <main className="max-w-2xl mx-auto w-full px-4 h-screen mt-5">
      <h3
        className={cn(
          'font-bold text-2xl md:text-4xl tracking-tight',
          'mb-6 text-black dark:text-white'
        )}
      >
        Projects
      </h3>
      <ul className='grid sm:grid-cols-2 grid-cols-1 gap-4'>
        {projectItems.map(item => (
          <li key={slugify(item.name).toLowerCase()}>
              <ProjectCard projectData={item} />
          </li>
        ))}
      </ul>
    </main>
  )
}

export default Projects
