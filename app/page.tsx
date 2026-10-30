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

  const carroProducto = (producto: any) => {
  const guardado = localStorage.getItem("cart");
  let cart = guardado ? JSON.parse(guardado) : [];

  const existente = cart.find((item: any) => item.id === producto.id);

  if (existente) {
    if (existente.cantidad >= producto.stock) {
      alert(`No puedes agregar más de ${producto.stock} unidades de este juego.`);
      return;
    }
    existente.cantidad += 1;
  } else {
    cart.push({ ...producto, cantidad: 1 });
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  alert(`"${producto.nombre}" fue añadido al carrito`);
};

  return (
   <div className="min-h-screen bg-gray-900 text-white">
    <main className="space-y-6 max-w-7xl mx-auto px-6 py-6">
      <div className="flex justify-between items-center border-b pb-3">
        <h3 className="font-bold text-3xl text-white">
          Novedades
        </h3>
        <p className="text-gray-400 text-sm mt-1">
            Explora los títulos disponibles en Retrogaming Haven.
        </p>
        {busqueda && (
          <span className="text-sm text-gray-400">
            Filtro: &quot;<strong className="text-purple-400">{busqueda}</strong>&quot;
          </span>
        )}
      </div>

      {productosFiltrados.length === 0 ? (
        <p className="text-center py-16 text-gray-400 text-sm">
          No se encontraron productos para tu búsqueda.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {productosFiltrados.map((item) => (
            <div
              key={item.id}
              className="bg-gray-800 border border-gray-700 rounded-lg overflow-hidden shadow-lg flex flex-col justify-between hover:border-purple-500 transition duration-300"
            >
              <div>
                <div className="h-80 w-full overflow-hidden rounded-t-lg bg-gray-900 relative">
                  <Image
                    src={item.imagen}
                    alt={item.nombre}
                    className="w-full h-full object-fill transition-transform duration-300 hover:scale-105"
                  />
                </div>
                <div className="p-4 pb-0">
                  <span className="text-xs font-semibold text-purple-400 uppercase tracking-wider block mb-1">
                    {item.categoria}
                  </span>
                  <h4 className="font-bold text-base text-white line-clamp-2">{item.nombre}</h4>
                </div>
              </div>

              <div className="p-4 pt-3 border-t border-gray-700 mt-4">
                <div className="flex justify-between items-center mb-3">
                  <span className="font-bold text-xl text-green-400">
                    ${item.precio.toLocaleString("es-CL")}
                  </span>
                  <span
                    className={`text-xs font-bold ${
                      item.stock > 0 ? "text-green-500" : "text-red-400"
                    }`}
                  >
                    {item.stock > 0 ? `Stock: ${item.stock}` : "Agotado"}
                  </span>
                </div>

                <button
                  type="button"
                  disabled={item.stock === 0}
                  onClick={() => carroProducto(item)}
                  className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-700 disabled:text-gray-500 disabled:cursor-not-allowed text-white text-xs font-bold py-2.5 rounded transition-colors"
                  >
                  {item.stock > 0 ? "Añadir al carrito" : "Sin Stock"}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
   </div>
  );
}

export default function Home() {
  return (
    <Suspense fallback={null}>
      <Catalogo />
    </Suspense>
  );
}