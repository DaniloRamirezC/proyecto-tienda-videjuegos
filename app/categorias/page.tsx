import Link from 'next/link';

import bannerAccion from '../assets/img/BannerAccion.png';
import bannerRpg from '../assets/img/BannerRpg.jpg';
import bannerAventura from '../assets/img/BannerAventura.jpg';
import bannerDeportes from '../assets/img/BannerDeporte.jpg';
import bannerEstrategia from '../assets/img/BannerEstrategia.jpg';
import bannerTerror from '../assets/img/BannerTerror.jpg';
import bannerSimulacion from '../assets/img/BannerSimulacion.jpg';
import bannerLucha from '../assets/img/BannerLucha.jpg';

function CategoriasPage() {
  const categorias = [
    { 
      id: 1, 
      nombre: "Acción y Disparos", 
      descripcion: "Juegos intensos llenos de adrenalina y combate.", 
      imagen: bannerAccion, 
      cantidad: "15 juegos" 
    },
    { 
      id: 2, 
      nombre: "RPG / Rol", 
      descripcion: "Historias profundas, magia y desarrollo de personajes.", 
      imagen: bannerRpg, 
      cantidad: "12 juegos" 
    },
    { 
      id: 3, 
      nombre: "Aventura", 
      descripcion: "Explora mundos abiertos y descubre grandes misterios.", 
      imagen: bannerAventura, 
      cantidad: "20 juegos" 
    },
    { 
      id: 4, 
      nombre: "Deportes", 
      descripcion: "Simulación y competición al límite.", 
      imagen: bannerDeportes, 
      cantidad: "8 juegos" 
    },
    { 
      id: 5, 
      nombre: "Estrategia", 
      descripcion: "Planea tus tácticas, gestiona recursos y domina el mapa.", 
      imagen: bannerEstrategia, 
      cantidad: "10 juegos" 
    },
    { 
      id: 6, 
      nombre: "Terror y Supervivencia", 
      descripcion: "Enfrenta tus miedos con recursos limitados y tensión constante.", 
      imagen: bannerTerror, 
      cantidad: "7 juegos" 
    },
    { 
      id: 7, 
      nombre: "Simulación", 
      descripcion: "Experiencias realistas de construcción, vida y gestión.", 
      imagen: bannerSimulacion, 
      cantidad: "14 juegos" 
    },
    { 
      id: 8, 
      nombre: "Peleas / Lucha", 
      descripcion: "Combates 1 contra 1, combos espectaculares y artes marciales.", 
      imagen: bannerLucha, 
      cantidad: "9 juegos" 
    },
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-6xl mx-auto">
        
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Categorías de Videojuegos</h1>
          <Link 
            href="/" 
            className="bg-blue-600 px-4 py-2 rounded hover:bg-blue-700 transition"
          >
            Volver al Inicio
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {categorias.map((cat) => (
            <div 
              key={cat.id} 
              className="bg-gray-800 rounded-lg overflow-hidden shadow-lg border border-gray-700 flex flex-col hover:border-purple-500 transition cursor-pointer"
            >

              <div className="h-36 bg-gray-700 relative">
                <img 
                  src={cat.imagen.src} 
                  alt={cat.nombre} 
                  className="w-full h-full object-cover opacity-80 hover:opacity-100 transition" 
                />
              </div>

              <div className="p-4 flex flex-col flex-grow">
                <h2 className="text-xl font-semibold mb-1">{cat.nombre}</h2>
                <p className="text-gray-400 text-sm mb-4 flex-grow">{cat.descripcion}</p>
                <div className="flex justify-between items-center mt-auto">
                  <span className="text-purple-400 text-xs font-semibold">{cat.cantidad}</span>
                  <span className="text-sm text-blue-400 hover:underline">Ver más →</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default CategoriasPage;