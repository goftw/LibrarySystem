import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

export default function ViewBook() {
  const [book, setBook] = useState({
    name: '',
    price: '',
    pd: '',
    isbn: '',
  });

  const { id } = useParams();

  useEffect(() => {
    loadBook();
  }, {});

  const loadBook = async () => {
    const result = await axios.get(
      `http://localhost:8080/api/items/books/${id}`
    );
    setBook(result.data);
  };
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
          <h2 className="text-center m-4">User Details</h2>

          <div className="card">
            <div className="card-header">
              Details of book id:{book.id}
              <ul className="list-group list-group-flush">
                <li className="list-group-item">
                  <b>Name:</b>
                  {book.name}
                </li>
                <li className="list-group-item">
                  <b>Price:</b>
                  {book.price}
                </li>
                <li className="list-group-item">
                  <b>Publishing Date:</b>
                  {book.pd}
                </li>
                <li className="list-group-item">
                  <b>ISBN:</b>
                  {book.isbn}
                </li>
              </ul>
            </div>
          </div>
          <Link className="btn btn-primary my-2" to={'/'}>
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}