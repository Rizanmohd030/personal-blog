const Post = require('../models/postModel');

/**
 * @desc    Create a new blog post
 * @route   POST /api/posts
 * @access  Public (for now)
 */
exports.createPost = async (req, res) => {
  try {
    // ADD CATEGORIES: Destructure categories from req.body
    const { title, markdownContent, categories, author } = req.body;

    // A simple backend validation check.
    if (!title || !markdownContent) {
      return res.status(400).json({ message: 'Please provide a title and content for the post.' });
    }

    // ADD CATEGORIES: Include categories in the post creation
    const newPost = await Post.create({
      title,
      markdownContent,
      categories, // Add categories here
      author, 
    });

    res.status(201).json(newPost);

  } catch (error) {
    console.error(error);
    res.status(400).json({ message: 'Error creating post', error: error.message });
  }
};

/**
 * @desc    Get all blog posts
 * @route   GET /api/posts
 * @access  Public (for now)
 */
exports.getAllPosts = async(req , res) =>{
  try{
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    const skip = (page - 1) * limit;
    const totalPosts = await Post.countDocuments();
    
    const posts = await Post.find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    res.status(200).json({
      posts,
      currentPage: page,
      totalPages: Math.ceil(totalPosts / limit),
      totalPosts,
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching posts', error: error.message });
  }
};

/**
 * @desc    Get a single blog post by its slug
 * @route   GET /api/posts/:slug
 * @access  Public
 */
exports.getPostBySlug = async(req,res)=>{
  try{
    const post = await Post.findOne({ slug: req.params.slug });

    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    res.status(200).json(post);
  } catch(error){
    res.status(500).json({ message: 'Error fetching post', error: error.message });
  }
};

/**
 * @desc    Get a single blog post by its ID
 * @route   GET /api/posts/id/:id
 * @access  Public
 */
exports.getPostById = async(req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    res.status(200).json(post);
  } catch(error) {
    if(error.name == 'CastError') {
      return res.status(400).json({ message: `Invalid post ID format: ${req.params.id}` });
    }
    res.status(500).json({ message: 'Error fetching post', error: error.message });
  }
};

/**
 * @desc    Update an existing blog post
 * @route   PATCH /api/posts/:id (or PUT)
 * @access  Public (for now)
 */
exports.updatePost = async(req,res) => {
  try {
    // ADD CATEGORIES: Destructure categories from req.body
    const { title, markdownContent, categories } = req.body;

    // ADD CATEGORIES: Create update data object with categories
    const updatedData = {
      title,
      markdownContent,
      categories, // Add categories here
    };

    const updatedPost = await Post.findByIdAndUpdate(
      req.params.id,
      updatedData, // Use the updatedData object instead of req.body
      {
        new: true,
        runValidators: true,
      }
    );

    if(updatedPost){
      res.status(200).json(updatedPost);
    } else {
      res.status(400).json({ message:'Post not found'});
    }
  } catch(error) {
    console.error(error);

    if(error.name == 'CastError'){
      return res.status(400).json({ message: `Invalid post Id format: ${req.params.id}` });
    }
    if(error.name == 'ValidationError'){
      return res.status(408).json({ message: 'Validation error', error: error.message });
    }
    res.status(500).json({ message: 'Error updating post', error: error.message });
  }
};

/**
 * @desc    Delete a blog post
 * @route   DELETE /api/posts/:id
 * @access  Public (for now)
 */
exports.deletePost = async (req,res) => {
  try {
    const deletedPost = await Post.findByIdAndDelete(req.params.id); 

    if(deletedPost){
      res.status(200).json({ message: 'Post deleted successfully' });
    } else {
      res.status(404).json({ message: 'Post not found' }); 
    }
  } catch(error) {
    console.log(error);

    if(error.name == 'CastError'){
      return res.status(400).json({ message: `Invalid post ID format: ${req.params.id}` }); 
    }

    res.status(500).json({ message: 'Error deleting post', error: error.message }); 
  }
};