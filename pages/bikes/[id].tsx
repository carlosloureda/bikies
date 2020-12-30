
import React from 'react';
import Grid from '@material-ui/core/Grid';
import { Box, Button, Typography } from '@material-ui/core';
import { Alert, AlertTitle } from '@material-ui/lab';
import Image from 'material-ui-image';
import Rating from '@material-ui/lab/Rating';
import LocationOnIcon from '@material-ui/icons/LocationOn';

import DatetimeSearch from "../../components/DatetimeSearch/DatetimeSearch";

const bikeModel = {
  id: 1,
  model: 'bmw',
  color: 'red',
  location: 'A Coruña',
  rating: 3.2,
};

const disabledDates = [
  "Wed Dec 30 2020", "Mon Dec 14 2020"
];


const addDateOneDay = (date: Date) => {
  const dateCp = new Date(date)
  dateCp.setDate(dateCp.getDate() + 1); 
  return dateCp
};

const Bike = () => {
  const today = new Date()
  const tomorrowDate = addDateOneDay(today);
  const [pickupDate, setPickupDate] = React.useState(tomorrowDate);
  const [dropoffDate, setDropoffDate] = React.useState(addDateOneDay(tomorrowDate));
  const [error, setError] = React.useState(null);

  const onBookingHandler = () => {
    setError(null)
    if (!pickupDate) {
      return setError("Select date and time for pickup")
    } else if (!dropoffDate) {
      return setError("Select date and time for drop off")
    }
    
    if (pickupDate >= dropoffDate) {
      return setError("drop off date should be later than pickup ")
    }

    console.log(`--> ${pickupDate} - ${dropoffDate}`)
    // TODO: finish booking on backend
    // TODO: redirect to profile page
  
  }

  return (
    <>
      {error && <Alert severity="error">
        <AlertTitle>Error</AlertTitle>
        {error}
      </Alert>}
      <Grid container justify="space-between" style={{width: "50%", margin: "0 auto"}}>
        <DatetimeSearch 
          pickupDate={pickupDate}
          setPickupDate={setPickupDate} 
          dropoffDate={dropoffDate} 
          setDropoffDate={setDropoffDate} 
          disabledDates={disabledDates}
        />
       
        <Grid
          container
          direction="column"
          style={{marginTop: "120px"}}
          // justify="flex-start"
          // alignItems="center"
        >
          <Box display="flex" flexDirection="row" justifyContent="space-between">
            <Box>
              <Typography variant="body2" color="textSecondary" component="p">
              Orbea TC-4W
              </Typography>
              <Box display="flex" flexDirection="row">
                {/* <ColorLensIcon /> */}
                <Typography variant="body1" color="textSecondary" component="h3">
                  Black
                </Typography>
              </Box>
              <Rating name="read-only" value={4} readOnly />
            </Box>
            <Button variant="contained" color="primary" onClick={onBookingHandler}>
              Book
            </Button>
          </Box>
          <Box display="flex" flexDirection="row">
            <LocationOnIcon/>
            <Typography variant="body1" color="textSecondary" component="h3">
              A Coruña.
            </Typography>
          </Box>
          {/* <Image src="/static/images/bike1.jpg" imageStyle={{width: "200px", height: "200px"}}/> */}
          <Image src="/static/images/bike1.jpg" style={{maxWidth: "1000px"}}/>
          <Typography variant="body2" color="textSecondary" component="p">
             Lorem ipsum dolor sit, amet consectetur adipisicing elit. Explicabo rem, ipsum sed magnam consectetur reiciendis doloremque eum nesciunt necessitatibus voluptatem repudiandae doloribus saepe, minus ut! Non officiis repellat asperiores vero?
          </Typography>
        </Grid>
    </Grid>
  </>
  )
};

export default Bike;
