// src/Pages/HomePage.jsx
import React, { useEffect, useState } from "react";
import api from "../api";

export default function Emergencyelectrican() {
  const [banners, setBanners] = useState([]);
  const [services, setServices] = useState([]);
  const [whyChoose, setWhyChoose] = useState([]);
  const [cta, setCta] = useState([]);
  const [formContent, setFormContent] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [bannerRes, servicesRes, whyChooseRes, ctaRes, formRes] =
          await Promise.all([
            api.get("emer-banners/"),
            api.get("emer-services/"),
            api.get("emer-why-choose/"),
            api.get("emer-call-to-action/"),
            api.get("emer-form-content/"),
          ]);

        setBanners(bannerRes.data);
        setServices(servicesRes.data);
        setWhyChoose(whyChooseRes.data);
        setCta(ctaRes.data);
        setFormContent(formRes.data);
      } catch (error) {
        console.error("Error fetching homepage data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="w-full">
      {/* 🔹 Hero Banner Image */}
      {banners.map((banner) => (
        <div key={banner.id}>
          <img
            src={banner.image}
            alt={banner.title}
            className="w-full h-[400px] object-cover"
          />

          {/* Content below banner */}
          <div className="container mx-auto flex flex-col md:flex-row justify-between items-start px-6 py-8">
            {/* Left Text */}
            <div className="md:w-2/3 pr-6">
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
                {banner.title}
              </h1>
              <p className="mt-3 text-gray-700">{banner.subtitle}</p>
              <div className="mt-6 flex items-center space-x-4">
                <button className="bg-orange-500 text-white px-6 py-3 rounded font-semibold">
                  {banner.button_text}
                </button>
              </div>
            </div>

            {/* Right Form */}
            {formContent.length > 0 && (
              <div className="md:w-1/3 bg-blue-600 text-white p-6 rounded-lg shadow-lg mt-6 md:mt-0">
                <h3 className="text-lg font-bold">{formContent[0].heading}</h3>
                <p className="text-sm mb-4">{formContent[0].description}</p>
                <form className="space-y-3">
                  <input
                    type="text"
                    placeholder={formContent[0].name_placeholder}
                    className="w-full p-2 rounded text-black"
                  />
                  <input
                    type="text"
                    placeholder={formContent[0].mobile_placeholder}
                    className="w-full p-2 rounded text-black"
                  />
                  <input
                    type="email"
                    placeholder={formContent[0].email_placeholder}
                    className="w-full p-2 rounded text-black"
                  />
                  <input
                    type="text"
                    placeholder={formContent[0].service_placeholder}
                    className="w-full p-2 rounded text-black"
                  />
                  <button
                    type="submit"
                    className="w-full bg-orange-500 text-white px-4 py-2 rounded"
                  >
                    {formContent[0].submit_text}
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      ))}

      {/* 🔹 Why Choose Our Electrician */}
      <div className="max-w-6xl mx-auto py-12">
        <h2 className="text-2xl font-bold text-center mb-6">
          Why choose our electrician?
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {services.map((service) => (
            <div
              key={service.id}
              className="bg-white p-6 rounded-lg shadow text-center"
            >
              <img
                src={service.icon}
                alt={service.title}
                className="mx-auto mb-3 w-12 h-12"
              />
              <h3 className="font-semibold">{service.title}</h3>
              {/* <p className="text-sm">{service.description}</p> */}
            </div>
          ))}
        </div>
      </div>

      {/* 🔹 Quality Workmanship */}
      {whyChoose.map((item) => (
        <div
          key={item.id}
          className=" bg-blue-600 flex flex-col md:flex-row items-center max-w-6xl mx-auto p-6 rounded-lg mb-10"
        >
          <div className=" md:w-1/2 pr-6">
            <h2 className="text-2xl font-bold">{item.title}</h2>
            <p className="mt-2 text-white">{item.description}</p>
            <div className="mt-6 flex space-x-4">
              <button className="bg-orange-500 text-white px-5 py-2 rounded">
                Call Now
              </button>
              <button className="bg-orange-500 text-white px-5 py-2 rounded">
                Send a Message
              </button>
            </div>
          </div>
          <div className="md:w-1/2">
            <img
              src={item.image}
              alt={item.title}
              className="rounded-lg shadow"
            />
          </div>
        </div>
      ))}

      {/* 🔹 Orange CTA Bar */}
      {cta.map((item) => (
        <div
          key={item.id}
          className="bg-orange-500 text-white py-6 text-center"
        >
          <h2 className="text-xl font-bold">{item.title}</h2>
          <button className="bg-white text-orange-500 px-6 py-2 mt-3 rounded font-semibold">
            Call: {item.phone}
          </button>
        </div>
        
      ))}
<br/>
      {/* 🔹 Bottom Info Section */}
     
      <div className="bg-blue-600 max-w-5xl mx-auto p-6">
        <h2 className="text-white font-bold mb-4">
          Signs you need an emergency electrician
        </h2>
        <p className="text-white leading-relaxed">
         

Many signs indicate when it's time to call a 24 hour electrician for help with your electrical problems. Here's a quick list of what to look for:
• Smoke coming out of your outlets - Smoke from power outlets can signify that the wiring in your home or business is faulty and needs to b replaced. If you don't have an after-hours electrician on hand to inspect the problem, it could cause a fire. If you see smoke or hear crackling sounds from an outlet, turn off the power at the breaker box and call an expert.
Smell of burning electronics - When you suddenly smell burning electronics, something might be wrong with your electrical system. If the smell is strong and seems to be coming from more than one device in your home, it's time to call an emergency electrician.
• Sudden isolated loss of power - If there is a sudden loss of power over a small area or within one room of your home, this could be due to a short circuit or blown fuse, or it could result from faulty wiring that needs to be repaired immediately.
• Circuit breaker keeps tripping or resetting - Circuit breakers are supposed to trip when they sense too much current, but if they trip too often, there might be something wrong with the wiring, or your breaker may be faulty.
        </p>
      </div>
    </div>
  );
}
