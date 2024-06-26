import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import jsPDF from "jspdf";

import Popup from "../components/ManagerAddPopup/Popup";
import EditPopup from "../components/ManagerEditPopup/editPopup";
import { FiPrinter } from "react-icons/fi";

export default function ManagerUsersManagers() {
  const [managers, setManagers] = useState([]);
  const [filteredManagers, setFilteredManagers] = useState([]);
  const [error, setError] = useState(null);
  const [showAddPopup, setShowAddPopup] = useState(false);
  const [showEditPopup, setShowEditPopup] = useState(false);
  const [editPopupManagerId, setEditPopupManagerId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:3000/manager")
      .then((response) => {
        setManagers(response.data.managers);
        setFilteredManagers(response.data.managers);
      })
      .catch((error) => {
        console.error("Error fetching managers:", error);
        setError(error.message);
      });
  }, []);

  useEffect(() => {
    // Filter managers based on searchTerm
    const filtered = managers.filter(
      (manager) =>
        manager.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        manager.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        manager.email.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredManagers(filtered);
  }, [searchTerm, managers]);

  const handleDeleteManager = (managerId) => {
    axios
      .delete(`http://localhost:3000/manager/delete/${managerId}`)
      .then((response) => {
        console.log(response.data.message);
        setManagers(managers.filter((manager) => manager._id !== managerId));
        setFilteredManagers(
          filteredManagers.filter((manager) => manager._id !== managerId)
        );
        toast.success("Manager deleted successfully!");
      })
      .catch((error) => {
        console.error("Error deleting manager:", error);
        toast.error("Error deleting manager");
      });
  };

  const handleOpenAddPopup = () => {
    setShowAddPopup(true);
  };

  const handleCloseAddPopup = () => {
    setShowAddPopup(false);
  };

  const handleOpenEditPopup = (managerId) => {
    setEditPopupManagerId(managerId);
    setShowEditPopup(true);
  };

  const handleCloseEditPopup = () => {
    setShowEditPopup(false);
  };

  const handlePrint = () => {
    const doc = new jsPDF();
    doc.text("Manager Details", 10, 10);
    let y = 20;
    filteredManagers.forEach((manager) => {
      doc.text(`Email: ${manager.email}`, 10, y);
      doc.text(`First Name: ${manager.firstName}`, 10, y + 10);
      doc.text(`Last Name: ${manager.lastName}`, 10, y + 20);
      doc.text(`Phone: ${manager.phone}`, 10, y + 30);
      y += 40;
    });
    doc.save("manager_details.pdf");
  };

  return (
    <div className=" mt-4">
      <div className="">
        <div className="bg-slate-100  px-4 pt-3 mb-16 pb-4 ">
          <h1 className="text-lg font-semibold mb-4 text-left">Managers</h1>
          <div className=" shadow-md sm:rounded-lg">
            <div className="flex flex-row items-center justify-end pb-4">
              <input
                type="text"
                id="table-search"
                className="block p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-40 sm:w-60 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Search by Name, Email, or Last Name"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <button
                onClick={handlePrint}
                className="py-1 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600 flex items-center ml-2"
              >
                <FiPrinter className="inline-block w-4 h-4 mr-1" />
                <span className="hidden sm:inline">Print</span>
              </button>
              <button
                onClick={handleOpenAddPopup}
                className="py-1 px-4 bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none focus:bg-green-600 flex items-center ml-2"
              >
                Add New Manager
              </button>
            </div>

            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    Email
                  </th>
                  <th scope="col" className="px-6 py-3">
                    First Name
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Last Name
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
                {filteredManagers.map((manager) => (
                  <tr
                    key={manager._id}
                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                  >
                    <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                      {manager.email}
                    </td>
                    <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                      {manager.firstName}
                    </td>
                    <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                      {manager.lastName}
                    </td>
                    <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                      {manager.phone}
                    </td>
                    <td className="px-6 py-4">
                      <a
                        onClick={() => handleOpenEditPopup(manager._id)}
                        className="cursor-pointer font-medium text-blue-600 dark:text-red-500 hover:underline"
                      >
                        Edit
                      </a>
                      <span className="mx-2 text-gray-400 dark:text-gray-600">
                        |
                      </span>
                      <a
                        onClick={() => handleDeleteManager(manager._id)}
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
      <Popup showPopup={showAddPopup} handleClosePopup={handleCloseAddPopup} />
      <EditPopup
        showPopup={showEditPopup}
        handleClosePopup={handleCloseEditPopup}
        managerId={editPopupManagerId}
      />
    </div>
  );
}
