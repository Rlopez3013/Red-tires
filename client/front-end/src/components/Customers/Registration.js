import { useState, useEffect } from 'react';
import Axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
function Registration() {
  //States for registration
  const [name, setName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [street, setStreet] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [zipcode, setZipcode] = useState('');
  const [country, setCountry] = useState('');

  const API_HOST = 'http://localhost:4000';
  const CUSTOMER_API_URL = `${API_HOST}/api/customers`;

  const register = () => {
    Axios.post(`${CUSTOMER_API_URL}`, {
      f_name: name,
      last_name: lastName,
      email: email,
      street: street,
      city: city,
      state: state,
      country: country,
      zip_code: zipcode,
    }).then((response) => {
      console.log(response, 'login 1');
    });
  };

  return (
    <div className="container">
      <form className="form-row">
        <h1>This is Registration</h1>
        <div className="col-6">
          <label className="form-label" for="name">
            Name:
          </label>
          <input
            id="name"
            name="name"
            type="text"
            placeholder="name"
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
        </div>
        <div className="col-6">
          <label>Last Name:</label>
          <input
            name="last name"
            type="text"
            placeholder="Last Name"
            onChange={(e) => {
              setLastName(e.target.value);
            }}
          />
        </div>
        <div className="col-6">
          <label>Email:</label>
          <input
            name="email"
            type="email"
            placeholder="email"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
        </div>
        <div>
          <label>Street:</label>
          <input
            name="street"
            type="text"
            placeholder="street"
            onChange={(e) => {
              setStreet(e.target.value);
            }}
          />
        </div>
        <div>
          <label>City:</label>
          <input
            name="city"
            type="text"
            placeholder="City"
            onChange={(e) => {
              setCity(e.target.value);
            }}
          />
        </div>
        <div>
          <label>State:</label>
          <input
            name="state"
            type="text"
            placeholder="state"
            onChange={(e) => {
              setState(e.target.value);
            }}
          />
        </div>
        <div>
          <label>Country:</label>
          <input
            name="country"
            type="text"
            placeholder="country"
            onChange={(e) => {
              setCountry(e.target.value);
            }}
          />
        </div>
        <div>
          <label>Zip Code:</label>
          <input
            name="zipcode"
            type="text"
            placeholder="Zip Code"
            onChange={(e) => {
              setZipcode(e.target.value);
            }}
          />
        </div>
        <div className="col-12">
          <button
            type="submit"
            class="btn btn-primary btn-sm"
            onClick={register}
          >
            Register
          </button>
        </div>
      </form>
    </div>
  );
}
export default Registration;
