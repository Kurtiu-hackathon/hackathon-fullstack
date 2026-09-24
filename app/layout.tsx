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

const siteDescription =
  "A SouJunior é mantida pela própria comunidade. Mentoria gratuita, projetos open-source reais e a primeira oportunidade de milhares de devs juniores — tudo isso começa com R$ 2.";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "https://soujunior.tech"),
  title: {
    default: "SouJunior",
    template: "%s | SouJunior",
  },
  description: siteDescription,
  keywords: ["SouJunior", "devs juniores", "mentoria", "open-source", "carreira júnior"],
  icons: {
    icon: "/icos/icon-blue.svg",
  },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    siteName: "SouJunior",
    title: {
      default: "SouJunior",
      template: "%s | SouJunior",
    },
    description: siteDescription,
    images: [{ url: "/SEO/open-graph.png" }],
  },
  twitter: {
    card: "summary_large_image",
    title: {
      default: "SouJunior",
      template: "%s | SouJunior",
    },
    description: siteDescription,
    images: ["/SEO/open-graph.png"],
  },
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
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
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[9999] focus:bg-background focus:px-4 focus:py-2 focus:text-foreground focus:outline focus:outline-2"
        >
          Ir para o conteúdo principal
        </a>
        <UserProvider initialUser={user}>
          <TooltipProvider>{children}</TooltipProvider>
        </UserProvider>
      </body>
    </html>
  );
}
