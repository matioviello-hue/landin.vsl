import { Hero } from "@/components/hero"
import { VideoSection } from "@/components/video-section"
import { CtaSection } from "@/components/cta-section"
import { TestimonialCarousel } from "@/components/testimonial-carousel"

export default function Page() {
  return (
    <main className="relative min-h-screen overflow-hidden">
      {/* Subtle lighter bordeaux gradient overlay */}
      <div
        className="pointer-events-none fixed inset-0 -z-10"
        aria-hidden="true"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(120,25,50,0.22) 0%, transparent 70%), radial-gradient(ellipse 60% 50% at 80% 100%, rgba(120,25,50,0.12) 0%, transparent 60%)",
        }}
      />
      <Hero />
      <VideoSection />
      <CtaSection />
      <TestimonialCarousel />
      {/* Footer breathing room */}
      <div className="h-12 md:h-16" />
    </main>
  )
}
