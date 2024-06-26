import React, { useState, useEffect } from "react";
import { FiPrinter } from "react-icons/fi";
import axios from "axios";
import jsPDF from "jspdf";

export default function ShopRedemptions() {
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [suspendedProducts, setSuspendedProducts] = useState([]);

  useEffect(() => {
    // Function to generate dummy data
    const generateDummyData = () => {
      const dummyData = [];
      for (let i = 0; i < 10; i++) {
        dummyData.push({
          id: i + 1,
          recipientName: `Recipient ${i + 1}`,
          recipientContact: `071 234 ${Math.floor(Math.random() * 1000)}`,
          productRedeemed: `Product ${i + 1}`,
          quantityRedeemed: Math.floor(Math.random() * 10) + 1,
          redemptionDate: "2024-05-01",
          status: "Pending",
        });
      }
      return dummyData;
    };

    // Setting dummy data to state
    const dummyData = generateDummyData();
    setSuspendedProducts(dummyData);
    setFilteredProducts(dummyData);
  }, []);

  // Print function using jsPDF
  const handlePrint = () => {
    const doc = new jsPDF();
    doc.text("Redemption Details", 10, 10);
    let yPos = 20;
    filteredProducts.forEach((product, index) => {
      const {
        recipientName,
        recipientContact,
        productRedeemed,
        quantityRedeemed,
        redemptionDate,
        status,
      } = product;
      yPos += 10;
      doc.text(`Recipient Name: ${recipientName}`, 10, yPos);
      doc.text(`Recipient Contact: ${recipientContact}`, 10, yPos + 5);
      doc.text(`Product Redeemed: ${productRedeemed}`, 10, yPos + 10);
      doc.text(`Quantity Redeemed: ${quantityRedeemed}`, 10, yPos + 15);
      doc.text(`Redemption Date: ${redemptionDate}`, 10, yPos + 20);
      doc.text(`Status: ${status}`, 10, yPos + 25);
      if (index !== filteredProducts.length - 1) {
        doc.addPage();
      }
    });
    doc.save("Redemption_Details.pdf");
  };

  return (
    <div className="flex flex-col gap-4 mt-4">
      <div className="flex flex-row w-full">
        <div className="bg-slate-100 w-full px-4 pt-3 mb-16 pb-4 sticky">
          <h1 className="text-lg font-semibold mb-4 text-left">Redemptions</h1>
          <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            {/* Content omitted for brevity */}
            <button
              className="ml-2 py-1 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
              onClick={handlePrint}
            >
              <FiPrinter className="inline-block w-4 h-4 mr-1" />
              Print
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
