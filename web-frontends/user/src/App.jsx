import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { Header } from "@GreenStore/common";
import { Footer } from "@GreenStore/common";

import Account from "./pages/Account";

const App = () => {
  return (
    // <Router>
      <div id="app" className="">
        <div id="header-div" className="">
          <Header />
        </div>
        <div id="content-div" className="relative top-28">
          <Routes>
            <Route path="/account" element={<Account />} />
          </Routes>
          <Footer />
        </div>
      </div>
    // </Router>
  );
};

export default App;
