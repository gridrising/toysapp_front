import React, { useState } from 'react';
import { connect } from 'react-redux';
import {
  Container,
  TextField,
  makeStyles,
  Typography,
  Button,
} from '@material-ui/core';
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
  const { registerUser } = props;
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
      <form onSubmit={handleSubmit} className={classes.formPositioning} noValidate autoComplete="off">
        <Typography className={classes.formElement} variant="h2">
          Registration
        </Typography>
        <TextField className={classes.formElement} id="email" label="Email" value={email} onChange={handleChangeEmail} />
        <TextField className={classes.formElement} id="login" label="Login" value={name} onChange={handleChangeName} />
        <TextField
          className={classes.formElement}
          id="password"
          label="Password"
          value={password}
          onChange={handleChangePassword}
        />
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

});

const mapDispatchToProps = {
  registerUser,
};

export default connect(mapStateToProps, mapDispatchToProps)(RegisterPage);
