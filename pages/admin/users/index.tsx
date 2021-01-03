import React from 'react';
import { Button } from '@material-ui/core';
import { useRouter } from 'next/router';
import { Box, Grid, Typography } from '@material-ui/core';

import UsersTable from '../../../components/Table/UsersTable';
import { useSession } from 'next-auth/client';

const Dashboard = () => {
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
