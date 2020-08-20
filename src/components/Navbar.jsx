import {
  AppBar, Toolbar, Button, Grid, Container,
} from '@material-ui/core';
import { NavLink } from 'react-router-dom';
import React from 'react';

const Navbar = () => (
  <AppBar position="static">
    <Toolbar>
      <Container maxWidth="lg">
        <Grid
          container
          direction="row"
          justify="flex-end"
          alignItems="center"
        >
          <Button variant="text">
            <NavLink
              to="/"
              style={{ textDecoration: 'none', color: 'white' }}
            >
              Home
            </NavLink>
          </Button>
          <Button variant="text">
            <NavLink
              to="/catalog"
              style={{ textDecoration: 'none', color: 'white' }}
            >
              Catalog
            </NavLink>
          </Button>
          <Button variant="text">
            <NavLink
              to="/table"
              style={{ textDecoration: 'none', color: 'white' }}
            >
              Table
            </NavLink>
          </Button>
        </Grid>
      </Container>
    </Toolbar>
  </AppBar>
);

export default Navbar;
