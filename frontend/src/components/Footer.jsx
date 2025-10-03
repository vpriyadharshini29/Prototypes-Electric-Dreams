import React, { useEffect, useState } from "react";
import api from "../api";

export default function Footer() {
  const [data, setData] = useState({ sections: [], contact: {} });

  useEffect(() => {
    api.get("footer/")
      .then((res) => setData(res.data))
      .catch(console.error);
  }, []);

  return (
    <footer className="bg-orange-600 text-white mt-8">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-6 p-8">
        <div>
           <div className="w-36">
              {data.logo?.image ? (
                <img src={data.logo.image} alt={data.logo.alt_text || "logo"} />
              ) : (
                <div className="text-orange-600 font-semibold">Electric dreams</div>
              )}
            </div>
           <h3 className="font-semibold mb-4">Electric dreams</h3> 
          <p className="max-w-xs">
            Voltaic Electrical provides expert residential, commercial, and emergency electrical services across region.
          </p>
        </div>

        {data.sections?.map((sec, idx) => (
          <div key={idx}>
            <h4 className="font-semibold mb-2">{sec.title}</h4>
            <ul>
              {sec.links?.map((l, i) => (
                <li key={i}>
                  <a href={l.url || "#"} className="block py-1">
                    {l.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}

        {/* <div>
          <h4 className="font-semibold mb-2">Get in Touch</h4>
          <div className="space-y-2">
            <div>{data.contact.location}</div>
            <div>{data.contact.phone}</div>
            <div>{data.contact.email}</div>
          </div> 
        </div>*/}
      </div>
    </footer>
  );
}
