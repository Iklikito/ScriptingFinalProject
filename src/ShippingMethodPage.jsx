import ProductSummary from "./ProductSummary";
import { useContext, useState } from "react";
import Context from "./context";
import CheckoutHeader from "./CheckoutHeader";
import { useNavigate } from "react-router-dom";
import "./ShippingMethodPage.css";

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

const ShippingMethodPage = () => {
  const sharedData = useContext(Context);
  const navigate = useNavigate();

  const shippingOptions = [
    {
      id: "standard",
      name: "Standard Shipping",
      description: "3-7 business days",
      price: 0.0,
    },
    {
      id: "express",
      name: "Express Shipping",
      description: "1-2 business days",
      price: 4.99,
    },
  ];

  const [selectedShipping, setSelectedShipping] = useState(
    sharedData.checkoutData.shippingMethod?.id || ""
  );
  const [error, setError] = useState("");

  const handleShippingChange = (optionId) => {
    setSelectedShipping(optionId);
    setError("");
  };

  const handleGoToPayment = () => {
    if (!selectedShipping) {
      setError("Please select a shipping method.");
      return;
    }
    const chosenMethod = shippingOptions.find(
      (opt) => opt.id === selectedShipping
    );
    sharedData.setCheckoutData((prev) => ({
      ...prev,
      shippingMethod: chosenMethod,
    }));
    sharedData.setFreeShipping(selectedShipping == "standard");
    navigate("/checkout-payment");
  };

  const shippingCost = selectedShipping
    ? shippingOptions.find((opt) => opt.id === selectedShipping)?.price || 0
    : 0;
  const currentTotal = sharedData.subtotal + shippingCost;
  const formattedShipping =
    shippingCost === 0
      ? "Free Shipping"
      : `${sharedData.currency.substring(0, 1)}${convertPrices(
          shippingCost.toFixed(2),
          sharedData.currency
        )}`;

  return (
    <div className="checkout-container">
      <div className="page-content">
        <div className="form-section">
          <CheckoutHeader />
          <h2 className="form-title">Shipping Method</h2>

          <div className="info-box">
            <div className="info-row">
              <span className="info-label">Contact</span>
              <span className="info-value">
                {sharedData.checkoutData.shippingInfo?.emailOrPhone}
              </span>
            </div>
            <div className="info-row border-top">
              <span className="info-label">Ship to</span>
              <span className="info-value">
                {sharedData.checkoutData.shippingInfo?.address},{" "}
                {sharedData.checkoutData.shippingInfo?.postalCode},{" "}
                {sharedData.checkoutData.shippingInfo?.city}
                {sharedData.checkoutData.shippingInfo?.province
                  ? ` ${sharedData.checkoutData.shippingInfo.province}`
                  : ""}
                , {sharedData.checkoutData.shippingInfo?.country}
              </span>
            </div>
          </div>

          <h3 className="form-subtitle">Choose a shipping option</h3>
          {shippingOptions.map((option) => (
            <div
              key={option.id}
              className={`shipping-option ${
                selectedShipping === option.id ? "selected" : ""
              }`}
              onClick={() => handleShippingChange(option.id)}
            >
              <input
                type="radio"
                name="shippingOption"
                value={option.id}
                checked={selectedShipping === option.id}
                onChange={() => handleShippingChange(option.id)}
                className="shipping-option-radio"
              />
              <div className="shipping-option-details">
                <div className="shipping-method-name">{option.name}</div>
                <div className="shipping-method-description">
                  {option.description}
                </div>
              </div>
              <div className="shipping-method-price">
                {option.price === 0
                  ? "FREE"
                  : `${sharedData.currency.substring(0, 1)}${convertPrices(
                      option.price,
                      sharedData.currency
                    )}`}
              </div>
            </div>
          ))}

          {error && <p className="error-message">{error}</p>}

          <div className="form-actions">
            <button
              type="button"
              className="back-button"
              onClick={() => navigate("/shipping-info")}
            >
              &lt; Back to details
            </button>
            <button
              type="button"
              className="primary-button"
              onClick={handleGoToPayment}
            >
              Go to payment
            </button>
          </div>
        </div>

        <ProductSummary
          items={sharedData.dummyCartItems}
          subtotal={sharedData.subtotal}
          shipping={formattedShipping}
          total={currentTotal}
        />
      </div>
    </div>
  );
};

export default ShippingMethodPage;
