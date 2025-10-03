// src/components/CartPopup.jsx
import React, { useContext } from "react";
import { CartContext } from "../context/cartcontext";
import { useNavigate } from "react-router-dom";

export default function CartPopup() {
  const {
    cartItems,
    updateQty,
    removeFromCart,
    clearCart,
    isCartOpen,
    setIsCartOpen,
  } = useContext(CartContext);

  const navigate = useNavigate();

  if (!isCartOpen) return null;

  const total = cartItems.reduce((sum, i) => sum + i.price * i.qty, 0);

  const handleCheckout = () => {
    setIsCartOpen(false);
    navigate("/checkout", { state: { cartItems, total } });
    setTimeout(() => {
      clearCart(); // ✅ clear cart after navigation
    }, 200);
  };

  return (
    <section>
    <div className="fixed top-0 right-0 w-80 h-full bg-white shadow-lg z-50 p-6 overflow-y-auto">
      {/* Close button */}
      <button
        onClick={() => setIsCartOpen(false)}
        className="absolute top-4 right-4 text-2xl font-bold"
      >
        ×
      </button>

      <h2 className="text-lg font-semibold mb-6">Your Cart</h2>

      {/* If cart empty */}
      {cartItems.length === 0 ? (
        <p className="text-gray-500">Your cart is empty</p>
      ) : (
        <>
          {/* Cart items list */}
          {cartItems.map((item) => (
            <div
              key={item.id}
              className="mb-6 flex items-start gap-4 border-b pb-4"
            >
              {/* Image */}
              <div className="w-20 h-20 flex-shrink-0">
                <img
                  src={item.image_url}
                  alt={item.title}
                  className="w-full h-full object-contain rounded-md border"
                />
              </div>

              {/* Details */}
              <div className="flex-1">
                <h3 className="text-sm font-medium text-gray-800 mb-1">
                  {item.title}
                </h3>

                {/* Quantity controls */}
                <div className="flex items-center gap-2 mb-2">
                  <button
                    onClick={() => updateQty(item.id, item.qty - 1)}
                    className="px-2 py-1 bg-gray-200 rounded"
                  >
                    −
                  </button>
                  <span className="px-3 py-1 bg-gray-100 rounded">
                    {item.qty}
                  </span>
                  <button
                    onClick={() => updateQty(item.id, item.qty + 1)}
                    className="px-2 py-1 bg-gray-200 rounded"
                  >
                    +
                  </button>
                </div>

                {/* Price */}
                <p className="text-sm mb-2">₹{item.price * item.qty}</p>

                {/* Remove link */}
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="text-red-500 text-xs underline"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}

          {/* Minimum amount message */}
          {total < 200 && (
            <div className="bg-orange-100 text-orange-600 text-xs px-3 py-2 rounded mb-4">
              Add ₹{200 - total} more to save on visitation fees
            </div>
          )}

          {/* Total */}
          <div className="flex justify-between items-center mb-6 font-medium">
            <span>Total:</span>
            <span>₹{total}</span>
          </div>

          {/* Book now button */}
          <button
            onClick={handleCheckout}
            className="bg-orange-500 hover:bg-orange-600 text-white font-medium w-full py-3 rounded-md"
          >
            Book now
          </button>
        </>
      )}
         
 <div className="border rounded-lg p-4 mb-6 flex items-center justify-between">
        <div>
          <p className="font-medium text-sm">Get visitation fees offer</p>
          <p className="text-xs text-gray-500">On orders above ₹200</p>
        </div>
        <button className="text-orange-600 text-sm font-medium">
          View more offers
        </button>
      </div>

      {/* UC Promise */}
      <div className="border rounded-lg p-4">
        <h4 className="font-semibold text-sm mb-2">UC promise</h4>
        <ul className="text-xs text-gray-700 space-y-1">
          <li>✓ Verified professionals</li>
          <li>✓ Hassle free booking</li>
          <li>✓ Transparent pricing</li>
        </ul>
      </div>
    </div>
 
      </section>
  );
}

    