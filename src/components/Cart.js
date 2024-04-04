import React, { useContext, useState } from "react";
import { cartContext } from "../context/Contextapi";
import {
  Button,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Grid,
} from "@mui/material";
import axios from "axios";

const Cart = () => {
  const { Carts, removeCart, setCart, totalPrice } = useContext(cartContext);
  const [loading, setLoading] = useState(false);

  const handleClick = (id) => {
    setCart((prev) => {
      return prev.map((item) => {
        if (item.id === id) {
          localStorage.setItem("cart", JSON.stringify([...Carts]));
          return { ...item, quantity: item.quantity + 1 };
        }
        return item;
      });
    });
  };

  const handleDecrement = (id) => {
    setCart((prev) => {
      return prev.map((item) => {
        if (item.id === id) {
          localStorage.setItem("cart", JSON.stringify([...Carts]));
          return { ...item, quantity: item.quantity - 1 };
        }
        return item;
      });
    });
  };

  const checkout = async () => {
    try {
      setLoading(true);
      const res = await axios.post(
        "http://localhost:5000/checkout",
        {
          cart: Carts,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if(res)
      {
        setLoading(false)
      }
      if (res.data.url) {
        console.log(res.data)
        window.location.assign(res.data.url);
      }
    } catch (error) {
      console.error("Error during checkout:", error);
    } 
  };

  return (
    <div>
      <Grid
        container
        spacing={3}
        sx={{
          marginTop: "50px",
          paddingLeft: "30px",
        }}
      >
        <Typography variant="h2" sx={{ textAlign: "center" }}>
          CART
        </Typography>
        {Carts.map((product) => (
          <Grid item key={product.id} xs={12} sm={6} md={4}>
            <Card
              sx={{
                maxWidth: "400px",
                height: "600px",
                alignItems: "center",
              }}
            >
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {product.title}
                </Typography>
              </CardContent>

              <CardMedia
                component="img"
                height="300"
                image={product.image}
                alt={product.title}
              />
              <CardContent>
                <Typography variant="body2" color="text.secondary">
                  Price: {product.price}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Quantity: {product.quantity}
                </Typography>
                <Button
                  sx={{
                    margin: "10px",
                  }}
                  onClick={() => handleClick(product.id)}
                  variant="contained"
                >
                  +
                </Button>
                <Button
                  onClick={() => handleDecrement(product.id)}
                  variant="contained"
                >
                  -
                </Button>
                <CardContent>
                  <Button
                    variant="contained"
                    onClick={() => removeCart(product.id)}
                  >
                    Remove Cart
                  </Button>
                </CardContent>
              </CardContent>
            </Card>
          </Grid>
        ))}
       
      </Grid>
      <Typography variant="h3">Total Price: {totalPrice()}</Typography>
        <Button
          variant="contained"
          color="secondary"
          onClick={checkout}
          disabled={loading}
        >
          {loading ? "Processing..." : "Checkout"}
        </Button>
    </div>
  );
};

export default Cart;
