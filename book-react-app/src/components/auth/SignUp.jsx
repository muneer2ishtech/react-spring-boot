import React, { useState } from 'react';
import { createBrowserHistory } from 'history';
import axios from 'axios';

const Signup = () => {
    const [user, setUser] = useState({ username: '', email: '', password: '' });
    const history = createBrowserHistory();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('sprinbooturl/api/signup', user)
            .then(response => {
                console.log('Signup successful:', response.data);
                // Redirect to login page upon successful signup
                history.push('/login');
            })
            .catch(error => {
                console.error('Error signing up:', error);
            });
    };

    return (
        <div>
            <h2>Signup</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Username:</label>
                    <input type="text" name="username" value={user.username} onChange={handleChange} />
                </div>
                <div>
                    <label>Email:</label>
                    <input type="email" name="email" value={user.email} onChange={handleChange} />
                </div>
                <div>
                    <label>Password:</label>
                    <input type="password" name="password" value={user.password} onChange={handleChange} />
                </div>
                <button type="submit">Signup</button>
            </form>
        </div>
    );
};

export default Signup;
