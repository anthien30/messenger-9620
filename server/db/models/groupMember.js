const Sequelize = require('sequelize');
const db = require('../db');

const GroupMember = db.define('member', {
  userId: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  conversationId: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  lastReadMessageId: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: -1,
  },
});

module.exports = GroupMember;
