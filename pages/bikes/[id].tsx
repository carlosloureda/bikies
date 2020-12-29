import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import Paper from '@material-ui/core/Paper';

import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { makeStyles } from '@material-ui/core/styles';

import React from 'react';
import { Box, Button, Typography } from '@material-ui/core';
import { Alert, AlertTitle } from '@material-ui/lab';
import { columnsTotalWidthSelector } from '@material-ui/data-grid';

const bikeModel = {
  id: 1,
  model: 'bmw',
  color: 'red',
  location: 'A Coruña',
  rating: 3.2,
};

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  menuPaper: {
    maxHeight: 300
  }
}));


const BikeDatepicker = ({initialDate, onDateChange, label="", dateFormat="MM/dd/yyyy"}) => {

  const [selectedDate, setSelectedDate] = React.useState(initialDate || new Date());

  const handleDateChange = (date) => {
    setSelectedDate(date);
    onDateChange(date)
  }
  const disabledDates = [
    "Wed Dec 30 2020", "Mon Dec 14 2020"
  ];
  const disabledDays = (date: Date) => {
    const dateString = date.toDateString();
    return disabledDates.includes(dateString);

  }
  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <KeyboardDatePicker
        margin="normal"
        // id="date-picker-dialog"
        label={label}
        shouldDisableDate={disabledDays}
        format={dateFormat}
        value={selectedDate}
        onChange={handleDateChange}
        KeyboardButtonProps={{
          'aria-label': 'change date',
        }}
      />
    </MuiPickersUtilsProvider>
  )
}

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

  const classes = useStyles();

  const hours = ["00", "01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23"]
  const minutes = ["00", "15", "30", "45"]

  
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
            onDateChange={handleDropoffDateChange}
          />
          <Box>
            <FormControl variant="filled" className={classes.formControl}>
              <Select
                labelId="demo-simple-select-filled-label"
                value={pickupHour}
                onChange={
                  (event: React.ChangeEvent<{ value: unknown }>) => 
                    setPickupHour(event.target.value as string)
                }
                MenuProps={{ classes: { paper: classes.menuPaper } }}
              >
                {hours && hours.map(h =>
                  <MenuItem value={h} key={h}>{h}</MenuItem>
                )}
              </Select>
            </FormControl>

            <FormControl variant="filled" className={classes.formControl}>
              <Select
                labelId="demo-simple-select-filled-label"
                value={pickupMinute}
                onChange={(event: React.ChangeEvent<{ value: string }>) => {
                  setPickupMinute(event.target.value)
                }}
                MenuProps={{ classes: { paper: classes.menuPaper } }}
              >
                {minutes && minutes.map(m =>
                  <MenuItem value={m} key={m}>{m}</MenuItem>
                )}
              </Select>
            </FormControl>
          </Box>
        </Box>
        <Box>
          <Typography variant="body2" color="textSecondary">
            Drop-off Date
          </Typography>
          <BikeDatepicker initialDate={dropoffDate} onDateChange={handlePickupDateChange}/>
          <Box>       
            <FormControl variant="filled" className={classes.formControl}>
              <Select
                labelId="demo-simple-select-filled-label"
                value={dropoffHour}
                onChange={
                  (event: React.ChangeEvent<{ value: unknown }>) => 
                    setDropoffHour(event.target.value as string)
                }
                MenuProps={{ classes: { paper: classes.menuPaper } }}
              >
                {hours && hours.map(h =>
                  <MenuItem value={h} key={h}>{h}</MenuItem>
                )}
              </Select>
            </FormControl>

            <FormControl variant="filled" className={classes.formControl}>
              <Select
                labelId="demo-simple-select-filled-label"
                value={dropoffMinute}
                onChange={(event: React.ChangeEvent<{ value: string }>) => {
                  setDropoffMinute(event.target.value)
                }}
                MenuProps={{ classes: { paper: classes.menuPaper } }}
              >
                {minutes && minutes.map(m =>
                  <MenuItem value={m} key={m}>{m}</MenuItem>
                )}
              </Select>
            </FormControl>
          </Box>
        </Box>
        <Grid
          container
          direction="row"
          justify="flex-end"
          alignItems="center"
        >
          {/* <Grid item xs={12}> */}
            <Button variant="contained" color="primary" onClick={onBookingHandler}
              //  onClick={(event: React.MouseEvent) => {
              //   onBookingHandler(event)
              // }}
            >
              Book
            </Button>
          {/* </Grid> */}

        </Grid>
        <Box>
          <div>Image</div>
          <div>model</div>
          <div>color </div>
          <div>rating</div>
        </Box>
    </Grid>
  </>
  )
};



export default Bike;
