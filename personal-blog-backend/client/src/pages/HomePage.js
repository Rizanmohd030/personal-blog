import React,{useState,useEffect} from 'react';
import apiService  from '../services/apiService';
import { Helmet } from 'react-helmet-async';


import PostListItem from '../components/PostListItem';
import './HomePage.css';
const HomePage = ()=> {
  //using usestate to perform three peices
   // - posts: an array to hold the blog posts fetched from the API. Initialized to an empty array.
  // - loading: a boolean to indicate when data is being fetched. Initialized to true.
  // - error: a string to hold any error messages. Initialized to null.

  const [post,setPosts] = useState([]);
  const[loading,setLoading] = useState(true);
  const[error,setError] = useState(null);

    // We start on page 1.
  const [currentPage, setCurrentPage] = useState(1);
  // We don't know the total pages yet, so we start with null.
  const [totalPages, setTotalPages] = useState(null);
  //  DATA FETCHING WITH useEffect
    // The empty dependency array [] ensures this effect runs only once.

    useEffect(() => {
      const fetchPosts = async () => {
         setLoading(true);
      setError('');
        try{
        const response = await apiService.get(`/posts?page=${currentPage}&limit=10`);
                const { posts: fetchedPosts, totalPages: fetchedTotalPages } = response.data;

          setPosts(fetchedPosts);
        setTotalPages(fetchedTotalPages);
        }catch (err) {
        console.error("Failed to fetch posts:", err);
        setError("Failed to load posts. Please try again.");
      } finally {
        setLoading(false);
      }
      };
fetchPosts();
},[currentPage]);

  // 7. Handler functions for our pagination buttons.
  const handleNextPage = () => {
    // We only move to the next page if we're not already on the last page.
    if (currentPage < totalPages) {
      setCurrentPage(prevPage => prevPage + 1);
    }
  };

  const handlePreviousPage = () => {
    // We only move to the previous page if we're not on the first page.
    if (currentPage > 1) {
      setCurrentPage(prevPage => prevPage - 1);
    }
  };

  // UI Rendering Logic
  if (loading) return <div>Loading posts...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="home-page">
         <Helmet>
        <title>My Awesome Blog - Latest Posts</title>
        <meta 
          name="description" 
          content="Welcome to My Awesome Blog. Read the latest articles on web development, technology, and more." 
        />
      </Helmet>
      <h1>Latest Posts</h1>
      <div className="post-list">
        {posts.length > 0 ? (
          posts.map(post => <PostListItem key={post._id} post={post} />)
        ) : (
          <p>No posts to display.</p>
        )}
      </div>

      {/* 8. Render the pagination controls only if there are posts and pages. */}
      {totalPages > 0 && (
        <div className="pagination-controls">
          <div className="page-info">
            Page {currentPage} of {totalPages}
          </div>
          <div className="pagination-buttons">
            <button
              onClick={handlePreviousPage}
              disabled={currentPage === 1} // Disable if on the first page
              className="btn"
            >
              Previous
            </button>
            <button
              onClick={handleNextPage}
              disabled={currentPage === totalPages} // Disable if on the last page
              className="btn"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default HomePage;