import type { Metadata } from "next";
import { Barlow, Barlow_Condensed, Geist_Mono } from "next/font/google";
import "./globals.css";
import { TooltipProvider } from "@components/ui/tooltip";
import { UserProvider } from "@lib/auth/user-provider";
import { createClient } from "@lib/supabase/server";

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
    icon: "/icos/icon-blue.svg",
  },
};

export default async function RootLayout({ children }: LayoutProps<"/">) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <html
      lang="pt-br"
      className={`${barlow.variable} ${barlowCondensed.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <UserProvider initialUser={user}>
          <TooltipProvider>{children}</TooltipProvider>
        </UserProvider>
      </body>
    </html>
  );
}
