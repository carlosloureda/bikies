import { makeStyles } from '@material-ui/core';
import React from 'react';

import DrawerMenu from '../DrawerMenu/DrawerMenu';
import Navbar from './Navbar/Navbar';

const useStyles = makeStyles({
  main: {
    backgroundColor: 'red',
    display: 'flex',
    minHeight: '100vh',
    flexDirection: 'column',
  },
  body: {
    flex: '1',
    backgroundColor: '#f0f1f5',
    padding: '15px',
  },
  footer: {
    height: '50px',
    backgroundColor: '#1e254a',
    color: '#f0f1f5',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const AdminLayout = ({ children }) => {
  const classes = useStyles();

  const [openMenu, setOpenMenu] = React.useState(false);

  const onToggleMenu = () => {
    setOpenMenu(!openMenu);
  };

  return (
    <main className={classes.main}>
      <header>
        <Navbar showMenu={true} openDrawerHandler={onToggleMenu}></Navbar>
        <DrawerMenu open={openMenu} toggleDrawerHandler={onToggleMenu} />
      </header>
      <section className={classes.body}>{children}</section>

      <footer className={classes.footer}>
        All rights reserved. Made by Carlos Loureda.
      </footer>
    </main>
  );
};

export default AdminLayout;
