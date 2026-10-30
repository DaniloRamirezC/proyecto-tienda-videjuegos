"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

const BarraBusqueda = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [texto, setTexto] = useState(searchParams.get("q") || "");
  const soloDisponibles = searchParams.get("disponibles") === "true";

  useEffect(() => {
    setTexto(searchParams.get("q") || "");
  }, [searchParams]);

  const handleChange = (nuevoTexto: string) => {
    setTexto(nuevoTexto);
    const params = new URLSearchParams(searchParams.toString());
    if (nuevoTexto.trim()) {
      params.set("q", nuevoTexto);
    } else {
      params.delete("q");
    }
    router.replace(`/?${params.toString()}`);
  };

  const toggleDisponibles = () => {
    const params = new URLSearchParams(searchParams.toString());
    if (!soloDisponibles) {
      params.set("disponibles", "true");
    } else {
      params.delete("disponibles");
    }
    router.replace(`/?${params.toString()}`);
  };

  return (
    <div className="flex items-center gap-2 flex-1 w-full max-w-lg mx-auto">
      <input
        type="text"
        placeholder="Buscar juego..."
        value={texto}
        onChange={(e) => handleChange(e.target.value)}
        className="w-full border border-zinc-300 rounded px-3 py-1.5 text-sm outline-none focus:border-blue-500"
      />
      <button
        type="button"
        onClick={toggleDisponibles}
        className={`whitespace-nowrap px-3 py-1.5 text-sm font-semibold rounded border transition-colors ${
          soloDisponibles
            ? "bg-green-600 text-white border-green-600"
            : "border-green-600 text-green-600 hover:bg-green-50"
        }`}
      >
        {soloDisponibles ? "✓ Disponibles" : "Ver solo Disponibles"}
      </button>
    </div>
  );
};

export default BarraBusqueda;