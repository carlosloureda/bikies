import React from 'react';
import { Button } from '@material-ui/core';
import { useRouter } from 'next/router';
import { Box, Grid, Typography } from '@material-ui/core';

import UsersTable from '../../../components/Table/UsersTable';

const Dashboard = () => {
  const router = useRouter();

  return (
    <Grid container justify="center">
      <Grid item xs={12}>
        <Typography variant="h2" component="h2" align="center">
          Users
        </Typography>
        <Box>
          <Button
            color="primary"
            onClick={() => router.push('/admin/users/new')}
          >
            New User
          </Button>
        </Box>
        <UsersTable />
      </Grid>
    </Grid>
  );
};

export default Dashboard;
