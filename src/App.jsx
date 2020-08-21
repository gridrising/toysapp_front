import React, { useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { CircularProgress, Container } from '@material-ui/core';
import HomePage from './pages/home/HomePage';
import CatalogPage from './pages/catalogPage/CatalogPage';
import ToyPage from './pages/toyPage/ToyPage';
import Navbar from './components/Navbar';
import TablePage from './pages/tablePage/TablePage';
import RegisterPage from './pages/registerPage/RegisterPage';
import LoginPage from './pages/loginPage/LoginPage';
import { checkAuth, compareToken } from './redux/action/actions';
import PrivateRoute from './components/privateRoute/PrivateRoute';

function App(props) {
  const {
    isUserLogged, checkAuth, tokenCompared, compareToken,
  } = props;
  useEffect(() => {
    if (
      localStorage.getItem('auth-token')
      && localStorage.getItem('logged-user')
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
          <Navbar isUserLogged={isUserLogged} />
          <Switch>
            <Route path="/toypage/:id" component={ToyPage} />
            <Route exact path="/" component={HomePage} />
            <Route path="/catalog" component={CatalogPage} />
            <PrivateRoute path="/table" auth={isUserLogged} component={TablePage} />
            <Route path="/register" component={RegisterPage} />
            <Route path="/login" component={LoginPage} />
          </Switch>
        </Router>
      ) : <Container align="center"><CircularProgress /></Container>}

    </div>
  );
}

const mapStateToProps = (state) => ({
  isUserLogged: state.isUserLogged,
  tokenCompared: state.tokenCompared,
});

const mapDispatchToProps = {
  checkAuth,
  compareToken,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
