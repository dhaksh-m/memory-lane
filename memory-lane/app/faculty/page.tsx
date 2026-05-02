"use client";

import { useState } from "react";
import PolaroidCard from "@/components/PolaroidCard";

const facultyData = [
  {
    name: "Swathi Mam",
    subject: "English",
    image: "/faculty/swathi.jpg",
    semester: "sem1",
  },
  {
    name: "Ramesh Sir",
    subject: "Mathematics",
    image: "/faculty/ramesh.jpg",
    semester: "sem1",
  },
  {
    name: "Anita Mam",
    subject: "Physics",
    image: "/faculty/dhaksh.jpg",
    semester: "sem2",
  },
  // 👉 Add more faculty here
];

const semesters = [
  "all",
  "sem1",
  "sem2",
  "sem3",
  "sem4",
  "sem5",
  "sem6",
  "sem7",
  "sem8",
];

export default function FacultyPage() {
  const [selectedSem, setSelectedSem] = useState("all");

  const filteredFaculty =
    selectedSem === "all"
      ? facultyData
      : facultyData.filter((f) => f.semester === selectedSem);

  return (
    <main className="min-h-screen bg-[#020617] text-white px-4 pb-20">

      {/* 🔥 Heading Section */}
      <div className="text-center pt-32 mb-12">
        <h1 className="text-4xl md:text-6xl font-serif mb-4">
          The Mentors Behind the Memories ✨
        </h1>
        <p className="text-gray-400 max-w-2xl mx-auto text-lg">
          The voices that guided us, the lessons that stayed, and the people who quietly shaped our journey.
          More than teachers — they were a part of our story.
        </p>
      </div>

      {/* 🎛️ Filter Buttons */}
      <div className="flex flex-wrap justify-center gap-3 mb-12">
        {semesters.map((sem) => (
          <button
            key={sem}
            onClick={() => setSelectedSem(sem)}
            className={`px-4 py-1.5 rounded-full text-sm transition ${
              selectedSem === sem
                ? "bg-yellow-400 text-black"
                : "bg-white/10 text-gray-300 hover:bg-white/20"
            }`}
          >
            {sem === "all" ? "All" : sem.toUpperCase()}
          </button>
        ))}
      </div>

      {/* 🖼️ Faculty Cards */}
      <div className="flex flex-wrap justify-center gap-10">
        {filteredFaculty.map((faculty, index) => (
          <PolaroidCard key={index} faculty={faculty} />
        ))}
      </div>
    </main>
  );
}