import React, { use, useEffect, useState } from "react";
import "../Css/Login.css";
import Cookies from "js-cookie";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {
  const [erreuremail, Seterreuremail] = useState();
  const navigate = useNavigate();
  const [erreurpassword, Seterreurpassword] = useState();
  const [erreurusername, Seterreurusername] = useState();
  const [confirmPassword, setconfirmPassword] = useState();
  const [confirmPassworderreur, setconfirmPassworderreur] = useState(false);
  const [user, setuser] = useState({ email: "", password: "", username: "" });
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (confirmPassword == user.password) {
      setconfirmPassworderreur(false);
      try {
        const response = await axios.post(
          "https://quizapp-m2tg.onrender.com/api/Sign_up",
          {
            email: user.email,
            password: user.password,
            username: user.username,
          },
          { withCredentials: true }
        );
        if (response.status === 201) {
          Seterreurpassword();
          Seterreurusername();
          Seterreuremail();
          console.log(response);
          Cookies.set("id", response.data[0].id);
          Cookies.set("jwt", response.data[1].jwt);
          Cookies.set("name", response.data[0].username);
          navigate("/");
        }
      } catch (error) {
        if ("password" in error.response.data) {
          Seterreurpassword(error.response.data.password[0]);
          Seterreurusername();
          Seterreuremail();
        }
        if ("email" in error.response.data) {
          Seterreuremail(error.response.data.email[0]);
          Seterreurusername();
          Seterreurpassword();
        }
        if ("username" in error.response.data) {
          Seterreurusername(error.response.data.username[0]);
          Seterreuremail();
          Seterreurpassword();
        }
      }
    } else {
      setconfirmPassworderreur(true);
    }
  };

  useEffect(() => {
    let inpu = document.querySelectorAll(".specinput input");
    let spa = document.querySelectorAll(".specinput span");
    inpu.forEach((e, index) => {
      e.addEventListener("focus", () => {
        spa[index].classList.add("active");
      });
    });
  }, []);
  return (
    <div className="holder f-centre ">
      <div className="Form1 login1">
        <p className="t-c">Create an Account to Begin</p>
        <form onSubmit={(e) => e.preventDefault()}>
          <div className="bigSlider">
            <div className="slider">
              <div className="specinput">
                <input
                  type="text"
                  onChange={(e) =>
                    setuser((prev) => ({ ...prev, username: e.target.value }))
                  }
                  required
                />
                <span>Username</span>
              </div>
              {erreurusername && (
                <span className="error-label">{erreurusername}</span>
              )}
              <div className="specinput">
                <input
                  type="email"
                  onChange={(e) =>
                    setuser((prev) => ({ ...prev, email: e.target.value }))
                  }
                  required
                />
                <span>Email</span>
              </div>
              {erreuremail && (
                <span className="error-label">{erreuremail}</span>
              )}
              <div className="specinput">
                <i className="fa-solid fa-lock"></i>
                <input
                  type="password"
                  required
                  onChange={(e) =>
                    setuser((prev) => ({ ...prev, password: e.target.value }))
                  }
                />
                <span>Password</span>
              </div>
              {erreurpassword && (
                <span className="error-label">{erreurpassword}</span>
              )}
              <div className="specinput">
                <i className="fa-solid fa-lock"></i>
                <input
                  type="password"
                  required
                  onChange={(e) => setconfirmPassword(e.target.value)}
                />
                <span>Confirm Password</span>
              </div>
              {confirmPassworderreur && (
                <span className="error-label">
                  Password confirmation does not match
                </span>
              )}
            </div>
          </div>

          <button
            className="specbtn"
            style={{
              marginBottom: "40px",
            }}
            onClick={handleSubmit}
          >
            SIGN UP
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
