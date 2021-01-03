import { useRouter } from 'next/router';
import React from 'react';
import UserForm from '../../../components/User/UserForm';
import { Button, Grid, Typography } from '@material-ui/core';
import ConfirmDialog from '../../../components/Dialogs/ConfirmDialog';
import UserBookings from '../../../components/Bookings/UserBookings';
import { Alert, AlertTitle } from '@material-ui/lab';
import Api from '../../../utils/api';
import { useSession } from 'next-auth/client';

const UserDetail = () => {
  const router = useRouter();
  const [session, loading] = useSession();
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
      setDeleting(false);
      setError('Error deleting user');
      console.error('Error deleting user: ', result.error);
    }
  };

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
      {error && (
        <Alert severity="error">
          <AlertTitle>Error</AlertTitle>
          {error}
        </Alert>
      )}
      <Grid item xs={12}>
        <Typography variant="h2" component="h2" align="center">
          User Detail
        </Typography>
        {mode === 'view' && (
          <Grid
            item
            container
            xs={12}
            justify="center"
            style={{ paddingTop: '1rem', paddingBottom: '1rem' }}
          >
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
          </Grid>
        )}
        {mode === 'edit' && (
          <Grid
            item
            container
            xs={12}
            justify="center"
            style={{ paddingTop: '1rem', paddingBottom: '1rem' }}
          >
            <Button
              variant="contained"
              color="primary"
              onClick={() => setMode('view')}
            >
              Cancel
            </Button>
          </Grid>
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
      </Grid>
    </Grid>
  );
};

export default UserDetail;
