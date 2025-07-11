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
        My Bag,{" "}
        <span>
          {sharedData.cartItems.reduce((acc, x) => acc + x.quantity, 0)} items
        </span>
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
                        itemSize = size;
                        sharedData.setCartItems((x) => {
                          let y = [...x];
                          let merged = false;

                          y = y.map(
                            (
                              {
                                id: otherItemId,
                                quantity: otherItemQuantity,
                                size: otherItemSize,
                              },
                              otherIndex
                            ) => {
                              if (
                                otherItemId == itemId &&
                                otherItemSize == size &&
                                otherIndex != index
                              ) {
                                merged = true;
                                return {
                                  id: itemId,
                                  quantity: otherItemQuantity + itemQuantity,
                                  size: otherItemSize,
                                };
                              }
                              return {
                                id: otherItemId,
                                quantity: otherItemQuantity,
                                size: otherItemSize,
                              };
                            }
                          );
                          if (merged) {
                            y.splice(index, 1);
                          } else {
                            y[index].size = size;
                          }

                          return y;
                        });
                      }}
                      className={`size-button ${
                        size == sharedData.cartItems[index].size
                          ? "selected"
                          : ""
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
                      let y = [...x];
                      y[index] = {
                        id: itemId,
                        quantity: itemQuantity + 1,
                        size: itemSize,
                      };
                      return y;
                    });
                  }}
                >
                  +
                </button>
                <div className="quantity">
                  {sharedData.cartItems[index].quantity}
                </div>
                <button
                  onClick={() => {
                    sharedData.setCartItems((x) => {
                      let y = [...x];
                      if (itemQuantity != 1) {
                        y[index] = {
                          id: itemId,
                          quantity: itemQuantity - 1,
                          size: itemSize,
                        };
                        return y;
                      }
                      console.log("Pre-splice");
                      console.log(index);
                      console.log(y);
                      y.splice(index, 1);
                      console.log("Post-splice");
                      console.log(index);
                      console.log(y);
                      return y;
                    });
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
