"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";
import loginImg from "../assets/img/login-gaming.jpg"

const IniciarSesion = () =>{

    const [usuario, setUsuario] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(false);

    const router = useRouter();

    const handleSubmit = (e: React.SubmitEvent) =>{
        e.preventDefault();

        if(usuario === "admin" && password==="12345"){
            router.push("/")
        }else if(usuario ==="usuario" && password ==="12345"){
            router.push("/")
        }else{
            setError(true);
        }
    };

    return(
        <main className="py-8 max-w-4xl mx-auto space-y-6">
            <div className="bg-white border border-zinc-200 rounded-xl shadow-sm overflow-hidden grid grid-cols-1 md:grid-cols-2">
                <div className="hidden md:flex self-start bg-white-100 items-center justify-center p-6 border-r border-zinc-100">
                    <Image
                    src={loginImg}
                    alt="Logo Retrogaming"
                    className="w-full h-auto object-contain rounded"
                    />
                </div>

                <div className="p-8 flex flex-col justify-center relative min-h-[300px]">
                    <h2 className="text-2xl font-bold text-center mb-6 text-zinc-800">
                        Iniciar sesión
                    </h2>
                    {error && (
                        <div className="bg-red-50 border border-red-200 text-red-700 text-xs rounded-lg p-3 mb-4 flex justify-between items-center">
                            <span><strong>¡Error!</strong> Usuario o contraseña mal ingresados</span>
                            <button
                                type="button"
                                onClick={()=> setError(false)}
                                className="text-red-500 font-bold ml-2"
                            >
                                X
                            </button>
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-xs font-semibold text-zinc-600 mb-1">
                                Usuario
                            </label>
                            <input
                                type="text"
                                required
                                value={usuario}
                                onChange={(e) => setUsuario(e.target.value)}
                                className="w-full border border-zinc-300 rounded px-3 py-2 text-sm outline-none focus:border-blue-500"
                            />
                        </div>

                        <div>
                            <label className="block text-xs font-semibold text-zinc-600 mb-1">
                                Contraseña
                            </label>
                            <input
                                type="password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full border border-zinc-300 rounded px-3 py-2 text-sm outline-none focus:border-blue-500"
                            />
                        </div>

                        <div className="flex justify-between items-center text-xs text-blue-600">
                            <Link href="/crear-sesion" className="hover:underline">
                                ¿No tienes cuenta? Regístrate
                            </Link>
                            <a href="/#" className="hover:underline text-zinc-500">
                                ¿Olvidaste tu contraseña?
                            </a>
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 rounded text-sm transition-colors"
                        >
                            Iniciar sesión
                        </button>
                    </form>
                </div>
            </div>
        </main>
    );

}
export default IniciarSesion;