import {
  AddOutlined,
  RemoveOutlined,
  ShoppingCart,
  ShoppingCartOutlined,
} from "@mui/icons-material";
import { Button, IconButton, Stack } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { useHistory } from "react-router-dom";
import { useState ,useEffect} from "react";
import "./Cart.css";

// Definition of Data Structures used
/**
 * @typedef {Object} Product - Data on product available to buy
 * 
 * @property {string} name - The name or title of the product
 * @property {string} category - The category that the product belongs to
 * @property {number} cost - The price to buy the product
 * @property {number} rating - The aggregate rating of the product (integer out of five)
 * @property {string} image - Contains URL for the product image
 * @property {string} _id - Unique ID for the product
 */

/**
 * @typedef {Object} CartItem -  - Data on product added to cart
 * 
 * @property {string} name - The name or title of the product in cart
 * @property {string} qty - The quantity of product added to cart
 * @property {string} category - The category that the product belongs to
 * @property {number} cost - The price to buy the product
 * @property {number} rating - The aggregate rating of the product (integer out of five)
 * @property {string} image - Contains URL for the product image
 * @property {string} productId - Unique ID for the product
 */

/**
 * Returns the complete data on all products in cartData by searching in productsData
 *
 * @param { Array.<{ productId: String, qty: Number }> } cartData
 *    Array of objects with productId and quantity of products in cart
 * 
 * @param { Array.<Product> } productsData
 *    Array of objects with complete data on all available products
 *
 * @returns { Array.<CartItem> }
 *    Array of objects with complete data on products in cart
 *
 */
export const generateCartItemsFrom = (cartData, productsData) => {
  const cartProducts = cartData.map((cartItem)=>{
    return {...productsData.find((product)=>{
      return product["_id"] === cartItem["productId"];
    }),qty:cartItem["qty"]}
  })
  return cartProducts;
};

/**
 * Get the total value of all products added to the cart
 *
 * @param { Array.<CartItem> } items
 *    Array of objects with complete data on products added to the cart
 *
 * @returns { Number }
 *    Value of all items in the cart
 *
 */
export const getTotalCartValue = (items = []) => {
  let total = items.reduce((sum,item)=>{
    sum = sum + (item.qty * item.cost);
    return sum;
  },0)
  return total;
};


// TODO: CRIO_TASK_MODULE_CHECKOUT - Implement function to return total cart quantity
/**
 * Return the sum of quantities of all products added to the cart
 *
 * @param { Array.<CartItem> } items
 *    Array of objects with complete data on products in cart
 *
 * @returns { Number }
 *    Total quantity of products added to the cart
 *
 */
export const getTotalItems = (items = []) => {
  let total = items.reduce((total,item)=>{
    return total+item.qty;
  },0);
  return total;
};

// TODO: CRIO_TASK_MODULE_CHECKOUT - Add static quantity view for Checkout page cart
/**
 * Component to display the current quantity for a product and + and - buttons to update product quantity on cart
 * 
 * @param {Number} value
 *    Current quantity of product in cart
 * 
 * @param {Function} handleAdd
 *    Handler function which adds 1 more of a product to cart
 * 
 * @param {Function} handleDelete
 *    Handler function which reduces the quantity of a product in cart by 1
 * 
 * @param {Boolean} isReadOnly
 *    If product quantity on cart is to be displayed as read only without the + - options to change quantity
 * 
 */
const ItemQuantity = ({
  value,
  handleAdd,
  handleDelete,
}) => {
  return (
    <Stack direction="row" alignItems="center">
      <IconButton size="small" color="primary" onClick={handleDelete}>
        <RemoveOutlined />
      </IconButton>
      <Box padding="0.5rem" data-testid="item-qty">
        {value}
      </Box>
      <IconButton size="small" color="primary" onClick={handleAdd}>
        <AddOutlined />
      </IconButton>
    </Stack>
  );
};

/**
 * Component to display the Cart view
 * 
 * @param { Array.<Product> } products
 *    Array of objects with complete data of all available products
 * 
 * @param { Array.<Product> } items
 *    Array of objects with complete data on products in cart
 * 
 * @param {Function} handleDelete
 *    Current quantity of product in cart
 * 
 * @param {Boolean} isReadOnly
 *    If product quantity on cart is to be displayed as read only without the + - options to change quantity
 * 
 */
const Cart = ({
  isReadOnly,
  products,
  items = [],
  handleQuantity,
}) => {
  let [cartProducts,setCartProducts] = useState([]);
  let history = useHistory();
  useEffect(()=>{
    if(isReadOnly){
      setCartProducts(items);
      return;
    }
    if(items.length){
     const cartProducts = generateCartItemsFrom(items,products);
    setCartProducts(cartProducts);
    }
  },[items]);
  if (!items.length) {
    return (
      <Box className="cart empty">
        <ShoppingCartOutlined className="empty-cart-icon" />
        <Box color="#aaa" textAlign="center">
          Cart is empty. Add more items to the cart to checkout.
        </Box>
      </Box>
    );
  }

  const handleAdd=(product)=>{
    handleQuantity(localStorage.getItem("token"),items,products,product._id,++product.qty);
  }
  const handleDelete=(product)=>{
    handleQuantity(localStorage.getItem("token"),items,products,product._id,--product.qty);
  }
 
  return (
    <>
      <Box className="cart">
        {/* TODO: CRIO_TASK_MODULE_CART - Display view for each cart item with non-zero quantity */}
        {cartProducts &&  cartProducts.map((product)=>{
          return (<Box display="flex" alignItems="flex-start" padding="1rem" key={product["_id"]}>
              <Box className="image-container">
                  <img
                      // Add product image
                      src={product.image}
                      // Add product name as alt eext
                      alt={product.name}
                      width="100%"
                      height="100%"
                  />
              </Box>
              <Box
                  display="flex"
                  flexDirection="column"
                  justifyContent="space-between"
                  height="6rem"
                  paddingX="1rem"
              >
                  <div>{product.name}</div>
                  <Box
                      display="flex"
                      justifyContent="space-between"
                      alignItems="center"
                  >{!isReadOnly ? 
                  <ItemQuantity value={product.qty} handleAdd={()=>{handleAdd(product)}} handleDelete={()=>{handleDelete(product)}}
                  // Add required props by checking implementation
                  /> : <><p>Qty : {product.qty}</p></>}
                  <Box padding="0.5rem" fontWeight="700">
                      ${product.cost}
                  </Box>
                  </Box>
              </Box>
          </Box>)
        })}
        <Box
          padding="1rem"
          display="flex"
          justifyContent="space-between"
          alignItems="center"
        >
          <Box color="#3C3C3C" alignSelf="center">
            Order total
          </Box>
          <Box
            color="#3C3C3C"
            fontWeight="700"
            fontSize="1.5rem"
            alignSelf="center"
            data-testid="cart-total"
          >
            ${getTotalCartValue(cartProducts)}
          </Box>
        </Box>

        {!isReadOnly && <Box display="flex" justifyContent="flex-end" className="cart-footer">
          <Button onClick={() => {
            history.push("/checkout");
           }}
            color="primary"
            variant="contained"
            startIcon={<ShoppingCart />}
            className="checkout-btn"
          >
            Checkout
          </Button>
        </Box>}
      </Box>
      {isReadOnly && <Box className="cart" padding="1rem">
        <h2>Order Details</h2>
        <Box className="cart-row" lineHeight="0.5rem">
          <p>Products</p>
          <p>{getTotalItems(items)}</p>
          </Box>     
           <Box className="cart-row" lineHeight="0.5rem">
          <p>Subtotal</p>
          <p>${getTotalCartValue(cartProducts)}</p>
          </Box>   
           <Box className="cart-row" lineHeight="0.5rem">
          <p>Shipping Charges</p>
          <p>$0</p>
          </Box>    
          <Box className="cart-row" lineHeight="0.5rem">
          <h3>Total</h3>
          <h3>${getTotalCartValue(cartProducts)}</h3>
          </Box>  
        </Box>}
    </>
  );
};

export default Cart;
