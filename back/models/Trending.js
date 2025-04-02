const mongoose = require('mongoose');

const TrendingSchema = new mongoose.Schema({
  date: { type: Date, required: true },
  top_movies: [
    {
      movie_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Content' },
      watch_count: { type: Number }
    }
  ]
});

module.exports =  mongoose.model('Trending', TrendingSchema);
