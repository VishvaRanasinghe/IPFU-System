import React, { useState, useEffect, useRef } from "react";
import { FiPrinter } from "react-icons/fi";
import axios from "axios";
import jsPDF from "jspdf";

export default function ShopDonations() {
  const [error, setError] = useState(null); // State for error handling

  const [filteredProducts, setFilteredProducts] = useState([]); // State to hold filtered products
  const [searchTerm, setSearchTerm] = useState("");

  const [suspendedProducts, setSuspendedProducts] = useState([]);

  //fetching all products
  useEffect(() => {
    const fetchSuspendedProducts = async () => {
      try {
        const response = await axios.get("http://localhost:3000/susproducts/");
        setSuspendedProducts(response.data.suspendedProducts);
        setFilteredProducts(response.data.suspendedProducts);
      } catch (error) {
        console.error(error);
      }
    };

    fetchSuspendedProducts();
  }, []);

  // Function to generate and download the report
  const generateReport = () => {
    const doc = new jsPDF();
    let y = 10;

    filteredProducts.forEach((product) => {
      const decisionLines = doc.splitTextToSize(
        `Products: ${product.filteredProducts}`,
        180
      );
      const linesCount = decisionLines.length;
      const lineHeight = 7;

      // Check remaining space on the page
      const pageHeight = doc.internal.pageSize.height;
      if (y + lineHeight * (linesCount + 4) > pageHeight) {
        doc.addPage();
        y = 10; // Reset y position for the new page
      }

      doc.text(`Doner Name:${product.donor.donorInfo.firstName} `, 10, y);
      doc.text(`Email: ${product.donor.email}`, 10, y + lineHeight);
      doc.text(`Product Name: ${product.donor.email}`, 10, y + lineHeight * 2);
      doc.text(
        `Quantity: ${product.suspendedProductQuantity}`,
        10,
        y + lineHeight * 3
      );
      doc.text(
        `Date: ${new Date(product.dateTime).toLocaleDateString()}`,
        10,
        y + lineHeight * 6
      );

      if (linesCount > 1) {
        for (let i = 1; i < linesCount; i++) {
          doc.text(decisionLines[i], 10, y + lineHeight * (i + 3));
        }
      }

      y += lineHeight * (linesCount + 4);
      // Add some space between decision entries
      y += 10;
    });

    doc.save("donation_report.pdf");
  };

  //Function to handle search
  const handleSearch = (query) => {
    setSearchTerm(query); // Update search term
    if (query === "") {
      // If the search query is empty, display all products
      setFilteredProducts(suspendedProducts);
    } else {
      // Filter products based on the search query
      const filtered = suspendedProducts.filter(
        (product) =>
          product.donor.donorInfo.firstName
            .toLowerCase()
            .includes(query.toLowerCase()) ||
          product.donor.donorInfo.lastName
            .toLowerCase()
            .includes(query.toLowerCase()) ||
          product.product.name.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredProducts(filtered);
    }
  };

  // Search input change handler
  const handleChange = (event) => {
    handleSearch(event.target.value);
  };

  return (
    <div className=" mt-4">
      <div className="">
        <div className="bg-slate-100  px-4 pt-3 mb-16 pb-4 ">
          <h1 className="text-lg font-semibold mb-4 text-left">Donations</h1>
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
                onClick={generateReport}
                className="py-1 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600 flex items-center ml-2"
              >
                <FiPrinter className="inline-block w-4 h-4 mr-1" />
                <span class="hidden sm:inline">Print</span>
              </button>
            </div>

            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    Donor Name
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Donor Email
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Product Name
                  </th>
                  <th scope="col" className="px-6 py-3">
                    qty
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Donation Date
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
                      {product.donor
                        ? product.donor.donorInfo.firstName +
                          product.donor.donorInfo.lastName
                        : "-"}
                    </td>

                    <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                      {product.donor ? product.donor.email : "-"}
                    </td>
                    <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                      {product.product ? product.product.name : "-"}
                    </td>
                    <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                      {product.suspendedProductQuantity}
                    </td>
                    <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                      {new Date(product.dateTime).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
