import React, { useState } from 'react';
import { connect } from 'react-redux';
import {
  Container,
  TextField,
  makeStyles,
  Typography,
  Button,
} from '@material-ui/core';
import { Link, Redirect } from 'react-router-dom';
import Alert from '@material-ui/lab/Alert';
import { loginUser } from '../../redux/action/actions';

const useStyle = makeStyles(() => ({
  formPositioning: {
    marginTop: '50px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  formElement: {
    margin: '15px 0',
  },
  Link: {
    textDecoration: 'none',
  },
}));

const LoginPage = (props) => {
  const { loginUser, isUserLogged, loginError } = props;
  const classes = useStyle();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const handleSubmit = (e) => {
    e.preventDefault();
    loginUser({ email, password });
    setEmail('');
    setPassword('');
  };
  const handleChangeEmail = (e) => {
    setEmail(e.target.value);
  };
  const handleChangePassword = (e) => {
    setPassword(e.target.value);
  };
  return (!isUserLogged ? (
    <Container m="auto">
      <form onSubmit={handleSubmit} className={classes.formPositioning} autoComplete="off">
        <Typography className={classes.formElement} variant="h2">
          Log in
        </Typography>
        <TextField
          required
          className={classes.formElement}
          id="email"
          label="Email"
          type="email"
          inputProps={{ minLength: '7' }}
          value={email}
          onChange={handleChangeEmail}
        />
        <TextField
          className={classes.formElement}
          id="password"
          label="Password"
          type="password"
          inputProps={{ minLength: '6' }}
          required
          value={password}
          onChange={handleChangePassword}
        />
        {loginError ? (
          <Alert variant="outlined" severity="error">
            {loginError}
          </Alert>
        ) : <></>}
        <div>
          <Link to="/register" className={classes.Link}>
            <Button
              className={classes.formElement}
              variant="contained"
              color="primary"
              style={{ marginRight: '10px' }}
            >
              Register
            </Button>
          </Link>
          <Button
            className={classes.formElement}
            variant="contained"
            color="primary"
            type="submit"
          >
            Submit
          </Button>
        </div>
      </form>
    </Container>
  )
    : (
      <Redirect to="/" />
    )
  );
};

const mapStateToProps = (state) => ({
  isUserLogged: state.isUserLogged,
  loginError: state.loginError,
});

const mapDispatchToProps = {
  loginUser,
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
