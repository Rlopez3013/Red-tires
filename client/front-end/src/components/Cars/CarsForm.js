import React from 'react';
import { useState, useContext, useEffect } from 'react';
import { CarsTiresContext } from '../../context/carTiresContext.js';
import { WheelsContext } from '../../context/wheelContext.js';

import Axios from 'axios';
import { unstable_useBlocker, useNavigate, useParams } from 'react-router-dom';

function CarsForm() {
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
  const [type, setType] = useState('');
  const [maker, setMaker] = useState('');
  const { listWheels, setListWheels } = useContext(WheelsContext);
  const { listModelsTires, setListModelsTires } = useContext(CarsTiresContext);

  const params = useParams();
  const navigate = useNavigate();

  const API_HOST = 'http://localhost:4000';
  const CARSTIRES_API_URL = `${API_HOST}/api/models_tires`;
  const MODELS_API_URL = `${API_HOST}/api/models`;
  const MAKERS_API_URL = `${API_HOST}/api/makers`;
  const MODELS_API_YEAR = `${API_HOST}/api/models/year/:year`;
  const WHEELS_API_URL = `${API_HOST}/api/wheels`;

  const filterByMaker = (maker) => {
    let filtered = listModels.filter((model) => {
      return model.year == year && model.makerId == maker;
    });

    setUniqueModels(filtered);
    //setFilteredModel(filtered);
  };

  const filterbyYear = (year) => {
    setUniqueMakers([]);
    let filtered = listModels.filter((model) => {
      return model.year == year;
    });

    const makers = filtered.map(({ maker }) => maker);
    const uniqueMakers = filtered.filter(
      ({ maker }, index) => !makers.includes(maker, index + 1)
    );

    setYear(year);
    setUniqueMakers(uniqueMakers);
    setUniqueModels([]);
  };

  const filterbyModel = (model) => {
    console.log('init filter', model);
    console.log('list models', listWheels);
    let filterModel = listWheels.filter((wheel) => {
      //model.year == year &&
      return wheel.modelId == model;
    });

    console.log('filtered list', filterModel);

    //setModel(model);
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

  useEffect(() => {
    Axios.get(`${CARSTIRES_API_URL}`).then((res) => {
      setListModelsTires(res.data);
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
      const uniqueMakers = [...new Set(res.data.map((obj) => obj.maker))];
      const uniqueModels = [...new Set(res.data.map((obj) => obj.model))];

      setUniqueYears(uniqueYears.sort());
      setUniqueMakers(uniqueMakers);
      setUniqueModels(uniqueModels);
    });

    // Axios.get(`${MAKERS_API_URL}`).then((res) => {
    //   //setListModels(res.data);
    //   console.log(res.data);
    // });
  }, []);

  return (
    <div>
      <h1 className="car-title">Add a New Tires to a Car</h1>
      <form className="car-form">
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
          name="maker"
          id="maker"
          placeholder="Choose a Maker"
          className="dropdown"
          onChange={(e) => filterByMaker(e.target.value)}
        >
          <option value={0}>Select a Maker</option>
          {uniqueMakers?.map((maker, mk) => (
            <option key={mk} value={maker.makerId}>
              {maker.maker}
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
              {model.model}
            </option>
          ))}
        </select>
        <h3>Wheels for every Car</h3>
        <label>Tires</label>
        <select
          name="wheel"
          x
          id="wheel"
          placeholder="Choose a wheel"
          className="dropdown"
          onChange={(e) => filterbyWheel(e.target.value)}
        >
          <option>Select A tire</option>
          {uniqueWheels.map((wheel, wh) => (
            <option key={wh} value={wheel.tireId}>
              {wheel.tire}
            </option>
          ))}
        </select>
        <table className="carForm-table">
          <thead>
            <tr>
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

            {/* {uniqueWheels.map((wheel, wh) => (
              <p>{wheel.tire}</p>
            ))}
             {uniqueWheels.map((wheel, wh) => (
              <p>{wheel.company}</p>
            ))}  */}
          </tbody>
        </table>
      </form>
    </div>
  );
}

export default CarsForm;
