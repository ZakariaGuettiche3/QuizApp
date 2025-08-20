import React, { useEffect, useState } from "react";
import Navebare from "./Navebare";
import MCQuestion from "./MCQuestion";
import "../Css/History.css";
import axios from "axios";
import Cookies from "js-cookie";
export default function History() {
  const id = Cookies.get("id");
  const [date, Setdate] = useState("");
  const [history, Sethistory] = useState([]);
  const handleDateChange = (e) => {
    Setdate(e.target.value);
    console.log("Date sélectionnée :", e.target.value);
    fetchData(e.target.value);
  };

  const fetchData = async (date) => {
    try {
      const respons = await axios.get(
        `https://quizapp-m2tg.onrender.com/api/history?id=${id}&date=${date}`,
        {
          headers: {
            Authorization: `Bearer ${Cookies.get("jwt")}`,
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      console.log(respons.data);
      Sethistory(respons.data);
    } catch (erreur) {
      alert(
        erreur.response?.data?.message ||
          "Erreur lors de la récupération de l'historique"
      );
    }
  };

  return (
    <div>
      <div className="date-container ">
        <label htmlFor="date">Choose a date :</label>
        <input
          type="date"
          id="date"
          name="date"
          onChange={handleDateChange}
          value={date}
        ></input>
      </div>
      {history.map((challenges, index) => (
        <div>
          <MCQuestion
            key={index}
            challenges={challenges}
            index1={index}
            ShowExplanation={true}
            ishistory={true}
            block={true}
            num={history.length}
          />
        </div>
      ))}
    </div>
  );
}
