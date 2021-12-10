import { resolveBlogPage } from './resolve-blog-page'
import { Pages } from './types'
import { parseISO, isAfter } from 'date-fns'

export const getRecentPosts = async (pages: Pages, num: number) => {
  const blog_id = pages?.blog?.notionId
  if (!blog_id) return []
  const blogItems = await resolveBlogPage(blog_id)
  blogItems.sort((a, b) =>
    isAfter(parseISO(a.date as string), parseISO(b.date as string)) ? -1 : 1
  )

  return blogItems.slice(0, num)
}
