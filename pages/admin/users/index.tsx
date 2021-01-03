import React from 'react';
import { Button } from '@material-ui/core';
import { useRouter } from 'next/router';

import UserTable from '../../../components/Table/UserTable';

const Dashboard = () => {
  const [openMenu, setOpenMenu] = React.useState(false);

  const router = useRouter();

  return (
    <>
      <h1>Users</h1>
      <div>
        <Button color="primary" onClick={() => router.push('/admin/users/new')}>
          New User
        </Button>
      </div>
      {/* TODO: show users, filter, edit, delete ? */}
      {/* TODO: show user detail */}
      {/* TODO: create user button */}
      <UserTable />
    </>
  );
};

export default Dashboard;
