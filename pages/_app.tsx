import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Script from 'next/script';

function MyApp({ Component, pageProps }: AppProps) {
  return <>
    <Script>
      {`window.fbAsyncInit = function() {
        FB.init({
          appId            : ${process.env.NEXT_PUBLIC_FB_APP_ID},
          autoLogAppEvents : true,
          xfbml            : true,
          version          : 'v14.0'
        });
      };`}
    </Script>
    <Script src="https://connect.facebook.net/en_US/sdk.js" strategy="lazyOnload"></Script>
    <Component {...pageProps} />
  </>
}

export default MyApp
