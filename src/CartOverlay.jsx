import React from "react";
import "./CartOverlay.css";
import { useNavigate } from "react-router-dom";
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

const CartOverlay = () => {
  const sharedData = useContext(Context);
  const navigate = useNavigate();

  console.log("Clothing data:");
  console.log(sharedData.clothingData);
  console.log("Sizes:");
  console.log(sharedData.sizes);

  return (
    <div className="cart-overlay">
      <h2 className="cart-title">
        My Bag, <span>{sharedData.cartItemIds.length} items</span>
      </h2>

      <div className="cart-body">
        {sharedData.cartItemIds.map((itemId, index) => (
          <div className="cart-item" key={index}>
            <div className="cart-item-info">
              <div className="cart-item-name">
                {sharedData.clothingData[itemId].title}
              </div>
              <div className="cart-item-price">
                {sharedData.currency.substring(0, 1) +
                  convertPrices(
                    sharedData.clothingData[itemId].price,
                    sharedData.currency
                  )}
              </div>
              <div className="size-label">Size:</div>
              <div className="cart-size-buttons">
                {sharedData.clothingData[itemId].sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => {
                      sharedData.setSizes((x) => {
                        return { ...x, [itemId]: size };
                      });
                    }}
                    className={`size-button ${
                      size == sharedData.sizes[itemId] ? "selected" : ""
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            <div className="cart-controls">
              <button
                onClick={() => {
                  sharedData.setQuantities((x) => {
                    return {
                      ...x,
                      [itemId]: x[itemId] + 1,
                    };
                  });
                }}
              >
                +
              </button>
              <div className="quantity">{sharedData.quantities[itemId]}</div>
              <button
                onClick={() => {
                  sharedData.setQuantities((x) => {
                    if (x[itemId] != 1) {
                      return {
                        ...x,
                        [itemId]: x[itemId] - 1,
                      };
                    }

                    const temp = x;
                    delete x[itemId];
                    console.log("Pre-filtered cart item ids:");
                    console.log(sharedData.cartItemIds);
                    sharedData.setCartItemIds((x) => {
                      return x.filter((id) => id != itemId);
                    });
                    console.log("Post-filtered cart item ids:");
                    console.log(sharedData.cartItemIds);
                    delete sharedData.sizes[itemId];
                    return temp;
                  });
                }}
              >
                –
              </button>
            </div>

            <img
              src={sharedData.clothingData[itemId].image}
              alt={sharedData.clothingData[itemId].title}
              className="cart-item-image"
            />
          </div>
        ))}
      </div>

      <div className="cart-footer">
        <div className="cart-total">
          <span>Total</span>
          <span>
            {sharedData.currency.substring(0, 1)}
            {convertPrices(
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
        <div className="cart-buttons">
          <button
            className="view-bag-btn"
            onClick={() => navigate("/cart-page")}
          >
            VIEW BAG
          </button>
          <button
            className={
              sharedData.cartItemIds.length > 0
                ? "checkout-btn active"
                : "checkout-btn"
            }
            onClick={() => {
              if (sharedData.cartItemIds.length > 0) navigate("/shipping-info");
            }}
          >
            CHECK OUT
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartOverlay;
