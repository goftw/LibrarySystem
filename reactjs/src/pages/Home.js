import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';

export default function Home() {
  const [books, setBooks] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    loadBooks();
  }, {});

  const loadBooks = async () => {
    const result = await axios.get('http://localhost:8080/api/items/books');
    setBooks(result.data);
  };

  const deleteBook = async (id) => {
    const result = await axios.delete(
      `http://localhost:8080/api/items/books/${id}`
    );
    loadBooks();
  };

  return (
    <div className="container">
      <div className="py-4">
        <table className="table border shadow">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">Price</th>
              <th scope="col">Publishing Date</th>
              <th scope="col">ISBN</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">1</th>
              <td>example</td>
              <td>example</td>
              <td>example</td>
              <td>example</td>
              <td>example</td>
            </tr>
            {books.map((book, index) => (
              <tr>
                <th scope="row" key={index}>
                  {index + 1}
                </th>
                <td>{book.name}</td>
                <td>{book.price}</td>
                <td>{book.pd}</td>
                <td>{book.isbn}</td>
                <td>
                  <Link
                    className="btn btn-primary mx-2"
                    to={`/viewBook/${book.id}`}
                  >
                    View
                  </Link>
                  <Link
                    className="btn btn-outline-primary mx-2"
                    to={`/editBook/${book.id}`}
                  >
                    Edit
                  </Link>
                  <button
                    className="btn btn-danger mx-2"
                    onClick={() => deleteBook(book.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
