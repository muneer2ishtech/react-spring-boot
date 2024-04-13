import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

const NewBook = () => {
    const [book, setBook] = useState({
        id: '',
        name: '',
        author: '',
        price: ''
    });

    const history = useHistory();

    const handleSave = () => {
        axios.post('sprinbooturl/api/books', book)
            .then(response => {
                console.log('Book added successfully:', response.data);
                history.push('/books'); // Redirect to list of books
            })
            .catch(error => {
                console.error('Error adding book:', error);
            });
    };

    const handleCancel = () => {
        history.push('/books'); // Redirect to list of books
    };

    const handleReset = () => {
        setBook({
            id: '',
            name: '',
            author: '',
            price: ''
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
            <h2>Add Book</h2>
            <form>
                <div>
                    <label>ID:</label>
                    <input type="text" name="id" value={book.id} onChange={handleChange} />
                </div>
                <div>
                    <label>Name:</label>
                    <input type="text" name="name" value={book.name} onChange={handleChange} />
                </div>
                <div>
                    <label>Author:</label>
                    <input type="text" name="author" value={book.author} onChange={handleChange} />
                </div>
                <div>
                    <label>Price:</label>
                    <input type="text" name="price" value={book.price} onChange={handleChange} />
                </div>
                <button type="button" onClick={handleReset}>Reset</button>
                <button type="button" onClick={handleCancel}>Cancel</button>
                <button type="button" onClick={handleSave}>Save</button>
            </form>
        </div>
    );
};

export default NewBook;
