const randomID = require('../utilities/randomID');

const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true,
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  isSubscribed: {
    type: Boolean,
    default: false,
  },
  uniqueID: {
    type: String,
    default: () => {
      const r = randomID();
      return r;
    },
  },
  subscribedOn: {
    type: Date,
    immutable: true,
    default: () => {
      return Date.now();
    },
  },
});

module.exports = mongoose.model('emails', schema);
