const express = require('express');
const router = express.Router();
const { authenticate } = require('../middleware/authMiddleware');
const profileController = require('../controllers/profileController');


router.post('/wishlist', authenticate, profileController.addToWishlist);
router.delete('/wishlist', authenticate, profileController.removeFromWishlist);

router.get('/me', authenticate, profileController.getMyProfile);

router.post('/like', authenticate, profileController.addToLikes);
router.delete('/like', authenticate, profileController.removeFromLikes);

module.exports = router;
