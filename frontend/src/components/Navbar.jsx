import React, { useEffect, useState, useContext } from "react";
import api from "../api";
import { CartContext } from "../context/cartcontext";

export default function Navbar() {
  const [data, setData] = useState({ logo: {}, nav_items: [] });
  const { cartItems, setIsCartOpen } = useContext(CartContext);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null); // ✅ For mobile dropdowns

  useEffect(() => {
    api
      .get("navbar/")
      .then((res) => setData(res.data))
      .catch(console.error);
  }, []);

  return (
    <header className="bg-white relative z-50">
      <div className="border-b border-orange-600">
        {/* 🔹 First line (logo + call + book now) */}
        <div className="container mx-auto flex items-center justify-between p-4">
          {/* Left: Logo */}
          <div className="flex items-center gap-4">
            <div className="w-24 sm:w-36">
              {data.logo?.image ? (
                <img
                  src={data.logo.image}
                  alt={data.logo.alt_text || "logo"}
                  className="w-full"
                />
              ) : (
                <div className="text-orange-600 font-semibold text-sm sm:text-base">
                  Electric dreams
                </div>
              )}
            </div>
          </div>

          {/* Right: Call + Book Now + Hamburger */}
          <div className="flex items-center gap-4 sm:gap-6">
            <button className="hidden lg:inline-block bg-orange-600 text-white rounded-full px-4 py-2 text-sm hover:bg-orange-700 transition">
              Call (+91)1234567890
            </button>
            <button className="border border-orange-600 rounded-full px-3 py-1 sm:px-4 sm:py-2 text-orange-600 text-sm sm:text-base hover:bg-orange-50 transition">
              Book Now
            </button>
            <button
              className="lg:hidden text-orange-600 text-2xl focus:outline-none"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? "✕" : "☰"}
            </button>
          </div>
        </div>

        {/* 🔹 Second line (orange navbar) */}
        <nav
          className={`bg-orange-600 transition-all duration-300 ease-in-out
            ${isMobileMenuOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0 overflow-hidden"} 
            lg:max-h-none lg:opacity-100 lg:block relative z-50 lg:overflow-visible`}
        >
          <div className="container mx-auto flex flex-col lg:flex-row items-center justify-between p-4 text-white">
            {/* Left: Search + nav items */}
            <div className="flex flex-col lg:flex-row items-center gap-4 lg:gap-6 w-full">
              <div className="w-full lg:w-80 xl:w-96">
                <input
                  placeholder="Search electricians"
                  className="w-full rounded-full border p-2 lg:p-3 text-black text-sm lg:text-base focus:outline-none focus:ring-2 focus:ring-orange-600"
                />
              </div>

              <div className="flex flex-col lg:flex-row gap-4 lg:gap-6 w-full lg:w-auto">
                {data.nav_items?.map((item, index) => (
                  <div key={item.title} className="relative group">
                    {/* Parent link */}
                    <a
                      href={item.url || "#"}
                      className="hover:underline text-sm lg:text-base flex items-center justify-between lg:inline-block"
                      onClick={(e) => {
                        if (item.children?.length > 0 && window.innerWidth < 1024) {
                          e.preventDefault(); // prevent navigation on mobile if dropdown exists
                          setOpenDropdown(openDropdown === index ? null : index);
                        }
                      }}
                    >
                      {item.title}
                      {/* Mobile caret */}
                      {item.children?.length > 0 && (
                        <span className="ml-2 lg:hidden">
                          {openDropdown === index ? "▲" : "▼"}
                        </span>
                      )}
                    </a>

                    {/* Dropdown - Desktop hover / Mobile click */}
                    {item.children?.length > 0 && (
                      <div
                        className={`
                          absolute lg:group-hover:block hidden left-0 mt-2 w-48 bg-white text-black rounded shadow-lg z-[9999] animate-fade-slide
                          ${openDropdown === index ? "block relative mt-2 lg:hidden" : "hidden lg:group-hover:block"}
                        `}
                      >
                        {item.children.map((child) => (
                          <a
                            key={child.title}
                            href={child.url}
                            className="block px-4 py-2 text-sm hover:bg-orange-100 transition"
                          >
                            {child.title}
                          </a>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Cart button */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative text-white text-lg lg:text-xl mt-4 lg:mt-0 hover:text-orange-200 transition"
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

      {/* 🔹 Dropdown Animation */}
      <style>{`
        @keyframes fadeSlide {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-slide {
          animation: fadeSlide 0.2s ease-out;
        }
      `}</style>
    </header>
  );
}
