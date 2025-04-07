import React, { useState } from 'react';
import './RentList.css';

const RentList = ({ items }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [maxPrice, setMaxPrice] = useState(50);
  const [onlyAvailable, setOnlyAvailable] = useState(false);

  const filteredItems = items.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesPrice = item.price <= maxPrice;
    const matchesAvailability = !onlyAvailable || item.available;
    return matchesSearch && matchesPrice && matchesAvailability;
  });

  return (
    <div className="rent-list-container">
      <h2 className="rent-list-heading">Browse & Rent Items</h2>

      <div className="filters">
        <input
          type="text"
          placeholder="Search item..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />

        <div className="filter-group">
          <label>Max Price: ${maxPrice}</label>
          <input
            type="range"
            min="5"
            max="100"
            step="5"
            value={maxPrice}
            onChange={(e) => setMaxPrice(Number(e.target.value))}
          />
        </div>

        <label className="availability-toggle">
          <input
            type="checkbox"
            checked={onlyAvailable}
            onChange={() => setOnlyAvailable(!onlyAvailable)}
          />
          Only show available
        </label>
      </div>

      <div className="rent-grid">
        {filteredItems.length > 0 ? (
          filteredItems.map(item => (
            <div key={item.id} className="rent-item">
              <h3>{item.name}</h3>
              <p>${item.price}/day</p>
              <p className={item.available ? "available" : "unavailable"}>
                {item.available ? "Available" : "Not Available"}
              </p>
              <button
                className="rent-button"
                disabled={!item.available}
              >
                Rent Now
              </button>
            </div>
          ))
        ) : (
          <p className="no-results">No items match your search/filter.</p>
        )}
      </div>
    </div>
  );
};

export default RentList;
