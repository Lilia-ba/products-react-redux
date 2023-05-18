import React from 'react';
import { useSelector, useDispatch} from 'react-redux';
import 'style.scss'

const Cart = () => {
    const dispatch = useDispatch();
    const cartItems = useSelector((state) => state.cartReducer);
  
    const handleRemoveFromCart = (productId) => {
      dispatch({ type: 'REMOVE_FROM_CART', payload: { productId } });
    };
  
    const handleClearCart = () => {
      dispatch({ type: 'CLEAR_CART' });
    };
  
    const handleCheckout = () => {
      // Perform any necessary actions before checkout
      // Redirect to the checkout page or show a success message
      console.log('Proceeding to checkout...');
    };
  
    return (
      <div className="cart">
        <h2>Shopping Cart</h2>
        {cartItems.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <div>
            {cartItems.map((item) => (
              <div key={item.productId} className="cart-item">
                <h3>{item.name}</h3>
                <p>Price: {item.price} AMD</p>
                <p>Quantity: {item.quantity}</p>
                <button className="remove-from-cart-button" onClick={() => handleRemoveFromCart(item.productId)}>
                  Remove
                </button>
              </div>
            ))}
            <button className="clear-cart-button" onClick={handleClearCart}>
              Clear Cart
            </button>
            <button className="checkout-button" onClick={handleCheckout}>
              Checkout({cartItems.length} {cartItems.length === 1 ? 'item' : 'items'})
            </button>
          </div>
        )}
      </div>
    );
  };
  
  export default Cart;