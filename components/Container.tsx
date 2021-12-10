import React, { FC, useEffect, useState } from 'react'
import Link from 'next/link'
import cn from 'classnames'
import { useRouter } from 'next/router'
import { Pages } from '../lib/types'
import useTheme from 'next-theme'
import MobileMenu from './MobileMenu'
import Head from 'next/head'
import Footer from './Footer'

interface ContainerProps {
  className?: string
  chidlren?: React.ReactNode
  pages: Pages
}

interface NavItemProps {
  href: string
  title: string
}

export const NavItem: FC<NavItemProps> = ({ href, title }) => {
  const router = useRouter()
  const isActive = router.asPath === href

  return (
    <Link href={href}>
      <a
        className={cn(
          isActive
            ? 'font-semibold text-primary-800 dark:text-primary-200'
            : 'font-normal text-primary-600 dark:text-primary-400',
          'hidden md:inline-block p-1 sm:px-3 sm:py-2 rounded-lg hover:bg-primary-200 dark:hover:bg-primary-800 transition-all'
        )}
      >
        <span className="capitalize">{title}</span>
      </a>
    </Link>
  )
}

const Container: FC<ContainerProps> = ({ children, pages }) => {
  const router = useRouter()
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  // After mounting, we have access to the theme
  useEffect(() => setMounted(true), [])
  const meta: any = {
    title: 'MohammadMehran Shahidi – Developer, writer, creator.',
    description: `Software Engineer, Web Developer, and course creator.`,
    image: 'https://mehranshahidi.ir/static/images/banner.png',
    type: 'website',
  }
  return (
    <div className="bg-background-50 text-main-700 dark:text-main-100 dark:bg-background-800 h-full">
      <Head>
        <title>{meta.title}</title>
        <meta name="robots" content="follow, index" />
        <meta content={meta.description} name="description" />
        <meta property="og:url" content={`https://leerob.io${router.asPath}`} />
        <link rel="canonical" href={`https://leerob.io${router.asPath}`} />
        <meta property="og:type" content={meta.type} />
        <meta property="og:site_name" content="Mehran Shahidi" />
        <meta property="og:description" content={meta.description} />
        <meta property="og:title" content={meta.title} />
        <meta property="og:image" content={meta.image} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@Mehran87049642" />
        <meta name="twitter:title" content={meta.title} />
        <meta name="twitter:description" content={meta.description} />
        <meta name="twitter:image" content={meta.image} />
      </Head>
      <nav className="flex max-w-2xl mx-auto px-6 pt-4 pb-8">
        <div className="flex gap-7">
          {Object.keys(pages).map(title => (
            <NavItem
              key={pages[title].notionId}
              href={pages[title].href}
              title={title}
            />
          ))}
        </div>
        <MobileMenu pages={pages} />
        <button
          aria-label="Toggle Dark Mode"
          type="button"
          className="ml-auto mr-2 w-9 h-9 bg-gray-200 rounded-lg dark:bg-gray-600 flex items-center justify-center  hover:ring-2 ring-gray-300  transition-all"
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
        >
          {mounted && (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              className="w-5 h-5 text-gray-800 dark:text-gray-200"
            >
              {theme === 'dark' ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                />
              )}
            </svg>
          )}
        </button>
      </nav>
      <div className="flex flex-col pb-8 justify-center">{children}</div>
      <Footer />
    </div>
  )
}

export default Container
