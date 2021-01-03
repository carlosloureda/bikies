import React from 'react';
import Drawer from '@material-ui/core/Drawer';
import withStyles from '@material-ui/core/styles/withStyles';
import Typography from '@material-ui/core/Typography';
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Link,
} from '@material-ui/core';
import PeopleIcon from '@material-ui/icons/People';
import DirectionsBikeIcon from '@material-ui/icons/DirectionsBike';
import ConfirmationNumberIcon from '@material-ui/icons/ConfirmationNumber';

import { useRouter } from 'next/router';

const styles = (theme) => ({
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
  active: {
    backgroundColor: '#3f51b5',
    color: 'white',
  },
});

const DrawerMenu = ({ open, toggleDrawerHandler, classes }) => {
  const router = useRouter();

  const goTo = (url) => {
    router.push(url);
  };

  const sideList = (side) => (
    <div
      className={classes.list}
      role="presentation"
      onClick={toggleDrawerHandler}
      onKeyDown={toggleDrawerHandler}
    >
      <Typography
        variant="h3"
        style={{
          backgroundColor: '#3f51b5',
          color: 'white',
          padding: '0.25rem 1rem',
        }}
      >
        Bikies
      </Typography>
      <Divider />
      <List>
        <ListItem
          button
          onClick={() => goTo('/admin/users')}
          className={router.pathname === '/admin/users' ? classes.active : ''}
        >
          <ListItemIcon>
            <PeopleIcon />
          </ListItemIcon>
          <ListItemText primary={'Users'} />
        </ListItem>
        <ListItem
          button
          onClick={() => goTo('/admin/bikes')}
          className={router.pathname === '/admin/bikes' ? classes.active : ''}
        >
          <ListItemIcon>
            <DirectionsBikeIcon />
          </ListItemIcon>
          <ListItemText primary={'Bikes'} />
        </ListItem>
        <ListItem
          button
          onClick={() => goTo('/admin/bookings')}
          className={
            router.pathname === '/admin/bookings' ? classes.active : ''
          }
        >
          <ListItemIcon>
            <ConfirmationNumberIcon />
          </ListItemIcon>
          <ListItemText primary={'Bookings'} />
        </ListItem>
      </List>
    </div>
  );

  return (
    <Drawer open={open} onClose={toggleDrawerHandler}>
      {sideList('left')}
    </Drawer>
  );
};

export default withStyles(styles)(DrawerMenu);
