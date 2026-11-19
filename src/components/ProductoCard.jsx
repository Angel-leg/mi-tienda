import { useContext, useState } from "react";
import { Check, Plus, X, ZoomIn } from "lucide-react";
import { CarritoContext } from "../context/CarritoContext";

export default function ProductoCard({ producto }) {
  const { carrito, agregarProducto } = useContext(CarritoContext);
  const [imagenGrande, setImagenGrande] = useState(false);
  const [recienAgregado, setRecienAgregado] = useState(false);

  const disponible = producto.disponible !== false;
  const itemEnCarrito = carrito.find((item) => item.id === producto.id);
  const cantidadEnCarrito = itemEnCarrito ? itemEnCarrito.cantidad : 0;

  const manejarAgregar = () => {
    if (!disponible) return;
    agregarProducto(producto);
    setRecienAgregado(true);
    setTimeout(() => setRecienAgregado(false), 1100);
  };

  return (
    <>
      <article className={`producto-card ${!disponible ? "agotado" : ""}`}>
        {producto.etiqueta && disponible && (
          <span className="badge-etiqueta">{producto.etiqueta}</span>
        )}
        {!disponible && <span className="badge-agotado">Agotado</span>}

        {cantidadEnCarrito > 0 && (
          <span className="badge-en-carrito">{cantidadEnCarrito} en carrito</span>
        )}

        <div
          className="producto-img-wrap"
          onClick={() => setImagenGrande(true)}
          title="Clic para ampliar"
        >
          <img
            src={producto.imagen}
            alt={producto.nombre}
            className="producto-img"
            loading="lazy"
          />
          <span className="zoom-hint">
            <ZoomIn size={15} />
          </span>
        </div>

        <div className="producto-info">
          {producto.categoria && (
            <span className="producto-categoria">{producto.categoria}</span>
          )}
          <h3 className="producto-nombre">{producto.nombre}</h3>
          <p className="producto-desc">{producto.descripcion}</p>
        </div>

        <div className="producto-footer">
          <div className="producto-precio">
            <span>Q.</span>
            <strong>{Number(producto.precio).toFixed(2)}</strong>
          </div>

          <button
            className={`btn-agregar ${recienAgregado ? "agregado" : ""}`}
            onClick={manejarAgregar}
            disabled={!disponible}
          >
            {!disponible ? (
              "Agotado"
            ) : recienAgregado ? (
              <>
                <Check size={16} /> Agregado
              </>
            ) : (
              <>
                <Plus size={16} /> Agregar
              </>
            )}
          </button>
        </div>
      </article>

      {/* Modal imagen ampliada */}
      {imagenGrande && (
        <div
          className="lightbox-fondo"
          onClick={() => setImagenGrande(false)}
        >
          <div
            className="lightbox-contenido"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="lightbox-cerrar"
              onClick={() => setImagenGrande(false)}
              aria-label="Cerrar imagen"
            >
              <X size={20} />
            </button>

            <div className="lightbox-img-box">
              <img src={producto.imagen} alt={producto.nombre} />
            </div>

            <div className="lightbox-pie">
              <div>
                <h4>{producto.nombre}</h4>
                <p>{producto.descripcion}</p>
              </div>
              <div className="lightbox-acciones">
                <strong className="lightbox-precio">
                  Q. {Number(producto.precio).toFixed(2)}
                </strong>
                <button
                  className="btn-agregar"
                  disabled={!disponible}
                  onClick={() => {
                    manejarAgregar();
                    setImagenGrande(false);
                  }}
                >
                  <Plus size={16} /> Agregar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}