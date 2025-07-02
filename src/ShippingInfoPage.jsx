import "./ShippingInfoPage.css";
import { useContext, useState } from "react";
import ProductSummary from "./ProductSummary";
import Context from "./context";
import { useNavigate } from "react-router-dom";
import CheckoutHeader from "./CheckoutHeader";

const ShippingInfoPage = () => {
  const sharedData = useContext(Context);
  const navigate = useNavigate();

  const [formData, setFormData] = useState(
    sharedData.checkoutData.shippingInfo || {
      emailOrPhone: "",
      firstName: "",
      lastName: "",
      address: "",
      shippingNote: "",
      city: "",
      postalCode: "",
      province: "",
      country: "",
      saveInfo: false,
    }
  );

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex =
      /^\+?\d{1,4}?[-.\s]?\(?\d{2,}\)?[-.\s]?\d{3,4}[-.\s]?\d{3,4}$/;

    if (!formData.emailOrPhone) {
      newErrors.emailOrPhone = "Contact information is required.";
    } else if (
      !emailRegex.test(formData.emailOrPhone) &&
      !phoneRegex.test(formData.emailOrPhone)
    ) {
      newErrors.emailOrPhone = "Please enter a valid email or phone number.";
    }

    if (!formData.firstName) newErrors.firstName = "First Name is required.";
    if (!formData.lastName) newErrors.lastName = "Last Name is required.";
    if (!formData.address) newErrors.address = "Address is required.";
    if (!formData.city) newErrors.city = "City is required.";
    if (!formData.postalCode) newErrors.postalCode = "Postal Code is required.";
    if (!formData.province) newErrors.province = "Please select a Province.";
    if (!formData.country) newErrors.country = "Please select a Country.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
    if (errors[name]) {
      setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      sharedData.setCheckoutData((prev) => ({
        ...prev,
        shippingInfo: formData,
      }));
      navigate("/shipping-method");
    }
  };

  return (
    <div className="shipping-checkout-container">
      <div className="shipping-page-content">
        <div className="shipping-form-section">
          <CheckoutHeader />
          <h3 className="shipping-form-title">Contact</h3>
          <form onSubmit={handleSubmit}>
            <div className="shipping-form-group">
              <label htmlFor="emailOrPhone" className="shipping-form-label">
                Contact
              </label>
              <input
                type="text"
                id="emailOrPhone"
                name="emailOrPhone"
                placeholder="Email or mobile phone number"
                value={formData.emailOrPhone}
                onChange={handleChange}
                className={`shipping-form-input ${
                  errors.emailOrPhone ? "shipping-input-error" : ""
                }`}
              />
              {errors.emailOrPhone && (
                <p className="shipping-error-message">{errors.emailOrPhone}</p>
              )}
            </div>

            <h3 className="shipping-form-subtitle">Shipping Address</h3>
            <div className="shipping-form-row">
              <div className="shipping-half-width">
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  placeholder="First Name"
                  value={formData.firstName}
                  onChange={handleChange}
                  className={`shipping-form-input ${
                    errors.firstName ? "shipping-input-error" : ""
                  }`}
                />
                {errors.firstName && (
                  <p className="shipping-error-message">{errors.firstName}</p>
                )}
              </div>
              <div className="shipping-half-width">
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  placeholder="Last Name"
                  value={formData.lastName}
                  onChange={handleChange}
                  className={`shipping-form-input ${
                    errors.lastName ? "shipping-input-error" : ""
                  }`}
                />
                {errors.lastName && (
                  <p className="shipping-error-message">{errors.lastName}</p>
                )}
              </div>
            </div>

            <div className="shipping-form-row">
              <div className="shipping-half-width">
                <input
                  type="text"
                  id="address"
                  name="address"
                  placeholder="Address and number"
                  value={formData.address}
                  onChange={handleChange}
                  className={`shipping-form-input ${
                    errors.address ? "shipping-input-error" : ""
                  }`}
                />
                {errors.address && (
                  <p className="shipping-error-message">{errors.address}</p>
                )}
              </div>
              <div className="shipping-half-width">
                <input
                  type="text"
                  id="shippingNote"
                  name="shippingNote"
                  placeholder="Shipping note (optional)"
                  value={formData.shippingNote}
                  onChange={handleChange}
                  className="shipping-form-input"
                />
              </div>
            </div>

            <div className="shipping-form-row">
              <div className="shipping-third-width">
                <input
                  type="text"
                  id="city"
                  name="city"
                  placeholder="City"
                  value={formData.city}
                  onChange={handleChange}
                  className={`shipping-form-input ${
                    errors.city ? "shipping-input-error" : ""
                  }`}
                />
                {errors.city && (
                  <p className="shipping-error-message">{errors.city}</p>
                )}
              </div>
              <div className="shipping-third-width">
                <input
                  type="text"
                  id="postalCode"
                  name="postalCode"
                  placeholder="Postal Code"
                  value={formData.postalCode}
                  onChange={handleChange}
                  className={`shipping-form-input ${
                    errors.postalCode ? "shipping-input-error" : ""
                  }`}
                />
                {errors.postalCode && (
                  <p className="shipping-error-message">{errors.postalCode}</p>
                )}
              </div>
              <div className="shipping-third-width">
                <select
                  id="province"
                  name="province"
                  value={formData.province}
                  onChange={handleChange}
                  className={`shipping-form-input ${
                    errors.province ? "shipping-input-error" : ""
                  }`}
                >
                  {sharedData.provinces.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
                {errors.province && (
                  <p className="shipping-error-message">{errors.province}</p>
                )}
              </div>
            </div>

            <div className="shipping-form-group">
              <select
                id="country"
                name="country"
                value={formData.country}
                onChange={handleChange}
                className={`shipping-form-input ${
                  errors.country ? "shipping-input-error" : ""
                }`}
              >
                {sharedData.countries.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              {errors.country && (
                <p className="shipping-error-message">{errors.country}</p>
              )}
            </div>

            <div className="shipping-checkbox-group">
              <input
                type="checkbox"
                id="saveInfo"
                name="saveInfo"
                checked={formData.saveInfo}
                onChange={handleChange}
                className="shipping-checkbox-input"
              />
              <label htmlFor="saveInfo">
                Save this information for a future fast checkout
              </label>
            </div>

            <div className="shipping-form-actions">
              <button
                type="button"
                className="shipping-back-button"
                onClick={() => console.log("Back to Cart")}
              >
                &lt; Back to Cart
              </button>
              <button type="submit" className="shipping-primary-button">
                Go to shipping
              </button>
            </div>
          </form>
        </div>

        <ProductSummary
          items={sharedData.dummyCartItems}
          subtotal={sharedData.subtotal}
          shipping="Calculated at the next step"
          total={sharedData.total}
        />
      </div>
    </div>
  );
};

export default ShippingInfoPage;
