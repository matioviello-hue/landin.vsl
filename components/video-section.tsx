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

  // 1) Carga player.js y crea el player
  useEffect(() => {
    const initPlayer = () => {
      if (!iframeRef.current || !window.Vimeo?.Player) return;

      playerRef.current = new window.Vimeo.Player(iframeRef.current);

      playerRef.current.ready().then(() => {
        setReady(true);
        // aseguramos silencio inicial para autoplay
        playerRef.current.setVolume(0).catch(() => {});
      });
    };

    // Si ya está cargado el script
    if (window.Vimeo?.Player) {
      initPlayer();
      return;
    }

    // Si no, lo cargamos
    const existing = document.querySelector(
      'script[src="https://player.vimeo.com/api/player.js"]'
    );

    if (existing) {
      // si existe pero todavía no está listo, intentamos init luego
      const t = setTimeout(initPlayer, 300);
      return () => clearTimeout(t);
    }

    const script = document.createElement("script");
    script.src = "https://player.vimeo.com/api/player.js";
    script.async = true;
    script.onload = initPlayer;
    document.body.appendChild(script);
  }, []);

  // 2) Toggle sonido SIN mostrar controles (seguimos en background=1)
  const toggleSound = async () => {
    const p = playerRef.current;
    if (!p) return;

    try {
      // el click del usuario habilita audio en la mayoría de navegadores
      if (muted) {
        await p.setVolume(1); // 0..1
        setMuted(false);
      } else {
        await p.setVolume(0);
        setMuted(true);
      }
    } catch (e) {
      // Si falla por permisos/privacidad del embed, suele ser settings de Vimeo
      console.error(e);
    }
  };

  return (
    <section className="px-6 py-8 md:py-12">
      <div className="mx-auto max-w-3xl">
        <div className="relative aspect-video w-full overflow-hidden rounded-lg bg-black">
          <iframe
            ref={iframeRef}
            // background=1 => NO hay barra, NO hay controles
            // muted=1 => autoplay seguro
            src="https://player.vimeo.com/video/1169674089?autoplay=1&muted=1&loop=1&background=1&autopause=0"
            className="absolute inset-0 h-full w-full"
            frameBorder="0"
            allow="autoplay; fullscreen; picture-in-picture"
            allowFullScreen
            title="Video presentación"
          />

          <button
            type="button"
            onClick={toggleSound}
            disabled={!ready}
            className="absolute bottom-4 right-4 rounded-md bg-black/70 px-4 py-2 text-sm text-white hover:bg-black/80 disabled:opacity-50"
          >
            {muted ? "🔊 Activar sonido" : "🔇 Silenciar"}
          </button>
        </div>
      </div>
    </section>
  );
}
