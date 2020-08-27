import React, { useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { CircularProgress, Container, makeStyles } from '@material-ui/core';
import HomePage from './pages/home/HomePage';
import CatalogPage from './pages/catalogPage/CatalogPage';
import ToyPage from './pages/toyPage/ToyPage';
import Navbar from './components/Navbar';
import TablePage from './pages/tablePage/TablePage';
import RegisterPage from './pages/registerPage/RegisterPage';
import LoginPage from './pages/loginPage/LoginPage';
import { checkAuth, compareToken } from './redux/action/actions';
import PrivateRoute from './components/privateRoute/PrivateRoute';
import { State, DispatchType } from './types/types';

const useStyles = makeStyles({
  progressContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '500px',
  },
});

type Props = {
  isUserLogged: boolean;
  checkAuth: (token: string | null, id: string) => Promise<void>;
  tokenCompared: boolean;
  compareToken: () => DispatchType;
};

const App = (props: Props) => {
  const classes = useStyles();
  const { isUserLogged, checkAuth, tokenCompared, compareToken } = props;
  useEffect(() => {
    if (
      localStorage.getItem('auth-token') &&
      localStorage.getItem('logged-user')
    ) {
      const token = localStorage.getItem('auth-token');
      const { _id } = JSON.parse(localStorage.getItem('logged-user') || '');
      checkAuth(token, _id);
    } else {
      compareToken();
    }
  }, [isUserLogged, checkAuth, compareToken]);
  return (
    <div className="App">
      {tokenCompared ? (
        <Router>
          <Navbar />
          <Switch>
            <Route path="/toypage/:id" component={ToyPage} />
            <Route exact path="/" component={HomePage} />
            <Route path="/catalog" component={CatalogPage} />
            <PrivateRoute
              path="/table"
              auth={isUserLogged}
              component={TablePage}
            />
            <Route path="/register" component={RegisterPage} />
            <Route path="/login" component={LoginPage} />
          </Switch>
        </Router>
      ) : (
        <Container className={classes.progressContainer}>
          <CircularProgress />
        </Container>
      )}
    </div>
  );
};

const mapStateToProps = (state: State) => ({
  isUserLogged: state.isUserLogged,
  tokenCompared: state.tokenCompared,
});

const mapDispatchToProps = {
  checkAuth,
  compareToken,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
