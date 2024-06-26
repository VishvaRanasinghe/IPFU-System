import React from "react";
import { LuHistory } from "react-icons/lu";
import { IoFastFoodOutline } from "react-icons/io5";
import {
  MdOutlineFavoriteBorder,
  MdOutlineFeedback,
  MdOutlineBookmarks,
  MdOutlineEvent,
} from "react-icons/md";
import {
  HiOutlineCog,
  HiOutlineHome,
  HiOutlineLightBulb,
} from "react-icons/hi";

const SettingsSubTabs = () => {
  return (
    <ul className="mt-2 pl-6 space-y-2">
      <li>
        <a
          href="/recipient-profile"
          className="flex items-center py-2 px-4 rounded-md text-gray-700 hover:bg-gray-100"
        >
          <IoFastFoodOutline className="w-5 h-5 mr-1" />
          Edit Profile
        </a>
      </li>
      <li>
        <a
          href="/recipient-edit-password"
          className="flex items-center py-2 px-4 rounded-md text-gray-700 hover:bg-gray-100"
        >
          <MdOutlineEvent className="w-5 h-5 mr-1" />
          Password
        </a>
      </li>
    </ul>
  );
};

const Sidebar3 = () => {
  return (
    <div className="bg-white text-gray-700 w-64 px-6 py-4 fixed h-screen overflow-y-auto">
      <nav>
        <ul className="space-y-2">
          <li>
            <a
              href="#"
              className="flex items-center py-2 px-4 rounded-md text-gray-700 hover:bg-gray-100"
            >
              <HiOutlineHome className="w-5 h-5 mr-2" />
              Dashboard
            </a>
          </li>
          <li>
            <a
              href="/recipient-browse-products"
              className="flex items-center py-2 px-4 rounded-md text-gray-700 hover:bg-gray-100"
            >
              <IoFastFoodOutline className="w-5 h-5 mr-2" />
              Browse Products
            </a>
          </li>
          <li>
            <a
              href="#"
              className="flex items-center py-2 px-4 rounded-md text-gray-700 hover:bg-gray-100"
            >
              <MdOutlineBookmarks className="w-5 h-5 mr-2" />
              Reservations
            </a>
          </li>
          <li>
            <a
              href="#"
              className="flex items-center py-2 px-4 rounded-md text-gray-700 hover:bg-gray-100"
            >
              <LuHistory className="w-5 h-5 mr-2" />
              Redemption History
            </a>
          </li>
          <li>
            <a
              href="#"
              className="flex items-center py-2 px-4 rounded-md text-gray-700 hover:bg-gray-100"
            >
              <HiOutlineCog className="w-5 h-5 mr-2" />
              Settings
            </a>
            <ul className="mt-2 pl-5 space-y-2">
              <SettingsSubTabs />
            </ul>
          </li>
          <li>
            <a
              href="#"
              className="flex items-center py-2 px-4 rounded-md text-gray-700 hover:bg-gray-100"
            >
              <HiOutlineLightBulb className="w-5 h-5 mr-2" />
              Support
            </a>
          </li>
          <li>
            <a
              href="#"
              className="flex items-center py-2 px-4 rounded-md text-gray-700 hover:bg-gray-100"
            >
              <MdOutlineFeedback className="w-5 h-5 mr-2" />
              Feedback
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar3;
