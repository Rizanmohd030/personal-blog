import React, { useState } from 'react';
import ImageUpload from './ImageUpload';
import './ImageGallery.css';

const ImageGallery = ({ images = [], onImagesChange, onImageInsert }) => {
  // ✅ State to control if gallery is expanded or collapsed
  const [isExpanded, setIsExpanded] = useState(true);

  // Handle new image upload
  const handleImageUpload = (imageUrl) => {
    const newImage = {
      url: imageUrl,
      publicId: `img-${Date.now()}`,
      caption: '',
      position: images.length
    };
    
    const updatedImages = [...images, newImage];
    onImagesChange(updatedImages);
    
    // ✅ Keep gallery expanded after upload
    setIsExpanded(true);
  };

  // Handle image deletion
  const handleDeleteImage = (index) => {
    const updatedImages = images.filter((_, i) => i !== index);
    onImagesChange(updatedImages);
  };

  // Update image caption
  const handleCaptionChange = (index, caption) => {
    const updatedImages = images.map((img, i) => 
      i === index ? { ...img, caption } : img
    );
    onImagesChange(updatedImages);
  };

  // Insert image at cursor position in markdown
  const handleInsertImage = (imageUrl, caption) => {
    const markdownImage = `![${caption}](${imageUrl})`;
    onImageInsert(markdownImage);
    
    // ✅ Keep gallery open after inserting
    // (Don't change isExpanded state)
  };

  return (
    <div className="image-gallery">
      <div className="gallery-header" onClick={() => setIsExpanded(!isExpanded)}>
        <h4>
          <span className="toggle-icon">{isExpanded ? '▼' : '▶'}</span>
          📷 Image Gallery
        </h4>
        <p>Upload images and insert them into your post</p>
      </div>

      {/* ✅ Only show content when expanded */}
      {isExpanded && (
        <>
          {/* Image Upload */}
          <div className="upload-section">
            <ImageUpload 
              onImageUpload={handleImageUpload} 
              multiple={false}
            />
          </div>

          {/* Image Grid */}
          {images.length > 0 && (
            <div className="images-grid">
              <h5>Uploaded Images ({images.length})</h5>
              <div className="images-container">
                {images.map((image, index) => (
                  <div key={index} className="image-item">
                    <div className="image-preview">
                      <img src={image.url} alt={`Upload ${index + 1}`} />
                      <button
                        type="button"
                        className="delete-btn"
                        onClick={() => handleDeleteImage(index)}
                        title="Delete image"
                      >
                        ×
                      </button>
                    </div>
                    
                    <div className="image-actions">
                      <input
                        type="text"
                        placeholder="Add caption (optional)"
                        value={image.caption}
                        onChange={(e) => handleCaptionChange(index, e.target.value)}
                        className="caption-input"
                      />
                      
                      <button
                        type="button"
                        className="insert-btn"
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          handleInsertImage(image.url, image.caption || 'Image');
                        }}
                        title="Insert into content"
                      >
                        Insert into Post
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {images.length === 0 && (
            <div className="empty-state">
              <p>No images uploaded yet. Upload your first image to get started!</p>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default ImageGallery;