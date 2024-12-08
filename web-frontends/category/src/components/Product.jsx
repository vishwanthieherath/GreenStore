import { Link, useNavigate } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import axios from "axios";

import { LocalStorage } from "@GreenStore/auth";

const Product = (props) => {

  const navigate = useNavigate();
  const isAuthenticated = LocalStorage.getItem("isAuthenticated");

    const [quantity, setQuantity] = useState(0);

    const removeProduct = () => {
      if (quantity > 0) {
        setQuantity(quantity - 1);
      }
    };

    const addProduct = () => {
      setQuantity(quantity + 1);
    };


    const handleAddToCart = () => {

      if (!isAuthenticated) {
        navigate("/login");
        return null;
      }

      if (quantity === 0) {
        alert("Please select quantity");
        return null;
      }

      const cartItem = {
        cartId: 1000,
        productId: props.id,
        productName: props.name,
        quantity: quantity,
        totalItemPrice: props.price * quantity,
      };

      
      const saveCartItem = async () => {
        try {
          const response = await axios.post(
            "http://localhost:4000/cart-items",
            cartItem
          );
          
          if (response.data) {
            alert("Product added to cart successfully");
          }

        } catch (error) {
          console.error("Error saving product:", error);
          return null;
        }
      };

      saveCartItem();

    };

    return (
      <div className="flex justify-between items-start w-5/6 p-4">
        <div className="flex flex-col justify-start items-start w-1/2 p-2">
          <div className="mb-10 w-72 h-auto">
            <img src={props.imageUrl} />
          </div>
          <div className="flex flex-col w-full justify-start items-start">
            <h1 className="text-2xl">{props.name}</h1>
            <p>500g</p>
          </div>
        </div>

        <div className="flex flex-col justify-start items-center w-1/2 p-8">
          <div className="flex flex-col w-full mb-10 pr-2 text-sm">
            <p className="flex justify-between items-center mb-1">
              <p>Price:</p>
              <p>Rs {props.price ? props.price : "-"}</p>
            </p>
            <p className="flex justify-between items-center mb-1">
              <p>Quantity:</p>
              <div className="flex w-16 justify-between items-center">
                <button
                  onClick={removeProduct}
                  className="flex justify-center items-center bg-lightest-green w-5 h-5 rounded-full"
                >
                  -
                </button>
                <p>{quantity}</p>
                <button
                  onClick={addProduct}
                  className="flex justify-center items-center bg-lightest-green w-5 h-5 rounded-full"
                >
                  +
                </button>
              </div>
            </p>
          </div>

          <div className="flex justify-center items-center w-full">
            <button
              onClick={handleAddToCart}
              className="bg-lightest-green rounded-lg w-full h-8 text-sm"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    );
}

export default Product;
