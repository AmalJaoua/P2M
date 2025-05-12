const Content = require('../models/Content');

exports.getContentById = async (req, res) => {
    try {
      const contentId = req.params.id;
  
      // Check if ID is provided
      if (!contentId) {
        return res.status(400).json({ error: 'Content ID is required' });
      }
  
      const content = await Content.findById(contentId);
  
      if (!content) {
        return res.status(404).json({ error: 'Content not found' });
      }
  
      return res.status(200).json({ content });
    } catch (error) {
      console.error('Error fetching content:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  };
  

exports.searchContent = async (req, res) => {
  const { q } = req.query;

  if (!q) {
    return res.status(400).json({ error: 'Missing search query' });
  }

  try {
    // First, search by title and sort by rating descending
    let results = await Content.find({
      title: { $regex: q, $options: 'i' }
    }).sort({ rating: -1 });

    // If no results in title, search by description (also sorted by rating)
    if (results.length === 0) {
      results = await Content.find({
        description: { $regex: q, $options: 'i' }
      }).sort({ rating: -1 });
    }

    res.status(200).json(results);
  } catch (err) {
    console.error('Search error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};