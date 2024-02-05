const mongoose = require('mongoose');

const likeSchema = mongoose.Schema({
  message: { type: mongoose.Schema.Types.ObjectId, ref: 'messages' },
  users :  { type: mongoose.Schema.Types.ObjectId, ref: 'users' },
});

const Likes = mongoose.model('likes', likeSchema);

module.exports = Likes;