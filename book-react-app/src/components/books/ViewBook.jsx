import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

const ViewBook = ({ match }) => {
    const { id } = match.params;
    const [book, setBook] = useState({});
    const history = useHistory();

    useEffect(() => {
        axios.get(`sprinbooturl/api/books/${id}`)
            .then(response => {
                setBook(response.data);
            })
            .catch(error => {
                console.error('Error fetching book:', error);
            });
    }, [id]);

    const handleDelete = () => {
        axios.delete(`sprinbooturl/api/books/${id}`)
            .then(response => {
                console.log('Book deleted successfully:', response.data);
                history.push('/books'); // Redirect to list of books
            })
            .catch(error => {
                console.error('Error deleting book:', error);
            });
    };

    const handleBackToList = () => {
        history.push('/books');
    };

    const handleAddNewBook = () => {
        history.push('/books/new');
    };

    return (
        <div>
            <h2>View Book</h2>
            <table>
                <tbody>
                    <tr>
                        <td>ID</td>
                        <td>{book.id}</td>
                    </tr>
                    <tr>
                        <td>Name</td>
                        <td>{book.name}</td>
                    </tr>
                    <tr>
                        <td>Author</td>
                        <td>{book.author}</td>
                    </tr>
                    <tr>
                        <td>Price</td>
                        <td>{book.price}</td>
                    </tr>
                </tbody>
            </table>
            <button onClick={handleDelete}>Delete</button>
            <button onClick={handleAddNewBook}>Add New Book</button>
            <button onClick={handleBackToList}>Back to Book List</button>
        </div>
    );
};

export default ViewBook;
