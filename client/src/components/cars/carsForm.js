import React from 'react';
import { useState, useContext, useEffect } from 'react';
import CarsTiresContext from '../context/carTiresContext.js';
import CustomerContext from '../context/customersContext.js';
import WheelsContext from '../context/wheelContext.js';
import carStyle from './cars.module.css';

import Axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

function CarsForm() {
  const { id } = useParams();
  const [listModels, setListModels] = useState([]);
  const [filteredModel, setFilteredModel] = useState([]);
  const [filteredWheel, setFilteredWheel] = useState([]);
  const [uniqueYears, setUniqueYears] = useState([]);
  const [uniqueModels, setUniqueModels] = useState([]);
  const [uniqueMakers, setUniqueMakers] = useState([]);
  const [uniqueWheels, setUniqueWheels] = useState([]);
  const [model, setModel] = useState('');
  const [wheel, setWheel] = useState('');
  const [year, setYear] = useState('');
  const [trim, setTrim] = useState('');
  const [maker, setMaker] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [names, setNames] = useState([]);


  const [selectedCustomer, setSelectedCustomer] = useState();

  const { listWheels, setListWheels } = useContext(WheelsContext);
  const { listModelsTires, setListModelsTires } = useContext(CarsTiresContext);
  const { listCustomers } = useContext(CustomerContext);

  const params = useParams();
  const navigate = useNavigate();

  const API_HOST = 'http://localhost:4000';
  const CARSTIRES_API_URL = `${API_HOST}/api/models_tires`;
  const MODELS_API_URL = `${API_HOST}/api/models`;
  const MAKERS_API_URL = `${API_HOST}/api/makers`;
  const MODELS_API_YEAR = `${API_HOST}/api/models/year/:year`;
  const WHEELS_API_URL = `${API_HOST}/api/wheels`;
  const SHOPPERS_API_URL = `${API_HOST}/api/shoppers`; //might need to add (add_tire) to the route

  const handleAddTire = (tireId) => {
    if (!selectedCustomer) {
      alert('Please select Customer');
      return;
    }

    Axios.post(SHOPPERS_API_URL, {
      customer_id: selectedCustomer,
      model_id: model,
      tire_id: tireId,
    })
      .then((response) => {
        let item = response.data;
        setSelectedCustomer((de) => [...de, item]);
        console.log(response.data);
      })
      .catch((error) => {
        console.error(
          'Error adding tire to customer',
          error.response ? error.response.data : error.message
        );
      });
  };

  const filterByMaker = (maker_name) => {
    let filtered = listModels.filter((model) => {
      return model.year == year && model.makerId == maker_name;
    });

    console.log('unique models after DD', filtered);

    setUniqueModels(filtered);
    //setFilteredModel(filtered);
    setModel('');
  };

  const filterbyYear = (year) => {
    let filtered = listModels.filter((model) => {
      return model.year == year;
    });

    const _uniqueMakers = filtered.filter(
      (value, index, self) =>
        index === self.findIndex((t) => t.makerId === value.makerId)
    );

    console.log(`All filtered makers from year ${year}`, _uniqueMakers);

    setYear(year);
    setUniqueMakers(_uniqueMakers);
    //setUniqueWheels(filtered);
    //setUniqueModels([]);
  };

  const filterbyModel = (model) => {
    console.log('init filter', model);
    console.log('list models', listWheels);
    let filterModel = listWheels.filter((wheel) => {
      //model.year == year &&
      return wheel.modelId == model;
    });

    console.log('filtered list', filterModel);

    setModel(model);
    //setFilteredModel(uniqueModels);
    setUniqueWheels(filterModel);
  };

  const filterbyWheel = (tire) => {
    console.log('list wheel', tire);
    console.log('list wheel2', listWheels);
    let filtered = listWheels.filter((wheel) => {
      return wheel.year == year && model.tireId == tire;
    });

    setWheel(year);
    setUniqueWheels(filtered);
  };

  useEffect(() => {
    Axios.get(`${CARSTIRES_API_URL}`).then((res) => {
      setListModelsTires(res.data);
    });

    Axios.get(`${WHEELS_API_URL}/`).then((res) => {
      setListWheels(res.data);
      console.log('res.data id', res.data);

      //const uniqueWheels = [...new Set(res.data.map((obj) => obj.tireId))];

      setUniqueWheels(res.data);
    });

    Axios.get(`${MODELS_API_URL}`).then((res) => {
      setListModels(res.data);

      const uniqueYears = [...new Set(res.data.map((obj) => obj.year))];
      //const uniqueMakers = [...new Set(res.data.map((obj) => obj.maker))];
      //const uniqueModels = [...new Set(res.data.map((obj) => obj.model))];

      //console.log('prev unique makers', uniqueMakers);
      //setUniqueYears(uniqueYears.sort());
      setUniqueYears(uniqueYears.sort());
      console.log('unique model', uniqueModels);

      setUniqueMakers(uniqueMakers);
      //setUniqueModels(res.data);
    });

    Axios.get(`${MAKERS_API_URL}`).then((res) => {
      //setListModels(res.data);
      console.log(res.data);
    });
  }, [uniqueModels]);

  console.log('carForm first name', listCustomers);

  return (
    <div className={carStyle.carFormBg}>
      <h1 className={carStyle.form_title}>Add a Tires </h1>
      <div>
        <label className={carStyle.year}>Name</label>
        <select
          name="fullName"
          id="fullName"
          placeholder="Select Name"
          className="dropdown"
          onChange={(e) => setSelectedCustomer(parseInt(e.target.value))}
        >
          <option>Select Name</option>
          {listCustomers.map((f, fn) => (
            <option key={fn} value={f.id}>
              {`${f.first_name} ${f.last_name}`}
            </option>
          ))}
        </select>
      </div>
      <form className={carStyle.cars_select}>
        <label className={carStyle.year}>Year</label>
        <select
          name="year"
          id="year"
          placeholder="Choose a year"
          className="dropdown"
          onChange={(e) => filterbyYear(e.target.value)}
          defaultValue={year}
        >
          <option>Select Year</option>
          {uniqueYears?.map((year, yr) => (
            <option key={yr} value={year}>
              {year}
            </option>
          ))}
        </select>
        <label className={carStyle.year}>Maker</label>
        <select
          name="maker"
          id="maker"
          placeholder="Choose a Maker"
          className="dropdown"
          onChange={(e) => filterByMaker(e.target.value)}
        >
          <option value={0}>Select a Maker</option>
          {uniqueMakers?.map((m, mk) => (
            <option key={mk} value={m.makerId}>
              {m.maker_name}
            </option>
          ))}
        </select>
        <label className={carStyle.year}>Model</label>
        <select
          name="model"
          id="model"
          placeholder="Choose a Model"
          className="dropdown"
          onChange={(e) => filterbyModel(parseInt(e.target.value))}
          value={model}
        >
          <option>Select a Model</option>
          {uniqueModels.map((mdl, md) => (
            <option key={md} value={mdl.modelId}>
              {mdl.model_name}
            </option>
          ))}
        </select>
        <table className="table table-sm table-secondary table-hover">
          <thead>
            <tr className="tr">
              <th>Wheel</th>
              <th scope="col">Company</th>
              <th scope="col">Season</th>
              <th scope="col">Size</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {uniqueWheels.map((wheel, wh) => (
              <tr key={(wheel.tireId, wh)}>
                <td>{wheel.tire_name}</td>
                <td>{wheel.tire_company}</td>
                <td>{wheel.sn_name}</td>
                <td>{wheel.tire_size}</td>
                <td>
                  <>
                    <button
                      className={'btn-secondary'}
                      onClick={() => handleAddTire(wheel.tireId)}
                    >
                      Add Tire
                    </button>
                  </>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </form>
    </div>
  );
}

export default CarsForm;
