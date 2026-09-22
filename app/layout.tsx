import type { Metadata } from "next";
import { Barlow, Barlow_Condensed, Geist_Mono } from "next/font/google";
import "./globals.css";
import { TooltipProvider } from "@/components/ui/tooltip";

const barlow = Barlow({
  variable: "--font-barlow",
  weight: ["400", "500", "700"],
  subsets: ["latin"],
});

const barlowCondensed = Barlow_Condensed({
  variable: "--font-barlow-condensed",
  weight: ["400", "600"],
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "SouJunior",
    template: "%s | SouJunior",
  },
  description:
    "A SouJunior é mantida pela própria comunidade. Mentoria gratuita, projetos open-source reais e a primeira oportunidade de milhares de devs juniores — tudo isso começa com R$ 2.",
  keywords: ["SouJunior", "devs juniores", "mentoria", "open-source", "carreira júnior"],
  icons: {
    icon: [
      { url: "/icos/icon-black.svg", media: "(prefers-color-scheme: light)" },
      { url: "/icos/icon-white.svg", media: "(prefers-color-scheme: dark)" },
    ],
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="pt-br"
      className={`${barlow.variable} ${barlowCondensed.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <TooltipProvider>{children}</TooltipProvider>
      </body>
    </html>
  );
}
