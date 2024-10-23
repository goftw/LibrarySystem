import axios from 'axios';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function AddBook() {
  const navigate = useNavigate();

  const [book, setBook] = useState({
    name: '',
    price: '',
    pd: '',
    isbn: '',
  });

  const { name, price, pd, isbn } = book;

  const onInputChange = (e) => {
    setBook({ ...book, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    try {
      e.preventDefault();
      await axios.post('http://localhost:8080/api/items/books', book);
      navigate('/');
    } catch (error) {
      console.error('Error submitting the form:', error);
      alert(
        'There was an error submitting the form. Please check your input.(isbn taken)'
      );
    }
  };
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
          <h2 className="text-center m-4">Register Book</h2>

          {/* // can be simplified to '<form onSubmit={onSubmit}>'*/}
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
                placeholder="Enter your publishing date"
                name="pd"
                value={pd}
                onChange={(e) => onInputChange(e)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="Name" className="form-label">
                ISBN
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter your isbn"
                name="isbn"
                value={isbn}
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
