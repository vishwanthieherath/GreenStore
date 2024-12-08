import React from "react";
import { BrowserRouter as Router, Link } from "react-router-dom";
import logo from '../assets/logo-small.png';
import profile from '../assets/profile.svg';
import admin from '../assets/admin.svg';
import cart from '../assets/cart.svg'
import axios from "axios";

import { LocalStorage } from "@GreenStore/auth";

const Header = (props) => {

  props = {
    id: 1000
  };

  const isAuthenticated = LocalStorage.getItem("isAuthenticated");
  const isAdmin = LocalStorage.getItem("isAdmin");

  // console.log("isAdmin", isAdmin);

  const handleLogout = async () => {
    try {
      const response = await axios.get("http://localhost:4000/auth/logout", {
        params: { redirectUrl: "/" },
      });
      if (response) {
        LocalStorage.removeItem("isAuthenticated");
        LocalStorage.removeItem("isAdmin");

        window.location.href = response.data.redirectUrl; 
      }
    } catch (error) {
      console.error("Error fetching user:", error);
    }
  };


  const handleLogin = () => {
    LocalStorage.setItem("redirectUrl", window.location.pathname);
    console.log(LocalStorage.getItem("redirectUrl"));
  }
  

  return (
    <Router>
      <header className="w-full text-sm min-w-60 z-50 fixed bg-white flex flex-col pb-4 shadow-md">
        <div className="grid gap-2 grid-cols-7 h-16">
          <div className="col-start-1 col-span-2 px-5 pl-10 flex justify-start items-center">
            <Link to="/" className="w-14 h-auto cursor-pointer">
              <img src={logo} alt="logo" />
            </Link>
          </div>
          <div className="col-start-3 col-span-3 px-5 flex justify-center items-center">
            <div className="bg-lighter-grey text-dark-grey text-sm w-full min-w-10 h-7 rounded-xl flex justify-start px-5 items-center">
              Search bar
            </div>
          </div>
          <div className="col-start-7 col-span-2 px-5 flex justify-end items-center">
            {isAuthenticated ? (
              <div className="flex justify-around items-center w-5/6">
                <div className="flex text-black justify-center items-center cursor-pointer">
                  <Link to="/account">
                    <img src={profile} className="w-6" />
                  </Link>
                </div>
                <div className="flex bg-darker-green text-white link text-xs px-4 py-1 min-w-fit rounded-3xl justify-center items-center cursor-pointer">
                  <button onClick={handleLogout}>Log Out</button>
                </div>
              </div>
            ) : (
              <div className="flex justify-around items-center w-5/6">
                <div className="flex text-black justify-center items-center cursor-pointer link">
                  <Link onClick={handleLogin} to="/login">
                    Log In
                  </Link>
                </div>
                <div className="flex ml-2 bg-darker-green text-white link text-sm px-4 py-1 min-w-fit rounded-3xl justify-center items-center cursor-pointer">
                  <Link to="/signup">Sign Up</Link>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="bg-light-grey w-full h-px mb-3"></div>

        <div className="grid gap-2 grid-cols-9 h-6">
          <div className="col-start-1 lg:col-span-2 px-5 flex justify-start items-center">
            <Link to="/categories" className="cursor-pointer link">
              All Categories
            </Link>
          </div>
          <ul className="col-start-3 col-span-5 px-5 grid grid-cols-4 mr-5">
            <li className="px-5 flex justify-center items-center">
              <Link to="/#home" className="cursor-pointer link">
                Home
              </Link>
            </li>
            <li className="px-5 flex justify-center items-center">
              <Link to="/#categories" className="cursor-pointer link">
                Categories
              </Link>
            </li>
            <li className="px-5 flex justify-center items-center">
              <Link to="/#about" className="cursor-pointer link">
                About Us
              </Link>
            </li>
            <li className="px-5 flex justify-center items-center">
              <Link to="/#visit" className="cursor-pointer link">
                Visit Us
              </Link>
            </li>
          </ul>
          {isAuthenticated && (
            isAdmin ? (
              <div className="col-start-8 col-span-2 gap-10 px-5 flex justify-end items-center pr-5">
                <Link to="/admin" className="cursor-pointer">
                  <img src={admin} alt="" className="w-7" />
                </Link>
                <Link to={`/carts/${props.id}`} className="cursor-pointer">
                  <img src={cart} alt="" className="w-6" />
                </Link>
              </div>
            ) : (
              <div className="col-start-8 col-span-2 gap-6 px-5 flex justify-end items-center cursor-pointer pr-10">
                <Link to={`/carts/${props.id}`} className="cursor-pointer">
                  <img src={cart} alt="" className="w-6" />
                </Link>
              </div>
            )
          )}
        </div>
      </header>
    </Router>
  );
};

export default Header;
