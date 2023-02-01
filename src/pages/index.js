import Head from "next/head";
import Style from '../styles/home.module.scss'
import ComponentFunc from "@/components";
import CommonLayout from "@/components/Layouts/CommonLayout";
import { getLayout, getPageContent } from "lib/pages";

export default function Home(data) {

  return (
    <main className={Style.mainContainer}>
      <Head>
        <title>{data?.data?.seo?.metatitle}</title>
        <meta
          name="description"
          content={data?.data?.seo?.metadescription}
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {data && (
        <CommonLayout props={data?.data?.menu}>
          <>{data?.data?.widgets?.map((block) => ComponentFunc(block))}</>
        </CommonLayout>
      )}
    </main>
  );
}

export async function getStaticProps() {
  try {
    const pageContent = await getPageContent("home");
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
