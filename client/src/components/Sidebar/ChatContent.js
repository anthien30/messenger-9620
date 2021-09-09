import React, { useState, useEffect } from 'react';
import { Box, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { readMessages } from '../../store/utils/thunkCreators';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginLeft: 20,
    flexGrow: 1,
  },
  username: {
    fontWeight: 'bold',
    letterSpacing: -0.2,
  },
  previewText: {
    fontSize: 12,
    color: '#9CADC8',
    letterSpacing: -0.17,
  },
  unreadText: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: theme.typography.fontSize,
  },
  unreadCount: {
    marginRight: 20,
    backgroundColor: theme.palette.primary.main,
    borderRadius: '45%',
    fontSize: theme.typography.fontSize,
    fontWeight: 'bold',
    color: '#FFFFFF',
    letterSpacing: -0.2,
    padding: '2px 9px',
  },
}));

const ChatContent = (props) => {
  const classes = useStyles();

  const { conversation, activeConversation, readMessages } = props;
  const { latestMessageText, otherUser } = conversation;

  const [unreadMessagesCount, setUnreadMessagesCount] = useState(0);

  useEffect(() => {
    setUnreadMessagesCount(conversation.unreadMessagesCount);
  }, [conversation]);

  useEffect(() => {
    const updateMessageReadStatus = async () => {
      if (
        conversation.otherUser.username === activeConversation &&
        unreadMessagesCount > 0
      ) {
        const reqBody = {
          senderId: otherUser.id,
          conversationId: conversation.id,
        };
        await readMessages(reqBody);
      }
    };
    updateMessageReadStatus();
  }, [
    unreadMessagesCount,
    activeConversation,
    otherUser,
    conversation.otherUser.username,
    conversation.id,
    readMessages,
  ]);

  return (
    <Box className={classes.root}>
      <Box>
        <Typography className={classes.username}>
          {otherUser.username}
        </Typography>
        <Typography
          className={`${classes.previewText} ${
            unreadMessagesCount > 0 ? classes.unreadText : ''
          }`}
        >
          {latestMessageText}
        </Typography>
      </Box>
      {unreadMessagesCount > 0 && (
        <Typography className={classes.unreadCount}>
          {unreadMessagesCount}
        </Typography>
      )}
    </Box>
  );
};

const mapStateToProps = (state) => {
  return {
    activeConversation: state.activeConversation,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    readMessages: (messagesInfo) => {
      dispatch(readMessages(messagesInfo));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ChatContent);
