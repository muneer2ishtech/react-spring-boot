import { Box, Button, CircularProgress, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { RiAddFill, RiEyeLine, RiPencilLine } from 'react-icons/ri';
import { Link } from 'react-router-dom';
import { Book, Page } from '../../interfaces';
import '../../styles/table.css';
import AlertMessage, { AlertMessageProps } from '../common/AlertMessage';
import DeleteButton from '../common/DeleteButton';

const BooksList: React.FC = () => {
    const [books, setBooks] = useState<Book[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [alertMessageProps, setAlertMessageProps] = useState<AlertMessageProps | null>(null);

    useEffect(() => {
        axios.get<Page<Book>>(`${process.env.REACT_APP_API_URL}/api/v1/books`)
            .then(response => {
                setBooks(response.data?.content);
            })
            .catch(error => {
                console.error('Error fetching books:', error);
                const errorMessage = error.message || error.response?.data?.message;
                setAlertMessageProps({ severity: 'error', message: `Error in fetching Books. ${errorMessage}` });
            })
            .finally(() => setLoading(false));
    }, []);

    const deleteBook = (id: number) => {
        setLoading(true);
        axios.delete(`${process.env.REACT_APP_API_URL}/api/v1/books/${id}`)
            .then(response => {
                if (response.status === 410) {
                    setAlertMessageProps({ severity: 'success', message: `Delete Book(${id}) successfully.` });
                    setBooks(prevBooks => prevBooks.filter(book => book.id !== id));
                } else {
                    console.warn(`Unexpected response ${response.status} when deleting Book(${id}).`);
                    setAlertMessageProps({ severity: 'warning', message: `Unexpected response ${response.status} when deleting Book(${id}).` });
                }
            })
            .catch(error => {
                if (error.response?.status === 410) {
                    setAlertMessageProps({ severity: 'success', message: `Delete Book(${id}) successfully.` });
                    setBooks(prevBooks => prevBooks.filter(book => book.id !== id));
                } else {
                    console.error('Error deleting book:', error);
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
