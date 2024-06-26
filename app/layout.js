import { Inter } from "next/font/google";
import { SessionProvider } from "next-auth/react";
import NextTopLoader from "nextjs-toploader";
import { Toaster } from "@/components/ui/sonner";
import { auth } from "@/auth";
import "./globals.css";
import Navbar from "@/components/Navbar/new/Navbar";
import Topbar from "@/components/Navbar/new/Topbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Chatz: Chat, and Connect!",
  description: "Connect with friends, chat and share posts!",
};

export default async function RootLayout({ children }) {
  const session = await auth();
  return (
    <html lang="en">
      <body
        className={`${inter.className}  bg-white dark:bg-black text-black dark:text-white h-screen`}
      >
        <SessionProvider session={session}>
          <NextTopLoader color="red" />
          <Navbar />
          <Topbar />
          <main className="h-full mt-12 mb-12 md:mb-0 md:ml-12">
            {children}
          </main>
        </SessionProvider>
        <Toaster
          position="top-center"
          closeButton
          toastOptions={{
            // unstyled: true,
            classNames: {
              toast: "dark:bg-black bg-white",
              // title: 'text-red-400',
              // description: 'text-red-400',
              // actionButton: 'bg-zinc-400',
              // cancelButton: 'bg-orange-400',
              // closeButton: 'bg-lime-400',
            },
          }}
        />
      </body>
    </html>
  );
}
