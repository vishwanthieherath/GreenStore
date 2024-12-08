exports.createOrder = async (req, res, next) => {
  try {
    const newOrder = await orderService.createOrder(req);
    console.log(newOrder);
    res.status(201).json(newOrder);
    return newOrder;
  } catch (error) {
    next(error);
  }
};
