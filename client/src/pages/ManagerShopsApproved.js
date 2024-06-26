import React, { useState, useEffect, useRef } from "react";
import { FiPrinter } from "react-icons/fi";
import axios from "axios";
import { toast } from "react-toastify";
import { useReactToPrint } from "react-to-print";

import Popup from "../components/smAddPopup/Popup";
import EditPopup from "../components/smEditPopup/editPopup";
import PrintComponent from "../components/PrintComponent";

export default function ManagerShopsApproved() {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null); // State for error handling
  const [showAddPopup, setShowAddPopup] = useState(false); // State for controlling add popup visibility
  const [showEditPopup, setShowEditPopup] = useState(false); // State for controlling edit popup visibility
  const [editPopupProductId, setEditPopupProductId] = useState(null); // State to store the id of the product being edited
  const [filteredProducts, setFilteredProducts] = useState([]); // State to hold filtered products
  const [searchTerm, setSearchTerm] = useState("");

  //fetching all products
  useEffect(() => {
    axios
      .get("http://localhost:3000/products")
      .then((response) => {
        setProducts(response.data.products);
        setFilteredProducts(response.data.products); // Initialize filteredProducts with all products (for search func to display products when not searching)
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
        setError(error.message); // Set error state
      });
  }, []);

  //delete product
  const handleDeleteProduct = (productId) => {
    axios
      .delete(`http://localhost:3000/products/delete/${productId}`)
      .then((response) => {
        console.log(response.data.message); // Product deleted successfully
        // Remove the deleted product from the state
        setProducts(products.filter((product) => product._id !== productId));
        toast.success("Product deleted successfully!");
        window.location.reload();
      })
      .catch((error) => {
        console.error("Error deleting product:", error);
      });
  };

  //Function to handle Print
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  //Function to handle search
  const handleSearch = (query) => {
    setSearchTerm(query); // Update search term
    if (query === "") {
      // If the search query is empty, display all products
      setFilteredProducts(products);
    } else {
      // Filter products based on the search query
      const filtered = products.filter(
        (product) =>
          product.name.toLowerCase().includes(query.toLowerCase()) ||
          product.code.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredProducts(filtered);
    }
  };

  // Search input change handler
  const handleChange = (event) => {
    handleSearch(event.target.value);
  };

  // Function to handle opening add popup
  const handleOpenAddPopup = () => {
    setShowAddPopup(true);
  };

  // Function to handle closing add popup
  const handleCloseAddPopup = () => {
    setShowAddPopup(false);
  };

  // Function to handle opening edit popup
  const handleOpenEditPopup = (productId) => {
    setEditPopupProductId(productId);
    setShowEditPopup(true);
  };

  // Function to handle closing edit popup
  const handleCloseEditPopup = () => {
    setShowEditPopup(false);
  };

  return (
    <div className=" mt-4">
      <div className="">
        <div className="bg-slate-100  px-4 pt-3 mb-16 pb-4">
          <h1 className="text-lg font-semibold mb-4 text-left">
            Approved Shops
          </h1>
          <div className=" shadow-md sm:rounded-lg">
            <div className="flex flex-row items-center justify-end pb-4">
              <label htmlFor="table-search" className="sr-only">
                Search
              </label>
              <div className="relative flex items-center justify-end">
                <div className="absolute inset-y-0 right-0 rtl:inset-r-0 rtl:left-0 flex items-center pr-3 pointer-events-none">
                  <svg
                    className="w-5 h-5 text-gray-500 dark:text-gray-400"
                    aria-hidden="true"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <input
                  type="text"
                  id="table-search"
                  className="block p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-40 sm:w-60 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Search"
                  value={searchTerm}
                  onChange={handleChange}
                />
              </div>
              {/* Print Button */}
              <button
                onClick={handlePrint}
                className="py-1 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600 flex items-center ml-2"
              >
                <FiPrinter className="inline-block w-4 h-4 mr-1" />
                <span class="hidden sm:inline">Print</span>
              </button>
              {/* Add New Shop Button */}
              <button
                onClick={handleOpenAddPopup}
                className="py-1 px-4 bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none focus:bg-green-600 flex items-center ml-2"
              >
                Add New Shop
              </button>
            </div>

            <div style={{ display: "none" }}>
              <div ref={componentRef}>
                <PrintComponent products={filteredProducts} />
              </div>
            </div>
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    Email
                  </th>
                  <th scope="col" className="px-6 py-3">
                    <span className="sr-only">Image</span>
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Shop Name
                  </th>
                  <th scope="col" className="px-6 py-3">
                    City
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Contact No
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredProducts.map((product) => (
                  <tr
                    key={product._id}
                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                  >
                    <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                      {product.code}{" "}
                    </td>
                    <td className="p-4">
                      <img
                        src={`http://localhost:3000/${product.image}`}
                        alt={product.name}
                        className="h-16 w-17"
                      />
                    </td>
                    <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                      {product.name}{" "}
                    </td>
                    <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                      {product.quantity}
                    </td>
                    <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                      LKR {product.price}
                    </td>
                    <td className="px-6 py-4">
                      <a
                        onClick={() => handleOpenEditPopup(product._id)}
                        className="cursor-pointer font-medium text-blue-600 dark:text-red-500 hover:underline"
                      >
                        Edit
                      </a>
                      <span className="mx-2 text-gray-400 dark:text-gray-600">
                        |
                      </span>
                      <a
                        onClick={() => handleDeleteProduct(product._id)}
                        className="cursor-pointer font-medium text-red-600 dark:text-red-500 hover:underline"
                      >
                        Remove
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      {/* Popup for adding new product */}
      <Popup showPopup={showAddPopup} handleClosePopup={handleCloseAddPopup} />
      {/* Popup for editing product */}
      <EditPopup
        showPopup={showEditPopup}
        handleClosePopup={handleCloseEditPopup}
        productId={editPopupProductId}
      />
    </div>
  );
}
