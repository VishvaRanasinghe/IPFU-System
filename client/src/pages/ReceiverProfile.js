import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useReceiverData from "../components/getReceiverDetails";

export default function ReceiverProfile() {
  const receiverId = "6635ca358119c9e8c1f79bef"; // Specify the receiver ID
  const { receiverDetails, error } = useReceiverData(receiverId);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  // Initialize form inputs with receiverDetails data once loaded
  useEffect(() => {
    if (receiverDetails) {
      setFirstName(receiverDetails.fname);
      setLastName(receiverDetails.lname);
      setEmail(receiverDetails.email);
      setPhone(receiverDetails.phone);
    }
  }, [receiverDetails]);

  // Function to handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();

    // Create an object with updated receiver data
    const updatedReceiver = {
      fname: firstName,
      lname: lastName,
      email: email,
      phone: phone,
    };

    try {
      // Make an HTTP PUT request to the backend to update the receiver data
      const response = await axios.put(
        `http://localhost:3000/receiver/update/${receiverId}`,
        updatedReceiver
      );
      console.log("Receiver updated successfully:", response.data);
      toast.success("Profile updated successfully!");
    } catch (err) {
      console.error("Error updating receiver:", err);
      toast.err("Failed to update profile.");
      // Optionally, handle the error, e.g. show an error message
    }
  };

  // Function to handle changes in the first name input field
  const handleFirstNameChange = (e) => {
    const inputValue = e.target.value;
    const sanitizedValue = inputValue.replace(/[^a-zA-Z\s]/g, ""); // Remove numbers and special characters
    setFirstName(sanitizedValue); // Update state with sanitized value
  };

  // Function to handle changes in the last name input field
  const handleLastNameChange = (e) => {
    const inputValue = e.target.value;
    const sanitizedValue = inputValue.replace(/[^a-zA-Z\s]/g, ""); // Remove numbers and special characters
    setLastName(sanitizedValue); // Update state with sanitized value
  };

  const handlePhoneChange = (e) => {
    const inputValue = e.target.value;
    const sanitizedValue = inputValue.replace(/\D/g, ""); // Remove non-numeric characters
    setPhone(sanitizedValue); // Update state with sanitized value
  };

  return (
    <div className="flex justify-center items-center p-12 py-18 border-none w-auto mx-9 rounded-md my-16 shadow-lg h-auto">
      <div className="edit-profile-container w-full">
        <div className="relative">
          <h1 className="text-2xl font-bold my-5 ml-3">
            {" "}
            Edit Profile <span className="profile-underline"></span>
          </h1>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-6 p-3 mx-3">
            <div>
              <label className="text-xl">First Name</label>
              <br />
              <input
                type="text"
                value={firstName}
                onChange={handleFirstNameChange}
                placeholder={receiverDetails.fname}
                className="p-2 rounded-md border border-green-200 mt-1 w-72 shadow-md"
                required
              />
            </div>
            <div>
              <label className="text-xl">Last Name</label>
              <br />
              <input
                type="text"
                value={lastName}
                onChange={handleLastNameChange}
                placeholder={receiverDetails.lname}
                className="p-2 rounded-md border border-green-200 mt-1 w-72 shadow-md"
                required
              />
            </div>
            <div>
              <label className="text-xl">Email</label>
              <br />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={receiverDetails.email}
                className="p-2 rounded-md border border-green-200 mt-1 w-72 shadow-md"
                required
              />
            </div>
            <div>
              <label className="text-xl">Mobile</label>
              <br />
              <input
                type="tel"
                value={phone}
                onChange={handlePhoneChange}
                placeholder={receiverDetails.phone}
                className="p-2 rounded-md border border-green-200 mt-1 w-72 shadow-md"
                required
              />
            </div>
          </div>
          <div className="flex justify-center mr-16">
            <button
              type="submit"
              className="w-72 mt-8 p-2 bg-green-500 text-xl font-medium rounded-md hover:w-44 duration-500 ease-in shadow-md"
            >
              Edit Profile
            </button>
          </div>
        </form>
      </div>
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={true}
        pauseOnHover={true}
        draggable={true}
        pauseOnFocusLoss={true}
        theme="light"
      />
    </div>
  );
}
