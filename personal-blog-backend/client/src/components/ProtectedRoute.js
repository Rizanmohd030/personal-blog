import React from 'react';

import {Navigate} from 'react-router-dom';

//route is protecting (e.g., the <AdminDashboard />). like the below childen prop

const ProtectedRoute = ({children}) => {
    const token = localStorage.getItem('token');

    if(!token){
        // The replace prevents the user from being able to click the "back" button
    // and re-access the protected route after being redirected.

    return< Navigate to="/admin/login" replace/>;
    }

    return children;

};

export default ProtectedRoute;


///The replace Prop: This is very important for a good user experience. Without replace, the browser would have /admin/dashboard in its history, then /admin/login. The user could click the "back" button and end up in a redirect loop. With replace, the /admin/dashboard entry in the history is replaced by /admin/login, so the back button behaves as expected.