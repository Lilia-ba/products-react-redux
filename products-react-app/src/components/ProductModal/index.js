import React from 'react';
import './style.scss';
import useManageProduct from './use-manage-product';

const ProductModal = () => {
  const {
    showModal,
    setShowModal,
    categories,
    formData,
    handleSave,
    handleChange,
    handleCategoryChange,
    uploadImage
  } = useManageProduct()

  return (
    <div>
      <button className="open-modal-btn" onClick={() => setShowModal(true)}>
        Create Product
      </button>
      {showModal && (
        <div className="modal">
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Product Name"
            className="modal-input"
          />
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Product Description"
            className="modal-input"
          />
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            placeholder="Product Price"
            className="modal-input"
          />
          <input
            type="file"
            accept="image/*"
            name="image"
            onChange={uploadImage}
            className="modal-input"
          />
          {formData.image && (
            <img
              src={formData.image}
              alt="Selected Product"
              className="modal-image"
            />
          )}
          <select
            value={formData.category.id}
            onChange={handleCategoryChange}
            className="modal-input"
          >
            <option value="">Select Category</option>
            {categories.map((category) => (
              <option key={category._id} value={category._id} name={category.name}>
                {category.name}
              </option>
            ))}
          </select>
          <div className="modal-buttons">
            <button className="save-btn" onClick={handleSave}>
              Save
            </button>
            <button className="cancel-btn" onClick={() => setShowModal(false)}>
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductModal;



