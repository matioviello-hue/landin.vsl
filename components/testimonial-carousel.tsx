"use client"

import { useCallback, useEffect, useState } from "react"
import useEmblaCarousel from "embla-carousel-react"
import { ChevronLeft, ChevronRight } from "lucide-react"

const testimonials = [
  {
    name: "Angel",
    headline: "De casi cerrar a automatizar su barbería",
    videoId: "n107Du6Pbbo",
  },
  {
    name: "Ezequiel",
    headline: "Del desorden total al orden y a duplicar ingresos",
    videoId: "wNWE9lkJ1Lg",
  },
  {
    name: "Josué",
    headline:
      "De cortar todos los días y ganar 4 a cortar 3 días y ganar el doble",
    videoId: "s4RpUoI5CEo",
  },
  {
    name: "Uri",
    headline:
      "No tenía equipo, cortaba solo y hoy tiene 3 barberos, corta 3 veces a la semana y gana el doble",
    videoId: "xPP27dWR8Vw",
  },
]

export function TestimonialCarousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    loop: false,
    skipSnaps: false,
    dragFree: false,
  })
  const [canScrollPrev, setCanScrollPrev] = useState(false)
  const [canScrollNext, setCanScrollNext] = useState(true)

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi])
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi])

  const onSelect = useCallback(() => {
    if (!emblaApi) return
    setCanScrollPrev(emblaApi.canScrollPrev())
    setCanScrollNext(emblaApi.canScrollNext())
  }, [emblaApi])

  useEffect(() => {
    if (!emblaApi) return
    onSelect()
    emblaApi.on("select", onSelect)
    emblaApi.on("reInit", onSelect)
    return () => {
      emblaApi.off("select", onSelect)
      emblaApi.off("reInit", onSelect)
    }
  }, [emblaApi, onSelect])

  return (
    <section className="px-6 py-10 md:py-14">
      <div className="mx-auto max-w-5xl">
        <div className="mb-8 flex items-end justify-between md:mb-10">
          <h2 className="font-[family-name:var(--font-display)] text-3xl font-bold tracking-tight text-foreground md:text-4xl lg:text-5xl">
            Resultados reales
          </h2>
          <div className="hidden gap-2 md:flex">
            <button
              onClick={scrollPrev}
              disabled={!canScrollPrev}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-card text-foreground transition-colors hover:bg-muted disabled:cursor-not-allowed disabled:opacity-30"
              aria-label="Anterior testimonio"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              onClick={scrollNext}
              disabled={!canScrollNext}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-card text-foreground transition-colors hover:bg-muted disabled:cursor-not-allowed disabled:opacity-30"
              aria-label="Siguiente testimonio"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>

        <div ref={emblaRef} className="overflow-hidden">
          <div className="-ml-4 flex md:-ml-6">
            {testimonials.map((t) => (
              <div
                key={t.name}
                className="min-w-0 shrink-0 grow-0 basis-[85%] pl-4 sm:basis-[60%] md:basis-[45%] md:pl-6 lg:basis-[40%]"
              >
                <div className="flex flex-col overflow-hidden rounded-lg border border-border bg-card transition-colors hover:border-primary/30">
                  {/* Video area */}
                  <div className="relative aspect-video w-full bg-muted">
                    {t.videoId ? (
                      <iframe
                        className="absolute inset-0 h-full w-full"
                        src={`https://www.youtube.com/embed/${t.videoId}?rel=0`}
                        title={`Testimonio de ${t.name}`}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="flex h-12 w-12 items-center justify-center rounded-full border border-foreground/20 bg-foreground/10 backdrop-blur-sm">
                          <svg
                            className="ml-0.5 h-5 w-5 text-foreground"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                            aria-hidden="true"
                          >
                            <path d="M8 5v14l11-7z" />
                          </svg>
                        </div>
                      </div>
                    )}
                  </div>
                  {/* Info */}
                  <div className="flex flex-col gap-2 p-5">
                    <span className="text-sm font-semibold uppercase tracking-wider text-primary">
                      {t.name}
                    </span>
                    <p className="text-pretty text-sm leading-relaxed text-muted-foreground">
                      {t.headline}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Mobile nav dots */}
        <div className="mt-6 flex justify-center gap-2 md:hidden">
          <button
            onClick={scrollPrev}
            disabled={!canScrollPrev}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-border bg-card text-foreground transition-colors hover:bg-muted disabled:cursor-not-allowed disabled:opacity-30"
            aria-label="Anterior testimonio"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button
            onClick={scrollNext}
            disabled={!canScrollNext}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-border bg-card text-foreground transition-colors hover:bg-muted disabled:cursor-not-allowed disabled:opacity-30"
            aria-label="Siguiente testimonio"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </section>
  )
}
