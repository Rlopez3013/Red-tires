import React from 'react';
import { useState, useContext, useEffect } from 'react';
import { WheelsContext } from '../context/wheelContext.js';
import Axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

import { CarsTiresContext } from '../context/carTiresContext.js';

import { CustomerContext } from '../context/customersContext.js';

function ShoppersForm() {
  const [listModels, setListModels] = useState([]);
  const [filteredModel, setFilteredModel] = useState([]);
  const [filteredWheel, setFilteredWheel] = useState([]);
  const [uniqueYears, setUniqueYears] = useState([]);
  const [uniqueModels, setUniqueModels] = useState([]);
  const [uniqueMakers, setUniqueMakers] = useState([]);
  const [uniqueWheels, setUniqueWheels] = useState([]);
  const [uniqueCustomer, setUniqueCustomer] = useState([]);
  const [model, setModel] = useState('');
  const [wheel, setWheel] = useState('');
  const [year, setYear] = useState('');
  // const [type, setType] = useState('');
  const [maker, setMaker] = useState('');
  const [customer, setCustomer] = useState('');
  const { listWheels, setListWheels } = useContext(WheelsContext);
  const { listModelsTires, setListModelsTires } = useContext(CarsTiresContext);
  const { listCustomers, setListCustomers } = useContext(CustomerContext);

  const params = useParams();
  const navigate = useNavigate();

  const API_HOST = 'http://localhost:4000';
  const CARSTIRES_API_URL = `${API_HOST}/api/models_tires`;
  const MODELS_API_URL = `${API_HOST}/api/models`;
  const MAKERS_API_URL = `${API_HOST}/api/makers`;
  const MODELS_API_YEAR = `${API_HOST}/api/models/year/:year`;
  const WHEELS_API_URL = `${API_HOST}/api/wheels`;
  const CUSTOMER_API_URL = `${API_HOST}/api/customers`;

  const filterByMaker = (maker_name) => {
    let filtered = listModels.filter((model_name) => {
      return model_name.year == year && model.makerId == maker_name;
    });

    setUniqueModels(filtered);
    //setFilteredModel(filtered);
  };

  const filterbyYear = (year) => {
    setUniqueMakers([]);
    let filtered = listModels.filter((model) => {
      return model.year == year;
    });

    const makers = filtered.map(({ maker_name }) => maker_name);
    const uniqueMakers = filtered.filter(
      ({ maker_name }, index) => !makers.includes(maker_name, index + 1)
    );

    setYear(year);
    setUniqueMakers(uniqueMakers);
    setUniqueModels([]);
  };

  const filterbyModel = (model_name) => {
    console.log('init filter', model_name);
    console.log('list models', listWheels);
    let filterModel = listWheels.filter((wheel) => {
      return wheel.modelId == model_name;
    });

    console.log('filtered list', filterModel);

    setFilteredModel(uniqueModels);
    setUniqueWheels(filterModel);
  };

  const filterbyWheel = (tire) => {
    let filtered = listWheels.filter((wheel) => {
      return wheel.year == year && model.tireId == tire;
    });

    setWheel(year);
    setUniqueWheels(filtered);
  };

  const filterByCustomer = (customer) => {
    let filtered = listCustomers.filter((customer) => {
      return customer.wheel == wheel && model.tireId == customer;
    });

    setCustomer(customer);
    setUniqueCustomer(filtered);
  };

  useEffect(() => {
    Axios.get(`${CARSTIRES_API_URL}`).then((res) => {
      setListModelsTires(res.data);
    });

    Axios.get(`${CUSTOMER_API_URL}`).then((res) => {
      setListCustomers(res.data);

      console.log('unique customer 10', uniqueCustomer);
    });

    Axios.get(`${WHEELS_API_URL}`).then((res) => {
      setListWheels(res.data);

      const uniqueWheels = [...new Set(res.data.map((obj) => obj.tireId))];

      setUniqueWheels(uniqueWheels);
      console.log('unique wheels 2', uniqueWheels);
    });

    Axios.get(`${MODELS_API_URL}`).then((res) => {
      setListModels(res.data);

      const uniqueYears = [...new Set(res.data.map((obj) => obj.year))];
      const uniqueMakers = [...new Set(res.data.map((obj) => obj.maker_name))];
      const uniqueModels = [...new Set(res.data.map((obj) => obj.model_name))];

      setUniqueYears(uniqueYears.sort());
      setUniqueMakers(uniqueMakers);
      setUniqueModels(uniqueModels);
    });
  }, []);

  return (
    <div>
      <h1 className="car-title">Add Tires To Shopping Cart</h1>
      <form className="car-form">
        <div>
          <label>First Name</label>
          <select
            name="first_name"
            id="first_name"
            placeholder="Choose a name"
            className="dropdown"
            onChange={(e) => filterbyYear(e.target.value)}
          ></select>
        </div>
        <div>
          <label>Last Name</label>
          <select
            name="last_name"
            id="last_name"
            placeholder="Choose a name"
            className="dropdown"
            onChange={(e) => filterbyYear(e.target.value)}
          ></select>
        </div>
        <label className="year">Year</label>
        <select
          name="year"
          id="year"
          placeholder="Choose a year"
          className="dropdown"
          onChange={(e) => filterbyYear(e.target.value)}
        >
          <option>Select Year</option>
          {uniqueYears?.map((year, yr) => (
            <option key={yr} value={year}>
              {year}
            </option>
          ))}
        </select>
        <label>Maker</label>
        <select
          name="maker_name"
          id="maker_name"
          placeholder="Choose a Maker"
          className="dropdown"
          onChange={(e) => filterByMaker(e.target.value)}
        >
          <option value={0}>Select a Maker</option>
          {uniqueMakers?.map((maker, mk) => (
            <option key={mk} value={maker.id}>
              {maker.maker_name}
            </option>
          ))}
        </select>
        <label>Model</label>
        <select
          name="model"
          id="model"
          placeholder="Choose a Model"
          className="dropdown"
          onChange={(e) => filterbyModel(e.target.value)}
        >
          <option>Select a Model</option>
          {uniqueModels.map((model, md) => (
            <option key={md} value={model.id}>
              {model.model_name}
            </option>
          ))}
        </select>

        <table className="carForm-table">
          <thead>
            <tr>
              <th>Customer</th>
              <th>Wheel</th>
              <th>Company</th>
              <th>Season</th>
              <th>Size</th>
            </tr>
          </thead>
          <tbody>
            {uniqueWheels.map((wheel, wh) => (
              <tr key={(wheel.id, wh)}>
                <td>{wheel.tire}</td>
                <td>{wheel.company}</td>
                <td>{wheel.season}</td>
                <td>{wheel.size}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </form>
    </div>
  );
}

export default ShoppersForm;
