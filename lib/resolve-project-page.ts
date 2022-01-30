import { Client } from '@notionhq/client'
import { ProjectItems } from './types'

export const resolveProjectPage = async (
  database_id: string,
  notion?: Client
) => {
  if (!notion) {
    notion = new Client({
      auth: process.env.NOTION_SECRET,
    })
  }

  const page = await notion.databases.query({
    database_id: database_id,
  })
  const projectItems: ProjectItems = []
  page.results.forEach(el => {
    projectItems.push({
      id: el.id,
      name: (el.properties.name.type === 'title' &&
        el.properties.name?.title[0].plain_text) as string,
      cover: el.cover
        ? el.cover?.type === 'external'
          ? el.cover.external.url
          : el.cover?.file.url
        : null,
      contributors:
        el.properties.contributors.type === 'people'
          ? el.properties.contributors.people.map(p => ({
              name: 'name' in p ? p?.name : null,
              avatar_url: 'avatar_url' in p ? p.avatar_url : null,
            }))
          : [],
      description:
        el.properties.description.type === 'rich_text' &&
        el.properties.description.rich_text[0]
          ? el.properties.description.rich_text[0]?.plain_text
          : null,
      start_time:
        el.properties.start_time.type === 'date' &&
        el.properties.start_time.date?.start
          ? el.properties.start_time.date?.start
          : null,
      finish_time:
        el.properties.start_time.type === 'date' &&
        el.properties.start_time.date?.end
          ? el.properties.start_time.date?.end
          : null,
      tags:
        el.properties.tags.type === 'multi_select'
          ? el.properties.tags.multi_select.map(e => e.name)
          : [],
      url: 
        el.properties.url.type === 'url'
          ? el.properties.url.url
        : null,
    })
  })

  return projectItems
}
