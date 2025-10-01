// client/src/pages/PostPage.js

import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
// HIGHLIGHT START
// 1. Import the Helmet component here as well.
import { Helmet } from 'react-helmet-async';
// HIGHLIGHT END
import ReactMarkdown from 'react-markdown';
import apiService from '../services/apiService';
import './markdown-styles.css';

const PostPage = () => {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchPost = async () => {
      // ... your existing data fetching logic remains the same ...
      try {
        const response = await apiService.get(`/posts/${slug}`);
        setPost(response.data);
      } catch (err) {
        setError('Post not found or an error occurred.');
      } finally {
        setLoading(false);
      }
    };
    fetchPost();
  }, [slug]);

  // A helper function to create a short, clean description from the markdown content.
  const createMetaDescription = (markdown) => {
    if (!markdown) return '';
    // Remove Markdown formatting and trim to a suitable length (e.g., 155 chars).
    const plainText = markdown
      .replace(/!\[.*?\]\(.*?\)/g, '') // Remove images
      .replace(/\[(.*?)\]\(.*?\)/g, '$1') // Keep link text
      .replace(/[`*#_~]/g, '') // Remove markdown characters
      .replace(/\s+/g, ' '); // Normalize whitespace
    
    return plainText.substring(0, 155).trim() + '...';
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  // This check is important. We don't want to render the Helmet if the post doesn't exist.
  if (!post) return <div>Post not found.</div>;

  return (
    <article className="post-page">
      {/* HIGHLIGHT START */}
      {/* 2. Add the Helmet component, using the fetched 'post' data. */}
      <Helmet>
        {/* We create a dynamic title using the post's title. */}
        <title>{`${post.title} | My Awesome Blog`}</title>
        {/* We create a dynamic meta description from the post's content. */}
        <meta 
          name="description" 
          content={createMetaDescription(post.markdownContent)} 
        />
      </Helmet>
      {/* HIGHLIGHT END */}

      <h1>{post.title}</h1>
      <p className="post-meta">By {post.author} on {new Date(post.createdAt).toLocaleDateString()}</p>
      <div className="post-content">
        <ReactMarkdown>{post.markdownContent}</ReactMarkdown>
      </div>
    </article>
  );
};

export default PostPage;