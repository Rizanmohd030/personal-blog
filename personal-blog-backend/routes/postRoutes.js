
const express = require('express');

//we can use object to pull the controller functions
const {
    createPost,
    getAllPosts,
    getPostById,
    updatePost,
    deletePost,
} = require('../controllers/postController');

//now i created a router object for handling all routes logic
const router= express.Router();


//here i defines the routes for the post using get and post methods
router.route('/').get(getAllPosts).post(createPost);

//routes for specific endpoints using :id 
router.route('/:id').get(getPostById).patch(updatePost).delete(deletePost);


//export it

module.exports = router;