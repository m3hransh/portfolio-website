import { Client } from '@notionhq/client'
import { BlogItems } from './types'
interface Params {
  database_id:string
  notion?: Client
  preview?: boolean
}
export const resolveBlogPage = async ({
  database_id,
  notion,
  preview = false,
}:Params) => {
  if (!notion) {
    notion = new Client({
      auth: process.env.NOTION_SECRET,
    })
  }

  const page = await notion.databases.query({
    database_id: database_id,
  })
  const blogItems: BlogItems = []
  page.results.forEach(el => {
    blogItems.push({
      id: el.id,
      name: (el.properties.name.type === 'title' &&
        el.properties.name?.title[0].plain_text) as string,
      cover: el.properties.thumbnail
        ? el.properties.thumbnail?.type === 'url'
          ? el.properties.thumbnail.url
            : null
        : null,
      author:
        el.properties.author.type === 'created_by'
          ? {
              name: el.properties.author.created_by.id,
              avatar_url:
                'avatar_url' in el.properties.author.created_by
                  ? el.properties.author.created_by.avatar_url
                  : null,
            }
          : null,
      description:
        el.properties.description.type === 'rich_text' &&
        el.properties.description.rich_text[0]
          ? el.properties.description.rich_text[0]?.plain_text
          : null,
      date:
        el.properties.date.type === 'date'
          ? el.properties.date.date?.start || null
          : null,
      tags:
        el.properties.tags.type === 'multi_select'
          ? el.properties.tags.multi_select.map(e => e.name)
          : [],
      published:
        el.properties.published.type === 'checkbox'
          ? el.properties.published.checkbox
          : true,
    })
  })

  // fitler the unpublished ones
  let result
  if (!preview) result = blogItems.filter(v => v.published)
  else result = blogItems

  return result
}
