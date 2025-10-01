import React from 'react';
import {Link} from 'react-router-dom';

// This is a functional component that accepts 'props' as its argument.
// We are using ES6 object destructuring to directly access the 'post' object from the props.
// So instead of writing `props.post.title`, we can just write `post.title`.

const PostListByItem =({post})=>{
    const snippet = post.markdownContent
    .replace(/[#*`]/g,'') // Remove markdown characters`])
    .substring(0,100); // Get the first 100 characters

    return(
        <Link to={`/post/${post.Slug}`} className="post-link">
        <article className = "post-list-item">
            <h2>
                {post.title}
            </h2>
            <div className ="post-meta">
                <span>by {post.author}</span> 
                <span>{new Date(post.createdAt).toLocaleDateString()}</span>
            </div>
            <p>{snippet}...</p>
        </article>
        </Link>
    );
};

export default PostListByItem;

