import "./globals.css";
import { Playfair_Display } from "next/font/google";
import Navbar from "@/components/layout/Navbar";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata = {
  title: "Memory Lane",
  description: "A digital archive of BTech memories",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${playfair.className} bg-[#020617] text-white antialiased`}>
        <Navbar />
        {children}
      </body>
    </html>
  );
}