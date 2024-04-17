import { Button, CircularProgress, Table, TableBody, TableCell, TableRow, TextField } from '@mui/material';
import axios from 'axios';
import { createBrowserHistory } from 'history';
import React, { useEffect, useState } from 'react';
import { BiReset } from 'react-icons/bi';
import { FiSave } from 'react-icons/fi';
import { TbBooks } from 'react-icons/tb';
import { useParams } from 'react-router-dom';
import { Book } from '../../interfaces';
import '../../styles/table.css';
import AlertMessage, { AlertMessageProps } from '../common/AlertMessage';

const EditBook: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const history = createBrowserHistory();
    const [book, setBook] = useState<Book | null>(null);
    const [originalBook, setOriginalBook] = useState<Book | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [alertMessageProps, setAlertMessageProps] = useState<AlertMessageProps | null>(null);

    const headers = {
        'Content-Type': 'application/json',
    };

    useEffect(() => {
        axios.get<Book>(`${process.env.REACT_APP_API_URL}/api/v1/books/${id}`)
            .then(response => {
                setBook(response.data);
                setOriginalBook(response.data);
            })
            .catch(error => {
                console.error('Error fetching book:', error);
                const errorMessage = error.message || error.response?.data?.message;
                setAlertMessageProps({ severity: 'error', message: `Error in fetching Book(${id}). ${errorMessage}` });
            })
            .finally(() => setLoading(false));
    }, [id]);

    const handleReset = () => {
        if (originalBook) {
            setBook(originalBook);
        }
    };

    const handleSave = () => {
        if (book) {
            setLoading(true);
            axios.put(`${process.env.REACT_APP_API_URL}/api/v1/books`, book, { headers })
                .then(() => {
                    setAlertMessageProps({ severity: 'success', message: `Book(${id}) updated successfully.` });
                    history.push(`/books/${id}`);
                })
                .catch(error => {
                    console.error(`Error in updating Book(${id}):`, error);
                    const errorMessage = error.message || error.response?.data?.message;
                    setAlertMessageProps({ severity: 'error', message: `Error in updating Book(${id}). ${errorMessage}` });
                })
                .finally(() => setLoading(false));
        } else {
            setAlertMessageProps({ severity: 'error', message: 'Error in saving Book' });
        }
    };

    const handleCancel = () => {
        history.push(`/books/${id}`);
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        if (book) {
            setBook(prevBook => ({
                ...prevBook!,
                [name]: value
            }));
        }
    };

    if (loading) {
        return <CircularProgress />;
    }

    return (
        <div>
            {alertMessageProps && <AlertMessage {...alertMessageProps} />}
            <div>
                <h2 style={{ textAlign: 'center' }}>Edit Book</h2>
            </div>
            {book && (
                <Table>
                    <TableBody>
                        <TableRow className='list-table-row-even'>
                            <TableCell variant='head'>ID</TableCell>
                            <TableCell>
                                <TextField required name="id" value={book.id} disabled />
                            </TableCell>
                        </TableRow>
                        <TableRow className='list-table-row-odd'>
                            <TableCell variant='head'>Title</TableCell>
                            <TableCell>
                                <TextField required name="title" value={book.title} onChange={handleChange} />
                            </TableCell>
                        </TableRow>
                        <TableRow className='list-table-row-even'>
                            <TableCell variant='head'>Author</TableCell>
                            <TableCell>
                                <TextField required name="author" value={book.author} onChange={handleChange} />
                            </TableCell>
                        </TableRow>
                        <TableRow className='list-table-row-odd'>
                            <TableCell variant='head'>Year</TableCell>
                            <TableCell>
                                <TextField type="number" required name="year" value={book.year} onChange={handleChange} />
                            </TableCell>
                        </TableRow>
                        <TableRow className='list-table-row-even'>
                            <TableCell variant='head'>Price</TableCell>
                            <TableCell>
                                <TextField type="number" required name="price" value={book.price} onChange={handleChange} inputProps={{ step: '0.01' }} />
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            )}
            <div>
                {book && (
                    <Button variant="contained" startIcon={<BiReset />} style={{ textTransform: 'none', margin: 2 }} onClick={handleReset}>Reset</Button>
                )}
                {book && (
                    <Button variant="contained" startIcon={<FiSave />} style={{ textTransform: 'none', margin: 2 }} onClick={handleSave}>Save</Button>
                )}
                <Button variant="contained" startIcon={<TbBooks />} style={{ textTransform: 'none', margin: 2 }} onClick={handleCancel}>Cancel and Back Books List</Button>
            </div>
        </div>
    );
};

export default EditBook;
