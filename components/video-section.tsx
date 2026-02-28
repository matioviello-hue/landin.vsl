export function VideoSection() {
  return (
    <section className="px-6 py-8 md:py-12">
      <div className="mx-auto max-w-3xl">
        <div className="relative aspect-video w-full overflow-hidden rounded-lg border border-border bg-card">
          <iframe
            className="absolute inset-0 h-full w-full"
            src="https://www.youtube.com/embed/7YqQjvd7cyg?rel=0"
            title="Video de presentación"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      </div>
    </section>
  )
}
