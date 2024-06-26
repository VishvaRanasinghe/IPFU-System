import React, { useState, useEffect } from "react";
import axios from "axios";
import "./editPopup.css";
import { toast } from "react-toastify";

function EditPopup({ showPopup, handleClosePopup, managerId }) {
  const [formData, setFormData] = useState({
    email: "",
    firstName: "",
    lastName: "",
    phone: "",
  });

  useEffect(() => {
    // Fetch manager data based on managerId when component mounts
    axios
      .get(`http://localhost:3000/manager/${managerId}`)
      .then((response) => {
        const managerData = response.data.manager;
        setFormData({
          email: managerData.email,
          firstName: managerData.firstName,
          lastName: managerData.lastName,
          phone: managerData.phone,
        });
      })
      .catch((error) => {
        console.error("Error fetching manager data:", error);
      });
  }, [managerId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .put(`http://localhost:3000/manager/update/${managerId}`, formData)
      .then((response) => {
        console.log(response.data.message); // Manager updated successfully
        toast.success("Manager updated successfully!");
        handleClosePopup();
        window.location.reload(); // Refresh the page
      })
      .catch((error) => {
        console.error("Error updating manager:", error);
      });
  };

  return (
    showPopup && (
      <div className="popup">
        <div className="popup-content">
          <span className="close" onClick={handleClosePopup}>
            &times;
          </span>
          <h2>Edit Manager</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="email">Email:</label>
              <input
                type="text"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="firstName">First Name:</label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="lastName">Last Name:</label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="phone">Phone:</label>
              <input
                type="text"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
              />
            </div>
            <button type="submit">Update Manager</button>
          </form>
        </div>
      </div>
    )
  );
}

export default EditPopup;
