import React from "react";
import BookCard from "../component/BookCard";
import { BookContext } from "../context/BookContext";
import { useContext, useState } from "react";

const Browse = () => {
  const { books, deleteBook } = useContext(BookContext); // Kitapları ve silmeyi aldim

  // Arama yapmak için gerekli state ve fonksiyonlar
  const [searchTerm, setSearchTerm] = useState("");
  const handleSearch = (event) => {
    setSearchTerm(event.target.value.trim(""));
  };

  // Kitapları filtrele ve sadece aranan terimi içeren kitapları göster
  const filteredBooks = books.filter((book) =>
    book.bookName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <h2>Browse</h2>
      <input
        className="search"
        type="text"
        placeholder="Search for a book..."
        onChange={handleSearch}
        value={searchTerm}
      />
      <div className="book-list">
        {filteredBooks.length === 0 ? (
          <p>Oops, no books found.</p>
        ) : (
          filteredBooks.map((book) => (
            <BookCard key={book.id} book={book} onDelete={deleteBook} />
          ))
        )}
      </div>
    </div>
  );
};

export default Browse;
