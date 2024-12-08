const cartItemService = require("../services/cartItemService");

// exports.getCartItem = async (req, res, next) => {
//   try {
//     const item = await cartItemService.getCartItem(req.params.id);
//     res.json(item);
//   } catch (error) {
//     next(error);
//   }
// };

exports.getCartItemsByCartId = async (req, res, next) => {
  try {

    const { cartId } = req.query;

    // console.log(cartId);

    const items = await cartItemService.getCartItemsByCartId(cartId);
    // console.log("items", items);
    res.json(items);
  } catch (error) {
    next(error);
  }
};

exports.deleteCartItemByCartId = async (req, res, next) => {
  try {
    
    const { cartId, id } = req.params;

    // console.log(cartId, id);
    
    await cartItemService.deleteCartItemByCartId({ cartId , id});
    res.status(204).end();
  } catch (error) {
    next(error);
  }
};

exports.addCartItem = async (req, res, next) => {

  try {
    const newCartItem = await cartItemService.addCartItem(req.body);
    res.status(201).json(newCartItem);
  } catch (error) {
    next(error);
  }
};

