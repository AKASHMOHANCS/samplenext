// import ComponentFunc from "@/components";
// import CommonLayout from "@/components/Layouts/CommonLayout";
// import NotFound from "@/components/NotFound";
import { getLayout, getPageContent } from "lib/pages";
import Head from "next/head";
import React from "react";
import dynamic from "next/dynamic";
import CustomBreadcrumb from "@/components/CustomBreadcrumb";

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

const Contact = (data) => {
  return (
    <>
      <Head>
        <title>{data?.data?.seo?.metatitle}</title>
        <meta name="description" content={data?.data?.seo?.metadescription} />

        {data?.data?.no_follow && (
          <meta name="robots" content="nofollow"></meta>
        )}
        {data?.data?.no_index && <meta name="robots" content="noindex"></meta>}
      </Head>
      <main>
        {data?.data?.status == "Not Found" ? (
          <>
            <CommonLayout props={data?.menu}>
              <NotFound />
            </CommonLayout>
          </>
        ) : (
          <>
            {data && (
              <CommonLayout props={data?.data?.menu}>
                <CustomBreadcrumb levels={data?.data?.levels} />
                <>{data?.data?.widgets?.map((block) => ComponentFunc(block))}</>
              </CommonLayout>
            )}
          </>
        )}
      </main>
    </>
  );
};

export default Contact;

export async function getStaticPaths() {
  return {
    paths: [{ params: { slug: "contact_1" } }],
    fallback: false,
  };
}

export async function getStaticProps() {
  try {
    const pageContent = await getPageContent("contact_1");
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
