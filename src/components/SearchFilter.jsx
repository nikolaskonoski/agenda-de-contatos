import React from "react";

function SearchFilter({ searchTerm, onSearchChange }) {
    return (
        <div className="search-filter">
            <label htmlFor="search">Search Contact:</label>
            <input
                type="text"
                id="search"
                placeholder="Type for search..."
                value={searchTerm}
                onChange={(e) => onSearchChange(e.target.value)}
            />
        </div>

    );
}

export default SearchFilter;