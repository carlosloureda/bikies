import { Typography } from '@material-ui/core';
import { useSession } from 'next-auth/client';

import UserBookings from '../../../components/Bookings/UserBookings';

const MyProfile = () => {
  const [session, loading] = useSession();

  if (loading) {
    return <h1>Loading</h1>;
  }

  if (!session) {
    return <h1>Access denied: Not logged in</h1>;
  }
  if (session) {
    return (
      <>
        <Typography variant="h2" component="h2" align="center">
          My Bookings
        </Typography>
        {session.user && <UserBookings user={session.user} />}
      </>
    );
  }
};

export default MyProfile;
