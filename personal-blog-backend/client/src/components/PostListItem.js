import React from 'react';
import {Link} from 'react-router-dom';

const PostListItem = ({post}) => {
    const snippet = post.markdownContent
      .replace(/[#*`]/g, '') // Remove markdown characters
      .substring(0, 100); // Get the first 100 characters

    return(
        <article className="post-list-item">
            <h2>
                {/* Use post.slug for clean URLs */}
                <Link to={`/post/${post.slug}`}>{post.title}</Link>
            </h2>
            <div className="post-meta">
                <span>by {post.author}</span> 
                <span>{new Date(post.createdAt).toLocaleDateString()}</span>
            </div>
            <p>{snippet}...</p>
        </article>
    );
};

export default PostListItem;