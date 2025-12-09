import { useContext, useState } from "react";
import { CarritoContext } from "../context/CarritoContext";
import FormularioPedido from "./FormularioPedido";

export default function Carrito() {
  const { carrito, eliminarProducto } = useContext(CarritoContext);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);

  const total = carrito.reduce(
    (acc, p) => acc + p.precio * p.cantidad,
    0
  );

  return (
    <div className="carrito">
      <h2>Carrito de compras</h2>

      {carrito.length === 0 && <p>No hay productos aún.</p>}

      {carrito.map((p) => (
        <div key={p.id} className="item-carrito">
          <span>
            {p.nombre} (x{p.cantidad})
          </span>
          <strong>Q.{p.precio * p.cantidad}</strong>
          <button onClick={() => eliminarProducto(p.id)}>❌</button>
        </div>
      ))}

      {carrito.length > 0 && (
        <>
          <h3>Total: ${total}</h3>

          <button
            onClick={() => setMostrarFormulario(true)}
            className="btn-pedido"
          >
            Realizar Pedido
          </button>
        </>
      )}

      {mostrarFormulario && <FormularioPedido />}
    </div>
  );
}
