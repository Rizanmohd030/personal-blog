
const Post = require('../models/postModel');

/**
 * @desc    Create a new blog post
 * @route   POST /api/posts
 * @access  Public (for now)
 */
const createPost = async (req, res) => {
  try {
    // The `req.body` object contains the JSON data sent by the client, thanks to our `express.json()` middleware.
    const { title, markdownContent, author } = req.body;

    // A simple backend validation check.
    if (!title || !markdownContent) {
      return res.status(400).json({ message: 'Please provide a title and content for the post.' });
    }

    // We pass an object with the data for the new post. The fields should match our Post schema.
    const newPost = await Post.create({
      title,
      markdownContent,
      author, 
    });

    //  Send a success response.

    res.status(201).json(newPost);

  } catch (error) {
 
    console.error(error); // Log the full error to the console for debugging.
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
    const limit = parseInt(req.query.limit) || 10; // Default to 10 posts per page.

        // This is the core formula for pagination.
    const skip = (page - 1) * limit;

        const totalPosts = await Post.countDocuments();
      const posts = await Post.find()
      .sort({ createdAt: -1 }) // Sort by creation date, newest first.
      .skip(skip)               // Skip the documents for previous pages.
      .limit(limit);            // Limit the results to the number per page.

    // 5. Send a structured response with pagination metadata.
    // The frontend will need this information to build pagination controls.
    res.status(200).json({
      posts,
      currentPage: page,
      totalPages: Math.ceil(totalPosts / limit), // Calculate total pages.
      totalPosts,
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching posts', error: error.message });
  }
  }

  /**
 * @desc    Get a single blog post by its ID
 * @route   GET /api/posts/:id
 * @access  Public
 */

  exports.getPostBySlug = async(req,res)=>{
    try{
    const post = await Post.findOne({ slug: req.params.slug });

        if (!post) {
                return res.status(404).json({ message: 'Post not found' });
        }

        res.status(200).json(post);
    }catch(error){
        res.status(500).json({ message: 'Error fetching post', error: error.message });
    
  }
  }
  /**
 * @desc    Update an existing blog post
 * @route   PATCH /api/posts/:id (or PUT)
 * @access  Public (for now)
 */

  const updatePost = async(req,res) => {
    try{
    const updatedPost =await Post.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new:true,
        runValidators: true,
      }
    );


  if(updatedPost){
    res.status(200).json(updatedPost);
  }else{
    res.status(400).json({ message:'Post not  found'});
  }
  }catch(error){
    console.error(error);

    if(error.name == 'CastError'){
      return res.status(400).json({ message: `Invalid post Id format: ${req.params.id} `});
    }
    if(error.name == 'ValidationError'){
      return res.status(400).json({ message: 'Validation error', error:error.message});

    }
    res.status(500).json({ message: 'Error updating post', error:error.message});
  }
  };

  /**
 * @desc    Delete a blog post
 * @route   DELETE /api/posts/:id
 * @access  Public (for now)
 */

const deletePost = async (req,res) => {
  try{
    const deletedPost = await Post.findByIdAndDelete(req.params.id); 

    if(deletedPost){
        res.status(200).json({ message: 'Post deleted successfully' });
    }else{
      res.status(404).json({ message: 'Post not found' }); 
    }
  }catch(error){
    console.log(error);

    if(error.name == 'CastError'){
      return res.status(400).json({ message: `Invalid post ID format: ${req.params.id}`}); 
    }

    res.status(500).json({ message: 'Error deleting post', error:error.message}); 
  }
}






// Export the function.
// We wrap it in an object so we can easily add and export other functions (like getAllPosts, etc.) from this file later.
module.exports = {
  createPost,
  getAllPosts,
  getPostById,
  updatePost,
  deletePost,
};