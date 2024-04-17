import axios from 'axios';
import { createBrowserHistory } from 'history';
import React, { useState } from 'react';
import { API_URL } from '../../misc/apiConfig';

const SignIn: React.FC = () => {
  const history = createBrowserHistory();
  const [credentials, setCredentials] = useState({ username: '', password: '' });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setCredentials(prevCredentials => ({
      ...prevCredentials,
      [name]: value
    }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    axios.post(`${API_URL}/api/signin`, credentials)
      .then(() => {
        // Redirect to desired page after sign in
      })
      .catch(error => {
        console.error('Error signing in:', error);
      });
  };

  return (
    <div>
      <h2>Sign In</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Username:</label>
          <input type="text" name="username" value={credentials.username} onChange={handleChange} />
        </div>
        <div>
          <label>Password:</label>
          <input type="password" name="password" value={credentials.password} onChange={handleChange} />
        </div>
        <button type="submit">Sign In</button>
      </form>
    </div>
  );
};

export default SignIn;
