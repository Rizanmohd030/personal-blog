const express = require('express');
const router = express.Router();


// FIX: Make sure the import matches exactly with your exports
const {
  getAllPosts,
  getPostBySlug,
  getPostById,  // Make sure this matches exactly
  createPost,
  updatePost,
  deletePost,
  getPostsByCategory
} = require('../controllers/postController');


// console.log('Available exports:', Object.keys(postController));


const { protect } = require('../Middleware/authMiddleware');
const { body } = require('express-validator');
const { validate } = require('../Middleware/validateMiddleware');

const postValidationRules = [
  body('title').trim().notEmpty().withMessage('Title is required').isLength({ max: 100 }).withMessage('Title too long'),
  body('markdownContent').notEmpty().withMessage('Content is required'),
  body('categories').optional().isArray().withMessage('Categories must be an array'),
];

// GET all posts
router.get('/', getAllPosts);
router.get('/category/:categoryName', getPostsByCategory);

// GET a single post by its ID
router.get('/id/:id', getPostById);

// GET a single post by its slug
router.get('/:slug', getPostBySlug);

// POST a new post
router.post('/', protect, postValidationRules, validate, createPost);

// for PUT(update)
router.put('/:id', protect, postValidationRules, validate, updatePost);

// for DELETE
router.delete('/:id', protect, deletePost);

module.exports = router;