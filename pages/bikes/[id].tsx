import React from 'react';
import Grid from '@material-ui/core/Grid';
import { Box, Button, Typography } from '@material-ui/core';
import { Alert, AlertTitle } from '@material-ui/lab';
import Image from 'material-ui-image';
import Rating from '@material-ui/lab/Rating';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import { makeStyles } from '@material-ui/core/styles';
import { useRouter } from 'next/router';

import DatetimeSearch from '../../components/DatetimeSearch/DatetimeSearch';
import Api from '../../utils/api';

const bikeModel = {
  id: 1,
  model: 'bmw',
  color: 'red',
  location: 'A Coruña',
  rating: 3.2,
};

const disabledDates = ['Wed Dec 30 2020', 'Mon Dec 14 2020'];

const addDateOneDay = (date: Date) => {
  const dateCp = new Date(date);
  dateCp.setDate(dateCp.getDate() + 1);
  return dateCp;
};

const useStyles = makeStyles((theme) => ({
  dateSearch: {
    backgroundColor: '#835990',
    padding: '3rem 2rem',
  },
  bikeContainer: {
    marginTop: '1rem',
  },
  info: {
    padding: '1rem 1rem',
  },
  bookButton: {
    paddingRight: '1rem',
  },
  imageContainer: {
    margin: '0 auto',
  },
  description: {
    padding: '3rem 2rem',
    marginBottom: '25px',
  },
}));

const Bike = () => {
  const router = useRouter();
  const { id } = router.query;
  const today = new Date();
  const tomorrowDate = addDateOneDay(today);
  const [pickupDate, setPickupDate] = React.useState(tomorrowDate);
  const [dropoffDate, setDropoffDate] = React.useState(
    addDateOneDay(tomorrowDate)
  );
  const [error, setError] = React.useState(null);
  const [bike, setBike] = React.useState(null);
  const [currentUser, setCurrentUser] = React.useState({
    _id: '5fea7f5fba8bc276ffbab89e',
  });

  const classes = useStyles();

  const getBike = async () => {
    const result = await Api.get(`api/bikes/${id}`);
    if (result.success) {
      setBike(result.data);
    } else {
      setError('Error fetching bike');
      console.error('Error fetching bike: ', result.error);
    }
  };

  React.useEffect(() => {
    if (id) {
      getBike();
    }
  }, [id]);

  const onBookingHandler = async () => {
    setError(null);
    // TODO: loading
    if (!pickupDate) {
      return setError('Select date and time for pickup');
    } else if (!dropoffDate) {
      return setError('Select date and time for drop off');
    }

    if (pickupDate >= dropoffDate) {
      return setError('drop off date should be later than pickup ');
    }

    const booking = {
      bike: id,
      user: currentUser._id,
      startDate: pickupDate,
      endDate: dropoffDate,
    };
    console.log('--> booking: ', booking);

    const result = await Api.post('api/bookings', booking);
    if (result.success) {
      // router.push('/dashboard/me');
    } else {
      setError('Error booking');
      console.error('Error booking: ', result.error);
    }
  };

  return (
    <Box>
      {error && (
        <Alert severity="error">
          <AlertTitle>Error</AlertTitle>
          {error}
        </Alert>
      )}
      <Grid container justify="space-around">
        <Grid
          item
          lg={8}
          sm={8}
          xs={12}
          // justify="flex-start"
          className={classes.dateSearch}
        >
          <DatetimeSearch
            pickupDate={pickupDate}
            setPickupDate={setPickupDate}
            dropoffDate={dropoffDate}
            setDropoffDate={setDropoffDate}
            disabledDates={disabledDates}
          />
        </Grid>

        {bike && (
          <Grid
            item
            container
            className={classes.bikeContainer}
            justify="center"
          >
            <Grid item xs={9} className={classes.info}>
              <Typography variant="subtitle1" color="textSecondary">
                {bike.model}
              </Typography>
              <Typography variant="body1" color="textSecondary" gutterBottom>
                {bike.color}
              </Typography>
              <Rating name="read-only" value={4} readOnly />
              <Box display="flex" flexDirection="row">
                <LocationOnIcon />
                <Typography
                  variant="body1"
                  color="textSecondary"
                  component="h3"
                >
                  {bike.location}
                </Typography>
              </Box>
            </Grid>
            <Grid
              item
              xs={3}
              container
              alignContent="center"
              justify="flex-end"
              className={classes.bookButton}
            >
              <Button
                variant="contained"
                color="primary"
                onClick={onBookingHandler}
              >
                Book
              </Button>
            </Grid>
            <Grid item xs={6} className={classes.imageContainer}>
              <Image src="/static/images/bike1.jpg" />
            </Grid>
            <Grid item xs={9} className={classes.description}>
              <Typography variant="body2" color="textSecondary" component="p">
                {bike.description}
              </Typography>
            </Grid>
          </Grid>
        )}
      </Grid>
    </Box>
  );
};

export default Bike;
