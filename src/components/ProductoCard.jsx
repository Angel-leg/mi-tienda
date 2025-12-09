import { useContext, useState } from "react";
import { CarritoContext } from "../context/CarritoContext";

export default function ProductoCard({ producto }) {
  const { agregarProducto } = useContext(CarritoContext);

  const [imagenGrande, setImagenGrande] = useState(false);

  return (
    <>
      {/* ===== Tarjeta del producto ===== */}
      <div style={styles.card}>
        <img
          src={producto.imagen}
          alt={producto.nombre}
          style={styles.img}
          onClick={() => setImagenGrande(true)} // 👉 abrir imagen grande
        />
        <h3>{producto.nombre}</h3>
        <p>{producto.descripcion}</p>
        <strong>Q. {producto.precio} </strong>
        <button style={styles.btn} onClick={() => agregarProducto(producto)}>
          Agregar al carrito
        </button>
      </div>

      {/* ===== Modal imagen grande ===== */}
      {imagenGrande && (
        <div style={styles.modalFondo} onClick={() => setImagenGrande(false)}>
          <div style={styles.modalContenido}>
            <img
              src={producto.imagen}
              alt="imagen grande"
              style={styles.imgGrande}
            />
          </div>
        </div>
      )}
    </>
  );
}

const styles = {
  card: {
    width: "250px",
    padding: "15px",
    border: "1px solid #ddd",
    borderRadius: "10px",
    textAlign: "center",
  },
  img: {
    width: "150px",
    height: "150px",
    objectFit: "contain",
    borderRadius: "10px",
    background: "#fff",
    cursor: "pointer",
    transition: "transform 0.2s",
  },

  // Fondo oscuro del modal
modalFondo: {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100vw",
  height: "100vh",
  background: "rgba(0,0,0,0.8)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  zIndex: 99999,
},

modalContenido: {
  background: "white",
  borderRadius: "10px",
  width: "80vw",        // ⬅ tamaño REAl del cuadro blanco
  height: "80vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  overflow: "hidden",   // ⬅ Nunca dejar que se salga
  padding: 0,
},

imgGrande: {
  maxWidth: "100%",
  maxHeight: "100%",
  objectFit: "contain",
},

  btn: {
    marginTop: "10px",
    padding: "10px",
    background: "#1e88e5",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
  },
};
