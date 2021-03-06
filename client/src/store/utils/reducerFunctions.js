export const addMessageToStore = (state, payload) => {
  const { message, sender } = payload;

  // if sender isn't null, that means the message needs to be put in a brand new convo
  if (
    sender !== null &&
    state.every((convo) => convo.otherUser.id !== sender.id)
  ) {
    const newConvo = {
      id: message.conversationId,
      otherUser: sender,
      messages: [message],
    };
    newConvo.latestMessageText = message.text;
    newConvo.unreadMessagesCount = 1;
    return [newConvo, ...state];
  }

  return state
    .map((convo) => {
      if (convo.id === message.conversationId) {
        const newConvo = { ...convo };
        newConvo.messages = [...convo.messages, message];
        newConvo.latestMessageText = message.text;
        if (message.senderId === convo.otherUser.id)
          newConvo.unreadMessagesCount += 1;
        return newConvo;
      } else {
        return convo;
      }
    })
    .sort((convo1, convo2) => {
      let message1 = convo1.messages[convo1.messages.length - 1];
      let message2 = convo2.messages[convo2.messages.length - 1];

      if (message1 && message2) {
        return new Date(message2.createdAt) - new Date(message1.createdAt);
      }
      if (message1) return -1;

      return 1;
    });
};

export const addOnlineUserToStore = (state, id) => {
  return state.map((convo) => {
    if (convo.otherUser.id === id) {
      const convoCopy = { ...convo };
      convoCopy.otherUser.online = true;
      return convoCopy;
    } else {
      return convo;
    }
  });
};

export const removeOfflineUserFromStore = (state, id) => {
  return state.map((convo) => {
    if (convo.otherUser.id === id) {
      const convoCopy = { ...convo };
      convoCopy.otherUser.online = false;
      return convoCopy;
    } else {
      return convo;
    }
  });
};

export const addSearchedUsersToStore = (state, users) => {
  const currentUsers = {};

  // make table of current users so we can lookup faster
  state.forEach((convo) => {
    currentUsers[convo.otherUser.id] = true;
  });

  const newState = [...state];
  users.forEach((user) => {
    // only create a fake convo if we don't already have a convo with this user
    if (!currentUsers[user.id]) {
      let fakeConvo = { otherUser: user, messages: [] };
      newState.push(fakeConvo);
    }
  });

  return newState;
};

export const addNewConvoToStore = (state, recipientId, message) => {
  return state
    .map((convo) => {
      if (convo.otherUser.id === recipientId) {
        const newConvo = { ...convo };
        newConvo.id = message.conversationId;
        newConvo.messages = [...convo.messages, message];
        newConvo.latestMessageText = message.text;
        return newConvo;
      } else {
        return convo;
      }
    })
    .sort((convo1, convo2) => {
      let message1 = convo1.messages[convo1.messages.length - 1];
      let message2 = convo2.messages[convo2.messages.length - 1];

      if (message1 && message2) {
        return new Date(message2.createdAt) - new Date(message1.createdAt);
      }
      if (message1) return -1;

      return 1;
    });
};

export const sortConversationsInStore = (conversations) => {
  return conversations.sort((convo1, convo2) => {
    let message1 = convo1.messages[convo1.messages.length - 1];
    let message2 = convo2.messages[convo2.messages.length - 1];

    return new Date(message2.createdAt) - new Date(message1.createdAt);
  });
};

export const reloadConversationInStore = (state, conversationId) => {
  return state.map((convo) => {
    if (convo.id === conversationId) {
      const newConvo = { ...convo };

      newConvo.unreadMessagesCount = 0;
      newConvo.lastReadMessageId = convo.messages[convo.messages.length - 1].id;
      newConvo.messages = convo.messages.map((message) => {
        return { ...message, read: true };
      });

      return newConvo;
    } else return convo;
  });
};
