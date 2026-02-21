import { HeroCinematic } from "@/components/home/hero-cinematic";
import { DualityStatement } from "@/components/home/duality-statement";
import { FeaturedScroll } from "@/components/home/featured-scroll";
import { PhilosophyMoment } from "@/components/home/philosophy-moment";
import { CtaClosing } from "@/components/home/cta-closing";
import { FilmGrain } from "@/components/shared/film-grain";

export default function HomePage() {
  return (
    <>
      <FilmGrain />
      <HeroCinematic />
      <DualityStatement />
      <FeaturedScroll />
      <PhilosophyMoment />
      <CtaClosing />
    </>
  );
}
