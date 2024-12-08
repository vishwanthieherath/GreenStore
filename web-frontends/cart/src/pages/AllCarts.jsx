import { useState, useEffect } from "react";
import axios from "axios";

import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { LocalStorage } from "@GreenStore/auth";

import CartCard from "../components/CartCard";

const AllCarts = () => {

  const navigate = useNavigate();
  const isAuthenticated = LocalStorage.getItem("isAuthenticated");

  const [carts, setCarts] = useState([]);

  useEffect(() => {

    console.log(LocalStorage.isAuthenticated);

    if (!isAuthenticated) {
      navigate("/login");
      return null;
    }

    const fetchCarts = async () => {
      try {
        const response = await axios.get("http://localhost:4000/carts", {
          headers: {
            Authorization: `Bearer ${
              LocalStorage.getItem("accessToken").jwtToken
            }`,
          },
        });
        // console.log(response.data);
        setCarts(response.data);
        // console.log(carts);
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    fetchCarts();
  }, [isAuthenticated, navigate]);


  return (
    <div className="flex flex-col justify-start items-center w-full p-8">
      <div className="flex justify-between items-center w-full mb-6">
        <div className="flex justify-center items-center w-1/2">
          <h1 className="">My Carts</h1>
        </div>
        <div className="flex justify-center items-center w-1/2">
          <Link
            to="/carts/add-cart"
            className="flex justify-center items-center bg-lightest-green rounded-lg w-fit px-8 h-8 text-sm"
          >
            Create New Cart
          </Link>
        </div>
      </div>

      <div className="flex flex-col justify-start items-center w-full">
        <CartCard name={"My Cart"} id={1000} />
      </div>

      <div className="flex flex-col justify-start items-center w-full">
        {carts && carts.map((cart) => <CartCard key={cart.id} {...cart} />)}
      </div>
    </div>
  );
};

export default AllCarts;
