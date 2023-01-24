import Gallery from "@/components/Album/Gallery";
import SideNavbar from "@/components/Album/SideNavbar";
import CommonLayout from "@/components/Layouts/CommonLayout";
import NotFound from "@/components/NotFound";
import { getLayout, getPageContent } from "lib/pages";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useSelector } from "react-redux";

const Album = (data) => {
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const { isLoggedIn } = useSelector((state) => state.auth);

  useEffect(() => {
    const authPage = async () => {
      if (!isLoggedIn) {
        router.push("/login");
      } else {
        setLoading(false);
      }
    };
    authPage();
  }, [isLoggedIn]);

  if (loading) {
    return <div>loading....</div>;
  }
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
                <Container>
                  <Row>
                    <Col sm={3}>
                      <SideNavbar />
                    </Col>
                    <Col sm={9}>
                      <Gallery data={data?.data?.widgets} />
                    </Col>
                  </Row>
                </Container>
              </CommonLayout>
            )}
          </>
        )}
      </main>
    </>
  );
};

export default Album;

// export async function getStaticPaths() {
//   return {
//     paths: [{ params: { slug: ["1"] } }],
//     fallback: true,
//   };
// }

export const getServerSideProps = async ({ params }) => {
  if (!!params.slug) {
    if (params.slug.length == 1) {
      let route = params.slug[0];

      const pageContent = await getPageContent(route);
      const layout = await getLayout("menu");

      const pageData = { ...pageContent, menu: layout };

      return {
        props: {
          data: pageData,
        },
        //revalidate: 300,
      };
    }
    if (params.slug.length == 2) {
      let route = params.slug[1];

      const pageContent = await getPageContent(route);
      const layout = await getLayout("menu");

      const pageData = { ...pageContent, menu: layout };

      return {
        props: {
          data: pageData,
        },
        //revalidate: 300,
      };
    }
  } else {
    
    const pageContent = await getPageContent("all_photos");
    const layout = await getLayout("menu");

    const pageData = { ...pageContent, menu: layout };

    return {
      props: {
        data: pageData,
      },
      //revalidate: 300,
    };
  }
};
