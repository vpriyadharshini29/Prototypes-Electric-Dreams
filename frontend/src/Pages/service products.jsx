import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../api";
import { CartContext } from "../context/cartcontext";

export default function ServiceProducts() {
  const { serviceId } = useParams();
  const [products, setProducts] = useState([]);
  const [pageTitle, setPageTitle] = useState("");
  const navigate = useNavigate();
  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    API.get(`products/${serviceId}/`)
      .then((res) => {
        setProducts(res.data);
        if (res.data.length > 0) setPageTitle("Wall and Ceiling Light"); // or dynamic title if available
      })
      .catch((err) => console.error(err));
  }, [serviceId]);

  const handleViewDetails = (product) => {
    navigate(`/product/${product.id}`, { state: { product } });
  };

  return (
    <section className="bg-white">
      {/* 🔶 Top Banner */}
      <div className="bg-orange-600 text-white py-3 px-6 flex flex-col md:flex-row items-center justify-center md:justify-between">
        <span className="font-medium text-sm md:text-base mb-2 md:mb-0">
          Lighting Installation
        </span>
        <span className="font-semibold text-base md:text-lg text-center">
          Book Online or Call to Book Your Services
        </span>
      </div>

      {/* 🔶 Section Title */}
      <div className="max-w-7xl mx-auto text-left py-6 px-4 md:px-10">
        <h2 className="text-xl md:text-2xl font-bold">{pageTitle}</h2>
      </div>

      {/* 🔶 Product Grid */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-6 px-4 md:px-10 pb-10">
        {products.map((product) => (
          <div
            key={product.id}
            className="border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition flex items-center justify-between p-4"
          >
            {/* Left: Details */}
            <div className="flex-1 pr-4">
              <h3 className="font-semibold text-base mb-1">{product.title}</h3>
              <div className="flex items-center text-sm text-gray-600 mb-1">
                <span className="mr-1">⭐</span>
                {product.rating} • {product.reviews} reviews
              </div>
              <p className="text-gray-800 text-sm mb-2">
                ₹{product.price} <span className="text-xs text-gray-500">onwards</span>
              </p>

              <div className="flex items-center gap-4">
                <button
                  onClick={() => handleViewDetails(product)}
                  className="text-orange-600 font-semibold text-sm hover:underline"
                >
                  View Details
                </button>
              </div>
            </div>

            {/* Right: Image + Add Button */}
            <div className="w-28 flex-shrink-0 flex flex-col items-center">
              <div className="h-28 flex justify-center items-center mb-2">
                <img
                  src={product.image_url}
                  alt={product.title}
                  className="w-full h-full object-contain rounded-md"
                />
              </div>
              <button
                onClick={() => addToCart(product)}
                className="bg-orange-500 text-white px-4 py-1 text-sm rounded-full hover:bg-orange-600"
              >
                Add
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* 🔶 Footer */}
      <div className="bg-orange-600 text-white text-center py-6 px-4">
        <p className="font-semibold text-lg mb-2">
          Get in Touch with Electric Dreams Electrical Today
        </p>
        <button className="bg-white text-orange-600 px-6 py-2 rounded-full font-semibold shadow-md hover:bg-gray-100">
          Call: +91 1234567890
        </button>
      </div>
    </section>
  );
}
