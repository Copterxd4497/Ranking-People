const mongoose = require('mongoose');

const voteSchema = new mongoose.Schema({
  HowManyTime: Number,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Vote = mongoose.model('Vote', voteSchema);
module.exports = Vote;
