"use client";

import { motion } from "framer-motion";


// 🔥 EDIT HERE (names + images)
const memories = [
  { name: "DHAKSH", image: "/yearbook/mem1.jpg" },
  { name: "THARUNI", image: "/yearbook/mem2.jpg" },
  { name: "Shiva chary", image: "/yearbook/mem3.jpg" },
  { name: "Sai Kiran", image: "/yearbook/mem4.jpg" },
  { name: "Venkat charan", image: "/yearbook/mem5.jpg" },
  { name: "Pallavi", image: "/yearbook/mem6.jpg" },
  { name: "Ranadeep", image: "/yearbook/mem7.jpg" },
  { name: "Bhavani", image: "/yearbook/mem8.jpg" },
  { name: "Akshaya", image: "/yearbook/mem9.jpg" }, 
  // //{ name: "Name 10", image: "/yearbook/mem10.jpg" }, 
  // //{ name: "Name 11", image: "/yearbook/mem11.jpg" }, 
  // //{ name: "Name 12", image: "/yearbook/mem12.jpg" }, 
  // //{ name: "Name 13", image: "/yearbook/mem13.jpg" }, 
  // //{ name: "Name 14", image: "/yearbook/mem14.jpg" }, 
  // //{ name: "Name 15", image: "/yearbook/mem15.jpg" }, 
  // //{ name: "Name 16", image: "/yearbook/mem16.jpg" }, 
  // //{ name: "Name 17", image: "/yearbook/mem17.jpg" }, 
  // //{ name: "Name 18", image: "/yearbook/mem18.jpg" }, 
  // //{ name: "Name 19", image: "/yearbook/mem19.jpg" }, 
  // //{ name: "Name 20", image: "/yearbook/mem20.jpg" }, 
  // //{ name: "Name 21", image: "/yearbook/mem21.jpg" }, 
  // //{ name: "Name 22", image: "/yearbook/mem22.jpg" }, 
  // //{ name: "Name 23", image: "/yearbook/mem23.jpg" }, 
  // //{ name: "Name 24", image: "/yearbook/mem24.jpg" }, 
  // //{ name: "Name 25", image: "/yearbook/mem25.jpg" }, 
  // //{ name: "Name 26", image: "/yearbook/mem26.jpg" }, 
  // 
  //{ name: "Name 27", image: "/yearbook/mem27.jpg" }, 
  // //{ name: "Name 28", image: "/yearbook/mem28.jpg" }, 
  // //{ name: "Name 29", image: "/yearbook/mem29.jpg" }, 
  // //{ name: "Name 30", image: "/yearbook/mem30.jpg" }, 
  // //{ name: "Name 31", image: "/yearbook/mem31.jpg" }, 
  // //{ name: "Name 32", image: "/yearbook/mem32.jpg" }, 
  // //{ name: "Name 33", image: "/yearbook/mem33.jpg" }, 
  // //{ name: "Name 34", image: "/yearbook/mem34.jpg" }, 
  // //{ name: "Name 35", image: "/yearbook/mem35.jpg" }, 
  // //{ name: "Name 36", image: "/yearbook/mem36.jpg" }, 
  // //{ name: "Name 37", image: "/yearbook/mem37.jpg" }, 
  // //{ name: "Name 38", image: "/yearbook/mem38.jpg" }, 
  // //{ name: "Name 39", image: "/yearbook/mem39.jpg" }, 
  // //{ name: "Name 40", image: "/yearbook/mem40.jpg" }, 
  // //{ name: "Name 41", image: "/yearbook/mem41.jpg" }, 
  // //{ name: "Name 42", image: "/yearbook/mem42.jpg" }, 
  // //{ name: "Name 43", image: "/yearbook/mem43.jpg" }, 
  // //{ name: "Name 44", image: "/yearbook/mem44.jpg" }, 
  // //{ name: "Name 45", image: "/yearbook/mem45.jpg" }, 
  // //{ name: "Name 46", image: "/yearbook/mem46.jpg" }, 
  // //{ name: "Name 47", image: "/yearbook/mem47.jpg" }, 
  // //{ name: "Name 48", image: "/yearbook/mem48.jpg" }, 
  // //{ name: "Name 49", image: "/yearbook/mem49.jpg" }, 
  // 
  //{ name: "Name 50", image: "/yearbook/mem50.jpg" }, 
  // //{ name: "Name 51", image: "/yearbook/mem51.jpg" }, 
  // //{ name: "Name 52", image: "/yearbook/mem52.jpg" }, 
  ////{ name: "Name 53", image: "/yearbook/mem53.jpg" }, 
  // //{ name: "Name 54", image: "/yearbook/mem54.jpg" }, 
  // //{ name: "Name 55", image: "/yearbook/mem55.jpg" }, 
  // //{ name: "Name 56", image: "/yearbook/mem56.jpg" }, 
  // //{ name: "Name 57", image: "/yearbook/mem57.jpg" }, 
  // //{ name: "Name 58", image: "/yearbook/mem58.jpg" },
  //  //{ name: "Name 59", image: "/yearbook/mem59.jpg" }, 
  // //{ name: "Name 60", image: "/yearbook/mem60.jpg" },
];


{/* Intro */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center pt-32 mb-16 px-4"
      >
        <h1 className="text-4xl md:text-6xl font-serif mb-4">
          The Class of '29 ✨
        </h1>

        <p className="text-gray-400 max-w-2xl mx-auto text-lg leading-relaxed">
          A collection of faces, stories, and moments that defined us.
          Late-night laughs, silent struggles, and friendships that turned into forever.
          This isn’t just a yearbook — it’s a piece of who we were.
        </p>
      </motion.div>

      
        {/* Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">

          {memories.map((mem, i) => (
            <motion.div
              key={i}
              className="relative group overflow-hidden rounded-2xl"
              whileHover={{ scale: 1.05 }}
            >
              {/* 🔥 CHANGED ONLY THIS PART */}
              <div className="w-full aspect-[3/4]">
                <img
                  src={mem.image}
                  alt={mem.name}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Glass Hover Overlay */}
              <div className="absolute inset-0 bg-white/10 backdrop-blur-md opacity-0 group-hover:opacity-100 transition duration-300 flex items-center justify-center">

                <p className="text-white text-lg font-semibold text-center px-2">
                  {mem.name}
                </p>

              </div>
            </motion.div>
          ))}

        </div>

