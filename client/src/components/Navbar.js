import React, { useState } from "react";
import { FaHandHoldingHeart } from "react-icons/fa6";

const Navbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <nav className="bg-green-500 border-slate-100 dark:bg-gray-900 top-0 left-0 sticky">
      <div className="max-w-screen-2xl flex flex-wrap text-white items-center justify-between mx-auto p-3">
        <a
          href="/donor-donate-products"
          className="flex items-center space-x-3 rtl:space-x-reverse"
        >
          <FaHandHoldingHeart className="w-5 h-5 ml-5" />
          <span className="font-semibold text-xl tracking-tight">
            I Paid for You
          </span>
        </a>
        <div className="flex items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse mr-5 relative">
          <button
            type="button"
            onClick={toggleDropdown}
            className="flex text-sm bg-gray-800 rounded-full md:me-0 focus:ring-4 focus:ring-white dark:focus:ring-gray-600"
          >
            <span className="sr-only">Open user menu</span>
            <img
              className="w-8 h-8 rounded-full"
              src="/docs/images/people/profile-picture-3.jpg"
              alt="user photo"
            />
          </button>
          {/* Dropdown menu */}
          {isDropdownOpen && (
            <div className="absolute top-full right-0 mt-1 w-48 bg-white border border-gray-200 rounded shadow-lg z-30">
              <a
                href="/shop-product-offerings"
                className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
              >
                Shop
              </a>
              <a
                href="/donor-donate-products"
                className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
              >
                Donor
              </a>
              <a
                href="/recipient-browse-products"
                className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
              >
                Recipient
              </a>
              <a
                href="manager-dashboard"
                className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
              >
                IPFU Manager
              </a>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
