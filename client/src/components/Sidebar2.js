import React from "react";
import { LuHistory } from "react-icons/lu";
import { LiaDonateSolid } from "react-icons/lia";
import {
  MdOutlineFeedback,
  MdOutlineFavoriteBorder,
  MdOutlineEvent,
} from "react-icons/md";
import { IoFastFoodOutline } from "react-icons/io5";
import {
  HiOutlineCog,
  HiOutlineHome,
  HiOutlineLightBulb,
} from "react-icons/hi";

const DonateSubTabs = () => {
  return (
    <ul className="mt-2 pl-6 space-y-2">
      <li>
        <a
          href="/donor-donate-products"
          className="flex items-center py-2 px-4 rounded-md text-gray-700 hover:bg-gray-100"
        >
          <IoFastFoodOutline className="w-5 h-5 mr-1" />
          Products
        </a>
      </li>
      <li>
        <a
          href="/donor-donate-programs"
          className="flex items-center py-2 px-4 rounded-md text-gray-700 hover:bg-gray-100"
        >
          <MdOutlineEvent className="w-5 h-5 mr-1" />
          Programs
        </a>
      </li>
    </ul>
  );
};

const Sidebar2 = () => {
  return (
    <div className="bg-white text-gray-700 w-64 h-screen px-6 py-4 fixed overflow-y-auto">
      <nav>
        <ul className="space-y-2">
          <li>
            <a
              href="/donor-dashboard"
              className="flex items-center py-2 px-4 rounded-md text-gray-700 hover:bg-gray-100"
            >
              <HiOutlineHome className="w-5 h-5 mr-2" />
              Dashboard
            </a>
          </li>
          <li>
            <a
              className="flex items-center py-2 px-4 rounded-md text-gray-700 hover:bg-gray-100"
              aria-haspopup="true"
              aria-expanded="false"
            >
              <LiaDonateSolid className="w-5 h-5 mr-2" />
              Donate
            </a>
            <ul className="mt-2 pl-5 space-y-2">
              <DonateSubTabs />
            </ul>
          </li>
          <li>
            <a
              href="/donor-donation-history"
              className="flex items-center py-2 px-4 rounded-md text-gray-700 hover:bg-gray-100"
            >
              <LuHistory className="w-5 h-5 mr-2" />
              Donation History
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

export default Sidebar2;
