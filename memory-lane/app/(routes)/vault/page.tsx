"use client";

import { useState } from "react";

const EVENTS = [
  "MEMORIES",
  "FRESHERS DAY",
  "FLASH MOB",
  "AUTO EXPO",
  "TRADITIONAL DAY",
  "DJ NIGHT",
  "TECH FEST",
  "OTHER EVENT",
];

// 🔥 LOCAL IMAGES ONLY (make sure these files exist in /public/memories)
const images = [
  { src: "/memories/fresh1.jpg", event: "FRESHERS DAY" },
  { src: "/memories/fresh2.jpg", event: "FRESHERS DAY" },
  { src: "/memories/fresh3.jpg", event: "FRESHERS DAY" },
  { src: "/memories/fresh4.jpg", event: "FRESHERS DAY" },
  { src: "/memories/fresh5.jpg", event: "FRESHERS DAY" },

  { src: "/memories/flash1.jpg", event: "FLASH MOB" },
  { src: "/memories/flash2.jpg", event: "FLASH MOB" },
  { src: "/memories/flash3.jpg", event: "FLASH MOB" },

  { src: "/memories/auto1.jpg", event: "AUTO EXPO" },
  { src: "/memories/auto2.jpg", event: "AUTO EXPO" },
  { src: "/memories/auto3.jpg", event: "AUTO EXPO" },

  { src: "/memories/trad1.jpg", event: "TRADITIONAL DAY" },
  { src: "/memories/trad2.jpg", event: "TRADITIONAL DAY" },
  { src: "/memories/trad3.jpg", event: "TRADITIONAL DAY" },

  { src: "/memories/dj1.jpg", event: "DJ NIGHT" },
  { src: "/memories/dj2.jpg", event: "DJ NIGHT" },
  { src: "/memories/dj3.jpg", event: "DJ NIGHT" },
  { src: "/memories/dj4.jpg", event: "DJ NIGHT" },
  { src: "/memories/dj5.jpg", event: "DJ NIGHT" },
  { src: "/memories/dj6.jpg", event: "DJ NIGHT" },
  { src: "/memories/dj7.jpg", event: "DJ NIGHT" },
  { src: "/memories/dj8.jpg", event: "DJ NIGHT" },
  { src: "/memories/dj9.jpg", event: "DJ NIGHT" },
  { src: "/memories/dj10.jpg", event: "DJ NIGHT" },
  { src: "/memories/dj11.jpg", event: "DJ NIGHT" },
  { src: "/memories/dj12.jpg", event: "DJ NIGHT" },


  { src: "/memories/tech1.jpg", event: "TECH FEST" },

  { src: "/memories/other1.jpg", event: "OTHER EVENT" },
  { src: "/memories/other2.jpg", event: "OTHER EVENT" },
  { src: "/memories/other3.jpg", event: "OTHER EVENT" },


];

export default function VaultPage() {
  const [activeTab, setActiveTab] = useState("MEMORIES");
  const [selectedImage, setSelectedImage] = useState<any>(null);

  const filteredImages =
    activeTab === "MEMORIES"
      ? images
      : images.filter((img) => img.event === activeTab);

  return (
    <main className="min-h-screen bg-[#020617] text-white pt-32 px-6 md:px-12">
      <div className="max-w-7xl mx-auto">

        {/* TITLE */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-semibold mb-2">
            Media Vault 📸
          </h1>
        </div>

        {/* TABS */}
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {EVENTS.map((event) => (
            <button
              key={event}
              onClick={() => setActiveTab(event)}
              className={`px-4 py-2 rounded-full border text-sm ${
                activeTab === event
                  ? "bg-yellow-500 text-black"
                  : "border-white/20"
              }`}
            >
              {event}
            </button>
          ))}
        </div>

        {/* MASONRY */}
        <div className="columns-2 md:columns-4 gap-4 md:gap-6">
          {filteredImages.map((img, index) => (
            <div
              key={img.src + index}
              className="mb-4 break-inside-avoid cursor-pointer"
              onClick={() => setSelectedImage(img)}
            >
              <img
                src={img.src}
                className="w-full h-auto rounded-xl"
                alt="memory"
              />
            </div>
          ))}
        </div>
      </div>

      {/* MODAL */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black/90 flex items-center justify-center z-50"
          onClick={() => setSelectedImage(null)}
        >
          <img
            src={selectedImage.src}
            className="max-h-[90%] max-w-[90%] rounded-xl"
            alt="preview"
          />

          <button
            onClick={() => setSelectedImage(null)}
            className="absolute top-6 right-6 text-white text-2xl"
          >
            ✕
          </button>
        </div>
      )}
    </main>
  );
}