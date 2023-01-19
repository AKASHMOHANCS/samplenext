import ComponentFunc from "@/components";
import CommonLayout from "@/components/Layouts/CommonLayout";
import NotFound from "@/components/NotFound";
import Head from "next/head";
import React from "react";


const About = (data) => {
  
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
            <CommonLayout props={data?.menu}>
              <>{data?.data?.widgets?.map((block) => ComponentFunc(block))}</>
            </CommonLayout>
          )}
        </>
      )}
    </main>
  </>

  );
};

export default About;

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: "blocking",
  };
}


export async function getStaticProps() {
  try {
    const pageContent = await getPageContent("about");
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