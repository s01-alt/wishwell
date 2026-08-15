import type { Metadata } from "next";
import { Geist, Geist_Mono, Space_Grotesk, Nunito_Sans } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import NavBar from "@/components/navbar";
import ThemeProvider from "@/components/theme-provider";
import ThemeToggle from "@/components/theme-toggle";

const nunitoSansHeading = Nunito_Sans({subsets:['latin'],variable:'--font-heading'});

const spaceGrotesk = Space_Grotesk({subsets:['latin'],variable:'--font-sans'});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "WishWell | Birthday Sites",
  description: 
    "WishWell is a platform that allows users to create personalized birthday websites for their loved ones. With WishWell, you can easily design and customize a unique birthday site to celebrate special occasions.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={cn("h-full", "antialiased", geistSans.variable, geistMono.variable, spaceGrotesk.variable, nunitoSansHeading.variable)}
      suppressHydrationWarning
      >
      <body className="min-h-full flex flex-col">
        <ThemeProvider>
          <ThemeToggle />
          <NavBar />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
