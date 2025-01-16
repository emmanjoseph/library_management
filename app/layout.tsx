import type { Metadata } from "next";
import localFont from 'next/font/local'
import "./globals.css";
import { Toaster } from "@/components/ui/toaster"
import {SessionProvider} from "next-auth/react"
import { auth } from "@/auth";

const ibmPlexSans = localFont({
  src:[
    {path:"/fonts/IBMPlexSans-Regular.ttf", weight:"400",style:"normal"},
    {path:"/fonts/IBMPlexSans-Medium.ttf", weight:"500",style:"normal"},
    {path:"/fonts/IBMPlexSans-SemiBold.ttf", weight:"600",style:"normal"},
    {path:"/fonts/IBMPlexSans-Bold.ttf", weight:"700",style:"normal"},
  ]
});

const bebasNeue = localFont({
 src:[
    {path:"/fonts/BebasNeue-Regular.ttf", weight:"400",style:"normal"},
 ],
 variable:"--bebas-neue"
});

export const metadata: Metadata = {
  title: "BookWise",
  description: "BookWise is a book library management solution ",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  const session = await auth()
  return (
    <html lang="en">
      <SessionProvider session={session}>
      <body
        className={`${ibmPlexSans.className} ${bebasNeue.variable} antialiased`}
      >
        <main>{children}</main>
        <Toaster/>
      </body>
      </SessionProvider>
    </html>
  );
}
