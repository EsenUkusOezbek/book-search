import React from "react";

const BookCard = ({ book, onDelete }) => {
  return (
    <div className="card-box">
      <div className="book-card">
        <h3>{book.bookName}</h3>
        <p>{book.author}</p>
        <button className="delete-button" onClick={() => onDelete(book.id)}>
          X
        </button>
      </div>
    </div>
  );
};

export default BookCard;
