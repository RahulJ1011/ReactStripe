import React, { useContext, useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import {
  Button,
  Card,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import db from "../data/db.json";
import { cartContext } from "../context/Contextapi";

const Home = () => {
  const [data, setData] = useState([]);
  const {addToCart} = useContext(cartContext)
  useEffect(() => {
    setData(db);
    let values = JSON.stringify(data)
    localStorage.setItem("data",values)
  }, []);

  const handleClick = (id) => {
    setData((prevData) => {
      return prevData.map((item) => {
        if (item.id === id) {
          return { ...item, quantity: item.quantity + 1 };
        }
        return item;
      });
    });
  };
  
  const handleDecrement = (id) => {
    setData((prevData) => {
      return prevData.map((item) => {
        if (item.id === id) {
          return { ...item, quantity: item.quantity - 1 };
        }
        return item;
      });
    });
  };

  return (
    <Grid container spacing={3} sx={{
      marginTop:"50px",
      paddingLeft:"30px"
    }}>
     
      {data.map((product) => (
        <Grid item key={product.id} xs={12} sm={6} md={4}>
          <Card
            sx={{ maxWidth: "400px", height: "600px", alignItems: "center" }}
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
               variant = 'contained'
               onClick={()=> addToCart(product.id)}
              >
                Add to Cart
              </Button>
             </CardContent>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default Home;
