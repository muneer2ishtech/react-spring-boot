import axios from 'axios';
import { createBrowserHistory } from 'history';
import React, { useState } from 'react';
import { NewBook as Book } from '../../interfaces';

const NewBook: React.FC = () => {
    const history = createBrowserHistory();
    const [book, setBook] = useState<Book>({
        id: null,
        title: '',
        author: '',
        year: 0,
        price: 0
    });

    const handleSave = () => {
        axios.post(`${process.env.REACT_APP_API_URL}/api/v1/books`, book)
            .then(() => {
                history.push('/books');
            })
            .catch(error => {
                console.error('Error adding new book:', error);
            });
    };

    const handleReset = () => {
        setBook({
            id: null,
            title: '',
            author: '',
            year: 0,
            price: 0
        });
    };

    const handleCancel = () => {
        history.push('/books');
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setBook(prevBook => ({
            ...prevBook!,
            [name]: value
        }));
    };

    return (
        <div>
            <h2>Add New Book</h2>
            <table>
                <tbody>
                    <tr>
                        <td>Title</td>
                        <td><input type="text" name="title" value={book.title} onChange={handleChange} /></td>
                    </tr>
                    <tr>
                        <td>Author</td>
                        <td><input type="text" name="author" value={book.author} onChange={handleChange} /></td>
                    </tr>
                    <tr>
                        <td>Year</td>
                        <td><input type="number" name="year" value={book.year} onChange={handleChange} /></td>
                    </tr>
                    <tr>
                        <td>Price</td>
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
