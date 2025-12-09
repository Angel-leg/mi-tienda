import { useContext } from "react";
import { CarritoContext } from "../context/CarritoContext";

export default function Navbar({ abrirCarrito }) {
  const { carrito } = useContext(CarritoContext);

  // Contar total de productos
  const cantidad = carrito.reduce((acc, p) => acc + p.cantidad, 0);

  return (
    <nav className="navbar">
      <h2 className="logo">Cohetería</h2>

      <div className="carrito-icono" onClick={abrirCarrito}>
        <img
          src="https://cdn-icons-png.flaticon.com/512/833/833314.png"
          alt="carrito"
        />
        {cantidad > 0 && <span className="burbuja">{cantidad}</span>}
      </div>
    </nav>
  );
}
