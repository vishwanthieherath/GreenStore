import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { Header } from "@GreenStore/common";
import { Footer } from "@GreenStore/common";

import Dashboard from "./pages/Dashboard";
import Products from "./pages/Products";
import Categories from "./pages/Categories";
import AddProduct from "./pages/AddProduct";

const App = () => {
  return (
    // <Router>
      <div id="app" className="">
        <div id="header-div" className="">
          <Header />
        </div>
        <div id="content-div" className="relative top-28">
          <Routes>
            <Route path="/admin" element={<Dashboard />} />
            <Route path="/admin/products" element={<Products />} />
            <Route path="/admin/categories" element={<Categories />} />
            <Route path="/admin/products/add-product" element={<AddProduct />} />
          </Routes>
          <Footer />
        </div>
      </div>
    // </Router>
  );
};

export default App;
