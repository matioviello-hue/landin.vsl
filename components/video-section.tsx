"use client";

import { useEffect, useRef, useState } from "react";

declare global {
  interface Window {
    Vimeo?: any;
  }
}

export function VideoSection() {
  const iframeRef = useRef<HTMLIFrameElement | null>(null);
  const playerRef = useRef<any>(null);

  const [ready, setReady] = useState(false);
  const [muted, setMuted] = useState(true);

  // Progress
  const [progress, setProgress] = useState(0); // 0..1

  useEffect(() => {
    const initPlayer = () => {
      if (!iframeRef.current || !window.Vimeo?.Player) return;

      const player = new window.Vimeo.Player(iframeRef.current);
      playerRef.current = player;

      player
        .ready()
        .then(async () => {
          setReady(true);

          // asegurar volumen 0 al inicio (autoplay)
          try {
            await player.setVolume(0);
          } catch {}

          // Actualizar barra de progreso en tiempo real
          // timeupdate trae { seconds, duration, percent }
          player.on("timeupdate", (data: any) => {
            if (typeof data?.percent === "number") {
              setProgress(Math.max(0, Math.min(1, data.percent)));
              return;
            }
            if (typeof data?.seconds === "number" && typeof data?.duration === "number" && data.duration > 0) {
              setProgress(Math.max(0, Math.min(1, data.seconds / data.duration)));
            }
          });
        })
        .catch(() => {
          // si algo falla igual no rompemos la página
        });
    };

    // Si ya existe Vimeo.Player, inicializamos
    if (window.Vimeo?.Player) {
      initPlayer();
      return;
    }

    // Si no, cargamos player.js
    const existing = document.querySelector('script[src="https://player.vimeo.com/api/player.js"]');
    if (existing) {
      const t = setTimeout(initPlayer, 300);
      return () => clearTimeout(t);
    }

    const script = document.createElement("script");
    script.src = "https://player.vimeo.com/api/player.js";
    script.async = true;
    script.onload = initPlayer;
    document.body.appendChild(script);
  }, []);

  const enableSound = async () => {
    const p = playerRef.current;
    if (!p) return;

    try {
      // El click del usuario habilita audio en navegadores
      await p.setVolume(1);
      setMuted(false);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <section className="px-6 py-8 md:py-12">
      <div className="mx-auto max-w-3xl">
        <div className="relative aspect-video w-full overflow-hidden rounded-lg bg-black">
          <iframe
            ref={iframeRef}
            // background=1 -> no controles, no barra, no scrub
            // muted=1 para autoplay consistente (el sonido se habilita via API con click)
            src="https://player.vimeo.com/video/1169674089?autoplay=1&muted=1&loop=0&background=1&autopause=0"
            className="absolute inset-0 h-full w-full"
            frameBorder="0"
            allow="autoplay; fullscreen; picture-in-picture"
            allowFullScreen
            title="Video presentación"
          />

          {/* Botón grande que desaparece cuando se activa el sonido */}
          {muted && (
            <button
              type="button"
              onClick={enableSound}
              disabled={!ready}
              className="absolute bottom-6 right-6 rounded-xl bg-black/80 px-6 py-4 text-lg font-semibold text-white shadow-lg hover:bg-black/90 transition-all disabled:opacity-50"
            >
              🔊 Activar sonido
            </button>
          )}

          {/* Barra de progreso (siempre visible, sin permitir scrub) */}
          <div className="absolute bottom-0 left-0 h-1 w-full bg-white/15">
            <div
              className="h-full bg-white/80 transition-[width] duration-150"
              style={{ width: `${Math.round(progress * 100)}%` }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
