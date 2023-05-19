import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import axios from 'axios';
import './style.scss';
import ProductDialog from "../product-dialog";

const ProductList = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.productReducer);
  const [editState, setEditState] = useState({
    categories: [],
  });

  const [isOpenModal, setISOpenModal] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState(null)

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await axios.get(
        'https://crudcrud.com/api/54b7434fe7b8437b854d954f91ddf9c4/products'
      );
      dispatch({type: 'FETCH_PRODUCTS', payload: response.data});
    };

    const fetchCategories = async () => {
      const response = await axios.get(
        'https://crudcrud.com/api/54b7434fe7b8437b854d954f91ddf9c4/categories'
      );
      setEditState((prevState) => ({
        ...prevState,
        categories: response.data,
      }));
    };

    fetchProducts();
    fetchCategories();
  }, [dispatch]);

  const handleDeleteProduct = async (productId) => {
    await axios.delete(
      `https://crudcrud.com/api/54b7434fe7b8437b854d954f91ddf9c4/products/${productId}`
    );
    dispatch({type: 'DELETE_PRODUCT', payload: productId});
  };


  const handleEditProduct = (data)=>{
    setSelectedProduct(data)
    setISOpenModal(true)
  }

  return (
    <div className="product-list">
      <h2>Products</h2>
      <div className="product-items">
        {products.map((product) => (
          <div className="P-padding-product" key={product._id}>
            <div className="product-item">
              <div
                className="product-image"
                style={{backgroundImage: `url('${product.image}')`}}
              />
              <h1>{product.name}</h1>
              <p>{product.category.name}</p>
              <p>{product.description}</p>
              <p>{product.price} AMD</p>
              <div className="product-buttons">
                <button className='delete-button' onClick={() => handleDeleteProduct(product._id)}>Delete</button>
                <button className='edit-button' onClick={() => handleEditProduct(product)}>Edit</button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {isOpenModal? <ProductDialog selectedProduct={selectedProduct} closeModal={()=>setISOpenModal(false)}/>: null}
    </div>
  );
};

export default ProductList;




