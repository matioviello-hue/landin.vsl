const CALENDLY_URL = "https://calendly.com/your-link"

export function CtaSection() {
  return (
    <section className="px-6 py-10 text-center md:py-14">
      <a
        href={CALENDLY_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center justify-center rounded-md bg-primary px-8 py-4 text-base font-semibold text-primary-foreground shadow-lg shadow-primary/20 transition-all hover:brightness-110 hover:shadow-xl hover:shadow-primary/30 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring md:px-10 md:py-5 md:text-lg"
      >
        Agendar análisis integral
      </a>
      <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-muted-foreground md:text-base">
        Te mostramos exactamente qué sistema implementar primero.
      </p>
    </section>
  )
}
