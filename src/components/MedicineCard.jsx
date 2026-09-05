import { Link } from "react-router-dom";

// shows one medicine's key details as a card
function MedicineCard({ medicine }) {
  const info = medicine.openfda || {};

  return (
    <Link to={`/medicine/${medicine.id}`} style={{ textDecoration: "none", color: "inherit" }}>
      <div className="medicine-card">
        <h3>{info.brand_name?.[0] || "Unknown brand"}</h3>
        <p>Generic: {info.generic_name?.[0] || "N/A"}</p>
        <p>Manufacturer: {info.manufacturer_name?.[0] || "N/A"}</p>
        <p>Type: {info.product_type?.[0] || "N/A"}</p>
        <p>Route: {info.route?.[0] || "N/A"}</p>
      </div>
    </Link>
  );
}

export default MedicineCard;