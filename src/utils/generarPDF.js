import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export const generarPDF = (nombre, direccion, fecha, carrito) => {
  const doc = new jsPDF();
  const total = carrito.reduce((acc, p) => acc + p.precio * p.cantidad, 0);

  // Encabezado oscuro con título dorado
  doc.setFillColor(15, 23, 42);
  doc.rect(0, 0, 210, 34, "F");

  doc.setTextColor(251, 191, 36);
  doc.setFontSize(20);
  doc.setFont("helvetica", "bold");
  doc.text("COHETERÍA", 14, 16);

  doc.setTextColor(226, 232, 240);
  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  doc.text("Comprobante de pedido • Catálogo de temporada", 14, 24);

  // Bloque de datos del cliente
  doc.setFillColor(248, 250, 252);
  doc.setDrawColor(226, 232, 240);
  doc.roundedRect(14, 42, 182, 28, 3, 3, "FD");

  doc.setTextColor(30, 41, 59);
  doc.setFontSize(10.5);
  doc.setFont("helvetica", "bold");
  doc.text("Cliente:", 20, 50);
  doc.text("Dirección:", 20, 57);
  doc.text("Fecha de entrega:", 20, 64);

  doc.setFont("helvetica", "normal");
  doc.text(nombre, 56, 50);
  doc.text(direccion, 56, 57);
  doc.text(fecha, 56, 64);

  // Tabla de productos
  autoTable(doc, {
    startY: 78,
    head: [["Cant.", "Producto", "Precio Unit.", "Subtotal"]],
    body: carrito.map((item) => [
      item.cantidad,
      item.nombre,
      `Q. ${Number(item.precio).toFixed(2)}`,
      `Q. ${(item.precio * item.cantidad).toFixed(2)}`,
    ]),
    headStyles: {
      fillColor: [234, 88, 12],
      textColor: 255,
      fontStyle: "bold",
    },
    alternateRowStyles: { fillColor: [248, 250, 252] },
    styles: { fontSize: 10, cellPadding: 4 },
    columnStyles: {
      0: { halign: "center", cellWidth: 20 },
      2: { halign: "right", cellWidth: 34 },
      3: { halign: "right", cellWidth: 34 },
    },
  });

  // Total resaltado
  const finalY = doc.lastAutoTable.finalY + 12;
  doc.setFillColor(15, 23, 42);
  doc.roundedRect(124, finalY - 7, 72, 14, 3, 3, "F");

  doc.setFontSize(12);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(251, 191, 36);
  doc.text(`TOTAL: Q. ${total.toFixed(2)}`, 190, finalY + 2, {
    align: "right",
  });

  const nombreArchivo = nombre.trim().replace(/\s+/g, "_");
  doc.save(`pedido_${nombreArchivo}.pdf`);
};