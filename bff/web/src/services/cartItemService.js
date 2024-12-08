const axios = require("axios");
const apiUrl = "http://localhost:8082/cart-items";

// exports.getCartItem = async (id) => {
//   const response = await axios.get(`${apiUrl}/${id}`);
//   return response.data;
// };

// exports.getCartItems = async () => {
//   const response = await axios.get(apiUrl);
//   return response.data;
// };

exports.getCartItemsByCartId = async (cartId) => {
  try {

    // console.log("cartId: ", cartId);

    const response = await axios.get(`${apiUrl}/${cartId}`);
    const cartItems = response.data;

    // console.log("response.data: ", response.data);

    const productIds = response.data.map((item) => item.productId);

    // console.log("productIds: ", productIds);

    const productDetailsPromises = productIds.map((productId) =>
      axios.get(`http://localhost:8080/products/${productId}`)
    );
    const productDetailsResponses = await Promise.all(productDetailsPromises);
    const productDetails = productDetailsResponses.map(
      (response) => response.data
    );

    // console.log("productDetails: ", productDetails);

    const cartItemsWithProductDetails = cartItems.map((cartItem, index) => ({
      ...cartItem,
      productDetails: productDetails[index],
    }));

    // console.log("cartItemsWithProductDetails: ", cartItemsWithProductDetails);

    return cartItemsWithProductDetails;

  } catch (error) {
    throw new Error("Failed to fetch cart items by cart id", error);
  }
};


// Create a new product
exports.addCartItem = async (cartItemData) => {

  const response = await axios.post(apiUrl, cartItemData);

  return response.data;
};

exports.deleteCartItemByCartId = async ({ cartId, id }) => {

  // console.log("cartId: ", cartId);
  // console.log("id: ", id);

  const response = await axios.delete(`${apiUrl}/${cartId}/${id}`);
  return response.data;
};
