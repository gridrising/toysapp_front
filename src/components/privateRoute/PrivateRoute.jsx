import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = ({ component: Component, auth, ...rest }) => (
  <Route
    {...rest}
    render={(props) => (auth === false ? <Redirect to="/login" /> : <Component {...props} />)}
  />
);
export default PrivateRoute;
