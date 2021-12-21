import { resolveBlogPage } from './resolve-blog-page'
import { Pages } from './types'
import { parseISO, isAfter } from 'date-fns'

export const getRecentPosts = async (
  pages: Pages,
  num: number,
  preview?: boolean
) => {
  const blog_id = pages?.blog?.notionId
  if (!blog_id) return []
  if (!preview) preview = false
  const blogItems = await resolveBlogPage({
    database_id: blog_id,
    preview: preview,
  })
  blogItems.sort((a, b) =>
    isAfter(parseISO(a.date as string), parseISO(b.date as string)) ? -1 : 1
  )

  return blogItems.slice(0, num)
}
