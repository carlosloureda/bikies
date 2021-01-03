import { Grid, Typography } from '@material-ui/core';
import React from 'react';

import UserForm from '../../../components/User/UserForm';
import { useSession } from 'next-auth/client';

const AddUser = () => {
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
      <Grid item>
        <Typography variant="h2" component="h2" align="center">
          Create User
        </Typography>
        <UserForm mode="create" />
      </Grid>
    </Grid>
  );
};

export default AddUser;
