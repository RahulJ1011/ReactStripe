const express = require("express");
const app = express();
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();
const stripe = require("stripe")(process.env.api_key);

app.use(cors({ origin: "http://localhost:3000" }));
app.use(express.json());


  app.post("/checkout", async (req, res) => {
    try {
      const prods = req.body.cart;
      let lineItems = [];
      prods.map((item) => {
        lineItems.push({
          price: item.price_id,
          quantity: item.quantity,
        });
      });
      const session = await stripe.checkout.sessions.create({
        line_items: lineItems,
        mode: "payment",
        success_url: "http://localhost:3000/success",
        cancel_url: "http://localhost:3000/cancel",
      });
      return res.status(201).json({ url: session.url });
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  });

app.listen(5000, () => {
  console.log("server is running");
});
