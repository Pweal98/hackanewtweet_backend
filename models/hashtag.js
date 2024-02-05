const mongoose = require('mongoose');

const HastagShema = mongoose.Schema({
  message:[{ type: mongoose.Schema.Types.ObjectId, ref: 'messages' }],
  hashtag : String,
});

const Hastag = mongoose.model('Hastags', HastagShema);

module.exports = Hastag;