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

  // Barra "fake"
  const [progress, setProgress] = useState(0); // 0..1

  // 1) Inicializar Vimeo player (para audio)
  useEffect(() => {
    const initPlayer = () => {
      if (!iframeRef.current || !window.Vimeo?.Player) return;

      const player = new window.Vimeo.Player(iframeRef.current);
      playerRef.current = player;

      player
        .ready()
        .then(async () => {
          setReady(true);
          try {
            await player.setVolume(0); // silencio inicial para autoplay
          } catch {}
        })
        .catch(() => {});
    };

    if (window.Vimeo?.Player) {
      initPlayer();
      return;
    }

    const existing = document.querySelector(
      'script[src="https://player.vimeo.com/api/player.js"]'
    );

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

  // 2) Animación de barra: sube rápido a 70% y luego oscila
  useEffect(() => {
    let raf = 0;
    const start = performance.now();

    const FAST_MS = 1200; // velocidad hasta 70%
    const BASE = 0.7; // 70%
    const AMP = 0.04; // oscila +-4% (66% a 74%)
    const PERIOD_MS = 2600; // frecuencia de vaivén

    const tick = (now: number) => {
      const t = now - start;

      if (t < FAST_MS) {
        // easeOut hacia 70%
        const x = t / FAST_MS; // 0..1
        const eased = 1 - Math.pow(1 - x, 3); // easeOutCubic
        setProgress(BASE * eased);
      } else {
        const tt = t - FAST_MS;
        const wave = Math.sin((2 * Math.PI * tt) / PERIOD_MS); // -1..1
        const p = BASE + AMP * wave;
        setProgress(Math.max(0, Math.min(1, p)));
      }

      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  const enableSound = async () => {
    const p = playerRef.current;
    if (!p) return;
    try {
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

          {/* Barra "fake" */}
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
