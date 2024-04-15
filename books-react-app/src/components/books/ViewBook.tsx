// components/books/ViewBook.tsx

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import axios from 'axios';
import { Book } from '../../interfaces';

const ViewBook: React.FC = () => {
    const { id } = useParams < { id: string } > ();
    const history = createBrowserHistory();
    const [book, setBook] = useState < Book | null > (null);

    useEffect(() => {
        axios.get < Book > (`${process.env.REACT_APP_API_URL}/api/books/${id}`)
            .then(response => {
                setBook(response.data);
            })
            .catch(error => {
                console.error('Error fetching book:', error);
            });
    }, [id]);

    const handleEdit = () => {
        history.push(`/books/${id}/edit`);
    };

    const handleDelete = () => {
        axios.delete(`${process.env.REACT_APP_API_URL}/api/books/${id}`)
            .then(() => {
                history.push('/books');
            })
            .catch(error => {
                console.error('Error deleting book:', error);
            });
    };

    const handleList = () => {
        history.push('/books');
    };

    if (!book) {
        return <div>Loading...</div>;
    }

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
                        <td>Title</td>
                        <td>{book.title}</td>
                    </tr>
                    <tr>
                        <td>Author</td>
                        <td>{book.author}</td>
                    </tr>
                    <tr>
                        <td>Year</td>
                        <td>{book.year}</td>
                    </tr>
                    <tr>
                        <td>Price</td>
                        <td>{book.price}</td>
                    </tr>
                </tbody>
            </table>
            <button onClick={handleEdit}>Edit</button>
            <button onClick={handleDelete}>Delete</button>
            <button onClick={handleList}>List</button>
        </div>
    );
};

export default ViewBook;
