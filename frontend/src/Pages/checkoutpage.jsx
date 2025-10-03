import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

export default function CheckoutPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const [showPopup, setShowPopup] = useState(false);

  // form state
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
  });
  const [errors, setErrors] = useState({});

  // cart details
  const { cartItems = [], total = 0 } = location.state || {};
  const visitationFees = 60;
  const taxes = 19;
  const finalAmount = total + visitationFees + taxes;

  if (!cartItems.length) {
    return (
      <div className="p-10 text-center">
        <p className="text-gray-500">No items found in cart.</p>
        <button
          onClick={() => navigate("/")}
          className="mt-4 bg-orange-500 text-white px-6 py-2 rounded-md"
        >
          Go back to shop
        </button>
      </div>
    );
  }

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" }); // clear error on input
  };

  const validateForm = () => {
    let newErrors = {};
    if (!form.firstName.trim()) newErrors.firstName = "First name is required";
    if (!form.lastName.trim()) newErrors.lastName = "Last name is required";
    if (!form.email.trim()) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(form.email))
      newErrors.email = "Invalid email";
    if (!form.phone.trim()) newErrors.phone = "Phone is required";
    else if (!/^\d{10}$/.test(form.phone))
      newErrors.phone = "Phone must be 10 digits";
    if (!form.address.trim()) newErrors.address = "Address is required";
    return newErrors;
  };

  const handlePayNow = () => {
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return; // stop payment if errors exist
    }
    setShowPopup(true);
    setTimeout(() => {
      navigate("/"); // redirect home
    }, 2000);
  };

  return (
    <div className="flex flex-col md:flex-row gap-10 p-8 md:p-16 relative">
      {/* Left - Cart summary */}
      <div className="md:w-1/3 w-full bg-orange-500 p-6 rounded-2xl text-black shadow-md">
        {cartItems.map((item) => (
          <div key={item.id} className="mb-4">
            <div className="flex items-center gap-4">
              <img
                src={item.image_url}
                alt={item.title}
                className="w-16 h-16 rounded-md border object-cover"
              />
              <div>
                <h3 className="font-semibold text-sm text-gray-800">
                  {item.title}
                </h3>
                <p className="text-xs text-gray-500">
                  Light quantity : {item.qty}
                </p>
                <p className="text-sm font-medium">Amount: ₹{item.price}</p>
              </div>
            </div>
          </div>
        ))}

        <div className="border-t border-gray-300 mt-4 pt-4">
          <h4 className="font-semibold text-gray-800 mb-2">Payment summary</h4>
          <div className="flex justify-between text-sm mb-1">
            <span>Item total</span>
            <span>₹{total}</span>
          </div>
          <div className="flex justify-between text-sm mb-1">
            <span>Visitation fees</span>
            <span>₹{visitationFees}</span>
          </div>
          <div className="flex justify-between text-sm mb-1">
            <span>Taxes and fees</span>
            <span>₹{taxes}</span>
          </div>
          <div className="flex justify-between font-semibold text-base mt-2 border-t pt-2">
            <span>Total Amount</span>
            <span>₹{finalAmount}</span>
          </div>
          <div className="flex justify-between font-semibold text-lg mt-2">
            <span>Amount to pay</span>
            <span>₹{finalAmount}</span>
          </div>
        </div>
      </div>

      {/* Right - Checkout form */}
      <div className="flex-1 bg-white border rounded-2xl shadow-md p-8">
        <h2 className="text-xl font-semibold mb-6">Checkout</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <input
              type="text"
              name="firstName"
              value={form.firstName}
              onChange={handleChange}
              placeholder="First Name"
              className="border rounded-md px-3 py-2 text-sm w-full"
            />
            {errors.firstName && (
              <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>
            )}
          </div>
          <div>
            <input
              type="text"
              name="lastName"
              value={form.lastName}
              onChange={handleChange}
              placeholder="Last name"
              className="border rounded-md px-3 py-2 text-sm w-full"
            />
            {errors.lastName && (
              <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>
            )}
          </div>
          <div>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Email id"
              className="border rounded-md px-3 py-2 text-sm w-full"
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">{errors.email}</p>
            )}
          </div>
          <div>
            <input
              type="text"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              placeholder="Phone number"
              className="border rounded-md px-3 py-2 text-sm w-full"
            />
            {errors.phone && (
              <p className="text-red-500 text-xs mt-1">{errors.phone}</p>
            )}
          </div>
        </div>

        <div>
          <textarea
            name="address"
            value={form.address}
            onChange={handleChange}
            placeholder="Address"
            className="w-full border rounded-md px-3 py-2 text-sm mb-2"
            rows="3"
          />
          {errors.address && (
            <p className="text-red-500 text-xs">{errors.address}</p>
          )}
        </div>

        {/* Payment details */}
        <h3 className="font-semibold mb-4">Payment Details</h3>
        <div className="space-y-3 mb-6">
          <button className="w-full border py-3 rounded-md font-medium flex justify-center items-center">
            Pay with <span className="ml-2 text-green-600">UPI</span>
          </button>
          <button className="w-full border py-3 rounded-md font-medium flex justify-center items-center">
            Pay with <span className="ml-2 text-blue-600">Net Banking</span>
          </button>
          <button className="w-full border py-3 rounded-md font-medium flex justify-center items-center">
            Pay with <span className="ml-2 text-blue-700">Card</span>
          </button>
        </div>

        <button
          onClick={handlePayNow}
          className="bg-orange-500 hover:bg-orange-600 text-white font-medium w-full py-3 rounded-md"
        >
          Pay Now
        </button>
      </div>

      {/* Success popup */}
      <AnimatePresence>
        {showPopup && (
          <motion.div
            className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white rounded-2xl shadow-lg p-8 text-center"
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.5, opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-2xl font-bold text-green-600 mb-2">
                🎉 Ordered Successfully!
              </h2>
              <p className="text-gray-600">Redirecting to home...</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
