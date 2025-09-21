import React,{useState,useEffect} from 'react';
import axios from 'axios';

import PostListItem from '../components/PostListItem';

const HomePage = ()=> {
  //using usestate to perform three peices
   // - posts: an array to hold the blog posts fetched from the API. Initialized to an empty array.
  // - loading: a boolean to indicate when data is being fetched. Initialized to true.
  // - error: a string to hold any error messages. Initialized to null.

  const [post,setPosts] = useState([]);
  const[loading,setLoading] = useState(true);
  const[error,setError] = useState(null);

  //  DATA FETCHING WITH useEffect
    // The empty dependency array [] ensures this effect runs only once.

    useEffect(() => {
      const fetchPosts = async () => {
        try{
          const response = await axios.get('http://localhost:5000/api/posts');
          setPosts(response.data);
          setError(null);
        }catch(err){
          setError('Failed to fetch Post,Please try again Later. ');
          console.error('Error fetching Posts:',err);
        }finally{               ///this finally runs irrespective of succes or failure
          setLoading(false);  //to end the fetching process
        }
      };
fetchPosts();
},[]);

// CONDITIONAL RENDERING
// - If loading is true, it displays a loading message.
if(loading){
  return<div>Loading Post...</div>;
}

// - If there's an error, it displays the error message.
if(error){
  return<div style={{color:'red'}}>{error}</div>;
}

// render the post
//  If loading is false and there is no error, we render the list of posts.
return(
  <div>
    <h1>Blog Posts</h1>
    {postMessage.length===0?(
      <p>No Post yet.Be the First One To Create one! </p>
    ):(
   
         <div className="post-list">
          {/*
           - The 'post' prop is how we pass the data for a single post down to the child component.
              The name 'post' here must match the destructured name `{ post }` in the child.
          */}
          {post.map(post => (
            <PostListItem key={post._id} post={post} />
          ))}
        </div>
      )}
    </div>
  );
};

export default HomePage;