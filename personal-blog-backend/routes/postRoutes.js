const express = require('express');
const router = express.Router();


// FIX: Make sure the import matches exactly with your exports
const { 
  getAllPosts, 
  getPostBySlug, 
  getPostById,  // Make sure this matches exactly
  createPost, 
  updatePost, 
  deletePost 
} = require('../controllers/postController');


// console.log('Available exports:', Object.keys(postController));


const { protect } = require('../Middleware/authMiddleware');

// GET all posts
router.get('/', getAllPosts);

// GET a single post by its ID
router.get('/id/:id', getPostById);

// GET a single post by its slug
router.get('/:Slug', getPostBySlug);

// POST a new post
router.post('/', protect, createPost);

// for PUT(update)
router.put('/:id', protect, updatePost);

// for DELETE
router.delete('/:id', protect, deletePost);

module.exports = router;