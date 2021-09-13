const Conversation = require('./conversation');
const User = require('./user');
const Message = require('./message');
const GroupMember = require('./groupMember');

// associations
// User.hasMany(Conversation);
// Conversation.belongsTo(User, { as: "user1" });
// Conversation.belongsTo(User, { as: "user2" });
// Message.belongsTo(Conversation);
// Conversation.hasMany(Message);
User.belongsToMany(Conversation, { through: GroupMember });
Conversation.belongsToMany(User, { through: GroupMember });
User.hasMany(Message);
Message.belongsTo(User);
Message.belongsTo(Conversation);
Conversation.hasMany(Message);

module.exports = {
  User,
  Conversation,
  Message,
  GroupMember,
};
