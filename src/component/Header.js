import React from "react";
import { NavLink, useNavigate } from "react-router-dom";

//rotalar
const navbarItems = [
  { name: "My Books", href: "/my-books" },
  { name: "Browse", href: "/browse" },
  { name: "Add New Book", href: "/add-new-book" },
];

const Header = ({ headerTitle }) => {
  return (
    <header className="app-header">
      <div className="logo">
        <span>
          <i className="fa-solid fa-book fa-2xl"></i>
        </span>
        <NavLink to="/">
          <h2>{headerTitle}</h2>
        </NavLink>
      </div>
      <nav className="navbar">
        <ul>
          {navbarItems.map((item) => (
            <li key={item.name}>
              <NavLink to={item.href}>{item.name}</NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
