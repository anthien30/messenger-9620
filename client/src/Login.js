import React from 'react';
import { Redirect, useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { login } from './store/utils/thunkCreators';
import Form from './Form';
import { InputAdornment, Typography } from '@material-ui/core';

const Login = (props) => {
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

  const formElements = [
    {
      label: 'E-mail address',
      ariaLabel: 'username',
      name: 'username',
      type: 'text',
    },
    {
      label: 'Password',
      ariaLabel: 'password',
      name: 'password',
      type: 'password',
      inputProps: {
        endAdornment: (
          <InputAdornment position="end">
            <Typography color="primary">Forgot?</Typography>
          </InputAdornment>
        ),
      },
    },
  ];

  return (
    <Form
      question="Don't have an account?"
      switchBtnText="Create account"
      handleSwitchBtnClick={() => history.push('/register')}
      title="Welcome back!"
      handleBtnSubmit={handleLogin}
      submitBtnText="Login"
      formElements={formElements}
    />
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
