import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';
import SiteNavbar from './components/SiteNavbar';
import HomePage from './pages/HomePage';
import MenuPage from './pages/MenuPage';
import ReservationsPage from './pages/ReservationsPage';
import CartPage from './pages/CartPage';
import 'bootstrap/dist/css/bootstrap.min.css';


 const App=()=> {
  const [cart, setCart] = useState([]);

  const addToCart = (item, qty) => {
    setCart(prevCart => {
      const existing = prevCart.find(i => i.id === item.id);
      if (existing) {
        // Limit quantity to 5 per item
        const newQty = Math.min(existing.quantity + qty, 5);
        return prevCart.map(i => i.id === item.id ? { ...i, quantity: newQty } : i);
      }
      return [...prevCart, { ...item, quantity: qty }];
    });
  };

  const clearCart = () => setCart([]);

  return (
    <Router>
      <SiteNavbar cartCount={cart.reduce((sum, item) => sum + item.quantity, 0)} />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/menu" element={<MenuPage addToCart={addToCart} />} />
        <Route path="/reservations" element={<ReservationsPage />} />
        <Route path="/cart" element={<CartPage cart={cart} clearCart={clearCart} />} />
      </Routes>
    </Router>
  );
}
export default App;
