import React, { useState } from 'react';
import { Redirect, useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { register } from './store/utils/thunkCreators';
import Form from './Form';

const Login = (props) => {
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

  const formElements = [
    {
      label: 'Username',
      ariaLabel: 'username',
      name: 'username',
      type: 'text',
    },
    {
      label: 'E-mail address',
      ariaLabel: 'e-mail address',
      name: 'email',
      type: 'email',
    },
    {
      label: 'Password',
      ariaLabel: 'password',
      name: 'password',
      type: 'password',
      inputProps: { minLength: 6 },
      error: !!formErrorMessage.confirmPassword,
      errorText: formErrorMessage.confirmPassword,
    },
    {
      label: 'Confirm Password',
      ariaLabel: 'confirm password',
      name: 'confirmPassword',
      type: 'password',
      inputProps: { minLength: 6 },
      error: !!formErrorMessage.confirmPassword,
      errorText: formErrorMessage.confirmPassword,
    },
  ];

  return (
    <Form
      question="Already have an account?"
      switchBtnText="Login"
      handleSwitchBtnClick={() => history.push('/login')}
      title="Create an account"
      handleBtnSubmit={handleRegister}
      submitBtnText="Create"
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
    register: (credentials) => {
      dispatch(register(credentials));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
