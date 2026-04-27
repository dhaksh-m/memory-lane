"use client";

import { motion } from "framer-motion";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

const timeline = [
  { title: "Semester 1", desc: "The beginning of everything." },
  { title: "Semester 2", desc: "New friends, new memories." },
  { title: "Semester 3", desc: "Work, stress, and growth." },
  { title: "Semester 4", desc: "The best moments begin." },
  { title: "Semester 5", desc: "Internships & reality hits." },
  { title: "Semester 6", desc: "Late nights & deep bonds." },
  { title: "Semester 7", desc: "The final stretch." },
  { title: "Semester 8", desc: "Goodbyes & nostalgia." },
];

export default function Journey() {
  const router = useRouter();

  // 🖱🚀 Scroll transition back to Home page
  useEffect(() => {
    let timeout: NodeJS.Timeout;
    const handleWheel = (e: WheelEvent) => {
      const currentScrollY = window.scrollY;

      // If we're at the very top of the page and spinning the wheel up
      if (currentScrollY <= 0) {
        if (e.deltaY < -50) {
          clearTimeout(timeout);
          timeout = setTimeout(() => {
            router.push("/");
          }, 100); // debounce to avoid double trigger
        }
      }
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    return () => {
      window.removeEventListener("wheel", handleWheel);
      clearTimeout(timeout);
    };
  }, [router]);

  return (
    <main className="min-h-screen bg-[#020617] text-white px-6 py-32">

      <h1 className="text-4xl md:text-6xl font-semibold text-center mb-20">
        The Journey
      </h1>

      <div className="relative max-w-4xl mx-auto">

        {/* Vertical line */}
        <div className="absolute left-1/2 top-0 w-[2px] h-full bg-gray-700 transform -translate-x-1/2" />

        {timeline.map((item, index) => {
          const isLeft = index % 2 === 0;

          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className={`mb-16 flex ${
                isLeft ? "justify-start" : "justify-end"
              }`}
            >
              <div className="w-full md:w-1/2 px-4">

                {/* Card */}
                <div className="bg-white/5 border border-white/10 backdrop-blur-md p-6 rounded-xl shadow-lg">

                  <h2 className="text-xl font-semibold mb-2">
                    {item.title}
                  </h2>

                  <p className="text-gray-400 text-sm">
                    {item.desc}
                  </p>
                </div>
              </div>

              {/* Dot */}
              <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-yellow-400 rounded-full border-4 border-[#020617]" />
            </motion.div>
          );
        })}
      </div>
    </main>
  );
}