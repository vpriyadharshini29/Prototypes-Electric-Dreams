import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../api";
import { Phone } from "lucide-react";

export default function CategoryServices() {
  const { categoryId } = useParams();
  const [services, setServices] = useState([]);
  const [pageTitle, setPageTitle] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    API.get(`services/${categoryId}/`)
      .then(res => {
        setServices(res.data);
        if (res.data.length > 0) {
          setPageTitle("Our Services");
        }
      })
      .catch(err => console.error(err));
  }, [categoryId]);

  return (
    <section>
    <section className="bg-white py-10 px-4 md:px-10">
      <div className="max-w-7xl mx-auto text-center mb-8">
        <h2 className="text-3xl md:text-4xl font-bold mb-2">{pageTitle}</h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {services.map(service => (
          <div
            key={service.id}
            className="bg-gray-50 rounded-lg shadow hover:shadow-lg transition overflow-hidden cursor-pointer"
            onClick={() => navigate(`/products/${service.id}`)}
          >
            <img
              src={service.image_url}
              alt={service.title}
              className="w-full h-82 object-cover"
            />
            {/* <div className="p-4">
               <h3 className="font-semibold text-lg mb-2">{service.title}</h3>
              <p className="text-gray-600 mb-2">{service.description}</p> 
            </div> */}
          </div>
        ))}
      </div>
    </section>
   
    <div className="bg-[#d3542a] p-6 md:p-10 rounded-md">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Left Side - Contact Info */}
        <div className="text-white">
          <h3 className="text-lg font-semibold">Get in Touch</h3>
          <h2 className="text-2xl font-bold mt-2">Contact Electric Dreams</h2>

          {/* 24/7 Call */}
          <div className="flex items-center bg-white text-black rounded-lg p-4 mt-6 shadow">
            <div className="bg-[#d3542a] text-white p-3 rounded-full">
              <Phone />
            </div>
            <div className="ml-4">
              <p className="font-semibold">Call us 24/7</p>
              <p>(+91)1234567890</p>
            </div>
          </div>

          {/* Business Hours */}
          <div className="flex items-center bg-white text-black rounded-lg p-4 mt-4 shadow">
            <div className="bg-[#d3542a] text-white p-3 rounded-full">
              <Phone />
            </div>
            <div className="ml-4">
              <p className="font-semibold">$ Callout free</p>
              <p>During business hours (7.00 AM - 5.00 PM)</p>
            </div>
          </div>
        </div>

        {/* Right Side - Form */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <form className="space-y-4">
            {/* First & Last Name */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium">First Name</label>
                <input
                  type="text"
                  placeholder="First Name"
                  className="mt-1 w-full border rounded-md p-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Last name</label>
                <input
                  type="text"
                  placeholder="Last Name"
                  className="mt-1 w-full border rounded-md p-2"
                />
              </div>
            </div>

            {/* Phone & Email */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium">Phone Number</label>
                <input
                  type="text"
                  placeholder="Phone number"
                  className="mt-1 w-full border rounded-md p-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Email address</label>
                <input
                  type="email"
                  placeholder="Email id"
                  className="mt-1 w-full border rounded-md p-2"
                />
              </div>
            </div>

            {/* Address */}
            <div>
              <label className="block text-sm font-medium">
                Address (Optional)
              </label>
              <input
                type="text"
                placeholder="Address"
                className="mt-1 w-full border rounded-md p-2"
              />
            </div>

            {/* Message */}
            <div>
              <label className="block text-sm font-medium">How can we help?</label>
              <textarea
                placeholder="Type your message..."
                className="mt-1 w-full border rounded-md p-2 h-24"
              ></textarea>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-[#d3542a] text-white font-semibold py-2 px-4 rounded-full hover:bg-[#b5421c] transition"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
    </section>
  );
}
