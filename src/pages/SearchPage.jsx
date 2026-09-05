import { useState, useEffect } from "react";
import MedicineCard from "../components/MedicineCard";

function SearchPage() {
    const [query, setQuery] = useState("");
    const [debouncedQuery, setDebouncedQuery] = useState("");
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedQuery(query);
        }, 500);

        return () => clearTimeout(timer);
    }, [query]);

    useEffect(() => {
        if (debouncedQuery.trim() === "") {
            setResults([]);
            return;
        }

        setLoading(true);
        setError(null);

        fetch(`https://api.fda.gov/drug/label.json?search=openfda.brand_name:"${debouncedQuery}"&limit=20`)

            .then((res) => res.json())
            .then((data) => {
                setResults(data.results || []);
                setLoading(false);
            })
            .catch(() => {
                setError("Something went wrong");
                setLoading(false);
            });
    }, [debouncedQuery]);

    return (
        <div>
            <h1>Medicine Search</h1>

            <input
                type="text"
                placeholder="Search by brand name..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
            />

            {loading && <p>Loading...</p>}
            {error && <p>{error}</p>}
            {!loading && query.trim() !== "" && results.length === 0 && (
                <p>No results found</p>
            )}

            <div>
                {results.map((item, index) => (
                    <MedicineCard key={index} medicine={item} />
                ))}
            </div>
            
        </div>
    );
}

export default SearchPage;