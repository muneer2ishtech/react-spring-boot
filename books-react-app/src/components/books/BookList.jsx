import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const BookList = () => {
    const [books, setBooks] = useState([]);

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_URL}/api/books`)
            .then(response => {
                setBooks(response.data);
            })
            .catch(error => {
                console.error('Error fetching books:', error);
            });
    }, []);

    const handleDelete = (id) => {
        axios.delete(`${process.env.REACT_APP_API_URL}/api/books/${id}`)
            .then(response => {
                console.log('Book deleted successfully:', response.data);
                // Refresh the book list after deletion
                setBooks(books.filter(book => book.id !== id));
            })
            .catch(error => {
                console.error('Error deleting book:', error);
            });
    };

    return (
        <div>
            <h2>Book List</h2>
            <Link to="/books/new">Add New Book</Link>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Author</th>
                        <th>Price</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {books.map(book => (
                        <tr key={book.id}>
                            <td>{book.id}</td>
                            <td>{book.name}</td>
                            <td>{book.author}</td>
                            <td>{book.price}</td>
                            <td>
                                <Link to={`/books/${book.id}`}>View</Link>{' '}
                                <Link to={`/books/${book.id}/edit`}>Edit</Link>{' '}
                                <button onClick={() => handleDelete(book.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default BookList;
