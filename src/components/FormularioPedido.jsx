import { useContext, useState } from "react";
import { ArrowLeft, Calendar, MapPin, Send, User } from "lucide-react";
import { generarPDF } from "../utils/generarPDF";
import { CarritoContext } from "../context/CarritoContext";

export default function FormularioPedido({
  carrito,
  cerrarModal,
  volverAlCarrito,
}) {
  const { vaciarCarrito } = useContext(CarritoContext);
  const [nombre, setNombre] = useState("");
  const [direccion, setDireccion] = useState("");
  const [fecha, setFecha] = useState("");
  const [error, setError] = useState("");

  const telefonoVendedor = "50230698331";
  const hoy = new Date().toISOString().split("T")[0];

  const total = carrito.reduce((acc, p) => acc + p.precio * p.cantidad, 0);
  const totalUnidades = carrito.reduce((acc, p) => acc + p.cantidad, 0);

  const finalizarPedido = (e) => {
    e.preventDefault();

    if (!nombre.trim() || !direccion.trim() || !fecha) {
      setError("Por favor completa tu nombre, dirección y fecha de entrega.");
      return;
    }

    setError("");

    // 1. Generar y descargar comprobante PDF
    generarPDF(nombre.trim(), direccion.trim(), fecha, carrito);

    // 2. Construir mensaje completo con detalle de productos para WhatsApp
    const detalleProductos = carrito
      .map(
        (p) =>
          `• ${p.cantidad}x ${p.nombre} — Q.${(p.precio * p.cantidad).toFixed(2)}`
      )
      .join("\n");

    const mensaje = `🎆 *NUEVO PEDIDO DE COHETERÍA* 🎆

👤 *Cliente:* ${nombre.trim()}
📍 *Dirección:* ${direccion.trim()}
📅 *Fecha de entrega:* ${fecha}

🛒 *Detalle del pedido:*
${detalleProductos}

💰 *TOTAL A PAGAR: Q.${total.toFixed(2)}*

_(También descargué mi comprobante en PDF)_`;

    // 3. Abrir WhatsApp
    const url = `https://wa.me/${telefonoVendedor}?text=${encodeURIComponent(
      mensaje
    )}`;
    window.open(url, "_blank");

    // 4. Vaciar carrito y cerrar
    vaciarCarrito();
    cerrarModal();
  };

  return (
    <form className="form-pedido-wrap" onSubmit={finalizarPedido}>
      <div className="drawer-body">
        <button
          type="button"
          className="btn-volver"
          onClick={volverAlCarrito}
        >
          <ArrowLeft size={16} /> Volver al carrito
        </button>

        <div className="resumen-mini">
          <span>
            {totalUnidades} {totalUnidades === 1 ? "producto" : "productos"} en
            tu pedido
          </span>
          <strong>Q. {total.toFixed(2)}</strong>
        </div>

        {error && <div className="alerta-error">{error}</div>}

        <div className="campo-grupo">
          <label htmlFor="nombre">
            <User size={15} /> Nombre completo
          </label>
          <input
            id="nombre"
            type="text"
            placeholder="Ej. Juan Pérez"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          />
        </div>

        <div className="campo-grupo">
          <label htmlFor="direccion">
            <MapPin size={15} /> Dirección de entrega
          </label>
          <input
            id="direccion"
            type="text"
            placeholder="Colonia, calle o punto de referencia"
            value={direccion}
            onChange={(e) => setDireccion(e.target.value)}
          />
        </div>

        <div className="campo-grupo">
          <label htmlFor="fecha">
            <Calendar size={15} /> Fecha de entrega
          </label>
          <input
            id="fecha"
            type="date"
            min={hoy}
            value={fecha}
            onChange={(e) => setFecha(e.target.value)}
          />
        </div>

        <p className="nota-whatsapp">
          Al confirmar se descargará tu comprobante en PDF y se abrirá WhatsApp
          con tu pedido listo para enviar.
        </p>
      </div>

      <div className="drawer-footer">
        <button type="submit" className="btn-whatsapp-full">
          <Send size={18} /> Enviar pedido por WhatsApp
        </button>
      </div>
    </form>
  );
}