const mongoose = require('mongoose');

const messageSchema = mongoose.Schema({
  message: String,
  users :  { type: mongoose.Schema.Types.ObjectId, ref: 'users' },
  likes :   [{ type: mongoose.Schema.Types.ObjectId, ref: 'likes' }],
  hashtag :   [{ type: mongoose.Schema.Types.ObjectId, ref: 'hashtags' }]
});

const Messages = mongoose.model('messages', messageSchema);

module.exports = Messages;