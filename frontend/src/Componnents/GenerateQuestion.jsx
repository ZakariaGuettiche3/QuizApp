import React, { useContext, useState, useEffect } from "react";
import MCQuestion from "./MCQuestion";
import "../Css/GenerateQuestion.css";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import { faCircleCheck, faCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Context } from "./Context";
import Cookies from "js-cookie";
import { SyncLoader } from "react-spinners";
import axios from "axios";
import { useNavigate } from "react-router-dom";
export default function GenerateQuestion() {
  const [answerscorrect, Setanswerscorrect] = useState(0);
  const [answers, Setanswers] = useState(0);
  const { topic } = useContext(Context);
  const [question, Setquestion] = useState([]);
  const [History, SetHistory] = useState([]);
  const [isloading, Setisloading] = useState(false);
  const [refresh, setRefresh] = useState([]);
  const id = Cookies.get("id");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        Setisloading(true);
        const response = await axios.post(
          "https://quizapp-m2tg.onrender.com/api/GenerateQuestion",
          {
            topic: topic,
          },
          {
            headers: {
              Authorization: `Bearer ${Cookies.get("jwt")}`,
              "Content-Type": "application/json",
            },
            withCredentials: true,
          }
        );

        Setquestion(response.data);
        Setisloading(false);
        const history = response.data.map((e) => {
          return { user_id: id, ...e };
        });
        SetHistory(history);
      } catch (Erreur) {
        console.log(Erreur);
      }
    };

    fetchData();
  }, []);

  const handlHistory = async (e) => {
    console.log(refresh);
    e.preventDefault();
    const history = History.map((e, index) => {
      return { ...e, user_answer: refresh[index][2] };
    });
    console.log(history);
    try {
      const response = await axios.post(
        "https://quizapp-m2tg.onrender.com/api/history",
        history,
        {
          headers: {
            Authorization: `Bearer ${Cookies.get("jwt")}`,
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      alert(response.data.message);
      navigate("/");
    } catch (erreur) {
      alert(erreur.data.message);
    }
  };

  const classe = (index) => {
    if (refresh.length > 0) {
      const found = refresh.some((e) => index === e[0] && e[1] === -1);
      const found2 = refresh.some((e) => index === e[0] && e[1] === 1);
      const question = document.querySelectorAll(".question");
      if (found) {
        question[index].classList.add("incorrect");
        return 0;
      }
      if (found2) {
        question[index].classList.add("correct");
        return 1;
      }
    } else {
      return -1;
    }
  };

  const handleResult = (result) => {
    setRefresh((prev) => [...prev, result]);

    if (result[1] === 1) {
      Setanswerscorrect((prev) => prev + 1);
    }
    Setanswers((prev) => prev + 1);
  };

  return (
    <div className="box">
      {isloading && (
        <div className="loader">
          <span>
            <SyncLoader color="#36d7b7" size={50} />
          </span>
        </div>
      )}
      <div className="Challenges">
        <p>Cardiology Quiz</p>
        <div className="progress-bar">
          <span
            style={{
              width: `${(answers / 10) * 100 + 1}%`,
            }}
          ></span>
          <span>{(answers / 10) * 100}%</span>
        </div>
        {question.map((challenges, index) => (
          <div>
            <MCQuestion
              key={index}
              challenges={challenges}
              index1={index}
              onResult={handleResult}
              ShowExplanation={false}
              ishistory={false}
              block={false}
              num={question.length}
            />
          </div>
        ))}
        {answers == 10 && (
          <button onClick={handlHistory}>Save to History</button>
        )}
      </div>
      <div className="progress">
        <div className="percentage ">
          <p>{(answerscorrect / 10) * 100}%</p>
          <p>You got {answerscorrect} answers correct</p>
        </div>
        <div className="questions-Side">
          {question.map((challenges, index) => (
            <div className="question" key={index}>
              <FontAwesomeIcon
                icon={
                  classe(index) == 1
                    ? faCircleCheck
                    : classe(index) == 0
                    ? faCircleXmark
                    : faCircle
                }
              />
              <div>Question {index + 1}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
