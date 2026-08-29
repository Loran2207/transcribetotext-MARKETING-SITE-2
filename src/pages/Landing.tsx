import { Nav } from "../components/sections/Nav";
import { Hero } from "../components/sections/Hero";
import { Trust } from "../components/sections/Trust";
import { FeatureTabs } from "../components/sections/FeatureTabs";
import { Reviews } from "../components/sections/Reviews";
import { ProductValue } from "../components/sections/ProductValue";
import { HowItWorks } from "../components/sections/HowItWorks";
import { Languages } from "../components/sections/Languages";
import { Pricing } from "../components/sections/Pricing";
import { Industries } from "../components/sections/Industries";
import { FinalCta } from "../components/sections/FinalCta";
import { Faq } from "../components/sections/Faq";
import { Footer } from "../components/sections/Footer";
import { StickyCta } from "../components/sections/StickyCta";

/* The order is the one the brief sets out: what you get, who already trusts it,
   the three features with meetings first, real reviews, what the product hands
   back, how it works, languages, pricing, who uses it, and the last ask. */
export function Landing() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Trust />
        <FeatureTabs />
        <Reviews />
        <ProductValue />
        <HowItWorks />
        <Languages />
        <Pricing />
        <Industries />
        <FinalCta />
        <Faq />
      </main>
      <Footer />
      <StickyCta />
    </>
  );
}
