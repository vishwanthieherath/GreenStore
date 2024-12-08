import logo from "../assets/logo.png";
import { useState } from "react";
import { Link } from "react-router-dom";
import { signUp } from "../services/AuthService";

const SignUp = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();

    signUp(email, password);
  };

  return (
    <div className="flex justify-center items-center w-full h-screen p-4">
      <div className="block w-fit mx-auto">
        <div className="block mx-auto p-4 w-32 h-auto">
          <img src={logo} alt="" />
        </div>

        <form onSubmit={onSubmit} className="block text-sm">
          <div className="mb-4">
            <label className="pl-2" htmlFor="email">
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
            <label className="pl-2" htmlFor="password">
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
            <div className="error-div text-red text-xs pr-2 flex justify-end items-center w-60 h-fit">
              {/* Error */}
            </div>
          </div>

          <div className="mb-4">
            <label className="pl-2" htmlFor="">
              Confirm Password
            </label>
            <input
              className="block w-60 h-8 border-2 rounded-lg px-3 py-2"
              type="password"
            />
            <div className="error-div text-red text-xs pr-2 flex justify-end items-center w-60 h-fit">
              {/* Error */}
            </div>
          </div>

          <div className="mb-4 mt-5">
            <input
              className="flex justify-center items-center bg-lightest-green w-60 h-8 rounded-lg cursor-pointer hover:bg-light-green"
              type="submit"
              value="Sign Up"
            />
          </div>

          <div className="flex justify-center items-center w-60">
            <p className="text-xs">
              Already have an account?{" "}
              <span className="text-dark-green">
                <Link to="/login">Log In</Link>
              </span>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
