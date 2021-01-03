import Box from '@material-ui/core/Box';
import BikeCard from './BikeCard';
import Grid from '@material-ui/core/Grid';

export default function List({ bikes }) {
  return (
    <Grid container spacing={1} justify="space-around">
      {bikes.map((bike) => (
        <Grid item key={bike._id}>
          <BikeCard bike={bike} />
        </Grid>
      ))}
    </Grid>
  );
}
