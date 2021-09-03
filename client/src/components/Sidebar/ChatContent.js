import React, { useState, useEffect } from 'react';
import axios from 'axios';
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
  },
  unreadCount: {
    marginRight: 20,
    backgroundColor: '#3A8DFF',
    borderRadius: '50%',
    fontSize: 10,
    fontWeight: 'bold',
    color: '#FFFFFF',
    letterSpacing: -0.2,
    padding: '2px 6px',
  },
}));

const ChatContent = (props) => {
  const classes = useStyles();

  const { conversation, activeConversation, readMessages } = props;
  const { latestMessageText, otherUser } = conversation;

  const [unreadMessagesCount, setUnreadMessagesCount] = useState(0);

  useEffect(() => {
    const getUnreadMessagesCount = async () => {
      const { data } = await axios.get(
        `/api/messages/${conversation.id}/${otherUser.id}`
      );

      setUnreadMessagesCount(data.count);
    };

    getUnreadMessagesCount();
  }, [conversation, otherUser.id]);

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

    // eslint-disable-next-line
  }, [unreadMessagesCount, activeConversation]);

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
