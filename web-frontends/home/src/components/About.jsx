import React from "react";
import logo from "../assets/logo.png";
import shop from "../assets/shop.jpeg";

const About = () => {

  return (
    <section
      id="about"
      className="flex bg-dark-white justify-center items-center p-16"
    >
      <div className="flex flex-col justify-center items-center">
        <div className="flex justify-center items-center text-3xl font-bold text-light-green mb-10">
          <h1>About Us</h1>
        </div>

        <div className="flex justify-around items-center p-8">
          <div className="w-5/6 p-15 flex justify-center items-center">
            <img src={shop} alt="" className="w-64 rounded-2xl" />
          </div>
          <div className="w-5/6 p-6 flex-col justify-around items-center">
            <h1 className="text-lg text-dark-green font-bold mb-10">Welcome to GreenStore</h1>
            <p className="text-md w-5/6">
              At GreenStore, we believe that good food is at the heart of
              every great experience. Located in the heart of Mount Lavinia, our store is dedicated to bringing you the
              finest selection of fresh, delicious, and high-quality foods that
              cater to every palate and occasion.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
