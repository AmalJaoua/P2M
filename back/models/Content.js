const mongoose = require('mongoose');

const ContentSchema = new mongoose.Schema({
  title: { type: String, required: true },
  type: { type: Boolean, required: true }, // 0 for movies, 1 for series
  description: { type: String },
  release_year: { type: Date },
  genres: [{ type: String }],
  director: { type: String },
  poster_url: { type: String },
  cast: [{ type: String }],
  watch_count: { type: Number, default: 0 },
  languages_available: [{ type: String }],
  subtitles: {
    English: { type: String },
    French: { type: String },
    Arabic: { type: String }
  },
  imdb_id: { type: String },
  streaming_links: [{ type: String }],
  episodes: [
    {
      title: { type: String },
      season: { type: Number },
      episode_number: { type: Number },
      duration: { type: Number }, // Duration in minutes
      release_date: { type: Date },
      streaming_links: [{ type: String }]
    }
  ],
  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }], // User IDs who liked
  mpa: { type: String }, // MPA rating
  rating: { type: Number, min: 0, max: 10 } // Rating field (float between 0 and 10)
});

module.exports = mongoose.model('Content', ContentSchema);
