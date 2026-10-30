"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import sessionImg from "../assets/img/session-img.jpg"

interface RegionData {
  region: string;
  comunas: string[];
}

const CrearSesion = () => {
  const router = useRouter();

  const [listaRegiones, setListaRegiones] = useState<RegionData[]>([]);
  const [regionSeleccionada, setRegionSeleccionada] = useState<string>("");
  const [comunaSeleccionada, setComunaSeleccionada] = useState<string>("");
  const [cargandoZonas, setCargandoZonas] = useState<boolean>(true);

  const [run, setRun] = useState("");
  const [fechaNacimiento, setFechaNacimiento] = useState("");
  const [nombre, setNombre] = useState("");
  const [apellidos, setApellidos] = useState("");
  const [correo, setCorreo] = useState("");
  const [password, setPassword] = useState("");
  const [calle, setCalle] = useState("");
  const [departamento, setDepartamento] = useState("");
  const [indicaciones, setIndicaciones] = useState("");

  const [mensajeExito, setMensajeExito] = useState(false);

  
  useEffect(() => {
    fetch("https://juanbrujo.github.io/chile-regiones-comunas/data/original-simple.json")
      .then((res) => res.json())
      .then((data) => {
        const lista: RegionData[] = Array.isArray(data) ? data : data.regiones || [];
        setListaRegiones(lista);
        if (lista.length > 0) {
          setRegionSeleccionada(lista[0].region);
          if (lista[0].comunas.length > 0) {
            setComunaSeleccionada(lista[0].comunas[0]);
          }
        }
        setCargandoZonas(false);
      })
      .catch((err) => {
        console.error("Error al cargar regiones:", err);
        setCargandoZonas(false);
      });
  }, []);


  const comunasDeLaRegion =
    listaRegiones.find((r) => r.region === regionSeleccionada)?.comunas || [];


  const handleGuardar = (e: React.SubmitEvent) => {
    e.preventDefault();

    const nuevoUsuario = {
      run,
      fechaNacimiento,
      nombre,
      apellidos,
      correo,
      direccion: `${calle} ${departamento}, Región ${regionSeleccionada}, Comuna ${comunaSeleccionada}`,
      indicaciones,
    };
    
    localStorage.setItem("usuario_registrado", JSON.stringify(nuevoUsuario));
    setMensajeExito(true);

    setTimeout(() => {
      router.push("/iniciar-sesion");
    }, 1500);
  };

  return (
    <main className="py-8 max-w-5xl mx-auto space-y-6">
      

      {mensajeExito && (
        <div className="bg-emerald-50 border border-emerald-300 text-emerald-800 text-sm rounded-lg p-4 text-center font-semibold">
          ¡Usuario registrado con éxito! Redirigiendo a Iniciar Sesión...
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 bg-white border border-zinc-200 rounded-xl shadow-sm overflow-hidden p-6">
        

        <div className="hidden md:flex md:col-span-4 bg-white-100 rounded-lg items-center justify-center p-4">
          <div className="w-full h-72 bg-white-200 rounded flex items-center justify-center text-zinc-400 font-semibold text-sm">
            <Image
                src={sessionImg}
                alt="Logo Retrogaming"
                className="w-full h-auto object-contain rounded"
            />
          </div>
        </div>


        <div className="col-span-1 md:col-span-8">
          <h2 className="text-xl font-bold text-zinc-800 mb-1">
            Registro de nuevo usuario
          </h2>
          <p className="text-zinc-500 text-xs mb-5">Bienvenidos</p>

          <form onSubmit={handleGuardar} className="space-y-4">
            

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-zinc-700 mb-1">
                  Run <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ej: 12345678-K"
                  value={run}
                  onChange={(e) => setRun(e.target.value)}
                  className="w-full border border-zinc-300 rounded px-3 py-1.5 text-sm outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-700 mb-1">
                  Fecha nacimiento <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  required
                  value={fechaNacimiento}
                  onChange={(e) => setFechaNacimiento(e.target.value)}
                  className="w-full border border-zinc-300 rounded px-3 py-1.5 text-sm outline-none focus:border-blue-500"
                />
              </div>
            </div>


            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-zinc-700 mb-1">
                  Nombre <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                  className="w-full border border-zinc-300 rounded px-3 py-1.5 text-sm outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-700 mb-1">
                  Apellidos <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={apellidos}
                  onChange={(e) => setApellidos(e.target.value)}
                  className="w-full border border-zinc-300 rounded px-3 py-1.5 text-sm outline-none focus:border-blue-500"
                />
              </div>
            </div>


            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-zinc-700 mb-1">
                  Correo <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  required
                  value={correo}
                  onChange={(e) => setCorreo(e.target.value)}
                  className="w-full border border-zinc-300 rounded px-3 py-1.5 text-sm outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-700 mb-1">
                  Contraseña <span className="text-red-500">*</span>
                </label>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full border border-zinc-300 rounded px-3 py-1.5 text-sm outline-none focus:border-blue-500"
                />
              </div>
            </div>

            <hr className="my-4 border-zinc-200" />


            <h3 className="text-sm font-bold text-zinc-800">
              Dirección de la entrega de los productos
            </h3>
            <p className="text-zinc-500 text-xs -mt-3">
              Ingrese dirección de forma detallada
            </p>


            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-zinc-700 mb-1">
                  Calle <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={calle}
                  onChange={(e) => setCalle(e.target.value)}
                  className="w-full border border-zinc-300 rounded px-3 py-1.5 text-sm outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-700 mb-1">
                  Departamento (opcional)
                </label>
                <input
                  type="text"
                  placeholder="Ej: 609"
                  value={departamento}
                  onChange={(e) => setDepartamento(e.target.value)}
                  className="w-full border border-zinc-300 rounded px-3 py-1.5 text-sm outline-none focus:border-blue-500"
                />
              </div>
            </div>


            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-zinc-700 mb-1">
                  Región <span className="text-red-500">*</span>
                </label>
                <select
                  disabled={cargandoZonas}
                  value={regionSeleccionada}
                  onChange={(e) => {
                    const nuevaRegion = e.target.value;
                    setRegionSeleccionada(nuevaRegion);

                    const dataRegion = listaRegiones.find((r) => r.region === nuevaRegion);
                    if (dataRegion && dataRegion.comunas.length > 0) {
                      setComunaSeleccionada(dataRegion.comunas[0]);
                    } else {
                      setComunaSeleccionada("");
                    }
                  }}
                  className="w-full border border-zinc-300 rounded px-3 py-1.5 text-sm outline-none bg-white focus:border-blue-500"
                >
                  {cargandoZonas ? (
                    <option>Cargando regiones...</option>
                  ) : (
                    listaRegiones.map((item) => (
                      <option key={item.region} value={item.region}>
                        {item.region}
                      </option>
                    ))
                  )}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-700 mb-1">
                  Comuna <span className="text-red-500">*</span>
                </label>
                <select
                  disabled={cargandoZonas || comunasDeLaRegion.length === 0}
                  value={comunaSeleccionada}
                  onChange={(e) => setComunaSeleccionada(e.target.value)}
                  className="w-full border border-zinc-300 rounded px-3 py-1.5 text-sm outline-none bg-white focus:border-blue-500"
                >
                  {comunasDeLaRegion.map((comuna) => (
                    <option key={comuna} value={comuna}>
                      {comuna}
                    </option>
                  ))}
                </select>
              </div>
            </div>


            <div>
              <label className="block text-xs font-semibold text-zinc-700 mb-1">
                Indicaciones para la entrega (opcional)
              </label>
              <textarea
                rows={2}
                value={indicaciones}
                onChange={(e) => setIndicaciones(e.target.value)}
                placeholder="Ej.: Entre calles, color del edificio, no tiene timbre."
                className="w-full border border-zinc-300 rounded px-3 py-1.5 text-sm outline-none focus:border-blue-500"
              />
            </div>


            <div className="flex justify-end pt-2">
              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-6 py-2 rounded text-sm transition-colors"
              >
                Guardar
              </button>
            </div>

          </form>
        </div>

      </div>
    </main>
  );
}
export default CrearSesion;