import React from 'react';
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
  InputAdornment,
} from '@material-ui/core';
import { login } from './store/utils/thunkCreators';
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
      fontSize: 13,
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
  const { user, login } = props;

  const handleLogin = async (event) => {
    event.preventDefault();
    const username = event.target.username.value;
    const password = event.target.password.value;

    await login({ username, password });
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
            Don't have an account?
          </Typography>
          <Button
            className={`${classes.button} ${classes.switchBtn}`}
            onClick={() => history.push('/register')}
          >
            Create account
          </Button>
        </Grid>
        <p className={classes.title}>Welcome back!</p>
        <form onSubmit={handleLogin}>
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
                  label="E-mail address"
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
                  label="Password"
                  aria-label="password"
                  type="password"
                  name="password"
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <Typography color="primary">Forgot?</Typography>
                      </InputAdornment>
                    ),
                  }}
                />
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
                Login
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
    login: (credentials) => {
      dispatch(login(credentials));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
