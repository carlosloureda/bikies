import React from "react";
import Drawer from "@material-ui/core/Drawer";
import withStyles from "@material-ui/core/styles/withStyles";
import Typography from '@material-ui/core/Typography';
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider
} from "@material-ui/core";
import ConfirmationNumberIcon from '@material-ui/icons/ConfirmationNumber';
import PeopleIcon from '@material-ui/icons/People';
import DirectionsBikeIcon from '@material-ui/icons/DirectionsBike';

const styles = theme => ({
  list: {
    width: 250
  },
  fullList: {
    width: "auto"
  }
});


const DrawerMenu = ({open, toggleDrawerHandler, classes}) => {
    const sideList = side => (
      <div
        className={classes.list}
        role="presentation"
        onClick={toggleDrawerHandler}
        onKeyDown={toggleDrawerHandler}
      >
        {/* <List>
          {["Inbox", "Starred", "Send email", "Drafts"].map((text, index) => (
            <ListItem button key={text}>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List> */}
         <Typography variant="h3" color="textSecondary" component="h3">
          Bikies
        </Typography>
        <Divider />
        <List>
            <ListItem button>
              <ListItemIcon>
                <PeopleIcon />
              </ListItemIcon>
              <ListItemText primary={"Users"} />
            </ListItem>
            <ListItem button>
              <ListItemIcon>
                <DirectionsBikeIcon />
              </ListItemIcon>
              <ListItemText primary={"Bikes"} />
            </ListItem>
            <ListItem button>
              <ListItemIcon>
                <ConfirmationNumberIcon />
              </ListItemIcon>
              <ListItemText primary={"Bookings"} />
            </ListItem>
        </List>
      </div>
    );

    return (
      <Drawer open={open} onClose={toggleDrawerHandler}>
        {sideList("left")}
      </Drawer>
    );
}

export default withStyles(styles)(DrawerMenu);
