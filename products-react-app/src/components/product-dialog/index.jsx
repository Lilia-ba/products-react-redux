import React from "react";
import useManageProduct from "../ProductModal/use-manage-product";

const ProductDialog = ({closeModal, selectedProduct}) => {

  const {
    categories,
    formData,
    handleChange,
    handleCategoryChange,
    uploadImage,
    handleClick
  } = useManageProduct({closeModal, selectedProduct})


  return <div className="modal">
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
      <button className="save-btn" onClick={handleClick}>
        {selectedProduct?'Update':'Save'}
      </button>
      <button className="cancel-btn" onClick={closeModal}>
        Cancel
      </button>
    </div>
  </div>
}

export default ProductDialog