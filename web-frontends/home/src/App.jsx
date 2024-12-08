import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { Header } from "@GreenStore/common";
import { Footer } from "@GreenStore/common";
import Hero from "./components/Hero";
import About from "./components/About";
import Visit from "./components/Visit";
import Categories from "./components/Categories";

import { CategoryProvider } from "@GreenStore/category";
import ScrollToSection from "./components/ScrollToSection";

const App = () => {
  return (
    <CategoryProvider>
      <Router>
        <Routes>
          <Route path="/" element={<ScrollToSection />} />
        </Routes>
        <div id="app" className="flex flex-col">
          <div id="header-div" className="">
            <Header />
          </div>
          <div id="content-div" className="relative top-28">
            <Hero />
            <Categories />
            <About />
            <Visit />
            <Footer />
          </div>
        </div>
      </Router>
    </CategoryProvider>
  );
};

export default App;
