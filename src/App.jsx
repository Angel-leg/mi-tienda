import { useContext, useState } from "react";
import { ShoppingBag } from "lucide-react";
import "./App.css";

import Navbar from "./components/Navbar";
import ListaProductos from "./components/ListaProductos";
import CarritoModal from "./components/CarritoModal";
import { CarritoContext, CarritoProvider } from "./context/CarritoContext";

function TiendaContenido() {
  const [carritoAbierto, setCarritoAbierto] = useState(false);
  const { carrito } = useContext(CarritoContext);

  const cantidadTotal = carrito.reduce((acc, p) => acc + p.cantidad, 0);
  const total = carrito.reduce((acc, p) => acc + p.precio * p.cantidad, 0);

  return (
    <div className="app-layout">
      <Navbar abrirCarrito={() => setCarritoAbierto(true)} />

      <main className="main-content">
        <ListaProductos />
      </main>

      <footer className="footer">
        <p>Cohetería • Pedidos directos por WhatsApp</p>
      </footer>

      {cantidadTotal > 0 && !carritoAbierto && (
        <button
          className="barra-carrito-movil"
          onClick={() => setCarritoAbierto(true)}
        >
          <span className="barra-carrito-izq">
            <ShoppingBag size={20} />
            <span>
              Ver carrito ({cantidadTotal}{" "}
              {cantidadTotal === 1 ? "artículo" : "artículos"})
            </span>
          </span>
          <strong>Q. {total.toFixed(2)}</strong>
        </button>
      )}

      {carritoAbierto && (
        <CarritoModal cerrar={() => setCarritoAbierto(false)} />
      )}
    </div>
  );
}

function App() {
  return (
    <CarritoProvider>
      <TiendaContenido />
    </CarritoProvider>
  );
}

export default App;