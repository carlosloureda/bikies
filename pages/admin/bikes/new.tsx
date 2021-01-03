import React from 'react';

import BikeForm from '../../../components/Bike/BikeForm';

const AddBike = () => {
  return (
    <>
      <h1>Create Bike</h1>
      <BikeForm mode="create" />
    </>
  );
};

export default AddBike;
