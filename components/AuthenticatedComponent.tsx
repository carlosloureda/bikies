import { signOut } from 'next-auth/client';

const AuthenticatedComponent = ({ user }) => (
  <div>
    <p>You are Authenticated</p>
    <button
      onClick={(event: React.MouseEvent<HTMLElement>) => {
        signOut();
      }}
    >
      Sign out
    </button>
  </div>
);

export default AuthenticatedComponent;
