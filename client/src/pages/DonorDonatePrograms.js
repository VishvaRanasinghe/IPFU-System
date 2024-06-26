import React, { useState, useEffect } from "react";
import axios from "axios"; // Import Axios library
import "../assets/css/Products.css";
import { GiShoppingBag } from "react-icons/gi";
import Cart from "../components/Cart";
import { toast } from "react-toastify";

function DonorDonatePrograms() {
  const [cartsVisibilty, setCartVisible] = useState(false);
  const [productsInCart, setProductsInCart] = useState(
    JSON.parse(localStorage.getItem("shopping-cart")) || []
  );
  const [products, setProducts] = useState([]); // State to hold fetched products
  const [error, setError] = useState(null); // State to hold potential errors

  // Fetching all products
  useEffect(() => {
    axios
      .get("http://localhost:3000/products")
      .then((response) => {
        setProducts(response.data.products); // Set fetched products
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
        setError(error.message); // Set error state
      });
  }, []);

  const addProductToCart = (product) => {
    const newProduct = {
      ...product,
      count: 1,
    };
    setProductsInCart([...productsInCart, newProduct]);
  };

  const onQuantityChange = (productId, count) => {
    setProductsInCart((oldState) => {
      const productsIndex = oldState.findIndex((item) => item.id === productId);
      if (productsIndex !== -1) {
        oldState[productsIndex].count = count;
      }
      return [...oldState];
    });
  };

  const onProductRemove = (product) => {
    setProductsInCart((oldState) => {
      const productsIndex = oldState.findIndex(
        (item) => item.id === product.id
      );
      if (productsIndex !== -1) {
        oldState.splice(productsIndex, 1);
      }
      return [...oldState];
    });
  };

  return (
    <div className="App">
      <Cart
        visibilty={cartsVisibilty}
        products={productsInCart}
        onClose={() => setCartVisible(false)}
        onQuantityChange={onQuantityChange}
        onProductRemove={onProductRemove}
      />
      <div className="navbar">
        <button
          className="btn shopping-cart-btn mr-6"
          onClick={() => setCartVisible(true)}
        >
          <GiShoppingBag size={24} />
          {productsInCart.length > 0 && (
            <span className="product-count">{productsInCart.length}</span>
          )}
        </button>
      </div>
      <main>
        <h1 className="text-center text-3xl mt-6 font-bold">Donation Programs</h1>
        <section className="px-4 py-12 container mx-auto">
          <div className="flex flex-wrap justify-center">
            {products.map((product) => (
              <div className="p-2 col-span-11 md:col-span-6 lg:col-span-3 mx-0 mb-4">
                <div
                  className="bg-white rounded-lg overflow-hidden shadow-md h-full w-full"
                  style={{ width: "250px" }}
                >
                  <img
                    src={`http://localhost:3000/${product.image}`}
                    className="h-40 w-full object-cover"
                    alt={product.name}
                    style={{ height: "16rem" }} // Adjust the height as needed
                  />
                  <div className="p-4">
                    <h5 className="text-lg font-bold">{product.name}</h5>
                    <h5 className="text-lg font-bold">Rs.{product.price}</h5>
                    <p className="text-sm text-gray-700">{product.code}</p>
                    <button
                      className="bg-green-500 text-white px-4 py-2 rounded mt-2"
                      onClick={() => {
                        addProductToCart(product);
                        toast.success("Product added to cart successfully!");
                      }}
                    >
                      Donate
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

export default DonorDonatePrograms;
