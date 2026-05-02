import Image from "next/image";

export default function PolaroidCard({ faculty }: any) {
  return (
    <div className="w-[260px] p-[10px] rounded-md 
      bg-[#f5f1e6] 
      shadow-[0_10px_25px_rgba(0,0,0,0.4)] 
      border border-[#e5dccf]
      transition-all duration-300 
      hover:-rotate-2 hover:scale-105 hover:shadow-[0_20px_40px_rgba(0,0,0,0.6)]"
    >

      {/* 📸 Image Area */}
      <div className="relative w-full aspect-[3/4] overflow-hidden 
        shadow-inner 
        border border-black/10"
      >
        <Image
          src={faculty.image}
          alt={faculty.name}
          fill
          className="object-cover"
        />
      </div>

      {/* ✍️ Text Area */}
      <div className="pt-3 pb-2 px-2 text-black">

        {/* Name (Cursive, Centered) */}
        <h2
          className="text-lg text-center leading-tight"
          style={{ fontFamily: "Great Vibes, cursive" }}
        >
          {faculty.name}
        </h2>

        {/* Subject (Right aligned ✅) */}
        <p className="text-sm text-gray-700 mt-1 text-right pr-1">
          {faculty.subject}
        </p>
      </div>
    </div>
  );
}