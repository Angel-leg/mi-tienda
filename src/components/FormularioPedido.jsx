import { useState } from "react";
import { generarPDF } from "../utils/generarPDF";

export default function FormularioPedido({ carrito, cerrarModal }) {
  const [nombre, setNombre] = useState("");
  const [direccion, setDireccion] = useState("");
  const [fecha, setFecha] = useState("");

  const telefonoVendedor = "50230698331"; // Cambia aquí tu número de WhatsApp (sin + ni espacios)

  const finalizarPedido = () => {
    if (!nombre || !direccion || !fecha) {
      alert("Por favor completa todos los campos.");
      return;
    }

    // 1️⃣ Generar PDF y descargarlo
    generarPDF(nombre, direccion, fecha, carrito);

    // 2️⃣ Construir mensaje para WhatsApp
    const mensaje = `Hola, soy ${nombre} y deseo realizar un pedido.\nDirección: ${direccion}\nFecha de entrega: ${fecha}\nPor favor revisa el PDF adjunto con el detalle del pedido.`;

    // 3️⃣ Abrir WhatsApp
    const url = `https://wa.me/${telefonoVendedor}?text=${encodeURIComponent(mensaje)}`;
    window.open(url, "_blank");

    // 4️⃣ Cerrar modal
    cerrarModal();
  };

  return (
    <div className="form-pedido">
      <h2>Finalizar Pedido</h2>

      <label>Nombre del cliente:</label>
      <input type="text" value={nombre} onChange={(e) => setNombre(e.target.value)} />

      <label>Dirección de entrega:</label>
      <input type="text" value={direccion} onChange={(e) => setDireccion(e.target.value)} />

      <label>Fecha de entrega:</label>
      <input type="date" value={fecha} onChange={(e) => setFecha(e.target.value)} />

      <button onClick={finalizarPedido} className="btn-pedido">
        Finalizar Pedido
      </button>
    </div>
  );
}
