import React from 'react';
import Grid from '@material-ui/core/Grid';
import { Box, Typography } from '@material-ui/core';


import BikeDatepicker from "../Datepicker/Datepicker";
import BikeTimePicker from "../TimePicker/TimePicker";

const addDateOneDay = (date: Date) => {
    const dateCp = new Date(date)
    dateCp.setDate(dateCp.getDate() + 1); 
    return dateCp
};

const setTimeToDate = (date, hour, minute) => {
    let dateTmp = date;
    dateTmp.setHours(parseInt(hour));
    dateTmp.setMinutes(parseInt(minute));
    dateTmp.setSeconds(0);
    return dateTmp;

}

const DatetimeSearch = (
    {pickupDate, setPickupDate, dropoffDate, setDropoffDate, disabledDates}
) => {

  const today = new Date()
  const tomorrowDate = addDateOneDay(today);
  
  const [pickupHour, setPickupHour] = React.useState("10");
  const [pickupMinute, setPickupMinute] = React.useState("00");

  const [dropoffHour, setDropoffHour] = React.useState("10");
  const [dropoffMinute, setDropoffMinute] = React.useState("00");

  const handlePickupDateChange = (date) => {
    setPickupDate(setTimeToDate(date, pickupHour, pickupMinute));
  };

  const handlePickupHourChange = (hour) => {
    setPickupDate(setTimeToDate(pickupDate, hour, pickupMinute));
    setPickupHour(hour);
  };

  const handlePickupMinuteChange = (minute) => {
    setPickupDate(setTimeToDate(pickupDate, pickupHour, minute));
    setPickupMinute(minute);
  };

  const handleDropoffDateChange = (date) => {
    setDropoffDate(setTimeToDate(date, dropoffHour, dropoffMinute));
  };

  const handleDropoffHourChange = (hour) => {
    setDropoffDate(setTimeToDate(dropoffDate, hour, dropoffMinute));
    setDropoffHour(hour);
  };

  const handleDropoffMinuteChange = (minute) => {
    setDropoffDate(setTimeToDate(dropoffDate, dropoffHour, minute));
    setDropoffMinute(minute);
  };

   return (
        <>
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
                    onHourChange={handlePickupHourChange}
                    onMinuteChange={handlePickupMinuteChange}
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
                onHourChange={handleDropoffHourChange}
                onMinuteChange={handleDropoffMinuteChange}
                />
            </Box>
        </>    
    )
}

export default DatetimeSearch;