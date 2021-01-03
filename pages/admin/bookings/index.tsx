import React from 'react';
import { useRouter } from 'next/router';
import { Grid, Typography } from '@material-ui/core';

import BookingsTable from '../../../components/Table/BookingsTable';

const DashboardBookings = () => {
  const router = useRouter();
  const [session, loading] = useSession();

  if (loading) {
    return <h1>Loading</h1>;
  }

  if (!session) {
    return <h1>Access denied: Not logged in</h1>;
  }

  if (session && session.user.role !== 'manager') {
    return <h1>Access denied: Not proper priviledges</h1>;
  }

  return (
    <Grid container justify="center">
      <Grid item xs={12}>
        <Typography variant="h2" component="h2" align="center">
          Bookings
        </Typography>
        <BookingsTable />
      </Grid>
    </Grid>
  );
};

export default DashboardBookings;
