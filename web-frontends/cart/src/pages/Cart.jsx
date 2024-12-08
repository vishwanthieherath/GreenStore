import { useState, useContext, useEffect } from "react";
import axios from "axios";

const Cart = () => {

    const [cartItems, setCartItems] = useState([]);

    useEffect(() => {

      const getCartItemsByCartId = async () => {
        try {
          const response = await axios.get("http://localhost:4000/cart-items", {
            params: { cartId: 1000 }, // Pass cartId as a query parameter
          });
          // console.log(response.data);
          setCartItems(response.data);
        } catch (error) {
          console.error("Error saving product:", error);
          return null;
        }
      };

      getCartItemsByCartId();

    }, []);

    // console.log(cartItems);

    const handleCheckout = async () => {
      try {
        const response = await axios.post("http://localhost:4000/orders", {
          cartItems: cartItems,
          cartPrice: cartItems.reduce(
            (acc, item) => acc + item.totalItemPrice,
            0
          ),
        });

        window.location.href = response.data.url; 
        // console.log(response.data);

      } catch (error) {
        console.error("Error saving order", error);
        return null;
      }
    };

    const removeItem = async (cartItem) => {

      try {
        // console.log(cartItem);
        const response = await axios.delete(
          `http://localhost:4000/cart-items/${cartItem.cartId}/${cartItem.id}`
        );
        setCartItems(cartItems.filter((item) => item.id !== cartItem.id));

        // console.log(response.data);

      } catch (error) {
        console.error("Error deleting product:", error);
        return null;
      }
    };

    // console.log(cartItems);


    return (
      <div className="flex flex-col justify-start items-center w-full p-10">
        <h1 className="w-full text-light-green text-xl px-12 py-6 -mb-6 flex justify-start items-center">Cart Items</h1>

        <div className="flex flex-col w-full p-6 justify-center items-center">
          {cartItems &&
            cartItems.map((cartItem) => {
              return (
                <div
                  className="flex justify-between items-center w-full p-6 rounded-sm shadow-md m-2"
                  key={cartItem.id}
                >
                  <div>
                    <img src={cartItem.productDetails.imageUrl} className="w-36" />
                  </div>

                  <div className="w-3/6 text-sm">
                    <div className="flex justify-between w-full mb-2">
                      <h1 className="text-md text-dark-green">{cartItem.productDetails.name}</h1>
                    </div>
                    <div className="flex justify-between w-full">
                      <h1>Quantity: </h1>
                      <h1>{cartItem.quantity} items</h1>
                    </div>
                    <div className="flex justify-between w-full">
                      <h1>Product Price: </h1>
                      <h1>Rs. {cartItem.productDetails.price}</h1>
                    </div>
                    <div className="flex justify-between w-full">
                      <h1>Total Price: </h1>
                      <h1>Rs. {cartItem.totalItemPrice}</h1>
                    </div>
                  </div>

                  <div className="w-1/6">
                    <button onClick={() => removeItem(cartItem)} className="flex justify-center items-center bg-lightest-green rounded-lg text-sm px-4 py-2">
                      Remove Item
                    </button>
                  </div>
                </div>
              );
            })
          }
            
        </div>

        <div>
          <h1 className="mb-10">
            Cart Price: Rs.{" "}
            {cartItems.reduce(
              (acc, item) => acc + item.totalItemPrice, 0
            )}
          </h1>
        </div>

        <div>
          <button onClick={handleCheckout} className="bg-lightest-green rounded-lg w-full h-8 text-sm px-6">
            Proceed to Checkout
          </button>
        </div>
      </div>
    );
}

export default Cart;
