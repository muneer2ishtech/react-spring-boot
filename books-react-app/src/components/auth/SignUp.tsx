import { Button, Table, TableBody, TableCell, TableRow, TextField } from '@mui/material';
import axios from 'axios';
import React, { useState } from 'react';
import { FiSave } from 'react-icons/fi';
import { SignUpFormData } from '../../interfaces';
import { API_URL } from '../../misc/apiConfig';
import AlertMessage, { AlertMessageProps } from '../common/AlertMessage';

const SignUp: React.FC = () => {
    const [formData, setFormData] = useState<SignUpFormData>({
        username: '',
        password: '',
        repeatPassword: ''
    });
    const [error, setError] = useState<string | null>(null);
    const [alertMessageProps, setAlertMessageProps] = useState<AlertMessageProps | null>(null);

    const handleSubmit = () => {
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
        // Clear error message when user changes input
        setError(null);
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', justifyContent: 'center', alignItems: 'center' }}>
            {alertMessageProps && <AlertMessage {...alertMessageProps} />}
            <div style={{ width: '100%', maxWidth: '500px' }}>
                <h2 style={{ textAlign: 'center' }}>SignUp</h2>
                <Table>
                    <TableBody>
                        <TableRow>
                            <TableCell>Username (Email):</TableCell>
                            <TableCell>
                                <TextField required type="email" name="username" value={formData.username} onChange={handleChange} />
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Password:</TableCell>
                            <TableCell>
                                <TextField required type="password" name="password" value={formData.password} onChange={handleChange} />
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Repeat Password:</TableCell>
                            <TableCell>
                                <TextField required type="password" name="repeatPassword" value={formData.repeatPassword} onChange={handleChange} />
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
                {error && <div>{error}</div>}
                <div>
                    <Button variant="contained" startIcon={<FiSave />} style={{ textTransform: 'none', margin: 2 }} onClick={handleSubmit}>Sign Up</Button>
                </div>
            </div>
        </div>
    );

};

export default SignUp;
