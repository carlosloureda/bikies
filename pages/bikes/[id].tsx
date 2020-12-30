
import React from 'react';
import Grid from '@material-ui/core/Grid';
import { Box, Button, Typography } from '@material-ui/core';
import { Alert, AlertTitle } from '@material-ui/lab';
import Image from 'material-ui-image';
import Rating from '@material-ui/lab/Rating';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import ColorLensIcon from '@material-ui/icons/ColorLens';

import BikeDatepicker from "../../components/Datepicker/Datepicker";
import BikeTimePicker from "../../components/TimePicker/TimePicker";

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
  console.log("date: ", date)
  const dateCp = new Date(date)
  console.log("dateCp: ", dateCp)
  dateCp.setDate(dateCp.getDate() + 1); 
  return dateCp
};

const Bike = () => {
  const today = new Date()
  const tomorrowDate = addDateOneDay(today);
  console.log("-- tomorrowDate: ", tomorrowDate)
  
  const [pickupDate, setPickupDate] = React.useState(tomorrowDate);
  const [dropoffDate, setDropoffDate] = React.useState(addDateOneDay(tomorrowDate));

  console.log("-- pickupDate: ", pickupDate)
  console.log("-- dropoffDate: ", dropoffDate)
  const [pickupHour, setPickupHour] = React.useState("10");
  const [pickupMinute, setPickupMinute] = React.useState("00");

  const [dropoffHour, setDropoffHour] = React.useState("10");
  const [dropoffMinute, setDropoffMinute] = React.useState("00");

  const [error, setError] = React.useState(null);
  
  const handlePickupDateChange = (date) => {
    setPickupDate(date);
  };

  const handleDropoffDateChange = (date) => {
    setDropoffDate(date);
  };

  const onBookingHandler = () => {
    setError(null)
    if (!pickupDate || !pickupHour || !pickupMinute) {
      return setError("Select date and time for pickup")
    } else if (!dropoffDate || !dropoffHour || !dropoffMinute) {
      return setError("Select date and time for drop off")
    }
    let pickupDateTmp = pickupDate;
    pickupDateTmp.setHours(parseInt(pickupHour));
    pickupDateTmp.setMinutes(parseInt(pickupMinute));
    pickupDateTmp.setSeconds(0);

    let dropoffDateTmp = dropoffDate;
    dropoffDateTmp.setHours(parseInt(dropoffHour));
    dropoffDateTmp.setMinutes(parseInt(dropoffMinute));
    dropoffDateTmp.setSeconds(0);
    
    if (pickupDateTmp >= dropoffDateTmp) {
      return setError("drop off date should be later than pickup ")
    }
    setPickupDate(pickupDateTmp);
    setDropoffDate(dropoffDateTmp);

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
        <Box>
          <Typography variant="body2" color="textSecondary">
            Pick-up Date
          </Typography>
          <BikeDatepicker 
            initialDate={pickupDate} 
            onDateChange={handlePickupDateChange}
            disabledDates={disabledDates}
          />
          <BikeTimePicker 
            hour={pickupHour} 
            minute={pickupMinute} 
            onHourChange={setPickupHour}
            onMinuteChange={setPickupMinute}
          />
        </Box>
        <Box>
          <Typography variant="body2" color="textSecondary">
            Drop-off Date
          </Typography>
          <BikeDatepicker 
            initialDate={dropoffDate} 
            onDateChange={handleDropoffDateChange}
            disabledDates={disabledDates}
          />
          <BikeTimePicker 
            hour={dropoffHour} 
            minute={dropoffMinute} 
            onHourChange={setDropoffHour}
            onMinuteChange={setDropoffMinute}
          />
        </Box>
        {/* <Grid
          container
          direction="row"
          justify="flex-end"
          alignItems="center"
        >
          <Button variant="contained" color="primary" onClick={onBookingHandler}>
            Book
          </Button>
        </Grid> */}
       
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
              A Coruña
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
