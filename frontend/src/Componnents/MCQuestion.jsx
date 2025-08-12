import React, { useState } from "react";
import "../Css/MCQuestion.css";
import { createContext } from "react";
export default function MCQuestion({
  challenges,
  ShowExplanation,
  index1,
  onResult,
  ishistory,
  block,
  num,
}) {
  const [choice, setchoice] = useState(null);
  const [isBlocked, setIsBlocked] = useState(false);
  const [ShouldShowExplanation, SetShowExplanation] = useState(ShowExplanation);

  const handleOptionSelect = (index) => {
    setchoice(index);
    setIsBlocked(true);
    SetShowExplanation(true);
    if (index === challenges.correct_answer_id) {
      onResult([index1, 1, index]);
    } else {
      onResult([index1, -1, index]);
    }
  };

  const optionClass = (index) => {
    if (index === challenges.correct_answer_id && choice !== null) {
      return "option-correct";
    } else if (index === choice && challenges.correct_answer_id !== choice) {
      return "option-incorrect";
    } else {
      return "option";
    }
  };
  const optionClassHistory = (index) => {
    if (index === challenges.correct_answer_id) {
      return "option-correct";
    } else if (
      index === challenges.user_answer &&
      challenges.correct_answer_id !== challenges.user_answer
    ) {
      return "option-incorrect";
    } else {
      return "option";
    }
  };

  return (
    <div className="card">
      <p className="Title">
        <span style={{ fontWeight: 600 }}>
          Question {index1 + 1} / {num}:
        </span>{" "}
        {challenges.title}{" "}
      </p>
      <div className="Option">
        {challenges.options.map((option, index) => (
          <div
            className={
              ishistory ? optionClassHistory(index) : optionClass(index)
            }
            style={{ pointerEvents: isBlocked || block ? "none" : "auto" }}
            key={index}
            onClick={() => handleOptionSelect(index)}
          >
            {option}
          </div>
        ))}
      </div>
      <div>
        <div style={{ fontWeight: 600, marginBottom: 10 }}>Explanation: </div>
        {ShouldShowExplanation && <span>{challenges.explanation}</span>}
      </div>
    </div>
  );
}
