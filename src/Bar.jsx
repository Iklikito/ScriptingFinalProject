import { Navigate, NavLink, useLocation, useParams } from "react-router-dom";
import "./Bar.css";
import { useState, useContext } from "react";
import CartOverlay from "./CartOverlay.jsx";
import Context from "./context.js";
import { useNavigate } from "react-router-dom";

const CurrencyDropdown = () => {
  const [open, setOpen] = useState(false);
  const sharedData = useContext(Context);

  const toggleDropdown = () => setOpen(!open);
  const selectCurrency = (currency) => {
    sharedData.setCurrency(currency);
    setOpen(false);
  };

  return (
    <div className="currencyDropdownContainer">
      <div className="dropdownHeader" onClick={toggleDropdown}>
        <img
          src={open ? "/currencyDropdownOn.png" : "/currencyDropdownOff.png"}
          alt="toggle arrow"
          className="dropdownArrow"
        />
      </div>

      {open && (
        <ul className="dropdownMenu">
          {["$ USD", "€ EUR", "¥ JPY"].map((currency) => (
            <li
              key={currency}
              onClick={() => selectCurrency(currency)}
              className={
                currency === sharedData.currency ? "selectedCurrencyItem" : ""
              }
            >
              {currency}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

const Bar = ({ category, showOverlay, setShowOverlay }) => {
  const sharedData = useContext(Context);
  const location = useLocation();
  const navigate = useNavigate();

  const page = location.pathname.split("/")[1];

  return (
    <nav>
      <div className="prettyAlign">
        <ul className="navBarCategories">
          <li
            className={
              category == "women" ? "navBarCategory-active" : "navBarCategory"
            }
          >
            <NavLink
              to={
                page == "product-detail-page"
                  ? category == "women"
                    ? `/categories/all`
                    : `/categories/women`
                  : category == "women"
                  ? `/${page}/all`
                  : `/${page}/women`
              }
              className="navLink"
            >
              Women
            </NavLink>
          </li>
          <li
            className={
              category == "men" ? "navBarCategory-active" : "navBarCategory"
            }
          >
            <NavLink
              to={
                page == "product-detail-page"
                  ? category == "men"
                    ? `/categories/all`
                    : `/categories/men`
                  : category == "men"
                  ? `/${page}/all`
                  : `/${page}/men`
              }
              className="navLink"
            >
              Men
            </NavLink>
          </li>
          <li
            className={
              category == "kids" ? "navBarCategory-active" : "navBarCategory"
            }
          >
            <NavLink
              to={
                page == "product-detail-page"
                  ? category == "kids"
                    ? `/categories/all`
                    : `/categories/kids`
                  : category == "kids"
                  ? `/${page}/all`
                  : `/${page}/kids`
              }
              className="navLink"
            >
              Kids
            </NavLink>
          </li>
        </ul>

        <ul className="navBarLogoContainer">
          <li>
            <img
              src="/navBarLogo.png"
              onClick={() => {
                navigate("/categories/all");
              }}
              alt="Logo"
              className="navBarLogo"
            />
          </li>
        </ul>

        <ul className="navBarActions">
          <li>
            <CurrencyDropdown />
          </li>

          <li className="navCartWrapper">
            <div>
              <button
                className="navCartButton"
                onClick={() => {
                  setShowOverlay((p) => !p);
                }}
              >
                <img
                  src="/navBarCartButton.png"
                  alt="cart"
                  className="navBarCartImage"
                />
                {sharedData.cartItems.length > 0 && (
                  <div className="cartItemCount">
                    {sharedData.cartItems.reduce(
                      (acc, x) => acc + x.quantity,
                      0
                    )}
                  </div>
                )}
              </button>

              {showOverlay && <CartOverlay />}
            </div>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Bar;
