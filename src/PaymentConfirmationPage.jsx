import "./PaymentConfirmationPage.css";
import { useContext } from "react";
import ProductSummary from "./ProductSummary";
import Context from "./context";
import CheckoutHeader from "./CheckoutHeader";
import { useNavigate } from "react-router-dom";

const PaymentConfirmationPage = () => {
  const sharedData = useContext(Context);
  const navigate = useNavigate();

  const shippingCost = sharedData.checkoutData.shippingMethod?.price || 0;
  const finalTotal = sharedData.subtotal + shippingCost;
  const formattedShipping =
    shippingCost === 0 ? "Free Shipping" : `$${shippingCost.toFixed(2)}`;

  return (
    <div className="payment-confirmation-checkout-container">
      <div className="payment-confirmation-page-content">
        <div className="payment-confirmation-form-section">
          <CheckoutHeader allGreen={true} />
          <div className="confirmation-message">
            <img
              src="/CheckCircle.svg"
              alt="Payment Success"
              className="checkmark-icon"
            />
            <h2 className="confirmation-title">Payment Confirmed!</h2>
            <p className="order-id">ORDER #{sharedData.checkoutData.orderId}</p>
            <p className="thank-you-message">
              Thank you for your purchase! Your order has been placed
              successfully and will be processed shortly. You will receive an
              email confirmation with more details.
            </p>
          </div>
          <div className="confirmation-actions">
            <button
              type="button"
              className="primary-button"
              onClick={() => {
                sharedData.setCartItems([]);
                localStorage.removeItem("cartItemIds");
                navigate("/categories/all");
              }}
            >
              Back to shopping
            </button>
          </div>
        </div>
        <ProductSummary shipping={formattedShipping} />
      </div>
    </div>
  );
};

export default PaymentConfirmationPage;
