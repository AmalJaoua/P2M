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
  
  
  
  
  
  
  