"use client";

export function VideoSection() {
  return (
    <section className="px-6 py-8 md:py-12">
      <div className="mx-auto max-w-3xl">
        <div className="relative aspect-video w-full overflow-hidden rounded-lg bg-black">

          <iframe
            src="https://player.vimeo.com/video/1169674089?autoplay=1&muted=1&loop=1&background=1"
            className="absolute inset-0 w-full h-full"
            frameBorder="0"
            allow="autoplay; fullscreen; picture-in-picture"
            allowFullScreen
            title="Video presentación"
          />

        </div>
      </div>
    </section>
  );
}
