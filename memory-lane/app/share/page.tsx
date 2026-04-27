"use client";

export default function SharePage() {
  const handleOpenForm = () => {
    window.open(
      "https://docs.google.com/forms/d/e/1FAIpQLSdlMbIPpQRKzUeTXKWw0sEtC6QhHrWv1edm2iqfqNoSjgdmjw/viewform?usp=dialog",
      "_blank"
    );
  };

  return (
    <main className="min-h-screen bg-[#020617] text-white flex flex-col items-center justify-center px-6">

      <h1 className="text-4xl md:text-6xl font-semibold mb-6">
        Share Your Memory ✨
      </h1>

      <p className="text-gray-400 mb-8 text-center max-w-md">
        Upload your photos and be part of the memory vault.
      </p>

      {/* 🔥 BUTTON */}
      <button
        onClick={handleOpenForm}
        className="px-8 py-4 bg-yellow-400 text-black rounded-xl text-lg hover:scale-105 transition"
      >
        Upload Your Photos 📸
      </button>

    </main>
  );
}