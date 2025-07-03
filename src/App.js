import React, { useState, useEffect, lazy, useMemo } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Context from "./context.js";
import clothingData from "./clothingData.json";

const provinces = [
  { value: "", label: "Select Province" },
  { value: "IM", label: "Imereti (IM)" }, // Current location (Kutaisi)
  { value: "TB", label: "Tbilisi (TB)" },
  { value: "AJ", label: "Adjara (AJ)" },
];

const countries = [
  { value: "", label: "Select Country" },
  { value: "GE", label: "Georgia" }, // Current location
  { value: "US", label: "United States" },
  { value: "CA", label: "Canada" },
];

const ProductListPage = lazy(() => import("./ProductList.jsx"));
const CartPage = lazy(() => import("./CartPage.jsx"));
const ProductDetailPage = lazy(() => import("./ProductDetailPage.jsx"));
const ShippingInfoPage = lazy(() => import("./ShippingInfoPage.jsx"));
const ShippingMethodPage = lazy(() => import("./ShippingMethodPage.jsx"));
const CheckoutPaymentPage = lazy(() => import("./CheckoutPaymentPage.jsx"));
const PaymentConfirmationPage = lazy(() =>
  import("./PaymentConfirmationPage.jsx")
);

function App() {
  const [currency, setCurrency] = useState(() => {
    const stored2 = localStorage.getItem("currency");
    return stored2 !== null ? JSON.parse(stored2) : "$ USD";
  });

  useEffect(() => {
    localStorage.setItem("currency", JSON.stringify(currency));
  }, [currency]);

  const [checkoutData, setCheckoutData] = useState(() => {
    const stored = localStorage.getItem("checkoutData");
    return stored !== null ? JSON.parse(stored) : {};
  });

  useEffect(() => {
    localStorage.setItem("checkoutData", JSON.stringify(checkoutData));
  }, [checkoutData]);

  const [paidShipping, setPaidShipping] = useState(false);

  const [cartItems, setCartItems] = useState([]);

  const subtotal = useMemo(
    () =>
      cartItems.reduce(
        (sum, { id: itemId, quantity: itemQuantity, size: itemSize }) =>
          sum + clothingData[itemId].price * itemQuantity,
        0
      ),
    [cartItems]
  );

  const total = useMemo(
    () => subtotal + 4.99 * paidShipping,
    [subtotal, paidShipping]
  );

  const sharedData = useMemo(
    () => ({
      provinces,
      countries,
      checkoutData,
      setCheckoutData,
      clothingData,
      cartItems,
      setCartItems,
      currency,
      setCurrency,
      paidShipping,
      setPaidShipping,
      subtotal,
      total,
    }),
    [checkoutData, cartItems, currency, paidShipping]
  );

  return (
    <Context.Provider value={sharedData}>
      <Routes>
        <Route path="/" element={<Navigate to="/categories/all" />} />
        <Route path="/categories" element={<ProductListPage />} />
        <Route path="/categories/:category" element={<ProductListPage />} />
        <Route path="/cart-page" element={<CartPage />} />
        <Route path="/cart-page/:category" element={<CartPage />} />
        <Route
          path="/product-detail-page/:id"
          element={<ProductDetailPage />}
        />
        <Route path="/shipping-info" element={<ShippingInfoPage />} />
        <Route path="/shipping-method" element={<ShippingMethodPage />} />
        <Route path="/checkout-payment" element={<CheckoutPaymentPage />} />
        <Route
          path="/payment-confirmation"
          element={<PaymentConfirmationPage />}
        />
      </Routes>
    </Context.Provider>
  );
}

export default App;
