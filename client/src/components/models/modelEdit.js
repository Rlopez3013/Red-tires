import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Axios from 'axios';
const API_HOST = 'http://localhost:4000';
const MAKERS_API_URL = `${API_HOST}/api/makers`;
const MODELS_API_URL = `${API_HOST}/api/models`;
const getAllModelsList = Axios.get(MODELS_API_URL);
const getAllMakerList = Axios.get(MAKERS_API_URL);
const getMakerRequest = async (id) =>
  await Axios.get(`${MAKERS_API_URL}/${id}`);
// const getModelsResquest = async (id) =>
//   await Axios.get(`${MODELS_API_URL}/${id}`);

function Update() {
  const { id } = useParams();
  const [listMakers, setListMakers] = useState([]);
  const [listModels, setListModels] = useState([]);
  const [model, setModel] = useState({});
  const [maker, setMaker] = useState({});
  const params = useParams();
  const navigate = useNavigate();

  const loadMakers = () => {
    getAllMakerList.then((response) => {
      setListMakers(response.data);
    });
  };

  const loadModels = () => {
    getAllModelsList.then((res) => {
      setListModels(res.data);
    });
  };

  useEffect(() => {
    //loadMakers();

    //loadModels();

    Axios.get(`${MODELS_API_URL}/${id}`).then((res) => {
      console.log('is log8', res.data);    
      setModel(res.data);
    });
    loadModels();
    loadMakers();
  }, []);

  function updateModel(event) {
    event.preventDefault();
    Axios.put(`${MODELS_API_URL}/updateModel/${id}`, model).then(
      (res) => setListModels(res.data),
      navigate('/api/models'),
      // loadMakers(),
      loadModels(),
      loadMakers(),
      console.log('this is log4', model)
    );
    //console.log((err) => console.log(err));
  }

  const handleUpdate = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setModel((values) => ({ ...values, [name]: value }));
  };

  return (
    <div>
      <h2>Update Model!</h2>
      <form onSubmit={updateModel}>
        <label htmlFor="maker">Maker</label>
        <select
          name="maker"
          id="maker"
          className="dropdown"
          value={model.Makers_id}
          onChange={(e) => setMaker(e.target.value)}
        >
          <option>Select Maker</option>
          {listMakers.map((maker) => (
            <option key={maker.id} value={maker.id}>
              {maker.maker_name}
            </option>
          ))}
        </select>

        <label htmlFor="Model">
          Model
          <input
            className={'btn-submit'}
            type="text"
            name="model_name"
            value={model.model_name || ''}
            onChange={(e) => setModel({ ...model, model_name: e.target.value })}
            //onChange={handleUpdate}
          />
        </label>
        <label>
          Trim
          <input
            type="text"
            name="trim"
            value={model.trim || ''}
            onChange={(e) => setModel({ ...model, trim: e.target.value })}
            //onChange={handleUpdate}
          />
        </label>
        <label>
          Year
          <input
            type="number"
            name="year"
            value={model.year || ''}
            onChange={(e) => setModel({ ...model, year: e.target.value })}
            //onChange={handleUpdate}
          />
        </label>
        <button className="btn-update">Update</button>
      </form>
    </div>
  );
}

export default Update;
