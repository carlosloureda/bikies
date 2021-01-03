import List from '../components/Bike/List';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';

import DatetimeSearch from '../components/DatetimeSearch/DatetimeSearch';
import React from 'react';
import { Autocomplete } from '@material-ui/lab';
import { Button, FormControl, TextField } from '@material-ui/core';
import Rating from '@material-ui/lab/Rating';
import { makeStyles } from '@material-ui/core';
import Api from '../utils/api';

// const disabledDates = ['Wed Dec 30 2020', 'Mon Dec 14 2020'];
const disabledDates = [];

const addDateOneDay = (date: Date) => {
  const dateCp = new Date(date);
  dateCp.setDate(dateCp.getDate() + 1);
  return dateCp;
};

const useStyles = makeStyles((theme) => ({
  searchForm: {
    width: '60%',
    margin: '0 auto',
    [theme.breakpoints.down('sm')]: {
      width: '100%',
      margin: '0 auto',
    },
  },
}));

const Booking = () => {
  const today = new Date();
  const tomorrowDate = addDateOneDay(today);
  const [pickupDate, setPickupDate] = React.useState(tomorrowDate);
  const [dropoffDate, setDropoffDate] = React.useState(
    addDateOneDay(tomorrowDate)
  );
  const [error, setError] = React.useState(null);
  const classes = useStyles();

  const [bikes, setBikes] = React.useState([]);
  const [filters, setFilers] = React.useState({
    locations: [],
    colors: [],
    models: [],
  });
  const [selectedFilters, setSelectedFilters] = React.useState({
    location: '',
    model: '',
    color: '',
    rating: '',
  });

  const getFilters = async () => {
    const result = await Api.get('api/bikes/filters');
    if (!result.success) {
      setError(result.error);
      return;
    }
    setFilers(result.data);
  };

  const getBikes = async (url = 'api/bikes') => {
    // TODO: show bikes free those days
    const result = await Api.get(url);
    if (!result.success) {
      setError(result.error);
      return;
    }
    setBikes(result.data.bikes);
  };

  React.useEffect(() => {
    getFilters();
    getBikes();
  }, [pickupDate, dropoffDate]);

  const onSearch = () => {
    let url = `api/bikes?pickupDate=${pickupDate}&dropoffDate=${dropoffDate}`;
    if (selectedFilters.location) {
      url += `&location=${selectedFilters.location}`;
    }
    if (selectedFilters.model) {
      url += `&model=${selectedFilters.model}`;
    }
    if (selectedFilters.color) {
      url += `&color=${selectedFilters.color}`;
    }
    if (selectedFilters.rating) {
      url += `&rating=${selectedFilters.rating}`;
    }
    getBikes(url);
  };

  return (
    <Box>
      <Box
        style={{
          backgroundColor: '#835990',
          padding: '3rem 2rem',
          marginBottom: '2rem',
        }}
      >
        <Grid container justify="space-around" className={classes.searchForm}>
          <DatetimeSearch
            pickupDate={pickupDate}
            setPickupDate={setPickupDate}
            dropoffDate={dropoffDate}
            setDropoffDate={setDropoffDate}
            disabledDates={disabledDates}
          />
        </Grid>
        <Grid container spacing={1} alignItems="center" justify="center">
          <Grid item lg={3} sm={6} xs={12}>
            <Autocomplete
              freeSolo
              disableClearable
              options={
                filters.locations && filters.locations.map((option) => option)
              }
              onChange={(event, value) => {
                setSelectedFilters({
                  ...selectedFilters,
                  location: value,
                });
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Location"
                  margin="normal"
                  variant="outlined"
                  InputProps={{ ...params.InputProps, type: 'search' }}
                />
              )}
            />
          </Grid>
          <Grid item lg={3} sm={6} xs={12}>
            <Autocomplete
              freeSolo
              onChange={(event, value) => {
                setSelectedFilters({
                  ...selectedFilters,
                  model: value,
                });
              }}
              disableClearable
              options={filters.models && filters.models.map((option) => option)}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Models"
                  margin="normal"
                  variant="outlined"
                  InputProps={{ ...params.InputProps, type: 'search' }}
                />
              )}
            />
          </Grid>
          <Grid item lg={3} sm={6} xs={12}>
            <Autocomplete
              freeSolo
              disableClearable
              onChange={(event, value) => {
                setSelectedFilters({
                  ...selectedFilters,
                  color: value,
                });
              }}
              options={filters.colors && filters.colors.map((option) => option)}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Colors"
                  margin="normal"
                  variant="outlined"
                  InputProps={{ ...params.InputProps, type: 'search' }}
                />
              )}
            />
          </Grid>

          <Grid item lg={3} sm={6} xs={12}>
            <Box
              flexDirection="column"
              display="flex"
              justifyContent="center"
              alignSelf="center"
            >
              <Rating
                name="simple-controlled"
                value={2}
                precision={0.1}
                onChange={(event, value) => {
                  setSelectedFilters({
                    ...selectedFilters,
                    rating: value,
                  });
                }}
              />
            </Box>
          </Grid>
        </Grid>
        <Button
          variant="contained"
          color="primary"
          type="submit"
          // disabled={sending}
          onClick={onSearch}
        >
          Search
        </Button>
      </Box>
      {bikes && <List bikes={bikes} />}
    </Box>
  );
};

export default Booking;
