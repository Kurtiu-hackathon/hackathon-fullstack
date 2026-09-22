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

export default function LandingPage() {
  return (
    <>
      <Header />

      <main>
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
