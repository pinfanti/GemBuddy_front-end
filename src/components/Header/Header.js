import logo from "../../assets/logo/logo.jpg";
import "./Header.scss";
import React from "react";
import { Link } from "react-router-dom";

function Header() {
  return (
    <header className="header">
        <Link to="/">
          <img className="header__logo" src={logo} alt="Gem Buddy logo"></img>
        </Link>
        <h3 className="header__slogan"> Discover Hidden Gems Places, Connect with New Faces: Your Gateway to Unseen Adventures!</h3>
    </header>
  );
}

export default Header;