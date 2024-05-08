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

  // function handleChange(e) {
  //   this.setState({ value: e.target.value });
  // }

  // function handleSubmit(e) {
  //   alert('new customer created: ' + this.state.value);
  //   e.preventDefault();
  // }

  const register = async (e) => {
    const resp = await Axios.post(`${CUSTOMER_API_URL}`, {
      f_name: name,
      last_name: lastName,
      email: email,
      street: street,
      city: city,
      state: state,
      country: country,
      zip_code: zipcode,
    });

    console.log('response', resp);
    e.preventDefault();
  };

  return (
    <div className="bg-light py-3 py-md-5">
      <div className="container">
        <div className="col-12 col-md-11 col-lg-8 col-xl-7 col-xxl-6">
          <div className="bg-white p-4 p-md-5 rounded shadow-sm">
            <div className="row">
              <div className="col-12">
                <h2 className="h3">Registration</h2>
                <h3 className="fs-6 fw-normal text-secondary m-0">
                  Enter your details
                </h3>
              </div>
            </div>
          </div>
          <form onSubmit={register} className="form-row">
            <div className="row gy-2 gy-md-2 overflow-hidden">
              <div className="col-12">
                <label htmlFor="firstName" className="form-label">
                  First Name <span className="text-danger">*</span>
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="name"
                  required
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                />
              </div>
            </div>
            <div className="col-12">
              <label htmlFor="lastName" className="form-label">
                Last Name <span className="text-danger">*</span>
              </label>
              <input
                id="last name"
                name="last name"
                type="text"
                placeholder="Last Name"
                required
                onChange={(e) => {
                  setLastName(e.target.value);
                }}
              />
            </div>
            <div className="col-12">
              <label htmlFor="email" className="form-label">
                Email <span className="text-danger">*</span>
              </label>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="email"
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
            </div>
            <div className="col">
              <label htmlFor="street" className="form-label">
                Street:
              </label>
              <input
                id="street"
                name="street"
                type="text"
                placeholder="street"
                onChange={(e) => {
                  setStreet(e.target.value);
                }}
              />
            </div>
            <div>
              <label htmlFor="city" className="form-label">
                City:
              </label>
              <input
                id="city"
                name="city"
                type="text"
                placeholder="City"
                onChange={(e) => {
                  setCity(e.target.value);
                }}
              />
            </div>
            <div>
              <label htmlFor="state" className="form-label">
                State:
              </label>
              <input
                id="state"
                name="state"
                type="text"
                placeholder="State"
                onChange={(e) => {
                  setState(e.target.value);
                }}
              />
            </div>
            <div>
              <label htmlFor="country" className="form-label">
                Country:
              </label>
              <input
                id="country"
                name="country"
                type="text"
                placeholder="country"
                onChange={(e) => {
                  setCountry(e.target.value);
                }}
              />
            </div>
            <div>
              <label htmlFor="Zip Code" className="form-label">
                Zip Code:
              </label>
              <input
                id="zipcode"
                name="zipcode"
                type="text"
                placeholder="Zip Code"
                onChange={(e) => {
                  setZipcode(e.target.value);
                }}
              />
            </div>
            <div className="col-12">
              <input
                type="submit"
                className="btn btn-primary btn-sm"
                value="register"
              ></input>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
export default Registration;
