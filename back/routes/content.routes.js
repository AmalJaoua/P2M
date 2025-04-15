const express = require('express');
const router = express.Router();
const contentController = require('../controllers/contentController');
const { authenticate } = require('../middleware/authMiddleware');

router.get('/:id',authenticate, contentController.getContentById);

module.exports = router;