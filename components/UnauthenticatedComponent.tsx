import { signIn } from 'next-auth/client';

const UnauthenticatedComponent = () => (
  <div>
    <p>You are not Authenticated</p>
    <button
      onClick={(event: React.MouseEvent<HTMLElement>) => {
        signIn();
      }}
    >
      Sign In
    </button>
  </div>
);

export default UnauthenticatedComponent;
