import UnauthenticatedComponent from '../components/UnauthenticatedComponent';
import AuthenticatedComponent from '../components/AuthenticatedComponent';
import { useSession, getSession } from 'next-auth/client';

export default function Dashboard({ user }) {
  const [session, loading] = useSession();

  if (typeof window !== 'undefined' && loading) return <p>Loading...</p>;

  if (!session) return <UnauthenticatedComponent />;
  else if (session.user.role === 'user') {
    console.log('--> You are user');
  } else if (session.user.role === 'manager') {
    console.log('--> You are manager');
  }

  return <AuthenticatedComponent user={session.user} />;
}

export async function getServerSideProps(ctx) {
  const session = await getSession(ctx);
  if (!session) {
    ctx.res.writeHead(302, { Location: '/' });
    ctx.res.end();
    return {};
  }

  return {
    props: {
      user: session.user,
    },
  };
}
