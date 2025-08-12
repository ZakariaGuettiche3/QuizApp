import React, { useContext, useEffect, useState } from "react";
import imag from "../image/d35b769b2057e17a595c6d32517ffd22.jpg";
import "../Css/HomePage.css";
import { Context } from "./Context";
import { useNavigate } from "react-router-dom";
export default function Homepage() {
  const { topic, SetTopic } = useContext(Context);
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/Generate");
  };
  const update = (e) => {
    SetTopic(e.target.value);
  };
  useEffect(() => {
    const img = document.querySelector(".img");
    if (img) {
      img.classList.add("img-active");
    }
  }, []);

  return (
    <div className="homepage">
      <img src={imag} alt="" className="img" />
      <div className="generator">
        <p className="text">Challenge Your Knowledge</p>
        <p>Challenge remaining today: </p>
        <input
          type="text"
          placeholder="choose a topic"
          onChange={update}
        ></input>
        <button onClick={handleSubmit}>Generate Questions</button>
      </div>
    </div>
  );
}
