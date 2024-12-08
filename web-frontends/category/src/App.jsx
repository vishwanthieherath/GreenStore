import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useEffect, useState, useContext } from "react";

import { CategoryContext } from "./contexts/CategoryContext";

import { Header } from "@GreenStore/common";
import { Footer } from "@GreenStore/common";

import Categories from "./pages/Categories";
import Products from "./pages/Products";

import { CategoryProvider } from "./contexts/CategoryContext";
import ProductDetails from "./pages/ProductDetails";
import { CartProvider } from "./contexts/CartContext";

const App = () => {

  const categories = useContext(CategoryContext);

  console.log(categories);

  return (
    // <Router>
    <CategoryProvider>
      <CartProvider>
        <div id="app" className="">
          <div id="header-div" className="">
            <Header />
          </div>
          <div id="content-div" className="relative top-28">
            <Routes>
              <Route path="/categories" element={<Categories />} />
              {/* <Route path="/products" element={<Products products={products} currentPage={currentPage} getAllProducts={getAllProducts} />} /> */}

              <Route
                path="/products/category/:categoryId"
                element={<Products />}
              />

              <Route path="/products/:productId" element={<ProductDetails />} />
            </Routes>
            <Footer />
          </div>
        </div>
      </CartProvider>
    </CategoryProvider>
    // </Router>
  );
};

export default App;
