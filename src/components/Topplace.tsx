import React from "react";
import T1 from "../assets/img/Home/Top/1.webp";
import T2 from "../assets/img/Home/Top/2.webp";
import T3 from "../assets/img/Home/Top/3.webp";
import T4 from "../assets/img/Home/Top/4.webp";
import T5 from "../assets/img/Home/Top/5.webp";
import T6 from "../assets/img/Home/Top/5.webp";

const diveLocations = [
  {
    name: "Sigiriya Rock Fortress",
    location: "Central Sri Lanka",
    img: T1,
    description:
      "Climb the ancient rock citadel of Sigiriya, a UNESCO World Heritage Site known for its breathtaking views and historic frescoes.",
  },
  {
    name: "Ella Highlands",
    location: "Uva Province, Sri Lanka",
    img: T2,
    description:
      "Enjoy the misty mountains, tea plantations, and scenic train rides through Sri Lanka’s most picturesque highlands.",
  },
  {
    name: "Malé Atoll",
    location: "Maldives",
    img: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80",
    description:
      "Experience the turquoise lagoons and white-sand islands of the Maldives. Perfect for snorkeling, island hopping, and relaxation.",
  },
  {
    name: "Galle Fort",
    location: "Southern Sri Lanka",
    img: T4,
    description:
      "Step back in time as you walk the cobblestone streets of Galle Fort, a colonial-era landmark filled with charm and coastal beauty.",
  },
  {
    name: "Mirissa Beach",
    location: "Southern Sri Lanka",
    img: T5,
    description:
      "Famous for whale watching and golden sunsets, Mirissa offers the perfect balance of adventure and tranquility.",
  },
  {
    name: "Vaadhoo Island",
    location: "Raa Atoll, Maldives",
    img: "https://images.unsplash.com/photo-1500375592092-40eb2168fd21?auto=format&fit=crop&w=1200&q=80",
    description:
      "Witness the magical 'Sea of Stars' phenomenon, where glowing plankton illuminate the shoreline at night — a truly unforgettable sight.",
  },
];



const Topplace = () => {
  const topSix = diveLocations.slice(0, 6);

  return (
    <section className="bg-white py-20 mb-20">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <h2 className="text-4xl mb-3 text-[#00076b]">
          Top Travel Destinations
        </h2>
        <p className="text-gray-600 mb-12">
          Book your next escape to Sri Lanka’s most breathtaking destinations.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {topSix.map((loc, idx) => (
            <div
              key={idx}
              className="relative group overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer" data-aos="flip-left"
            >
              {/* Image */}
              <img
                src={loc.img}
                alt={loc.name}
                className="w-full h-64 object-cover transform group-hover:scale-110 transition-transform duration-500 ease-out"
              />

              {/* Always visible name + depth */}
              <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/60 via-black/10 to-transparent text-left">
                <h3 className="text-white text-2xl font-semibold drop-shadow-lg">
                  {loc.name}
                </h3>
                <p className="text-gray-200 text-sm mt-1 drop-shadow-md">
                  {loc.depth}
                </p>
              </div>

              {/* Hover description */}
              <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center p-6">
                <p className="text-white text-sm leading-relaxed text-center max-w-xs">
                  {loc.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Topplace;
