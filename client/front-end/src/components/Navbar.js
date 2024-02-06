import React from 'react';
import { Link } from 'react-router-dom';
import Maker from './Makers/Maker';

function Navbar() {
  return (
  <div>
     
     <nav className='nav'>
      <ul>
        <li>
          <Link to={'/'} className='home-title'>Home</Link>
        </li>
      </ul>
      <li>
        <Link to={'/api/makers/newMaker'}>New Maker</Link>
      </li>
      <li>
        <Link to={`/api/makers`}>Makers</Link>
      </li>
      <li>
        <Link to={'/api/models'}>Models</Link>
      </li>

      <li>
        <Link to={'/api/models/newModel'}>New Model</Link>
      </li>
      <li>
        <Link to={'/api/models_tires/carsTires'}>Cars</Link>
      </li>
      <li>
        <Link to={'/api/models_tires/newCarTires'}>New Car</Link>
      </li>
      <li>
        <Link to={'/api/tires'}>Tires</Link>
      </li>
      </nav>
    </div>
  );
}

export default Navbar;
