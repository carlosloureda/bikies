import { useRouter } from 'next/router';
import { Box, Grid, Typography } from '@material-ui/core';

import UserBookings from '../../../components/Bookings/UserBookings';

const MyProfile = () => {
  // TODO: my info, password
  // TODO: my bookings

  // const currentUser = {
  //   _id: '5fea7f5fba8bc276ffbab89e',
  //   email: 'balanzenet@gmail.com',
  //   role: 'user',
  // };
  const currentUser = {
    email: 'balanzeneto@gmail.com',
    emailVerified: '2020-12-29T03:59:23.234Z',
    firstName: 'User',
    lastName: 'usuario',
    password: '123456',
    role: 'user',
    updatedAt: '2020-12-29T03:59:23.295Z',
    __v: 0,
    _id: '5fea7f5fba8bc276ffbab89e',
  };
  return (
    <>
      <Typography variant="h2" component="h2" align="center">
        My Bookings
      </Typography>
      {currentUser && <UserBookings user={currentUser} />}
    </>
  );
};

export default MyProfile;
