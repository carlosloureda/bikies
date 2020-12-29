import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import Rating from '@material-ui/lab/Rating';
import Box from '@material-ui/core/Box';
import Link from 'next/link';
import { useRouter } from 'next/router';

const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: 250,
    maxWidth: 345,
    // flex: 1,
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
}));

export default function BikeCard({ bike }) {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const enableRating = true;

  const setRating = (rating) => {
    console.log('rating: ', rating);
    setValue(rating);
  };

  const router = useRouter();

  return (
    <Card className={classes.root}>
      <CardHeader
        avatar={
          <Avatar aria-label="recipe" className={classes.avatar}>
            R
          </Avatar>
        }
        // action={
        //   <IconButton aria-label="settings">
        //     <MoreVertIcon />
        //   </IconButton>
        // }
        title="Bike 1"
        subheader="Available"
        onClick={() => router.push(`/bikes/${bike}`)}
      />
      <CardMedia
        className={classes.media}
        image="/static/images/bike1.jpg"
        title="Mountain bike 2"
      />
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          The men's model of the Ortler Bozen with Diamant frame, its Bosch
          Active Plus 400 E-drive and 9-speed gearbox is a 28-inch trekking
          pedalec in its class. Consistent high quality equipment, thought
          through to the last detail and always sovereign: the heart of the
          Bosch Ortler Bozen Premium is its new, intelligent BOSCH electric
          motor.
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <Box
          component="fieldset"
          //   mb={3}
          borderColor="transparent"
          display="flex"
          flexDirection="row"
          justifyContent="space-between"
          alignItems="center"
        >
          {enableRating && (
            <Rating
              name="simple-controlled"
              value={value}
              onChange={(event, newValue) => {
                setRating(newValue);
              }}
            />
          )}
          {!enableRating && <Rating name="read-only" value={value} readOnly />}
          <Link href={`/bikes/${bike}`}>
            <IconButton aria-label="book">
              <ShoppingCartIcon />
            </IconButton>
          </Link>
        </Box>
      </CardActions>
    </Card>
  );
}
