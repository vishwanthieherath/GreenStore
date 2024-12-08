import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CartContext } from "../contexts/CartContext";

import axios from "axios";

import { LocalStorage } from "@GreenStore/auth";

const ProductCard = (props) => {

  const navigate = useNavigate();
  const isAuthenticated = LocalStorage.getItem("isAuthenticated");

  const [quantity, setQuantity] = useState(0);
  
  // const { cartItems, setCartItems } = useContext(CartContext);

  const removeProduct = () => {
      if(quantity > 0) {
        setQuantity(quantity - 1);
      }
  }

  const addProduct = () => {
    setQuantity(quantity + 1);
  }

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
          
          if(response.data) {
            alert("Product added to cart successfully");
          }

        } catch (error) {
          console.error("Error saving product:", error);
          return null;
        }
      };

      saveCartItem();
      
  }


  return (
    <div className="flex flex-col w-60 h-80 min-w-60 justify-center items-center p-4 shadow-lg rounded-md m-4">
      <Link to={`/products/${props.id}`}>
        <div className="flex justify-center items-center p-2 w-44 h-44 mb-2 overflow-hidden">
          <img src={props.imageUrl} />
        </div>
      </Link>
      <div className="flex flex-col w-full">
        <div className="flex w-full justify-between items-center">
          <h1 className="flex justify-start items-center mb-2">{props.name}</h1>
          <p className="text-xs mr-2">500g</p>
        </div>

        <div className="flex flex-col w-full mb-2 pr-2 text-sm">
          <p className="flex justify-between items-center mb-1">
            <p>Price:</p>
            <p>Rs. {props.price ? props.price : "-"}</p>
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
        <div className="flex justify-center items-center">
          <button
            onClick={handleAddToCart}
            className="bg-lightest-green rounded-lg w-full h-8 text-sm"
          >
            Add to cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
