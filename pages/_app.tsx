import React from "react";
import type { AppProps } from 'next/app';
import '../styles/globals.css';
import SiteLayout from "../components/Layouts/SiteLayout";

function MyApp({ Component, pageProps }: AppProps) {

  React.useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);



  return (
    <SiteLayout>
      <Component {...pageProps}></Component>
    </SiteLayout>
  )

}

export default MyApp;
