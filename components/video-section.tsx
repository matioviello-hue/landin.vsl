"use client";

export function VideoSection() {
  return (
    <section className="px-6 py-8 md:py-12">
      <div className="mx-auto max-w-3xl">
        <div className="relative aspect-video w-full overflow-hidden rounded-lg border border-border bg-black">
          <video
            className="absolute inset-0 h-full w-full object-cover"
            src="<div style="padding:56.25% 0 0 0;position:relative;"><iframe src="https://player.vimeo.com/video/1169674089?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479&amp;autoplay=1&amp;loop=1" frameborder="0" allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share" referrerpolicy="strict-origin-when-cross-origin" style="position:absolute;top:0;left:0;width:100%;height:100%;" title="vsl oficial 2026 landing (1)"></iframe></div><script src="https://player.vimeo.com/api/player.js"></script>"
          />
        </div>
      </div>
    </section>
  );
}
          
