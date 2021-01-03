import React from 'react';
import { useRouter } from 'next/router';
import { Grid, Typography } from '@material-ui/core';

import BookingsTable from '../../../components/Table/BookingsTable';

const DashboardBookings = () => {
  const router = useRouter();

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
