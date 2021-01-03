import React from 'react';
import { Grid, Typography } from '@material-ui/core';

import BikeForm from '../../../components/Bike/BikeForm';

const AddBike = () => {
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
