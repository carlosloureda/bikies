import React from 'react';
import { Grid, Typography } from '@material-ui/core';
import { useSession } from 'next-auth/client';

import BikeForm from '../../../components/Bike/BikeForm';

const AddBike = () => {
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
      <Typography variant="h2" component="h2" align="center">
        Create Bike
      </Typography>
      <BikeForm mode="create" />
    </Grid>
  );
};

export default AddBike;
