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

  console.log("CLOTHING DATA: ");
  console.log(clothingData);

  console.log("SHARED DATA:");
  console.log(sharedData);

  return (
    <>
      <Bar category={category} showOverlay={false} setShowOverlay={() => {}} />
      <div className="cart-page">
        <h1 className="cart-page-title">CART</h1>
        <div className="cart-page-body">
          {sharedData.cartItems.map(
            ({ id: itemId, quantity: itemQuantity, size: itemSize }, index) => (
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
                          sharedData.setCartItems((x) => {
                            let y = [...x];
                            y[index] = {
                              id: itemId,
                              quantity: itemQuantity,
                              size: size,
                            };
                            return y;
                          });
                        }}
                        className={`cart-page-size-button ${
                          itemSize === size ? "selected" : ""
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
            )
          )}
        </div>
        <div className="cart-page-footer">
          <div className="cart-quantity-and-total">
            <div className="cart-total-quantity">
              <span className="quantity-label">Quantity:</span>
              <span className="quantity-value">
                {sharedData.cartItems.reduce(
                  (
                    sum,
                    { id: itemId, quantity: itemQuantity, size: itemSize }
                  ) => sum + itemQuantity,
                  0
                )}
              </span>
            </div>
            <div className="cart-total-price">
              <span className="total-label">Total:</span>
              <span className="total-value">
                {sharedData.currency.substring(0, 1)}
                {convertPrices(
                  sharedData.cartItems.reduce(
                    (
                      sum,
                      { id: itemId, quantity: itemQuantity, size: itemSize }
                    ) => sum + clothingData[itemId].price * itemQuantity,
                    0
                  ),
                  sharedData.currency
                )}
              </span>
            </div>
          </div>
          <button
            className="continue-button"
            onClick={() => navigate("/shipping-info")}
          >
            CONTINUE
          </button>
        </div>
      </div>
    </>
  );
};

export default CartPage;
