import React, { useState } from 'react';
import './MakePayment.css';

const MakePayment = () => {
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvv, setCvv] = useState('');
  const [paymentStatus, setPaymentStatus] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const handlePayment = (e) => {
    e.preventDefault();

    if (!cardNumber || !expiry || !cvv) {
      alert("Please fill in all payment details.");
      return;
    }

    setIsProcessing(true);
    setPaymentStatus(null);

    // Simulate async payment processing
    setTimeout(() => {
      const isSuccess = Math.random() > 0.3;

      if (isSuccess) {
        setPaymentStatus('success');
        alert('🎉 Payment Successful! Transaction Confirmed.');
      } else {
        setPaymentStatus('failed');
        alert('❌ Payment Failed. Please try again.');
      }

      setIsProcessing(false);
    }, 2000);
  };

  return (
    <div className="payment-container">
      <h2>Make Payment</h2>
      <form className="payment-form" onSubmit={handlePayment}>
        <input
          type="text"
          placeholder="Card Number"
          value={cardNumber}
          onChange={(e) => setCardNumber(e.target.value)}
          maxLength="16"
          required
        />

        <input
          type="text"
          placeholder="MM/YY"
          value={expiry}
          onChange={(e) => setExpiry(e.target.value)}
          maxLength="5"
          required
        />

        <input
          type="password"
          placeholder="CVV"
          value={cvv}
          onChange={(e) => setCvv(e.target.value)}
          maxLength="4"
          required
        />

        <button type="submit" className="pay-button" disabled={isProcessing}>
          {isProcessing ? "Processing..." : "Pay Now"}
        </button>
      </form>

      {paymentStatus === 'success' && (
        <p className="payment-success">✅ Payment Successful!</p>
      )}

      {paymentStatus === 'failed' && (
        <p className="payment-failed">❌ Payment Failed. Please try again.</p>
      )}
    </div>
  );
};

export default MakePayment;
