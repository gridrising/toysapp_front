import {
  AppBar, Toolbar, Button, Grid, Container, makeStyles,
} from '@material-ui/core';
import { NavLink } from 'react-router-dom';
import React from 'react';
import { connect } from 'react-redux';
import { checkAuth } from '../redux/action/actions';

const useStyle = makeStyles(() => ({
  Link: {
    textDecoration: 'none',
    color: 'white',
  },
}));

const Navbar = (props) => {
  const { isUserLogged, checkAuth } = props;
  const classes = useStyle();
  const handleClick = () => {
    localStorage.removeItem('auth-token');
    localStorage.removeItem('logged-user');
    checkAuth('', '');
  };
  return (
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
                className={classes.Link}
              >
                Home
              </NavLink>
            </Button>
            <Button variant="text">
              <NavLink
                to="/catalog"
                className={classes.Link}
              >
                Catalog
              </NavLink>
            </Button>
            {isUserLogged ? (
              <>
                <Button variant="text">
                  <NavLink
                    to="/table"
                    className={classes.Link}
                  >
                    Table
                  </NavLink>
                </Button>
                <Button variant="text">
                  <NavLink
                    to="/login"
                    className={classes.Link}
                    onClick={handleClick}
                  >
                    Log out
                  </NavLink>
                </Button>
              </>
            ) : (
              <>

                <Button variant="text">
                  <NavLink
                    to="/register"
                    className={classes.Link}
                  >
                    Register
                  </NavLink>
                </Button>
                <Button variant="text">
                  <NavLink
                    to="/login"
                    className={classes.Link}
                  >
                    Log in
                  </NavLink>
                </Button>
              </>
            )}

          </Grid>
        </Container>
      </Toolbar>
    </AppBar>
  );
};
const mapStateToProps = (state) => ({
  isUserLogged: state.isUserLogged,
});

const mapDispatchToProps = {
  checkAuth,
};

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
