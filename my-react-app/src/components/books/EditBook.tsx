import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import axios from 'axios';
import { Book } from '../../interfaces';

const EditBook: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const history = createBrowserHistory();
    const [book, setBook] = useState<Book | null>(null);
    const [originalBook, setOriginalBook] = useState<Book | null>(null);

    useEffect(() => {
        axios.get<Book>(`${process.env.REACT_APP_API_URL}/api/books/${id}`)
            .then(response => {
                setBook(response.data);
                setOriginalBook(response.data);
            })
            .catch(error => {
                console.error('Error fetching book:', error);
            });
    }, [id]);

    const handleReset = () => {
        if (originalBook) {
            setBook(originalBook);
        }
    };

    const handleSave = () => {
        if (book) {
            axios.put(`${process.env.REACT_APP_API_URL}/api/books/${id}`, book)
                .then(() => {
                    history.push(`/books/${id}`);
                })
                .catch(error => {
                    console.error('Error updating book:', error);
                });
        }
    };

    const handleCancel = () => {
        history.push(`/books/${id}`);
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        if (book) {
            setBook(prevBook => ({
                ...prevBook!,
                [name]: value
            }));
        }
    };

    if (!book) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h2>Edit Book</h2>
            <table>
                <tbody>
                    <tr>
                        <td>ID</td>
                        <td><input type="text" name="id" value={book.id} readOnly /></td>
                    </tr>
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

export default EditBook;
