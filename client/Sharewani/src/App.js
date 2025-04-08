import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './Home';
import Welcome from './Welcome';
import RentList from './RentList';
import AddRentItem from './AddRentItem';
import ApproveRentalRequests from './ApproveRentalRequests';
import BookingSlot from './BookingSlot'; // ✅ New import
import MakePayment from './MakePayment'; // ✅ Add this
import OwnerLogin from './OwnerLogin';  // Adjust the path based on your folder structure
import TenantLogin from './TenantLogin';  
import './App.css';

const Explore = () => {
  return <div className="page-container">Explore Collection Page</div>;
};

const HowItWorks = () => {
  return <div className="page-container">How It Works Page</div>;
};

const Signup = () => {
  return (
    <div className="page-container">
      <div className="auth-form-container">
        <h2>Create Your Account</h2>
        <form className="auth-form">
          <input type="text" placeholder="Full Name" required />
          <input type="email" placeholder="Email Address" required />
          <input type="password" placeholder="Password" required />
          <button type="submit" className="auth-button">Sign Up</button>
        </form>
        <p>Already have an account? <a href="/login">Login</a></p>
      </div>
    </div>
  );
};

const Login = () => {
  return (
    <div className="page-container">
      <div className="auth-form-container">
        <h2>Welcome Back</h2>
        <form className="auth-form">
          <input type="email" placeholder="Email Address" required />
          <input type="password" placeholder="Password" required />
          <button type="submit" className="auth-button">Login</button>
        </form>
        <p>Don't have an account? <a href="/signup">Sign Up</a></p>
      </div>
    </div>
  );
};

const App = () => {
  const [rentItems, setRentItems] = useState([
    { id: 1, name: "Camera", price: 25, available: true },
    { id: 2, name: "Camping Tent", price: 15, available: false },
    { id: 3, name: "Bike", price: 10, available: true }
  ]);

  const handleBookingConfirmed = (booking) => {
    console.log("✅ Booking Confirmed:", booking);
  };
  return (
    <Router>
      <div className="app-container">
        <Switch>
          <Route exact path="/" component={Welcome} />
          <Route path="/home" component={Home} />
          <Route path="/explore" component={Explore} />
          <Route path="/how-it-works" component={HowItWorks} />
          <Route path="/signup" component={Signup} />
          <Route path="/login" component={Login} />
          <Route path="/rent">
            <RentList items={rentItems} />
          </Route>
          <Route path="/add-item">
            <AddRentItem items={rentItems} setItems={setRentItems} />
          </Route>
          <Route path="/approve-rental">
            <ApproveRentalRequests />
          </Route>
          <Route path="/book">
            <BookingSlot items={rentItems} onBookingConfirmed={handleBookingConfirmed} />
          </Route>
          <Route path="/make-payment">
            <MakePayment />
          </Route>
          <Route path="/owner" component={OwnerLogin} />
          <Route path="/tenant" component={TenantLogin} />
        </Switch>
      </div>
    </Router>
  );
};

export default App;
