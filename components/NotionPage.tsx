import cn from 'classnames'
import useTheme from 'next-theme'
import Link from 'next/link'
import { ExtendedRecordMap, PageBlock } from 'notion-types'
import React, { FC } from 'react'
import { Code, Collection, NotionRenderer } from 'react-notion-x'
import { Pages } from '../lib/types'
import Image from 'next/image'
import { Block } from 'notion-types'
import { buildUrl, extractPublicId } from 'cloudinary-build-url'

interface Props {
  recordMap: ExtendedRecordMap
  pages: Pages
}
// custom url map

export const buildBlur = (url:string) => {
    url = buildUrl(extractPublicId(url), {
    cloud: {
      cloudName: 'm3hransh',
      version: '1644765161',
      resourceType: 'image',
      storageType: 'upload',
    },
    transformations: {
    //Resize the image
    effect: {
        name: 'blur',
        value: 800,
      },
    resize: {
        width: 700,
        
      },
      quality: 1,
  }
  })
  return url
}
export const defaultMapImageUrl = (url: string): string => {

  if (url.startsWith('data:')) {
    return url
  }

  if (url.startsWith('/images')) {
    url = `https://www.notion.so${url}`
  }
  return url
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
// this should be completed for the blog meta data on top of
// like author and time length and date
// use this link :
//https://github.com/NotionX/react-notion-x/blob/master/packages/react-notion-x/src/components/collection-row.tsx
export const CustomCollectionRow: FC<{ block: PageBlock }> = () => {
  return <></>
}

const NotionPage: FC<Props> = props => {
  const { recordMap, pages } = props
  const { theme } = useTheme()
  if (!recordMap) {
    return null
  }

  return (
    <div className="relative md:max-w-2xl mx-auto">
      <NotionRenderer
        bodyClassName={cn(' md:px-1 px-8')}
        recordMap={recordMap}
        fullPage={true}
        showTableOfContents={true}
        darkMode={theme === 'dark'}
        pageHeader={<div className="bg-background-700"></div>}
        showCollectionViewDropdown={false}
        minTableOfContentsItems={3}
        mapPageUrl={mapPageUrl(pages)}
        mapImageUrl={defaultMapImageUrl}
        //remove the hard code
        // rootDomain={'localhost:3000/'}
        // rootPageId={'7cb4896b321e4ab2b8288fecaa92e39a'}
        // hideBlockId={true}
        // customImages={true}
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
          image: (props: any) => {
            console.log(props)
            return (
              <Image
                src={props.src}
                className={props.className}
                objectFit={props.style?.objectFit}
                objectPosition={props.style?.objectPosition}
                layout="fill"
                placeholder="blur"
              blurDataURL={buildBlur(props.src)}
              />
            )
          },
          code: Code,
          collection: Collection,
          collectionRow: CustomCollectionRow,
        }}
      />
    </div>
  )
}

export default NotionPage
