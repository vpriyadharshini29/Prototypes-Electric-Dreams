import React, { useEffect, useState } from "react";
import api from "../api";

export default function AreaPage() {
  const [section, setSection] = useState(null);

  useEffect(() => {
    api.get("areasection/")
      .then((res) => {
        if (res.data.length > 0) setSection(res.data[0]);
      })
      .catch((err) => console.error(err));
  }, []);

  if (!section) return <p>Loading...</p>;

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      {/* Title */}
      <h2 className="text-2xl font-semibold text-center text-orange-600">
        {section.area_title}
      </h2>

      {/* Subtitle */}
      <p className="text-center text-gray-700 mt-2">{section.area_subtitle}</p>

      {/* Areas Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-6">
        {section.areas.map((area) => (
          <div
            key={area.id}
            className="bg-gray-100 text-gray-800 px-4 py-2 rounded-md text-center"
          >
            {area.name}
          </div>
        ))}
      </div>

      {/* CTA Section */}
      <div className="bg-orange-600 text-white rounded-xl mt-10 flex flex-col sm:flex-row justify-between items-center p-6">
        <p className="font-semibold text-lg">{section.area_cta_text}</p>
        <a
          href={section.area_cta_button_link}
          className="bg-white text-orange-600 font-bold px-6 py-3 rounded-lg mt-4 sm:mt-0"
        >
          {section.area_cta_button_text}
        </a>
      </div>

      {/* Optional Image */}
      {section.area_image && (
        <div className="mt-6">
          <img
            src={section.area_image}
            alt="Area Visual"
            className="w-full rounded-lg"
          />
        </div>
      )}
    </div>
  );
}
