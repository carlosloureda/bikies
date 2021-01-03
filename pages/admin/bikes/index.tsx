import React from 'react';

import { Button } from '@material-ui/core';
import { useRouter } from 'next/router';

import BikesTable from '../../../components/Table/BikesTable';

const Dashboard = () => {
  const router = useRouter();

  return (
    <>
      <h1>Bikes</h1>
      <div>
        <Button
          color="primary"
          onClick={() => router.push('/dashboard/bikes/new')}
        >
          New Bike
        </Button>
      </div>
      <BikesTable />
    </>
  );
};

export default Dashboard;
