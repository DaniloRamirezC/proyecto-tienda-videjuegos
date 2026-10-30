import Link from 'next/link';

import bannerAccion from '../assets/img/BannerAccion.png';
import bannerRpg from '../assets/img/BannerRpg.jpg';
import bannerAventura from '../assets/img/BannerAventura.jpg';
import bannerDeportes from '../assets/img/BannerDeporte.jpg';
import bannerEstrategia from '../assets/img/BannerEstrategia.jpg';
import bannerTerror from '../assets/img/BannerTerror.jpg';
import bannerSimulacion from '../assets/img/BannerSimulacion.jpg';
import bannerLucha from '../assets/img/BannerLucha.jpg';

function OfertasPage() {
  const ofertas = [
    {
      id: 1,
      nombre: "Selección de Acción",
      categoria: "Acción y Disparos",
      descripcion: "Juegos intensos llenos de adrenalina y combate.",
      imagen: bannerAccion,
      precioAnterior: "$24.990",
      precioOferta: "$17.990",
      descuento: "28%",
    },
    {
      id: 2,
      nombre: "Aventura en Oferta",
      categoria: "Aventura",
      descripcion: "Explora mundos abiertos y descubre grandes misterios.",
      imagen: bannerAventura,
      precioAnterior: "$19.990",
      precioOferta: "$14.990",
      descuento: "25%",
    },
    {
      id: 3,
      nombre: "Pack Deportivo",
      categoria: "Deportes",
      descripcion: "Simulación y competición al límite.",
      imagen: bannerDeportes,
      precioAnterior: "$15.990",
      precioOferta: "$11.990",
      descuento: "25%",
    },
    {
      id: 4,
      nombre: "Colección RPG",
      categoria: "RPG / Rol",
      descripcion: "Historias profundas, magia y desarrollo de personajes.",
      imagen: bannerRpg,
      precioAnterior: "$29.990",
      precioOferta: "$21.990",
      descuento: "27%",
    },
    {
      id: 5,
      nombre: "Estrategia Especial",
      categoria: "Estrategia",
      descripcion: "Planea tus tácticas, gestiona recursos y domina el mapa.",
      imagen: bannerEstrategia,
      precioAnterior: "$18.990",
      precioOferta: "$14.990",
      descuento: "21%",
    },
    {
      id: 6,
      nombre: "Terror con Descuento",
      categoria: "Terror y Supervivencia",
      descripcion: "Enfrenta tus miedos con recursos limitados y tensión constante.",
      imagen: bannerTerror,
      precioAnterior: "$21.990",
      precioOferta: "$16.990",
      descuento: "23%",
    },
    {
      id: 7,
      nombre: "Simulación en Oferta",
      categoria: "Simulación",
      descripcion: "Experiencias realistas de construcción, vida y gestión.",
      imagen: bannerSimulacion,
      precioAnterior: "$16.990",
      precioOferta: "$12.990",
      descuento: "24%",
    },
    {
      id: 8,
      nombre: "Pack de Lucha",
      categoria: "Peleas / Lucha",
      descripcion: "Combates uno contra uno y combos espectaculares.",
      imagen: bannerLucha,
      precioAnterior: "$14.990",
      precioOferta: "$10.990",
      descuento: "27%",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-6xl mx-auto">

        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold">Ofertas de Videojuegos</h1>
            <p className="text-gray-400 text-sm mt-2">
              Encuentra tus juegos favoritos a precios especiales.
            </p>
          </div>
          <Link
            href="/"
            className="bg-blue-600 px-4 py-2 rounded hover:bg-blue-700 transition"
          >
            Volver al Inicio
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {ofertas.map((oferta) => (
            <div
              key={oferta.id}
              className="bg-gray-800 rounded-lg overflow-hidden shadow-lg border border-gray-700 flex flex-col hover:border-purple-500 transition"
            >
              <div className="h-36 bg-gray-700 relative">
                <img
                  src={oferta.imagen.src}
                  alt={oferta.categoria}
                  className="w-full h-full object-cover opacity-80 hover:opacity-100 transition"
                />
                <span className="absolute top-2 right-2 bg-red-600 text-white text-sm font-bold px-3 py-1 rounded">
                  -{oferta.descuento}
                </span>
              </div>

              <div className="p-4 flex flex-col flex-grow">
                <span className="text-purple-400 text-xs font-semibold mb-1">
                  {oferta.categoria}
                </span>
                <h2 className="text-xl font-semibold mb-1">{oferta.nombre}</h2>
                <p className="text-gray-400 text-sm mb-4 flex-grow">
                  {oferta.descripcion}
                </p>

                <div className="mt-auto">
                  <p className="text-gray-500 text-sm line-through">
                    {oferta.precioAnterior}
                  </p>
                  <p className="text-green-400 text-2xl font-bold">
                    {oferta.precioOferta}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <p className="text-gray-500 text-xs mt-6">
          Los precios y descuentos mostrados son de ejemplo.
        </p>
      </div>
    </div>
  );
}

export default OfertasPage;
