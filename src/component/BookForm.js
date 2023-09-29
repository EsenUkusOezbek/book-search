import React from "react";
import { useContext, useState } from "react";
import { BookContext } from "../context/BookContext";

//**BookForm adinda bir bilesen olustu */
const BookForm = ({ children }) => {
  const { addNewBook, adding } = useContext(BookContext);
  const [bookName, setBookName] = useState("");
  const [isbn, setIsbn] = useState("");
  const [author, setAuthor] = useState("");
  //**Hatalar icin */
  const [bookNameErr, setBookNameErr] = useState(false);
  const [isbnErr, setIsbnErr] = useState(false);
  const [authorErr, setAuthorErr] = useState(false);

  const handleSubmit = (e) => {
    //otomatik yeniden yükleme
    e.preventDefault();
    //Hatalari sifirla
    setBookNameErr(false);
    setIsbnErr(false);
    setAuthorErr(false);
    //bosluk olmasin
    if (bookName.trim() && isbn.trim() && author.trim()) {
      //eger alanlar doluysa addnewbook fonksiyonunu cagir
      addNewBook({ bookName, isbn, author });
      //alanlari bos birak fonksiyondan sonra
      setBookName("");
      setIsbn("");
      setAuthor("");
    } else {
      //eger bosluk varsa hata döndür
      !bookName.trim() && setBookNameErr(true);
      !isbn.trim() && setIsbnErr(true);
      !author.trim() && setAuthorErr(true);
    }
  };

  return (
    <form className="form">
      {children}
      <div className="form-input">
        <input
          type="text"
          placeholder="Book name..."
          onChange={(event) => {
            //kullanici bir metin girdiginde tetiklensin, giris metnini state e kaydediyor.
            setBookName(event.target.value);
          }}
          //true dönerse p olusuyor ve hata veriyor ekrana, eger false ise input doludur ve hata mesaji dönmez 54 icin
          value={bookName}
        />

        {bookNameErr && <p className="err">Book name cannot be empty!</p>}
      </div>
      <div className="form-input">
        <input
          type="text"
          placeholder="ISBN..."
          onChange={(event) => {
            setIsbn(event.target.value);
          }}
          value={isbn}
        />
        {isbnErr && <p className="err">ISBN cannot be empty!</p>}
      </div>
      <div className="form-input">
        <input
          type="text"
          placeholder="Author..."
          onChange={(event) => {
            setAuthor(event.target.value);
          }}
          value={author}
        />
        {authorErr && <p className="err">Author name cannot be empty!</p>}
      </div>
      <button
        className="btn-form"
        onClick={handleSubmit}
        disabled={adding.add} //islem yapilirken kullanilmasini engelliyor butonun
      >
        {adding.add ? "Adding..." : "Submit"}
      </button>
    </form>
  );
};

export default BookForm;
