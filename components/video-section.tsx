"use client";

export function VideoSection() {
  return (
    <section className="px-6 py-8 md:py-12">
      <div className="mx-auto max-w-3xl">
        <div className="relative aspect-video w-full overflow-hidden rounded-lg border border-border bg-black">
          <video
            className="absolute inset-0 h-full w-full object-cover"
            src="https://vimeo.com/1169674089?share=copy&fl=sv&fe=ci"
            autoPlay
            playsInline
            loop
            preload="auto"
            controls={false}
          />
        </div>
      </div>
    </section>
  );
}
          
