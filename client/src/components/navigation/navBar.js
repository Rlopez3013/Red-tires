import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <div>
      <nav className="nav">
        <ul>
          <li>
            <Link to={'/home'} className="home-title">
              Home
            </Link>
          </li>
        </ul>
        <li>
          <Link to={'/makers/newMaker'}>New Maker</Link>
        </li>
        <li>
          <Link to={`/makers`}>Makers</Link>
        </li>
        <li>
          <Link to={'/models'}>Models</Link>
        </li>

        <li>
          <Link to={'/models/newModel'}>New Model</Link>
        </li>
        <li>
          <Link to={'/models_tires/carsTires'}>Cars</Link>
        </li>
        <li>
          <Link to={'/models_tires/newCarTires'}>Add Tires</Link>
        </li>
        <li>
          <Link to={'/tires'}>Tires</Link>
        </li>
        <li>
          <Link to={'/Customers/registration'}>Registration</Link>
        </li>
        <li>
          <Link to={'/Customers/patrons'}>Patrons</Link>
        </li>
        <li>
          <Link to={'/shoppers/clientes'}>Shoppers</Link>
        </li>
        <li>
          <Link to={'/checkoutform'}>Checkout</Link>
        </li>
      </nav>
    </div>
  );
}

export default Navbar;
