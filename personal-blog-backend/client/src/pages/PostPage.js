// client/src/pages/PostPage.js

import React, { useState, useEffect } from 'react';
// 1. Make sure useParams is imported from react-router-dom
import { useParams } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
// Use your apiService if you have one, or regular axios
import apiService from '../services/apiService'; 

import { Helmet } from 'react-helmet-async';
import CategoryTag from '../components/CategoryTag';


// Make sure to import your markdown styles
import './markdown-styles.css'; 

const PostPage = () => {
  // HIGHLIGHT START
  // 2. Use object destructuring to get the 'slug' from the URL parameters.
  // The hook knows to look for 'slug' because of the route path we defined in App.js.
  const { slug } = useParams();
  // HIGHLIGHT END

  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // 3. The useEffect hook will now fetch data based on the slug.
  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true);
        // HIGHLIGHT START
        // 4. Update the API call to use the slug variable.
        // This will make a GET request to the endpoint we updated on the backend,
        // e.g., '/api/posts/my-awesome-post'.
        const response = await apiService.get(`/posts/${slug}`);
        // HIGHLIGHT END
        setPost(response.data);
      } catch (err) {
        console.error("Failed to fetch post:", err);
        setError('Post not found or an error occurred.');
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [slug]); // 5. The dependency array is now [slug]. The effect will re-run if the user navigates from one post to another.
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
  // ... The rest of your conditional rendering logic for loading, error, and post display remains the same ...
  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (!post) return <div>Post not found.</div>;



   const categoriesContainerStyle = {
    marginTop: '1rem',
    marginBottom: '1rem',
    borderBottom: '1px solid #eee',
    paddingBottom: '1rem'
  };
  return (
    <article className="post-page">
      <Helmet>
        {/* We create a dynamic title using the post's title. */}
        <title>{`${post.title} | My Awesome Blog`}</title>
        {/* We create a dynamic meta description from the post's content. */}
        <meta 
          name="description" 
          content={createMetaDescription(post.markdownContent)} 
        />
      </Helmet>
      
      
      <h1>{post.title}</h1>
      <p className="post-meta">By {post.author} on {new Date(post.createdAt).toLocaleDateString()}</p>
       {post.categories && post.categories.length > 0 && (
        <div style={categoriesContainerStyle}>
          {post.categories.map(category => (
            <CategoryTag key={category} category={category} />
          ))}
        </div>
      )}
      
      <div className="post-content">
        <ReactMarkdown>{post.markdownContent}</ReactMarkdown>
      </div>
    </article>
  );
};

export default PostPage;