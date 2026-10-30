"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image, { StaticImageData } from "next/image";

// Estructura del producto en el carrito
interface ItemCarrito {
  id: number;
  nombre: string;
  categoria: string;
  precio: number;
  stock: number;
  imagen?: string | StaticImageData;
  cantidad: number;
}

const Carrito =() =>{
  const [carrito, setCarrito] = useState<ItemCarrito[]>([]);
  const [cargado, setCargado] = useState(false);
  const [compraExitosa, setCompraExitosa] = useState(false);

  // 1. Cargar del localStorage solo en el cliente
  useEffect(() => {
    const guardado = localStorage.getItem("cart");
    if (guardado) {
      try {
        setCarrito(JSON.parse(guardado));
      } catch (e) {
        console.error("Error al leer el carrito:", e);
      }
    }
    setCargado(true);
  }, []);

  // 2. Guardar en localStorage cuando cambie el carrito
  const guardarCarrito = (nuevoCarrito: ItemCarrito[]) => {
    setCarrito(nuevoCarrito);
    localStorage.setItem("cart", JSON.stringify(nuevoCarrito));
  };

  // Sumar o restar cantidad validando el stock
  const cambiarCantidad = (id: number, delta: number) => {
    const nuevo = carrito.map((item) => {
      if (item.id === id) {
        const nuevaCantidad = item.cantidad + delta;

        // Validar límite superior por stock
        if (delta > 0 && nuevaCantidad > item.stock) {
          alert(`Solo hay ${item.stock} unidades disponibles de ${item.nombre}.`);
          return item;
        }

        return { ...item, cantidad: nuevaCantidad };
      }
      return item;
    }).filter((item) => item.cantidad > 0); // Si baja a 0, se quita

    guardarCarrito(nuevo);
  };

  // Eliminar un item específico
  const eliminarProducto = (id: number) => {
    const nuevo = carrito.filter((item) => item.id !== id);
    guardarCarrito(nuevo);
  };

  // Limpiar carrito completo
  const limpiarCarrito = () => {
    guardarCarrito([]);
  };

  // Simular pago
  const procesarCompra = () => {
    setCompraExitosa(true);
    guardarCarrito([]);
  };

  // Cálculo del total
  const total = carrito.reduce((acumulado, item) => acumulado + item.precio * item.cantidad, 0);

  if (!cargado) {
    return <div className="p-8 text-center text-zinc-500">Cargando carrito...</div>;
  }

  return (
    <main className="max-w-6xl mx-auto px-6 py-8 space-y-6">
      <div className="border-b pb-3">
        <h2 className="text-2xl font-bold text-zinc-800">Carrito de Compras</h2>
        <p className="text-xs text-zinc-500">Gestiona los artículos de tu orden</p>
      </div>

      {compraExitosa && (
        <div className="bg-emerald-50 border border-emerald-300 text-emerald-800 text-sm rounded-lg p-4 text-center font-semibold">
          ¡Compra realizada con éxito! Tu pedido está en preparación.
        </div>
      )}

      {carrito.length === 0 ? (
        <div className="bg-white border rounded-xl p-12 text-center space-y-4 shadow-sm">
          <p className="text-zinc-500 text-sm">Tu carrito actualmente está vacío.</p>
          <Link
            href="/"
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs px-4 py-2 rounded transition-colors"
          >
            Volver al catálogo
          </Link>
        </div>
      ) : (
        <div className="bg-white border rounded-xl shadow-sm overflow-hidden p-6 space-y-6">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="border-b text-xs text-zinc-500 uppercase bg-zinc-50">
                <tr>
                  <th className="py-3 px-4">Producto</th>
                  <th className="py-3 px-4">Precio</th>
                  <th className="py-3 px-4 text-center">Cantidad</th>
                  <th className="py-3 px-4">Subtotal</th>
                  <th className="py-3 px-4 text-center">Acción</th>
                </tr>
              </thead>
              <tbody className="divide-y text-zinc-800">
                {carrito.map((item) => (
                  <tr key={item.id}>
                    <td className="py-4 px-4 flex items-center gap-3">
                      {item.imagen && (
                        <div className="w-12 h-12 bg-zinc-100 rounded overflow-hidden flex-shrink-0 flex items-center justify-center">
                          <Image
                            src={item.imagen}
                            alt={item.nombre}
                            className="w-full h-full object-contain"
                          />
                        </div>
                      )}
                      <div>
                        <p className="font-bold text-sm leading-tight">{item.nombre}</p>
                        <span className="text-xs text-zinc-400">{item.categoria}</span>
                      </div>
                    </td>

                    <td className="py-4 px-4 font-medium">
                      ${item.precio.toLocaleString("es-CL")}
                    </td>

                    {/* Botones de + y - */}
                    <td className="py-4 px-4">
                      <div className="flex items-center justify-center gap-2">
                        <button
                          type="button"
                          onClick={() => cambiarCantidad(item.id, -1)}
                          className="w-7 h-7 rounded border border-zinc-300 hover:bg-zinc-100 flex items-center justify-center text-sm font-bold text-zinc-600"
                        >
                          -
                        </button>
                        <span className="font-semibold text-sm w-6 text-center">
                          {item.cantidad}
                        </span>
                        <button
                          type="button"
                          onClick={() => cambiarCantidad(item.id, 1)}
                          disabled={item.cantidad >= item.stock}
                          className="w-7 h-7 rounded border border-zinc-300 hover:bg-zinc-100 disabled:opacity-40 flex items-center justify-center text-sm font-bold text-zinc-600"
                        >
                          +
                        </button>
                      </div>
                    </td>

                    <td className="py-4 px-4 font-bold text-zinc-900">
                      ${(item.precio * item.cantidad).toLocaleString("es-CL")}
                    </td>

                    <td className="py-4 px-4 text-center">
                      <button
                        type="button"
                        onClick={() => eliminarProducto(item.id)}
                        className="text-red-500 hover:text-red-700 font-semibold text-xs border border-red-200 hover:border-red-400 px-3 py-1 rounded transition-colors"
                      >
                        Eliminar
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Barra de totales y acciones */}
          <div className="border-t pt-4 flex flex-col sm:flex-row justify-between items-center gap-4">
            <button
              type="button"
              onClick={limpiarCarrito}
              className="text-xs font-semibold text-zinc-500 hover:text-red-600 transition-colors"
            >
              Vaciar carrito
            </button>

            <div className="flex items-center gap-6">
              <div className="text-right">
                <span className="text-xs text-zinc-400 block">Total a pagar</span>
                <span className="text-xl font-extrabold text-zinc-900">
                  ${total.toLocaleString("es-CL")}
                </span>
              </div>

              <button
                type="button"
                onClick={procesarCompra}
                className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-6 py-2.5 rounded-lg text-sm shadow transition-colors"
              >
                Comprar ahora
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
export default Carrito;