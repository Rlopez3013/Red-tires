import React from 'react';
import { Link } from 'react-router-dom';
import Maker from './Maker';

function Navbar() {
  return (
    <div>
      <h1>React Tires</h1>
      <ul>
        <li>
          <Link to={'/'}>Home</Link>
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
    </div>
  );
}

export default Navbar;
