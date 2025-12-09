import jsPDF from "jspdf";

export const generarPDF = (nombre, direccion, fecha, carrito) => {
  const doc = new jsPDF();

  doc.setFontSize(18);
  doc.text("Pedido de Cohetería", 20, 20);

  doc.setFontSize(12);
  doc.text(`Cliente: ${nombre}`, 20, 35);
  doc.text(`Dirección: ${direccion}`, 20, 45);
  doc.text(`Fecha entrega: ${fecha}`, 20, 55);

  doc.text("Productos:", 20, 70);

  let y = 80;

  carrito.forEach((p) => {
    doc.text(`${p.nombre} x${p.cantidad} — $${p.precio * p.cantidad}`, 20, y);
    y += 10;
  });

  doc.text("------------------------", 20, y + 5);

  const total = carrito.reduce((acc, p) => acc + p.precio * p.cantidad, 0);
  doc.text(`Total: Q.${total}`, 20, y + 15);

  doc.save(`pedido_${nombre}.pdf`);
};
