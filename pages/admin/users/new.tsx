import React from 'react';

import UserForm from '../../../components/User/UserForm';

const AddUser = () => {
  return (
    <>
      <h1>Create User</h1>
      <UserForm mode="create" />
    </>
  );
};

export default AddUser;
