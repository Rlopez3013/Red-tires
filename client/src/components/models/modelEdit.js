import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Axios from 'axios';
import { API_HOST } from '../context/config';


const MAKERS_API_URL = `${API_HOST}/api/makers`;
const MODELS_API_URL = `${API_HOST}/api/models`;
const getAllModelsList = Axios.get(MODELS_API_URL);
const getAllMakerList = Axios.get(MAKERS_API_URL);
const getMakerRequest = async (id) =>
  await Axios.get(`${MAKERS_API_URL}/${id}`);
const headers = {
  headers: { 'ngrok-skip-browser-warning': '1' },
};

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
    Axios.get(`${MODELS_API_URL}/${id}`, { headers }).then((res) => {
      setModel(res.data);
    });
    loadModels();
    loadMakers();
  }, []);

  function updateModel(event) {
    event.preventDefault();
    Axios.put(`${MODELS_API_URL}/updateModel/${id}`, model).then(
      (res) => {
        setListModels(res.data);
        navigate('/api/models');
        loadModels();
        loadMakers();
        console.log('Updated model:', model);
      }
    );
  }

  const handleUpdate = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setModel((values) => ({ ...values, [name]: value }));
  };

  return (
    <div className="container mt-4" style={{ backgroundColor: '#eeffee' }}>
      <h2 className="mb-4">Update Model</h2>
      <form onSubmit={updateModel}>
        <div className="mb-3">
          <label htmlFor="maker" className="form-label">
            Maker
          </label>
          <select
            name="maker"
            id="maker"
            className="form-select"
            value={model.Makers_id}
            onChange={(e) => setMaker(e.target.value)}
          >
            <option value="">Select Maker</option>
            {listMakers.map((maker) => (
              <option key={maker.id} value={maker.id}>
                {maker.maker_name}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-3">
          <label htmlFor="model_name" className="form-label">
            Model Name
          </label>
          <input
            className="form-control"
            type="text"
            name="model_name"
            value={model.model_name || ''}
            onChange={(e) => setModel({ ...model, model_name: e.target.value })}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="trim" className="form-label">
            Trim
          </label>
          <input
            className="form-control"
            type="text"
            name="trim"
            value={model.trim || ''}
            onChange={(e) => setModel({ ...model, trim: e.target.value })}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="year" className="form-label">
            Year
          </label>
          <input
            className="form-control"
            type="number"
            name="year"
            value={model.year || ''}
            onChange={(e) => setModel({ ...model, year: e.target.value })}
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Update
        </button>
      </form>
    </div>
  );
}

export default Update;

