import React, { useState, useEffect } from "react";
import axios from "axios";

const BookCard = ({ book }) => {
  return (
    <div className="book-card">
      <h3>{book.bookName}</h3>
      <p>{book.author}</p>
    </div>
  );
};
const api = "http://localhost:5050";
const MyBooks = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    // db.json dosyası src icinde olmadigi icin HTTP atmak lazim
    axios
      .get(`${api}/books`)
      .then((response) => {
        setBooks(response.data);
      })
      .catch((error) => {
        console.error("Error fetching books:", error);
      });
  }, []);

  return (
    <div className="my-books">
      <h2>My Books</h2>
      <div className="book-list">
        {books.map((book) => (
          <BookCard key={book.id} book={book} />
        ))}
      </div>
    </div>
  );
};

export default MyBooks;
