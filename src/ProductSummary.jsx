import React from "react";
import "./ProductSummary.css";
import { useContext } from "react";
import Context from "./context";

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
  console.log("ProductSummary props:", {
    items,
    subtotal,
    shipping,
    total,
    paidAmount,
  });

  const sharedData = useContext(Context);

  return (
    <div className="product-summary-panel">
      <div className="item-list">
        {sharedData.cartItemIds.map((itemId) => (
          <div key={itemId} className="summary-item">
            <div className="item-details">
              <img
                src={sharedData.clothingData[itemId].image}
                alt={sharedData.clothingData[itemId].title}
                className="item-image"
              />
              <div className="item-info">
                <span className="item-name">
                  {sharedData.clothingData[itemId].title}
                </span>
                <span className="item-type">
                  {sharedData.clothingData[itemId].type}
                </span>
              </div>
            </div>
            <span className="item-price">
              {sharedData.currency.substring(0, 1) +
                convertPrices(
                  sharedData.clothingData[itemId].price,
                  sharedData.currency
                )}
            </span>
          </div>
        ))}
      </div>

      <div className="summary-breakdown">
        <div className="summary-row">
          <span>Subtotal</span>
          <span>
            {sharedData.currency.substring(0, 1) +
              convertPrices(
                sharedData.cartItemIds.reduce(
                  (sum, itemId) =>
                    sum +
                    sharedData.clothingData[itemId].price *
                      sharedData.quantities[itemId],
                  0
                ),
                sharedData.currency
              )}
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
                convertPrices(
                  sharedData.freeShipping * 4.99 +
                    sharedData.cartItemIds.reduce(
                      (sum, itemId) =>
                        sum +
                        sharedData.clothingData[itemId].price *
                          sharedData.quantities[itemId],
                      0
                    ),
                  sharedData.currency
                )}
            </span>
          </div>
        )}
      </div>

      <div className="summary-total">
        <span>Total</span>
        <span>
          {sharedData.currency.substring(0, 1) +
            convertPrices(
              sharedData.freeShipping * 4.99 +
                sharedData.cartItemIds.reduce(
                  (sum, itemId) =>
                    sum +
                    sharedData.clothingData[itemId].price *
                      sharedData.quantities[itemId],
                  0
                ),
              sharedData.currency
            )}
        </span>
      </div>
    </div>
  );
};

export default ProductSummary;
