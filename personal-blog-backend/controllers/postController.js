const Post = require('../models/postModel');
const slugify = require('slugify');


/**
 * @desc    Create a new blog post
 * @route   POST /api/posts
 * @access  Public (for now)
 */
exports.createPost = async (req, res) => {
  try {
    // ADD CATEGORIES: Destructure categories from req.body
    const { title, markdownContent, categories, images, author } = req.body;

    // A simple backend validation check.
    if (!title || !markdownContent) {
      return res.status(400).json({ message: 'Please provide a title and content for the post.' });
    }

    // ADD CATEGORIES: Include categories in the post creation
    const newPost = await Post.create({
      title,
      markdownContent,
      categories,
      images, // Add images here
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
exports.getAllPosts = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const search = req.query.search || '';

    console.log(`Search Request - Term: "${search}", Page: ${page}`);

    const skip = (page - 1) * limit;

    // Create query object
    let query = {};
    if (search) {
      query = {
        $or: [
          { title: { $regex: search, $options: 'i' } },
          { markdownContent: { $regex: search, $options: 'i' } }
        ]
      };
    }

    const totalPosts = await Post.countDocuments(query);

    const posts = await Post.find(query)
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
exports.getPostBySlug = async (req, res) => {
  try {
    const post = await Post.findOne({ slug: req.params.slug });

    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching post', error: error.message });
  }
};

// for mongodb categoriess
exports.getPostsByCategory = async (req, res) => {
  try {
    // 1. Extract the category name from the URL parameters.
    // This 'categoryName' corresponds to the ':categoryName' in our route definition.
    const categoryName = req.params.categoryName;

    // 2. Use Mongoose's find() method to query the database.
    // We are looking for all documents where the 'categories' array field
    // contains the string value of 'categoryName'.
    // Mongoose is smart enough to search for a value within the array.
    const posts = await Post.find({ categories: categoryName })
      .sort({ createdAt: -1 }); // Optional: sort the results by newest first.

    // 3. If no posts are found for a category, Mongoose returns an empty array.
    // This is a valid result, not an error. We simply return the empty array.

    // 4. Send the found posts back to the client with a 200 OK status.
    res.status(200).json(posts);
  } catch (error) {
    // Handle potential server errors (e.g., database connection issue).
    res.status(500).json({ message: 'Error fetching posts by category', error: error.message });
  }
};

/**
 * @desc    Get a single blog post by its ID
 * @route   GET /api/posts/id/:id
 * @access  Public
 */
exports.getPostById = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    res.status(200).json(post);
  } catch (error) {
    if (error.name == 'CastError') {
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
exports.updatePost = async (req, res) => {
  try {
    // ✅ FIX: Add 'images' to destructuring
    const { title, markdownContent, categories, images, author } = req.body;

    // Create update data object
    const updatedData = {
      title,
      markdownContent,
      categories,
      images,
      author,
    };

    const updatedPost = await Post.findByIdAndUpdate(
      req.params.id,
      updatedData,
      {
        new: true,
        runValidators: true,
      }
    );

    if (updatedPost) {
      res.status(200).json(updatedPost);
    } else {
      res.status(404).json({ message: 'Post not found' });
    }
  } catch (error) {
    console.error(error);

    if (error.name === 'CastError') {
      return res.status(400).json({ message: `Invalid post Id format: ${req.params.id}` });
    }
    if (error.name === 'ValidationError') {
      return res.status(400).json({ message: 'Validation error', error: error.message });
    }
    res.status(500).json({ message: 'Error updating post', error: error.message });
  }
};
/**
 * @desc    Delete a blog post
 * @route   DELETE /api/posts/:id
 * @access  Public (for now)
 */
exports.deletePost = async (req, res) => {
  try {
    const deletedPost = await Post.findByIdAndDelete(req.params.id);

    if (deletedPost) {
      res.status(200).json({ message: 'Post deleted successfully' });
    } else {
      res.status(404).json({ message: 'Post not found' });
    }
  } catch (error) {
    console.log(error);

    if (error.name == 'CastError') {
      return res.status(400).json({ message: `Invalid post ID format: ${req.params.id}` });
    }

    res.status(500).json({ message: 'Error deleting post', error: error.message });
  }
};

// Add this to the bottom of your postController.js
const addSlugsToExistingPosts = async () => {
  try {
    const posts = await Post.find();
    let updatedCount = 0;

    for (let post of posts) {
      if (!post.slug) {
        let baseSlug = slugify(post.title, { lower: true, strict: true });
        let finalSlug = baseSlug;
        let counter = 1;

        // Make slug unique if another post has same slug
        while (await Post.findOne({ slug: finalSlug, _id: { $ne: post._id } })) {
          finalSlug = `${baseSlug}-${counter}`;
          counter++;
        }

        post.slug = finalSlug;
        await post.save();
        updatedCount++;
        console.log(`✅ Added slug to "${post.title}": ${post.slug}`);
      }
    }

    console.log(`🎉 Added slugs to ${updatedCount} posts`);
  } catch (error) {
    console.error('❌ Error adding slugs:', error);
  }
};

// Run it once - then remove or comment out after
// addSlugsToExistingPosts();