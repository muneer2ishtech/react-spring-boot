import { Button, CircularProgress, Table, TableBody, TableCell, TableRow } from '@mui/material';
import axios from 'axios';
import { createBrowserHistory } from 'history';
import React, { useEffect, useState } from 'react';
import { RiDeleteBinLine, RiPencilLine } from 'react-icons/ri';
import { TbBooks } from 'react-icons/tb';
import { Link, useParams } from 'react-router-dom';
import { Book } from '../../interfaces';
import '../../styles/table.css';
import AlertMessage, { AlertMessageProps } from '../common/AlertMessage';

const ViewBook: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const history = createBrowserHistory();
    const [book, setBook] = useState<Book | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [alertMessageProps, setAlertMessageProps] = useState<AlertMessageProps | null>(null);

    useEffect(() => {
        axios.get<Book>(`${process.env.REACT_APP_API_URL}/api/v1/books/${id}`)
            .then(response => {
                setBook(response.data);
            })
            .catch(error => {
                console.error('Error fetching book:', error);
                const errorMessage = error.message || error.response?.data?.message;
                setAlertMessageProps({ severity: 'error', message: `Error in fetching Book(${id}). ${errorMessage}` });
            })
            .finally(() => setLoading(false));
    }, [id]);

    const handleDelete = () => {
        setLoading(true);
        axios.delete(`${process.env.REACT_APP_API_URL}/api/v1/books/${id}`)
            .then(response => {
                if (response.status === 410) {
                    setAlertMessageProps({ severity: 'success', message: `Book(${id}) deleted successfully.` });
                    history.push('/books');
                } else {
                    console.warn(`Unexpected response ${response.status} when deleting Book(${id}).`);
                    setAlertMessageProps({ severity: 'warning', message: `Unexpected response ${response.status} when deleting Book(${id}).` });
                }
            })
            .catch(error => {
                if (error.response?.status === 410) {
                    setAlertMessageProps({ severity: 'success', message: `Delete Book(${id}) successfully.` });
                    history.push('/books');
                } else {
                    console.error(`Error in deleting Book(${id}):`, error);
                    const errorMessage = error.message || error.response?.data?.message;
                    setAlertMessageProps({ severity: 'error', message: `Error in deleting Book(${id}). ${errorMessage}` });
                }
            })
            .finally(() => setLoading(false));
    };

    if (loading) {
        return <CircularProgress />;
    }

    return (
        <div>
            {alertMessageProps && <AlertMessage {...alertMessageProps} />}
            <div>
                <h2 style={{ textAlign: 'center' }}>View Book</h2>
            </div>
            {book && (
                <Table>
                    <TableBody>
                        <TableRow className='list-table-row-even'>
                            <TableCell variant='head'>ID</TableCell>
                            <TableCell>{book.id}</TableCell>
                        </TableRow>
                        <TableRow className='list-table-row-odd'>
                            <TableCell variant='head'>Title</TableCell>
                            <TableCell>{book.title}</TableCell>
                        </TableRow>
                        <TableRow className='list-table-row-even'>
                            <TableCell variant='head'>Author</TableCell>
                            <TableCell>{book.author}</TableCell>
                        </TableRow>
                        <TableRow className='list-table-row-odd'>
                            <TableCell variant='head'>Year</TableCell>
                            <TableCell>{book.year}</TableCell>
                        </TableRow>
                        <TableRow className='list-table-row-even'>
                            <TableCell variant='head'>Price</TableCell>
                            <TableCell>{book.price}</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            )}
            <div>
                {book && (
                    <Link to={`/books/${book.id}/edit`}>
                        <Button variant="contained" startIcon={<RiPencilLine />} style={{ textTransform: 'none', margin: 2 }}>Edit</Button>
                    </Link>
                )}
                {book && (
                    <Button variant="contained" startIcon={<RiDeleteBinLine />} onClick={handleDelete} style={{ textTransform: 'none', margin: 2 }}>Delete</Button>
                )}
                <Link to="/books">
                    <Button variant="contained" startIcon={<TbBooks />} style={{ textTransform: 'none', margin: 2 }}>
                        Back to Books List
                    </Button>
                </Link>
            </div>
        </div>
    );
};

export default ViewBook;
