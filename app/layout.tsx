import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Link from "next/link";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Retrogaming Haven",
  description: "Tienda de videojuegos",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="es"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <nav className="flex items-center justify-between border-b border-zinc-200 px-8 py-4 dark:border-zinc-800">
          <ul className="flex gap-6 font-medium text-sm">
                <li><Link href="/" className="hover:text-blue-600">Home</Link></li>
                <li><Link href="/categorias" className="hover:text-blue-600">Categorías</Link></li>
                <li><Link href="/ofertas" className="hover:text-blue-600">Ofertas</Link></li>
                <li><Link href="/nosotros" className="hover:text-blue-600">Nosotros</Link></li>
                <li><Link href="/contacto" className="hover:text-blue-600">Contacto</Link></li>
              </ul>
              <div className="flex items-center gap-3">
    <Link
      href="/iniciar-sesion"
      className="rounded-lg border border-blue-600 px-4 py-2 text-sm font-medium text-blue-600 transition-colors hover:bg-blue-50 dark:hover:bg-zinc-900"
    >
      Iniciar Sesión
    </Link>
    <Link
      href="/crear-sesion"
      className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700"
    >
      Crear Cuenta
    </Link>
    </div>
    </nav>
      {children}
      </body>
    </html>
  );
}
