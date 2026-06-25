import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="p-4 bg-gray-800 text-white">
      <div className="container mx-auto flex justify-between">
        <Link to="/" className="font-bold">Maris4u</Link>
        <div className="space-x-4">
          <Link to="/shop">Shop</Link>
          <Link to="/cart">Cart</Link>
          <Link to="/profile">Profile</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
