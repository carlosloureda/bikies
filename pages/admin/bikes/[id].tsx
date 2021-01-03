import { useRouter } from 'next/router';
import React from 'react';
import { Button, Grid, Typography } from '@material-ui/core';
import ConfirmDialog from '../../../components/Dialogs/ConfirmDialog';
import BikeForm from '../../../components/Bike/BikeForm';
import { Alert, AlertTitle } from '@material-ui/lab';
import Api from '../../../utils/api';

const BikeDetail = () => {
  const router = useRouter();
  const { id } = router.query;

  const [currentBike, setCurrentBike] = React.useState(null);

  const [mode, setMode] = React.useState('view');
  const [openDeleteModal, setOpenDeleteModal] = React.useState(false);

  const [error, setError] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const [deleting, setDeleting] = React.useState(false);

  const getBike = async () => {
    const result = await Api.get(`api/bikes/${id}`);
    if (result.success) {
      setCurrentBike(result.data);
    } else {
      setError('Error fetching bike');
      console.error('Error fetching bike: ', result.error);
    }
  };

  React.useEffect(() => {
    getBike();
  }, [id]);

  const onDelete = async () => {
    setDeleting(true);
    const result = await Api.delete(`api/bikes/${id}`);
    if (result.success) {
      router.push('/admin/bikes');
    } else {
      setDeleting(false);
      setError('Error deleting bike');
      console.error('Error deleting bike: ', result.error);
    }
  };

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
          Bike Detail
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
        {currentBike && <BikeForm mode={mode} bike={currentBike} />}
        {/* TODO: show user bookings */}

        <ConfirmDialog
          title="Delete Bike?"
          open={openDeleteModal}
          setOpen={setOpenDeleteModal}
          onConfirm={onDelete}
        >
          Are you sure you want to delete this bike?
        </ConfirmDialog>
      </Grid>
    </Grid>
  );
};

export default BikeDetail;
