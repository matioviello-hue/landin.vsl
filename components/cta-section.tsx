"use client";

import { useEffect } from "react";

const CALENDLY_URL =
 "https://calendly.com/matiovierro/sesion-de-consultoria-1-a-1-clon"

export function CtaSection() {
  useEffect(() => {
    // Carga el script del widget (una sola vez)
    const existing = document.querySelector(
      'script[src="https://assets.calendly.com/assets/external/widget.js"]'
    );
    if (existing) return;

    const s = document.createElement("script");
    s.src = "https://assets.calendly.com/assets/external/widget.js";
    s.async = true;
    document.body.appendChild(s);
  }, []);

  return (
    <section className="px-6 py-10 text-center md:py-14">
      <h2 className="text-2xl md:text-3xl font-semibold mb-3">
        Agendá tu análisis integral
      </h2>
      <p className="mx-auto mb-6 max-w-xl text-sm md:text-base text-muted-foreground">
        Te mostramos exactamente qué sistema implementar primero.
      </p>

      {/* Calendly INLINE (sin redirigir) */}
      <div
        className="mx-auto max-w-3xl rounded-lg overflow-hidden border border-border bg-black"
        style={{ minHeight: 720 }}
      >
        <div
          className="calendly-inline-widget"
          data-url={CALENDLY_URL}
          style={{ minWidth: "320px", height: "720px" }}
        />
      </div>
    </section>
  );
}
