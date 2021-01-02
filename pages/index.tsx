import Card from '../components/Card';
import List from '../components/List';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';

import DatetimeSearch from "../components/DatetimeSearch/DatetimeSearch";
import React from "react";
import { Autocomplete } from '@material-ui/lab';
import { TextField } from '@material-ui/core';
import Rating from '@material-ui/lab/Rating';
import SiteLayout from '../components/Layouts/SiteLayout';


const SearchBox = () => <div>Search Box</div>;

// TODO: header - login/logout
// TODO: footer

const disabledDates = [
  "Wed Dec 30 2020", "Mon Dec 14 2020"
];


const cities = [
  "Madrid",
  "Barcelona",
  "Valencia",
  "Sevilla",
  "Zaragoza",
  "Málaga",
  "Murcia",
  "Palma",
  "Las Palmas de Gran Canaria",
  "Bilbao",
  "Alicante",
  "Córdoba",
  "Valladolid",
  "Vitoria",
  "La Coruña",
  "Granada",
  "Oviedo",
  "Santa Cruz de Tenerife",
  "Pamplona",
  "Almería",
  "San Sebastián",
  "Burgos",
  "Albacete",
  "Santander",
  "Castellón de la Plana",
  "Logroño",
  "Badajoz",
  "Salamanca",
  "Huelva",
  "Lérida",
  "Tarragona",
  "León",
  "Cádiz",
  "Jaén",
  "Orense",
  "Gerona",
  "Lugo",
  "Cáceres",
  "Melilla",
  "Guadalajara",
  "Toledo",
  "Ceuta",
  "Pontevedra",
  "Palencia",
  "Ciudad Real",
  "Zamora",
  "Ávila",
  "Cuenca",
  "Huesca",
  "Segovia",
  "Soria",
  "Teruel",
];  


const models = [
  "Specialized",
  "Trek",
  "Merida",
  "Scott",
  "Giant",
  "Cube",
  "Lapierre",
  "Orbea",
  "Cannondale",
  "BMC",
  "Canyon",
  "Look",
  "Protek",
  "Megamo",
  "Pinarello",
  "Bianchi",
  "BH",
  "Factor",
  "Ghost",
  "Cervélo",
  "Argon",
];

const colors = [
  "Turquoise", "Orange", "Yellow", "Red",  "Green", "White", "Pink", "Gray", "Black", "Blue"
]

const addDateOneDay = (date: Date) => {
  const dateCp = new Date(date)
  dateCp.setDate(dateCp.getDate() + 1); 
  return dateCp
};

const Example = () => {

  const today = new Date()
  const tomorrowDate = addDateOneDay(today);
  const [pickupDate, setPickupDate] = React.useState(tomorrowDate);
  const [dropoffDate, setDropoffDate] = React.useState(addDateOneDay(tomorrowDate));
  const [error, setError] = React.useState(null);

  return (
    <>    
      <Grid container justify="space-between" style={{width: "50%", margin: "0 auto"}}>
        <DatetimeSearch 
            pickupDate={pickupDate}
            setPickupDate={setPickupDate} 
            dropoffDate={dropoffDate} 
            setDropoffDate={setDropoffDate} 
            disabledDates={disabledDates}
        />
        
      </Grid>
        <Box>
          <Autocomplete
            freeSolo
            // id="free-solo-2-demo"
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
        </Box>
        <Box>
          <Autocomplete
            freeSolo
            // id="free-solo-2-demo"
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
        </Box>
        <Box>
          <Autocomplete
            freeSolo
            // id="free-solo-2-demo"
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
        </Box>

        <Box>
          <Typography variant="body2" color="textSecondary" component="span">
            By rating
          </Typography>
          <Rating
            name="simple-controlled"
            value={2}
            onChange={(event, newValue) => {
              // setRating(newValue);
            }}
          />
        </Box>


      <List />
    </>
  );
};

export default Example;
