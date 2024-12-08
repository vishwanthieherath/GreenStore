import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { Header } from "@GreenStore/common";
import { Footer } from "@GreenStore/common";

import AllCarts from "./pages/AllCarts";
import AddCart from "./pages/AddCart";
import Cart from "./pages/Cart";

import { CartProvider } from "@GreenStore/category";

const App = () => {
  return (
    <CartProvider>
        <div id="app" className="">
          <div id="header-div" className="">
            <Header />
          </div>
          <div id="content-div" className="relative top-28">
            <Routes>
              <Route path="/carts" element={<AllCarts />} />
              <Route path="/carts/:cartId" element={<Cart />} />
              <Route path="/carts/add-cart" element={<AddCart />} />
            </Routes>
            <Footer />
          </div>
        </div>
    </CartProvider>
  );
};

export default App;
