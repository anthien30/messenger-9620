import React, { useState } from 'react';
import { Redirect, useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import {
  Grid,
  Box,
  Typography,
  Button,
  FormControl,
  TextField,
  FormHelperText,
} from '@material-ui/core';
import { register } from './store/utils/thunkCreators';
import SidePicture from './SidePicture';

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
    width: '100vw',
    fontFamily: 'Open Sans',
    fontWeight: 600,
  },
  content: {
    width: '60%',
  },
  button: {
    fontFamily: 'Montserrat',
    color: '#ffffff',
    margin: '30px',
    fontSize: '20px',
    width: 250,
    padding: '15px 0',
  },
  switchBtn: {
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.15)',
    color: theme.palette.primary.main,
  },
  title: {
    fontSize: '2em',
    marginLeft: '17%',
  },
  inputWrapper: {
    width: 'inherit',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    margin: '20px 0',
  },
  input: { width: '66%', padding: '15px 0' },
  '@media (max-width: 960px)': {
    content: {
      width: '100%',
      background:
        'linear-gradient(rgba(255, 255, 255, .90), rgba(134, 185, 255, 0.85)), url("/bg-img.png") no-repeat',
      backgroundSize: 'cover',
    },
  },
  '@media (max-width: 600px)': {
    header: {
      alignItems: 'center',
      fontSize: 12,
    },
    inputWrapper: {
      margin: '5px',
    },
    button: {
      width: '66%',
    },
    switchBtn: {
      maxWidth: '45%',
      margin: '10px',
      padding: '5px',
      lineHeight: '25px',
      fontSize: 'inherit',
    },
    question: {
      fontSize: 'inherit',
    },
    title: {
      fontSize: '1.5em',
    },
  },
}));

const Login = (props) => {
  const classes = useStyles();
  const history = useHistory();
  const { user, register } = props;
  const [formErrorMessage, setFormErrorMessage] = useState({});

  const handleRegister = async (event) => {
    event.preventDefault();
    const username = event.target.username.value;
    const email = event.target.email.value;
    const password = event.target.password.value;
    const confirmPassword = event.target.confirmPassword.value;

    if (password !== confirmPassword) {
      setFormErrorMessage({ confirmPassword: 'Passwords must match' });
      return;
    }

    await register({ username, email, password });
  };

  if (user.id) {
    return <Redirect to="/home" />;
  }

  return (
    <Grid container justifyContent="center" className={classes.root}>
      <SidePicture />
      <Box className={classes.content}>
        <Grid
          container
          item
          className={classes.header}
          justifyContent="flex-end"
          alignItems="center"
        >
          <Typography className={classes.question} color="secondary">
            Already have an account?
          </Typography>
          <Button
            className={`${classes.button} ${classes.switchBtn}`}
            onClick={() => history.push('/login')}
          >
            Login
          </Button>
        </Grid>
        <p className={classes.title}>Create an account</p>
        <form onSubmit={handleRegister}>
          <Grid>
            <Grid>
              <FormControl
                margin="normal"
                required
                className={classes.inputWrapper}
              >
                <TextField
                  className={classes.input}
                  aria-label="username"
                  label="Username"
                  name="username"
                  type="text"
                />
              </FormControl>
            </Grid>
            <Grid>
              <FormControl
                margin="normal"
                required
                className={classes.inputWrapper}
              >
                <TextField
                  className={classes.input}
                  label="E-mail address"
                  aria-label="e-mail address"
                  type="email"
                  name="email"
                />
              </FormControl>
            </Grid>
            <Grid>
              <FormControl
                margin="normal"
                required
                className={classes.inputWrapper}
                error={!!formErrorMessage.confirmPassword}
              >
                <TextField
                  className={classes.input}
                  aria-label="password"
                  label="Password"
                  type="password"
                  inputProps={{ minLength: 6 }}
                  name="password"
                />
                <FormHelperText>
                  {formErrorMessage.confirmPassword}
                </FormHelperText>
              </FormControl>
            </Grid>
            <Grid>
              <FormControl
                margin="normal"
                required
                className={classes.inputWrapper}
                error={!!formErrorMessage.confirmPassword}
              >
                <TextField
                  className={classes.input}
                  label="Confirm Password"
                  aria-label="confirm password"
                  type="password"
                  inputProps={{ minLength: 6 }}
                  name="confirmPassword"
                />
                <FormHelperText>
                  {formErrorMessage.confirmPassword}
                </FormHelperText>
              </FormControl>
            </Grid>
            <Grid container justifyContent="center">
              <Button
                className={classes.button}
                color="primary"
                type="submit"
                variant="contained"
                size="large"
              >
                Create
              </Button>
            </Grid>
          </Grid>
        </form>
      </Box>
    </Grid>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    register: (credentials) => {
      dispatch(register(credentials));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
