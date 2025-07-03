import React from "react";
import "./ProductSummary.css";
import { useContext } from "react";
import Context from "./context";
import clothingData from "./clothingData.json";

const convertPrices = (price, currency) => {
  if (currency == "$ USD") {
    return price;
  } else if (currency == "€ EUR") {
    return Math.ceil(price * 85) / 100;
  } else if (currency == "¥ JPY") {
    return Math.ceil(price * 14488) / 100;
  } else {
    return price;
  }
};

const ProductSummary = ({ items, subtotal, shipping, total, paidAmount }) => {
  const sharedData = useContext(Context);

  return (
    <div className="product-summary-panel">
      <div className="item-list">
        {sharedData.cartItemIds.map((itemId) => (
          <div key={itemId} className="summary-item">
            <div className="item-details">
              <img
                src={clothingData[itemId].image}
                alt={clothingData[itemId].title}
                className="item-image"
              />
              <div className="item-info">
                <span className="item-name">{clothingData[itemId].title}</span>
                <span className="item-type">{clothingData[itemId].type}</span>
              </div>
            </div>
            <span className="item-price">
              {sharedData.currency.substring(0, 1) +
                convertPrices(clothingData[itemId].price, sharedData.currency)}
            </span>
          </div>
        ))}
      </div>

      <div className="summary-breakdown">
        <div className="summary-row">
          <span>Subtotal</span>
          <span>
            {sharedData.currency.substring(0, 1) +
              convertPrices(sharedData.subtotal, sharedData.currency)}
          </span>
        </div>
        <div className="summary-row">
          <span>Shipping</span>
          <span>
            {typeof shipping === "number"
              ? `$${shipping.toFixed(2)}`
              : shipping}
          </span>
        </div>
        {paidAmount !== undefined && (
          <div className="summary-paid-row">
            <span>Paid</span>
            <span>
              {sharedData.currency.substring(0, 1) +
                convertPrices(sharedData.total, sharedData.currency)}
            </span>
          </div>
        )}
      </div>

      <div className="summary-total">
        <span>Total</span>
        <span>
          {sharedData.currency.substring(0, 1) +
            convertPrices(sharedData.total, sharedData.currency)}
        </span>
      </div>
    </div>
  );
};

export default ProductSummary;
