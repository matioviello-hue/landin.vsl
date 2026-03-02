"use client"

import { useRef, useState } from "react"

export function VideoSection() {
  const videoRef = useRef<HTMLVideoElement | null>(null)
  const [muted, setMuted] = useState(true)

  const enableSound = async () => {
    const v = videoRef.current
    if (!v) return
    v.muted = false
    v.volume = 1
    setMuted(false)
    try {
      await v.play()
    } catch {}
  }

  return (
    <section className="px-6 py-8 md:py-12">
      <div className="mx-auto max-w-3xl">
        <div className="relative aspect-video w-full overflow-hidden rounded-lg border border-border bg-black">
          <video
            ref={videoRef}
            className="absolute inset-0 h-full w-full object-cover"
            src= public/vsl oficial 2026 landing (1).mp4
            autoPlay
            muted
            playsInline
            preload="auto"
            controls={false}
            controlsList="nodownload noplaybackrate noremoteplayback"
            disablePictureInPicture
          />

          {/* Botón opcional para activar sonido (recomendado) */}
          {muted && (
            <button
              onClick={enableSound}
              className="absolute bottom-4 right-4 rounded-xl bg-white/90 px-4 py-2 text-sm font-semibold text-black shadow"
            >
              🔊 Activar sonido
            </button>
          )}
        </div>
      </div>
    </section>
  )
}
