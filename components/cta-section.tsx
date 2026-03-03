"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

const CALENDLY_URL =
  "https://calendly.com/matiovierro/sesion-de-consultoria-1-a-1-clon";

export function CtaSection() {
  const router = useRouter();

  useEffect(() => {
    // Carga el script oficial del widget (si no está cargado)
    const src = "https://assets.calendly.com/assets/external/widget.js";
    if (!document.querySelector(`script[src="${src}"]`)) {
      const s = document.createElement("script");
      s.src = src;
      s.async = true;
      document.body.appendChild(s);
    }

    // Escucha el evento cuando se agenda
    const onMessage = (e: MessageEvent) => {
      if (!e?.data || typeof e.data !== "object") return;
      if ((e.data as any).event === "calendly.event_scheduled") {
        router.push("/felicidades");
      }
    };

    window.addEventListener("message", onMessage);
    return () => window.removeEventListener("message", onMessage);
  }, [router]);

  return (
    <section className="px-6 py-10 md:py-14 text-center">
      <div className="mx-auto max-w-3xl">
        <h2 className="text-2xl md:text-3xl font-bold">Agendá tu análisis integral</h2>
        <p className="mt-3 text-sm md:text-base opacity-80">
          Reservá tu sesión directamente acá. Cuando confirmes, te llevamos a la página de gracias.
        </p>

        <div className="mt-8 rounded-xl overflow-hidden border border-white/10">
          <div
            className="calendly-inline-widget"
            data-url={CALENDLY_URL}
            style={{ minWidth: "320px", height: "780px" }}
          />
        </div>
      </div>
    </section>
  );
}
