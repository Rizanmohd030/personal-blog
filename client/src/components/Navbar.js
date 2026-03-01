import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
    return (
        <header className="navbar-container">
            <nav className="navbar glass-card">
                <Link to="/" className="navbar-brand">Blog<span>Platform</span></Link>

                <ul className="navbar-links">
                    <li>
                        <Link to="/" className="nav-link">Home</Link>
                    </li>

                    <li>
                        <Link to="/admin/login" className="btn btn-primary btn-sm login-btn">
                            Admin Access
                        </Link>
                    </li>
                </ul>
            </nav>
        </header>
    );
};

export default Navbar;