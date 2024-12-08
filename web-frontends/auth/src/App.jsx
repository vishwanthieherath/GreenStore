import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import LogIn from "./pages/LogIn";
import SignUp from "./pages/SignUp";

const App = () => {
  return (
    // <Router>
      <div className="app">
        <Routes>
          <Route path="/login" element={<LogIn />} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
      </div>
    // </Router>
  );
};

export default App;
