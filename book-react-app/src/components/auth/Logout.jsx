import React from 'react';
import { useHistory } from 'react-router-dom';

const Logout = () => {
    const history = useHistory();

    const handleLogout = () => {
        // Clear authentication tokens from local storage or session storage
        localStorage.removeItem('authToken');

        // Redirect to the login page after logout
        history.push('/login');
    };

    return (
        <div>
            <h2>Logout</h2>
            <p>Are you sure you want to logout?</p>
            <button onClick={handleLogout}>Logout</button>
        </div>
    );
};

export default Logout;
