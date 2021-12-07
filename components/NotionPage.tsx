import Head from "next/head";
import { getPageTitle } from "notion-utils";
import React, { FC, useState } from "react";
import {
  Collection,
  CollectionRow,
  Code,
  NotionRenderer,
} from "react-notion-x";
import Link from "next/link";
import cs from "classnames";
import { ExtendedRecordMap } from "notion-types";

interface NotionPageProps {
  className?: string;
  chidlren?: React.ReactNode;
}
interface Props {
  recordMap: ExtendedRecordMap;
}

const NotionPage: FC<Props> = (props) => {
  const { recordMap } = props;
  const [showPannel, setShowPannel] = useState(true);
  if (!recordMap) {
    return null;
  }
  const title = getPageTitle(recordMap);
  return (
    <div className="relative md:max-w-2xl mx-auto">
      <Head>
        <meta name="description" content="Mehran portfolio" />
        <title>{title}</title>
      </Head>
      {/* <Navigation active={showPannel} /> */}
      <NotionRenderer
        bodyClassName={cs("md:max-w-2xl px-3")}
        recordMap={recordMap}
        fullPage={true}
        showTableOfContents={true}
        darkMode={true}
        pageHeader={<div className="bg-background-700"></div>}
        showCollectionViewDropdown={false}
        minTableOfContentsItems={3}
        //remove the hard code
        rootDomain={"localhost:3000/"}
        rootPageId={"7cb4896b321e4ab2b8288fecaa92e39a"}
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
  );
};

export default NotionPage;