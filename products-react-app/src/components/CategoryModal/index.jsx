import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import "./style.scss"
import axios from 'axios';

const CategoryModal = () => {
    const [showModal, setShowModal] = useState(false); 
    const [categoryName, setCategoryName] = useState('');
    const dispatch = useDispatch();

     const handleSave = async () => {
      const response = await axios.post('https://crudcrud.com/api/54b7434fe7b8437b854d954f91ddf9c4/categories', { name: categoryName });
      if(response.data){
        dispatch({ type: 'ADD_CATEGORY', payload: response.data });
        setShowModal(false);
        setCategoryName('');
      }
  };

  return (
    <div>
    <button className="open-modal-btn" onClick={() => setShowModal(true)}>Create Category</button>
    {showModal && (
      <div className="modal">
        <input
          type="text"
          value={categoryName}
          onChange={(e) => setCategoryName(e.target.value)}
          className="modal-input"
        />
        <div className="modal-buttons">
          <button className="save-btn" onClick={handleSave}>Save</button>
          <button className="cancel-btn" onClick={() => setShowModal(false)}>Cancel</button>
        </div>
      </div>
    )}
  </div>
  
);
};

export default CategoryModal;
