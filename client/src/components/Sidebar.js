import React from "react";
import { TbDeviceAnalytics } from "react-icons/tb";
import { LiaDonateSolid } from "react-icons/lia";
import {
  MdOutlineFeedback,
  MdOutlineInventory2,
  MdRedeem,
} from "react-icons/md";
import { IoFastFoodOutline } from "react-icons/io5";
import {
  HiOutlineCog,
  HiOutlineHome,
  HiOutlineLightBulb,
} from "react-icons/hi";

const Sidebar = () => {
  return (
    <div className="bg-white text-gray-700 w-64 h-screen px-6 py-4 fixed overflow-y-auto">
      <nav>
        <ul className="space-y-2">
          <li>
            <a
              href="/shop-dashboard"
              className="flex items-center py-2 px-4 rounded-md text-gray-700 hover:bg-gray-100"
            >
              <HiOutlineHome className="w-5 h-5 mr-2" />
              Dashboard
            </a>
          </li>
          <li>
            <a
              href="/shop-product-offerings"
              className="flex items-center py-2 px-4 rounded-md text-gray-700 hover:bg-gray-100"
            >
              <IoFastFoodOutline className="w-5 h-5 mr-2" />
              Product Offerings
            </a>
          </li>
          <li>
            <a
              href="/shop-donations"
              className="flex items-center py-2 px-4 rounded-md text-gray-700 hover:bg-gray-100"
            >
              <LiaDonateSolid className="w-5 h-5 mr-2" />
              Donations
            </a>
          </li>
          <li>
            <a
              href="/shop-redemptions"
              className="flex items-center py-2 px-4 rounded-md text-gray-700 hover:bg-gray-100"
            >
              <MdRedeem className="w-5 h-5 mr-2" />
              Redemptions
            </a>
          </li>
          <li>
            <a
              href="/shop-decision"
              className="flex items-center py-2 px-4 rounded-md text-gray-700 hover:bg-gray-100"
            >
              <TbDeviceAnalytics className="w-5 h-5 mr-2" />
              Decision Analytics
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

export default Sidebar;
