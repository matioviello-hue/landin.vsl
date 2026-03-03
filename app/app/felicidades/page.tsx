"use client";

import { useEffect } from "react";

export default function GraciasPage() {

  useEffect(() => {
    // Dispara evento para Meta Pixel
    // @ts-ignore
    if (window.fbq) {
      // @ts-ignore
      window.fbq("track", "Lead");
    }
  }, []);

  return (
    <main className="min-h-screen flex items-center justify-center px-6 text-center">
      <div className="max-w-xl">
        <h1 className="text-3xl md:text-4xl font-bold">
          ¡Listo! Reunión agendada ✅
        </h1>

        <p className="mt-4 text-base md:text-lg opacity-80">
          Te va a llegar un email con el link de la reunión y los detalles.
        </p>

        <p className="mt-6 text-sm opacity-70">
          Si no lo ves, revisá spam o promociones.
        </p>
      </div>
    </main>
  );
}
