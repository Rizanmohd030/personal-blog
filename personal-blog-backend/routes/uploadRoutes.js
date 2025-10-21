const express = require('express');
const router = express.Router();
const { uploadImage, uploadMultipleImages, uploadMiddleware } = require('../controllers/uploadController');
const { protect } = require('../Middleware/authMiddleware');

// Protect all upload routes with admin authentication
router.use(protect);

// Single image upload
router.post('/single', uploadMiddleware.single('image'), uploadImage);

// Multiple images upload
router.post('/multiple', uploadMiddleware.array('images', 10), uploadMultipleImages);

module.exports = router;