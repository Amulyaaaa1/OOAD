import React, { useState } from 'react';
import './ApproveRentalRequests.css';

const ApproveRentalRequests = () => {
  const [requests, setRequests] = useState([
    {
      id: 1,
      tenantName: 'Alice',
      itemName: 'Camera',
      status: 'pending',
      paymentReceived: true
    },
    {
      id: 2,
      tenantName: 'Bob',
      itemName: 'Camping Tent',
      status: 'pending',
      paymentReceived: true
    }
  ]);

  const handleDecision = (id, decision) => {
    setRequests(prev =>
      prev.map(req =>
        req.id === id
          ? {
              ...req,
              status: decision,
              refundIssued: decision === 'rejected'
            }
          : req
      )
    );

    const tenant = requests.find(req => req.id === id);
    setTimeout(() => {
      alert(`Tenant ${tenant.tenantName} has been ${decision === 'approved' ? 'notified of approval' : 'notified of rejection and refunded'}.`);
    }, 500);
  };

  return (
    <div className="approve-container">
      <h2>Rental Requests for Approval</h2>
      {requests.length === 0 ? (
        <p>No pending requests</p>
      ) : (
        requests.map(request => (
          <div key={request.id} className="request-card">
            <h4>{request.itemName}</h4>
            <p><strong>Tenant:</strong> {request.tenantName}</p>
            <p><strong>Status:</strong> {request.status}</p>
            {request.status === 'pending' && (
              <div className="actions">
                <button onClick={() => handleDecision(request.id, 'approved')} className="approve-btn">Approve</button>
                <button onClick={() => handleDecision(request.id, 'rejected')} className="reject-btn">Reject</button>
              </div>
            )}
            {request.status === 'rejected' && (
              <p className="refund-msg">💰 Payment refunded</p>
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default ApproveRentalRequests;
