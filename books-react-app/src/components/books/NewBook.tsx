import { Button, CircularProgress, Table, TableBody, TableCell, TableRow } from '@mui/material';
import axios from 'axios';
import { createBrowserHistory } from 'history';
import React, { useState } from 'react';
import { BiReset } from 'react-icons/bi';
import { FiSave } from 'react-icons/fi';
import { TbBooks } from 'react-icons/tb';
import { NewBook as Book } from '../../interfaces';
import '../../styles/table.css';
import AlertMessage, { AlertMessageProps } from '../common/AlertMessage';

const NewBook: React.FC = () => {
    const history = createBrowserHistory();
    const [book, setBook] = useState<Book>({
        id: null,
        title: '',
        author: '',
        year: 0,
        price: 0
    });
    const [loading, setLoading] = useState<boolean>(true);
    const [alertMessageProps, setAlertMessageProps] = useState<AlertMessageProps | null>(null);

    const handleSave = () => {
        if (book) {
            setLoading(true);
            axios.post(`${process.env.REACT_APP_API_URL}/api/v1/books`, book)
                .then(() => {
                    setAlertMessageProps({ severity: 'success', message: `Book(${id}) updated successfully.` });
                    history.push('/books');
                })
                .catch(error => {
                    console.error('Error adding new book:', error);
                    const errorMessage = error.message || error.response?.data?.message;
                    setAlertMessageProps({ severity: 'error', message: `Error in updating Book(${id}). ${errorMessage}` });
                })
                .finally(() => setLoading(false));
        } else {
            setAlertMessageProps({ severity: 'error', message: 'Error in saving Book' });
        }
    };

    const handleReset = () => {
        setBook({
            id: null,
            title: '',
            author: '',
            year: 0,
            price: 0
        });
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
                    <TableRow className='list-table-row-even'>
                        <TableCell variant='head'>ID</TableCell>
                        <TableCell><input type="text" name="id" value={book.id} readOnly /></TableCell>
                    </TableRow>
                    <TableRow className='list-table-row-odd'>
                        <TableCell variant='head'>Title</TableCell>
                        <TableCell><input type="text" name="title" value={book.title} onChange={handleChange} /></TableCell>
                    </TableRow>
                    <TableRow className='list-table-row-even'>
                        <TableCell variant='head'>Author</TableCell>
                        <TableCell><input type="text" name="author" value={book.author} onChange={handleChange} /></TableCell>
                    </TableRow>
                    <TableRow className='list-table-row-odd'>
                        <TableCell variant='head'>Year</TableCell>
                        <TableCell><input type="number" name="year" value={book.year} onChange={handleChange} /></TableCell>
                    </TableRow>
                    <TableRow className='list-table-row-even'>
                        <TableCell variant='head'>Price</TableCell>
                        <TableCell><input type="number" name="price" value={book.price} onChange={handleChange} /></TableCell>
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
