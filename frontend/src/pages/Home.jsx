import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const response = await fetch('http://localhost:3000/books');
      if (!response.ok) {
        throw new Error('Failed to fetch books');
      }
      const data = await response.json();
      setBooks(data.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteBook = async (id) => {
    try {
      const response = await fetch(`http://localhost:3000/book/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Failed to delete book');
      }
      // Refresh books data after deletion
      fetchBooks();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container mx-auto">
      <h1 className="text-3xl font-bold mb-4">Books</h1>
      <table className="min-w-full">
        <thead>
          <tr>
            <th className="px-4 py-2">Title</th>
            <th className="px-4 py-2">Author</th>
            <th className="px-4 py-2">Publish Year</th>
            <th className="px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {books.map(book => (
            <tr key={book._id}>
              <td className="border px-4 py-2">{book.title}</td>
              <td className="border px-4 py-2">{book.author}</td>
              <td className="border px-4 py-2">{book.publishYear}</td>
              <td className="border px-4 py-2">
                <Link to={`/edit/${book._id}`} className="mr-2 border px-2 py-1 rounded bg-gray-100 cursor-pointer hover:bg-gray-200">Update</Link>
                
                <button onClick={() => handleDeleteBook(book._id)} className=' border px-2 py-1 rounded bg-gray-100 cursor-pointer hover:bg-gray-200'>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Link to='/create'><button className='px-4 py-2 rounded-lg bg-green-400 hover:bg-green-500 m-2'>Create Book</button></Link>
    </div>
  );
};

export default HomePage;
