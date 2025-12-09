import productos from "../data/productos.json";
import ProductoCard from "./ProductoCard";

export default function ListaProductos() {
  return (
    <div style={styles.grid}>
      {productos.map((p) => (
        <ProductoCard key={p.id} producto={p} />
      ))}
    </div>
  );
}

const styles = {
  grid: {
    display: "flex",
    gap: "20px",
    flexWrap: "wrap",
    justifyContent: "center",
    padding: "20px",
  },
};
