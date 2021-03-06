import cn from 'classnames'
import Image from 'next/image'
import React, { FC } from 'react'
import { BlogItem } from '../lib/types'
import { buildBlurUrl } from '../lib/utils'
import Date from './Date'
import Tags from './Tags'

interface BlogPostCardProps {
  className?: string
  chidlren?: React.ReactNode
  postData: BlogItem
}

const BlogPostCard: FC<BlogPostCardProps> = ({ postData }) => {

  return (

    <div
      className={cn(
        'dark:bg-background-700 sm:dark:bg-transparent',
        'rounded-3xl transition transform duration-500 ease-in-out',
        'hover:-translate-y-1 hover:scale-105 hover:bg-background-100 dark:hover:bg-background-900'
      )}
    >
      <div
        className={cn(
          'pb-4 sm:pb-0 flex flex-col items-center',
          'sm:items-stretch text-center sm:text-justify sm:flex-row gap-2'
        )}
      >
        <div
          className={cn(
            'flex-shrink-0 text-center leading-10 w-full',
            'rounded-t-3xl sm:rounded-3xl sm:w-40 h-40 relative'
          )}
        >
          {postData.cover ? (
            <Image
              src={postData.cover}
              alt="Cover Image"
              objectFit="cover"
              objectPosition="center"
              layout="fill"
              placeholder="blur"
              blurDataURL={buildBlurUrl(postData.cover)}
              className="rounded-lg shadow"
            />
          ) : (
            <Image
              src="/error.png"
              alt="Cover Image"
              objectFit="cover"
              objectPosition="center"
              layout="fill"
              placeholder="blur"
              className="rounded-lg shadow"
            />
          )}
        </div>
        <div className="flex flex-col p-2 gap-2 w-full">
          <div className="text-2xl mt-2">{postData.name}</div>
          <div>
            {postData.description &&
              `${postData.description?.slice(0, 200)}...`}
          </div>
          <div className="mt-auto gap-2 flex flex-col sm:flex-row w-full p-2">
            <Tags className="" tags={postData.tags} />
            {postData.date && (
              <Date className="sm:ml-auto text-sm text-main-500 " dateString={postData.date} />
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default BlogPostCard
