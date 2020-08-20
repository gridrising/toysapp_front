import React, { useState } from 'react';
import {
  Container,
  TextField,
  makeStyles,
  Typography,
  Button,
} from '@material-ui/core';
import { Link } from 'react-router-dom';

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

const LoginPage = () => {
  const classes = useStyle();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const handleSubmit = (e) => {
    e.preventDefault();
    // loginUser();
    setEmail('');
    setPassword('');
  };
  const handleChangeEmail = (e) => {
    setEmail(e.target.value);
  };
  const handleChangePassword = (e) => {
    setPassword(e.target.value);
  };
  return (
    <Container m="auto">
      <form onSubmit={handleSubmit} className={classes.formPositioning} noValidate autoComplete="off">
        <Typography className={classes.formElement} variant="h2">
          Log in
        </Typography>
        <TextField type="email" className={classes.formElement} id="email" label="Email" value={email} onChange={handleChangeEmail} />
        <TextField
          className={classes.formElement}
          id="password"
          label="Password"
          value={password}
          onChange={handleChangePassword}
        />
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
  );
};

export default LoginPage;
