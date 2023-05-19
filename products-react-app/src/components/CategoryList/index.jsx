import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import "./style.scss"
import axios from 'axios';
import useCategory from "../../hooks/use-category";

const CategoryList = () => {
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.categoryReducer);
  useCategory()

  const handleDeleteCategory = async (categoryId) => {
    await axios.delete(`https://crudcrud.com/api/54b7434fe7b8437b854d954f91ddf9c4/categories/${categoryId}`);
    dispatch({type: 'DELETE_CATEGORY', payload: categoryId});
  };

  return (
    <div className="category-list">
      <h2>Categories</h2>
      <ul className="category-items">
        {categories.map((category, index) => (
          <li key={index} className="category-item">
            <span>{category.name}</span>
            <button onClick={() => handleDeleteCategory(category._id)}>x</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CategoryList;
