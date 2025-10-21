import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import apiService from '../services/apiService';
import ImageGallery from '../components/ImageGallery'; // ADD THIS IMPORT
import './CreatePost.css';

const EditPost = () => {
  const { id } = useParams();
  const [title, setTitle] = useState('');
  const [markdownContent, setMarkdownContent] = useState('');
  const [categories, setCategories] = useState('');
  const [images, setImages] = useState([]); // ADD: Store images separately
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();
  const textareaRef = useRef(null); // ADD: For cursor position

  // ADD: Handle image insertion at cursor position
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

  // ADD CACHE BUSTING - Force fresh data fetch
  useEffect(() => {
    const fetchPost = async () => {
      setLoading(true);
      try {
        console.log('🔄 Fetching post with ID:', id);
        
        // Add cache-busting timestamp to force fresh request
        const timestamp = new Date().getTime();
        const response = await apiService.get(`/posts/id/${id}?t=${timestamp}`);
        
        console.log('✅ Post data received:', response.data);
        console.log('✅ Post title:', response.data.title);
        console.log('✅ Post images:', response.data.images); // ADD: Log images
        
        setTitle(response.data.title);
        setMarkdownContent(response.data.markdownContent);
        
        // ADD: Load existing images from the post
        if (response.data.images && Array.isArray(response.data.images)) {
          setImages(response.data.images);
        }
        
        if (response.data.categories && Array.isArray(response.data.categories)) {
          setCategories(response.data.categories.join(', '));
        }
      } catch (err) {
        console.error('❌ Failed to fetch post:', err);
        console.error('Error status:', err.response?.status);
        console.error('Error data:', err.response?.data);
        setError('Failed to load post data. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    if (id && id !== 'undefined') {
      fetchPost();
    } else {
      console.error('❌ No ID found in URL');
      setError('No post specified');
      setLoading(false);
    }
  }, [id]); // Dependency on id ensures it refetches when ID changes

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmitting(true);
    setError('');

    if (!title.trim() || !markdownContent.trim()) {
      setError('Title and content are required.');
      setSubmitting(false);
      return;
    }

    const categoriesArray = categories.split(',').map(cat => cat.trim()).filter(cat => cat);

    try {
      // UPDATE: Include images in the update request
      await apiService.put(`/posts/${id}`, {
        title,
        markdownContent,
        categories: categoriesArray,
        images: images // ADD: Send images array to backend
      });
      navigate('/admin/dashboard');
    } catch (err) {
      console.error('Failed to update post:', err);
      setError(err.response?.data?.message || 'Failed to update post. Please try again.');
      setSubmitting(false);
    }
  };

  if (loading) {
    return <div style={{ textAlign: 'center', marginTop: '2rem' }}>Loading post...</div>;
  }

  return (
    <div className="create-post-page">
      <h2>Edit Post</h2>
      <form onSubmit={handleSubmit} className="create-post-form">
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            className="form-control"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            disabled={submitting}
          />
        </div>

        {/* ADD: Image Gallery Section */}
        <ImageGallery 
          images={images}
          onImagesChange={setImages}
          onImageInsert={handleImageInsert}
        />

        <div className="form-group">
          <label htmlFor="markdownContent">Content (Markdown)</label>
          <textarea
            ref={textareaRef} // ADD: Ref for cursor positioning
            id="markdownContent"
            className="form-control markdown-input"
            value={markdownContent}
            onChange={(e) => setMarkdownContent(e.target.value)}
            disabled={submitting}
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
            disabled={submitting}
          />
        </div>
        
        {error && <p className="error-message">{error}</p>}
        <button type="submit" className="submit-btn" disabled={submitting}>
          {submitting ? 'Updating...' : 'Update Post'}
        </button>
      </form>
    </div>
  );
};

export default EditPost;