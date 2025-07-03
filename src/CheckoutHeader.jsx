import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./CheckoutHeader.css";

function CheckoutHeader({ allGreen }) {
  const location = useLocation();
  const navigate = useNavigate();

  const steps = [
    { path: "/cart-page", label: "Cart" },
    { path: "/shipping-info", label: "Details" },
    { path: "/shipping-method", label: "Shipping" },
    { path: "/checkout-payment", label: "Payment" },
  ];

  const currentStepIndex = steps.findIndex(
    (step) => step.path === location.pathname
  );

  return (
    <div className="checkout-header-wrapper">
      <div className="breadcrumb-container">
        {steps.map((step, index) => (
          <React.Fragment key={step.path}>
            {index < currentStepIndex || allGreen ? (
              <span
                className="breadcrumb-link"
                onClick={() =>
                  allGreen ? console.log("") : navigate(step.path)
                }
              >
                {step.label}
              </span>
            ) : !allGreen && index === currentStepIndex ? (
              <span className="breadcrumb-current">{step.label}</span>
            ) : (
              <span className="breadcrumb-future">{step.label}</span>
            )}
            {index < steps.length - 1 && (
              <span className="breadcrumb-arrow">&gt;</span>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}

export default CheckoutHeader;
