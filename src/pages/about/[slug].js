// import ComponentFunc from "@/components";
// import CommonLayout from "@/components/Layouts/CommonLayout";
// import NotFound from "@/components/NotFound";
import { getLayout, getPageContent } from "lib/pages";
import Head from "next/head";
import React from "react";
import dynamic from "next/dynamic";

const CommonLayout = dynamic(
  () => import("@/components/Layouts/CommonLayout"),
  { loading: () => "loading...." }
);
const NotFound = dynamic(() => import("@/components/NotFound"), {
  loading: () => "loading....",
});
const ComponentFunc = dynamic(() => import("@/components"), {
  loading: () => "loading....",
});

const AboutDetails = (data) => {
  return (
    <>
      <Head>
        <title>{data?.seo?.metatitle}</title>
        <meta name="description" content={data?.data?.seo?.metadescription} />

        {data?.no_follow && <meta name="robots" content="nofollow"></meta>}
        {data?.no_index && <meta name="robots" content="noindex"></meta>}
      </Head>
      <main>
        {data?.status == "Not Found" ? (
          <>
            <CommonLayout props={data?.data?.menu}>
              <NotFound />
            </CommonLayout>
          </>
        ) : (
          <>
            {data && (
              <CommonLayout props={data?.data?.menu}>
                <>{data?.data?.widgets?.map((block) => ComponentFunc(block))}</>
              </CommonLayout>
            )}
          </>
        )}
      </main>
    </>
  );
};

export default AboutDetails;

export async function getStaticPaths() {
  return {
    paths: [{ params: { slug: "about_1" } }],
    fallback: false,
  };
}

export async function getStaticProps() {
  try {
    const pageContent = await getPageContent("about_1");
    const layout = await getLayout("menu");

    const pageData = { ...pageContent, menu: layout };

    return {
      props: {
        data: pageData,
      },
      revalidate: 300,
    };
  } catch (error) {
    return {
      props: {
        apiError: true,
      },
    };
  }
}
