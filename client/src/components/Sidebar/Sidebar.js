import React from 'react';
import { Box, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { Search, Chat, CurrentUser } from './index.js';

const useStyles = makeStyles(() => ({
  root: {
    paddingLeft: 21,
    paddingRight: 21,
    flexGrow: 1,
  },
  title: {
    fontSize: 20,
    letterSpacing: -0.29,
    fontWeight: 'bold',
    marginTop: 32,
    marginBottom: 15,
  },
}));

const Sidebar = (props) => {
  const classes = useStyles();
  const conversations = props.conversations || [];
  const { handleChange, searchTerm } = props;

  const displayConversations = (conversations) => {
    let result = conversations.filter((conversation) =>
      conversation.otherUser.username.includes(searchTerm)
    );

    if (result.length > 0) {
      result = result.sort((convo1, convo2) => {
        let message1 = convo1.messages[convo1.messages.length - 1];
        let message2 = convo2.messages[convo2.messages.length - 1];

        if (message1 && message2) {
          return new Date(message2.updatedAt) - new Date(message1.updatedAt);
        }

        return 1;
      });
    }

    result = result.map((conversation) => {
      return (
        <Chat
          conversation={conversation}
          key={conversation.otherUser.username}
        />
      );
    });

    return result;
  };

  return (
    <Box className={classes.root}>
      <CurrentUser />
      <Typography className={classes.title}>Chats</Typography>
      <Search handleChange={handleChange} />
      {displayConversations(conversations)}
    </Box>
  );
};

const mapStateToProps = (state) => {
  return {
    conversations: state.conversations,
  };
};

export default connect(mapStateToProps)(Sidebar);
