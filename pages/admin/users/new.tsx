import { Box, Grid, Typography } from '@material-ui/core';
import React from 'react';

import UserForm from '../../../components/User/UserForm';

const AddUser = () => {
  return (
    // <Box
    //   style={{
    //     backgroundColor: 'red',

    //   }}

    // >

    //   <h1>Create User</h1>
    //   <UserForm mode="create" />
    // </Box>

    <Grid
      // style={{
      //   backgroundColor: 'red',
      // }}
      container
      justify="center"
    >
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
