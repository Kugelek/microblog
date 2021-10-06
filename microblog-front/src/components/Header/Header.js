import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import BlogLogo from "../../resources/blog-logo.png";
import "./Header.modules.scss";

const Header = () => {
  const [auth, setAuth] = useState("");

  useEffect(() => {
    const role = localStorage.getItem("role");

    role ? setAuth(role) : setAuth("");
  }, []);
  const handleLogout = () => {
    localStorage.setItem("role", "");
    localStorage.setItem("mail", "");
    window.location.reload();
  };
  return (
    <header className="header">
      <div className="header__logo-box">
        {/* <Link to="/"><h1 className="header__logo">teamblog.io</h1></Link> */}
        <Link to="/">
          <img className="header__logo" src={BlogLogo} alt="microblog logo" />
        </Link>
      </div>
      <nav className="navigation">
        <ul className="navigation__list">
          <Link to="/stats">
            <li className="navigation__item">Statystyki</li>
          </Link>
          <li className="navigation__item">About me</li>
          {auth === "" ? (
            <li className="login-btn">
              <Link to="/login">Zaloguj się</Link>
            </li>
          ) : (
            <button onClick={(e) => handleLogout()}>Logout</button>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
