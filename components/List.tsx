import Box from '@material-ui/core/Box';
import BikeCard from './Card';

export default function List() {
  const totalCards = 50;
  const cards = Array.from(Array(totalCards).keys());

  return (
    <Box display="flex" flexDirection="row" flexWrap="wrap">
      
      {cards.map((c) => (
        <BikeCard key={c} bike={c} />
      ))}
      <h2>holas</h2>
    </Box>
  );
}
