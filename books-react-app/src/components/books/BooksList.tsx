import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Book, Page } from '../../interfaces';

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
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Title</th>
                        <th>Author</th>
                        <th>Year</th>
                        <th>Price</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {books.map(book => (
                        <tr key={book.id}>
                            <td>{book.id}</td>
                            <td>{book.title}</td>
                            <td>{book.author}</td>
                            <td>{book.year}</td>
                            <td>{book.price}</td>
                            <td>
                                <Link to={`/books/${book.id}`}>View</Link>{' '}
                                <Link to={`/books/${book.id}/edit`}>Edit</Link>{' '}
                                <button onClick={() => deleteBook(book.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default BooksList;
