import "./CheckoutPaymentPage.css";
import { useContext, useState } from "react";
import ProductSummary from "./ProductSummary";
import Context from "./context";
import { useNavigate } from "react-router-dom";
import CheckoutHeader from "./CheckoutHeader";

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

const CheckoutPaymentPage = () => {
  const sharedData = useContext(Context);
  const navigate = useNavigate();

  const [formData, setFormData] = useState(
    sharedData.checkoutData.paymentInfo || {
      cardNumber: "",
      cardHolderName: "",
      expiration: "",
      cvv: "",
    }
  );
  const [errors, setErrors] = useState({});
  const [processing, setProcessing] = useState(false);

  const validateForm = () => {
    const newErrors = {};
    if (
      !formData.cardNumber ||
      !/^\d{16}$/.test(formData.cardNumber.replace(/\s/g, ""))
    )
      newErrors.cardNumber = "Valid 16-digit card number is required.";
    if (!formData.cardHolderName)
      newErrors.cardHolderName = "Card holder name is required.";
    if (
      !formData.expiration ||
      !/^(0[1-9]|1[0-2])\/?([0-9]{2})$/.test(formData.expiration)
    )
      newErrors.expiration = "Valid MM/YY is required.";
    if (!formData.cvv || !/^\d{3,4}$/.test(formData.cvv))
      newErrors.cvv = "Valid 3 or 4-digit CVV is required.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    let formattedValue = value;

    if (name === "cardNumber") {
      formattedValue = value.replace(/\D/g, "").substring(0, 16);
      formattedValue = formattedValue.replace(/(.{4})/g, "$1 ").trim();
    } else if (name === "expiration") {
      formattedValue = value.replace(/\D/g, "").substring(0, 4);
      if (formattedValue.length > 2) {
        formattedValue =
          formattedValue.substring(0, 2) + "/" + formattedValue.substring(2);
      }
    } else if (name === "cvv") {
      formattedValue = value.replace(/\D/g, "").substring(0, 4);
    }

    setFormData((prevData) => ({
      ...prevData,
      [name]: formattedValue,
    }));

    if (errors[name]) {
      setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
    }
  };

  const handlePayNow = () => {
    if (validateForm()) {
      setProcessing(true);
      setTimeout(() => {
        sharedData.setCheckoutData((prev) => ({
          ...prev,
          paymentInfo: formData,
          orderId: `ORDER_${Math.random()
            .toString(36)
            .substring(2, 11)
            .toUpperCase()}`,
        }));
        navigate("/payment-confirmation");
        if (sharedData.checkoutData.saveInfo) sharedData.setCheckoutData({});
        localStorage.removeItem("checkoutData");
        setProcessing(false);
      }, 2000);
    }
  };

  const shippingCost = sharedData.checkoutData.shippingMethod?.price || 0;
  const currentTotal = sharedData.subtotal + shippingCost;
  const formattedShipping =
    shippingCost === 0 ? "Free Shipping" : `$${shippingCost.toFixed(2)}`;

  return (
    <div className="checkout-payment-wrapper">
      <div className="checkout-page-checkout-container">
        <div className="checkout-page-page-content">
          <div className="checkout-page-form-section">
            <CheckoutHeader />
            <h2 className="checkout-page-form-title">Payment Information</h2>

            <div
              style={{
                border: "1px solid #e0e0e0",
                borderRadius: "8px",
                marginBottom: "30px",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  padding: "15px",
                  display: "flex",
                  alignItems: "baseline",
                }}
              >
                <span
                  style={{
                    fontWeight: "normal",
                    color: "#888",
                    marginRight: "10px",
                  }}
                >
                  Contact
                </span>
                <span style={{ color: "#333" }}>
                  {sharedData.checkoutData.shippingInfo?.emailOrPhone}
                </span>
              </div>

              <div
                style={{
                  borderTop: "1px solid #eee",
                  padding: "15px",
                  display: "flex",
                  alignItems: "baseline",
                }}
              >
                <span
                  style={{
                    fontWeight: "normal",
                    color: "#888",
                    marginRight: "10px",
                  }}
                >
                  Ship to
                </span>
                <span style={{ color: "#333" }}>
                  {sharedData.checkoutData.shippingInfo?.address},{" "}
                  {sharedData.checkoutData.shippingInfo?.postalCode},{" "}
                  {sharedData.checkoutData.shippingInfo?.city}
                  {sharedData.checkoutData.shippingInfo?.province
                    ? ` ${sharedData.checkoutData.shippingInfo.province}`
                    : ""}
                  , {sharedData.checkoutData.shippingInfo?.country}
                </span>
              </div>

              <div
                style={{
                  borderTop: "1px solid #eee",
                  padding: "15px",
                  display: "flex",
                  alignItems: "baseline",
                }}
              >
                <span
                  style={{
                    fontWeight: "normal",
                    color: "#888",
                    marginRight: "10px",
                  }}
                >
                  Method
                </span>
                <span style={{ color: "#333" }}>
                  {sharedData.checkoutData.shippingMethod
                    ? `${sharedData.checkoutData.shippingMethod.name} - ${
                        sharedData.checkoutData.shippingMethod.price === 0
                          ? "FREE"
                          : `${sharedData.currency.substring(
                              0,
                              1
                            )}${convertPrices(
                              shippingCost.toFixed(2),
                              sharedData.currency
                            )}`
                      }`
                    : "Not selected"}
                </span>
              </div>
            </div>

            <div className="payment-methods">
              <div className="credit-card-form">
                <div className="card-header">
                  <img src="./CreditCardFill.svg" alt="CreditCardFill" style={{marginRight: "20px"}}/>
                  <span>Credit Card</span>
                </div>
                <div className="card-body">
                  <form>
                    <div className="input-group">
                      <input
                        type="text"
                        name="cardNumber"
                        placeholder="Card Number"
                        className={`form-control has-icon-right ${
                          errors.cardNumber ? "input-error" : ""
                        }`}
                        value={formData.cardNumber}
                        onChange={handleChange}
                        inputMode="numeric"
                      />
                      <i className="fa-solid fa-lock input-icon"></i>
                      {errors.cardNumber && (
                        <p className="checkout-page-error-message">
                          {errors.cardNumber}
                        </p>
                      )}
                    </div>

                    <div className="input-group">
                      <input
                        type="text"
                        name="cardHolderName"
                        placeholder="Holder Name"
                        className={`form-control ${
                          errors.cardHolderName ? "input-error" : ""
                        }`}
                        value={formData.cardHolderName}
                        onChange={handleChange}
                      />
                      {errors.cardHolderName && (
                        <p className="checkout-page-error-message">
                          {errors.cardHolderName}
                        </p>
                      )}
                    </div>

                    <div className="form-row">
                      <div className="input-group">
                        <input
                          type="text"
                          name="expiration"
                          placeholder="Expiration (MM/YY)"
                          className={`form-control ${
                            errors.expiration ? "input-error" : ""
                          }`}
                          value={formData.expiration}
                          onChange={handleChange}
                          inputMode="numeric"
                        />
                        {errors.expiration && (
                          <p className="checkout-page-error-message">
                            {errors.expiration}
                          </p>
                        )}
                      </div>
                      <div className="input-group">
                        <input
                          type="text"
                          name="cvv"
                          placeholder="CVV"
                          className={`form-control has-icon-right ${
                            errors.cvv ? "input-error" : ""
                          }`}
                          value={formData.cvv}
                          onChange={handleChange}
                          inputMode="numeric"
                        />
                        <i className="fa-solid fa-circle-info input-icon"></i>
                        {errors.cvv && (
                          <p className="checkout-page-error-message">
                            {errors.cvv}
                          </p>
                        )}
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>

            <div className="checkout-page-form-actions">
              <button
                type="button"
                className="checkout-page-back-button"
                onClick={() => navigate("/shipping-method")}
              >
                Back to shipping
              </button>
              <button
                type="button"
                className="checkout-page-primary-button"
                onClick={handlePayNow}
                disabled={processing}
              >
                {processing
                  ? "Processing..."
                  : `Pay now (${
                      sharedData.currency.substring(0, 1) +
                      convertPrices(sharedData.total, sharedData.currency)
                    })`}
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
    </div>
  );
};

export default CheckoutPaymentPage;
