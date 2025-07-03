import React, { useState, useEffect, lazy, useMemo } from "react";
import { Routes, Route } from "react-router-dom";
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
  //const [cartItemIds, setCartItemIds] = useState([]);
  //const [quantities, setQuantities] = useState({});
  //const [sizes, setSizes] = useState({});

  const [cartItemIds, setCartItemIds] = useState(() => {
    const stored0 = localStorage.getItem("cartItemIds");
    return stored0 !== null ? JSON.parse(stored0) : [];
  });

  useEffect(() => {
    localStorage.setItem("cartItemIds", JSON.stringify(cartItemIds));
  }, [cartItemIds]);

  const [quantities, setQuantities] = useState(() => {
    const stored1 = localStorage.getItem("quantities");
    return stored1 !== null ? JSON.parse(stored1) : {};
  });

  useEffect(() => {
    localStorage.setItem("quantities", JSON.stringify(quantities));
  }, [quantities]);

  const [sizes, setSizes] = useState(() => {
    const stored1 = localStorage.getItem("sizes");
    return stored1 !== null ? JSON.parse(stored1) : {};
  });

  useEffect(() => {
    localStorage.setItem("sizes", JSON.stringify(sizes));
  }, [sizes]);

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

  const subtotal = useMemo(
    () =>
      cartItemIds.reduce(
        (sum, itemId) => sum + clothingData[itemId].price * quantities[itemId],
        0
      ),
    [cartItemIds, quantities]
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
      cartItemIds,
      setCartItemIds,
      quantities,
      setQuantities,
      sizes,
      setSizes,
      currency,
      setCurrency,
      paidShipping,
      setPaidShipping,
      subtotal,
      total,
    }),
    [checkoutData, cartItemIds, quantities, sizes, currency, paidShipping]
  );

  return (
    <Context.Provider value={sharedData}>
      <Routes>
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
