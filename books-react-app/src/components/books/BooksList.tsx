import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Book, Page } from '../../interfaces';
import { Table, TableHead, TableBody, TableRow, TableCell, Alert, Button, Box } from '@mui/material';
import { RiEyeLine, RiPencilLine, RiAddFill } from 'react-icons/ri';
import DeleteButton from '../common/DeleteButton';
import '../../styles/table.css';

const BooksList: React.FC = () => {
    const [books, setBooks] = useState<Book[]>([]);
    const [alert, setAlert] = useState<{ message: string; severity: 'success' | 'error' | 'warning' | 'info' } | null>(null);

    useEffect(() => {
        axios.get<Page<Book>>(`${process.env.REACT_APP_API_URL}/api/v1/books`)
            .then(response => {
                setBooks(response.data?.content);
            })
            .catch(error => {
                console.error('Error fetching books:', error);
                const errorMessage = error.message || error.response?.data?.message;
                setAlert({ severity: 'error', message: `Error in fetching Books. ${errorMessage}` });
            });
    }, []);

    const deleteBook = (id: number) => {
        axios.delete(`${process.env.REACT_APP_API_URL}/api/v1/books/${id}`)
            .then(response => {
                if (response.status === 410) {
                    setAlert({ severity: 'success', message: `Delete Book(${id}) successfully.` });
                    setBooks(prevBooks => prevBooks.filter(book => book.id !== id));
                } else {
                    console.warn(`Unexpected response ${response.status} when deleting Book(${id}).`);
                    setAlert({ severity: 'warning', message: `Unexpected response ${response.status} when deleting Book(${id}).` });
                }
            })
            .catch(error => {
                if (error.response?.status === 410) {
                    setAlert({ severity: 'success', message: `Delete Book(${id}) successfully.` });
                    setBooks(prevBooks => prevBooks.filter(book => book.id !== id));
                } else {
                    console.error('Error deleting book:', error);
                    const errorMessage = error.message || error.response?.data?.message;
                    setAlert({ severity: 'error', message: `Error in deleting Book(${id}). ${errorMessage}` });
                }
            });
    };

    const handleCloseAlert = () => {
        setAlert(null);
    };

    return (
        <div>
            {alert && <Alert severity={alert.severity} onClose={handleCloseAlert}>{alert.message}</Alert>}
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                <h2 className="list-table-title">Books List</h2>
                <Link to="/books/new">
                    <Button variant="contained" startIcon={<RiAddFill />} style={{ textTransform: 'none' }}>
                        New Book
                    </Button>
                </Link>
            </Box>
            <Table>
                <TableHead>
                    <TableRow className="list-table-head">
                        <TableCell>ID</TableCell>
                        <TableCell>Title</TableCell>
                        <TableCell>Author</TableCell>
                        <TableCell>Year</TableCell>
                        <TableCell>Price</TableCell>
                        <TableCell>Actions</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {books.map((book, index) => (
                        <TableRow key={book.id} className={index % 2 === 0 ? 'list-table-row-even' : 'list-table-row-odd'}>
                            <TableCell>{book.id}</TableCell>
                            <TableCell>{book.title}</TableCell>
                            <TableCell>{book.author}</TableCell>
                            <TableCell className='align-right'>{book.year}</TableCell>
                            <TableCell className='align-right'>{book.price}</TableCell>
                            <TableCell className='align-center'>
                                <Link to={`/books/${book.id}`}>
                                    <Button variant="text" style={{ minWidth: 'auto' }}><RiEyeLine /></Button>
                                </Link>
                                <Link to={`/books/${book.id}/edit`}>
                                    <Button variant="text" style={{ minWidth: 'auto' }}><RiPencilLine /></Button>
                                </Link>
                                <DeleteButton onConfirm={() => deleteBook(book.id)} confirmDialog icon style={{ minWidth: 'auto' }} />
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
};

export default BooksList;
