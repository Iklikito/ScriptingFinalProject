import React, { useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Context from "./context";
import "./CartPage.css";
import Bar from "./Bar";
import "./Bar.css";
import clothingData from "./clothingData.json";

const convertPrices = (price, currency) => {
  if (currency === "$ USD") return price;
  if (currency === "€ EUR") return Math.ceil(price * 85) / 100;
  if (currency === "¥ JPY") return Math.ceil(price * 14488) / 100;
  return price;
};

const CartPage = () => {
  const sharedData = useContext(Context);
  const navigate = useNavigate();

  const params = useParams();
  const category = params.category ? params.category : "all";

  return (
    <>
      <Bar category={category} showOverlay={false} setShowOverlay={() => {}} />
      <div className="cart-page">
        <h1 className="cart-page-title">CART</h1>
        <div className="cart-page-body">
          {sharedData.cartItemIds.map((itemId, index) => (
            <div className="cart-page-item" key={index}>
              <div className="cart-page-item-info">
                <div className="cart-page-item-name">
                  {clothingData[itemId].title}
                </div>
                <div className="cart-page-item-price">
                  {sharedData.currency.substring(0, 1) +
                    convertPrices(
                      clothingData[itemId].price,
                      sharedData.currency
                    )}
                </div>
                <div className="cart-page-size-label">SIZE:</div>
                <div className="cart-page-size-buttons">
                  {clothingData[itemId].sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => {
                        sharedData.setSizes((prev) => ({
                          ...prev,
                          [itemId]: size,
                        }));
                      }}
                      className={`cart-page-size-button ${
                        sharedData.sizes[itemId] === size ? "selected" : ""
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
              <div className="cart-quantity-controls-and-image">
                <div className="cart-page-controls">
                  <button
                    onClick={() => {
                      sharedData.setQuantities((x) => ({
                        ...x,
                        [itemId]: x[itemId] + 1,
                      }));
                    }}
                  >
                    +
                  </button>
                  <div className="quantity">
                    {sharedData.quantities[itemId]}
                  </div>
                  <button
                    onClick={() => {
                      sharedData.setQuantities((x) => {
                        if (x[itemId] !== 1) {
                          return { ...x, [itemId]: x[itemId] - 1 };
                        }
                        const newQuantities = { ...x };
                        delete newQuantities[itemId];
                        sharedData.setCartItemIds((prev) =>
                          prev.filter((id) => id !== itemId)
                        );
                        sharedData.setSizes((prev) => {
                          const copy = { ...prev };
                          delete copy[itemId];
                          return copy;
                        });
                        return newQuantities;
                      });
                    }}
                  >
                    –
                  </button>
                </div>
                <img
                  src={clothingData[itemId].gallery[0]} // Using the first image from gallery
                  alt={clothingData[itemId].title}
                  className="cart-page-item-image"
                />
                <div className="image-carousel-buttons">
                  <button className="carousel-button prev">&lt;</button>
                  <button className="carousel-button next">&gt;</button>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="cart-page-footer">
          <div className="cart-quantity-and-total">
            <div className="cart-total-quantity">
              <span className="quantity-label">Quantity:</span>
              <span className="quantity-value">
                {sharedData.cartItemIds.reduce(
                  (sum, itemId) => sum + sharedData.quantities[itemId],
                  0
                )}
              </span>
            </div>
            <div className="cart-total-price">
              <span className="total-label">Total:</span>
              <span className="total-value">
                {sharedData.currency.substring(0, 1)}
                {sharedData.cartItemIds
                  .reduce(
                    (sum, itemId) =>
                      sum +
                      clothingData[itemId].price *
                        sharedData.quantities[itemId],
                    0
                  )
                  .toFixed(2)}
              </span>
            </div>
          </div>
          <button
            className="continue-button"
            onClick={() => navigate("/categories/")}
          >
            CONTINUE
          </button>
        </div>
      </div>
    </>
  );
};

export default CartPage;
