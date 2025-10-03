import React, { useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { CartContext } from "../context/cartcontext";
// import { CartContext } from "../context/cartcontext";

export default function ProductDetails() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { addToCart } = useContext(CartContext);
  const product = state?.product;

  if (!product) {
    return (
      <div className="p-6">
        <p>No product data found.</p>
        <button
          onClick={() => navigate(-1)}
          className="bg-orange-500 text-white px-4 py-2 rounded-lg mt-4"
        >
          Go Back
        </button>
      </div>
    );
  }

  return (
    <section>
    <section className="max-w-5xl mx-auto p-6">
      <div className="flex flex-col md:flex-row gap-6">
        {/* Left: Image */}
        <div className="flex-shrink-0 w-full md:w-1/3">
          <img
            src={product.image_url}
            alt={product.title}
            className="w-full h-64 object-contain rounded-lg border"
          />
        </div>

        {/* Right: Details */}
        <div className="flex-1">
          <h2 className="text-2xl font-bold mb-2">{product.title}</h2>
          <p className="text-gray-600 mb-2">
            ⭐ {product.rating} ({product.reviews} reviews)
          </p>
          <p className="text-lg font-semibold mb-2">₹{product.price}</p>
          <p className="text-sm text-gray-700 mb-4">{product.description}</p>

          <div className="flex gap-4">
            <button
              onClick={() => addToCart(product)}
              className="bg-orange-500 text-white px-6 py-2 rounded-full hover:bg-orange-600"
            >
              Add to Cart
            </button>
            <button className="bg-gray-200 text-gray-800 px-6 py-2 rounded-full hover:bg-gray-300">
              Call: +91 1234567890
            </button>
          </div>
        </div>
      </div>
    </section>
     <div className="w-full bg-white">
      {/* Our Process & Top Technicians */}
      <div className="grid md:grid-cols-2 gap-6 px-6 md:px-20 py-10">
        <div className="bg-blue-50 p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Our Process</h2>
          <ul className="space-y-3 text-gray-700">
            <li>✔ Inspection - We will check the space where you want to install the holder</li>
            <li>✔ Installation - We will install the holder with care</li>
            <li>✔ Cleanup - We will clean the area once work is done</li>
            <li>✔ Warranty - The service is covered by a 30-day warranty</li>
          </ul>
        </div>
        <div className="bg-blue-100 p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Top Technicians</h2>
          <ul className="space-y-3 text-gray-700">
            <li>✔ Background verified</li>
            <li>✔ Trained across major brands</li>
            <li>✔ Certified under skill training programme</li>
          </ul>
        </div>
      </div>

      {/* FAQs */}
      <div className="px-6 md:px-20 py-10">
        <h2 className="text-2xl font-semibold text-center mb-8">
          Frequently Asked Questions
        </h2>
        <div className="space-y-4">
          <div className="bg-gray-50 p-4 rounded-md shadow">
            <p className="font-semibold">Did you charge call-out fee?</p>
            <p className="text-gray-600">
              We charge a $45 call-out fee. During business hours, it’s only for the work we do – no hidden extras.
            </p>
          </div>
          <div className="bg-gray-50 p-4 rounded-md shadow">
            <p className="font-semibold">Do you offer emergency electrical services?</p>
            <p className="text-gray-600">
              Yes! We provide 24/7 emergency electrician services, ensuring you get fast and reliable support.
            </p>
          </div>
          <div className="bg-gray-50 p-4 rounded-md shadow">
            <p className="font-semibold">Do you work with business and commercial properties?</p>
            <p className="text-gray-600">
              Absolutely. We provide professional commercial electrical services across industries.
            </p>
          </div>
          <div className="bg-gray-50 p-4 rounded-md shadow">
            <p className="font-semibold">Are you licensed and insured?</p>
            <p className="text-gray-600">
              Yes! Our electricians are fully licensed and insured, covering all work with Australian safety standards.
            </p>
          </div>
        </div>
      </div>

      {/* Testimonials */}
      <div className="px-6 md:px-20 py-10 bg-gray-50">
        <h2 className="text-2xl font-semibold text-center mb-8">
          What Our Happy Customers Are Saying
        </h2>
        <div className="grid md:grid-cols-4 gap-6">
          <div className="bg-white p-4 rounded-lg shadow">
            <p className="text-yellow-500">★★★★★</p>
            <p className="text-gray-600 text-sm mt-2">
              Had my private power pole replaced, great service and price. Highly recommend.
            </p>
            <p className="mt-3 font-semibold text-sm">Stephen Watts</p>
            <p className="text-xs text-gray-500">Private Power Pole Installation</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <p className="text-yellow-500">★★★★★</p>
            <p className="text-gray-600 text-sm mt-2">
              Connor was very diligent in his work. Explained everything clearly and got the job done quickly.
            </p>
            <p className="mt-3 font-semibold text-sm">Kylie M</p>
            <p className="text-xs text-gray-500">Outdoor Lighting</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <p className="text-yellow-500">★★★★★</p>
            <p className="text-gray-600 text-sm mt-2">
              Connor did an excellent job fixing my lights and ceiling fan. Professional and friendly.
            </p>
            <p className="mt-3 font-semibold text-sm">Daniel Ruffing</p>
            <p className="text-xs text-gray-500">Lighting & Ceiling Fans</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <p className="text-yellow-500">★★★★★</p>
            <p className="text-gray-600 text-sm mt-2">
              Great service! Got called after hours for an emergency. They came quickly and fixed the issue.
            </p>
            <p className="mt-3 font-semibold text-sm">Deakon Crick</p>
            <p className="text-xs text-gray-500">Emergency Call-Out</p>
          </div>
        </div>
      </div>
    </div>
    </section>
  );
}
