import React, { useState, useEffect } from "react";
import axios from "axios";
import "../assets/css/Products.css";
import { toast } from "react-toastify";
import { Navigate, useNavigate } from "react-router-dom";

function RecipientBrowseProducts() {
  const [suspendedProducts, setSuspendedProducts] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Fetching all sus products
  useEffect(() => {
    axios
      .get("http://localhost:3000/susproducts/")
      .then((response) => {
        setSuspendedProducts(response.data.suspendedProducts);
      })
      .catch((error) => {
        console.error("Error fetching Suspended products:", error);
        setError(error.message);
      });
  }, []);

  const handleClaim = async (productId) => {
    try {
      // Hardcoded sample claimant object id
      const claimantId = "614f11a22a441f001678c80f";

      const response = await axios.post("http://localhost:3000/claims/add", {
        SusproductId: productId,
        claimant: claimantId,
        quantity: 1, // Assuming always claiming 1 quantity
      });

      toast.success(response.data.message);
      navigate("/shop-donations");
    } catch (error) {
      console.error("Error claiming product:", error);
      toast.error("Failed to claim product. Please try again later.");
    }
  };

  return (
    <div className="App">
      <main>
        <h1 className="text-center text-3xl mt-6 font-bold">Browse Products</h1>
        <section className="px-4 py-12 container mx-auto">
          <div className="flex flex-wrap justify-center">
            {suspendedProducts.map((product) => (
              <div
                key={product._id}
                className="p-2 col-span-11 md:col-span-6 lg:col-span-3 mx-0 mb-4"
              >
                <div
                  className="bg-white rounded-lg overflow-hidden shadow-md h-full w-full"
                  style={{ width: "250px" }}
                >
                  <img
                    src={`http://localhost:3000{product.product.image}`}
                    className="h-40 w-full object-cover"
                    alt={product.product.name}
                    style={{ height: "16rem" }} // Adjust the height as needed
                  />
                  <div className="p-4">
                    <h5 className="text-lg font-bold">
                      {" "}
                      {product.product.name}
                    </h5>
                    <p className="text-sm text-gray-700">
                      {product.product.code}
                    </p>
                    <button
                      className="bg-green-500 text-white px-4 py-2 rounded mt-2 hover:bg-green-700"
                      onClick={() => handleClaim(product._id)}
                    >
                      Redeem
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}

export default RecipientBrowseProducts;
