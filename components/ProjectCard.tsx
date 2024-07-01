import cn from 'classnames'
import Image from 'next/image'
import React, { FC } from 'react'
import { ProjectItem } from '../lib/types'
import Date from './Date'
import Tags from './Tags'
import { IoCalendarOutline, IoLogoGithub } from 'react-icons/io5'
import { buildBlurUrl } from '../lib/utils'
import errorImage from '../public/error.png'

interface ProjectCardProps {
  className?: string
  chidlren?: React.ReactNode
  projectData: ProjectItem
}

const ProjectCard: FC<ProjectCardProps> = ({ projectData }) => {
  return (
    <div className={cn('dark:bg-background-700  rounded-3xl')}>
      <div
        className={cn(
          'pb-4 sm:pb-0 flex flex-col items-center',
          ' text-center   gap-2'
        )}
      >
        <div
          className={cn(
            'flex-shrink-0 text-center leading-10 w-full',
            'rounded-t-3xl   h-40 relative'
          )}
        >
          {projectData.cover ? (
            <Image
              src={projectData.cover}
              alt="Cover Image"
              objectFit="cover"
              objectPosition="center"
              placeholder='blur'
              layout="fill"
              blurDataURL={buildBlurUrl(projectData.cover)}
              className="rounded-t-3xl shadow"
            />
          ) : (
            <Image
              src={errorImage}
              alt="Cover Image"
              objectFit="cover"
              objectPosition="center"
              layout="fill"
              placeholder="blur"
              className="rounded-lg shadow"
            />
          )}
        </div>
        <div className="flex flex-col p-2 gap-4 w-full">
          <div className="text-2xl mt-2">{projectData.name}</div>
          <div className="h-12 text-base">
            {projectData.description &&
              (projectData.description.length < 70
                ? projectData.description
                : `${projectData.description?.slice(0, 70)}...`)}
          </div>
          <div className="mt-auto gap-2 flex flex-col  w-full p-2">
            <Tags className="" tags={projectData.tags} />
            <div className="flex flex-row gap-1 justify-center ">
              <IoCalendarOutline />
              {projectData.start_time ? (
                <Date
                  className="text-sm dark:text-gray-300"
                  dateString={projectData.start_time}
                />
              ) : (
                <span className="text-sm"> No date </span>
              )}
            </div>
            <div className="flex flex-row gap-1 justify-center link">
              <IoLogoGithub />
              {projectData.url ? (
                <a className="text-sm" href={projectData.url}>
                  GitHub Link
                </a>
              ) : (
                <span className="text-sm">No Link Provided</span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProjectCard
