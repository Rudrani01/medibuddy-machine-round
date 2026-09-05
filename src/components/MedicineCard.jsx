// shows one medicine's key details as a card
function MedicineCard({ medicine }) {
  const info = medicine.openfda || {};

  return (
    <div style={{ border: "1px solid #ccc", padding: "12px", marginBottom: "10px" }}>
      <h3>{info.brand_name?.[0] || "Unknown brand"}</h3>
      <p>Generic: {info.generic_name?.[0] || "N/A"}</p>
      <p>Manufacturer: {info.manufacturer_name?.[0] || "N/A"}</p>
      <p>Type: {info.product_type?.[0] || "N/A"}</p>
      <p>Route: {info.route?.[0] || "N/A"}</p>
    </div>
  );
}

export default MedicineCard;