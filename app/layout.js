import { Inter } from "next/font/google";
import { SessionProvider } from "next-auth/react";
import NextTopLoader from "nextjs-toploader";
import Navbar from "@/components/Navbar/Navbar";
import { Toaster } from "@/components/ui/sonner";
import { auth } from "@/auth";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Chatz: Meet, Chat, and Connect!",
  description: "Generated by create next app",
};

export default async function RootLayout({ children }) {
  const session = await auth();
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className}  bg-secondary h-screen`}>
        <SessionProvider session={session}>
          <NextTopLoader height={5} color="red" />
          <Navbar />
          <main className="min-h-screen mt-12">{children}</main>
        </SessionProvider>
        <Toaster />
      </body>
    </html>
  );
}
