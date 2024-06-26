import React from "react";
import { TbDeviceAnalytics } from "react-icons/tb";
import { FaUsers } from "react-icons/fa6";
import {
  MdRedeem,
  MdOutlineInventory2,
  MdOutlineFeedback,
  MdOutlineManageAccounts,
  MdOutlineEvent,
} from "react-icons/md";
import { LiaDonateSolid } from "react-icons/lia";
import { IoFastFoodOutline } from "react-icons/io5";
import { AiOutlineShop } from "react-icons/ai";
import { RiUserReceivedLine, RiUserSharedLine } from "react-icons/ri";
import {
  HiOutlineCog,
  HiOutlineHome,
  HiOutlineLightBulb,
} from "react-icons/hi";
import { TbShoppingBagCheck, TbShoppingBagExclamation } from "react-icons/tb";

const UserSubTabs = () => {
  return (
    <ul className="mt-2 pl-6 space-y-2">
      <li>
        <a
          href="/manager-users-donors"
          className="flex items-center py-2 px-4 rounded-md text-gray-700 hover:bg-gray-100"
        >
          <RiUserSharedLine className="w-5 h-5 mr-1" />
          Donors
        </a>
      </li>
      <li>
        <a
          href="/manager-users-recipients"
          className="flex items-center py-2 px-4 rounded-md text-gray-700 hover:bg-gray-100"
        >
          <RiUserReceivedLine className="w-5 h-5 mr-1" />
          Recipients
        </a>
      </li>
      <li>
        <a
          href="/manager-users-managers"
          className="flex items-center py-2 px-4 rounded-md text-gray-700 hover:bg-gray-100"
        >
          <MdOutlineManageAccounts className="w-5 h-5 mr-1" />
          Managers
        </a>
      </li>
    </ul>
  );
};

const ShopSubTabs = () => {
  return (
    <ul className="mt-2 pl-6 space-y-2">
      <li>
        <a
          href="/manager-shops-requests"
          className="flex items-center py-2 px-4 rounded-md text-gray-700 hover:bg-gray-100"
        >
          <TbShoppingBagExclamation className="w-5 h-5 mr-1" />
          Requests
        </a>
      </li>
      <li>
        <a
          href="/manager-shops-approved"
          className="flex items-center py-2 px-4 rounded-md text-gray-700 hover:bg-gray-100"
        >
          <TbShoppingBagCheck className="w-5 h-5 mr-1" />
          Approved
        </a>
      </li>
    </ul>
  );
};

const DonationSubTabs = () => {
  return (
    <ul className="mt-2 pl-6 space-y-2">
      <li>
        <a
          href="/manager-shops-requests"
          className="flex items-center py-2 px-4 rounded-md text-gray-700 hover:bg-gray-100"
        >
          <IoFastFoodOutline className="w-5 h-5 mr-1" />
          Products
        </a>
      </li>
      <li>
        <a
          href="/manager-donations-programs"
          className="flex items-center py-2 px-4 rounded-md text-gray-700 hover:bg-gray-100"
        >
          <MdOutlineEvent className="w-5 h-5 mr-1" />
          Programs
        </a>
      </li>
    </ul>
  );
};

const Sidebar4 = () => {
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
              className="flex items-center py-2 px-4 rounded-md text-gray-700 hover:bg-gray-100"
              aria-haspopup="true"
              aria-expanded="false"
            >
              <FaUsers className="w-5 h-5 mr-2" />
              Users
            </a>
            <ul className="mt-2 pl-5 space-y-2">
              <UserSubTabs />
            </ul>
          </li>
          <li>
            <a
              className="flex items-center py-2 px-4 rounded-md text-gray-700 hover:bg-gray-100"
              aria-haspopup="true"
              aria-expanded="false"
            >
              <AiOutlineShop className="w-5 h-5 mr-2" />
              Shops
            </a>
            <ul className="mt-2 pl-5 space-y-2">
              <ShopSubTabs />
            </ul>
          </li>
          <li>
            <a
              href="#"
              className="flex items-center py-2 px-4 rounded-md text-gray-700 hover:bg-gray-100"
            >
              <MdOutlineInventory2 className="w-5 h-5 mr-2" />
              Products
            </a>
          </li>
          <li>
            <a
              className="flex items-center py-2 px-4 rounded-md text-gray-700 hover:bg-gray-100"
              aria-haspopup="true"
              aria-expanded="false"
            >
              <LiaDonateSolid className="w-5 h-5 mr-2" />
              Donations
            </a>
            <ul className="mt-2 pl-5 space-y-2">
              <DonationSubTabs />
            </ul>
          </li>
          <li>
            <a
              href="#"
              className="flex items-center py-2 px-4 rounded-md text-gray-700 hover:bg-gray-100"
            >
              <MdRedeem className="w-5 h-5 mr-2" />
              Redemptions
            </a>
          </li>
          <li>
            <a
              href="/manager-decision-analytics"
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

export default Sidebar4;
