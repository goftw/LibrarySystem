import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';

export default function EditBook() {
  const navigate = useNavigate();

  const { id } = useParams();

  const [book, setBook] = useState({
    name: '',
    price: '',
    pd: '',
  });

  const { name, price, pd } = book;

  const onInputChange = (e) => {
    setBook({ ...book, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    loadBooks();
  }, {});

  const onSubmit = async (e) => {
    e.preventDefault();
    await axios.put(`http://localhost:8080/api/items/books/${id}`, book);
    navigate('/');
  };

  const loadBooks = async () => {
    const result = await axios.get(
      `http://localhost:8080/api/items/books/${id}`
    );
    setBook(result.data);
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
          <h2 className="text-center m-4">Edit Book</h2>
          <form onSubmit={(e) => onSubmit(e)}>
            <div className="mb-3">
              <label htmlFor="Name" className="form-label">
                Name
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter your name"
                name="name"
                value={name}
                onChange={(e) => onInputChange(e)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="Name" className="form-label">
                Price
              </label>
              <input
                type="number"
                className="form-control"
                placeholder="Enter your price"
                name="price"
                value={price}
                onChange={(e) => onInputChange(e)}
                min={'0'}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="Name" className="form-label">
                Publishing Date
              </label>
              <input
                type="date"
                className="form-control"
                placeholder="Enter your Publishing Date"
                name="pd"
                value={pd}
                onChange={(e) => onInputChange(e)}
              />
            </div>
            <button type="submit" className="btn btn-outline-primary">
              Submit
            </button>
            <Link className="btn btn-outline-danger" to="/">
              Cancel
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
}
