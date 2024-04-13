import React, { useState } from 'react';
import { createBrowserHistory } from 'history';
import axios from 'axios';

const Login = () => {
    const [credentials, setCredentials] = useState({ username: '', password: '' });
    const history = createBrowserHistory();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCredentials(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('sprinbooturl/api/login', credentials)
            .then(response => {
                console.log('Login successful:', response.data);
                // Redirect to desired page upon successful login
                history.push('/');
            })
            .catch(error => {
                console.error('Error logging in:', error);
            });
    };

    return (
        <div>
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Username:</label>
                    <input type="text" name="username" value={credentials.username} onChange={handleChange} />
                </div>
                <div>
                    <label>Password:</label>
                    <input type="password" name="password" value={credentials.password} onChange={handleChange} />
                </div>
                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default Login;
