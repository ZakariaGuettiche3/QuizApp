import React, { useEffect, useState } from "react";
import Sigin from "./SignIn";
import Login from "./SignUp";
import "../Css/Form.css";
function Form() {
  const [change, SetChanger] = useState(false);
  const [revers, Setrevers] = useState(false);
  const [formchange, Setformchange] = useState(false);

  return (
    <div className="AllContainer f-centre">
      <div className="GlobaleForm  f-centre">
        <div
          className={
            !change ? "Form " : !revers ? "Form formright " : "Form formleft "
          }
        >
          {!formchange ? <Sigin /> : <Login />}
        </div>
        <div
          className={
            !revers
              ? "FormChange f-centre  changerFormrev"
              : "FormChange f-centre changerForm"
          }
        >
          <div
            className={
              !change
                ? "befor "
                : !revers
                ? "befor beforchangerev"
                : "befor beforchange"
            }
          ></div>
          <div className="sous-formchange">
            <div
              className={
                !revers ? "sign-in TextChngerrev" : " sign-in TextChnger"
              }
            >
              <p>Hello, Friend!</p>
              <p>Entre your personal details and start journey with us</p>
              <button
                className="FormChange-btn"
                onClick={() => {
                  SetChanger(true);
                  Setrevers(true);
                  setTimeout(() => {
                    Setformchange(true);
                  }, 500);
                }}
              >
                SIGN UP
              </button>
            </div>
            <div
              className={!revers ? "bet TextChngerrev" : " bet TextChnger"}
              style={{
                width: "100%",
                height: "100%",
              }}
            ></div>
            <div
              className={!revers ? "login TextChngerrev " : " login TextChnger"}
            >
              <p>Welcome Back!</p>
              <p>
                To keep connected with us please login with your personal info
              </p>
              <button
                className="FormChange-btn"
                onClick={() => {
                  SetChanger(true);
                  Setrevers(false);
                  setTimeout(() => {
                    Setformchange(false);
                  }, 500);
                }}
              >
                SIGN IN
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Form;
