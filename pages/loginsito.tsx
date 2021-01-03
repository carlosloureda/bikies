import { signIn, signOut, useSession } from 'next-auth/client';
import Head from 'next/head';
import styles from '../styles/Home.module.css';

export default function Home() {
  const [session, loading] = useSession();
  if (loading) {
    return <p>Loading...</p>;
  }
  return (
    <div className={styles.container}>
      <Head>
        <title>Bikies</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Welcome to Bikies!</h1>
        <>
          {!session && (
            <>
              Not signed in <br />
              <button
                onClick={(event: React.MouseEvent<HTMLElement>) => {
                  // signIn(ownMark, (event.target as any).index);
                  signIn();
                  // onClick={signIn}
                }}
              >
                Sign In
              </button>
            </>
          )}
          {session && (
            <>
              Signed in as {session.user.email} <br />
              <button
                onClick={(event: React.MouseEvent<HTMLElement>) => signOut()}
              >
                Sign Out
              </button>
            </>
          )}
        </>
      </main>
    </div>
  );
}
