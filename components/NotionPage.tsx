import cn from 'classnames'
import useTheme from 'next-theme'
import Link from 'next/link'
import { ExtendedRecordMap } from 'notion-types'
import React, { FC } from 'react'
import { Code, Collection, NotionRenderer } from 'react-notion-x'
import { Pages } from '../lib/types'

interface Props {
  recordMap: ExtendedRecordMap
  pages: Pages
}
export const mapPageUrl = (pages: Pages) => (pageId: string) => {
  pageId = (pageId || '').replace(/-/g, '')
  const page = Object.keys(pages).find(key => pages[key].notionId === pageId)
  if (page) {
    return pages[page].href
  } else {
    return `/blog/${pageId}`
  }
}

const NotionPage: FC<Props> = props => {
  const { recordMap, pages } = props
  const { theme } = useTheme()
  if (!recordMap) {
    return null
  }

  return (
    <div className='relative md:max-w-2xl mx-auto'>
      <NotionRenderer
        bodyClassName={cn('md:max-w-2xl px-8')}
        recordMap={recordMap}
        fullPage={true}
        showTableOfContents={true}
        darkMode={theme === 'dark'}
        pageHeader={<div className='bg-background-700'></div>}
        showCollectionViewDropdown={false}
        minTableOfContentsItems={3}
        mapPageUrl={mapPageUrl(pages)}
        //remove the hard code
        // rootDomain={'localhost:3000/'}
        // rootPageId={'7cb4896b321e4ab2b8288fecaa92e39a'}
        // hideBlockId={true}
        components={{
          pageLink: ({
            href,
            as,
            passHref,
            prefetch,
            replace,
            scroll,
            shallow,
            locale,
            ...props
          }: any) => (
            <Link
              href={href}
              as={as}
              passHref={passHref}
              replace={replace}
              scroll={scroll}
              shallow={shallow}
              locale={locale}
            >
              <a {...props} />
            </Link>
          ),
          code: Code,
          collection: Collection,
          // collectionRow: CollectionRow,
        }}
      />
    </div>
  )
}

export default NotionPage
