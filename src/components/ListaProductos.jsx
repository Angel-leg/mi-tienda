import { useMemo, useState } from "react";
import { Search, Sparkles, X } from "lucide-react";
import productos from "../data/productos.json";
import ProductoCard from "./ProductoCard";

export default function ListaProductos() {
  const [busqueda, setBusqueda] = useState("");
  const [categoriaActiva, setCategoriaActiva] = useState("Todas");

  const categorias = useMemo(() => {
    const unicas = new Set(
      productos.map((p) => p.categoria).filter(Boolean)
    );
    return ["Todas", ...unicas];
  }, []);

  const productosFiltrados = useMemo(() => {
    const texto = busqueda.trim().toLowerCase();

    return productos.filter((p) => {
      const coincideCategoria =
        categoriaActiva === "Todas" || p.categoria === categoriaActiva;
      const coincideTexto =
        !texto ||
        p.nombre.toLowerCase().includes(texto) ||
        (p.descripcion && p.descripcion.toLowerCase().includes(texto));

      return coincideCategoria && coincideTexto;
    });
  }, [busqueda, categoriaActiva]);

  return (
    <>
      {/* Portada festiva */}
      <section className="hero">
        <div className="hero-inner">
          <span className="hero-pill">
            <Sparkles size={15} /> Temporada de Fiestas
          </span>
          <h2 className="hero-titulo">
            Arma tu pedido de <span>pirotecnia</span> en segundos
          </h2>
          <p className="hero-descripcion">
            Agrega tus productos al carrito, descarga tu comprobante en PDF y
            confirma tu entrega directo por WhatsApp.
          </p>

          <div className="buscador-box">
            <Search size={19} className="buscador-icono" />
            <input
              type="text"
              placeholder="Buscar volcancitos, candelas, pilicracker..."
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
            />
            {busqueda && (
              <button
                className="buscador-limpiar"
                onClick={() => setBusqueda("")}
                aria-label="Limpiar búsqueda"
              >
                <X size={16} />
              </button>
            )}
          </div>
        </div>
      </section>

      {/* Filtros y catálogo */}
      <section className="catalogo-seccion">
        <div className="filtros-bar">
          <div className="categorias-lista">
            {categorias.map((cat) => (
              <button
                key={cat}
                className={`chip-categoria ${
                  categoriaActiva === cat ? "activa" : ""
                }`}
                onClick={() => setCategoriaActiva(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
          <span className="contador-resultados">
            {productosFiltrados.length}{" "}
            {productosFiltrados.length === 1 ? "producto" : "productos"}
          </span>
        </div>

        {productosFiltrados.length === 0 ? (
          <div className="estado-vacio">
            <p>No encontramos productos con "{busqueda}".</p>
            <button
              className="btn-secundario"
              onClick={() => {
                setBusqueda("");
                setCategoriaActiva("Todas");
              }}
            >
              Ver todo el catálogo
            </button>
          </div>
        ) : (
          <div className="grid-productos">
            {productosFiltrados.map((p) => (
              <ProductoCard key={p.id} producto={p} />
            ))}
          </div>
        )}
      </section>
    </>
  );
}