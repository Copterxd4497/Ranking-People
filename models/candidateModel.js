const mongoose = require('mongoose');

const candidateSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'candidate must have a name'],
    set: val => val.charAt(0).toUpperCase() + val.slice(1)
  },
  photo: {
    type: String,
    required: [true, 'candidate must have a photo']
  },
  class: {
    type: String,
    required: [true, 'candidate must have class']
  },
  gender: {
    type: String,
    required: [true, 'candidate must have class'],
    trim: true
  },
  chosed: { type: Number, default: 0 },
  clickedBy: [String] // Array to store user names
});

const Candidate = mongoose.model('Candidate', candidateSchema);

module.exports = Candidate;
