"use client";

import { useEffect } from "react";

export default function GraciasPage() {

  useEffect(() => {
    // Evento para Meta Pixel (cuando llegan acá)
    // @ts-ignore
    if (window.fbq) {
      // @ts-ignore
      window.fbq("track", "Lead");
    }
  }, []);

  return (
    <main className="min-h-screen flex items-center justify-center bg-background px-6">
      <div className="text-center max-w-xl">
        <h1 className="text-3xl md:text-4xl font-semibold mb-4">
          ✅ Llamada agendada
        </h1>

        <p className="text-muted-foreground text-lg">
          Revisá tu email porque ya te enviamos la confirmación.
        </p>

        <p className="mt-4 text-sm opacity-70">
          Nos vemos en la reunión.
        </p>
      </div>
    </main>
  );
}
