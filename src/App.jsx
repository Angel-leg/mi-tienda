import { useState } from "react";
import "./App.css";

import Navbar from "./components/Navbar";
import ListaProductos from "./components/ListaProductos";
import CarritoModal from "./components/CarritoModal";
import { CarritoProvider } from "./context/CarritoContext";

function App() {
  const [carritoAbierto, setCarritoAbierto] = useState(false);

  return (
    <CarritoProvider>
      <Navbar abrirCarrito={() => setCarritoAbierto(true)} />

      <ListaProductos />

      {carritoAbierto && (
        <CarritoModal cerrar={() => setCarritoAbierto(false)} />
      )}
    </CarritoProvider>
  );
}

export default App;
