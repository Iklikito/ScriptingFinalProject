import React from "react";
import "./CartOverlay.css";
import { useNavigate } from "react-router-dom";
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

console.log(clothingData);

const CartOverlay = () => {
  const sharedData = useContext(Context);
  const navigate = useNavigate();

  return (
    <div className="cart-overlay">
      <h2 className="cart-title">
        My Bag, <span>{sharedData.cartItems.length} items</span>
      </h2>

      <div className="cart-body">
        {sharedData.cartItems.map(
          ({ id: itemId, quantity: itemQuantity, size: itemSize }, index) => (
            <div className="cart-item" key={index}>
              <div className="cart-item-info">
                <div className="cart-item-name">
                  {clothingData[itemId].title}
                </div>
                <div className="cart-item-name">
                  {clothingData[itemId].type}
                </div>
                <div className="cart-item-price">
                  {sharedData.currency.substring(0, 1) +
                    convertPrices(
                      clothingData[itemId].price,
                      sharedData.currency
                    )}
                </div>
                <div className="size-label">Size:</div>
                <div className="cart-size-buttons">
                  {clothingData[itemId].sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => {
                        console.log("Hi");
                        console.log(index);
                        sharedData.setCartItems((x) => {
                          x[index] = {
                            id: itemId,
                            quantity: itemQuantity + 1,
                            size: size,
                          };
                          return x;
                        });
                      }}
                      className={`size-button ${
                        size == itemSize ? "selected" : ""
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
                    sharedData.setCartItems((x) => {
                      x[index] = {
                        id: itemId,
                        quantity: itemQuantity,
                        size: itemSize,
                      };
                    });
                  }}
                >
                  +
                </button>
                <div className="quantity">
                  {sharedData.cartItems[itemId].quantity}
                </div>
                <button
                  onClick={() => {
                    if (itemQuantity != 1) {
                      sharedData.setCartItems((x) => {
                        x[index] = {
                          id: itemId,
                          quantity: itemQuantity - 1,
                          size: itemSize,
                        };
                        return [...x];
                      });
                    }
                  }}
                >
                  –
                </button>
              </div>

              <img
                src={clothingData[itemId].image}
                alt={clothingData[itemId].title}
                className="cart-item-image"
              />
            </div>
          )
        )}
      </div>

      <div className="cart-footer">
        <div className="cart-total">
          <span>Total</span>
          <span>
            {sharedData.currency.substring(0, 1)}
            {convertPrices(
              sharedData.cartItems.reduce(
                (sum, { id: itemId, quantity: itemQuantity, size: itemSize }) =>
                  sum + clothingData[itemId].price * itemQuantity,
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
              sharedData.cartItems.length > 0
                ? "checkout-btn active"
                : "checkout-btn"
            }
            onClick={() => {
              if (sharedData.cartItems.length > 0) navigate("/shipping-info");
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
