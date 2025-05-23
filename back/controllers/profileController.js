const Profile = require('../models/Profile');
const Content = require('../models/Content');

exports.addToWishlist = async (req, res) => {
  try {
    const userId = req.user.id; 
    const contentId = req.query.content_id;

    if (!contentId) {
      return res.status(400).json({ error: 'Content ID is required' });
    }

    // Optional: Check if the content exists
    const content = await Content.findById(contentId);
    if (!content) {
      return res.status(404).json({ error: 'Content not found' });
    }

    // Find user's profile
    let profile = await Profile.findOne({ userId });
    if (!profile) {
      return res.status(404).json({ error: 'Profile not found' });
    }

    // Check if content is already in the wishlist
    const alreadyExists = profile.wish_watch_list.some(item =>
      item.content_id.toString() === contentId
    );
    if (alreadyExists) {
      return res.status(409).json({ message: 'Content already in wishlist' });
    }

    // Add to wish list
    profile.wish_watch_list.push({ content_id: contentId });

    await profile.save();

    return res.status(200).json({ message: 'Content added to wishlist', profile });
  } catch (err) {
    console.error('Error adding to wishlist:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};
exports.removeFromWishlist = async (req, res) => {
    try {
      const userId = req.user.id;
      const contentId = req.query.content_id;
  
      if (!contentId) {
        return res.status(400).json({ error: 'Content ID is required' });
      }
  
      // Find the user's profile
      const profile = await Profile.findOne({ userId });
      if (!profile) {
        return res.status(404).json({ error: 'Profile not found' });
      }
  
      // Check if the content is in the wishlist
      const index = profile.wish_watch_list.findIndex(item =>
        item.content_id.toString() === contentId
      );
  
      if (index === -1) {
        return res.status(404).json({ message: 'Content not found in wishlist' });
      }
  
      // Remove the content
      profile.wish_watch_list.splice(index, 1);
      await profile.save();
  
      return res.status(200).json({ message: 'Content removed from wishlist', profile });
    } catch (err) {
      console.error('Error removing from wishlist:', err);
      res.status(500).json({ error: 'Internal server error' });
    }
  };
// Add to Likes
exports.addToLikes = async (req, res) => {
  try {
    const userId = req.user.id; // Get the user ID from the request (authentication)
    const contentId = req.query.content_id; // Get the content ID from query parameter

    if (!contentId) {
      return res.status(400).json({ error: 'Content ID is required' });
    }

    // Find the content by ID
    const content = await Content.findById(contentId);
    if (!content) {
      return res.status(404).json({ error: 'Content not found' });
    }

    // Check if the user has already liked the content
    const alreadyLiked = content.likes.some(userId => userId.toString() === req.user.id);
    if (alreadyLiked) {
      return res.status(409).json({ message: 'Content already liked' });
    }

    // Add the user ID to the likes array in the Content model
    content.likes.push(userId);
    await content.save();

    return res.status(200).json({ message: 'Content added to liked list', content });
  } catch (err) {
    console.error('Error adding to likes:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Remove from Likes
exports.removeFromLikes = async (req, res) => {
  try {
    const userId = req.user.id; // Get the user ID from the request (authentication)
    const contentId = req.query.content_id; // Get the content ID from query parameter

    if (!contentId) {
      return res.status(400).json({ error: 'Content ID is required' });
    }

    // Find the content by ID
    const content = await Content.findById(contentId);
    if (!content) {
      return res.status(404).json({ error: 'Content not found' });
    }

    // Check if the user has liked the content
    const index = content.likes.indexOf(userId);
    if (index === -1) {
      return res.status(404).json({ message: 'Content not found in liked list' });
    }

    // Remove the user ID from the likes array in the Content model
    content.likes.splice(index, 1);
    await content.save();

    return res.status(200).json({ message: 'Content removed from liked list', content });
  } catch (err) {
    console.error('Error removing from likes:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

  
exports.getMyProfile = async (req, res) => {
  try {
    const userId = req.user.id;

    const profile = await Profile.findOne({ userId })
    
    if (!profile) {
      return res.status(404).json({ error: 'Profile not found' });
    }

    res.status(200).json({ profile });
  } catch (error) {
    console.error('Error fetching profile:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
