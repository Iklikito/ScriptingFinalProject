import "./ProductList.css";
import Bar from "./Bar";
import { useNavigate, useParams } from "react-router-dom";
import clothingData from "./clothingData.json";
import { useState, useContext } from "react";
import Context from "./context";

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

const ClothingCard = ({ itemId, image, title, price, showOverlay }) => {
  const navigate = useNavigate();
  const sharedData = useContext(Context);

  return (
    <div
      className="cardWrapper"
      onClick={() => navigate(`/product-detail-page/${itemId}`)}
    >
      <div className="imageContainer">
        <img
          src={image}
          alt={title}
          className={showOverlay ? "clothingImageDark" : "clothingImage"}
        />
        <button
          className={
            showOverlay ? "productListCartButton dark" : "productListCartButton"
          }
          onClick={(e) => {
            e.stopPropagation();
            if (!sharedData.cartItemIds.includes(itemId)) {
              sharedData.setCartItemIds((x) => [...x, itemId]);
              sharedData.setSizes((x) => {
                return {
                  ...x,
                  [itemId]: clothingData[itemId].defaultsize,
                };
              });
              sharedData.setQuantities((x) => {
                return {
                  ...x,
                  [itemId]: 1,
                };
              });
            }
          }}
        >
          <img
            src="/productListCartButton.png"
            alt="Add to cart"
            className={showOverlay ? "cartIconImageDark" : "cartIconImage"}
          />
        </button>
      </div>

      <ul className="clothingInfo">
        <li className="clothingTitle">{title}</li>
        <li className="clothingPrice">
          {sharedData.currency.substring(0, 1) +
            convertPrices(price, sharedData.currency)}
        </li>
      </ul>
    </div>
  );
};

const ProductList = () => {
  const params = useParams();
  const category = params.category ? params.category : "all";
  const [showOverlay, setShowOverlay] = useState(false);

  return (
    <>
      <Bar
        category={category}
        showOverlay={showOverlay}
        setShowOverlay={setShowOverlay}
      />
      <div
        className={
          showOverlay ? "clothingCardWrapperDark" : "clothingCardWrapper"
        }
      >
        <div className="productGridBlock">
          <h1 className="categoryTitle">Category name</h1>

          <div className="productListContainer">
            {clothingData
              .filter((item) => {
                return category == "all" || item.category == category;
              })
              .map((item) => (
                <ClothingCard
                  key={item.id}
                  itemId={item.id}
                  image={item.image}
                  title={item.title}
                  price={item.price}
                  showOverlay={showOverlay}
                />
              ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductList;
