const mongoose = require('mongoose');

const messageSchema = mongoose.Schema({
  message: String,
  users :  { type: mongoose.Schema.Types.ObjectId, ref: 'users' },
  likes :   [{ type: mongoose.Schema.Types.ObjectId, ref: 'likes' }],
  hashtags :  [{ type: mongoose.Schema.Types.ObjectId, ref: 'hashtags' }],
  date : Date,
});

const Messages = mongoose.model('messages', messageSchema);

module.exports = Messages;