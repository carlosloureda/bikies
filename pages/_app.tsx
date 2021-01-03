import React from 'react';
import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';

import '../styles/globals.css';
import SiteLayout from '../components/Layouts/SiteLayout';
import AdminLayout from '../components/Layouts/AdminLayout';

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();

  React.useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  const { pathname } = router;

  if (pathname.startsWith('/admin/')) {
    return (
      <AdminLayout>
        <Component {...pageProps}></Component>
      </AdminLayout>
    );
  }

  return (
    <SiteLayout>
      <Component {...pageProps}></Component>
    </SiteLayout>
  );
}

export default MyApp;
