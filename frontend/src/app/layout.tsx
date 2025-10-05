import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import Navbar from "@/components/navbar";
import ReduxProvider from "../redux/reduxProvider";
import localFont from "next/font/local";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const captureIt = localFont({
  src: "../../public/fonts/Capture-it.ttf",
  variable: "--font-capture-it",
  weight: "400",
  style: "normal",
});

export const metadata: Metadata = {
  title: "ScanDine",
  description: "Your go to place for building digital menus.",
  icons: {
    icon: "/logo2.png",
    shortcut: "/logo2.png",
    apple: "/logo2.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${captureIt.variable}`}
    >
      <head>
        <link rel="icon" href="/logo2.png" type="image/png" />
      </head>
      <body className="antialiased">
        <ReduxProvider>
          <Navbar />
          {children}
        </ReduxProvider>
      </body>
    </html>
  );
}
