
const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController');


const {protect} = require('../Middleware/authMiddleware');


// GET all posts
router.get('/', postController.getAllPosts);
// GET a single post by its ID
router.get('/:id', postController.getPostById);

// POST a new post
// --- PROTECTED ADMIN ROUTES ---
// These routes are for modifying data and must be protected.
// A user must be logged in as an admin to access them.
router.post('/', protect, postController.createPost);

//for PUT(update)
router.put('/:id', protect, postController.updatePost);

//for DELETE
router.delete('/:id', protect, postController.deletePost);

//export it

module.exports = router;