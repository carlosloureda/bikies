import { useRouter } from 'next/router';
import React from 'react';
import UserForm from '../../../components/User/UserForm';
import { Button } from '@material-ui/core';
import ConfirmDialog from '../../../components/Dialogs/ConfirmDialog';
import UserBookings from '../../../components/Bookings/UserBookings';
import { Alert, AlertTitle } from '@material-ui/lab';
import Api from '../../../utils/api';

const UserDetail = () => {
  const router = useRouter();
  const { id } = router.query;
  const [currentUser, setCurrentUser] = React.useState(null);

  const [mode, setMode] = React.useState('view');
  const [openDeleteModal, setOpenDeleteModal] = React.useState(false);
  const [error, setError] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const [deleting, setDeleting] = React.useState(false);

  const getUser = async () => {
    const result = await Api.get(`api/users/${id}`);
    if (result.success) {
      setCurrentUser(result.data);
    } else {
      setError('Error fetching user');
      console.error('Error fetching user: ', result.error);
    }
  };

  React.useEffect(() => {
    getUser();
  }, [id]);

  const onDelete = async () => {
    setDeleting(true);
    const result = await Api.delete(`api/users/${id}`);
    if (result.success) {
      router.push('/admin/users');
    } else {
      setError('Error deleting user');
      console.error('Error deleting user: ', result.error);
    }
    setDeleting(false);
  };

  return (
    <>
      {error && (
        <Alert severity="error">
          <AlertTitle>Error</AlertTitle>
          {error}
        </Alert>
      )}
      <h1>User Detail</h1>

      {mode === 'view' && (
        <>
          <Button
            variant="contained"
            color="primary"
            onClick={() => setMode('edit')}
          >
            Edit
          </Button>
          <Button
            variant="contained"
            color="secondary"
            onClick={() => setOpenDeleteModal(true)}
            disabled={deleting}
          >
            Delete
          </Button>
        </>
      )}
      {mode === 'edit' && (
        <Button
          variant="contained"
          color="primary"
          onClick={() => setMode('view')}
        >
          Cancel
        </Button>
      )}
      {currentUser && <UserForm mode={mode} user={currentUser} />}
      {/* TODO: show user bookings */}
      {/* <UserBookings /> */}

      <ConfirmDialog
        title="Delete User?"
        open={openDeleteModal}
        setOpen={setOpenDeleteModal}
        onConfirm={onDelete}
      >
        Are you sure you want to delete this user?
      </ConfirmDialog>
    </>
  );
};

export default UserDetail;
