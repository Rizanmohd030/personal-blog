// client/src/components/PostListItem.js

import React from 'react';
import { Link } from 'react-router-dom';
import CategoryTag from './CategoryTag';

const PostListItem = ({ post }) => {
  return (
    <article className="post-card glass-card">
      {post.images && post.images.length > 0 && (
        <div className="post-card-image">
          <img src={post.images[0].url} alt={post.title} />
        </div>
      )}
      <div className="post-card-content">
        <h2>
          <Link to={`/post/${post.slug}`}>{post.title}</Link>
        </h2>
        <div className="post-meta">
          <span>By {post.author}</span>
          <span className="dot">•</span>
          <span>{new Date(post.createdAt).toLocaleDateString()}</span>
        </div>

        {post.categories && post.categories.length > 0 && (
          <div className="categories-container">
            {post.categories.map(category => (
              <CategoryTag key={category} category={category} />
            ))}
          </div>
        )}
      </div>

      <div className="post-card-footer">
        <Link to={`/post/${post.slug}`} className="btn btn-outline btn-sm">
          Read More
        </Link>
      </div>
    </article>
  );
};

export default PostListItem;