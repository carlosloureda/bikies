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
  const today = new Date();
  const tomorrowDate = addDateOneDay(today);
  const [pickupDate, setPickupDate] = React.useState(tomorrowDate);
  const [dropoffDate, setDropoffDate] = React.useState(
    addDateOneDay(tomorrowDate)
  );
  const [error, setError] = React.useState(null);

  const classes = useStyles();
  const router = useRouter();

  const onBookingHandler = () => {
    setError(null);
    if (!pickupDate) {
      return setError('Select date and time for pickup');
    } else if (!dropoffDate) {
      return setError('Select date and time for drop off');
    }

    if (pickupDate >= dropoffDate) {
      return setError('drop off date should be later than pickup ');
    }

    console.log(`--> ${pickupDate} - ${dropoffDate}`);
    // TODO: finish booking on backend
    // TODO: redirect to profile page
    router.push('/dashboard/me');
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
          justify="flex-start"
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

        <Grid item container className={classes.bikeContainer} justify="center">
          <Grid
            item
            xs={9}
            className={classes.info}
            // style={{
            //   padding: '1rem 1rem',
            //   // backgroundColor: 'yellow',
            //   // paddingLeft: '1rem',
            // }}
          >
            <Typography variant="subtitle1" color="textSecondary">
              Orbea TC-4W
            </Typography>
            <Typography variant="body1" color="textSecondary" gutterBottom>
              Black
            </Typography>
            <Rating name="read-only" value={4} readOnly />
            <Box display="flex" flexDirection="row">
              <LocationOnIcon />
              <Typography variant="body1" color="textSecondary" component="h3">
                A Coruña.
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
          <Grid
            item
            xs={6}
            alignContent="center"
            justify="center"
            className={classes.imageContainer}
          >
            <Image src="/static/images/bike1.jpg" />
          </Grid>
          <Grid item xs={9} className={classes.description}>
            <Typography variant="body2" color="textSecondary" component="p">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit.
              Explicabo rem, ipsum sed magnam consectetur reiciendis doloremque
              eum nesciunt necessitatibus voluptatem repudiandae doloribus
              saepe, minus ut! Non officiis repellat asperiores vero?
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Bike;
