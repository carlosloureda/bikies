import React from 'react';
import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
  } from '@material-ui/pickers';

  interface Options {
    label ?: string,
    dateFormat ?: string // "MM/dd/yyyy"
}

// options.label ..
const BikeDatepicker = (
    {initialDate, onDateChange, disabledDates, options } : 
    {initialDate: Date, onDateChange: any, disabledDates: String[], options?: Options}
) => {

    const [selectedDate, setSelectedDate] = React.useState(initialDate || new Date());
  
    const handleDateChange = (date) => {
      setSelectedDate(date);
      onDateChange(date)
    }
    
    const disabledDays = (date: Date) => {
      const dateString = date.toDateString();
      return disabledDates.includes(dateString);
  
    }
    return (
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <KeyboardDatePicker
          margin="normal"
          label={options && options.label}
          shouldDisableDate={disabledDays}
          format={options && options.dateFormat || "MM/dd/yyyy" }
          value={selectedDate}
          onChange={handleDateChange}
          KeyboardButtonProps={{
            'aria-label': 'change date',
          }}
        />
      </MuiPickersUtilsProvider>
    )
}

export default BikeDatepicker;