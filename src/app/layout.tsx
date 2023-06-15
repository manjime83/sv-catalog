import Footer from "@/components/Footer";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Sandra's Catalog",
  description: "Catalog of Sandra Vargas's properties in Orlando, Kissimmee, and Davenport",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="flex flex-col justify-between bg-gray-100 min-h-screen overflow-x-hidden">
          {children}
          <Footer />
        </div>
      </body>
    </html>
  );
}
