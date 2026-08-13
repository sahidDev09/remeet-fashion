import type { Metadata } from "next";
import { Geist, Geist_Mono, Caveat } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/common/SmoothScroll";
import { CartProvider } from "@/context/CartContext";
import CartDrawer from "@/components/cart/CartDrawer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const caveat = Caveat({
  variable: "--font-caveat",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "reMeet Fashion",
  description: "reMeet Fashion - Built for the Wild",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${caveat.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col relative overflow-x-hidden" suppressHydrationWarning>
        {/* Global Background Gradient */}
        <div className="fixed inset-0 -z-10 h-full w-full bg-gradient-to-br from-green-100 via-white to-green-50 pointer-events-none" />
        <CartProvider>
          <SmoothScroll>
            {children}
          </SmoothScroll>
          <CartDrawer />
        </CartProvider>
      </body>
    </html>
  );
}
