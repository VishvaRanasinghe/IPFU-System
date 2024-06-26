import React, { useState } from "react";
import axios from "axios";
import "./Popup.css";
import { toast } from "react-toastify";

function Popup({ showPopup, handleClosePopup }) {
  const [formData, setFormData] = useState({
    email: "",
    firstName: "",
    lastName: "",
    phone: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));

    // Clear errors when user starts typing again
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "",
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let errors = {};

    if (!formData.email) {
      errors.email = "Email is required";
    } else if (!isValidEmail(formData.email)) {
      errors.email = "Invalid email address";
    }

    if (!formData.firstName) {
      errors.firstName = "First Name is required";
    }

    if (!formData.lastName) {
      errors.lastName = "Last Name is required";
    }

    if (!formData.phone) {
      errors.phone = "Phone is required";
    } else if (!isValidPhone(formData.phone)) {
      errors.phone = "Invalid phone number";
    }

    if (Object.keys(errors).length > 0) {
      setErrors(errors);
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:3000/manager/add",
        formData
      );

      console.log(response.data.message);
      toast.success("Manager added successfully!");
      handleClosePopup();
      window.location.reload(); // Not ideal, consider other ways to update UI
    } catch (error) {
      console.error("Error adding manager:", error);
      toast.error("Error adding manager");
    }
  };

  // Email validation function
  const isValidEmail = (email) => {
    // This regex pattern is a basic one, consider using a more comprehensive one
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  };

  // Phone validation function
  const isValidPhone = (phone) => {
    // This regex pattern is a basic one, consider using a more comprehensive one
    const phonePattern = /^\d{10}$/;
    return phonePattern.test(phone);
  };

  return (
    showPopup && (
      <div className="popup">
        <div className="popup-content">
          <span className="close" onClick={handleClosePopup}>
            &times;
          </span>
          <h2>Add New Manager</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="first_name">First Name:</label>
              <input
                type="text"
                id="first_name"
                name="first_name"
                value={formData.first_name}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="last_name">Last Name:</label>
              <input
                type="text"
                id="last_name"
                name="last_name"
                value={formData.last_name}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="phone">Phone:</label>
              <input
                type="tel" // Use type="tel" for phone input
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                pattern="[0-9]{0,10}" // Set pattern attribute for numeric input
                maxLength={10} // Set maxLength to enforce max length
              />
            </div>
            <button type="submit">Add Manager</button>
          </form>
        </div>
      </div>
    )
  );
}

export default Popup;
