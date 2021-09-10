import React from 'react';
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
import SidePicture from './SidePicture';

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
    width: '100vw',
    fontFamily: theme.typography.fontFamily,
    fontWeight: theme.typography.fontWeight,
  },
  content: {
    width: '60%',
  },
  button: {
    fontFamily: theme.typography.button.special.fontFamily,
    fontWeight: theme.typography.button.special.fontWeight,
    margin: theme.spacing(6),
    fontSize: theme.typography.button.fontSize,
    width: 250,
    padding: theme.typography.padding,
  },
  switchBtn: {
    fontFamily: theme.typography.button.fontFamily,
    fontWeight: theme.typography.button.fontWeight,
    boxShadow: `0 0 ${theme.spacing(2)}px rgba(0, 0, 0, 0.15)`,
    color: theme.palette.primary.main,
  },
  title: {
    fontSize: theme.typography.title.regular.fontSize,
    marginLeft: '17%',
  },
  inputWrapper: {
    width: 'inherit',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    margin: `${theme.spacing(4)} 0`,
  },
  input: { width: '66%', padding: theme.typography.padding },

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
    title: {
      fontSize: theme.typography.title.small.fontSize,
      marginLeft: theme.spacing(0),
      textAlign: 'center',
    },
    inputWrapper: {
      margin: theme.spacing(1),
    },
    button: {
      width: '66%',
    },
    switchBtn: {
      maxWidth: '45%',
      margin: theme.spacing(2),
      padding: theme.spacing(2),
      fontSize: 'inherit',
    },
    question: {
      fontSize: 'inherit',
    },
  },
}));

const Form = (props) => {
  const classes = useStyles();

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
            {props.question}
          </Typography>
          <Button
            className={`${classes.button} ${classes.switchBtn}`}
            onClick={props.handleSwitchBtnClick}
          >
            {props.switchBtnText}
          </Button>
        </Grid>

        <p className={classes.title}>{props.title}</p>

        <form onSubmit={props.handleBtnSubmit}>
          <Grid>
            {props.formElements.map((el, id) => (
              <Grid key={el.label}>
                <FormControl
                  margin="normal"
                  required
                  className={classes.inputWrapper}
                  error={el.error}
                >
                  <TextField
                    className={classes.input}
                    aria-label={el.ariaLabel}
                    label={el.label}
                    name={el.name}
                    type={el.type}
                    InputProps={el.inputProps}
                    autoComplete="off"
                  />
                  {el.errorText && id === 3 && (
                    <FormHelperText margin="dense">
                      {el.errorText}
                    </FormHelperText>
                  )}
                </FormControl>
              </Grid>
            ))}

            <Grid container justifyContent="center">
              <Button
                className={classes.button}
                color="primary"
                type="submit"
                variant="contained"
                size="large"
              >
                {props.submitBtnText}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Box>
    </Grid>
  );
};

export default Form;
