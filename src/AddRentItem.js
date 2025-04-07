import React, { useState } from 'react';
import './AddRentItem.css';

const AddRentItem = ({ items, setItems }) => {
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    available: true
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.name && formData.price) {
      const newItem = {
        ...formData,
        id: Date.now(),
        price: Number(formData.price)
      };
      setItems(prev => [...prev, newItem]);
      setFormData({ name: '', price: '', available: true });
    }
  };

  return (
    <div className="add-rent-container">
      <h2 className="add-rent-heading">List Your Item for Rent</h2>

      <form className="rent-form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Item Name"
          value={formData.name}
          onChange={handleChange}
          required
        />

        <input
          type="number"
          name="price"
          placeholder="Price per day ($)"
          value={formData.price}
          onChange={handleChange}
          required
        />

        <label className="availability-label">
          <input
            type="checkbox"
            name="available"
            checked={formData.available}
            onChange={handleChange}
          />
          Available for Rent
        </label>

        <button type="submit" className="submit-button">Add Item</button>
      </form>

      {items.length > 0 && (
        <div className="preview-list">
          <h3>Your Listed Items:</h3>
          <div className="rent-grid">
            {items.map(item => (
              <div key={item.id} className="rent-item">
                <h4>{item.name}</h4>
                <p>${item.price}/day</p>
                <p className={item.available ? "available" : "unavailable"}>
                  {item.available ? "Available" : "Not Available"}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default AddRentItem;
