const router = require('express').Router();
const { Conversation, Message } = require('../../db/models');
const onlineUsers = require('../../onlineUsers');

// middleware
const convoRecipientOnly = (dataSource) => async (req, res, next) => {
  try {
    if (!req.user) return res.sendStatus(401);

    let { senderId, conversationId } = req[dataSource];
    senderId = parseInt(senderId);
    conversationId = parseInt(conversationId);
    const recipientId = req.user.id;

    if (senderId === recipientId) return res.sendStatus(403);

    let conversation = await Conversation.findConversation(
      senderId,
      recipientId
    );

    if (dataSource === 'body') {
      // user cannot read messages of nonexistant convo or convo user isn't a part of
      if (!conversation || conversation.id !== conversationId)
        return res.sendStatus(403);
    } else {
      // avoid creating error when trying to count messages of nonexistant convo from side bar
      if (!conversation) return res.json({ count: 0 });
      if (conversation.id != conversationId) return res.sendStatus(403);
    }

    next();
  } catch (error) {
    next(error);
  }
};

// expects {recipientId, text, conversationId } in body (conversationId will be null if no conversation exists yet)
router.post('/', async (req, res, next) => {
  try {
    if (!req.user) {
      return res.sendStatus(401);
    }
    const senderId = req.user.id;
    const { recipientId, text, conversationId, sender } = req.body;

    // if we already know conversation id, we can save time and just add it to message and return
    if (conversationId) {
      const message = await Message.create({ senderId, text, conversationId });
      return res.json({ message, sender });
    }
    // if we don't have conversation id, find a conversation to make sure it doesn't already exist
    let conversation = await Conversation.findConversation(
      senderId,
      recipientId
    );

    if (!conversation) {
      // create conversation
      conversation = await Conversation.create({
        user1Id: senderId,
        user2Id: recipientId,
      });
      if (onlineUsers.includes(sender.id)) {
        sender.online = true;
      }
    }
    const message = await Message.create({
      senderId,
      text,
      conversationId: conversation.id,
    });
    res.json({ message, sender });
  } catch (error) {
    next(error);
  }
});

router.put('/', convoRecipientOnly('body'), async (req, res, next) => {
  try {
    const { senderId, conversationId } = req.body;

    await Message.update(
      {
        read: true,
      },
      {
        where: {
          conversationId,
          senderId,
          read: false,
        },
      }
    );

    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
});

router.get(
  '/:conversationId/:senderId',
  convoRecipientOnly('params'),
  async (req, res, next) => {
    try {
      const { senderId, conversationId } = req.params;
      const count = await Message.countUnreadMessages(conversationId, senderId);
      res.json({ count });
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
