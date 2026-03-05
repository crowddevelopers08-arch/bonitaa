"use client";

import { Phone, Calendar } from "lucide-react";
export default function MobileActionBar() {

  return (
    <div
      className="
        fixed bottom-0 left-0 right-0 z-50
        bg-white border-t shadow-lg
        flex md:hidden
      "
    >
      {/* Call Now */}
      <a
        href="tel:+91 9363707090"
        className="
          flex-1 flex items-center justify-center gap-2
          py-4 font-semibold
          text-sm
          text-black
          bg-[#ddb95a]
          active:scale-95 transition
        "
      >
        <Phone className="w-4 h-4" />
        Call Now
      </a>

      {/* Book Now */}
      <button
        onClick={() => {
    document.getElementById("Form")
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  }}
        className="
          flex-1 flex items-center justify-center gap-2
          py-4 font-semibold
          text-black
          bg-white
          text-sm
          border-l border-gray-200
          active:scale-95 transition
        "
      >
        <Calendar className="w-4 h-4" />
        Book Now
      </button>
    </div>
  );
}
