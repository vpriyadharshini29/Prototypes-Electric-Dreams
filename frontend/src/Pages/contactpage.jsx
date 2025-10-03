import React, { useEffect, useState } from "react";
import API from "../api";
import api from "../api";

export default function ContactPage() {
  const [contactData, setContactData] = useState(null);

  useEffect(() => {
    api.get("contactpage/") 
      .then((res) => setContactData(res.data))
      .catch((err) => console.error(err));
  }, []);

  if (!contactData) return <p className="text-center p-6">Loading...</p>;

  const { info, form } = contactData;

  return (
    <div className="w-full">
      {/* Header */}
      <div className="bg-blue-600 text-white py-6 px-4">
        <h2 className="text-2xl font-bold">{info.title}</h2>
        <p>{info.subtitle}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
        {/* Left Section */}
        <div className="space-y-6">
          {/* Phone */}
          <div className="p-4 border rounded-lg shadow text-center">
            <p className="font-bold">{info.phone_label}</p>
            <p className="text-red-500">{info.phone_number}</p>
          </div>

          {/* Email */}
          <div className="p-4 border rounded-lg shadow text-center">
            <p className="font-bold">{info.email_label}</p>
            <p className="text-blue-600">{info.email_address}</p>
          </div>

          {/* Map */}
          {/* {info.map_image && (
            <div className="rounded-lg overflow-hidden shadow">
              <img src={info.map_image} alt="Map" className="w-full h-64 object-cover" />
            </div>
          )} */}
        </div>

        {/* Right Section - Form */}
        <form className="p-4 border rounded-lg shadow space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <input type="text" placeholder={form.first_name} className="p-2 border rounded w-full" />
            <input type="text" placeholder={form.last_name} className="p-2 border rounded w-full" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <input type="text" placeholder={form.phone_placeholder} className="p-2 border rounded w-full" />
            <input type="email" placeholder={form.email_placeholder} className="p-2 border rounded w-full" />
          </div>
          <input type="text" placeholder={form.address_placeholder} className="p-2 border rounded w-full" />
          <textarea placeholder={form.message_placeholder} className="p-2 border rounded w-full h-24"></textarea>
          <button type="submit" className="bg-orange-500 text-white px-6 py-2 rounded hover:bg-orange-600">
            {form.button_text}
          </button>
        </form>
      </div>
    </div>
  );
}
