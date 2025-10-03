// src/Pages/AboutPage.jsx
import React, { useEffect, useState } from "react";
import api from "../api"; // axios instance



function ServiceCard({ img, title, text }) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col md:flex-row">
      {/* Left Image */}
      {img && (
        <div className="md:w-1/2 w-full">
          <img
            src={img}
            alt={title}
            className="w-full h-64 object-cover"
          />
        </div>
      )}

      {/* Right Content */}
      <div className="p-6 flex flex-col justify-center md:w-1/2 w-full">
        <h4 className="text-lg font-bold text-gray-800 mb-3">{title}</h4>
        <p className="text-sm text-gray-700 leading-relaxed">{text}</p>
      </div>
    </div>
  );
}


export default function AboutPage() {
  const [company, setCompany] = useState({});
  const [who, setWho] = useState({});
  const [services, setServices] = useState([]);
  const [commitment, setCommitment] = useState({});

  useEffect(() => {
    api.get("about/company-info/").then((res) => setCompany(res.data || {}));
    api.get("about/who-we-are/").then((res) => setWho(res.data || {}));
    api.get("about/services/").then((res) => setServices(res.data || []));
    api.get("about/commitment/").then((res) => setCommitment(res.data || {}));
  }, []);

  // Helper: safely get image
  const getImg = (obj) => obj?.image?.image || "";

  const bannerImg = getImg(company);
  const whoImg = getImg(who);
  const commitImg = getImg(commitment);

  return (
    <div className="text-gray-900 bg-white">
      {/* HERO / FULL-WIDTH BANNER */}
      <br/>
      <br/>
      {bannerImg && (
        <div className="w-full h-[320px] md:h-[400px] relative overflow-hidden">
          <img
            src={bannerImg}
            alt="Banner"
            className="w-full h-full object-cover"
          />
        </div>
      )}

      <div className="max-w-6xl mx-auto px-6 -mt-6 md:-mt-12 space-y-12">
        {/* WHO WE ARE */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-3">
              {who?.title || "Who we are?"}
            </h2>
            <p className="text-sm text-gray-700 leading-relaxed mb-4">
              {who?.description ||
                "Electric Dreams Group was founded with a passion for powering the community responsibly."}
            </p>

            {who?.license_info && (
              <ul className="text-sm text-gray-600 space-y-1">
                {who.license_info.split("\n").map((line, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    {/* <span className="mt-1 inline-block w-2 h-2 bg-[#d35400] rounded-full" /> */}
                    <span>{line}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {whoImg && (
            <div className="bg-white rounded-lg overflow-hidden shadow-md">
              <img
                src={whoImg}
                alt="Who we are"
                className="w-full h-64 object-cover"
              />
            </div>
          )}
        </div>

        {/* OUR SERVICES (FULL WIDTH) */}
        <div className="bg-white rounded-lg shadow-md p-6">
         

          <div className="grid grid-cols-1  gap-6">
            {services.map((s) => (
              <ServiceCard
                key={s.id}
                img={getImg(s)}
                title={s.name}
                text={s.description}
              />
            ))}
          </div>
        </div>

        {/* OUR COMMITMENT */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-3">
              {commitment?.title || "Our Commitment to You"}
            </h3>
            <p className="text-sm text-gray-700 leading-relaxed">
              {commitment?.description ||
                "At Electric Dreams Solutions Group, client satisfaction isn’t just a goal; it’s the foundation of everything we do."}
            </p>
          </div>

          {commitImg && (
            <div className="bg-white rounded-lg overflow-hidden shadow-md">
              <img
                src={commitImg}
                alt="Commitment"
                className="w-full h-64 object-cover"
              />
            </div>
          )}
        </div>
      </div>

      {/* FOOTER CTA */}
      <footer className="mt-12">
        <div className="bg-orange-600 text-white">
          <div className="max-w-6xl mx-auto px-6 py-8 flex flex-col md:flex-row items-center justify-between gap-4">
            <h4 className="text-xl md:text-2xl font-bold text-center md:text-left">
              Get in Touch with {company?.name || "Electric Dreams"} Electrical
              Today
            </h4>

            <a
              href={`tel:${company?.contact_number || "+911234567890"}`}
              className="inline-flex items-center justify-center px-6 py-3 bg-white text-orange-600 font-semibold rounded-full shadow-lg"
            >
              {company?.contact_number || "+911234567890"}
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
