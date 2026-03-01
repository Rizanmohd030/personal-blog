import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import apiService from '../services/apiService';
import { Helmet } from 'react-helmet-async';
import CategoryTag from '../components/CategoryTag';
import '../markdown-styles.css';

const PostPage = () => {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true);
        const response = await apiService.get(`/posts/${slug}`);
        setPost(response.data);
      } catch (err) {
        console.error("Failed to fetch post:", err);
        setError('Post not found or an error occurred.');
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [slug]);

  const createMetaDescription = (markdown) => {
    if (!markdown) return '';
    const plainText = markdown
      .replace(/!\[.*?\]\(.*?\)/g, '')
      .replace(/\[(.*?)\]\(.*?\)/g, '$1')
      .replace(/[`*#_~]/g, '')
      .replace(/\s+/g, ' ');

    return plainText.substring(0, 155).trim() + '...';
  };

  if (loading) {
    return (
      <article className="post-page">
        <div className="loading-message">Loading post...</div>
      </article>
    );
  }
  if (error) {
    return (
      <article className="post-page">
        <div className="error-message">{error}</div>
      </article>
    );
  }
  if (!post) {
    return (
      <article className="post-page">
        <div className="error-message">Post not found.</div>
      </article>
    );
  }

  return (
    <article className="post-page">
      <Helmet>
        <title>{`${post.title} | My Awesome Blog`}</title>
        <meta
          name="description"
          content={createMetaDescription(post.markdownContent)}
        />
      </Helmet>

      {/* ✅ CENTERED TITLE SECTION */}
      <header className="post-header-centered">
        <h1 className="post-title-centered">{post.title}</h1>
        <p className="post-meta-centered">
          By {post.author} on {new Date(post.createdAt).toLocaleDateString()}
        </p>

        {post.categories && post.categories.length > 0 && (
          <div className="post-categories-centered">
            {post.categories.map(category => (
              <CategoryTag key={category} category={category} />
            ))}
          </div>
        )}
      </header>

      {/* CONTENT SECTION */}
      <div className="post-full-content">
        <ReactMarkdown>{post.markdownContent}</ReactMarkdown>
      </div>
    </article>
  );
};

export default PostPage;