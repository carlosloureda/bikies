import List from '../components/Bike/List';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';

import DatetimeSearch from '../components/DatetimeSearch/DatetimeSearch';
import React from 'react';
import { Autocomplete } from '@material-ui/lab';
import { FormControl, TextField } from '@material-ui/core';
import Rating from '@material-ui/lab/Rating';
import { makeStyles } from '@material-ui/core';

// TODO: header - login/logout
// TODO: footer

const disabledDates = ['Wed Dec 30 2020', 'Mon Dec 14 2020'];

const cities = [
  'Madrid',
  'Barcelona',
  'Valencia',
  'Sevilla',
  'Zaragoza',
  'Málaga',
  'Murcia',
  'Palma',
  'Las Palmas de Gran Canaria',
  'Bilbao',
  'Alicante',
  'Córdoba',
  'Valladolid',
  'Vitoria',
  'La Coruña',
  'Granada',
  'Oviedo',
  'Santa Cruz de Tenerife',
  'Pamplona',
  'Almería',
  'San Sebastián',
  'Burgos',
  'Albacete',
  'Santander',
  'Castellón de la Plana',
  'Logroño',
  'Badajoz',
  'Salamanca',
  'Huelva',
  'Lérida',
  'Tarragona',
  'León',
  'Cádiz',
  'Jaén',
  'Orense',
  'Gerona',
  'Lugo',
  'Cáceres',
  'Melilla',
  'Guadalajara',
  'Toledo',
  'Ceuta',
  'Pontevedra',
  'Palencia',
  'Ciudad Real',
  'Zamora',
  'Ávila',
  'Cuenca',
  'Huesca',
  'Segovia',
  'Soria',
  'Teruel',
];

const models = [
  'Specialized',
  'Trek',
  'Merida',
  'Scott',
  'Giant',
  'Cube',
  'Lapierre',
  'Orbea',
  'Cannondale',
  'BMC',
  'Canyon',
  'Look',
  'Protek',
  'Megamo',
  'Pinarello',
  'Bianchi',
  'BH',
  'Factor',
  'Ghost',
  'Cervélo',
  'Argon',
];

const colors = [
  'Turquoise',
  'Orange',
  'Yellow',
  'Red',
  'Green',
  'White',
  'Pink',
  'Gray',
  'Black',
  'Blue',
];

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

  return (
    <Box>
      <Box
        style={{
          backgroundColor: '#835990',
          // borderRadius: '25px',
          padding: '3rem 2rem',
          marginBottom: '2rem',
          // color: 'white',
        }}
      >
        <Grid
          container
          justify="space-around"
          className={classes.searchForm}
          // style={{ width: '60%', margin: '0 auto', color: 'white' }}
        >
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
              options={cities.map((option) => option)}
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
              disableClearable
              options={models.map((option) => option)}
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
              options={colors.map((option) => option)}
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
                onChange={(event, newValue) => {
                  // setRating(newValue);
                }}
              />
            </Box>
            {/* <FormControl style={{ border: '1px black solid' }}> */}
            {/* <Typography variant="body2" color="textSecondary" component="span">
                By rating
              </Typography> */}
            {/* </FormControl> */}
          </Grid>
        </Grid>
      </Box>
      <List />
    </Box>
  );
};

export default Booking;
