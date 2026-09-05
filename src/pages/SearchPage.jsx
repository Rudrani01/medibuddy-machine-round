import { useState, useEffect, useRef } from "react";
import MedicineCard from "../components/MedicineCard";
import "../App.css";

function SearchPage() {
    const [query, setQuery] = useState("");
    const [debouncedQuery, setDebouncedQuery] = useState("");
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const cache = useRef({});

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

        if (cache.current[debouncedQuery]) {
            setResults(cache.current[debouncedQuery]);
            return;
        }

        setLoading(true);
        setError(null);

        const controller = new AbortController();

        fetch(`https://api.fda.gov/drug/label.json?search=openfda.brand_name:"${debouncedQuery}"&limit=20`,
            { signal: controller.signal }
        )

            .then((res) => res.json())
            .then((data) => {
                const fetchedResults = data.results || [];
                cache.current[debouncedQuery] = fetchedResults;
                setResults(data.results);
                setLoading(false);
            })
            .catch((err) => {
                if (err.name !== "AbortError") {
                    setError("Something went wrong");
                    setLoading(false);
                }
            });
        return () => controller.abort();
    }, [debouncedQuery]);


    return (
        <div className="search-page">

            <h1>Medicine Search</h1>

            <input
                className="search-input"
                type="text"
                placeholder="Search by brand name..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
            />

            {loading && <p>Loading...</p>}
            {error && <p>{error}</p>}
            {!loading && debouncedQuery.trim() !== "" && results.length === 0 && (
                <p>No results found</p>
            )}

            <div className="results">
                {results.map((item, index) => (
                    <MedicineCard key={index} medicine={item} />
                ))}
            </div>

        </div>
    );
}

export default SearchPage;