import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import apiService from '../services/apiService';
import ImageGallery from '../components/ImageGallery';
import './CreatePost.css';

const CreatePost = () => {
  const [title, setTitle] = useState('');
  const [markdownContent, setMarkdownContent] = useState('');
  const [categories, setCategories] = useState('');
  const [images, setImages] = useState([]); // Store images separately
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const textareaRef = useRef(null);

  // Handle image insertion at cursor position
  const handleImageInsert = (markdownImage) => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const cursorPosition = textarea.selectionStart;
    const currentContent = markdownContent;
    
    const newContent = 
      currentContent.substring(0, cursorPosition) +
      markdownImage + '\n\n' +
      currentContent.substring(cursorPosition);
    
    setMarkdownContent(newContent);
    
    // Focus back on textarea
    setTimeout(() => {
      textarea.focus();
      const newCursorPos = cursorPosition + markdownImage.length + 2;
      textarea.setSelectionRange(newCursorPos, newCursorPos);
    }, 10);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError('');

    if (!title.trim() || !markdownContent.trim()) {
      setError('Title and content are required.');
      setLoading(false);
      return;
    }

    const categoriesArray = categories.split(',').map(cat => cat.trim()).filter(cat => cat);

    try {
      // Send both markdown content and images array to backend
      await apiService.post('/posts', {
        title,
        markdownContent,
        categories: categoriesArray,
        images: images, // This will be stored in your MongoDB
        author: 'Admin' 
      });
      
      // Reset form
      setTitle('');
      setMarkdownContent('');
      setCategories('');
      setImages([]);
      
      navigate('/admin/dashboard');
    } catch (err) {
      console.error('Failed to create post:', err);
      setError(err.response?.data?.message || 'Failed to create post. Please try again.');
      setLoading(false);
    }
  };

  return (
    <div className="create-post-page">
      <h2>Create New Post</h2>
      <form onSubmit={handleSubmit} className="create-post-form">
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            className="form-control"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            disabled={loading}
          />
        </div>

        {/* Image Gallery Section */}
        <ImageGallery 
          images={images}
          onImagesChange={setImages}
          onImageInsert={handleImageInsert}
        />

        <div className="form-group">
          <label htmlFor="markdownContent">Content (Markdown)</label>
          <textarea
            ref={textareaRef}
            id="markdownContent"
            className="form-control markdown-input"
            value={markdownContent}
            onChange={(e) => setMarkdownContent(e.target.value)}
            disabled={loading}
            rows="15"
            placeholder="Write your content here. Use the image gallery above to insert images."
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="categories">Categories (comma-separated)</label>
          <input
            type="text"
            id="categories"
            className="form-control"
            value={categories}
            onChange={(e) => setCategories(e.target.value)}
            placeholder="e.g., React, Web Development, Tutorial"
            disabled={loading}
          />
        </div>

        {error && <p className="error-message">{error}</p>}
        <button type="submit" className="submit-btn" disabled={loading}>
          {loading ? 'Publishing...' : 'Publish Post'}
        </button>
      </form>
    </div>
  );
};

export default CreatePost;