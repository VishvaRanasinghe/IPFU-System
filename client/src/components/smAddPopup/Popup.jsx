import React, { useState } from "react";
import axios from "axios";
import "./Popup.css";
import { toast } from "react-toastify";

function Popup({ showPopup, handleClosePopup }) {
  const [formData, setFormData] = useState({
    code: "",
    name: "",
    price: "",
    quantity: "",
    reorder: "",
    image: null,
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "image") {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: files[0],
      }));
    } else if (
      (name === "price" || name === "quantity" || name === "reorder") &&
      isNaN(value)
    ) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: `${
          name.charAt(0).toUpperCase() + name.slice(1)
        } must be a number`,
      }));
    } else {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: "",
      }));
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let errors = {};

    if (!formData.code) {
      errors.code = "Code is required";
    }

    if (!formData.name) {
      errors.name = "Name is required";
    }

    if (!formData.price || isNaN(formData.price)) {
      errors.price = "Price must be a number";
    }

    if (!formData.quantity || isNaN(formData.quantity)) {
      errors.quantity = "Quantity must be a number";
    }

    if (!formData.reorder || isNaN(formData.reorder)) {
      errors.reorder = "Reorder must be a number";
    }

    if (!formData.image) {
      errors.image = "Image is required";
    }

    if (Object.keys(errors).length > 0) {
      setErrors(errors);
      return;
    }

    const formDataToSend = new FormData();

    formDataToSend.append("code", formData.code);
    formDataToSend.append("name", formData.name);
    formDataToSend.append("price", formData.price);
    formDataToSend.append("quantity", formData.quantity);
    formDataToSend.append("reorder", formData.reorder);
    formDataToSend.append("image", formData.image);

    try {
      const response = await axios.post(
        "http://localhost:3000/products/add",
        formDataToSend,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log(response.data.message);
      toast.success("Product Added successfully!");
      handleClosePopup();
      window.location.reload();
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };

  return (
    showPopup && (
      <div className="popup">
        <div className="popup-content">
          <span className="close" onClick={handleClosePopup}>
            &times;
          </span>
          <h2>Add New Product</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="code">Code:</label>
              <input
                type="text"
                id="code"
                name="code"
                value={formData.code}
                onChange={handleChange}
              />
              {errors.code && <div className="error">{errors.code}</div>}
            </div>
            <div className="form-group">
              <label htmlFor="name">Name:</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
              />
              {errors.name && <div className="error">{errors.name}</div>}
            </div>
            <div className="form-group">
              <label htmlFor="price">Price:</label>
              <input
                type="text"
                id="price"
                name="price"
                value={formData.price}
                onChange={handleChange}
              />
              {errors.price && <div className="error">{errors.price}</div>}
            </div>
            <div className="form-group">
              <label htmlFor="quantity">Quantity:</label>
              <input
                type="text"
                id="quantity"
                name="quantity"
                value={formData.quantity}
                onChange={handleChange}
              />
              {errors.quantity && (
                <div className="error">{errors.quantity}</div>
              )}
            </div>
            <div className="form-group">
              <label htmlFor="reorder">Reorder:</label>
              <input
                type="text"
                id="reorder"
                name="reorder"
                value={formData.reorder}
                onChange={handleChange}
              />
              {errors.reorder && <div className="error">{errors.reorder}</div>}
            </div>
            <div className="form-group">
              <label htmlFor="image">Image:</label>
              <input
                type="file"
                id="image"
                name="image"
                onChange={handleChange}
              />
              {errors.image && <div className="error">{errors.image}</div>}
            </div>
            <button type="submit">Add Product</button>
          </form>
        </div>
      </div>
    )
  );
}

export default Popup;
