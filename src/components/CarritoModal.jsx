import { useContext, useState } from "react";
import {
  ArrowRight,
  Minus,
  Plus,
  ShoppingBag,
  Trash2,
  X,
} from "lucide-react";
import { CarritoContext } from "../context/CarritoContext";
import FormularioPedido from "./FormularioPedido";

export default function CarritoModal({ cerrar }) {
  const { carrito, eliminarProducto, actualizarCantidad, vaciarCarrito } =
    useContext(CarritoContext);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);

  const total = carrito.reduce((acc, p) => acc + p.precio * p.cantidad, 0);
  const totalUnidades = carrito.reduce((acc, p) => acc + p.cantidad, 0);

  return (
    <div className="modal-overlay" onClick={cerrar}>
      <aside
        className="drawer-carrito"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="drawer-header">
          <div className="drawer-titulo">
            <ShoppingBag size={20} />
            <h2>{mostrarFormulario ? "Datos de entrega" : "Tu Carrito"}</h2>
            {!mostrarFormulario && totalUnidades > 0 && (
              <span className="drawer-badge">{totalUnidades}</span>
            )}
          </div>
          <button
            className="btn-icon-cerrar"
            onClick={cerrar}
            aria-label="Cerrar"
          >
            <X size={20} />
          </button>
        </div>

        {mostrarFormulario ? (
          <FormularioPedido
            carrito={carrito}
            cerrarModal={cerrar}
            volverAlCarrito={() => setMostrarFormulario(false)}
          />
        ) : (
          <>
            <div className="drawer-body">
              {carrito.length === 0 ? (
                <div className="carrito-vacio">
                  <ShoppingBag size={44} strokeWidth={1.4} />
                  <p>Tu carrito está vacío</p>
                  <span>Agrega productos del catálogo para armar tu pedido.</span>
                </div>
              ) : (
                <div className="lista-items-carrito">
                  {carrito.map((p) => (
                    <div key={p.id} className="item-carrito-card">
                      <img
                        src={p.imagen}
                        alt={p.nombre}
                        className="item-thumb"
                      />
                      <div className="item-detalles">
                        <strong>{p.nombre}</strong>
                        <span className="item-precio-unit">
                          Q. {Number(p.precio).toFixed(2)} c/u
                        </span>

                        <div className="item-controles-fila">
                          <div className="cantidad-control">
                            <button
                              onClick={() =>
                                actualizarCantidad(p.id, p.cantidad - 1)
                              }
                              aria-label="Disminuir"
                            >
                              <Minus size={14} />
                            </button>
                            <span>{p.cantidad}</span>
                            <button
                              onClick={() =>
                                actualizarCantidad(p.id, p.cantidad + 1)
                              }
                              aria-label="Aumentar"
                            >
                              <Plus size={14} />
                            </button>
                          </div>

                          <strong className="item-subtotal">
                            Q. {(p.precio * p.cantidad).toFixed(2)}
                          </strong>
                        </div>
                      </div>

                      <button
                        className="btn-eliminar-item"
                        onClick={() => eliminarProducto(p.id)}
                        aria-label="Eliminar producto"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {carrito.length > 0 && (
              <div className="drawer-footer">
                <div className="resumen-total">
                  <span>Total a pagar</span>
                  <strong>Q. {total.toFixed(2)}</strong>
                </div>

                <button
                  className="btn-primario-full"
                  onClick={() => setMostrarFormulario(true)}
                >
                  Continuar pedido <ArrowRight size={18} />
                </button>

                <button className="btn-link-vaciar" onClick={vaciarCarrito}>
                  Vaciar carrito
                </button>
              </div>
            )}
          </>
        )}
      </aside>
    </div>
  );
}