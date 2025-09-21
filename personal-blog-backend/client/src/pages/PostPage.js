// client/src/pages/PostPage.js

import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import ReactMarkdown from 'react-markdown';

// Import the stylesheet.

import '../markdown-styles.css';

const PostPage = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // ... data fetching logic remains the same
    const fetchPost = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get(`http://localhost:5000/api/posts/${id}`);
        setPost(response.data);
      } catch (err) {
        console.error("Error fetching post:", err);
        if (err.response && err.response.status === 404) {
          setError('Post not found.');
        } else {
          setError('Failed to load the post. Please try again later.');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  // ... conditional rendering for loading/error states remains the same
  if (loading) {
    return <div>Loading post...</div>;
  }
  if (error) {
    return <div style={{ color: 'red', textAlign: 'center', marginTop: '2rem' }}>Error: {error}</div>;
  }
  if (!post) {
    return <div>Post not found.</div>;
  }

  return (
    <article className="post-full">
      <h1>{post.title}</h1>
      <div className="post-full-meta">
        <span>by {post.author}</span>
        <span>Published on {new Date(post.createdAt).toLocaleDateString()}</span>
      </div>
      
      <div className="post-full-content">
        <ReactMarkdown>{post.markdownContent}</ReactMarkdown>
      </div>
    </article>
  );
};

export default PostPage;