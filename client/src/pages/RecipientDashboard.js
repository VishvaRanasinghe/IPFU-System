import React from "react";
import { BsCurrencyDollar, BsBoxSeam } from "react-icons/bs";
import { MdOutlineSupervisorAccount } from "react-icons/md";
import { FiBarChart } from "react-icons/fi";
import { HiOutlineRefresh } from "react-icons/hi";

export default function RecipientDashboard() {
  const earningData = [
    {
      icon: <MdOutlineSupervisorAccount />,
      amount: "1,354",
      title: "Donors",
      iconColor: "#03C9D7",
      iconBg: "#E5FAFB",
      pcColor: "red-600",
    },
    {
      icon: <BsBoxSeam />,
      amount: "4,396",
      title: "Suspended Products",
      iconColor: "rgb(255, 244, 229)",
      iconBg: "rgb(254, 201, 15)",
      pcColor: "green-600",
    },
    {
      icon: <FiBarChart />,
      amount: "3,339",
      title: "Product Receivers",
      iconColor: "rgb(228, 106, 118)",
      iconBg: "rgb(255, 244, 229)",

      pcColor: "green-600",
    },
    {
      icon: <HiOutlineRefresh />,
      amount: "LKR 80,354",
      title: "Donation Programs",
      iconColor: "rgb(0, 194, 146)",
      iconBg: "rgb(235, 250, 242)",
      pcColor: "red-600",
    },
  ];
  const recentClaims = [
    {
      code: "123",
      productName: "delum juice",
      status: "Delivered",
      date: "11/11/24",
    },
    {
      code: "124",
      productName: "Apple Juice",
      status: "Pending",
      date: "11/11/24",
    },
  ];

  return (
    <div className="container mx-auto bg-slate-100">
      <section className="py-8">
        <div className="mt-24">
          <div className="flex flex-wrap lg:flex-nowrap justify-center">
            <div className="bg-white dark:text-gray-200 dark:bg-secondary-dark-bg h-44 rounded-xl w-full lg:w-80 p-8 pt-9 m-3 bg-hero-pattern bg-no-repeat bg-cover bg-center">
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-bold text-gray-400">Donations</p>
                  <p className="text-2xl">LKR 375,460.65</p>
                </div>
                <button
                  type="button"
                  className="bg-green-500 text-2xl opacity-0.9 text-white hover:drop-shadow-xl rounded-full  p-4"
                >
                  <BsCurrencyDollar />
                </button>
              </div>
              <div className="mt-6">
                <button
                  type="button"
                  className="bg-green-500 text-md opacity-0.9 text-white hover:drop-shadow-xl rounded-full px-3 py-2"
                >
                  Download
                </button>
              </div>
            </div>
            <div className="flex m-3 flex-wrap justify-center gap-6 items-center">
              {earningData.map((item) => (
                <div
                  key={item.title}
                  className="bg-white h-44 dark:text-gray-200 dark:bg-secondary-dark-bg md:w-48  p-6 pt-9 rounded-2xl "
                >
                  <button
                    type="button"
                    style={{
                      color: item.iconColor,
                      backgroundColor: item.iconBg,
                    }}
                    className="text-2xl opacity-0.9 rounded-full  p-4 hover:drop-shadow-xl"
                  >
                    {item.icon}
                  </button>
                  <p className="mt-3">
                    <span className="text-lg font-semibold">{item.amount}</span>
                    <span className={`text-sm text-${item.pcColor} ml-2`}>
                      {item.percentage}
                    </span>
                  </p>
                  <p className="text-sm text-gray-400  mt-1">{item.title}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      <section className="py-8">
        <div className="p-10">
          <h1 className="text-3xl font-bold my-4 text-left">
            Recent Redemptions
          </h1>

          {recentClaims.length === 0 ? (
            <p className="text-gray-500 ">No recent claims</p>
          ) : (
            <>
              <div className="overflow-x-auto">
                <table className="w-full table-auto">
                  <thead className="bg-gray-200">
                    <tr>
                      <th className="px-4 py-2 text-sm font-semibold text-center">
                        Code
                      </th>
                      <th className="px-4 py-2 text-sm font-semibold text-center">
                        Product Name
                      </th>
                      <th className="px-4 py-2 text-sm font-semibold text-center">
                        Status
                      </th>
                      <th className="px-4 py-2 text-sm font-semibold text-center">
                        Date
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-300">
                    {recentClaims.map((claim, index) => (
                      <tr
                        key={index}
                        className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}
                      >
                        <td className="px-4 py-2 text-sm text-gray-700 text-center">
                          {claim.code}
                        </td>
                        <td className="px-4 py-2 text-sm text-gray-700 text-center">
                          {claim.productName}
                        </td>
                        <td className="px-4 py-2 text-sm text-gray-700 text-center">
                          <span
                            className={`px-2 py-1 text-xs font-semibold rounded-lg ${
                              claim.status === "Delivered"
                                ? "text-green-800 bg-green-200"
                                : "text-yellow-800 bg-yellow-200"
                            }`}
                          >
                            {claim.status}
                          </span>
                        </td>
                        <td className="px-4 py-2 text-sm text-gray-700 text-center">
                          {claim.date}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          )}
        </div>
      </section>
    </div>
  );
}
