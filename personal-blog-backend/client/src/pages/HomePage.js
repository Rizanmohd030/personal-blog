
import React from 'react';


const HomePage = () => {
  return (
    <div>
      <h1>Home Page</h1>
      <p>Welcome to the blog! All posts will be listed here.</p>
    </div>
  );
};

// We use 'export default' to make this component available for other files to import.
// Our App.js router will import this component to render it for the "/" path.
export default HomePage;