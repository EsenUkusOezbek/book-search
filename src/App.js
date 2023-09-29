import "./App.css";
import Header from "./component/Header";
import BookForm from "./component/BookForm";
import BookProvider from "./context/BookContext";
import { NoView } from "./pages/NoView";
import MyBooks from "./component/MyBooks";
import Browse from "./pages/Browse";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import LoginPage from "./pages/LoginPage";

function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <Header headerTitle="Book Search" />

        <BookProvider>
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="*" element={<NoView />} />
            <Route
              path="/add-new-book"
              element={
                <BookForm>
                  <h3>Add New Book</h3>
                </BookForm>
              }
            />
            <Route path="/my-books" element={<MyBooks />} />
            <Route path="/browse" element={<Browse />} />
          </Routes>
        </BookProvider>
      </div>
    </BrowserRouter>
  );
}

export default App;
