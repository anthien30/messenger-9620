import React from 'react';
import { Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { SenderBubble, OtherUserBubble } from '../ActiveChat';
import moment from 'moment';

const useStyles = makeStyles(() => ({
  messages: {
    '&::-webkit-scrollbar': {
      display: 'none',
    },

    maxHeight: '68vh',
    overflowY: 'scroll',
  },
}));

const Messages = (props) => {
  const classes = useStyles();
  const { messages, otherUser, userId, lastReadMessageId } = props;

  return (
    <Box className={classes.messages}>
      {messages.map((message, id) => {
        const time = moment(message.createdAt).format('h:mm');

        return message.senderId === userId ? (
          <SenderBubble
            key={message.id}
            text={message.text}
            time={time}
            lastSeen={message.read && message.id === lastReadMessageId}
            otherUser={otherUser}
            last={id === messages.length - 1}
          />
        ) : (
          <OtherUserBubble
            key={message.id}
            text={message.text}
            time={time}
            otherUser={otherUser}
            last={id === messages.length - 1}
          />
        );
      })}
    </Box>
  );
};

export default Messages;
