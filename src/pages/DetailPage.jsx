import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";

function DetailPage() {
  const { id } = useParams(); // gets id part from the URL
  const [medicine, setMedicine] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    fetch(`https://api.fda.gov/drug/label.json?search=id:"${id}"&limit=1`)
      .then((res) => res.json())
      .then((data) => {
        if (data.results && data.results.length > 0) {
          setMedicine(data.results[0]);
        } else {
          setError("Medicine not found");
        }
        setLoading(false);
      })
      .catch(() => {
        setError("Something went wrong");
        setLoading(false);
      });
  }, [id]); 

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  const info = medicine.openfda || {};

  return (
    <div>
      <Link to="/">← Back to search</Link>
      <h1>{info.brand_name?.[0] || "Unknown brand"}</h1>
      <p>Generic: {info.generic_name?.[0] || "N/A"}</p>
      <p>Manufacturer: {info.manufacturer_name?.[0] || "N/A"}</p>
      <p>Type: {info.product_type?.[0] || "N/A"}</p>
      <p>Route: {info.route?.[0] || "N/A"}</p>
      <p>Substance: {info.substance_name?.[0] || "N/A"}</p>
    </div>
  );
}

export default DetailPage;