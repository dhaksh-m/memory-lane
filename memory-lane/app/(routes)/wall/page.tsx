"use client";

import { useState } from "react";
import { motion } from "framer-motion";

// 🔥 MANUAL MESSAGES (EDIT HERE ANYTIME)
const manualMessages = [
  {
    id: "1",
    text: "Hey all, Hope this project turns to be the best place to look back at our memories ❤️",
    name: "Dhaksh",
  },
  {
    id: "2",
    text: "College life will be crazy and unforgettable!",
    name: "Anonymous",
  },
  {
    id: "3",
    text: "We will miss these days 🥲",
    name: "Anonymous",
  },
  {
    id: "4",
    text: "From strangers to family 💯",
    name: "Anonymous",
  },
  {
    id: "5",
    text: "Our memories = pure happiness ✨ No matter where life takes us, our memories will always keep us close. Friends like you make every moment special.",
    name: "Pallavi",
  },
];

export default function WallPage() {
  const [messages] = useState(manualMessages);

  return (
    <main className="min-h-screen bg-[#020617] pt-32 px-6 md:px-12 text-white">

      <div className="max-w-7xl mx-auto">

        {/* TITLE */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-semibold">
            The Wall 📝
          </h1>
        </div>

        {/* MASONRY */}
        <div className="columns-2 md:columns-4 gap-6">

          {messages.map((note, i) => (
            <motion.div
              key={note.id || i}
              className="mb-6 break-inside-avoid"

              initial={{
                opacity: 0,
                y: -80,
                rotate: -5,
                scale: 0.9,
              }}

              animate={{
                opacity: 1,
                y: 0,
                rotate: Math.random() * 6 - 3,
                scale: 1,
              }}

              transition={{
                delay: (i % 10) * 0.15,
                duration: 0.5,
                ease: "easeOut",
              }}
            >
              <div
                className={`p-4 rounded-md shadow-lg relative
                ${i % 2 === 0 ? "bg-[#fff8dc]" : "bg-white"}
                text-black hover:scale-105 transition`}
              >

                {/* Tape */}
                <div
                  className="absolute top-[-12px] left-1/2 -translate-x-1/2 w-20 h-4 rounded-sm"
                  style={{
                    background: "rgba(255,255,255,0.55)",
                    backdropFilter: "blur(2px)",
                    boxShadow: "0 2px 6px rgba(0,0,0,0.25)",
                    transform: "rotate(-6deg)",
                    clipPath:
                      "polygon(5% 0%, 95% 0%, 100% 50%, 95% 100%, 5% 100%, 0% 50%)",
                  }}
                />

                {/* TEXT */}
                <p className="font-handwriting text-[15px] leading-relaxed whitespace-pre-wrap">
                  “{note.text}”
                </p>

                {/* NAME */}
                <p className="mt-4 text-sm font-semibold opacity-70">
                  {note.name || "Anonymous"}
                </p>

              </div>
            </motion.div>
          ))}

        </div>

      </div>
    </main>
  );
}