"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";

const navItems = [
  { name: "Home", href: "/" }, // ✅ added
  { name: "The Journey", href: "/journey" },
  { name: "Yearbook", href: "/yearbook" },
  { name: "Media Vault", href: "/vault" },
  { name: "The Wall", href: "/wall" },
  { name: "Faculty", href: "/faculty" }
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <div className="fixed top-0 left-0 w-full z-50 flex justify-center mt-4">
      <div className="relative backdrop-blur-md bg-white/5 border border-white/10 px-6 py-3 rounded-full flex items-center gap-8 shadow-lg">

        {/* Links */}
        <div className="flex gap-6 relative">
          {navItems.map((item) => {
            const isActive =
              item.href === "/"
                ? pathname === "/"
                : pathname.startsWith(item.href);

            return (
              <Link
                key={item.name}
                href={item.href}
                className={`relative text-sm tracking-wide transition ${
                  isActive
                    ? "text-white"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                {item.name}

                {/* 🔥 Animated underline */}
                {isActive && (
                  <motion.div
                    layoutId="underline"
                    className="absolute left-0 -bottom-1 w-full h-[2px] bg-yellow-400 shadow-[0_0_10px_#facc15]"
                    transition={{
                      type: "spring",
                      stiffness: 400,
                      damping: 30,
                    }}
                  />
                )}
              </Link>
            );
          })}
        </div>

        {/* CTA */}
        <Link
          href="/share"
          className="ml-4 px-4 py-1.5 rounded-full bg-yellow-400 text-black text-sm font-medium hover:opacity-90 transition"
        >
          Share Your Memory
        </Link>
      </div>
    </div>
  );
}