import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import axios from 'axios';
import { Book } from '../../interfaces';
import { Button, Table, TableBody, TableRow, TableCell, Alert, CircularProgress } from '@mui/material';
import { RiPencilLine, RiDeleteBinLine } from 'react-icons/ri';
import { TbBooks } from 'react-icons/tb';
import '../../styles/table.css';

const ViewBook: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const history = createBrowserHistory();
    const [book, setBook] = useState<Book | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [alert, setAlert] = useState<{ message: string; severity: 'success' | 'error' | 'warning' | 'info' } | null>(null);

    useEffect(() => {
        axios.get<Book>(`${process.env.REACT_APP_API_URL}/api/v1/books/${id}`)
            .then(response => {
                setBook(response.data);
            })
            .catch(error => {
                console.error('Error fetching book:', error);
                const errorMessage = error.message || error.response?.data?.message;
                setAlert({ severity: 'error', message: `Error in fetching Book. ${errorMessage}` });
            })
            .finally(() => setLoading(false));
    }, [id]);

    const handleDelete = () => {
        setLoading(false);
        axios.delete(`${process.env.REACT_APP_API_URL}/api/v1/books/${id}`)
            .then(response => {
                if (response.status === 410) {
                    setAlert({ severity: 'success', message: `Delete Book(${id}) successfully.` });
                    history.push('/books');
                } else {
                    console.warn(`Unexpected response ${response.status} when deleting Book(${id}).`);
                    setAlert({ severity: 'warning', message: `Unexpected response ${response.status} when deleting Book(${id}).` });
                }
            })
            .catch(error => {
                if (error.response?.status === 410) {
                    setAlert({ severity: 'success', message: `Delete Book(${id}) successfully.` });
                    history.push('/books');
                } else {
                    console.error('Error deleting book:', error);
                    const errorMessage = error.message || error.response?.data?.message;
                    setAlert({ severity: 'error', message: `Error in deleting Book(${id}). ${errorMessage}` });
                }
            })
            .finally(() => setLoading(false));
    };

    if (loading) {
        return <CircularProgress />;
    }

    return (
        <div>
            {alert && <Alert severity={alert.severity} onClose={() => setAlert(null)}>{alert.message}</Alert>}
            <div>
                <h2 style={{ textAlign: 'center' }}>View Book</h2>
            </div>
            {book && (
                <Table>
                    <TableBody>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>{book.id}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Title</TableCell>
                            <TableCell>{book.title}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Author</TableCell>
                            <TableCell>{book.author}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Year</TableCell>
                            <TableCell>{book.year}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Price</TableCell>
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
