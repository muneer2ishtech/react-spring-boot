import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { Book } from '../../interfaces';

const NewBook: React.FC = () => {
    const history = useHistory();
    const [book, setBook] = useState < Book > ({
        id: 0,
        name: '',
        author: '',
        price: 0
    });

    const handleSave = () => {
        axios.post(`${process.env.REACT_APP_API_URL}/api/books`, book)
            .then(() => {
                history.push('/books');
            })
            .catch(error => {
                console.error('Error adding new book:', error);
            });
    };

    const handleCancel = () => {
        history.push('/books');
    };

    const handleReset = () => {
        setBook({
            id: 0,
            name: '',
            author: '',
            price: 0
        });
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setBook(prevBook => ({
            ...prevBook,
            [name]: value
        }));
    };

    return (
        <div>
            <h2>Add New Book</h2>
            <table>
                <tbody>
                    <tr>
                        <td>ID:</td>
                        <td><input type="text" name="id" value={book.id} readOnly /></td>
                    </tr>
                    <tr>
                        <td>Name:</td>
                        <td><input type="text" name="name" value={book.name} onChange={handleChange} /></td>
                    </tr>
                    <tr>
                        <td>Author:</td>
                        <td><input type="text" name="author" value={book.author} onChange={handleChange} /></td>
                    </tr>
                    <tr>
                        <td>Price:</td>
                        <td><input type="number" name="price" value={book.price} onChange={handleChange} /></td>
                    </tr>
                </tbody>
            </table>
            <button onClick={handleReset}>Reset</button>
            <button onClick={handleSave}>Save</button>
            <button onClick={handleCancel}>Cancel</button>
        </div>
    );
};

export default NewBook;
