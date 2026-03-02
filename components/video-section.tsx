"use client";

import { useState } from "react";

export function VideoSection() {
  const [unmuted, setUnmuted] = useState(false);

  const videoSrc = unmuted
    ? "https://player.vimeo.com/video/1169674089?autoplay=1&loop=1&background=0"
    : "https://player.vimeo.com/video/1169674089?autoplay=1&loop=1&background=1";

  return (
    <section className="px-6 py-8 md:py-12">
      <div className="mx-auto max-w-3xl">
        <div className="relative aspect-video w-full overflow-hidden rounded-lg bg-black">

          <iframe
            key={videoSrc}
            src={videoSrc}
            className="absolute inset-0 w-full h-full"
            frameBorder="0"
            allow="autoplay; fullscreen; picture-in-picture"
            allowFullScreen
            title="Video presentación"
          />

          {!unmuted && (
            <button
              onClick={() => setUnmuted(true)}
              className="absolute bottom-4 right-4 bg-black/70 text-white px-4 py-2 rounded-md text-sm hover:bg-black/80"
            >
              🔊 Activar sonido
            </button>
          )}

        </div>
      </div>
    </section>
  );
}
