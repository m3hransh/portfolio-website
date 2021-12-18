import cn from 'classnames'
import Image from 'next/image'
import React, { FC } from 'react'
import { ProjectItem } from '../lib/types'
import Date from './Date'
import Tags from './Tags'

interface ProjectCardProps {
  className?: string
  chidlren?: React.ReactNode
  projectData: ProjectItem
}

const ProjectCard: FC<ProjectCardProps> = ({ projectData }) => {

  return (

    <div
      className={cn(
        'dark:bg-background-700  rounded-3xl',
      )}
    >
      <div
        className={cn(
          'pb-4 sm:pb-0 flex flex-col items-center',
          ' text-center   gap-2'
        )}
      >
        <div
          className={cn(
            'flex-shrink-0 text-center leading-10 w-full',
            'rounded-t-3xl  sm:w-40 h-40 relative'
          )}
        >
          {projectData.cover ? (
            <Image
              src={projectData.cover}
              alt="Cover Image"
              objectFit="cover"
              objectPosition="center"
              layout="fill"
              className="rounded-lg shadow"
            />
          ) : (
            <Image
              src="/error.png"
              alt="Cover Image"
              objectFit="cover"
              objectPosition="center"
              layout="fill"
              className="rounded-lg shadow"
            />
          )}
        </div>
        <div className="flex flex-col p-2 gap-2 w-full">
          <div className="text-2xl mt-2">{projectData.name}</div>
          <div>
            {projectData.description &&
              `${projectData.description?.slice(0, 200)}...`}
          </div>
          <div className="mt-auto gap-2 flex flex-col  w-full p-2">
            <Tags className="" tags={projectData.tags} />
            {projectData.start_time && (
              <Date className="" dateString={projectData.start_time} />
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProjectCard
