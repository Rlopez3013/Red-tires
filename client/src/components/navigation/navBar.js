import React from 'react';
import { Link } from 'react-router-dom';
import Maker from '../makers/maker';

function Navbar() {
  return (
    <div>
      <nav className="nav">
        <ul>
          <li>
            <Link to={'/'} className="home-title">
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
          <Link to={'/models_tires/newCarTires'}>New Car</Link>
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
          <Link to={'/shopper/cart'}>Shopping</Link>
        </li>
      </nav>
    </div>
  );
}

export default Navbar;
