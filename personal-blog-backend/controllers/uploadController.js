const upload = require('../Middleware/uploadMiddleware');

// Single image upload
const uploadImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ 
        success: false,
        error: 'No image file provided' 
      });
    }

    res.json({
      success: true,
      imageUrl: req.file.path,
      publicId: req.file.filename
    });
  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({ 
      success: false,
      error: 'Image upload failed' 
    });
  }
};

// Multiple images upload
const uploadMultipleImages = async (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ 
        success: false,
        error: 'No image files provided' 
      });
    }

    const imageUrls = req.files.map(file => ({
      url: file.path,
      publicId: file.filename
    }));

    res.json({
      success: true,
      images: imageUrls
    });
  } catch (error) {
    console.error('Multiple upload error:', error);
    res.status(500).json({ 
      success: false,
      error: 'Image upload failed' 
    });
  }
};

module.exports = {
  uploadImage,
  uploadMultipleImages,
  uploadMiddleware: upload
};