import { Route, Routes, useNavigate } from "react-router-dom";
import { BrowserRouter as Router } from "react-router-dom";
import React, { useEffect } from "react";
import "./Css/main.css";
import Home from "./Componnents/Home";
import History from "./Componnents/History";
import GenerateQuestion from "./Componnents/GenerateQuestion";
import Homepage from "./Componnents/Homepage";
import Form from "./Authe/Form";
import "./Css/generale.css";
import { MyProvider } from "./Componnents/Context";

function App() {
  return (
    <MyProvider>
      <Router>
        <Routes>
          <Route path="/Sign-in_Sign_up" element={<Form />} />
          <Route element={<Home />}>
            <Route path="/history" element={<History />} />

            <Route path="/" element={<Homepage />} />
            <Route path="/Generate" element={<GenerateQuestion />} />
          </Route>
        </Routes>
      </Router>
    </MyProvider>
  );
}

export default App;
