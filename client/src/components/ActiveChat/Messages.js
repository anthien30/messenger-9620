import React, { useEffect, useState } from 'react';
import { Box } from '@material-ui/core';
import { SenderBubble, OtherUserBubble } from '../ActiveChat';
import moment from 'moment';

const Messages = (props) => {
  const { messages, otherUser, userId } = props;
  const [lastSeenMessageId, setLastSeenMessageId] = useState(-1);

  useEffect(() => {
    for (let i = messages.length - 1; i >= 0; i--) {
      if (messages[i].read && messages[i].senderId === userId) {
        setLastSeenMessageId(messages[i].id);
        break;
      }
    }
  }, [messages, userId, setLastSeenMessageId]);

  return (
    <Box>
      {messages.map((message) => {
        const time = moment(message.createdAt).format('h:mm');

        return message.senderId === userId ? (
          <SenderBubble
            key={message.id}
            text={message.text}
            time={time}
            lastSeen={message.read && message.id === lastSeenMessageId}
            otherUser={otherUser}
          />
        ) : (
          <OtherUserBubble
            key={message.id}
            text={message.text}
            time={time}
            otherUser={otherUser}
          />
        );
      })}
    </Box>
  );
};

export default Messages;
