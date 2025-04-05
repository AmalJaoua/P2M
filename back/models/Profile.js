const mongoose = require('mongoose');

const ProfileSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  wish_watch_list: [
    {
      _id: false,
      content_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Content' }
    }
  ],
  watch_history: [
    {
      
      content_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Content' },
      watch_date: { type: Date },
      progress: { type: Number }, // Percentage watched
      last_watched_timestamp: { type: Number }, // in seconds
      is_finished: { type: Boolean }
    }
  ],
  like_history: [
    {
      _id: false,
      content_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Content' }
    }
  ],
  preferences: [{ type: String }]
});

module.exports = mongoose.model('Profile', ProfileSchema);
