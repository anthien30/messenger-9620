import React, { useRef, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Typography, Avatar } from '@material-ui/core';

const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
  },
  date: {
    fontSize: 11,
    color: '#BECCE2',
    fontWeight: 'bold',
    marginBottom: 5,
  },
  text: {
    fontSize: 14,
    color: '#91A3C0',
    letterSpacing: -0.2,
    padding: 8,
    fontWeight: 'bold',
  },
  bubble: {
    background: '#F4F6FA',
    borderRadius: '10px 10px 0 10px',
  },
  seenAvatar: {
    height: 20,
    width: 20,
    marginTop: 6,
  },
}));

const SenderBubble = (props) => {
  const classes = useStyles();
  const messageRef = useRef();
  const { time, text, lastSeen, otherUser, last } = props;

  useEffect(() => {
    if (last) {
      messageRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [last]);

  return (
    <Box ref={messageRef} className={classes.root}>
      <Typography className={classes.date}>{time}</Typography>
      <Box className={classes.bubble}>
        <Typography className={classes.text}>{text}</Typography>
      </Box>
      {lastSeen && (
        <Avatar
          alt={otherUser.username}
          src={otherUser.photoUrl}
          className={classes.seenAvatar}
        ></Avatar>
      )}
    </Box>
  );
};

export default SenderBubble;
