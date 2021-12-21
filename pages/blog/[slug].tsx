import { error } from 'console'
import { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import { resolveBlogPage } from '../../lib/resolve-blog-page'
import slugify from 'slugify'
import { ParsedUrlQuery } from 'querystring'
import { NotionAPI } from 'notion-client'
import { ExtendedRecordMap } from 'notion-types'
import NotionPage from '../../components/NotionPage'
import Container from '../../components/Container'
import { BlogItem, Pages } from '../../lib/types'
import { getMainPages } from '../../lib/get-main-pages'
import Head from 'next/head'

interface BlogPostProps {
  recordMap: ExtendedRecordMap
  pages: Pages
  post: BlogItem
}
interface Params extends ParsedUrlQuery {
  slug: string
}

const BlogPost: NextPage<BlogPostProps> = ({ recordMap, pages, post }) => {
  return (
    <>
      <Head>
        <meta name="twitter:title" content={post.name} />
        <meta name="og:title" content={post.name} />
        {post.cover && <meta property="og:image" content={post.cover} />}
        {post.cover && <meta property="twitter:image" content={post.cover} />}
        {post.description && (
          <meta property="og:description" content={post.description} />
        )}
        {post.description && (
          <meta property="twitter:description" content={post.description} />
        )}
        {post.date && (
          <meta property="article:published_time" content={post.date} />
        )}
      </Head>
      <Container pages={pages}>
        <NotionPage recordMap={recordMap} pages={pages} />
      </Container>
    </>
  )
}

export const getStaticProps: GetStaticProps<BlogPostProps, Params> = async ({
  params,
  preview,
}) => {
  const pages: Pages = await getMainPages()
  const blog_id = pages.blog?.notionId
  if (!blog_id) return { notFound: true }
  const blogItems = await resolveBlogPage({database_id:blog_id, preview:preview})
  const post = blogItems.find(
    item => slugify(item.name).toLowerCase() === params?.slug
  )
  if (!post) return { notFound: true }
  const notion = new NotionAPI()
  const recordMap = await notion.getPage(post.id)

  return { props: { recordMap, pages, post }, revalidate: 10 }
}

export const getStaticPaths: GetStaticPaths = async () => {
  const pages = await getMainPages()
  const blog_id = pages.blog?.notionId
  if (!blog_id) throw error('There is blog page in root notion page')
  const blogItems = await resolveBlogPage({database_id:blog_id})
  const paths = blogItems.map(item => ({
    params: { slug: slugify(item.name).toLowerCase() },
  }))

  return { paths, fallback: 'blocking' }
}

export default BlogPost
