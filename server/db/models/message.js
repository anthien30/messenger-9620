const Sequelize = require('sequelize');
const db = require('../db');

const Message = db.define('message', {
  text: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  senderId: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  read: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
});

Message.countUnreadMessages = async function (conversationId, senderId) {
  const count = await Message.count({
    where: {
      conversationId,
      senderId,
      read: false,
    },
  });
  return count;
};

module.exports = Message;
