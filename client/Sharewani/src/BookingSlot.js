import React, { useState } from 'react';
import './BookingSlot.css';

const BookingSlot = ({ items, onBookingConfirmed }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedItem, setSelectedItem] = useState(null);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [paymentStatus, setPaymentStatus] = useState(null);

  const filteredItems = items.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) && item.available
  );

  const handleBooking = () => {
    if (!startDate || !endDate || !selectedItem) return;

    const start = new Date(startDate);
    const end = new Date(endDate);
    const dayDiff = Math.ceil((end - start) / (1000 * 60 * 60 * 24)) + 1;

    if (dayDiff <= 0) {
      alert('Invalid date range');
      return;
    }

    const total = selectedItem.price * dayDiff;

    // Simulate payment (random success/fail)
    const paymentSuccess = Math.random() > 0.3;

    if (paymentSuccess) {
      setPaymentStatus('success');
      onBookingConfirmed({
        item: selectedItem,
        startDate,
        endDate,
        total,
        id: Date.now()
      });
      alert('Booking confirmed!');
      setSelectedItem(null);
      setStartDate('');
      setEndDate('');
    } else {
      setPaymentStatus('failed');
      alert('Payment failed. Please try again.');
    }
  };

  return (
    <div className="booking-container">
      <h2>Book a Rental Item</h2>

      <input
        type="text"
        placeholder="Search item..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-input"
      />

      <div className="search-results">
        {filteredItems.map(item => (
          <div
            key={item.id}
            className={`search-item ${selectedItem && selectedItem.id === item.id ? 'selected' : ''}`}
            onClick={() => setSelectedItem(item)}
          >
            <h4>{item.name}</h4>
            <p>${item.price}/day</p>
          </div>
        ))}
      </div>

      {selectedItem && (
        <div className="booking-form">
          <h3>Booking: {selectedItem.name}</h3>

          <label>
            Start Date:
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              required
            />
          </label>

          <label>
            End Date:
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              required
            />
          </label>

          <button onClick={handleBooking} className="confirm-button">
            Confirm Booking & Pay
          </button>

          {paymentStatus === 'failed' && (
            <p className="error-text">Payment failed. Please try again.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default BookingSlot;
