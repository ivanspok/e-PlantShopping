import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './CartItem.css';
import {removeItem, updateQuantity } from './CartSlice';

const CartItem = ({ onContinueShopping, setAddedToCart }) => {
  const cart = useSelector(state => state.cart.items);
  const dispatch = useDispatch();

  // Calculate total amount for all products in the cart
  const calculateTotalAmount = () => {
    let totalAmount = 0;
    cart.forEach(item => totalAmount += parseFloat(item.cost.substring(1)) * item.quantity)
    return totalAmount
  };

  const handleContinueShopping = (e) => {
    onContinueShopping(e);
  };

  const handleIncrement = (item) => {
    let updatedItem = {
        ...item,
        quantity: item.quantity + 1
    }
    dispatch(updateQuantity(updatedItem ))
  };

  const handleDecrement = (item) => {
   if (item.quantity > 1) {
    let updatedItem = {
        ...item,
        quantity: item.quantity - 1
    }
    dispatch(updateQuantity(updatedItem ))
   } else {
    dispatch(removeItem(item));
    setAddedToCart((prevState) => ({
        ...prevState, 
        [item.name]: false,
    }));
   }
   };

  const handleRemove = (item) => {
    dispatch(removeItem(item));
    setAddedToCart((prevState) => ({
        ...prevState, 
        [item.name]: false,
    }));
  };

  // Calculate total cost based on quantity for an item
  const calculateTotalCost = (item) => {
    return parseFloat(item.cost.substring(1)) * item.quantity;
  };

  const handleCheckoutShopping = (e) => {
    alert('Functionality to be added for future reference');
  };

  return (
    <div className="cart-container">
      <h2 style={{ color: 'black' }}>Total Cart Amount: ${calculateTotalAmount()}</h2>
      <div>
        {cart.map(item => (
          <div className="cart-item" key={item.name}>
            <img className="cart-item-image" src={item.image} alt={item.name} />
            <div className="cart-item-details">
              <div className="cart-item-name">{item.name}</div>
              <div className="cart-item-cost">{item.cost}</div>
              <div className="cart-item-quantity">
                <button className="cart-item-button cart-item-button-dec" onClick={() => handleDecrement(item)}>-</button>
                <span className="cart-item-quantity-value">{item.quantity}</span>
                <button className="cart-item-button cart-item-button-inc" onClick={() => handleIncrement(item)}>+</button>
              </div>
              <div className="cart-item-total">Total: ${calculateTotalCost(item)}</div>
              <button className="cart-item-delete" onClick={() => handleRemove(item)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
      <div style={{ marginTop: '20px', color: 'black' }} className='total_cart_amount'></div>
      <div className="continue_shopping_btn">
        <button className="get-started-button" onClick={(e) => handleContinueShopping(e)}>Continue Shopping</button>
        <br />
        <button className="get-started-button1">Checkout</button>
      </div>
    </div>
  );
};

export default CartItem;


