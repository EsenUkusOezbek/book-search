import React from "react";
import { createContext, useEffect, useState } from "react";
import axios from "axios";
export const BookContext = createContext();

//**books: kitaplar listesi, kitaplari saklamak icin bos dizi--adding: read delete ve add eylemleri icin, varsayilan olarak etkin degiller. bookprovider ile bilesenleri sarmaladim. */
const api = "http://localhost:5050";
const BookProvider = ({ children }) => {
  const [books, setBooks] = useState([]);
  const [adding, setAdding] = useState({
    read: false,
    delete: false,
    add: false,
  });

  //**yeni kitap eklemek icin, setadding fonksiyonu ile adding güncelleniyor. prevadding ile önceki icerik kopyasini olusturuyorum */

  const addNewBook = async ({ bookName, isbn, author }) => {
    setAdding((prevAdding) => ({ ...prevAdding, add: true }));

    //**axios ile post istegi yaparak kitap ekle eger response 201-yeni olusturma-ise basarili demek. prevbooklist üzerine eklenir. */

    const newBook = { bookName, isbn, author };
    const response = await axios.post(`${api}/books`, newBook);
    if (response.status === 201) {
      setBooks((prevBookList) => [...prevBookList, response.data]);
    }

    //add islemi bittigini belirt

    setAdding((prevAdding) => ({ ...prevAdding, add: false }));
  };
  //**kitabi listeden silmek-200 basarili */
  const deleteBook = async (id) => {
    setAdding((prevAdding) => ({ ...prevAdding, delete: true }));
    const response = await axios.delete(`${api}/books/${id}`);
    if (response.status === 200) {
      setBooks((prevBookList) => prevBookList.filter((book) => book.id !== id));
    }
    setAdding((prevAdding) => ({ ...prevAdding, delete: false }));
  };
  //**kitap verilerini getirmek icin get istegi, abortcontroller silinme veya yeniden render durumunda iptal edilmesi icin  */
  useEffect(() => {
    const controller = new AbortController();
    const getBooks = async () => {
      try {
        setAdding((prevAdding) => ({ ...prevAdding, read: true }));
        const response = await axios.get(
          //   `${process.env.REACT_APP_BACKEND_URL}`,
          `${api}/books`,
          { signal: controller.signal }
        );
        setBooks(response.data);
        setAdding((prevAdding) => ({ ...prevAdding, read: false }));
      } catch (error) {
        setAdding((prevAdding) => ({ ...prevAdding, read: false }));
        if (error.name === "AbortError") {
          console.log("Request was aborted", error.message);
        } else {
          console.log("Someting went wrond!", error.message);
        }
      }
    };
    getBooks();
    return () => {
      controller.abort();
    };
  }, []);

  return (
    <BookContext.Provider value={{ books, adding, addNewBook, deleteBook }}>
      {children}
    </BookContext.Provider>
  );
};

export default BookProvider;
