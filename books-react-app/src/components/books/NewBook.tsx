import { Button, CircularProgress, Table, TableBody, TableCell, TableRow, TextField } from '@mui/material';
import axios from 'axios';
import { createBrowserHistory } from 'history';
import React, { useState } from 'react';
import { BiReset } from 'react-icons/bi';
import { FiSave } from 'react-icons/fi';
import { TbBooks } from 'react-icons/tb';
import { NewBook as Book } from '../../interfaces';
import { API_URL, defaultHeaders } from '../../misc/apiConfig';
import '../../styles/table.css';
import AlertMessage, { AlertMessageProps } from '../common/AlertMessage';

const initialBookState: Book = {
    id: null,
    title: '',
    author: '',
    year: 0,
    price: 0
};

const NewBook: React.FC = () => {
    const history = createBrowserHistory();
    const [book, setBook] = useState<Book>(initialBookState);
    const [loading, setLoading] = useState<boolean>(false);
    const [alertMessageProps, setAlertMessageProps] = useState<AlertMessageProps | null>(null);

    const handleSave = () => {
        if (book) {
            setLoading(true);
            axios.post(`${API_URL}/api/v1/books`, book, { headers: defaultHeaders })
                .then(response => {
                    const newBookId = response.data?.id;
                    setAlertMessageProps({ severity: 'success', message: `Book(${newBookId}) created successfully.` });
                    newBookId ? history.push(`/books/${newBookId}`) : history.push(`/books`);
                })
                .catch(error => {
                    console.error('Error adding new book:', error);
                    const errorMessage = error.message || error.response?.data?.message;
                    setAlertMessageProps({ severity: 'error', message: `Error in creating new Book. ${errorMessage}` });
                })
                .finally(() => setLoading(false));
        } else {
            setAlertMessageProps({ severity: 'error', message: 'Error in saving Book' });
        }
    };

    const handleReset = () => {
        setBook(initialBookState);
    };

    const handleCancel = () => {
        history.push('/books');
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setBook(prevBook => ({
            ...prevBook!,
            [name]: value
        }));
    };

    if (loading) {
        return <CircularProgress />;
    }

    return (
        <div>
            {alertMessageProps && <AlertMessage {...alertMessageProps} />}
            <div>
                <h2 style={{ textAlign: 'center' }}>Add New Book</h2>
            </div>
            <Table>
                <TableBody>
                    <TableRow className='list-table-row-odd'>
                        <TableCell>Title</TableCell>
                        <TableCell>
                            <TextField required name="title" value={book.title} onChange={handleChange} />
                        </TableCell>
                    </TableRow>
                    <TableRow className='list-table-row-even'>
                        <TableCell>Author</TableCell>
                        <TableCell>
                            <TextField required name="author" value={book.author} onChange={handleChange} />
                        </TableCell>
                    </TableRow>
                    <TableRow className='list-table-row-odd'>
                        <TableCell>Year</TableCell>
                        <TableCell>
                            <TextField type="number" required name="year" value={book.year} onChange={handleChange} />
                        </TableCell>
                    </TableRow>
                    <TableRow className='list-table-row-even'>
                        <TableCell>Price</TableCell>
                        <TableCell>
                            <TextField type="number" required name="price" value={book.price} onChange={handleChange} inputProps={{ step: '0.01' }} />
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
            <div>
                <Button variant="contained" startIcon={<BiReset />} style={{ textTransform: 'none', margin: 2 }} onClick={handleReset}>Reset</Button>
                <Button variant="contained" startIcon={<FiSave />} style={{ textTransform: 'none', margin: 2 }} onClick={handleSave}>Save</Button>
                <Button variant="contained" startIcon={<TbBooks />} style={{ textTransform: 'none', margin: 2 }} onClick={handleCancel}>Cancel and Back Books List</Button>
            </div>
        </div>
    );
};

export default NewBook;
