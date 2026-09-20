import { Allocation } from "./_components/allocation"
import { Cause } from "./_components/cause"
import { FinalCta } from "./_components/final.cta"
import { Footer } from "./_components/footer"
import { Header } from "./_components/header"
import { Hero } from "./_components/hero"
import { Impact } from "./_components/impact"
import { Plans } from "./_components/plans"
import { Testimonials } from "./_components/testimonials"

export default function LandingPage() {
  return (
    <>
      <Header />

      <main>
        <Hero />
        <Cause />
        <Allocation />
        <Impact />
        <Plans />
        <Testimonials />
        <FinalCta />
      </main>

      <Footer />
    </>
  )
}