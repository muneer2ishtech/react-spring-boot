import React, { useState, useEffect } from 'react';
import { createBrowserHistory } from 'history';
import axios from 'axios';

const EditBook = ({ match }) => {
    const { id } = match.params;
    const [book, setBook] = useState({});
    const [originalBook] = useState({});
    const history = createBrowserHistory();

    useEffect(() => {
        // Fetch book data from API based on ID
        axios.get(`sprinbooturl/api/books/${id}`)
            .then(response => {
                setBook(response.data);
            })
            .catch(error => {
                console.error('Error fetching book:', error);
            });
    }, [id]);

    const handleReset = () => {
        setBook(originalBook);
    };

    const handleCancel = () => {
        // Redirect back to ViewBook
        history.push(`/books/${id}`);
    };

    const handleSave = () => {
        // Send PUT request to update book data
        axios.put(`sprinbooturl/api/books/${id}`, book)
            .then(response => {
                console.log('Book updated successfully:', response.data);
                // Redirect back to ViewBook
            })
            .catch(error => {
                console.error('Error updating book:', error);
            });
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setBook(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    return (
        <div>
            <h2>Edit Book</h2>
            <table>
                <tbody>
                    <tr>
                        <td>ID</td>
                        <td><input type="text" name="id" value={book.id} onChange={handleChange} /></td>
                    </tr>
                    <tr>
                        <td>Name</td>
                        <td><input type="text" name="name" value={book.name} onChange={handleChange} /></td>
                    </tr>
                    <tr>
                        <td>Author</td>
                        <td><input type="text" name="author" value={book.author} onChange={handleChange} /></td>
                    </tr>
                    <tr>
                        <td>Price</td>
                        <td><input type="text" name="price" value={book.price} onChange={handleChange} /></td>
                    </tr>
                </tbody>
            </table>
            <button onClick={handleReset}>Reset</button>
            <button onClick={handleCancel}>Cancel</button>
            <button onClick={handleSave}>Save</button>
        </div>
    );
};

export default EditBook;
