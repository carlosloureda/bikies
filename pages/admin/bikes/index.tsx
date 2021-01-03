import React from 'react';
import { Button } from '@material-ui/core';
import { useRouter } from 'next/router';
import { Box, Grid, Typography } from '@material-ui/core';

import BikesTable from '../../../components/Table/BikesTable';

const Dashboard = () => {
  const router = useRouter();

  return (
    <Grid container justify="center">
      <Grid item xs={12}>
        <Typography variant="h2" component="h2" align="center">
          Bikes
        </Typography>
        <Box>
          <Button
            color="primary"
            onClick={() => router.push('/admin/bikes/new')}
          >
            New Bike
          </Button>
        </Box>
        <BikesTable />
      </Grid>
    </Grid>
  );
};

export default Dashboard;
