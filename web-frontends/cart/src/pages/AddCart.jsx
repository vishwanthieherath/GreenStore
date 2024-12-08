import { useState } from "react";
import axios from "axios";
import { LocalStorage } from "@GreenStore/auth";
import { useNavigate } from "react-router-dom";

const AddCart = () => {

    const [cartName, setCartName] = useState('');

    const navigate = useNavigate();

    const handleNewCart = (e) => {
        e.preventDefault();
        
        const addCart = async () => {
          try {
            const response = await axios.post(`http://localhost:4000/carts`, { cartName }, {
              headers: {
                Authorization: `Bearer ${
                  LocalStorage.getItem("accessToken").jwtToken
                }`,
              },
            });
            navigate("/carts");
          } catch (error) {
            console.error("Error adding cart:", error);
          }
        };

        addCart();
    }

    return (
      <div className="flex flex-col mb-10 justify-center items-center w-full p-10">
        <h1>Add Cart</h1>

        <form action="" onSubmit={handleNewCart}>
          <label htmlFor="">Cart Name</label>
          <input
            className="block w-60 h-8 border-2 rounded-lg px-3 py-2"
            type="text"
            value={cartName}
            onChange={(e) => setCartName(e.target.value)}
            required
            placeholder="Enter Cart Name"
          />
          <button
            type="submit"
            className="bg-lightest-green rounded-lg w-40 px-8 h-8 text-sm mt-5 ml-4"
          >
            Add Cart
          </button>
        </form>
      </div>
    );
}

export default AddCart;
