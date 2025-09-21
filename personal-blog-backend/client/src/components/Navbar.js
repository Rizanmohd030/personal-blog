import React from 'react';

import {Link} from 'react-router-dom';

const Navbar = () => {
    return (
        <nav className="navbar">

            <Link to ="/" clasName="navbar-Brand"> My Blog</Link>

            <ul className="navbar-links">
                <li>
                    <Link to="/">Home</Link>
                </li>
                
                <li>
                    <Link to="/admin/login">Admin login</Link>
                </li>

            </ul>
        </nav>
    );
};

export default Navbar;