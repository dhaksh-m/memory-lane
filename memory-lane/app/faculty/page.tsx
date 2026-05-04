"use client";

import { useState } from "react";
import PolaroidCard from "@/components/PolaroidCard";

const facultyData = [
    //sem 1
  {
    name: "Swathi Mam",
    subject: "English",
    image: "/faculty/swathi.jpg",
    semester: "sem1",
  },
  {
    name: "Hemalatha Mam",
    subject: "M1",
    image: "/faculty/helatha.jpg",
    semester: "sem1",
  },
  {
    name: "Mary Mam",
    subject: "Chemistry",
    image: "/faculty/mary.jpg",
    semester: "sem1",
  },
  {
    name: "Vadivukarassi Mam",
    subject: "PPS",
    image: "/faculty/vadi.jpg",
    semester: "sem1",
  },
  {
    name: "Kishore Sir",
    subject: "Engineering Workshop",
    image: "/faculty/kishore.jpg",
    semester: "sem1",
  },
  {
    name: "Suresh Sir",
    subject: "EDC",
    image: "/faculty/suresh.jpg",
    semester: "sem1",
  },

  //sem 2
  {
    name: "Samba Shiva Rao Sir",
    subject: "M2",
    image: "/faculty/samba.jpg",
    semester: "sem2",
  },
  {
    name: "Keerthana Mam",
    subject: "DS",
    image: "/faculty/keerthana.jpg",
    semester: "sem2",
  },
  {
    name: "Sowjanya Mam",
    subject: "AEP",
    image: "/faculty/swathi.jpg",
    semester: "sem2",
  },
  {
    name: "Swetha Mam",
    subject: "BEE",
    image: "/faculty/swathi.jpg",
    semester: "sem2",
  },
   {
    name: "Raghavendra Sir",
    subject: "ED & CDA",
    image: "/faculty/raga.jpg",
    semester: "sem2",
  },
  {
    name: "Karthik Anand Sir",
    subject: "IT Workshop",
    image: "/faculty/karthik.jpg",
    semester: "sem2",
  },
  {
    name: "Mahesh Sir",
    subject: "Python",
    image: "/faculty/mahesh.jpg",
    semester: "sem2",
  },
  {
    name: "Sirisha Mam",
    subject: "Python",
    image: "/faculty/siri.jpg",
    semester: "sem2",
  },
  // 👉 Add more faculty here
];

const semesters = [
  "all",
  "sem1",
  "sem2",
  //"sem3",
  //"sem4",
  //"sem5",
  //"sem6",
  //"sem7",
 //"sem8",
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