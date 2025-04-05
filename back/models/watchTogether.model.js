const mongoose = require('mongoose');

const WatchTogetherSchema = new mongoose.Schema({
  password: { type: Number, required: true },
  usersInSession: [
    {
      _id: false,
      user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    }
  ],
  comments: [
    {
      text: { type: String },
      date: { type: Date, default: Date.now }
    }
  ]
});

module.exports =  mongoose.model('WatchTogether', WatchTogetherSchema);
