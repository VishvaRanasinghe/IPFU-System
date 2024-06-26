import React from "react";
import "../assets/css/Cart.css";
import { AiFillCloseCircle } from "react-icons/ai";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useNavigate } from "react-router-dom";

function Cart({
  visibilty,
  products,
  onProductRemove,
  onClose,
  onQuantityChange,
}) {
  // Calculate total amount
  const totalAmount = products.reduce(
    (total, product) => total + product.price * product.count,
    0
  );

  const navigate = useNavigate();

  const handleCheckout = () => {
    const productIds = products.map((product) => product._id);
    const quantities = products.map((product) => product.count);

    localStorage.setItem("cartProductIds", JSON.stringify(productIds));
    localStorage.setItem("cartQuantities", JSON.stringify(quantities));

    navigate("/checkout", { state: { totalAmount: totalAmount } });
  };

  return (
    <div
      className="modal"
      style={{
        display: visibilty ? "block" : "none",
      }}
    >
      <div className="shoppingCart">
        <div className="header">
          <h2>Donation Cart</h2>
          <button className="btn close-btn" onClick={onClose}>
            <AiFillCloseCircle size={30} />
          </button>
        </div>
        <div className="cart-products">
          {products.length === 0 && (
            <span className="empty-text">Your basket is currently empty</span>
          )}
          {products.map((product) => (
            <div className="cart-product" key={product.id}>
              <img
                src={`http://localhost:3000/${product.image}`}
                alt={product.name}
              />
              <div className="product-info">
                <h3>{product.name}</h3>
                <span className="product-price">
                  {product.price * product.count}$
                </span>
              </div>
              <select
                className="count"
                value={product.count}
                onChange={(event) => {
                  onQuantityChange(product.id, event.target.value);
                }}
              >
                {[...Array(10).keys()].map((number) => {
                  const num = number + 1;
                  return (
                    <option value={num} key={num}>
                      {num}
                    </option>
                  );
                })}
              </select>
              <button
                className="btn remove-btn"
                onClick={() => onProductRemove(product)}
              >
                <RiDeleteBin6Line size={20} />
              </button>
            </div>
          ))}
          {products.length > 0 && (
            <div className="total-amount">Total: {totalAmount.toFixed(2)}$</div>
          )}
          {products.length > 0 && (
            <button
              className="btn checkout-btn"
              onClick={() => {
                handleCheckout(products, totalAmount);
              }}
            >
              Proceed to checkout
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default Cart;
