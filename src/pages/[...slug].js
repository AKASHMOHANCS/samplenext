import Head from "next/head";
import { getLayout, getPageContent } from "lib/pages";
import CommonLayout from "@/components/Layouts/CommonLayout";
import NotFound from "@/components/NotFound";
import ComponentFunc from "@/components";

const Common = ({ data }) => {
  console.log(data)
  return (
    <>
      <Head>
        <title>{data?.seo?.metatitle}</title>
        <meta name="description" content={data?.seo?.metadescription} />

        {data?.no_follow && (
          <meta name="robots" content="nofollow"></meta>
        )}
        {data?.no_index && <meta name="robots" content="noindex"></meta>}
      </Head>
      <main>
        {data?.status == "Not Found" ? (
          <>
            <CommonLayout props={data?.menu}>
              <NotFound />
            </CommonLayout>
          </>
        ) : (
          <>
            {data && (
              <CommonLayout props={data?.menu}>
                <>{data?.widgets?.map((block) => ComponentFunc(block))}</>
              </CommonLayout>
            )}
          </>
        )}
      </main>
    </>
  );
};

export async function getStaticPaths() {
  return {
    paths: [
      { params: { slug: ["about"] } },
      { params: { slug: ["portfolio"] } },
      { params: { slug: ["contact"] } },
    ],
    fallback: "blocking",
  };
}

export const getStaticProps = async ({ params }) => {
 
  let route = params.slug.join("/");

  const pageContent = await getPageContent(route);
  const layout = await getLayout("/menu");

  const pageData = { ...pageContent, menu: layout };

  return {
    props: {
      data: pageData,
    },
    revalidate: 300,
  };
};

export default Common;
