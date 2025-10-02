// client/src/pages/CreatePost.js

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import apiService from '../services/apiService';
import './CreatePost.css';

const CreatePost = () => {
  const [title, setTitle] = useState('');
  const [markdownContent, setMarkdownContent] = useState('');
  // HIGHLIGHT START
  // 1. Add a new state variable to hold the categories as a string.
  const [categories, setCategories] = useState('');
  // HIGHLIGHT END
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError('');

    if (!title.trim() || !markdownContent.trim()) {
      setError('Title and content are required.');
      setLoading(false);
      return;
    }

    // HIGHLIGHT START
    // 2. Transform the categories string into an array of clean strings.
    // .split(',') creates the array.
    // .map(cat => cat.trim()) removes any leading/trailing whitespace from each category.
    // .filter(cat => cat !== '') removes any empty strings that might result from extra commas (e.g., "React,, Node").
    const categoriesArray = categories.split(',').map(cat => cat.trim()).filter(cat => cat);
    // HIGHLIGHT END

    try {
      // HIGHLIGHT START
      // 3. Include the new 'categoriesArray' in the payload sent to the API.
      await apiService.post('/posts', {
        title,
        markdownContent,
        categories: categoriesArray, // Send the processed array
        author: 'Admin' 
      });
      // HIGHLIGHT END

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
        <div className="form-group">
          <label htmlFor="markdownContent">Content (Markdown)</label>
          <textarea
            id="markdownContent"
            className="form-control markdown-input"
            value={markdownContent}
            onChange={(e) => setMarkdownContent(e.target.value)}
            disabled={loading}
          />
        </div>
        
        {/* HIGHLIGHT START */}
        {/* 4. Add the new input field for categories to the form. */}
        {/*    It's a controlled component tied to our 'categories' state. */}
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
        {/* HIGHLIGHT END */}

        {error && <p className="error-message\">{error}</p>}
        <button type="submit" className="submit-btn" disabled={loading}>
          {loading ? 'Publishing...' : 'Publish Post'}
        </button>
      </form>
    </div>
  );
};

export default CreatePost;