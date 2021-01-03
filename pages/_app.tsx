import React from 'react';
import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import '../styles/globals.css';

import SiteLayout from '../components/Layouts/SiteLayout';
import AdminLayout from '../components/Layouts/AdminLayout';

import { Provider } from 'next-auth/client';
import 'reflect-metadata';

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
      <Provider session={pageProps.session}>
        <AdminLayout>
          <Component {...pageProps}></Component>
        </AdminLayout>
      </Provider>
    );
  }

  return (
    <Provider session={pageProps.session}>
      <SiteLayout>
        <Component {...pageProps}></Component>
      </SiteLayout>
    </Provider>
  );
}

export default MyApp;
