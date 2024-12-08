import React from "react";
import logo from '../assets/logo.png';
import venue from '../assets/venue.svg';
import phone from '../assets/phone.svg';
import facebook from '../assets/facebook.svg';
import instagram from '../assets/instagram.svg';
import whatsapp from '../assets/whatsapp.svg';
import clock from '../assets/clock.svg';

const Visit = () => {

  return (
    <section
      id="visit"
      className="flex justify-center items-center p-16 bg-white w-full"
    >
      <div className="flex flex-col justify-center items-center w-full">
        <div className="flex justify-center items-center text-3xl font-bold text-light-green mb-10">
          <h1>Visit Us</h1>
        </div>

        <div className="flex w-5/6 justify-around items-center p-8">
          <div className="flex-col justify-start w-5/6 p-6">
            <div className="mb-4">
              <div className="flex justify-start mb-2 text-light-green">
                <img src={venue} alt="" className="mr-4" />
                <h1>Address</h1>
              </div>
              <p className="text-sm">No 48, Park Road, Mount Lavinia</p>
            </div>

            <div className="mb-4">
              <div className="flex justify-start mb-2 text-light-green">
                <img src={clock} alt="" className="mr-4" />
                <h1>Store Hours</h1>
              </div>
              <p className="text-sm">8.00 am - 10.00 pm</p>
            </div>

            <div className="mb-4">
              <div className="flex justify-start mb-2 text-light-green">
                <img src={phone} alt="" className="mr-4" />
                <h1>Contact us</h1>
              </div>
              <p className="text-sm">+94 77 123 4567</p>
            </div>

            <div className="mb-4 text-light-green">
              <h1 className="mb-2">Follow Us</h1>
              <div className="flex w-2/6 justify-between items-center">
                <a href="">
                  <img src={facebook} alt="" />
                </a>
                <a href="">
                  <img src={instagram} alt="" />
                </a>
                <a href="">
                  <img src={whatsapp} alt="" />
                </a>
              </div>
            </div>
          </div>

          <div className="flex justify-end w-5/6 p-15">
            <img src={logo} alt="" className="w-64" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Visit;
