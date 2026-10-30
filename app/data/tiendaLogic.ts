export interface Juego{
    id: number;
    nombre: string;
    categoria: string;
    precio: number;
    stock: number;
}

export interface Carrito{
    id: number;
    precio: number;
    cantidad: number;
}

export function filtrarCatalogo(
    juegos: Juego[],
    terminoBusqueda: string,
    soloDisponible: boolean
): Juego[]{
    const terminoLimpio = terminoBusqueda.trim().toLowerCase();

    return juegos.filter((juego) => {
        const coincideText = 
        terminoLimpio === "" || juego.nombre.toLowerCase().includes(terminoLimpio) ||
        juego.categoria.toLowerCase().includes(terminoLimpio);

        const coincideStock = soloDisponible ? juego.stock > 0: true;
        return coincideText && coincideStock;
    });
}

export function totalCarrito(items: Carrito[]): number {
    if(!Array.isArray(items) || items.length === 0) return 0;

    return items.reduce((acumulado, item) => {
        const cantidadVal = item.cantidad > 0 ? item.cantidad: 0;
        return acumulado + item.precio * cantidadVal;
    }, 0)
}