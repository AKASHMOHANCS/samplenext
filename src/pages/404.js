import CommonLayout from '@/components/Layouts/CommonLayout';
import NotFound from '@/components/NotFound';
import Head from 'next/head'


const NotFoundPage = () => {
    return (
        <CommonLayout>
            <Head>
                <title>NotFound</title>
                <meta name="description" content="Jersey Group" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main >
                <NotFound/>
            </main>
        </CommonLayout>
    );
}

export default NotFoundPage;
