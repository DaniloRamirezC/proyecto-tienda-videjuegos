import { describe, it } from "node:test";
import assert from "node:assert";
import { filtrarCatalogo, totalCarrito } from "../data/tiendaLogic.ts";

const inventarioTest = [
    { id: 1, nombre: "The Legend of Zelda: Breath of the Wild", categoria: "Aventura", precio: 35990, stock: 10 },
    { id: 2, nombre: "Super Mario Odyssey", categoria: "Aventura" ,precio: 44990, stock: 5 },
    { id: 3, nombre: "Minecraft Legends", categoria: "Aventura", precio: 26990, stock: 20 },
    { id: 4, nombre: "Fortnite Darkfire & Ice Bundle", categoria: "Acción y Disparos", precio: 15990, stock: 0 },
    { id: 5, nombre: "Red Dead Redemption 2", categoria: "Acción y Disparos", precio: 39990, stock: 8 },
];

describe("Módulo: Catálogo y Buscador de juegos", () => {

    describe("Casos positivos (coincidencias válidas)", () => {
        it("Debe encontrar juego con coincidencia exacta en el título", () =>{
            const resultado = filtrarCatalogo(inventarioTest, "Super Mario Odyssey",false);
            assert.strictEqual(resultado.length, 1);
            assert.strictEqual(resultado[0].nombre, "Super Mario Odyssey");
        });
        it("Debe ser insensible a mayúsculas y miníscula", () =>{
            const resultado = filtrarCatalogo(inventarioTest, "zElDa",false);
            assert.strictEqual(resultado.length, 1);
            assert.strictEqual(resultado[0].id, 1);
        });
        it("Debe filtrar por coincidencia parcial de texto ('Mario')", () =>{
            const resultado = filtrarCatalogo(inventarioTest, "Mario",false);
            assert.strictEqual(resultado.length, 1);
            assert.strictEqual(resultado[0].nombre, "Super Mario Odyssey" );
        });
        it("Debe filtrar por categoría ('Aventura')", () =>{
            const resultado = filtrarCatalogo(inventarioTest, "Aventura",false);
            assert.strictEqual(resultado.length, 3);
        });
        it("Debe retornar todos los juegos si el término de búsqueda está vacío", () =>{
            const resultado = filtrarCatalogo(inventarioTest, "",false);
            assert.strictEqual(resultado.length, 5);
        });
    });
    describe("Casos negativos", () => {
        it("Debe encontrar juego arreglo vacío ante un juego que no exista", () =>{
            const resultado = filtrarCatalogo(inventarioTest, "Cyberpunkk 2077",false);
            assert.strictEqual(resultado.length, 0);
        })
        it("Debe manejar texto compuesto únicamente por espacios sin arrojar error", () =>{
            const resultado = filtrarCatalogo(inventarioTest, "  ",false);
            assert.strictEqual(resultado.length, 5);
        });
    });
});
describe("Módulo: Filtro de disponibilidad de stock", () => {
        it("Debe excluir completamente los juegos cuyo stock sea 0 al marcar 'soloDisponibles'", () =>{
            const resultado = filtrarCatalogo(inventarioTest,"",true);
            assert.strictEqual(resultado.length, 4);
            const existeAgotado = resultado.some((juego) => juego.stock <= 0);
            assert.strictEqual(existeAgotado,false)
        });
        it("Debe combinar búsqueda de texto con filtro de stock disponible simultáneamente", () =>{
            const resultado = filtrarCatalogo(inventarioTest,"Acción",true);
            assert.strictEqual(resultado.length, 1);
            assert.strictEqual(resultado[0].nombre, "Red Dead Redemption 2");
        });
    });
    describe("Módulo: Calculo total del carrito de compras", () => {
        describe("Casos positivos (cálculos de compra)", () => {
            it("Debe encontrar juego con coincidencia exacta en el título", () =>{
                const carrito = [{ id: 1, precio: 35990, cantidad: 1 }];
                const total = totalCarrito(carrito);
                assert.strictEqual(total,35990);
            });
            it("Debe multiplicar precio unitario por cantidad múltiple (2 × 44.990)", () =>{
                const carrito = [{ id: 2, precio: 44990, cantidad: 2 }];
                const total = totalCarrito(carrito);
                assert.strictEqual(total,89980);
            });
            it("debe calcular la suma de diferentes artículos en el carrito ", () =>{
                const carrito = [
                    { id: 1, precio: 35990, cantidad: 1 },
                    { id: 4, precio: 15990, cantidad: 2 },
                ];
                const total = totalCarrito(carrito);
                assert.strictEqual(total,67970);
            });
        });
        describe("Casos negativos (Manejo de vacíos y anomalías)", () => {
            it("Debe retornar 0 si el carrito está vacío", () =>{
                const total = totalCarrito([]);
                assert.strictEqual(total,0);
            });

            it("No debe sumar montos si la cantidad de un artículo es 0 o negativo", () =>{
                const carritoInvalido = [{ id: 2, precio: 44990, cantidad: -1 }];
                const total = totalCarrito(carritoInvalido);
                assert.strictEqual(total,0);
            });
        });
    });