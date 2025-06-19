import cn from 'classnames'
import Link from 'next/link'
import React, { FC, useEffect, useState } from 'react'
import useDelayedRender from 'use-delayed-render'
import { Pages } from '../lib/types'
import styles from '../styles/mobile.menu.module.css'

interface MobileMenuProps {
  className?: string
  chidlren?: React.ReactNode
  pages: Pages
}

const MobileMenu: FC<MobileMenuProps> = ({ pages }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { mounted: isMenuMounted, rendered: isMenuRendered } = useDelayedRender(
    isMenuOpen,
    {
      enterDelay: 20,
      exitDelay: 300,
    }
  )

  function toggleMenu() {
    if (isMenuOpen) {
      setIsMenuOpen(false)
      document.body.style.overflow = ''
    } else {
      setIsMenuOpen(true)
      document.body.style.overflow = 'hidden'
    }
  }

  useEffect(() => {
    return function cleanup() {
      document.body.style.overflow = ''
    }
  }, [])
  return (
    <div>
      <button
        className={cn(styles.burger, 'visible md:hidden')}
        aria-label="Toggle menu"
        type="button"
        onClick={toggleMenu}
      >
        <MenuIcon data-hide={isMenuOpen} />
        <CrossIcon data-hide={!isMenuOpen} />
      </button>
      {isMenuMounted && (
        <ul
          className={cn(
            styles.menu,
            'flex flex-col absolute bg-gray-100 dark:bg-gray-900',
            isMenuRendered && styles.menuRendered
          )}
        >
          {Object.keys(pages).map((title, i) => (
            <li
              className={cn(
                'border-b border-gray-300 dark:border-gray-700',
                'text-gray-900 dark:text-gray-100 text-sm font-semibold'
              )}
              style={{ transitionDelay: String(150 + i * 25) + 'ms' }}
              key={title}
              onClick={toggleMenu}
            >
              <Link href={pages[title].href}>
                <p className="flex w-auto pb-4">{title}</p>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default MobileMenu

function MenuIcon(props: JSX.IntrinsicElements['svg']) {
  return (
    <svg
      className="h-5 w-5 absolute text-gray-900 dark:text-gray-100"
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      {...props}
    >
      <path
        d="M2.5 7.5H17.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M2.5 12.5H17.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
function CrossIcon(props: JSX.IntrinsicElements['svg']) {
  return (
    <svg
      className="h-5 w-5 absolute text-gray-900 dark:text-gray-100"
      viewBox="0 0 24 24"
      width="24"
      height="24"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
      shapeRendering="geometricPrecision"
      {...props}
    >
      <path d="M18 6L6 18" />
      <path d="M6 6l12 12" />
    </svg>
  )
}
