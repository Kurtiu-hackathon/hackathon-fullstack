import type { Metadata } from "next"

import { Allocation } from "./_components/allocation"
import { Cause } from "./_components/cause"
import { Ecosystem } from "./_components/ecosystem"
import { Faq } from "./_components/faq"
import { FinalCta } from "./_components/final.cta"
import { Footer } from "./_components/footer"
import { Header } from "./_components/header"
import { Hero } from "./_components/hero"
import { Impact } from "./_components/impact"
import { Plans } from "./_components/plans"
import { Testimonials } from "./_components/testimonials"
import { Ticker } from "./_components/ticker"
import { Transparency } from "./_components/transparency"

export const metadata: Metadata = {
  title: "Mentoria gratuita e projetos reais para devs juniores",
  description:
    "Junte-se à SouJunior: comunidade brasileira com mentoria gratuita, projetos open-source reais e a primeira oportunidade de carreira para devs juniores. A partir de R$ 2.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    url: "/",
    images: [{ url: "/SEO/open-graph.png" }],
  },
  twitter: {
    images: ["/SEO/open-graph.png"],
  },
}

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "SouJunior",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://soujunior.tech",
  description:
    "Comunidade brasileira que abre a primeira porta de carreira em tecnologia para devs juniores, com mentoria gratuita e projetos open-source reais.",
  sameAs: ["https://github.com/SouJunior"],
}

export default function LandingPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <Header />

      <main id="main-content">
        <Hero />
        <Ticker />
        <Cause />
        <Allocation />
        <Impact />
        <Plans />
        <Testimonials />
        <Transparency />
        <Ecosystem />
        <Faq />
        <FinalCta />
      </main>

      <Footer />
    </>
  )
}
