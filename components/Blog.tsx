import cn from 'classnames'
import Link from 'next/link'
import React, { FC } from 'react'
import slugify from 'slugify'
import { BlogItems } from '../lib/types'
import BlogPostCard from './BlogPostCard'

interface BlogProps {
  className?: string
  chidlren?: React.ReactNode
  blogItems: BlogItems
}

const Blog: FC<BlogProps> = ({ blogItems }) => {
  return (
    <main className='max-w-2xl md:px-4 px-8 mx-auto w-full mt-5 pb-4'>
      <h2
        className={cn(
          'font-bold text-3xl md:text-4xl tracking-tight',
          'mb-6 text-black dark:text-white'
        )}
      >
        Blog Posts
      </h2>
      <div className='flex flex-col gap-3'>
        {blogItems.map(item => (
          <Link
            key={slugify(item.name).toLowerCase()}
            href={`blog/${slugify(item.name).toLowerCase()}`}
          >
            <a
              className={cn(
                'sm:border-b-2 border-background-200',
                'dark:border-background-700 pb-3'
              )}
            >
              <BlogPostCard postData={item} />
            </a>
          </Link>
        ))}
      </div>
    </main>
  )
}

export default Blog
