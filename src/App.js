import React, { useState, useEffect, lazy } from "react";
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

const dummyCartItems = [
  {
    id: "prod_12345",
    name: "Apollo AeroGlide Running Shorts",
    type: "Running Short",
    price: 50.0,
    quantity: 1,
    image: "https://via.placeholder.com/60x60/87CEEB/FFFFFF?text=Short", // Placeholder image
  },
  {
    id: "prod_67890",
    name: "Nike Air Zoom Pegasus 40",
    type: "Running Shoes",
    price: 130.0,
    quantity: 1,
    image: "https://via.placeholder.com/60x60/FFD700/FFFFFF?text=Shoes", // Placeholder image
  },
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
  const [cartItemIds, setCartItemIds] = useState([]);
  const [quantities, setQuantities] = useState({});
  const [sizes, setSizes] = useState({});

  const [currency, setCurrency] = useState("$ USD");

  const [checkoutData, setCheckoutData] = useState(() => {
    const stored = localStorage.getItem("checkoutData");
    return stored !== null ? JSON.parse(stored) : {};
  });

  useEffect(() => {
    localStorage.setItem("checkoutData", JSON.stringify(checkoutData));
  }, [checkoutData]);

  // Calculate subtotal and initial total based on dummy cart items
  const subtotal = dummyCartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const initialTotal = subtotal; // Before shipping is calculated

  const [freeShipping, setFreeShipping] = useState(true);

  const sharedData = {
    provinces: provinces,
    countries: countries,
    checkoutData: checkoutData,
    setCheckoutData: setCheckoutData,
    clothingData: clothingData,
    cartItemIds: cartItemIds,
    setCartItemIds: setCartItemIds,
    quantities: quantities,
    setQuantities: setQuantities,
    sizes: sizes,
    setSizes: setSizes,
    currency: currency,
    setCurrency: setCurrency,
    freeShipping: freeShipping,
    setFreeShipping: setFreeShipping,
  };

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
