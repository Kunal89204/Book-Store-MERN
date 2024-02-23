import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const EditBook = () => {
  const { id } = useParams();
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [publishYear, setPublishYear] = useState('');

  useEffect(() => {
    fetchBook();
  }, []);

  const fetchBook = async () => {
    try {
      const response = await fetch(`http://localhost:3000/books/${id}`);
      if (!response.ok) {
        throw new Error('Failed to fetch book');
      }
      const data = await response.json();
      setTitle(data.title);
      setAuthor(data.author);
      setPublishYear(data.publishYear);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`http://localhost:3000/book/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title,
          author,
          publishYear,
        }),
      });
      if (!response.ok) {
        throw new Error('Failed to update book');
      }
      alert('Book updated successfully');
    } catch (error) {
      console.error(error);
      alert('Failed to update book');
    }
  };

  return (
    <div className="container mx-auto">
      <h1 className="text-3xl font-bold mb-4">Edit Book</h1>
      <form onSubmit={handleSubmit} className="max-w-md">
        <div className="mb-4">
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">
            Title
          </label>
          <input
            type="text"
            id="title"
            className="mt-1 p-2 block w-full border-gray-300 rounded-md"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="author" className="block text-sm font-medium text-gray-700">
            Author
          </label>
          <input
            type="text"
            id="author"
            className="mt-1 p-2 block w-full border-gray-300 rounded-md"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="publishYear" className="block text-sm font-medium text-gray-700">
            Publish Year
          </label>
          <input
            type="text"
            id="publishYear"
            className="mt-1 p-2 block w-full border-gray-300 rounded-md"
            value={publishYear}
            onChange={(e) => setPublishYear(e.target.value)}
            required
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Update Book
        </button>
      </form>
    </div>
  );
};

export default EditBook;
