import { Html, Head, Main, NextScript } from 'next/document'
import cn from 'classnames'

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link href="/static/favicons/favicon.ico" rel="shortcut icon" />
        <link href="/static/favicons/site.webmanifest" rel="manifest" />
        {/* I don't know this */}
        {/* <link
          rel="preconnect"
          href="https://cdn.usefathom.com"
          crossOrigin=""
        /> */}
        <link
          href="/static/favicons/apple-touch-icon.png"
          rel="apple-touch-icon"
          sizes="180x180"
        />
        <link
          href="/static/favicons/favicon-32x32.png"
          rel="icon"
          sizes="32x32"
          type="image/png"
        />
        <link
          href="/static/favicons/favicon-16x16.png"
          rel="icon"
          sizes="16x16"
          type="image/png"
        />
        <link
          color="#4a9885"
          href="/static/favicons/safari-pinned-tab.svg"
          rel="mask-icon"
        />
        <meta content="#ffffff" name="theme-color" />
        <meta content="#ffffff" name="msapplication-TileColor" />
        <meta
          content="/static/favicons/browserconfig.xml"
          name="msapplication-config"
        />
        {/* Don't understand these at the moment */}
        {/* <meta content="14d2e73487fa6c71" name="yandex-verification" />
        <meta
          content="eZSdmzAXlLkKhNJzfgwDqWORghxnJ8qR9_CHdAh5-xw"
          name="google-site-verification"
        /> */}
      </Head>
      <body
        className={cn(
          'bg-background-50 text-main-700 dark:text-main-100',
          'dark:bg-background-800 md:text-lg text-base'
        )}
      >
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
