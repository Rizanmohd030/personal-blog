

import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// HIGHLIGHT START
// 1. Import the page components we created in the previous step.
// The './pages/HomePage' path tells React to look for HomePage.js
// inside the 'pages' directory, which is in the same 'src' directory as App.js.
import HomePage from './pages/HomePage';
import PostPage from './pages/PostPage';
import LoginPage from './pages/LoginPage';
// We'll also import the AdminDashboard to prepare for future steps.
import AdminDashboard from './pages/AdminDashboard';

import CreatePost from './pages/CreatePost';
import EditPost from './pages/EditPost';
import CategoryPage from './pages/CategoryPage';

import Navbar from './components/Navbar'; // Adjust path if needed
import ProtectedRoute from './components/ProtectedRoute';


function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Navbar />
        <main>
          <Routes>
            {/* HIGHLIGHT START */}
            {/*
            Each 'element' prop now receives a JSX component instance instead of placeholder text.
            When the path matches, React Router will render the specified component.
          */}
            <Route path="/" element={<HomePage />} />
            <Route path="/post/:slug" element={<PostPage />} />
            <Route path="/category/:categoryName" element={<CategoryPage />} />

            <Route path="/admin/login" element={<LoginPage />} />

            {/* This route will be protected later, but we can define it now. */}

            <Route path="/admin/dashboard"
              element={
                <ProtectedRoute>
                  <AdminDashboard />
                </ProtectedRoute>
              } />
            <Route path="/admin/create-post"
              element={
                <ProtectedRoute>
                  <CreatePost />
                </ProtectedRoute>
              } />
            <Route path="/admin/edit-post/:id"
              element={
                <ProtectedRoute>
                  <EditPost />
                </ProtectedRoute>
              }
            />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;