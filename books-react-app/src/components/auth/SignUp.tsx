import axios from 'axios';
import React, { useState } from 'react';
import { SignUpFormData } from '../../interfaces';
import { API_URL } from '../../misc/apiConfig';

const SignUp: React.FC = () => {
    const [formData, setFormData] = useState<SignUpFormData>({
        username: '',
        password: '',
        repeatPassword: ''
    });
    const [error, setError] = useState('');

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (formData.password !== formData.repeatPassword) {
            setError('Passwords do not match');
            return;
        }
        axios.post(`${API_URL}/api/signup`, formData)
            .then(response => {
                console.log('Signed up successfully:', response.data);
                // Redirect or handle success as needed
            })
            .catch(error => {
                console.error('Error signing up:', error);
                setError('Error signing up. Please try again later.');
            });
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    return (
        <div>
            <h2>Sign Up</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Username (Email):</label>
                    <input type="email" name="username" value={formData.username} onChange={handleChange} required />
                </div>
                <div>
                    <label>Password:</label>
                    <input type="password" name="password" value={formData.password} onChange={handleChange} required />
                </div>
                <div>
                    <label>Repeat Password:</label>
                    <input type="password" name="repeatPassword" value={formData.repeatPassword} onChange={handleChange} required />
                </div>
                {error && <div>{error}</div>}
                <button type="submit">Sign Up</button>
            </form>
        </div>
    );
};

export default SignUp;
