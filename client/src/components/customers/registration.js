import { useState, useEffect } from 'react';
import Axios from 'axios';
import CustomerCss from './customer.module.css';
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
    <div className={CustomerCss.formBg}>
      <div className="row">
        <div id={CustomerCss.ui}>
          <h1 className={CustomerCss.ui}>Customer Form</h1>
          <div>
            <form onSubmit={register} className="form-group">
              <div className="row">
                <div className="col-lg-3">
                  <label>First Name</label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    className="form-control"
                    placeholder="First Name"
                    required
                    onChange={(e) => {
                      setName(e.target.value);
                    }}
                  />
                </div>

                <div className="col-lg-3">
                  <label>Last Name</label>
                  <input
                    id="last name"
                    name="last name"
                    type="text"
                    className="form-control"
                    placeholder="Last Name"
                    required
                    onChange={(e) => {
                      setLastName(e.target.value);
                    }}
                  />
                </div>

                <div>
                  <label>Email</label>
                  <div className="col-lg-6">
                    <input
                      id="email"
                      name="email"
                      type="email"
                      className="form-control"
                      placeholder="Enter Email"
                      onChange={(e) => {
                        setEmail(e.target.value);
                      }}
                    />
                  </div>
                </div>
              </div>
              <div className="row">
                <label>Street</label>
                <div className="col-lg-6">
                  <input
                    id="street"
                    name="street"
                    type="text"
                    placeholder="Enter Street"
                    onChange={(e) => {
                      setStreet(e.target.value);
                    }}
                  />
                </div>
                <label>City</label>
                <div className="col-lg-6">
                  <input
                    id="city"
                    name="city"
                    type="text"
                    placeholder="Enter City"
                    onChange={(e) => {
                      setCity(e.target.value);
                    }}
                  />
                </div>
                <label>State</label>
                <div className="col-lg-6">
                  <input
                    id="state"
                    name="state"
                    type="text"
                    placeholder="Enter State"
                    onChange={(e) => {
                      setState(e.target.value);
                    }}
                  />
                </div>
                <label>Country</label>
                <div className="col-lg-6">
                  <input
                    id="country"
                    name="country"
                    type="text"
                    placeholder="Enter Country"
                    onChange={(e) => {
                      setCountry(e.target.value);
                    }}
                  />
                </div>
                <label>Zip Code</label>
                <div className="col-lg-6">
                  <input
                    id="zipcode"
                    name="zipcode"
                    type="text"
                    placeholder="Enter Zip Code"
                    onChange={(e) => {
                      setZipcode(e.target.value);
                    }}
                  />
                </div>
              </div>
              <br></br>
              <div className="col-lg-6">
                <input
                  type="submit"
                  className="btn btn-primary btn-lg btn-block"
                  value="Register"
                ></input>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Registration;
