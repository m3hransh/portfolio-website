import { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import { ParsedUrlQuery } from 'querystring'
import { resolveRootPageData } from '../lib/resolve-root-page-data'
import Blog from '../components/Blog'
import Projects from '../components/Projects'
import Courses from '../components/Courses'
import { Client } from '@notionhq/client'
import { resolveBlogPage } from '../lib/resolve-blog-page'
import { MainPageProps, Pages } from '../lib/types'
import { resolveProjectPage } from '../lib/resolve-project-page'
import { resolveAboutPage } from '../lib/resolve-about-page'
import NotionPage from '../components/NotionPage'
import Container from '../components/Container'
import slugify from 'slugify'
import { getMainPages } from '../lib/get-main-pages'

const MainPage: NextPage<MainPageProps & Pages> = props => {
  return (
    <Container pages={props.pages}>
      {props.type === 'blog' ? (
        <Blog blogItems={props.pageData} />
      ) : props.type === 'projects' ? (
        <Projects projectItems={props.pageData} />
      ) : props.type === 'courses' ? (
        <Courses />
      ) : props.type === 'about' ? (
        <NotionPage recordMap={props.pageData} pages={props.pages} />
      ) : null}
    </Container>
  )
}

interface Params extends ParsedUrlQuery {
  page_id: string
}

export const getStaticProps: GetStaticProps<MainPageProps, Params> = async ({
  params,
}) => {
  const notion = new Client({
    auth: process.env.NOTION_SECRET,
  })
  const page_id = params!.page_id as string
  const pages = await getMainPages()

  if (!(page_id in pages)) {
    return { notFound: true }
  }

  let mainPageProps: MainPageProps

  switch (page_id) {
    case 'blog':
      mainPageProps = {
        type: 'blog',
        pages,
        pageData: await resolveBlogPage(pages['blog'].notionId, notion),
      }
      break
    case 'projects':
      mainPageProps = {
        type: 'projects',
        pages,
        pageData: await resolveProjectPage(pages['projects'].notionId, notion),
      }
      break
    // TODO: add course page
    case 'courses':
      return { notFound: true }
    case 'about':
      mainPageProps = {
        type: 'about',
        pages,
        pageData: await resolveAboutPage(pages['about'].notionId),
      }
      break
    default:
      return { notFound: true }
  }

  return {
    props: {
      ...mainPageProps,
    },
    revalidate: 10,
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  const data = await resolveRootPageData()
  // Get only notion pages or databases
  const pages = data.results.filter(block => block.type.startsWith('child_'))
  // Return all the title of pages
  const paths = pages.map((page: any) => ({
    params: { page_id: slugify(page[page.type].title).toLowerCase() },
  }))

  // We'll pre-render only these paths at build time.
  // { fallback: blocking } will server-render pages
  // on-demand if the path doesn't exist.
  return { paths, fallback: 'blocking' }
}

export default MainPage
