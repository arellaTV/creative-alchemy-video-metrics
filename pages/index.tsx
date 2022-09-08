import type { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import Script from 'next/script';
import { useEffect, useState } from 'react';
import Footer from '../components/Footer';
import styles from '../styles/Home.module.css';

declare global {
  interface Window {
    FB: any;
  }
}

const Home: NextPage = () => {
  const [FB, setFB] = useState<any>({});

  useEffect(() => {
    if (!FB.getLoginStatus) {
      return;
    }

    FB.getLoginStatus(function(response:any) {
      console.log({ response });
    });
  }, [FB]);

  const handleFacebookLogin = () => {
    FB.login((response:any) => {
      console.log({ handleFacebookLoginResponse: response });
    });
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Creative Alchemy Video Metrics</title>
        <meta name="description" content="Creative Alchemy Video Metrics is a tool that lets TikTok users see metrics for their favorite videos" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Script id="fbAsyncInit">
        {`window.fbAsyncInit = function() {
          FB.init({
            appId            : ${process.env.NEXT_PUBLIC_FB_APP_ID},
            autoLogAppEvents : true,
            xfbml            : true,
            version          : 'v14.0'
          });
        };`}
      </Script>
      <Script
        src="https://connect.facebook.net/en_US/sdk.js"
        strategy="lazyOnload"
        onLoad={() => setFB(window.FB)}
      ></Script>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Creative Alchemy<br />Video Metrics
        </h1>

        <p>See metrics for your favorite videos</p>

        <p className={styles.description}>
          <Link href="/api/oauth">
            <a className={styles.loginButton}>Continue with TikTok</a>
          </Link>
          <a className={styles.loginButton} onClick={handleFacebookLogin}>Continue with Facebook</a>
        </p>
      </main>

      <Footer />
    </div>
  );
};

export default Home;
