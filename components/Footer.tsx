import React, { FC } from 'react'
import SocialFollow from './SocialFollow'

interface FooterProps {
  className?: string
  chidlren?: React.ReactNode
}

const Footer: FC<FooterProps> = () => {
  return (
    <footer className="flex flex-col gap-2 justify-center items-center max-w-2xl px-8 mx-auto w-full pb-8">
      <hr className="w-full border-1 border-gray-200 dark:border-gray-600 mb-8" />
      <SocialFollow />
      <div className="text-sm">Copyright 2021 MohammadMehran Shahidi</div>
    </footer>
  )
}

export default Footer
