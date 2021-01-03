import Box from '@material-ui/core/Box';
import BikeCard from './BikeCard';
import Grid from '@material-ui/core/Grid';

export default function List() {
  const totalCards = 50;
  const cards = Array.from(Array(totalCards).keys());

  return (
    <Grid
      container
      spacing={1}
      justify="space-around"
      // display="flex"
      // flexDirection="row"
      // flexWrap="wrap"
      // style={{ backgroundColor: 'red' }}
    >
      {cards.map((c) => (
        <Grid item key={c}>
          <BikeCard bike={c} />
        </Grid>
      ))}
    </Grid>
  );
}
