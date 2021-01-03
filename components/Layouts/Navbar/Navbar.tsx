import React from 'react';
import { fade, withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import { Link } from '@material-ui/core';
import { useSession, getSession, signOut } from 'next-auth/client';
import { useRouter } from 'next/router';

const styles = (theme) => ({
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    // display: "none",
    // [theme.breakpoints.up("sm")]: {
    display: 'block',
    // }
  },
  sectionDesktop: {
    // display: "none",
    // [theme.breakpoints.up("md")]: {
    display: 'flex',
    // }
  },
  link: {
    textDecoration: 'none',
  },
});

const Navbar = ({ classes, showMenu = true, openDrawerHandler, ...props }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const router = useRouter();

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const goToProfile = () => {
    setAnchorEl(null);
    router.push('/dashboard/me');
  };

  const goToLogout = () => {
    signOut();
    setAnchorEl(null);
    router.push('/');
  };

  const isMenuOpen = Boolean(anchorEl);

  const menuId = 'primary-search-account-menu';

  const renderUserMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={goToProfile}>My account</MenuItem>
      <MenuItem onClick={goToLogout}>Log out</MenuItem>
    </Menu>
  );

  const [session, loading] = useSession();

  console.log('--> session: ', session);

  return (
    <div className={classes.grow}>
      <AppBar position="static">
        <Toolbar>
          {showMenu && (
            <IconButton
              edge="start"
              className={classes.menuButton}
              color="inherit"
              aria-label="open drawer"
              onClick={openDrawerHandler}
            >
              <MenuIcon />
            </IconButton>
          )}
          <Link href="/" color="inherit" className={classes.link}>
            <Typography className={classes.title} variant="h6" noWrap>
              Bikies
            </Typography>
          </Link>
          <div className={classes.grow} />
          {session && (
            <div className={classes.sectionDesktop}>
              <IconButton
                edge="end"
                aria-label="account of current user"
                aria-controls={menuId}
                aria-haspopup="true"
                onClick={handleProfileMenuOpen}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
            </div>
          )}
          {!session && (
            <div className={classes.sectionDesktop}>
              <Link
                className={classes.link}
                color="inherit"
                href="/api/auth/signin"
              >
                Log in
              </Link>
            </div>
          )}
        </Toolbar>
      </AppBar>
      {session && renderUserMenu}
      {/* {!ession && } */}
    </div>
  );
};

export default withStyles(styles)(Navbar);
