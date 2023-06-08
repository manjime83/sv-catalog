import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const dynamic = "error";

export const metadata = {
  title: "Sandra's Catalog",
  description: "Catalog of Sandra Vargas's properties in Orlando, Kissimmee, and Davenport",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
