import React, { useEffect, useState, useContext } from "react";
import api from "../api";
import { CartContext } from "../context/cartcontext";
// import { CartContext } from "../context/CartContext";

export default function Navbar() {
  const [data, setData] = useState({ logo: {}, nav_items: [] });
  const { cartItems, setIsCartOpen } = useContext(CartContext);

  useEffect(() => {
    api.get("navbar/")
      .then((res) => setData(res.data))
      .catch(console.error);
  }, []);

  return (
    <header className="bg-white">
      <div className="border-b border-orange-600">
        {/* 🔹 First line (logo + call + book now) */}
        <div className="container mx-auto flex items-center justify-between p-4">
          {/* Left: Logo */}
          <div className="flex items-center gap-4">
            <div className="w-36">
              {data.logo?.image ? (
                <img src={data.logo.image} alt={data.logo.alt_text || "logo"} />
              ) : (
                <div className="text-orange-600 font-semibold">
                  Electric dreams
                </div>
              )}
            </div>
          </div>

          {/* Right: Call + Book Now */}
          <div className="flex items-center gap-6">
            <button className="call-pill hidden md:inline-block">
              Call(+91)1234567890
            </button>
            <button className="border border-orange-600 rounded-full px-4 py-2 text-orange-600">
              Book Now
            </button>
          </div>
        </div>

        {/* 🔹 Second line (orange navbar) */}
        <nav className="bg-orange-600">
          <div className="container mx-auto flex items-center justify-between p-4 text-white">
            {/* Left: Search + nav items */}
            <div className="flex items-center gap-6">
              <div className="hidden md:block w-96">
                <input
                  placeholder="Search electricians"
                  className="w-full rounded-full border p-3 text-black"
                />
              </div>

              {data.nav_items?.map((item) => (
                <div key={item.title} className="relative group">
                  <a href={item.url} className="hover:underline">
                    {item.title}
                  </a>

                  {/* Dropdown */}
                  {item.children?.length > 0 && (
  <div className="absolute left-0 mt-2 w-40 bg-white text-black rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity z-50">
    {item.children.map((child) => (
      <a
        key={child.title}
        href={child.url}
        className="block px-4 py-2 hover:bg-orange-100"
      >
        {child.title}
      </a>
    ))}
  </div>
)}

                </div>
              ))}
            </div>

            {/* Right: Cart button (ONLY in orange line) */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative text-white text-xl"
            >
              Cart
              {cartItems.length > 0 && (
                <span className="absolute -top-2 -right-3 bg-white text-orange-600 text-xs px-2 py-0.5 rounded-full">
                  {cartItems.length}
                </span>
              )}
            </button>
          </div>
        </nav>
      </div>
    </header>
  );
}
