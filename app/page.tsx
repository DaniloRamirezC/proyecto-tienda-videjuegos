"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import citiesImg from "./assets/img/cities.png";
import zeldaImg from "./assets/img/zelda.jpg";
import marioImg from "./assets/img/supermario.jpg";
import minecraftImg from "./assets/img/minecraft.jpg";
import forniteImg from "./assets/img/fornite.jpg";
import redTemImg from "./assets/img/redtemp2.jpg";
import witchImg from "./assets/img/witcher3.jpg"
import residImg from "./assets/img/residentevil.jpg"
import louImg from "./assets/img/lastofus.jpg"
import gowImg from "./assets/img/godwar.jpg"
import gtaImg from "./assets/img/gta6.png"
import anicrossImg from "./assets/img/animalcross.jpg"

const productosIniciales = [
  { id: 1, nombre: "The Legend of Zelda: Breath of the Wild", categoria: "Aventura", precio: 35990, stock: 10, imagen: zeldaImg },
  { id: 2, nombre: "Super Mario Odyssey", categoria: "Aventura" ,precio: 44990, stock: 5, imagen: marioImg },
  { id: 3, nombre: "Minecraft Legends", categoria: "Aventura", precio: 26990, stock: 20, imagen: minecraftImg},
  { id: 4, nombre: "Fortnite Darkfire & Ice Bundle", categoria: "Acción y Disparos", precio: 15990, stock: 0, imagen: forniteImg },
  { id: 5, nombre: "Red Dead Redemption 2", categoria: "Acción y Disparos", precio: 39990, stock: 8, imagen: redTemImg},
  { id: 6, nombre: "Cities Skylines II", categoria: "Simulación", precio: 25990, stock: 15, imagen: citiesImg },
  { id: 7, nombre: "The Witcher 3: Wild Hunt", categoria: "RPG/Rol", precio: 39990, stock: 4, imagen: witchImg },
  { id: 8, nombre: "Resident Evil Requiem", categoria: "Terror y Supervivencia", precio: 14990, stock: 0, imagen: residImg },
  { id: 9, nombre: "The Last of Us: Part I", categoria: "Terror y Supervivencia", precio: 20990, stock: 15, imagen: louImg },
  { id: 10, nombre: "God of War Ragnarok", categoria: "Acción y Disparos", precio: 18990, stock: 4, imagen: gowImg },
  { id: 11, nombre: "Grand Theft Auto VI", categoria: "Aventura", precio: 21990, stock: 0, imagen: gtaImg },
  { id: 12, nombre: "Animal Crossing: New Horizons", categoria: "Simulación", precio: 8990, stock: 6, imagen: anicrossImg },
];

function Catalogo() {
  const searchParams = useSearchParams();
  const busqueda = searchParams.get("q") || "";
  const soloDisponibles = searchParams.get("disponibles") === "true";

  const productosFiltrados = productosIniciales.filter((producto) => {
    const coincideTexto = 
      producto.nombre.toLowerCase().includes(busqueda.toLowerCase()) || 
      producto.categoria.toLowerCase().includes(busqueda.toLowerCase());

    const coincideStock = soloDisponibles ? producto.stock > 0 : true;

    return coincideTexto && coincideStock;
  });

  return (
    <main className="space-y-6 max-w-7xl mx-auto px-6 py-6">
      <div className="flex justify-between items-center border-b pb-3">
        <h3 className="font-bold text-xl text-zinc-800">
          Novedades ({productosFiltrados.length})
        </h3>
        {busqueda && (
          <span className="text-sm text-zinc-500">
            Filtro: &quot;<strong>{busqueda}</strong>&quot;
          </span>
        )}
      </div>

      {productosFiltrados.length === 0 ? (
        <p className="text-center py-16 text-zinc-500 text-sm">
          No se encontraron productos para tu búsqueda.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {productosFiltrados.map((item) => (
            <div
              key={item.id}
              className="bg-white border rounded-lg p-4 flex flex-col justify-between shadow-sm"
            >
              <div>
                <div className="h-72 w-full bg-zinc-50 rounded mb-3 overflow-hidden flex items-center justify-center p-2">
                  <Image
                    src={item.imagen}
                    alt={item.nombre}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                  />
                </div>
                <span className="text-xs font-semibold text-blue-600">
                  {item.categoria}
                </span>
                <h4 className="font-bold text-sm mt-1">{item.nombre}</h4>
              </div>

              <div className="mt-4 pt-3 border-t flex justify-between items-center">
                <span className="font-bold text-sm">
                  ${item.precio.toLocaleString("es-CL")}
                </span>
                <span
                  className={`text-xs font-bold ${
                    item.stock > 0 ? "text-green-600" : "text-red-500"
                  }`}
                >
                  {item.stock > 0 ? `Stock: ${item.stock}` : "Agotado"}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}

export default function Home() {
  return (
    <Suspense fallback={null}>
      <Catalogo />
    </Suspense>
  );
}