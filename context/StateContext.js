import React, { createContext, useContext, useState, useEffect } from "react";
import { toast } from "react-hot-toast";

// Create a context for state management
const Context = createContext();

export const StateContext = ({ children }) => {
  // Initialize states
  const [showCart, setShowCart] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalQuantities, setTotalQuantities] = useState(0);
  const [qty, setQty] = useState(1);
  const [size, setSize] = useState(null); // New state for size variation

  let foundProduct;
  let index;

  // Add product to cart
  const onAdd = (product, quantity) => {
    const checkProductInCart = cartItems.find(
      (item) => item._id === product._id && item.size === size // Compare size as well
    );

    setTotalPrice((prevTotalPrice) => prevTotalPrice + product.price * quantity);
    setTotalQuantities((prevTotalQuantities) => prevTotalQuantities + quantity);

    if (checkProductInCart) {
      const updatedCartItems = cartItems.map((cartProduct) => {
        if (cartProduct._id === product._id && cartProduct.size === size) {
          return {
            ...cartProduct,
            quantity: cartProduct.quantity + quantity,
          };
        }
      });

      setCartItems(updatedCartItems);
    } else {
      product.quantity = quantity;
      product.size = size; // Assign the selected size to the product

      setCartItems([...cartItems, { ...product }]);
    }

    toast.success(`${qty} ${product.name} added to the cart.`);
  };

  // Remove product from cart
  const onRemove = (product) => {
    foundProduct = cartItems.find(
      (item) => item._id === product._id && item.size === product.size // Compare size as well
    );
    const newCartItems = cartItems.filter(
      (item) => item._id !== product._id || item.size !== product.size
    );

    setTotalPrice(
      (prevTotalPrice) =>
        prevTotalPrice - foundProduct.price * foundProduct.quantity
    );
    setTotalQuantities(
      (prevTotalQuantities) => prevTotalQuantities - foundProduct.quantity
    );
    setCartItems(newCartItems);
  };

  // Toggle quantity of product in cart
  const toggleCartItemQuantity = (id, value, size) => {
    foundProduct = cartItems.find((item) => item._id === id && item.size === size);
    index = cartItems.findIndex((product) => product._id === id && product.size === size);
    const newCartItems = cartItems.filter(
      (item) => item._id !== id || item.size !== size
    );

    if (value === "inc") {
      setCartItems([
        ...newCartItems,
        { ...foundProduct, quantity: foundProduct.quantity + 1 },
      ]);
      setTotalPrice((prevTotalPrice) => prevTotalPrice + foundProduct.price);
      setTotalQuantities((prevTotalQuantities) => prevTotalQuantities + 1);
    } else if (value === "dec") {
      if (foundProduct.quantity > 1) {
        setCartItems([
          ...newCartItems,
          { ...foundProduct, quantity: foundProduct.quantity - 1 },
        ]);
        setTotalPrice((prevTotalPrice) => prevTotalPrice - foundProduct.price);
        setTotalQuantities((prevTotalQuantities) => prevTotalQuantities - 1);
      }
    }
  };

  // Decrease quantity in product details page
  const decQty = () => {
    setQty((prevQty) => {
      if (prevQty - 1 < 1) return 1;

      return prevQty - 1;
    });
  };

  // Increase quantity in product details page
  const incQty = () => {
    setQty((prevQty) => prevQty + 1);
  };

  return (
    <Context.Provider
      value={{
        showCart,
        setShowCart,
        cartItems,
        totalPrice,
        totalQuantities,
        qty,
        incQty,
        decQty,
        onAdd,
        toggleCartItemQuantity,
        onRemove,
        size,       // Make size available to the context consumers
        setSize,    // Make setSize available to the context consumers
      }}
    >
      {children}
    </Context.Provider>
  );
};

// Custom hook to use the state context
export const useStateContext = () => useContext(Context);
