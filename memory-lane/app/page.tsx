"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const images = [
  "/memories/mem1.jpg",
  "/memories/mem2.jpg",
  "/memories/mem3.jpg",
];

export default function Home() {
  const [index, setIndex] = useState(0);
  const router = useRouter();

  // 🎬 Cinematic slideshow timing
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 6000); // slower = more premium
    return () => clearInterval(interval);
  }, []);

  // 🖱🚀 Scroll transition to Journey page
  useEffect(() => {
    let timeout: NodeJS.Timeout;
    const handleWheel = (e: WheelEvent) => {
      const currentScrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      
      // If we're at the very bottom of the page and spinning the wheel down
      if (currentScrollY + windowHeight >= documentHeight - 10) {
        if (e.deltaY > 50) {
          clearTimeout(timeout);
          timeout = setTimeout(() => {
            router.push("/journey");
          }, 100); // debounce to avoid double trigger
        }
      }
    };

    window.addEventListener("wheel", handleWheel);
    return () => {
      window.removeEventListener("wheel", handleWheel);
      clearTimeout(timeout);
    };
  }, [router]);

  // 🔽 Scroll
  const scrollToNext = () => {
    document
      .getElementById("next-section")
      ?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <main className="w-full text-white">

      {/* 🔥 HERO */}
      <section className="relative min-h-screen overflow-hidden">

        {/* 🎥 Background */}
        <div className="absolute inset-0">

          <AnimatePresence mode="wait">
            <motion.img
              key={images[index]}
              src={images[index]}
              initial={{ opacity: 0, scale: 1.15, filter: "blur(10px)" }}
              animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
              exit={{ opacity: 0, scale: 1.05, filter: "blur(6px)" }}
              transition={{ duration: 2, ease: "easeInOut" }}
              className="absolute inset-0 w-full h-full object-cover brightness-90"
            />
          </AnimatePresence>

          {/* Dark overlay */}
          <div className="absolute inset-0 bg-black/70" />

          {/* Gradient glow */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(59,130,246,0.25),transparent_60%)]" />
        </div>

        {/* ✨ Content */}
        <div className="relative z-10 flex flex-col items-center justify-center text-center px-6 pt-32 pb-16 min-h-screen">

          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-xs tracking-[0.35em] text-yellow-400 uppercase mb-6"
          >
            A Journey We’ll Always Carry
          </motion.p>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="font-semibold leading-tight text-[40px] sm:text-[60px] md:text-[80px] lg:text-[96px]"
          >
            Batch{" "}
            <span className="text-blue-400 font-light">2025</span>
            <span className="mx-2 opacity-60">—</span>
            <span>29</span>
          </motion.h1>

          {/* Divider */}
          <motion.div
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 0.5 }}
            transition={{ delay: 0.6 }}
            className="w-20 h-[1px] bg-gray-400 my-8"
          />

          {/* Description */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="text-gray-300 max-w-xl text-sm md:text-base leading-relaxed"
          >
            Four years of laughter, late nights, and lessons learned.  
            Join us as we revisit the memories that shaped us.
          </motion.p>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="mt-14 flex flex-col items-center"
          >
            <button
              onClick={scrollToNext}
              className="text-xs tracking-[0.3em] text-gray-200 hover:text-white transition"
            >
              ENTER THE JOURNEY ↓
            </button>

            <div className="w-[1px] h-10 bg-gray-500 mt-4 opacity-50" />
          </motion.div>

        </div>
      </section>

      {/* ✨ NEXT SECTION */}
      <section
        id="next-section"
        className="min-h-screen flex items-center justify-center bg-[#020617] px-6 text-center"
      >
        <div className="max-w-2xl">
          <h2 className="text-3xl md:text-5xl font-semibold mb-6">
            Welcome to Memory Lane
          </h2>

            <p className="text-gray-400 text-base md:text-lg leading-relaxed max-w-2xl mx-auto">
              Explore your journey, revisit memories, and reconnect with the moments that defined your college life.
              <br />
              CREATED WITH ❤️ BY YOURS TRULY DHAKSH
              <br />
              <span className="text-yellow-400">
              @ BTech CSE 2025–29
              </span>
            </p>  
        </div>
      </section>

    </main>
  );
}