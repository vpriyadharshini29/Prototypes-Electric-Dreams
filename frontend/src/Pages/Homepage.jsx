import React, { useEffect, useState } from "react";
import api from "../api"; // ✅ your axios instance

export default function HomePage() {
  const [banners, setBanners] = useState([]);
  const [services, setServices] = useState([]);
  const [whyChooseUs, setWhyChooseUs] = useState(null);

  // New states
  const [steps, setSteps] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [brands, setBrands] = useState([]);
  const [faqs, setFaqs] = useState([]);
  const [contact, setContact] = useState(null);

  useEffect(() => {
    api.get("banners/").then((res) => setBanners(res.data));
    api.get("services/").then((res) => setServices(res.data));
    api.get("home-why-choose-us/").then((res) => setWhyChooseUs(res.data));

    // 🔹 New APIs
    api.get("home1-steps/").then((res) => setSteps(res.data));
    api.get("home1-testimonials/").then((res) => setTestimonials(res.data));
    api.get("home1-brands/").then((res) => setBrands(res.data));
    api.get("home1-faqs/").then((res) => setFaqs(res.data));
    api.get("home1-contact/").then((res) => setContact(res.data[0]));
  }, []);

  if (!whyChooseUs) return null;

  const stats = [
    { title: whyChooseUs.stat1_title, value: whyChooseUs.stat1_value, desc: whyChooseUs.stat1_desc },
    { title: whyChooseUs.stat2_title, value: whyChooseUs.stat2_value, desc: whyChooseUs.stat2_desc },
    { title: whyChooseUs.stat3_title, value: whyChooseUs.stat3_value, desc: whyChooseUs.stat3_desc },
    { title: whyChooseUs.stat4_title, value: whyChooseUs.stat4_value, desc: whyChooseUs.stat4_desc },
  ];

  return (
    <div className="w-full">

      {/* Custom animation style for auto-scroll services */}
      <style>
        {`
          @keyframes scroll {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
          .animate-scroll {
            display: flex;
            width: max-content;
            animation: scroll 20s linear infinite;
          }
          .animate-scroll:hover {
            animation-play-state: paused;
          }
        `}
      </style>

      {/* 🔹 Banner Section */}
      {banners.map((banner) => (
        <div
          key={banner.id}
          className="relative w-full text-center bg-gray-900 text-white"
        >
          <img
            src={banner.background_image}
            alt={banner.title}
            className="w-full h-[400px] object-cover opacity-70"
          />
          <div className="absolute inset-0 flex flex-col justify-center items-center">
            <h1 className="text-3xl font-bold">{banner.title}</h1>
            <p className="mt-2 text-lg max-w-2xl">{banner.subtitle}</p>
          </div>
        </div>
      ))}

      {/* 🔹 Services Section (Auto-scroll) */}
      <section className="py-10">
        <h2 className="text-2xl font-bold text-center mb-6">Our Services</h2>
        <div className="relative w-full overflow-hidden">
          <div className="animate-scroll gap-6">
            {services.concat(services).map((service, index) => (
              <div
                key={index}
                className="min-w-[250px] bg-white shadow-lg rounded-xl p-4 text-center flex-shrink-0 mx-2"
              >
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-64 object-cover rounded-lg mb-3"
                />
                {/* <h3 className="font-semibold">{service.title}</h3>
                <p className="text-gray-600 text-sm mt-2">{service.description}</p> */}
              </div> 
            ))}
          </div>
        </div>
      </section>

      {/* 🔹 Why Choose Us Section */}
      <section className="bg-blue-600 max-w-7xl mx-auto px-4 py-12 flex flex-col md:flex-row gap-8">
        <div className="md:w-1/2">
          <img
            src={whyChooseUs.image_url}
            alt="Why choose us"
            className="w-full h-full object-cover rounded-lg"
          />
        </div>
        <div className="md:w-1/2 flex flex-col gap-6">
          <h2 className="text-2xl font-semibold text-red-600">{whyChooseUs.heading}</h2>
          <p className="text-white font-semibold">{whyChooseUs.description}</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {stats.map((stat, idx) => (
              <div key={idx} className="bg-white border p-4 rounded-lg flex flex-col gap-2">
                <h3 className="font-bold">{stat.value}</h3>
                <h4 className="font-medium">{stat.title}</h4>
                <p className="text-gray-600 text-sm">{stat.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 🔹 Steps Section */}
      <section className="py-10 bg-gray-100">
        <h2 className="text-2xl font-bold text-center mb-6">Our Proven Three Step Process</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {steps.map((s) => (
            <div key={s.id} className="border p-6 rounded-lg shadow-md bg-white">
              <h3 className="text-xl font-semibold"> {s.title}</h3>
              <p className="text-gray-600 mt-2">{s.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 🔹 Testimonials Section */}
      <section className="bg-blue-600 text-white py-10">
        <h2 className="text-2xl font-bold text-center">What Our Happy Customers Are Saying</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-6 max-w-6xl mx-auto">
          {testimonials.map((t) => (
            <div key={t.id} className="bg-white text-black p-4 rounded-lg shadow">
              <p className="italic">"{t.feedback}"</p>
              <p className="mt-2 font-bold">{t.name}</p>
              <p className="text-sm">{t.role}</p>
              <p>{"⭐".repeat(t.stars)}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 🔹 Brands Section */}
      <section className="py-10">
        <h2 className="text-xl font-bold text-center">Trusted Brands We Work With</h2>
        <div className="flex flex-wrap justify-center gap-10 mt-4">
          {brands.map((b) => (
            <img key={b.id} src={b.logo}  className="h-16 object-contain" />
          ))}
        </div>
      </section>

      {/* 🔹 Contact Info Section */}
      {contact && (
        <section className="bg-orange-500 text-white p-6 text-center mt-8 rounded-lg">
          <h2 className="text-xl font-bold">{contact.heading}</h2>
          <a
            href={`tel:${contact.phone}`}
            className="bg-white text-orange-600 px-4 py-2 mt-4 inline-block rounded-md"
          >
            {contact.button_text}: {contact.phone}
          </a>
        </section>
      )}

      {/* 🔹 FAQ Section */}
      <section className="p-6 mt-6 max-w-4xl mx-auto">
        <h2 className="text-xl font-bold text-center">Frequently Asked Questions</h2>
        {faqs.map((f) => (
          <div key={f.id} className=" bg-gray-200 border rounded-md p-4 my-2">
            <h3 className="font-semibold text-black">{f.question}</h3>
            <p className="text-black">{f.answer}</p>
          </div>
        ))}
      </section>
    </div>
  );
}
