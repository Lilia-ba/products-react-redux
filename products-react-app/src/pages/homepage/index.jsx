import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import "./style.scss"


const HomePage = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.productReducer);

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await axios.get(
        'https://crudcrud.com/api/54b7434fe7b8437b854d954f91ddf9c4/products'
      );
      dispatch({ type: 'FETCH_PRODUCTS', payload: response.data });
    };

    fetchProducts();
  }, [dispatch]);

  
  const [productCounters, setProductCounters] = useState({});

  const incrementCounter = (productId) => {
    setProductCounters((prevCounters) => ({
      ...prevCounters,
      [productId]: (prevCounters[productId] || 0) + 1,
    }));
  };

  const decrementCounter = (productId) => {
    setProductCounters((prevCounters) => {
      const newCount = (prevCounters[productId] || 0) - 1;
      const updatedCounters = { ...prevCounters };
      if (newCount <= 0) {
        delete updatedCounters[productId];
      } else {
        updatedCounters[productId] = newCount;
      }
      return updatedCounters;
    });
  };
  const handleAddToCart = (productId) => {
    const selectedProduct = products.find((product) => product._id === productId);
    const quantity = productCounters[productId] || 1;
  
    // Construct the cart item object
    const cartItem = {
      productId: selectedProduct._id,
      name: selectedProduct.name,
      price: selectedProduct.price,
      quantity: quantity,
    };
  
    // Dispatch an action to add the cart item to the shopping cart
    dispatch({ type: 'ADD_TO_CART', payload: cartItem });
  
    // Reset the counter for the current product
    setProductCounters((prevCounters) => {
      const updatedCounters = { ...prevCounters };
      delete updatedCounters[productId];
      return updatedCounters;
    });
  
    console.log(`Product added to cart: ${productId}`);
  };
  return (
    <div className="productcard-list">
      <h2>Products</h2>
      <div className="productcard-items">
        {products.map((product) => (
          <div className="P-padding-productcard" key={product._id}>
            <div className="productcard-item">
              <div
                className="productcard-image"
                style={{ backgroundImage: `url('${product.image}')` }}
              />
              <h1>{product.name}</h1>
              <p>{product.category.name}</p>
              <p>{product.description}</p>
              <p>{product.price} AMD</p>
              <div className="productcard-buttons">
                <button
                  className="add-to-cart-button"
                  onClick={() => handleAddToCart(product._id)}
                >
                  Add to Cart
                </button>
                <div className="counter-container">
                  <button
                    className="counter-button"
                    onClick={() => decrementCounter(product._id)}
                  >
                    -
                  </button>
                  <span className="counter-value">
                    {productCounters[product._id] || 0}
                  </span>
                  <button
                    className="counter-button"
                    onClick={() => incrementCounter(product._id)}
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
