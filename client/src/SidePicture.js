import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Hidden } from '@material-ui/core';
import TextsmsOutlinedIcon from '@material-ui/icons/TextsmsOutlined';

const useStyles = makeStyles((theme) => ({
  picture: {
    width: '40%',
    background:
      'linear-gradient(rgba(58, 141, 255, 0.85), rgba(134, 185, 255, 0.85)), url("/bg-img.png") no-repeat',
    backgroundSize: 'cover',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    fontFamily: 'inherit',
    fontSize: 33,
  },
  caption: {
    margin: '6px auto',
    color: '#ffffff',
    fontWeight: 400,
  },
}));

const SidePicture = () => {
  const classes = useStyles();

  return (
    <Hidden smDown>
      <Box className={classes.picture}>
        <TextsmsOutlinedIcon
          style={{
            position: 'absolute',
            zIndex: '10',
            top: '28%',
            color: '#ffffff',
            fontSize: '85px',
          }}
        />
        <p className={classes.caption}>Converse with anyone</p>
        <p className={classes.caption}>with any language</p>
      </Box>
    </Hidden>
  );
};

export default SidePicture;
