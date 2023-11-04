import React from 'react';
import { useState, useContext, useEffect } from 'react';
import { CarsTiresContext } from '../context/carTiresContext.js';
import { WheelsContext } from '../context/wheelContext.js';

import Axios from 'axios';
import { unstable_useBlocker, useNavigate, useParams } from 'react-router-dom';

function CarsForm() {
  const [listModels, setListModels] = useState([]);
  const [filteredModel, setFilteredModel] = useState([]);
  const [uniqueYears, setUniqueYears] = useState([]);
  const [uniqueModels, setUniqueModels] = useState([]);
  const [uniqueMakers, setUniqueMakers] = useState([]);
  // const [listWheels, setListWheels] = useState([]);
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
    let filterModel = listModels.filter((model) => {
      return model.model;

      setModel(year);
      setFilteredModel(uniqueModels);
    });
  };

  useEffect(() => {
    Axios.get(`${CARSTIRES_API_URL}`).then((res) => {
      setListModelsTires(res.data);
    });
    Axios.get(`${WHEELS_API_URL}`).then((res) => {
      setListWheels(res.data);
      console.log(res.data);
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
      Add a New Tires to a Car
      <form>
        <label htmlFor="year">Year</label>
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
        <div>
          <h3>Wheels</h3>
          <label>Tires</label>
          <select
            name="wheel"
            id="wheel"
            placeholder="Choose a wheel"
            className="dropdown"
          >
            <option>Select A tire</option>
            {listWheels?.map((wheel, wh) => (
              <option key={wh} value={wheel.id}>
                {wheel.tire}
              </option>
            ))}
          </select>
        </div>
      </form>
    </div>
  );
}

export default CarsForm;
