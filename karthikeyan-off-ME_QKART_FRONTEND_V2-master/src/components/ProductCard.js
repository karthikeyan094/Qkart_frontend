import { AddShoppingCartOutlined } from "@mui/icons-material";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Rating,
  Typography,
} from "@mui/material";
import React from "react";
import "./ProductCard.css";

const ProductCard = ({ product, handleAddToCart }) => {

  return (
    <Card className="card">
      <CardMedia  
      component="img" 
      height="140"
      aria-label="stars"
      image={`${product.image}`}
      alt={product.name}
      />
      <CardContent>
        <Typography>{product.name}</Typography>
        <Typography>{`$${product.cost}`}</Typography>
        <Rating aria-label="stars" value={product.rating}/>
      </CardContent>
      <CardActions><Button type="button" name="add to cart" className="card-button" variant="contained" onClick={()=>{handleAddToCart(product)}} >ADD TO CART</Button> </CardActions>
    </Card>
  );
};

export default ProductCard;
