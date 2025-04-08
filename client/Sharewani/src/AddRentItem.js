import React, { useState, useEffect } from 'react';
import './AddRentItem.css';

const AddRentItem = () => {
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    available: true
  });

  const [items, setItems] = useState([]);

  useEffect(() => {
    // Fetch existing items from the backend
    fetch('http://localhost:5000/api/items')
      .then((res) => res.json())
      .then((data) => setItems(data))
      .catch((err) => console.error('Error fetching items:', err));
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newItem = {
      name: formData.name,
      price: parseFloat(formData.price),
      available: formData.available
    };

    fetch('http://localhost:5000/api/items', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newItem)
    })
      .then((res) => res.json())
      .then((savedItem) => {
        setItems((prev) => [...prev, savedItem]);
        setFormData({ name: '', price: '', available: true });
      })
      .catch((err) => console.error('Error saving item:', err));
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
            {items.map((item) => (
              <div key={item.id} className="rent-item">
                <h4>{item.name}</h4>
                <p>${item.price}/day</p>
                <p className={item.available ? 'available' : 'unavailable'}>
                  {item.available ? 'Available' : 'Not Available'}
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
