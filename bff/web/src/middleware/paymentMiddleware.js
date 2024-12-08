const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const payment = async (req, res, next) => {
  
    try {

      const cartItems = req.body.cartItems;
      const cartPrice = req.body.cartPrice;

      console.log("cartItems", cartItems);

      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items: cartItems.map((item) => {
          return {
            price_data: {
              currency: "lkr",
              product_data: {
                name: item.productDetails.name,
                images: [item.productDetails.imageUrl],
              },
              unit_amount: item.totalItemPrice * 100,
            },
            quantity: 1,
          };
        }),
        mode: "payment",
        shipping_address_collection: {
          allowed_countries: ["US", "CA", "GB", "AU", "LK"],
        },
        success_url: `${process.env.REDIRECT_URI}/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${process.env.REDIRECT_URI}/cancel`,
      });

      // console.log("session", session);

      res.json({ url: session.url });

    } catch (error) {
      res
        .status(500)
        .json({ message: "Error creating session : " + error.message });
    }

};


const complete = async (req, res, next) => {
      
     try {

        const result = Promise.all([
            stripe.checkout.sessions.retrieve(
                req.query.session_id,
                { expand: ["payment_intent.payment_method"] }
            ),
            stripe.checkout.sessions.listLineItems(
                req.query.session_id,
            )
        ]);

        // console.log(JSON.stringify(await result));
    
        // res.send("Payment complete");
    
        res.json({ session });
    
     } catch (error) {
        res
          .status(500)
          .json({ message: "Error retrieving session : " + error.message });
     }
};

module.exports = {
  payment,
  complete
};
