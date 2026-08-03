import type { Metadata } from "next";
import { Playfair_Display, Work_Sans } from "next/font/google";
import "./globals.css";
import Header from "@/components/ui/navigation/Header";
import Footer from "@/components/ui/navigation/Footer";
import QueryProvider from "@/providers/QueryProvider";
import { Toaster } from "sonner";
const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const workSans = Work_Sans({
  subsets: ["latin"],
  variable: "--font-work-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Signature by Sarah",
  description: "Luxury handcrafted leather footwear.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${workSans.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
      <Toaster
  position="top-right"
  toastOptions={{
    classNames: {
      success:
        "bg-[#0B0B0B] border border-[#FAD90C] text-white",
      error:
        "bg-[#0B0B0B] border border-red-500 text-white",
      info:
        "bg-[#0B0B0B] border border-[#FAD90C] text-white",
    },
  }}
/>      <QueryProvider>

        <Header/>
        {children}
        <Footer/>
        </QueryProvider>

      </body>
    </html>
  );
}