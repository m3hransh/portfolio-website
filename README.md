 This is a portfolio website implemented in [Next.js](https://nextjs.org/) which uses Notion as a CMS. This repo is deployed on
 [Vercel](https://vercel.com).

## Intro
Before this project, I was using [Strapi](https://strapi.io/) as a headless CMS for my 
personal website. After bumping into 
      [react-notion-x](https://github.com/NotionX/react-notion-x)
        , I decided to use Notion as the 
CMS while I had most my notes and writings there.
## Setup

## Features 
- Next.js Static Generation pages which are fast
- Styled with Tailwindcss for most part
- Integration with Notion as CMS while giving you optional customization
- Incremental build which gives you option of generating pages without building
  the whole project again
- preview support give you option to see unplublished posts in your Notion page
## Inspirations
-  [nextjs-notion-starter-kit](com/transitive-bullshit/nextjs-notion-starter-kit)
- [leerob.io](https://github.com/leerob/leerob.io)
## Todos
- [x] Defining types for the main pages data
- [x] Rendering blog posts & about page using 
   [react-notion-x](https://github.com/NotionX/react-notion-x)
- [x] Create fully functional Navbar
- [x] Fix the preview for blog posts so users can only see published posts
- [ ] Add a CollectionRow to blog posts for some extra data such as author and 
   time length
- [ ] Update the README.md for instructions to deploy
- [ ] Create a section in Notion page for some dynamic configs
- [ ] Fix Project Page to leverage GitHub API to get Project Data (right now 
   there is table for all data which is is better to be synced with GitHub)
- [ ] Add support for supporting number of view and comments and share on social media
  




