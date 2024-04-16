import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Book, Page } from '../../interfaces';
import { Table, TableHead, TableBody, TableRow, TableCell } from '@mui/material';

const BooksList: React.FC = () => {
    const [books, setBooks] = useState<Book[]>([]);

    useEffect(() => {
        axios.get<Page<Book>>(`${process.env.REACT_APP_API_URL}/api/v1/books`)
            .then(response => {
                setBooks(response.data?.content);
            })
            .catch(error => {
                console.error('Error fetching books:', error);
            });
    }, []);

    const deleteBook = (id: number) => {
        axios.delete(`${process.env.REACT_APP_API_URL}/api/v1/books/${id}`)
            .then(() => {
                setBooks(prevBooks => prevBooks.filter(book => book.id !== id));
            })
            .catch(error => {
                console.error('Error deleting book:', error);
            });
    };

    return (
        <div>
            <h2>Books List</h2>
            <Link to="/books/new">Add New Book</Link>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>ID</TableCell>
                        <TableCell>Title</TableCell>
                        <TableCell>Author</TableCell>
                        <TableCell>Year</TableCell>
                        <TableCell>Price</TableCell>
                        <TableCell>Actions</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {books.map(book => (
                        <TableRow key={book.id}>
                            <TableCell>{book.id}</TableCell>
                            <TableCell>{book.title}</TableCell>
                            <TableCell>{book.author}</TableCell>
                            <TableCell>{book.year}</TableCell>
                            <TableCell>{book.price}</TableCell>
                            <TableCell>
                                <Link to={`/books/${book.id}`}>View</Link>{' '}
                                <Link to={`/books/${book.id}/edit`}>Edit</Link>{' '}
                                <button onClick={() => deleteBook(book.id)}>Delete</button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
};

export default BooksList;
