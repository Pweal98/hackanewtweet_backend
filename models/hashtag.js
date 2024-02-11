const mongoose = require('mongoose');

const HastagShema = mongoose.Schema({
  message:[{ type: mongoose.Schema.Types.ObjectId, ref: 'messages' }],
  hashtag : String,
});

const Hastags = mongoose.model('hashtags', HastagShema);

module.exports = Hastags;