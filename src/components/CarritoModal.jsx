import { useContext, useState } from "react";
import { CarritoContext } from "../context/CarritoContext";
import FormularioPedido from "./FormularioPedido";

export default function CarritoModal({ cerrar }) {
  const { carrito, eliminarProducto, actualizarCantidad } = useContext(CarritoContext);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);

  const total = carrito.reduce((acc, p) => acc + p.precio * p.cantidad, 0);

  if (mostrarFormulario) {
    // Mostrar formulario cuando se active
    return (
      <div className="modal-carrito">
        <div className="contenido-carrito">
          <button className="btn-cerrar" onClick={cerrar}>
            X
          </button>
          <FormularioPedido carrito={carrito} cerrarModal={cerrar} />
        </div>
      </div>
    );
  }

  return (
    <div className="modal-carrito">
      <div className="contenido-carrito">
        <button className="btn-cerrar" onClick={cerrar}>
          X
        </button>

        <h2>Carrito</h2>

        {carrito.length === 0 && <p>Carrito vacío.</p>}

        {carrito.map((p) => (
          <div key={p.id} className="item-modal">
            <div>
              <strong>{p.nombre}</strong>
              <p>Q. {p.precio}</p>
            </div>

            <div className="cantidad-control">
              <button onClick={() => actualizarCantidad(p.id, p.cantidad - 1)}>-</button>
              <span>{p.cantidad}</span>
              <button onClick={() => actualizarCantidad(p.id, p.cantidad + 1)}>+</button>
            </div>

            <button className="btn-eliminar" onClick={() => eliminarProducto(p.id)}>🗑️</button>
          </div>
        ))}

        {carrito.length > 0 && (
          <>
            <h3>Total: Q. {total}</h3>
            <button className="btn-finalizar" onClick={() => setMostrarFormulario(true)}>
              Finalizar Pedido
            </button>
          </>
        )}
      </div>
    </div>
  );
}
