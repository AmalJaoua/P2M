const mongoose = require('mongoose');

const AIRecommendationsSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  recommendations: [
    {
      contentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Content' },
      score: { type: Number }
    }
  ],
  lastUpdated: { type: Date, default: Date.now }
});

module.exports = mongoose.model('AIRecommendations', AIRecommendationsSchema);
