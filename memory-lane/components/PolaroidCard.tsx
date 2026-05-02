import Image from "next/image";

export default function PolaroidCard({ faculty }: any) {
  return (
    <div className="bg-white rounded-md shadow-xl p-3 w-[260px] transition-all duration-300 hover:-rotate-2 hover:scale-105 hover:shadow-2xl">

      {/* Image */}
      <div className="relative w-full aspect-[3/4] overflow-hidden rounded-sm">
        <Image
          src={faculty.image}
          alt={faculty.name}
          fill
          className="object-cover"
        />
      </div>

      {/* Text Area */}
      <div className="pt-3 pb-2 px-2 text-black">

        {/* Name (Cursive, Centered) */}
        <h2
          className="text-xl text-center"
          style={{ fontFamily: "Great Vibes, cursive" }}
        >
          {faculty.name}
        </h2>

        {/* Subject (Left aligned) */}
        <p className="text-sm text-gray-700 mt-1 text-left">
          {faculty.subject}
        </p>
      </div>
    </div>
  );
}