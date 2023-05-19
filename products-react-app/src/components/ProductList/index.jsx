import React, { useEffect,useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import './style.scss'

const ProductList = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.productReducer);
  const [editState,setEditState] = useState({

    editProduct: null,
    showModal: false,
    editedName: '',
    editedCategory: '',
    editedDescription: '',
    editedPrice: '',
    editedImage: null,
    categories: [],


  })

  useEffect(() => {
    const fetchProducts = async () => {
    

            const response = await axios.get(
                'https://crudcrud.com/api/54b7434fe7b8437b854d954f91ddf9c4/products'
              );
              dispatch({ type: 'FETCH_PRODUCTS', payload: response.data });
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
            dispatch({ type: 'DELETE_PRODUCT', payload: productId });
          };
        
          const handleEditProduct = (product) => {
            setEditState((prevState) => ({
              ...prevState,
              editProduct: product,
              editedName: product.name,
              editedCategory: product.category.name,
              editedDescription: product.description,
              editedPrice: product.price,
              showModal: true,
            }));
          };
        
          const handleSaveEdit = async () => {
            const { editProduct, editedName, editedCategory, editedDescription, editedPrice } = editState;
        
            const updatedProduct = {
              ...editProduct,
              name: editedName,
              category: { name: editedCategory },
              description: editedDescription,
              price: editedPrice,
            };
        
            await axios.put(
              `https://crudcrud.com/api/54b7434fe7b8437b854d954f91ddf9c4/products/${updatedProduct._id}`,
              updatedProduct
            );
        
            dispatch({ type: 'UPDATE_PRODUCT', payload: updatedProduct });
            setEditState((prevState) => ({
              ...prevState,
              showModal: false,
            }));
          };
        
          const handleImageChange = (event) => {
            const reader = new FileReader();
            reader.onload = function () {
              setEditState((prevState) => ({
                ...prevState,
                editedImage: reader.result,
              }));
            };
            reader.readAsDataURL(event.target.files[0]);
          };
        
          const { editProduct, showModal, editedName, editedCategory, editedDescription, editedPrice, editedImage, categories } = editState
          return (
            <div className="product-list">
              <h2>Products</h2>
              <div className="product-items">
                {products.map((product) => (
                  <div className="P-padding-product" key={product._id}>
                    <div className="product-item">
                      <div
                        className="product-image"
                        style={{ backgroundImage: `url('${product.image}')` }}
                      />
                      <h1>{product.name}</h1>
                      <p>{product.category.name}</p>
                      <p>{product.description}</p>
                      <p>{product.price} AMD</p>
                      <div className="product-buttons">
                        <button  className='delete-button'  onClick={() => handleDeleteProduct(product._id)}>Delete</button>
                        <button className='edit-button' onClick={() => handleEditProduct(product)}>Edit</button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
        
              {showModal && (
                <div className="modal">
                  <div className="modal-content">
                    <label>Name</label>
                    <input
                      type="text"
                      value={editedName}
                      onChange={(e) => setEditState((prevState) => ({ ...prevState, editedName: e.target.value }))}
                      className='modal-input'
                    />
                    <label>Category</label>
                    <select
                      value={editedCategory}
                      onChange={(e) => setEditState((prevState) => ({ ...prevState, editedCategory: e.target.value }))}
                      className="modal-input"
                    >
                      <option value="">Select category</option>
                      {categories.map((category) => (
                        <option key={category._id} value={category.name}>
                          {category.name}
                        </option>
                      ))}
                    </select>
                    <label>Description</label>
                    <input
                      type="text"
                      value={editedDescription}
                      onChange={(e) => setEditState((prevState) => ({ ...prevState, editedDescription: e.target.value }))}
                      className='modal-input'
                    />
                    <label>Price</label>
                    <input
                      type="text"
                      value={editedPrice}
                      onChange={(e) => setEditState((prevState) => ({ ...prevState, editedPrice: e.target.value }))}
                      className='modal-input'
                    />
                     <label>Image</label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className='modal-input'
                    />
                    <div className="modal-buttons">
                      <button className="save-btn" onClick={handleSaveEdit}>Save</button>
                      <button className='cancel-btn' onClick={() => setEditState((prevState) => ({ ...prevState, showModal: false }))}>Cancel</button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
                      };
    
        
        export default ProductList;
        
        














