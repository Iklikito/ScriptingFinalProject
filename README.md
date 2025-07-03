E-Commerce Website — Final Scripting Project

Getting Started
---------------

1. Clone the repository.
2. Run the following command to install all dependencies:
   npm install
3. Start the development server:
   npm start

Project Overview
----------------

This project is a complete e-commerce website built using React. 
It begins at the /categories/all endpoint, where all products are rendered dynamically 
based on a JSON file used as a simple product database.

Navigation Bar
--------------

The navigation bar includes the following elements:

- Category Links:
  * Women       → /categories/women
  * Men         → /categories/men
  * Kids        → /categories/kids
  Clicking on a category filters and displays related products.

- Logo:
  Directs the user back to the homepage (/categories/all).

- Currency Selector:
  Opens a dropdown menu with multiple currency options.
  Selecting a currency updates all product prices across the website.

- Cart Button:
  Opens the cart overlay. Displays the number of items in the cart.

Cart Overlay Functionality
--------------------------

- Displays current items in the cart.
- Allows quantity to be increased or decreased.
- Allows size selection.
- Displays total cost of items.
- Buttons:
  * View Cart → Goes to /cart-page
  * Checkout → Proceeds to checkout (only if cart is not empty)

Cart Page — /cart-page
----------------------

- Displays all cart contents in full detail.
- “Continue” button redirects user to /shipping-info

Product List & Details
----------------------

Product List:
- Renders product cards.
- Hovering on a product reveals the “Add to Cart” button.
- Clicking a card opens the product detail view at /product-detail-page/:id.

Product Detail Page:
- Shows larger product image and thumbnails.
- Allows selecting a size before adding to cart.
- Same size selection logic as the cart overlay.

Add to Cart Logic
-----------------

- The same item with the same size cannot be added more than once. (Adding the same item with same size only increases the quantity)
  Use the + and − buttons in the cart overlay to change quantity.
- The same item can be added more than once only if different sizes are selected.
- Size must be selected before adding to cart or proceeding to checkout.

Checkout Process
----------------

1. Shipping Info — /shipping-info
   - Requires valid email or phone number.
   - Requires full shipping address.
   - “Shipping note” field is optional.

2. Shipping Method — /shipping-method
   - Previously entered shipping data is auto-filled.
   - User must select a shipping option (affects final price).

3. Payment — /checkout-payment
   - Requires:
     * Valid credit card number
     * Expiration date
     * CVV
     * Cardholder name (must not be empty)

4. Confirmation — /payment-confirmation
   - Shows:
     * Order ID
     * Purchased product list
     * Total amount paid
     * Option to return to /categories/all

Contributors
------------

Scripting Final Project by:

- Mariam Tarkashvili – Navigation Bar, Product List Rendering
- Aleksandre Dididze – Cart Overlay, Cart Page, Product Detail Page
- Davit Kvartskhava – Shipping Info, Checkout & Payment Pages, Payment Confirmation
- Irakli Diasamidze – Component Integration, React Router Configuration
