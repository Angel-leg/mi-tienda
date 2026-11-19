import { useContext } from "react";
import { Sparkles, ShoppingCart } from "lucide-react";
import { CarritoContext } from "../context/CarritoContext";

export default function Navbar({ abrirCarrito }) {
  const { carrito } = useContext(CarritoContext);

  const cantidad = carrito.reduce((acc, p) => acc + p.cantidad, 0);
  const total = carrito.reduce((acc, p) => acc + p.precio * p.cantidad, 0);

  return (
    <header className="navbar">
      <div className="navbar-inner">
        <div className="logo-grupo">
          <div className="logo-icono">
            <Sparkles size={20} />
          </div>
          <div>
            <h1 className="logo-titulo">Cohetería</h1>
            <span className="logo-subtitulo">Catálogo de temporada</span>
          </div>
        </div>

        <button className="btn-carrito-nav" onClick={abrirCarrito}>
          <div className="icono-con-badge">
            <ShoppingCart size={20} />
            {cantidad > 0 && <span className="burbuja">{cantidad}</span>}
          </div>
          <div className="carrito-nav-texto">
            <span className="carrito-nav-label">Mi pedido</span>
            <strong className="carrito-nav-total">Q. {total.toFixed(2)}</strong>
          </div>
        </button>
      </div>
    </header>
  );
}