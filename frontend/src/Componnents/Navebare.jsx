import React, { useState } from "react";
import { Link } from "react-router-dom";
import Home from "./Home";
import History from "./History";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleUser } from "@fortawesome/free-solid-svg-icons";
import "../Css/Navbar.css";
import SignIn from "../Authe/SignIn";
import Cookies from "js-cookie";

export default function Navebare() {
  const logout = () => {
    Cookies.remove("jwt");
  };
  const name = Cookies.get("name");
  return (
    <nav>
      <p>
        <span>ZA</span>Quiz
      </p>
      <ul>
        <Link to="/">Home</Link>
        <Link to="/history">History</Link>
        <Link to="/Sign-in_Sign_up" onClick={logout}>
          LogOut
        </Link>
      </ul>

      <div className="name">{name[0].toUpperCase()}</div>
    </nav>
  );
}
