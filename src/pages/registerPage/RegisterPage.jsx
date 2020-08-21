import React, { useState } from 'react';
import { connect } from 'react-redux';
import {
  Container,
  TextField,
  makeStyles,
  Typography,
  Button,
} from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import { Link } from 'react-router-dom';
import { registerUser } from '../../redux/action/actions';

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

const RegisterPage = (props) => {
  const { registerUser, isRegistrationSucced, registrationError } = props;
  const classes = useStyle();
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const handleSubmit = (e) => {
    e.preventDefault();
    registerUser({ email, name, password });
    setEmail('');
    setName('');
    setPassword('');
  };
  const handleChangeEmail = (e) => {
    setEmail(e.target.value);
  };
  const handleChangeName = (e) => {
    setName(e.target.value);
  };
  const handleChangePassword = (e) => {
    setPassword(e.target.value);
  };
  return (
    <Container m="auto">
      <form onSubmit={handleSubmit} className={classes.formPositioning} autoComplete="off">
        <Typography className={classes.formElement} variant="h2">
          Registration
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
        <TextField required inputProps={{ minLength: '6' }} className={classes.formElement} id="login" label="Login" value={name} onChange={handleChangeName} />
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
        {isRegistrationSucced ? (
          <Alert variant="outlined" severity="success">
            You register successfully! =)
            Now try to log in!
          </Alert>
        ) : <></>}
        {isRegistrationSucced === false ? (
          <Alert variant="outlined" severity="error">
            {registrationError}
          </Alert>
        ) : <></>}
        <div>
          <Link to="/login" className={classes.Link}>
            <Button
              className={classes.formElement}
              variant="contained"
              color="primary"
              style={{ marginRight: '10px' }}
            >
              Log in
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
const mapStateToProps = (state) => ({
  isRegistrationSucced: state.isRegistrationSucced,
  registrationError: state.registrationError,
});

const mapDispatchToProps = {
  registerUser,
};

export default connect(mapStateToProps, mapDispatchToProps)(RegisterPage);
