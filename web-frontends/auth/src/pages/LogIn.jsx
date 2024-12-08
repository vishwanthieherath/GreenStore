import logo from "../assets/logo.png";
import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { logIn } from "../services/AuthService";
import { useNavigate } from "react-router-dom";

import { LocalStorage } from "@GreenStore/auth";

const LogIn = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    const onSubmit = (e) => {

      e.preventDefault();

      logIn(email, password).then((response) => {

        if (response) {

          if (response.idToken.payload["cognito:groups"]) {

            const admin = response.idToken.payload["cognito:groups"][0];

            if (admin === "admin") {
              LocalStorage.setItem("isAdmin", true);
            } else {
              LocalStorage.setItem("isAdmin", false);
            }
          }
            
          // LocalStorage.setItem("isAdmin", false);
          LocalStorage.setItem("isAuthenticated", true);
          LocalStorage.setItem("userId", email);
          LocalStorage.setItem("idToken", response.idToken);
          LocalStorage.setItem("accessToken", response.accessToken);
          navigate(LocalStorage.getItem("redirectUrl") || "/");
        }

      });
        
    };

  return (
    <div className="relative flex justify-center items-center w-full h-screen p-4">
      {/* {status && (
        <div className="absolute top-10 bg-dark-white rounded-md w-fit h-fit py-4 px-10">
          You are already logged in
        </div>
      )} */}
      <div className="block w-fit mx-auto">
        <div className="block mx-auto p-4 w-32 h-auto">
          <img src={logo} alt="" />
        </div>

        <form onSubmit={onSubmit} className="block text-sm">
          <div className="mb-4">
            <label className="pl-2" htmlFor="">
              Email
            </label>
            <input
              className="block w-60 h-8 border-2 rounded-lg px-3 py-2"
              type="text"
              value={email}
              name="email"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <div className="error-div text-red text-xs pr-2 flex justify-end items-center w-60 h-fit">
              {/* Error */}
            </div>
          </div>

          <div className="mb-4">
            <label className="pl-2" htmlFor="">
              Password
            </label>
            <input
              className="block w-60 h-8 border-2 rounded-lg px-3 py-2"
              type="password"
              value={password}
              name="password"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <Link
              to="/reset-password"
              className="flex justify-start items-center pl-2 mt-1 text-xs text-darkest-green"
            >
              Forgot Password?
            </Link>
            <div className="error-div text-red text-xs pr-2 flex justify-end items-center w-60 h-fit">
              {/* Error */}
            </div>
          </div>

          <div className="mb-4">
            <input
              className="flex justify-center items-center bg-lightest-green w-60 h-8 rounded-lg cursor-pointer hover:bg-light-green"
              type="submit"
              value="Log In"
            />
          </div>

          <div className="flex justify-center items-center w-60">
            <p className="text-xs">
              Don't you have an account?{" "}
              <span className="text-dark-green">
                <Link to="/signup">Sign Up</Link>
              </span>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LogIn;
