import Image from "next/image";
import bannerImg from "../assets/img/banner2.png"

const Nosotros = () => {
  return (
    <div className="flex flex-1 justify-center bg-zinc-50 py-12 px-4 font-sans dark:bg-black">
      {/* Contenedor tipo Card */}
      <div className="w-full max-w-3xl overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
        
        {/* Imagen del Banner (card-img-top) */}
        <Image
          src={bannerImg}
          alt="Videojuegos Retro"
          className="h-64 w-full object-cover"
        />

        {/* Cuerpo de la Card (card-body) */}
        <div className="flex flex-col gap-6 p-8 sm:p-10">
          
          {/* Título principal centrado */}
          <h1 className="text-center text-2xl font-bold text-zinc-900 dark:text-white sm:text-3xl">
            🎮 Historia de RetroGaming Haven
          </h1>

          {/* Sección 1 */}
          <div className="flex flex-col gap-2">
            <h2 className="text-xl font-bold text-zinc-800 dark:text-zinc-100">
              Un Viaje al Pasado 🚀
            </h2>
            <p className="text-justify text-sm leading-relaxed text-zinc-600 dark:text-zinc-400 sm:text-base">
              RetroGaming Haven nació en el año 2010, en un pequeño local del centro de la ciudad, fundado por dos amigos apasionados por los videojuegos de su infancia. Con un sueño compartido de revivir la emoción de las consolas y juegos clásicos, comenzaron a coleccionar, restaurar y vender videojuegos y consolas retro.
            </p>
          </div>

          {/* Sección 2 */}
          <div className="flex flex-col gap-2">
            <h2 className="text-xl font-bold text-zinc-800 dark:text-zinc-100">
              Crecimiento y Comunidad 🌟
            </h2>
            <p className="text-justify text-sm leading-relaxed text-zinc-600 dark:text-zinc-400 sm:text-base">
              Con el tiempo, RetroGaming Haven se ganó la reputación de ser un santuario para los amantes de los videojuegos clásicos. Organizamos eventos temáticos y torneos que reúnen a jugadores de todas las edades para compartir su amor por los juegos de antaño. Nuestra comunidad creció rápidamente, y en 2015, inauguramos nuestra tienda en línea, permitiendo que los aficionados de todo el mundo accedan a nuestro catálogo de tesoros retro.
            </p>
          </div>

          {/* Sección Misión */}
          <div className="flex flex-col gap-2">
            <h2 className="text-xl font-bold text-zinc-800 dark:text-zinc-100">
              🎯 Misión
            </h2>
            <p className="text-justify text-sm leading-relaxed text-zinc-600 dark:text-zinc-400 sm:text-base">
              Nuestra misión es preservar y celebrar la rica historia de los videojuegos, ofreciendo una experiencia única y nostálgica a nuestros clientes. Nos esforzamos por ser un puente entre generaciones, proporcionando productos de calidad y servicios excepcionales a los coleccionistas y entusiastas del gaming clásico.
            </p>
          </div>

          {/* Sección Visión */}
          <div className="flex flex-col gap-2">
            <h2 className="text-xl font-bold text-zinc-800 dark:text-zinc-100">
              👁️ Visión
            </h2>
            <p className="text-justify text-sm leading-relaxed text-zinc-600 dark:text-zinc-400 sm:text-base">
              En RetroGaming Haven, soñamos con ser líderes mundiales en el mercado de videojuegos retro, comprometidos con la innovación y la expansión de nuestra comunidad global. Buscamos ser el destino predilecto para quienes desean revivir y compartir los momentos dorados del pasado del gaming.
            </p>
          </div>

          {/* Sección Innovación Continua */}
          <div className="flex flex-col gap-2">
            <h2 className="text-xl font-bold text-zinc-800 dark:text-zinc-100">
              🚀 Innovación Continua
            </h2>
            <p className="text-justify text-sm leading-relaxed text-zinc-600 dark:text-zinc-400 sm:text-base">
              A lo largo de los años, hemos ampliado nuestra oferta para incluir servicios de reparación y restauración de consolas, así como una línea exclusiva de merchandising inspirado en los clásicos del videojuego. En el futuro, planeamos lanzar una serie de documentales que exploren la evolución de los videojuegos y su impacto en la cultura popular.
            </p>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Nosotros;