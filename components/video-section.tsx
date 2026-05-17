"use client";

import { useEffect, useRef, useState } from "react";

declare global {
  interface Window {
    Vimeo?: any;
  }
}

const VIMEO_API_SRC = "https://player.vimeo.com/api/player.js";
const VIDEO_ID = "1169674089"; // cambiá este ID si actualizaste el video

export function VideoSection() {
  const iframeRef = useRef<HTMLIFrameElement | null>(null);
  const playerRef = useRef<any>(null);

  const [ready, setReady] = useState(false);
  const [muted, setMuted] = useState(true);
  const [progress, setProgress] = useState(0);

  // 1) Cargar Vimeo Player API e inicializar
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
            await player.setVolume(0);
          } catch {}
        })
        .catch(() => {});
    };

    if (window.Vimeo?.Player) {
      initPlayer();
      return;
    }

    const existing = document.querySelector(`script[src="${VIMEO_API_SRC}"]`);

    if (existing) {
      const t = setTimeout(initPlayer, 300);
      return () => clearTimeout(t);
    }

    const script = document.createElement("script");
    script.src = VIMEO_API_SRC; // <-- acá estaba el bug
    script.async = true;
    script.onload = initPlayer;
    document.body.appendChild(script);
  }, []);

  // 2) Animación de barra fake
  useEffect(() => {
    let raf = 0;
    const start = performance.now();

    const FAST_MS = 1200;
    const BASE = 0.7;
    const AMP = 0.04;
    const PERIOD_MS = 2600;

    const tick = (now: number) => {
      const t = now - start;

      if (t < FAST_MS) {
        const x = t / FAST_MS;
        const eased = 1 - Math.pow(1 - x, 3);
        setProgress(BASE * eased);
      } else {
        const tt = t - FAST_MS;
        const wave = Math.sin((2 * Math.PI * tt) / PERIOD_MS);
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
            src={`https://player.vimeo.com/video/${VIDEO_ID}?autoplay=1&muted=1&loop=0&background=1&autopause=0`}
            className="absolute inset-0 h-full w-full"
            frameBorder="0"
            allow="autoplay; fullscreen; picture-in-picture"
            allowFullScreen
            title="Video presentación"
          />

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

          {/* Barra fake de progreso */}
          <div className="absolute bottom-0 left-0 h-1 w-full bg-white/15">
            <div
              className="h-full bg-white/70 transition-none"
              style={{ width: `${progress * 100}%` }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
