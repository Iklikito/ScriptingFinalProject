import React, { useContext, useState } from "react";
import "./ProductDetailPage.css";
import { useParams } from "react-router-dom";
import Context from "./context";
import { useNavigate } from "react-router-dom";

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

const ProductDetailPage = () => {
  const sharedData = useContext(Context);
  const params = useParams();
  const itemId = params.id;
  const [selectedSize, setSelectedSize] = useState(
    sharedData.clothingData[itemId].defaultsize
  );
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const navigate = useNavigate();

  return (
    <div className="product-detail-page">
      <div className="image-section">
        <div className="thumbnails">
          {sharedData.clothingData[itemId].gallery.map((thumb, index) => (
            <img
              key={index}
              src={thumb}
              alt={`Thumbnail ${index + 1}`}
              className="thumbnail"
              onClick={() => {
                console.log("Index changed to " + index);
                setSelectedImageIndex(index);
              }}
            />
          ))}
        </div>
        <img
          src={sharedData.clothingData[itemId].gallery[selectedImageIndex]}
          alt="Main Product"
          className="main-image"
        />
      </div>
      <div className="product-info">
        <div>
          <h2 className="product-title">
            {sharedData.clothingData[itemId].title}
          </h2>
          <p className="product-subtitle">
            {sharedData.clothingData[itemId].type}
          </p>
        </div>

        <div className="size-block">
          <h4 className="product-page-size-label">SIZE:</h4>
          <div className="size-options">
            {sharedData.clothingData[itemId].sizes.map((size) => (
              <button
                key={size}
                onClick={() => setSelectedSize(size)}
                className={`product-page-size-button ${
                  selectedSize === size ? "active" : ""
                }`}
              >
                {size}
              </button>
            ))}
          </div>
        </div>

        <div className="price-block">
          <p className="price-label">PRICE:</p>
          <p className="price-value">
            {sharedData.currency.substring(0, 1) +
              convertPrices(
                sharedData.clothingData[itemId].price,
                sharedData.currency
              )}
          </p>
        </div>

        <button
          className="add-to-cart-btn"
          onClick={() => {
            if (!sharedData.cartItemIds.includes(itemId)) {
              sharedData.setCartItemIds((x) => [...x, itemId]);
              sharedData.setSizes((x) => {
                return {
                  ...x,
                  [itemId]: selectedSize,
                };
              });
              sharedData.setQuantities((x) => {
                return {
                  ...x,
                  [itemId]: 1,
                };
              });
              navigate("/categories/all");
            }
          }}
        >
          ADD TO CART
        </button>

        <p className="product-description">
          {sharedData.clothingData[itemId].description}
        </p>
      </div>
    </div>
  );
};

export default ProductDetailPage;
